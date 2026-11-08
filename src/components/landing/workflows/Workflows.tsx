"use client";

import { useId, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { BrandLogo } from "../shared/BrandLogo";
import { SectionHead } from "../shared/SectionHead";
import { initialFlow, kindDot, labelOf, logoFor, optionsOf, type FlowNode } from "./flow";

const spring = { type: "spring", stiffness: 520, damping: 36, mass: 0.8 } as const;

function NodeCard({ node, index, selected, onSelect, panelId }: { node: FlowNode; index: number; selected: boolean; onSelect: () => void; panelId: string }) {
  const logo = logoFor(node.option);
  return (
    <motion.button
      layout
      transition={spring}
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-controls={panelId}
      className={cn(
        "relative flex min-h-[84px] w-full flex-col justify-center rounded-[var(--radius-md)] border bg-bg-elev px-3.5 py-3 text-left transition-[border-color,box-shadow] duration-200",
        selected ? "border-amber shadow-[0_0_0_4px_var(--amber-soft)]" : "border-line-strong hover:border-ink-3",
      )}
    >
      <span className="flex items-center gap-1.5 text-xs text-ink-3">
        <span className={cn("h-1.5 w-1.5 rounded-full", kindDot[node.kind])} aria-hidden="true" />
        <span className="truncate">
          <span className="sr-only">Step {index + 1}: </span>
          {labelOf(node.kind)}
        </span>
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={node.option}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={spring}
          className="mt-1.5 flex items-center gap-2 text-sm font-medium leading-snug text-ink"
        >
          {logo && <BrandLogo id={logo} size="xs" decorative />}
          <span className="min-w-0">{node.option}</span>
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

function OptionsPanel({ node, onPick, id }: { node: FlowNode; onPick: (o: string) => void; id: string }) {
  return (
    <motion.div
      id={id}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className="rounded-[var(--radius-lg)] border border-line bg-bg-elev p-4 sm:p-5"
    >
      <p className="text-sm font-medium text-ink">{labelOf(node.kind)}</p>
      <ul role="radiogroup" aria-label={`${labelOf(node.kind)} options`} className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
        {optionsOf(node.kind).map((o) => {
          const on = o === node.option;
          const logo = logoFor(o);
          return (
            <li key={o}>
              <button
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => onPick(o)}
                className={cn(
                  "flex min-h-11 w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-3 text-left text-sm transition-colors",
                  on ? "bg-amber-soft text-ink" : "text-ink-2 hover:bg-bg-sunken hover:text-ink",
                )}
              >
                {logo ? <BrandLogo id={logo} size="xs" decorative /> : <span className="w-6" aria-hidden="true" />}
                <span className="min-w-0 flex-1">{o}</span>
                {on && <Check className="h-4 w-4 shrink-0 text-amber-ink" aria-hidden="true" />}
              </button>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

function Connector({ pulse }: { pulse: number }) {
  return (
    <span className="relative block h-px w-full self-center bg-line-strong" aria-hidden="true">
      <motion.span
        key={pulse}
        initial={{ left: "0%", opacity: pulse ? 1 : 0 }}
        animate={{ left: "100%", opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber"
      />
    </span>
  );
}

/** Guided edits: click a step, pick an option, the flow updates with a spring. */
export function Workflows() {
  const [flow, setFlow] = useState(initialFlow);
  const [selected, setSelected] = useState<string>("n2");
  const [pulse, setPulse] = useState(0);
  const panelId = useId();
  const node = flow.find((n) => n.id === selected) ?? flow[0];
  const main = flow.filter((n) => !n.branch);
  const fork = flow.filter((n) => n.branch);

  function pick(option: string) {
    setFlow((f) => f.map((n) => (n.id === selected ? { ...n, option } : n)));
    setPulse((p) => p + 1);
  }

  const card = (n: FlowNode) => (
    <NodeCard node={n} index={flow.indexOf(n)} selected={n.id === selected} onSelect={() => setSelected(n.id)} panelId={panelId} />
  );

  return (
    <section id="workflows" aria-labelledby="workflows-title" className="scroll-mt-[var(--header-h)] py-16 md:py-28">
      <div className="container-x">
        <SectionHead id="workflows-title" title="Build it once.">
          Everything above is a workflow you can see and change. Pick a step and swap what it does.
        </SectionHead>

        <LayoutGroup>
          <div className="mt-12 rounded-[var(--radius-xl)] border border-line bg-bg-sunken bg-dots p-4 sm:p-6 md:mt-16 lg:p-8">
            {/* Wide: one row with a fork at the end. */}
            <div className="hidden items-center lg:grid lg:grid-cols-[1fr_28px_1fr_28px_1fr_28px_1fr_44px_1fr]">
              {main.map((n, i) => (
                <div key={n.id} className="contents">
                  {card(n)}
                  {i < main.length - 1 && <Connector pulse={pulse} />}
                </div>
              ))}
              <svg viewBox="0 0 44 120" preserveAspectRatio="none" className="h-[120px] w-full text-line-strong" aria-hidden="true">
                <path d="M0 60 H14 C22 60 22 14 30 14 H44 M14 60 C22 60 22 106 30 106 H44" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              </svg>
              <div className="grid gap-3">
                {fork.map((n) => (
                  <div key={n.id}>
                    <p className="mb-1 pl-1 text-xs text-ink-3">{n.branch}</p>
                    {card(n)}
                  </div>
                ))}
              </div>
            </div>

            {/* Narrow: a vertical list; the options open right under the chosen step. */}
            <ol className="lg:hidden">
              {flow.map((n, i) => (
                <li key={n.id}>
                  {n.branch && <p className="mb-1 pl-1 text-xs text-ink-3">{n.branch === "Yes" ? "If yes" : "If no"}</p>}
                  {card(n)}
                  {n.id === selected && (
                    <div className="mt-2">
                      <OptionsPanel node={n} onPick={pick} id={`${panelId}-m`} />
                    </div>
                  )}
                  {i < flow.length - 1 && <span className="ml-6 block h-5 w-px bg-line-strong" aria-hidden="true" />}
                </li>
              ))}
            </ol>

            <div className="mt-6 hidden lg:block">
              <OptionsPanel key={node.id} node={node} onPick={pick} id={panelId} />
            </div>
          </div>
        </LayoutGroup>
        <p className="mt-5 text-sm text-ink-3">Every change is saved as a new version. Nothing sends without approval.</p>
      </div>
    </section>
  );
}
