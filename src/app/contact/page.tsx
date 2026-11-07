import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { LeadForm } from "@/components/forms/LeadForm";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbLd } from "@/lib/jsonld";
import { leadIntents, type LeadIntent } from "@/lib/leads";

export const metadata: Metadata = buildMetadata({
  title: "Book a demo or join the waitlist",
  description:
    "Talk to the SooqSense team about automating your sales follow-ups, meeting notes and campaigns — or join the waitlist for early access to the agentic CRM.",
  path: "/contact",
  keywords: ["book a CRM demo", "sales automation demo", "agentic CRM waitlist"],
});

const heading: Record<LeadIntent, { title: string; lead: string }> = {
  waitlist: { title: "Join the waitlist", lead: "Get early access to SooqSense. We're onboarding teams in the US, UK and Europe every week." },
  demo: { title: "Book a 20-minute demo", lead: "See your own sales workflow running in SooqSense — follow-ups, meeting notes and HubSpot or Salesforce sync." },
  contact: { title: "Contact us", lead: "Questions about security, pricing or integrations? We reply within one business day." },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ intent?: string }> }) {
  const { intent: raw } = await searchParams;
  const intent: LeadIntent = (leadIntents as readonly string[]).includes(raw ?? "") ? (raw as LeadIntent) : "demo";
  const h = heading[intent];
  return (
    <SiteShell>
      <section className="container-x grid gap-12 py-20 md:grid-cols-[1fr_1.2fr] md:py-28">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="text-h1 mt-4 font-semibold">{h.title}</h1>
          <p className="text-lead mt-5 max-w-md text-ink-2">{h.lead}</p>
        </div>
        <div className="rounded-[var(--radius-xl)] border border-line bg-bg-elev p-6 shadow-md sm:p-8">
          <LeadForm intent={intent} />
        </div>
      </section>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
    </SiteShell>
  );
}
