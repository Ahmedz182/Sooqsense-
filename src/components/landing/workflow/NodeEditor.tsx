"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { detailFor, kindLabel, optionsFor, type FlowNode } from "./model";

/** Inline option picker for one workflow step. Esc or ✕ closes it. */
export function NodeEditor({ node, value, onPick, onClose }: { node: FlowNode; value: string; onPick: (v: string) => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.querySelector<HTMLButtonElement>("[aria-pressed='true']")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [node.id, onClose]);

  return (
    <motion.div
      ref={ref}
      id="flow-editor"
      role="group"
      aria-label={`Change the ${kindLabel(node.kind)} step`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      className="rounded-[var(--radius-lg)] border border-line bg-bg-elev p-4 shadow-md"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-ink-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue-ink">{node.owner}</span>
          <span className="mx-2 text-ink-3">/</span>
          {kindLabel(node.kind)}
        </p>
        <button type="button" onClick={onClose} aria-label="Close step options" className="grid h-11 w-11 place-items-center rounded-full text-ink-2 hover:bg-bg-sunken">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {optionsFor(node.kind).map((o) => {
          const on = o === value;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              onClick={() => onPick(o)}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-left text-sm transition-colors",
                on ? "border-blue bg-blue text-on-blue" : "border-line-strong bg-bg text-ink hover:border-blue",
              )}
            >
              {on && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
              <span>
                {o}
                <span className={cn("ml-2 hidden font-mono text-[10px] sm:inline", on ? "opacity-80" : "text-ink-3")}>{detailFor(o)}</span>
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
