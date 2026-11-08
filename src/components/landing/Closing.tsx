import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { faq } from "@/config/faq";
import { plans } from "@/config/pricing";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { FaqSearch } from "@/components/ui/FaqSearch";
import { TrialButton } from "@/components/ui/TrialButton";
import { SectionHead } from "./shared/SectionHead";

const usd = (n: number) => `$${n}`;

/** Three plans from config, one link to the full page. */
export function PricingTeaser() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-[var(--header-h)] border-t border-line py-16 md:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead id="pricing-title" title="Simple, per-seat pricing.">
            Start free for 14 days. Pay only for seats that send email or own pipeline.
          </SectionHead>
          <Link href="/pricing" className="inline-flex min-h-11 items-center gap-1.5 font-medium text-ink hover:text-amber-ink">
            Compare plans <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-12 grid grid-cols-1 divide-y divide-line border-y border-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {plans.map((p) => (
            <li key={p.id} className="py-7 md:px-8 md:py-9 md:first:pl-0 md:last:pr-0">
              <h3 className="text-h3 font-semibold text-ink">{p.name}</h3>
              <p className="mt-4 text-ink">
                {p.yearly === null ? (
                  <span className="text-3xl font-semibold tracking-tight">Custom</span>
                ) : (
                  <>
                    <span className="tabular text-3xl font-semibold tracking-tight">{usd(p.yearly)}</span>
                    <span className="text-sm text-ink-3"> / seat / month, billed yearly</span>
                  </>
                )}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{p.blurb}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-[var(--header-h)] border-t border-line py-16 md:py-28">
      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <SectionHead id="faq-title" title="Questions, answered.">
          Can&rsquo;t find yours?{" "}
          <Link href="/contact?intent=contact" className="text-ink underline underline-offset-4 hover:text-amber-ink">
            Ask us directly.
          </Link>
        </SectionHead>
        <FaqSearch items={faq} />
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="bg-bg-sunken py-16 md:py-28">
      <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
        <div>
          <h2 id="cta-title" className="text-h1 font-semibold text-ink">
            Start with your inbox.
          </h2>
          <p className="text-lead mt-4 max-w-lg text-ink-2">Connect Gmail or Outlook in a minute. Tomorrow morning, your first follow-ups are ready to approve.</p>
          <div className="mt-8 flex flex-col items-start gap-2">
            <TrialButton />
            <span className="text-sm text-ink-3">{siteConfig.trial.note}</span>
          </div>
        </div>
        <div className="rounded-[var(--radius-xl)] border border-line bg-bg-elev p-6 sm:p-7">
          <h3 className="text-base font-medium tracking-normal text-ink">Not ready yet?</h3>
          <p className="mt-1 text-sm text-ink-2">Join the waitlist and we&rsquo;ll send one email when your workspace is ready.</p>
          <LeadForm intent="waitlist" compact className="mt-5" />
        </div>
      </div>
    </section>
  );
}
