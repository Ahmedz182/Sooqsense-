"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export type SceneConditions = { wide: boolean; narrow: boolean };

/**
 * Scroll scenes for the landing page.
 *
 * - Runs only without prefers-reduced-motion; otherwise the markup's final state
 *   is what the visitor (and the screenshot script) sees.
 * - `wide` (≥ 1024px) may pin; `narrow` gets lighter, unpinned scenes.
 * - Everything lives in a gsap.matchMedia scoped to `scope`, so every tween and
 *   ScrollTrigger is reverted on unmount or when a media query flips.
 * - Animations are scrubbed: scroll position maps 1:1 to progress, both ways.
 */
export function useScene(
  scope: RefObject<HTMLElement | null>,
  setup: (c: SceneConditions, root: HTMLElement) => void | (() => void),
) {
  useIsoLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    const mm = gsap.matchMedia(root);
    mm.add(
      {
        wide: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        narrow: "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const { wide, narrow } = ctx.conditions as SceneConditions;
        if (!wide && !narrow) return;
        return setup({ wide, narrow }, root);
      },
    );
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export { gsap, ScrollTrigger };
