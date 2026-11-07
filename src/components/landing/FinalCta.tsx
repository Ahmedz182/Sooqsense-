import { siteConfig } from "@/config/site";
import { TrialButton } from "@/components/ui/TrialButton";
import { LeadForm } from "@/components/forms/LeadForm";
import { Thread } from "./Thread";

/** The end of the thread: start the trial, or join the waitlist. */
export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden">
      <Thread time="Next Tuesday" label="Yours" tall />
      <div className="container-x mt-10 pb-24 md:mt-14 md:pb-24">
        <div className="wash-amber relative overflow-hidden rounded-[var(--radius-xl)] border border-line bg-bg-elev p-6 sm:p-10 md:p-14">
          <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-end">
            <div>
              <h2 id="cta-title" className="text-h1 font-semibold">
                Next Tuesday, start with three drafts and a coffee.
              </h2>
              <p className="text-lead mt-5 max-w-lg text-ink-2">
                Connect Gmail or Outlook in about a minute. SooqSense backfills your history overnight, and your first morning queue is waiting
                the next day.
              </p>
              <div className="mt-8 flex flex-col items-start gap-2">
                <TrialButton />
                <span className="font-mono text-xs text-ink-3">{siteConfig.trial.note}</span>
              </div>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-line bg-bg p-5 sm:p-6">
              <p className="font-medium text-ink">Not ready to connect your inbox?</p>
              <p className="mt-1 mb-5 text-sm text-ink-2">Join the waitlist and we&rsquo;ll send one short email when your workspace can be set up for you.</p>
              <LeadForm intent="waitlist" compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
