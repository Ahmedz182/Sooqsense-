"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { detailFor, kindLabel, optionsFor, type StepKey } from "./flow";

const spring = { type: "spring", stiffness: 520, damping: 32, mass: 0.7 } as const;

const kindTone: Record<string, string> = {
  trigger: "bg-amber-soft text-amber-ink",
  enrich: "bg-blue-soft text-blue",
  security: "bg-mint-soft text-mint",
  ai: "bg-violet-soft text-violet",
  branch: "bg-bg-sunken text-ink-2",
  yes: "bg-amber-soft text-amber-ink",
  no: "bg-blue-soft text-blue",
};

/**
 * One workflow node. Click to open a small picker of options from the node
 * catalogue; choosing one swaps the label and detail with a spring.
 */
export function NodeCard({
  stepKey,
  value,
  onChange,
  active = true,
  tag,
  className,
}: {
  stepKey: StepKey;
  value: string;
  onChange: (v: string) => void;
  active?: boolean;
  tag?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const options = optionsFor(stepKey);

  return (
    <div ref={wrap} className={cn("relative", open && "z-30", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "group flex min-h-[64px] w-full items-start gap-3 rounded-[var(--radius-lg)] border bg-bg-elev p-3 text-left shadow-sm transition-[border-color,box-shadow,opacity] duration-300 hover:border-ink-3 sm:p-3.5",
          open ? "border-amber shadow-[0_0_0_4px_var(--amber-soft)]" : "border-line",
          !active && "opacity-55",
        )}
      >
        <span className={cn("mt-0.5 shrink-0 rounded-full px-2 py-0.5 font-mono text-[0.62rem] tracking-wide uppercase", kindTone[stepKey])}>
          {tag ?? kindLabel(stepKey)}
        </span>
        <span className="min-w-0 flex-1 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={value}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={spring}
              className="block"
            >
              <span className="block text-[0.95rem] font-medium leading-snug text-ink">{value}</span>
              <span className="mt-0.5 line-clamp-2 block text-[0.8rem] text-ink-3">{detailFor(value)}</span>
            </motion.span>
          </AnimatePresence>
        </span>
        <ChevronDown className={cn("mt-1 h-4 w-4 shrink-0 text-ink-3 transition-transform", open && "rotate-180")} aria-hidden="true" />
        <span className="sr-only">Change {kindLabel(stepKey)} step</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={spring}
            className="absolute inset-x-0 top-[calc(100%+6px)] origin-top rounded-[var(--radius-md)] border border-line bg-bg-elev p-1.5 shadow-lg"
            aria-label={`${kindLabel(stepKey)} options`}
          >
            {options.map((o) => (
              <li key={o}>
                <button
                  type="button"
                  aria-pressed={o === value}
                  onClick={() => {
                    onChange(o);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex min-h-11 w-full items-center justify-between gap-3 rounded-[var(--radius-sm)] px-3 text-left text-sm transition-colors",
                    o === value ? "bg-amber-soft text-ink" : "text-ink-2 hover:bg-bg-sunken hover:text-ink",
                  )}
                >
                  {o}
                  {o === value && <Check className="h-4 w-4 text-amber-ink" aria-hidden="true" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
