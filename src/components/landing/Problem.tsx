"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Thread } from "./Thread";
import { useScene, ScrollTrigger } from "./useScene";
import { oldTuesday, story } from "./story";

const last = oldTuesday.length - 1;

function Counter({ value, label, warn }: { value: number; label: string; warn?: boolean }) {
  return (
    <div className="flex flex-col">
      <span className={cn("font-display text-3xl font-semibold tabular leading-none sm:text-5xl", warn && value > 0 ? "text-rose" : "text-ink")}>{value}</span>
      <span className="mt-1.5 font-mono text-[0.68rem] tracking-wide text-ink-3 uppercase">{label}</span>
    </div>
  );
}

/** Chapter 1 — the problem, told as Ahmed's ordinary Tuesday. */
export function Problem() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState<number>(last);

  useScene(ref, (_c, root) => {
    setStep(0);
    const items = root.querySelectorAll<HTMLElement>("[data-hour]");
    items.forEach((el, i) => {
      if (i === 0) return;
      ScrollTrigger.create({
        trigger: el,
        start: "top 62%",
        onEnter: () => setStep(i),
        onLeaveBack: () => setStep(i - 1),
      });
    });
    return () => setStep(last);
  });

  const now = oldTuesday[step];

  return (
    <section ref={ref} id="product" aria-labelledby="problem-title" className="scroll-mt-20">
      <Thread time="Tuesday, the old way" label={`${story.owner.name}, ${story.owner.title}`} />
      <div className="container-x mt-10 grid gap-x-16 gap-y-8 pb-20 md:mt-12 md:grid-cols-[0.9fr_1.1fr] md:grid-rows-[auto_1fr] md:pb-24">
        <div>
          <h2 id="problem-title" className="text-h2 font-semibold">
            Ahmed&rsquo;s Tuesday.
            <span className="block text-ink-3">37 tabs by six.</span>
          </h2>
          <p className="text-lead mt-5 max-w-md text-ink-2">
            Nothing dramatic happened. No deal blew up. The pipeline just leaked a little, the way it does every day, one copied note and one
            forgotten reply at a time.
          </p>
        </div>
        {/* Live counter: sticky so it ticks while the day scrolls by. */}
        <div className="sticky top-[calc(var(--header-h)+8px)] z-10 self-start md:top-32 md:col-start-1 md:row-start-2">
          <div className="paper flex items-end justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5" aria-live="polite">
            <Counter value={now.tabs} label="Tabs open" />
            <Counter value={now.tools} label="Tools" />
            <Counter value={now.missed} label="Missed follow-ups" warn />
            <span className="hidden font-mono text-xs text-ink-3 sm:block">{now.t}</span>
          </div>
        </div>

        <ol className="relative border-l border-line pl-6 sm:pl-8 md:col-start-2 md:row-span-2 md:row-start-1">
          {oldTuesday.map((h, i) => (
            <li
              key={h.t}
              data-hour
              className={cn(
                "relative py-6 transition-opacity duration-300 sm:py-8",
                i <= step ? "opacity-100" : "opacity-35",
              )}
            >
              <span
                className={cn(
                  "absolute top-[2.15rem] -left-[calc(1.5rem+5px)] h-[9px] w-[9px] rounded-full border-2 sm:-left-[calc(2rem+5px)] sm:top-[2.65rem]",
                  i === last ? "border-rose bg-rose" : "border-line-strong bg-bg",
                )}
                aria-hidden="true"
              />
              <p className="font-mono text-sm text-ink-3 tabular">{h.t}</p>
              <p className={cn("mt-1 font-display text-xl leading-snug sm:text-2xl", i === last ? "text-ink" : "text-ink-2")}>{h.what}</p>
            </li>
          ))}
          <li className="pt-6 text-ink-2">
            Somewhere in that inbox, a VP of RevOps in Boston just filled in the contact form.
          </li>
        </ol>
      </div>
    </section>
  );
}
