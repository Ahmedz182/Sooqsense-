"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Clock3, MousePointerClick } from "lucide-react";
import { cn } from "@/lib/cn";
import { Thread } from "../Thread";
import { useScene, gsap } from "../useScene";
import { NodeCard } from "./NodeCard";
import { branchTakesYes, captions, defaults, type StepKey } from "./flow";

const chain: StepKey[] = ["trigger", "enrich", "security", "ai", "branch"];

function Edge({ i }: { i: number }) {
  const attr = i < 0 ? { "data-edge-m": "" } : { "data-edge": i };
  return (
    <div className="flex h-6 justify-start pl-7" aria-hidden="true">
      <span {...attr} className="block h-full w-[2px] origin-top rounded-full bg-amber" />
    </div>
  );
}

/** Chapter 2 — the centrepiece: Mira's lead runs through a workflow that builds itself as you scroll. */
export function WorkflowScene() {
  const ref = useRef<HTMLElement>(null);
  const [values, setValues] = useState<Record<StepKey, string>>({ ...defaults });
  const set = (k: StepKey) => (v: string) => setValues((s) => ({ ...s, [k]: v }));
  const yes = branchTakesYes[values.branch] ?? true;

  useScene(ref, ({ desktop }, root) => {
    const q = <T extends Element = HTMLElement>(s: string) => Array.from(root.querySelectorAll<T>(s));
    const nodes = q("[data-node]");
    const edges = q("[data-edge]");
    const mobileEdges = q("[data-edge-m]");
    const caps = q("[data-cap]");

    if (desktop) {
      const pinEl = root.querySelector<HTMLElement>("[data-pin]");
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: { trigger: pinEl, start: "top top", end: "+=2200", pin: true, scrub: true, anticipatePin: 1 },
      });
      caps.forEach((c, i) => i > 0 && gsap.set(c, { opacity: 0.32 }));
      nodes.forEach((n, i) => {
        if (i > 0) {
          const e = edges[i - 1];
          if (e) tl.fromTo(e, { scaleY: 0 }, { scaleY: 1, duration: 0.4, ease: "none" });
        }
        tl.fromTo(n, { opacity: 0, y: 28, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.6)" }, i === 0 ? 0 : ">-0.05");
        const capIndex = Math.min(i, caps.length - 1);
        if (i > 0 && i < caps.length) {
          tl.to(caps[capIndex - 1], { opacity: 0.32, duration: 0.3 }, "<").to(caps[capIndex], { opacity: 1, duration: 0.3 }, "<");
        }
      });
      tl.fromTo(root.querySelector("[data-result]"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }).to({}, { duration: 0.6 });
    } else {
      nodes.forEach((n) => {
        gsap.fromTo(n, { opacity: 0.15, y: 26 }, { opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: n, start: "top 92%", end: "top 65%", scrub: true } });
      });
      [...edges, ...mobileEdges].forEach((e) => {
        gsap.fromTo(e, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: e, start: "top 85%", end: "bottom 70%", scrub: true } });
      });
    }
  });

  return (
    <section ref={ref} id="workflows" aria-labelledby="wf-title" className="scroll-mt-4">
      <Thread time="Tue 13:04" label="Same Tuesday, with SooqSense" />
      <div
        data-pin
        className="container-x grid grid-cols-[minmax(0,1fr)] gap-10 pt-10 pb-24 min-[900px]:h-[100svh] min-[900px]:min-h-[760px] min-[900px]:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] min-[900px]:items-center min-[900px]:gap-14 min-[900px]:pt-[var(--header-h)] min-[900px]:pb-4"
      >
        <div>
          <h2 id="wf-title" className="text-h2 font-semibold">
            The form fills in.
            <span className="block">The work starts itself.</span>
          </h2>
          <p className="mt-5 max-w-md text-ink-2">
            One workflow, five steps, built once by Ahmed. It runs every time someone like Mira gets in touch, even at 13:04 when he&rsquo;s
            on another call.
          </p>
          <ol className="mt-8 hidden space-y-4 min-[900px]:block">
            {captions.map((c, i) => (
              <li key={c.key} data-cap className="grid grid-cols-[2rem_1fr] gap-x-3">
                <span className="font-mono text-xs leading-6 text-amber-ink">0{i + 1}</span>
                <span>
                  <span className="font-medium text-ink">{c.title}.</span> <span className="text-ink-2">{c.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="paper bg-dots relative p-3 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 px-1 font-mono text-[0.7rem] text-ink-3">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-mint" aria-hidden="true" /> Inbound lead · live
            </span>
            <span className="flex items-center gap-1.5">
              <MousePointerClick className="h-3.5 w-3.5" aria-hidden="true" /> Click a step to change it
            </span>
          </div>

          {chain.map((k, i) => (
            <div key={k}>
              {i > 0 && <Edge i={i} />}
              <div data-node>
                <NodeCard stepKey={k} value={values[k]} onChange={set(k)} />
                <p className="mt-2 px-1 text-sm text-ink-3 min-[900px]:hidden">{captions[i].body}</p>
              </div>
            </div>
          ))}

          {/* Fork */}
          <div className="sm:hidden">
            <Edge i={-1} />
          </div>
          <div className="relative hidden h-12 sm:block" aria-hidden="true">
            <svg data-edge={5} viewBox="0 0 100 48" preserveAspectRatio="none" className="absolute inset-0 h-full w-full origin-top overflow-visible">
              <path d="M 5 0 C 5 34, 25 14, 25 48" fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke" className={cn("transition-[stroke] duration-300", yes ? "stroke-amber" : "stroke-line-strong")} strokeDasharray={yes ? undefined : "4 4"} />
              <path d="M 5 0 C 5 34, 75 14, 75 48" fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke" className={cn("transition-[stroke] duration-300", !yes ? "stroke-amber" : "stroke-line-strong")} strokeDasharray={!yes ? undefined : "4 4"} />
            </svg>
          </div>
          <div data-node className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {(["yes", "no"] as const).map((k) => {
              const on = k === "yes" ? yes : !yes;
              return (
                <div key={k} className="relative">
                  {on && (
                    <motion.span
                      layoutId="wf-path"
                      transition={{ type: "spring", stiffness: 420, damping: 30 }}
                      className="pointer-events-none absolute -inset-1 rounded-[calc(var(--radius-lg)+4px)] border-2 border-amber"
                      aria-hidden="true"
                    />
                  )}
                  <NodeCard stepKey={k} value={values[k]} onChange={set(k)} active={on} tag={k === "yes" ? "Yes · Action" : "No · Campaign"} />
                </div>
              );
            })}
          </div>

          <p data-result className="mt-4 flex items-center gap-2 px-1 text-sm text-ink-2" aria-live="polite">
            <Clock3 className="h-4 w-4 shrink-0 text-amber-ink" aria-hidden="true" />
            {yes ? (
              <span>
                13:06 · Pitch report drafted for Mira. Waiting in <strong className="font-medium text-ink">Ahmed&rsquo;s queue</strong> for approval.
              </span>
            ) : (
              <span>
                13:06 · Mira joins the RevOps nurture track. First email <strong className="font-medium text-ink">Thu 09:00</strong> her time.
              </span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
