"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { Check, X } from "lucide-react";
import { beforeTabs } from "./data";
import { HandoffChip } from "./HandoffChip";
import { useScrollScene } from "./useScrollScene";
import { cn } from "@/lib/cn";

const Stat = ({ label, value, tone, counter }: { label: string; value: string; tone: "rose" | "mint"; counter?: number }) => (
  <div className="border-t border-line pt-3">
    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">{label}</p>
    <p className={cn("mt-1 font-display text-4xl font-semibold tabular-nums md:text-5xl", tone === "rose" ? "text-ink" : "text-blue-ink")}>
      <span data-counter={counter}>{value}</span>
    </p>
  </div>
);

export function ProblemSplit() {
  const root = useRef<HTMLElement>(null);

  useScrollScene(root, ({ desktop }, el) => {
    const st = { trigger: "[data-split]", start: desktop ? "top 70%" : "top 80%", end: desktop ? "center 45%" : "bottom 70%", scrub: true };
    // The wipe: "after" reveals from its left edge, 1:1 with scroll.
    gsap.fromTo("[data-after]", { clipPath: "inset(0 100% 0 0 round 26px)" }, { clipPath: "inset(0 0% 0 0 round 26px)", ease: "none", scrollTrigger: st });
    gsap
      .timeline({ scrollTrigger: st })
      .fromTo("[data-wipe-line]", { left: "0%", opacity: 1 }, { left: "100%", ease: "none", duration: 1 })
      .to("[data-wipe-line]", { opacity: 0, duration: 0.08 }, 0.92);
    // Copy-paste counter ticks up as the week goes by.
    el.querySelectorAll<HTMLElement>("[data-counter]").forEach((n) => {
      const target = Number(n.dataset.counter);
      const o = { v: 0 };
      n.textContent = "0";
      gsap.to(o, {
        v: target,
        ease: "none",
        scrollTrigger: { trigger: n, start: "top 90%", end: "top 45%", scrub: true },
        onUpdate: () => (n.textContent = Math.round(o.v).toString()),
      });
    });
  });

  return (
    <section ref={root} aria-labelledby="problem-title" className="container-x py-24 md:py-36">
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
        <div>
          <p className="eyebrow">The week before</p>
          <h2 id="problem-title" className="text-h1 mt-4 font-semibold">
            Ahmed sells for a living. Last week he mostly copied and pasted.
          </h2>
        </div>
        <p className="max-w-sm text-ink-2 lg:justify-self-end">
          Same person, same five days, same deals. On the left, the week he had. On the right, the week he gets back.
        </p>
      </div>

      <div data-split className="relative mt-14 grid gap-5 lg:grid-cols-2 lg:gap-0">
        {/* BEFORE */}
        <article aria-label="Before: a week in seven tools" className="min-w-0 rounded-[var(--radius-xl)] border border-line bg-bg-elev p-5 md:p-8 lg:rounded-r-none lg:border-r-0">
          <header className="flex items-baseline justify-between">
            <h3 className="font-display text-2xl font-semibold">Before</h3>
            <span className="font-mono text-xs text-ink-3">Ahmed Fayyaz · Mon–Fri</span>
          </header>
          <div aria-hidden="true" className="mt-6 flex gap-1 overflow-hidden rounded-[10px] bg-bg-sunken p-1.5">
            {beforeTabs.map((t, i) => (
              <span
                key={t}
                className={cn(
                  "min-w-0 shrink truncate rounded-[6px] px-2 py-1.5 font-mono text-[10px] text-ink-3",
                  i === 3 ? "basis-28 shrink-0 bg-bg-elev text-ink shadow-sm" : "basis-24",
                )}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6">
            <Stat label="Copy-pastes" value="147" counter={147} tone="rose" />
            <Stat label="Tabs open" value="23" counter={23} tone="rose" />
            <Stat label="Hours on data entry" value="6h 40m" tone="rose" />
            <Stat label="Follow-ups missed" value="4" counter={4} tone="rose" />
          </div>
          <div className="mt-8 rounded-[var(--radius-lg)] border border-line bg-bg p-4">
            <div className="flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-rose-soft text-rose">
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <p className="font-medium">HelioScale went cold</p>
              <span className="ml-auto font-mono text-[11px] text-rose">12 days</span>
            </div>
            <p className="mt-2 text-sm text-ink-2">
              Lena Brandt asked for times on LinkedIn, Thursday 16:02. Daniel saw it in Slack. Everyone assumed someone else replied.
            </p>
          </div>
        </article>

        {/* AFTER — wiped in */}
        <div className="relative min-w-0">
          <article
            data-after
            aria-label="After: the same week in SooqSense"
            className="h-full rounded-[var(--radius-xl)] border border-line bg-[color-mix(in_oklab,var(--bg-elev)_92%,var(--blue))] p-5 md:p-8 lg:rounded-l-none"
          >
            <header className="flex items-baseline justify-between">
              <h3 className="font-display text-2xl font-semibold text-blue-ink">After</h3>
              <span className="font-mono text-xs text-ink-3">same week · one workspace</span>
            </header>
            <div aria-hidden="true" className="mt-6 flex items-center gap-2 rounded-[10px] bg-bg-sunken p-1.5">
              <span className="rounded-[6px] bg-bg-elev px-3 py-1.5 font-mono text-[10px] text-ink shadow-sm">SooqSense · Morning queue</span>
              <span className="font-mono text-[10px] text-ink-3">that’s it</span>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <Stat label="Copy-pastes" value="0" tone="mint" />
              <Stat label="Tabs open" value="1" tone="mint" />
              <Stat label="Hours reviewing drafts" value="0h 35m" tone="mint" />
              <Stat label="Follow-ups missed" value="0" tone="mint" />
            </div>
            <div className="mt-8 rounded-[var(--radius-lg)] border border-line bg-bg-elev p-4">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-mint-soft text-mint">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <p className="font-medium">HelioScale booked</p>
                <span className="ml-auto font-mono text-[11px] text-mint">Fri 10:00</span>
              </div>
              <p className="mt-2 text-sm text-ink-2">
                Inbox agent caught Lena’s message at 16:02 and drafted two times. Ahmed approved at 16:09 from Slack.
              </p>
              <HandoffChip from="Inbox" to="Ahmed · approve" className="mt-3" />
            </div>
          </article>
          <span data-wipe-line aria-hidden="true" className="absolute inset-y-6 left-full hidden w-[3px] -translate-x-1/2 rounded-full bg-amber opacity-0 lg:block" />
        </div>
      </div>
    </section>
  );
}
