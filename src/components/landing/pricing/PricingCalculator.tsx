"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { plans, YEARLY_DISCOUNT_LABEL, type BillingCycle, type Plan } from "@/config/pricing";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

function Total({ plan, seats, cycle }: { plan: Plan; seats: number; cycle: BillingCycle }) {
  const per = cycle === "yearly" ? plan.yearly : plan.monthly;
  if (per === null) return <p className="font-mono text-xs text-ink-3">Priced for {plan.minSeats}+ seats · talk to us</p>;
  const billed = Math.max(seats, plan.minSeats);
  const month = per * billed;
  return (
    <p className="font-mono text-xs text-ink-3">
      <motion.span key={`${month}-${cycle}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="inline-block font-medium text-ink">
        {cycle === "yearly" ? `${usd(month * 12)}/yr` : `${usd(month)}/mo`}
      </motion.span>{" "}
      for {billed} seat{billed > 1 ? "s" : ""}
      {billed > seats && ` (min. ${plan.minSeats})`}
    </p>
  );
}

export function PricingCalculator() {
  const [cycle, setCycle] = useState<BillingCycle>("yearly");
  const [seats, setSeats] = useState(5);

  return (
    <div>
      <div className="flex flex-col gap-6 rounded-[var(--radius-xl)] border border-line bg-bg-elev p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div role="radiogroup" aria-label="Billing cycle" className="inline-flex self-start rounded-full bg-bg-sunken p-1">
          {(["monthly", "yearly"] as const).map((c) => (
            <button
              key={c}
              role="radio"
              aria-checked={cycle === c}
              onClick={() => setCycle(c)}
              className={cn("relative min-h-11 rounded-full px-5 text-sm font-medium capitalize transition-colors", cycle === c ? "text-ink" : "text-ink-2")}
            >
              {cycle === c && <motion.span layoutId="cycle-pill" className="absolute inset-0 rounded-full bg-bg-elev shadow-sm" transition={{ type: "spring", stiffness: 500, damping: 36 }} />}
              <span className="relative">
                {c}
                {c === "yearly" && <span className="ml-2 font-mono text-[10px] text-amber-ink">{YEARLY_DISCOUNT_LABEL}</span>}
              </span>
            </button>
          ))}
        </div>
        <label className="flex flex-1 flex-col gap-2 md:max-w-md">
          <span className="flex items-baseline justify-between text-sm text-ink-2">
            Seats that send email or own pipeline
            <output className="font-display text-2xl font-semibold tabular-nums text-ink">{seats}</output>
          </span>
          <input
            type="range"
            min={1}
            max={50}
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
            className="h-11 w-full cursor-pointer accent-[var(--amber)]"
            aria-valuetext={`${seats} seats`}
          />
        </label>
      </div>

      <ul className="mt-6 grid gap-4 lg:grid-cols-3">
        {plans.map((p) => {
          const per = cycle === "yearly" ? p.yearly : p.monthly;
          return (
            <li
              key={p.id}
              className={cn(
                "flex flex-col rounded-[var(--radius-xl)] border p-6 md:p-7",
                p.highlight ? "border-amber bg-[color-mix(in_oklab,var(--bg-elev)_90%,var(--amber))] shadow-[var(--glow-amber)]" : "border-line bg-bg-elev",
              )}
            >
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-2xl font-semibold">{p.name}</h2>
                {p.highlight && <span className="rounded-full bg-amber px-2.5 py-0.5 font-mono text-[10px] font-medium text-on-amber">Most teams</span>}
              </div>
              <p className="mt-2 text-ink-2">{p.blurb}</p>
              <p className="mt-6 font-display text-6xl font-semibold tracking-tight">
                {per === null ? "Custom" : usd(per)}
                {per !== null && <span className="ml-1 font-sans text-base font-normal text-ink-3">/seat/mo</span>}
              </p>
              <div className="mt-2 min-h-5">
                <Total plan={p} seats={seats} cycle={cycle} />
              </div>
              <ButtonLink
                href={p.cta.href === "TRIAL" ? siteConfig.appUrl : siteConfig.demoUrl}
                variant={p.highlight ? "primary" : "secondary"}
                className="mt-6 w-full"
                data-cta={p.cta.href === "TRIAL" ? "trial" : "demo"}
              >
                {p.cta.label}
              </ButtonLink>
              <ul className="mt-6 space-y-2.5 border-t border-line pt-6 text-[0.95rem]">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-ink-2">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-blue" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
