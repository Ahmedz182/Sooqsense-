import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { plans, YEARLY_DISCOUNT_LABEL } from "@/config/pricing";
import { cn } from "@/lib/cn";
import { Thread } from "./Thread";

/** Chapter 8 — what it costs, as a short menu rather than a card grid. */
export function PricingTeaser() {
  return (
    <section aria-labelledby="pt-title">
      <Thread time="Pricing" label="Per seat, in USD" />
      <div className="container-x mt-10 grid gap-10 pb-20 md:mt-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:pb-24">
        <div>
          <h2 id="pt-title" className="text-h2 font-semibold">
            Cheaper than the follow-ups you&rsquo;re missing.
          </h2>
          <p className="mt-5 max-w-sm text-ink-2">Pay per seat that sends email or owns pipeline. Viewers are free. Yearly billing gets you {YEARLY_DISCOUNT_LABEL}.</p>
          <Link href="/pricing" className="group mt-7 inline-flex min-h-11 items-center gap-2 font-medium text-amber-ink">
            Compare plans and work out your total
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
        <ul className="border-t border-line">
          {plans.map((p) => (
            <li key={p.id} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-line py-6">
              <p className="flex items-center gap-3 font-display text-2xl font-semibold text-ink">
                {p.name}
                {p.highlight && <span className="rounded-full bg-amber-soft px-2.5 py-0.5 font-mono text-[0.65rem] font-normal tracking-wide text-amber-ink uppercase">Recommended</span>}
              </p>
              <p className={cn("text-right font-display text-2xl font-semibold tabular text-ink")}>
                {p.monthly === null ? "Let’s talk" : (
                  <>
                    ${p.monthly}
                    <span className="ml-1 font-sans text-sm font-normal text-ink-3">/seat/mo</span>
                  </>
                )}
              </p>
              <p className="col-span-2 max-w-md text-ink-2">{p.blurb}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
