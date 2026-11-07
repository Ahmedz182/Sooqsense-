"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * A small looping counter for "live" micro-demos. It only ticks while the
 * element is on screen, and stays on `steps - 1` (the complete state) for
 * reduced motion and before hydration — so static renders are never half-built.
 */
export function useLive(ref: RefObject<HTMLElement | null>, steps: number, interval = 1400, hold = 3) {
  const [step, setStep] = useState(steps - 1);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    let i = 0;
    const total = steps + hold; // linger on the finished state for a few ticks
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timer) {
          i = 0;
          setStep(0);
          timer = setInterval(() => {
            i = (i + 1) % total;
            setStep(Math.min(i, steps - 1));
          }, interval);
        } else if (!entry.isIntersecting && timer) {
          clearInterval(timer);
          timer = undefined;
          setStep(steps - 1);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [ref, steps, interval, hold]);

  return step;
}
