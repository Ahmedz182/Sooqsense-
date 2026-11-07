"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type SceneConditions = { desktop: boolean; mobile: boolean };

/**
 * Scrubbed scroll scenes, scoped to one section.
 * - Only runs with `prefers-reduced-motion: no-preference`; otherwise the DOM
 *   keeps its authored (final) state, which is what screenshots capture.
 * - `desktop` (≥1024px) may pin; `mobile` scenes must not.
 * - Everything is reverted on unmount (gsap.matchMedia cleans its triggers).
 */
export function useScrollScene(ref: RefObject<HTMLElement | null>, build: (c: SceneConditions, el: HTMLElement) => void) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add(
      {
        desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const c = ctx.conditions as SceneConditions;
        build(c, el);
      },
    );
    return () => mm.revert();
    // build is defined inline by callers; scenes are set up once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}

/** True when the visitor prefers reduced motion (client only). */
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
