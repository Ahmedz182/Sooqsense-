"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export type SceneConditions = { desktop: boolean; mobile: boolean };

/**
 * Scroll scenes for the landing page.
 *
 * - Runs only when the visitor has NOT asked for reduced motion; otherwise the
 *   markup's default (final) state is what they see.
 * - `desktop` (≥ 900px) gets pinned scenes, `mobile` gets lighter, unpinned ones.
 * - Everything is created inside gsap.matchMedia scoped to `scope`, so every tween
 *   and ScrollTrigger is reverted on unmount or when a media query flips.
 *
 * Animations should be scrubbed (`scrub: true`) so scroll position maps 1:1.
 */
export function useScene(scope: RefObject<HTMLElement | null>, setup: (c: SceneConditions, root: HTMLElement) => void | (() => void), deps: unknown[] = []) {
  useIsoLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    const mm = gsap.matchMedia(root);
    mm.add(
      {
        desktop: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 899.98px) and (prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const { desktop, mobile } = ctx.conditions as SceneConditions;
        if (!desktop && !mobile) return;
        return setup({ desktop, mobile }, root);
      },
    );
    // Fonts and lazy content change layout after first paint.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { gsap, ScrollTrigger };
