"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { useScene, gsap } from "./useScene";

/**
 * The signature motif: an amber thread that runs down the page and ties each
 * chapter of the deal to a timestamp. Each section starts with one segment;
 * stacked together they read as one continuous line.
 */
export function Thread({ time, label, className, tall = false }: { time: string; label: string; className?: string; tall?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useScene(ref, (_c, root) => {
    const line = root.querySelector("[data-line]");
    const dot = root.querySelector("[data-dot]");
    const chip = root.querySelector("[data-chip]");
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 92%", end: "bottom 62%", scrub: true },
    });
    tl.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none", duration: 1 })
      .fromTo(dot, { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, ease: "back.out(3)", duration: 0.25 })
      .fromTo(chip, { x: -10, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 0.35 }, "<");
  });

  return (
    <div ref={ref} className={cn("container-x", className)} aria-hidden="true">
      <div className={cn("relative ml-[7px] w-[2px]", tall ? "h-24 md:h-36" : "h-16 md:h-24")}>
        <span data-line className="thread-line absolute inset-0 origin-top rounded-full" />
      </div>
      <div className="flex items-center gap-3">
        <span data-dot className="relative grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 border-amber bg-bg">
          <span className="h-1.5 w-1.5 rounded-full bg-amber" />
        </span>
        <span data-chip className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-xs tracking-[0.12em] text-amber-ink uppercase">{time}</span>
          <span className="text-sm text-ink-3">{label}</span>
        </span>
      </div>
    </div>
  );
}
