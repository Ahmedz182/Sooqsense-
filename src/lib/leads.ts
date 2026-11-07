import { z } from "zod";

/**
 * Waitlist / demo / contact submissions. The form posts to /api/leads, which
 * validates with `leadSchema` and hands the lead to `deliverLead`.
 *
 * To plug in any integration later (HubSpot, Sheets, Zapier, n8n...), either set
 * LEADS_WEBHOOK_URL or add a branch in `deliverLead` — nothing else changes.
 */

export const leadIntents = ["waitlist", "demo", "contact"] as const;
export type LeadIntent = (typeof leadIntents)[number];

export const leadSchema = z.object({
  intent: z.enum(leadIntents).default("waitlist"),
  name: z.string().trim().min(1, "Please tell us your name").max(120),
  email: z.email("Please enter a valid work email").max(200),
  company: z.string().trim().max(160).optional().default(""),
  teamSize: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
  /** Honeypot — real users never fill this. */
  website: z.string().max(0).optional().default(""),
});

export type Lead = z.infer<typeof leadSchema>;

export type DeliveryResult = { ok: true; via: "resend" | "webhook" | "log" } | { ok: false; error: string };

export async function deliverLead(lead: Lead): Promise<DeliveryResult> {
  const payload = { ...lead, receivedAt: new Date().toISOString(), source: "sooqsense.com" };

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok ? { ok: true, via: "webhook" } : { ok: false, error: `Webhook responded ${res.status}` };
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_TO_EMAIL;
  const from = process.env.LEADS_FROM_EMAIL;
  if (key && to && from) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject: `[SooqSense ${lead.intent}] ${lead.name}${lead.company ? ` — ${lead.company}` : ""}`,
        text: Object.entries(payload)
          .filter(([k]) => k !== "website")
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n"),
      }),
    });
    return res.ok ? { ok: true, via: "resend" } : { ok: false, error: `Email provider responded ${res.status}` };
  }

  // No integration configured yet: keep the lead in server logs so nothing is lost in dev.
  console.info("[lead]", JSON.stringify(payload));
  return { ok: true, via: "log" };
}
