import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { TrialButton } from "@/components/ui/TrialButton";
import { ButtonLink } from "@/components/ui/Button";
import { HandoffChip } from "./HandoffChip";
import { Magnetic } from "./Tactile";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden py-24 md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_85%_30%,var(--wash-amber),transparent_70%),radial-gradient(45%_50%_at_10%_90%,var(--wash-blue),transparent_70%)]" />
      <div className="container-x relative grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <HandoffChip from="5 agents" to="you" />
          <h2 id="cta-title" className="mt-6 font-display text-[clamp(2.75rem,1.4rem+5.4vw,6.25rem)] font-semibold leading-[0.92] tracking-[-0.035em]">
            Seven tabs,
            <br />
            or one queue.
            <span className="block text-amber-ink">Your call.</span>
          </h2>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <TrialButton />
            </Magnetic>
            <ButtonLink href={siteConfig.demoUrl} variant="ghost" size="lg">
              Book a demo
            </ButtonLink>
          </div>
          <p className="mt-3 font-mono text-xs text-ink-3">{siteConfig.trial.note} · connect Gmail in about a minute</p>
        </div>
        <div className="rounded-[var(--radius-xl)] border border-line bg-bg-elev p-6 shadow-md md:p-8">
          <h3 className="font-display text-2xl font-semibold">Not ready yet?</h3>
          <p className="mt-2 text-ink-2">Join the waitlist for new agents. One email when something ships, nothing else.</p>
          <LeadForm intent="waitlist" compact className="mt-6" />
        </div>
      </div>
    </section>
  );
}
