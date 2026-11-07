"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus, X } from "lucide-react";
import { nodeCatalog, type NodeKind } from "@/config/demo";
import { cn } from "@/lib/cn";
import { agents, kindOwner } from "../data";
import { detailFor, kindLabel, optionsFor } from "../workflow/model";
import { templates, type Step } from "./templates";

const ownerName = (k: NodeKind) => (kindOwner[k] === "you" ? "You" : agents[kindOwner[k] as keyof typeof agents].name);

/** Phone version: the same templates as a vertical list. Tap to change, add or remove — no dragging. */
export function PlaygroundTap() {
  const [tpl, setTpl] = useState(templates[0].id);
  const [steps, setSteps] = useState<Step[]>(templates[0].steps);
  const [adding, setAdding] = useState(false);

  const choose = (id: string) => {
    setTpl(id);
    setSteps(templates.find((t) => t.id === id)!.steps);
  };
  const update = (id: string, option: string) => setSteps((s) => s.map((x) => (x.id === id ? { ...x, option } : x)));
  const remove = (id: string) => setSteps((s) => s.filter((x) => x.id !== id));
  const add = (kind: NodeKind) => {
    setSteps((s) => [...s, { id: `n${Date.now().toString(36)}`, kind, option: optionsFor(kind)[0] }]);
    setAdding(false);
  };

  return (
    <div className="p-3">
      <div role="tablist" aria-label="Templates" className="grid grid-cols-2 gap-1 rounded-[16px] bg-bg-sunken p-1">
        {templates.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tpl === t.id}
            onClick={() => choose(t.id)}
            className={cn("min-h-11 rounded-[12px] px-2 text-[13px] leading-tight transition-colors", tpl === t.id ? "bg-bg-elev text-ink shadow-sm" : "text-ink-2")}
          >
            {t.name}
          </button>
        ))}
      </div>

      <ol className="mt-4 space-y-2">
        <AnimatePresence initial={false}>
          {steps.map((s, i) => (
            <motion.li
              key={s.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              className="relative rounded-[14px] border border-line bg-bg-elev p-3"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-soft font-mono text-[10px] text-blue-ink">{i + 1}</span>
                <label className="min-w-0 flex-1">
                  <span className={cn("block font-mono text-[10px] uppercase tracking-[0.12em]", kindOwner[s.kind] === "you" ? "text-amber-ink" : "text-blue-ink")}>
                    {ownerName(s.kind)} · {kindLabel(s.kind)}
                  </span>
                  <select
                    value={s.option}
                    onChange={(e) => update(s.id, e.target.value)}
                    className="mt-1 min-h-11 w-full rounded-[10px] border border-line-strong bg-bg px-3 text-[15px] font-medium text-ink"
                  >
                    {optionsFor(s.kind).map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  <span className="mt-1 block truncate font-mono text-[10px] text-ink-3">{detailFor(s.option)}</span>
                </label>
                {i > 0 && (
                  <button type="button" onClick={() => remove(s.id)} aria-label={`Remove step ${i + 1}`} className="-mr-1 grid h-11 w-11 shrink-0 place-items-center rounded-full text-ink-3 hover:bg-bg-sunken">
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>

      {adding ? (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {nodeCatalog
            .filter((c) => c.kind !== "trigger")
            .map((c) => (
              <button key={c.kind} type="button" onClick={() => add(c.kind)} className="min-h-11 rounded-[12px] border border-line-strong bg-bg px-3 text-left text-sm text-ink">
                {c.label}
              </button>
            ))}
        </div>
      ) : (
        <button type="button" onClick={() => setAdding(true)} className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-[14px] border border-dashed border-blue/60 text-sm font-medium text-blue-ink">
          <Plus className="h-4 w-4" aria-hidden="true" /> Add a step
        </button>
      )}
    </div>
  );
}
