"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { TrialButton } from "@/components/ui/TrialButton";
import { siteConfig } from "@/config/site";
import { Thread } from "../Thread";
import { TapBuilder } from "./TapBuilder";
import { templates } from "./templates";

const Canvas = dynamic(() => import("./Canvas"), {
  ssr: false,
  loading: () => <CanvasSkeleton />,
});

function CanvasSkeleton() {
  return (
    <div className="grid h-full place-items-center bg-bg-sunken bg-dots">
      <p className="font-mono text-xs text-ink-3">Loading the canvas…</p>
    </div>
  );
}

/** Chapter 7 — hand the visitor the builder. */
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

  // Only fetch React Flow when the section is close to the viewport.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "800px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="playground" aria-labelledby="pg-title" className="scroll-mt-20">
      <Thread time="Your turn" label="Build the next one" />
      <div className="container-x mt-8 md:mt-12">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 id="pg-title" className="text-h2 font-semibold">
              Now build yours.
            </h2>
            <p className="text-lead mt-4 max-w-xl text-ink-2">
              Start from one of Ahmed&rsquo;s workflows. Swap a step, add one, wire it differently. This is the real builder, minus your data.
            </p>
          </div>
        </div>

        <div role="tablist" aria-label="Workflow templates" className="-mx-[var(--gutter)] mt-8 flex gap-2 overflow-x-auto px-[var(--gutter)] pb-1 [scrollbar-width:none]">
          {templates.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={t.id === active}
              onClick={() => setActive(t.id)}
              className={cn(
                "flex min-h-11 shrink-0 flex-col items-start rounded-[var(--radius-md)] border px-4 py-2.5 text-left transition-colors",
                t.id === active ? "border-amber bg-amber-soft" : "border-line bg-bg-elev hover:border-line-strong",
              )}
            >
              <span className="text-sm font-medium text-ink">{t.name}</span>
              <span className="hidden text-xs text-ink-3 sm:block">{t.blurb}</span>
            </button>
          ))}
        </div>

        <div ref={box} className="mt-4">
          {mode === "tap" ? (
            <TapBuilder template={template} />
          ) : (
            <div className="h-[540px] overflow-hidden rounded-[var(--radius-lg)] border border-line shadow-md">
              {mode === "canvas" && near ? <Canvas template={template} /> : <CanvasSkeleton />}
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col items-start gap-3 pb-16 sm:flex-row sm:items-center sm:justify-between md:pb-20">
          <p className="max-w-md text-ink-2">Like what you built? It&rsquo;s waiting in your workspace, connected to your real inbox.</p>
          <div className="flex flex-col items-start gap-1.5 sm:items-end">
            <TrialButton label="Run it on your inbox" />
            <span className="font-mono text-xs text-ink-3">{siteConfig.trial.note}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
