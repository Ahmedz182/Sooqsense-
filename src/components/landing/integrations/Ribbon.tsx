"use client";

import { useRef } from "react";
import { integrations } from "@/config/demo";
import { useScene, gsap } from "../useScene";

const words = integrations.map((i) => i.name).join("  ·  ");
const text = `${words}  ·  ${words}  ·  ${words}`;

function RibbonSvg({ id, viewBox, d, font, className }: { id: string; viewBox: string; d: string; font: number; className: string }) {
  return (
    <svg viewBox={viewBox} className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <path id={id} d={d} fill="none" />
      <path d={d} fill="none" strokeWidth={font * 2.6} strokeLinecap="butt" className="stroke-amber" />
      <path d={d} fill="none" strokeWidth={font * 2.6 + 2} strokeLinecap="butt" className="stroke-amber opacity-25" transform="translate(0 10)" />
      <text className="fill-on-amber font-mono" style={{ fontSize: font, letterSpacing: "0.06em" }} dominantBaseline="central">
        <textPath data-ribbon href={`#${id}`} startOffset="0%">
          {text}
        </textPath>
      </text>
    </svg>
  );
}

/** A curved ribbon of every integration, sliding with the scroll. */
export function Ribbon() {
  const ref = useRef<HTMLDivElement>(null);
  useScene(ref, (_c, root) => {
    root.querySelectorAll("[data-ribbon]").forEach((tp) => {
      gsap.fromTo(
        tp,
        { attr: { startOffset: "0%" } },
        { attr: { startOffset: "-38%" }, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } },
      );
    });
  });
  return (
    <div ref={ref} className="relative -my-4 overflow-hidden">
      <p className="sr-only">Integrations: {integrations.map((i) => i.name).join(", ")}.</p>
      <RibbonSvg id="ribbon-d" viewBox="0 0 1440 240" d="M -60 170 C 360 30, 820 250, 1500 60" font={20} className="hidden h-[240px] w-full md:block" />
      <RibbonSvg id="ribbon-m" viewBox="0 0 600 200" d="M -40 150 C 160 40, 380 210, 660 60" font={17} className="h-[200px] w-full md:hidden" />
    </div>
  );
}
