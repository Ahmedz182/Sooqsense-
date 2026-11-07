"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import type { LeadIntent } from "@/lib/leads";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const copy: Record<LeadIntent, { button: string; done: string }> = {
  waitlist: { button: "Join the waitlist", done: "You're on the list. We'll email you when your workspace is ready." },
  demo: { button: "Request a demo", done: "Thanks — we'll reply within one business day to book a time." },
  contact: { button: "Send message", done: "Message received. We'll get back to you shortly." },
};

const field =
  "w-full rounded-[var(--radius-md)] border border-line-strong bg-bg-elev px-4 py-3 text-ink placeholder:text-ink-3 outline-none transition-[border-color,box-shadow] focus:border-amber focus:shadow-[0_0_0_4px_var(--amber-soft)]";

/** Waitlist / demo / contact form → POST /api/leads. Integration is pluggable server-side. */
export function LeadForm({ intent = "waitlist", compact = false, className }: { intent?: LeadIntent; compact?: boolean; className?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, intent }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div role="status" className={cn("flex items-start gap-3 rounded-[var(--radius-lg)] border border-line bg-mint-soft p-5 text-ink", className)}>
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-mint" aria-hidden="true" />
        <p>{copy[intent].done}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className={cn("grid gap-3", !compact && "sm:grid-cols-2", className)}>
      <label className="grid gap-1.5">
        <span className="text-sm text-ink-2">Name</span>
        <input name="name" required autoComplete="name" placeholder="Ahmed Fayyaz" className={field} />
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm text-ink-2">Work email</span>
        <input name="email" type="email" required autoComplete="email" placeholder="iamahmedfayyaz@gmail.com" className={field} />
      </label>
      {!compact && (
        <>
          <label className="grid gap-1.5">
            <span className="text-sm text-ink-2">Company</span>
            <input name="company" autoComplete="organization" placeholder="Carthage Labs" className={field} />
          </label>
          <label className="grid gap-1.5">
            <span className="text-sm text-ink-2">Team size</span>
            <select name="teamSize" defaultValue="" className={field}>
              <option value="" disabled>
                Select…
              </option>
              <option>Just me</option>
              <option>2–10</option>
              <option>11–50</option>
              <option>51–200</option>
              <option>200+</option>
            </select>
          </label>
          <label className="grid gap-1.5 sm:col-span-2">
            <span className="text-sm text-ink-2">What would you like to automate? (optional)</span>
            <textarea name="message" rows={4} placeholder="Follow-ups after demos, meeting notes into HubSpot…" className={field} />
          </label>
        </>
      )}
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className={cn("flex flex-col gap-3", !compact && "sm:col-span-2")}>
        <Button type="submit" size="lg" disabled={state === "sending"} className="w-full sm:w-auto">
          {state === "sending" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {copy[intent].button}
        </Button>
        {state === "error" && (
          <p role="alert" className="text-sm text-rose">
            {error}
          </p>
        )}
        <p className="text-xs text-ink-3">No spam. We only use your email to contact you about SooqSense.</p>
      </div>
    </form>
  );
}
