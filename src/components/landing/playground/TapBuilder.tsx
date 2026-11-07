"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Plus, X } from "lucide-react";
import type { NodeKind } from "@/config/demo";
import { cn } from "@/lib/cn";
import { catalog, kindTone, labelOf, newId, optionsOf, type PStep, type Template } from "./templates";

const spring = { type: "spring", stiffness: 480, damping: 34 } as const;

function StepRow({ step, onChange, onRemove }: { step: PStep; onChange: (o: string) => void; onRemove?: () => void }) {
  return (
    <motion.div layout transition={spring} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="flex items-center gap-2 rounded-[var(--radius-md)] border border-line-strong bg-bg-elev p-2 pl-3 shadow-sm">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={cn("rounded-full px-2 py-0.5 font-mono text-[0.6rem] tracking-wide uppercase", kindTone[step.kind])}>{labelOf(step.kind)}</span>
          {step.note && <span className="truncate font-mono text-[0.62rem] text-ink-3">{step.note}</span>}
        </div>
        <label className="relative mt-1 block">
          <span className="sr-only">{labelOf(step.kind)} option</span>
          <select value={step.option} onChange={(e) => onChange(e.target.value)} className="min-h-11 w-full appearance-none truncate bg-transparent pr-7 text-[0.95rem] font-medium text-ink outline-none">
            {optionsOf(step.kind).map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-1 h-4 w-4 -translate-y-1/2 text-ink-3" aria-hidden="true" />
        </label>
      </div>
      {onRemove && (
        <button type="button" onClick={onRemove} aria-label={`Remove ${labelOf(step.kind)} step`} className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-ink-3 hover:bg-bg-sunken hover:text-ink">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </motion.div>
  );
}

/** Phones: the same builder, tap-only. Insert, swap and remove steps without dragging. */
export function TapBuilder({ template }: { template: Template }) {
  const [steps, setSteps] = useState<PStep[]>(template.steps);
  const [fork, setFork] = useState(template.fork);
  const [insertAt, setInsertAt] = useState<number | null>(null);

  useEffect(() => {
    setSteps(template.steps);
    setFork(template.fork);
    setInsertAt(null);
  }, [template]);

  function insert(kind: NodeKind, at: number) {
    setSteps((s) => [...s.slice(0, at), { id: newId(), kind, option: optionsOf(kind)[0] }, ...s.slice(at)]);
    setInsertAt(null);
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-line bg-bg-sunken bg-dots p-3">
      <AnimatePresence initial={false}>
        {steps.map((st, i) => (
          <div key={st.id}>
            <StepRow
              step={st}
              onChange={(o) => setSteps((s) => s.map((x) => (x.id === st.id ? { ...x, option: o } : x)))}
              onRemove={steps.length > 1 ? () => setSteps((s) => s.filter((x) => x.id !== st.id)) : undefined}
            />
            <div className="flex flex-col items-start pl-5">
              <span className="h-2 w-[2px] bg-amber" aria-hidden="true" />
              <button
                type="button"
                aria-expanded={insertAt === i + 1}
                onClick={() => setInsertAt(insertAt === i + 1 ? null : i + 1)}
                className="-ml-[21px] inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm text-ink-3 hover:text-ink"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full border border-amber bg-bg-elev text-amber-ink">
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {insertAt === i + 1 ? "Pick a step" : i === steps.length - 1 && !fork ? "Add step" : ""}
                <span className="sr-only">Insert a step after step {i + 1}</span>
              </button>
              {insertAt === i + 1 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {catalog.map((c) => (
                    <button key={c.kind} type="button" onClick={() => insert(c.kind, i + 1)} className="min-h-11 rounded-full border border-line-strong bg-bg-elev px-3.5 text-sm text-ink-2 hover:text-ink">
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
              <span className="h-2 w-[2px] bg-amber" aria-hidden="true" />
            </div>
          </div>
        ))}
      </AnimatePresence>
      {fork && (
        <div className="grid gap-2">
          {fork.map((f, k) => (
            <StepRow key={f.id} step={f} onChange={(o) => setFork((fs) => fs && (fs.map((x, j) => (j === k ? { ...x, option: o } : x)) as [PStep, PStep]))} />
          ))}
        </div>
      )}
      <p className="mt-3 px-1 font-mono text-[0.7rem] text-ink-3">
        {steps.length + (fork?.length ?? 0)} steps · tap a step to change it
      </p>
    </div>
  );
}
