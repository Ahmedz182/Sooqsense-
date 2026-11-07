"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { TrialButton } from "@/components/ui/TrialButton";
import { useMedia } from "../useMedia";
import { PlaygroundTap } from "./PlaygroundTap";

const Loading = () => (
  <div className="grid h-full place-items-center bg-dots">
    <p className="font-mono text-xs text-ink-3">Loading the canvas…</p>
  </div>
);

/** React Flow is only fetched on wide screens, and only once the section is near the viewport. */
const PlaygroundCanvas = dynamic(() => import("./PlaygroundCanvas"), { ssr: false, loading: Loading });

export function PlaygroundSection() {
  const box = useRef<HTMLDivElement>(null);
  const wide = useMedia("(min-width: 768px)", true);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="playground" aria-labelledby="pg-title" className="scroll-mt-20 py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Playground</p>
            <h2 id="pg-title" className="text-h1 mt-3 font-semibold">Assemble your own team.</h2>
          </div>
          <p className="max-w-sm text-ink-2">Pick a template, swap a step, wire in another agent. It’s the same builder you get on day one.</p>
        </div>

        <div ref={box} className="mt-10 overflow-hidden rounded-[var(--radius-xl)] border border-line bg-bg-elev shadow-md md:h-[560px]">
          {wide ? near ? <PlaygroundCanvas /> : <Loading /> : <PlaygroundTap />}
        </div>

        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink-2">Like what you built? Run the real one on your own inbox.</p>
          <TrialButton size="md" />
        </div>
      </div>
    </section>
  );
}
