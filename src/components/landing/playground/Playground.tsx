"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { TrialButton } from "@/components/ui/TrialButton";
import { cn } from "@/lib/cn";
import { SectionHead } from "../shared/SectionHead";
import { TapBuilder } from "./TapBuilder";
import { templates } from "./templates";

const Canvas = dynamic(() => import("./Canvas"), { ssr: false, loading: () => <CanvasSkeleton /> });

function CanvasSkeleton() {
  return (
    <div className="grid h-full place-items-center bg-bg-sunken bg-dots">
      <p className="text-sm text-ink-3">Loading the canvas…</p>
    </div>
  );
}

/** The real builder, minus your data. React Flow on wide screens, tap builder on phones. */
export function Playground() {
  const [active, setActive] = useState(templates[0].id);
  const [mode, setMode] = useState<"unknown" | "canvas" | "tap">("unknown");
  const [near, setNear] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const template = templates.find((t) => t.id === active)!;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setMode(mq.matches ? "canvas" : "tap");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Fetch React Flow only when the section is close to the viewport.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="playground" aria-labelledby="pg-title" className="scroll-mt-[var(--header-h)] border-t border-line py-16 md:py-28">
      <div className="container-x">
        <SectionHead id="pg-title" title="Now make your own.">
          Start from a template. Swap a step, add one, connect it differently.
        </SectionHead>

        <div role="tablist" aria-label="Workflow templates" className="mt-10 flex flex-wrap gap-2">
          {templates.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={t.id === active}
              onClick={() => setActive(t.id)}
              className={cn(
                "min-h-11 rounded-full border px-4 text-sm transition-colors",
                t.id === active ? "border-ink bg-ink text-ink-inverse" : "border-line-strong text-ink-2 hover:border-ink-3 hover:text-ink",
              )}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div ref={box} className="mt-5">
          {mode === "tap" ? (
            <TapBuilder template={template} />
          ) : (
            <div className="h-[520px] overflow-hidden rounded-[var(--radius-xl)] border border-line">
              {mode === "canvas" && near ? <Canvas template={template} /> : <CanvasSkeleton />}
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-ink-2">Run it on your real inbox. Your first queue is ready the next morning.</p>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <TrialButton />
            <span className="text-xs text-ink-3">{siteConfig.trial.note}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
