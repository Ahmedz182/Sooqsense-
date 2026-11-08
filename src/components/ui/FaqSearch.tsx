"use client";

import { useId, useMemo, useState } from "react";
import { Minus, Plus, Search } from "lucide-react";

type QA = { q: string; a: string };

/** Searchable accordion. Typing filters questions and opens every match. */
export function FaqSearch({ items, placeholder = "Search questions" }: { items: readonly QA[]; placeholder?: string }) {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  const t = term.trim().toLowerCase();
  const shown = useMemo(() => items.map((it, i) => ({ ...it, i })).filter((it) => !t || (it.q + " " + it.a).toLowerCase().includes(t)), [items, t]);

  return (
    <div>
      <label className="relative block">
        <span className="sr-only">Search questions</span>
        <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-3" aria-hidden="true" />
        <input
          type="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder={placeholder}
          className="h-12 w-full rounded-full border border-line-strong bg-bg-elev pr-4 pl-11 text-ink outline-none placeholder:text-ink-3 focus:border-amber focus:shadow-[0_0_0_4px_var(--amber-soft)]"
        />
      </label>
      <p className="sr-only" aria-live="polite">
        {t ? `${shown.length} of ${items.length} questions` : ""}
      </p>
      <ul className="mt-6 border-t border-line">
        {shown.map((it) => {
          const isOpen = t ? true : open === it.i;
          const id = `${base}-${it.i}`;
          return (
            <li key={it.q} className="border-b border-line">
              <h3 className="text-base font-medium tracking-normal">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={id}
                  onClick={() => setOpen(open === it.i ? null : it.i)}
                  className="flex min-h-14 w-full items-center justify-between gap-6 py-4 text-left text-[1.0625rem] text-ink"
                >
                  <span>{it.q}</span>
                  {isOpen ? <Minus className="h-4 w-4 shrink-0 text-ink-3" aria-hidden="true" /> : <Plus className="h-4 w-4 shrink-0 text-ink-3" aria-hidden="true" />}
                </button>
              </h3>
              <div id={id} hidden={!isOpen} className="max-w-2xl pb-5 leading-relaxed text-ink-2">
                {it.a}
              </div>
            </li>
          );
        })}
        {!shown.length && (
          <li className="py-8 text-ink-2">
            Nothing on that yet.{" "}
            <a className="text-amber-ink underline underline-offset-2" href="/contact?intent=contact">
              Ask us
            </a>{" "}
            and we&rsquo;ll reply within a day.
          </li>
        )}
      </ul>
    </div>
  );
}
