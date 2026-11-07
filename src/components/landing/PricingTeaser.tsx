import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { plans } from "@/config/pricing";
import { cn } from "@/lib/cn";

export function PricingTeaser() {
  return (
    <section aria-labelledby="pt-title" className="border-y border-line bg-bg-sunken py-20 md:py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="pt-title" className="text-h2 font-semibold">Priced per seat. Agents included.</h2>
          <Link href="/pricing" className="group inline-flex min-h-11 items-center gap-2 font-medium text-ink underline decoration-line-strong underline-offset-[6px] hover:decoration-amber">
            Compare plans <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-10 grid overflow-hidden rounded-[var(--radius-xl)] border border-line bg-bg-elev md:grid-cols-3">
          {plans.map((p, i) => (
            <li key={p.id} className={cn("relative p-6 md:p-8", i > 0 && "border-t border-line md:border-l md:border-t-0", p.highlight && "bg-[color-mix(in_oklab,var(--bg-elev)_90%,var(--amber))]")}>
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                {p.highlight && <span className="rounded-full bg-amber px-2.5 py-0.5 font-mono text-[10px] font-medium text-on-amber">Most teams</span>}
              </div>
              <p className="mt-4 font-display text-5xl font-semibold tracking-tight">
                {p.yearly === null ? "Custom" : `$${p.yearly}`}
                {p.yearly !== null && <span className="ml-1 font-sans text-base font-normal text-ink-3">/seat/mo</span>}
              </p>
              <p className="mt-1 font-mono text-[11px] text-ink-3">{p.yearly === null ? `from ${p.minSeats} seats` : `billed yearly · $${p.monthly} monthly`}</p>
              <p className="mt-4 text-ink-2">{p.blurb}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-xs text-ink-3">Every plan: 14-day free trial, no card, nothing sends without approval.</p>
      </div>
    </section>
  );
}
