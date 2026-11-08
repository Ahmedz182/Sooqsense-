"use client";

import { useEffect } from "react";

/**
 * Opening transition for every section on every page.
 *
 * Headings, copy, buttons, forms and top-level visuals fade in, lift and
 * un-blur in a short stagger as their section enters the viewport. It uses the
 * CSS `translate` property, so it never fights GSAP's `transform` scrubs, and
 * it does nothing under prefers-reduced-motion (content is simply visible).
 */
const TEXT = "h1, h2, h3, p, ul, ol, form, dl, table, [data-cta], a[class*='rounded-full']";

export function SectionReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section, main article, footer"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    const tagged: HTMLElement[] = [];
    for (const section of sections) {
      // Text blocks outside decorative product windows, plus each top-most decorative visual as one unit.
      const candidates = Array.from(section.querySelectorAll<HTMLElement>(`${TEXT}, [aria-hidden="true"]`)).filter((el) => {
        if (el.closest(".hero-word")) return false;
        // icons and tiny decorations ride along with their parent block
        if (el instanceof SVGElement || el.closest("button")) return false;
        const box = el.getBoundingClientRect();
        if (box.width < 48 && box.height < 48) return false;
        const hiddenAncestor = el.parentElement?.closest('[aria-hidden="true"]');
        if (hiddenAncestor && section.contains(hiddenAncestor)) return false; // inside a visual → animates with it
        // skip elements nested inside another candidate so blocks move as one
        return !Array.from(section.querySelectorAll<HTMLElement>("p, li, h1, h2, h3, form")).some(
          (other) => other !== el && other.contains(el),
        );
      });
      candidates.slice(0, 40).forEach((el, i) => {
        if (el.closest("[data-no-reveal]")) return;
        el.classList.add("reveal");
        el.style.setProperty("--reveal-delay", `${Math.min(i, 6) * 70}ms`);
        tagged.push(el);
      });
      io.observe(section);
    }

    return () => {
      io.disconnect();
      for (const el of tagged) el.classList.remove("reveal");
    };
  }, []);
  return null;
}
