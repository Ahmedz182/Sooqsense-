"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { plans, YEARLY_DISCOUNT_LABEL, type BillingCycle, type Plan } from "@/config/pricing";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { TrialButton } from "@/components/ui/TrialButton";
import { cn } from "@/lib/cn";

const usd = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const MAX_SEATS = 50;

function PlanCard({ plan, cycle, seats }: { plan: Plan; cycle: BillingCycle; seats: number }) {
  const per = cycle === "yearly" ? plan.yearly : plan.monthly;
  const billed = Math.max(seats, plan.minSeats);
  const monthlyTotal = per === null ? null : per * billed;
  return (
    <li className={cn("flex flex-col rounded-[var(--radius-xl)] border bg-bg-elev p-6 sm:p-7", plan.highlight ? "border-ink" : "border-line")}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-h3 font-semibold text-ink">{plan.name}</h2>
        {plan.highlight && <span className="text-xs font-medium text-amber-ink">Most teams start here</span>}
      </div>
      <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-ink-2">{plan.blurb}</p>
      <div className="mt-6 border-t border-line pt-5">
        {per === null ? (
          <>
            <p className="text-4xl font-semibold tracking-tight text-ink">Custom</p>
            <p className="mt-2 text-sm text-ink-3">From {plan.minSeats} seats · annual agreement</p>
          </>
        ) : (
          <>
            <p className="flex items-baseline gap-1.5">
              <motion.span key={per} initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="tabular text-4xl font-semibold tracking-tight text-ink">
                {usd(per)}
              </motion.span>
              <span className="text-sm text-ink-3">/ seat / month</span>
            </p>
            <p className="mt-2 text-sm text-ink-2" aria-live="polite">
              <span className="tabular font-medium text-ink">{usd(monthlyTotal!)}</span> a month for {billed} seat{billed > 1 ? "s" : ""}
              {cycle === "yearly" && <span className="text-ink-3"> · {usd(monthlyTotal! * 12)} billed yearly</span>}
            </p>
            {seats < plan.minSeats && <p className="mt-1 text-xs text-amber-ink">Starts at {plan.minSeats} seats</p>}
          </>
        )}
      </div>
      <ul className="mt-6 flex-1 space-y-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-sm text-ink-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        {plan.cta.href === "TRIAL" ? (
          <TrialButton size="md" label={plan.cta.label} variant={plan.highlight ? "primary" : "secondary"} className="w-full" />
        ) : (
          <ButtonLink href={siteConfig.demoUrl} variant="secondary" className="w-full">
            {plan.cta.label}
          </ButtonLink>
        )}
      </div>
    </li>
  );
}

/** Monthly/yearly toggle + seat slider driving every plan's live total (minSeats respected). */
export function PricingCalculator() {
  const [cycle, setCycle] = useState<BillingCycle>("yearly");
  const [seats, setSeats] = useState(5);

  return (
    <div>
      <div className="flex flex-col gap-6 rounded-[var(--radius-xl)] border border-line bg-bg-elev p-5 sm:p-6 md:flex-row md:items-center md:justify-between md:gap-12">
        <div role="group" aria-label="Billing cycle" className="inline-flex self-start rounded-full bg-bg-sunken p-1">
          {(["monthly", "yearly"] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cycle === c}
              onClick={() => setCycle(c)}
              className={cn("relative min-h-11 rounded-full px-5 text-sm capitalize transition-colors", cycle === c ? "text-ink" : "text-ink-3 hover:text-ink")}
            >
              {cycle === c && <motion.span layoutId="cycle-pill" className="absolute inset-0 rounded-full bg-bg-elev shadow-sm" transition={{ type: "spring", stiffness: 500, damping: 34 }} />}
              <span className="relative">
                {c}
                {c === "yearly" && <span className="ml-2 text-xs text-amber-ink normal-case">{YEARLY_DISCOUNT_LABEL}</span>}
              </span>
            </button>
          ))}
        </div>
        <label className="flex flex-1 flex-col gap-2 md:max-w-md">
          <span className="flex items-baseline justify-between gap-4 text-sm text-ink-2">
            Seats that send email or own pipeline
            <span className="tabular text-2xl font-semibold text-ink">{seats}</span>
          </span>
          <input
            type="range"
            min={1}
            max={MAX_SEATS}
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
            aria-valuetext={`${seats} seats`}
            className="range-amber h-11 w-full cursor-pointer"
            style={{ ["--fill" as string]: `${((seats - 1) / (MAX_SEATS - 1)) * 100}%` }}
          />
        </label>
      </div>
      <ul className="mt-6 grid gap-5 md:grid-cols-3">
        {plans.map((p) => (
          <PlanCard key={p.id} plan={p} cycle={cycle} seats={seats} />
        ))}
      </ul>
      <p className="mt-5 text-sm text-ink-3">Prices in USD, excluding tax. Viewers are free. {siteConfig.trial.note}.</p>
    </div>
  );
}
