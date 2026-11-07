"use client";

import { Fragment, useCallback, useRef, useState } from "react";
import { gsap } from "gsap";
import { owner } from "@/config/demo";
import { cn } from "@/lib/cn";
import { HandoffChip } from "../HandoffChip";
import { useMedia } from "../useMedia";
import { useScrollScene } from "../useScrollScene";
import { FlowNodeCard } from "./FlowNodeCard";
import { NodeEditor } from "./NodeEditor";
import { CANVAS_H, NODE_W, detailFor, flowEdges, flowNodes, runTime } from "./model";

const initial = Object.fromEntries(flowNodes.map((n) => [n.id, n.initial])) as Record<string, string>;

export function WorkflowSection() {
  const root = useRef<HTMLElement>(null);
  const [opts, setOpts] = useState(initial);
  const [editing, setEditing] = useState<string | null>(null);
  const desktop = useMedia("(min-width: 1024px)");

  const path: "yes" | "no" = detailFor(opts.branch).endsWith("yes") ? "yes" : "no";
  const onPath = (id: string) => !(id === "yes" || id === "no") || id === path;
  const close = useCallback(() => setEditing(null), []);
  const pick = (id: string, v: string) => setOpts((o) => ({ ...o, [id]: v }));
  const editNode = flowNodes.find((n) => n.id === editing);

  useScrollScene(root, ({ desktop: d }, el) => {
    const nodes = el.querySelectorAll<HTMLElement>(d ? "[data-canvas] [data-node]" : "[data-list] [data-node]");
    if (d) {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top top", end: "+=1500", pin: true, scrub: true, anticipatePin: 1 },
      });
      gsap.set(nodes, { opacity: 0.18, y: 10 });
      gsap.set(nodes[0], { opacity: 1, y: 0 });
      gsap.set("[data-edge]", { strokeDashoffset: 1 });
      gsap.set("[data-log] li", { opacity: 0 });
      nodes.forEach((n, i) => {
        if (i === 0) return;
        const edge = el.querySelector(`[data-edge="${n.dataset.node}"]`);
        tl.to(edge, { strokeDashoffset: 0, duration: 0.6 }, i === 6 ? "<" : ">");
        tl.to(n, { opacity: 1, y: 0, duration: 0.4 }, "<0.35");
      });
      tl.to("[data-log] li", { opacity: 1, stagger: 0.15, duration: 0.2 }, 0.2);
      tl.fromTo("[data-chip]", { left: "7%", top: "50%" }, { left: "75.8%", top: "50%", duration: tl.duration() - 0.6 }, 0);
    } else {
      nodes.forEach((n) =>
        gsap.fromTo(n, { opacity: 0.25, x: -12 }, { opacity: 1, x: 0, ease: "none", scrollTrigger: { trigger: n, start: "top 92%", end: "top 62%", scrub: true } }),
      );
    }
  });

  const node = (id: string) => flowNodes.find((n) => n.id === id)!;
  const card = (id: string) => (
    <FlowNodeCard node={node(id)} option={opts[id]} editing={editing === id} muted={!onPath(id)} onEdit={() => setEditing(editing === id ? null : id)} />
  );
  const editor = editNode && <NodeEditor node={editNode} value={opts[editNode.id]} onPick={(v) => pick(editNode.id, v)} onClose={close} />;

  const logSteps = flowNodes.filter((n) => onPath(n.id));

  return (
    <section ref={root} id="workflows" aria-labelledby="wf-title" className="relative scroll-mt-0 overflow-hidden bg-bg lg:min-h-screen lg:pt-[calc(var(--header-h)+20px)]">
      <div className="container-x py-24 lg:py-6">
        <div className="grid gap-5 lg:grid-cols-[1.7fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">Workflows · one handoff at a time</p>
            <h2 id="wf-title" className="text-h2 mt-3 font-semibold">
              We filled in our own contact form. <span className="text-ink-3">Here’s what happened next.</span>
            </h2>
          </div>
          <p className="max-w-md text-ink-2 lg:justify-self-end">
            {owner.name} sent a message from <span className="font-mono text-[0.9em] text-ink">{owner.email}</span>. Four agents passed it along in
            eighteen seconds. <b className="font-medium text-ink"><span className="lg:hidden">Tap</span><span className="hidden lg:inline">Click</span> any step to change it</b> — the flow and the run log follow.
          </p>
        </div>

        {/* Desktop canvas */}
        <div data-canvas aria-label="Workflow, left to right" role="group" className="relative mt-8 hidden bg-dots lg:block" style={{ height: CANVAS_H }}>
          <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox={`0 0 1000 ${CANVAS_H}`} preserveAspectRatio="none">
            {flowEdges.map((e) => (
              <path
                key={e.id}
                data-edge={e.to}
                d={e.d}
                pathLength={1}
                fill="none"
                vectorEffect="non-scaling-stroke"
                className={cn("edge-draw transition-[stroke] duration-300", onPath(e.to) ? "stroke-[var(--blue)]" : "stroke-[var(--line-strong)]")}
                strokeWidth={onPath(e.to) ? 2 : 1.5}
              />
            ))}
          </svg>
          {flowNodes.map((n) => (
            <div key={n.id} className="absolute -translate-y-1/2" style={{ left: `${n.left}%`, top: n.cy, width: `${NODE_W}%` }}>
              <div data-node={n.id}>{card(n.id)}</div>
            </div>
          ))}
          <span data-chip aria-hidden="true" className="absolute z-10 -translate-x-1/2 -translate-y-[260%]" style={{ left: "75.8%", top: "50%" }}>
            <HandoffChip to="handoff" />
          </span>
        </div>

        {/* Mobile / tablet list */}
        <ol data-list aria-label="Workflow, top to bottom" className="mt-10 space-y-3 lg:hidden">
          {flowNodes
            .filter((n) => !n.branch)
            .map((n) => (
              <Fragment key={n.id}>
                <li data-node={n.id} className="relative pl-6 before:absolute before:-bottom-3 before:left-[9px] before:top-0 before:w-0.5 before:bg-blue/40">
                  <span className="absolute left-[4px] top-5 h-3 w-3 rounded-full border-2 border-bg bg-blue" aria-hidden="true" />
                  {card(n.id)}
                </li>
                {!desktop && editing === n.id && <li>{editor}</li>}
              </Fragment>
            ))}
          <li data-node="branches" className="grid grid-cols-2 gap-2 pl-6">
            {card("yes")}
            {card("no")}
          </li>
          {!desktop && (editing === "yes" || editing === "no") && <li>{editor}</li>}
        </ol>

        {/* Editor (desktop) or run log */}
        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.1fr]">
          <div className="min-h-[1px]">
            {desktop && editor ? (
              editor
            ) : (
              <p className="hidden max-w-sm text-sm text-ink-3 lg:block">
                Try it: set the branch to <span className="text-ink">“If company &gt; 200 staff”</span> and watch Ahmed go to the nurture sequence instead.
              </p>
            )}
          </div>
          <div className="rounded-[var(--radius-lg)] border border-line bg-bg-elev p-4 font-mono text-[11.5px]">
            <p className="flex items-center justify-between text-ink-3">
              <span>Run log · {owner.email}</span>
              <span className="text-mint">● live</span>
            </p>
            <ol data-log className="mt-3 space-y-1.5" aria-live="polite">
              {logSteps.map((n, i) => (
                <li key={n.id} className="grid grid-cols-[4.2rem_1fr] gap-2 sm:grid-cols-[4.2rem_8.5rem_1fr]">
                  <span className="text-ink-3">{runTime(i)}</span>
                  <span className="hidden truncate text-blue-ink sm:block">{n.owner}</span>
                  <span className="min-w-0 text-ink sm:truncate">
                    {opts[n.id]} <span className="text-ink-3">· {detailFor(opts[n.id])}</span>
                  </span>
                </li>
              ))}
              <li className="grid grid-cols-[4.2rem_1fr] gap-2 sm:grid-cols-[4.2rem_8.5rem_1fr]">
                <span className="text-ink-3">{runTime(logSteps.length)}</span>
                <span className="hidden text-amber-ink sm:block">You</span>
                <span className="text-amber-ink">{path === "yes" ? "Report waiting for your approval" : "Day 0 email waiting for your approval"}</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
