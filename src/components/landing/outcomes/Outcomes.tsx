"use client";

import { useRef } from "react";
import { Em, SectionHead } from "../shared/SectionHead";
import { gsap, useScene } from "../shared/useScene";
import { OutcomeScene } from "./OutcomeScene";
import { scenes } from "./scenes";

/** Three workflows, three outcomes: the work SooqSense does, and the time it gives back. */
export function Outcomes() {
  const root = useRef<HTMLElement>(null);

  useScene(root, (_c, el) => {
    el.querySelectorAll<HTMLElement>("[data-scene]").forEach((scene) => {
      gsap.fromTo(
        scene.querySelectorAll("[data-scene-step]"),
        { autoAlpha: 0.25, x: -10 },
        { autoAlpha: 1, x: 0, stagger: 0.12, ease: "none", scrollTrigger: { trigger: scene, start: "top 85%", end: "center 55%", scrub: true } },
      );
    });
  });

  return (
    <section ref={root} id="outcomes" aria-labelledby="outcomes-title" className="scroll-mt-[var(--header-h)] py-16 md:py-28">
      <div className="container-x">
        <SectionHead id="outcomes-title" title={<>One approval, not seven <Em>tools</Em>.</>}>
          Follow-ups never slip, the CRM stays current, and the busywork happens while you sell. Three workflows, start to finish.
        </SectionHead>
        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 lg:grid-cols-3" aria-label="Example workflow outcomes">
          {scenes.map((s) => (
            <OutcomeScene key={s.id} scene={s} />
          ))}
        </div>
        <p className="mt-5 text-sm text-ink-3">Illustrative examples from a demo workspace.</p>
      </div>
    </section>
  );
}
