"use client";

import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

/** Wraps matches of `q` in <mark>. */
export function highlight(text: string, q: string): ReactNode {
  const t = q.trim();
  if (!t) return text;
  const re = new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig");
  return text.split(re).map((part, i) =>
    i % 2 ? (
      <mark key={i} className="rounded-[3px] bg-amber-soft px-0.5 text-ink">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

/** Numbered question/answer list. One open at a time; height animates via grid rows. */
export function Accordion({ items, query = "", defaultOpen = 0, className }: { items: readonly { q: string; a: string }[]; query?: string; defaultOpen?: number | null; className?: string }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();
  return (
    <ul className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((it, i) => {
        const on = open === i || (!!query.trim() && items.length <= 3);
        return (
          <li key={it.q}>
            <h3>
              <button
                type="button"
                id={`${base}-b${i}`}
                aria-expanded={on}
                aria-controls={`${base}-p${i}`}
                onClick={() => setOpen(open === i ? null : i)}
                className="flex min-h-14 w-full items-center gap-4 py-4 text-left"
              >
                <span className="w-7 shrink-0 font-mono text-xs text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 font-display text-lg font-medium leading-snug text-ink md:text-xl">{highlight(it.q, query)}</span>
                <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-[transform,background,border-color] duration-300", on ? "rotate-45 border-amber bg-amber text-on-amber" : "border-line-strong text-ink-2")}>
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </h3>
            <div
              id={`${base}-p${i}`}
              role="region"
              aria-labelledby={`${base}-b${i}`}
              className={cn("grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)]", on ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-5 pl-11 pr-12 text-ink-2">{highlight(it.a, query)}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
