"use client";

import { useId, useMemo, useState } from "react";
import { Minus, Plus, Search } from "lucide-react";
import { cn } from "@/lib/cn";

type QA = { q: string; a: string };

function Mark({ text, term }: { text: string; term: string }) {
  if (!term) return <>{text}</>;
  const i = text.toLowerCase().indexOf(term.toLowerCase());
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-[3px] bg-amber-soft px-0.5 text-ink">{text.slice(i, i + term.length)}</mark>
      {text.slice(i + term.length)}
    </>
  );
}

/** Searchable accordion. Typing filters questions and opens every match. */
export function FaqSearch({ items, placeholder = "Search questions — try “HubSpot” or “secure”" }: { items: readonly QA[]; placeholder?: string }) {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  const t = term.trim();
  const shown = useMemo(
    () => items.map((it, i) => ({ ...it, i })).filter((it) => !t || (it.q + " " + it.a).toLowerCase().includes(t.toLowerCase())),
    [items, t],
  );

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
          className="h-13 min-h-[52px] w-full rounded-full border border-line-strong bg-bg-elev pr-4 pl-11 text-ink outline-none placeholder:text-ink-3 focus:border-amber focus:shadow-[0_0_0_4px_var(--amber-soft)]"
        />
      </label>
      <p className="mt-3 font-mono text-xs text-ink-3" aria-live="polite">
        {t ? `${shown.length} of ${items.length} questions` : `${items.length} questions`}
      </p>
      <ul className="mt-4 border-t border-line">
        {shown.map((it) => {
          const isOpen = t ? true : open === it.i;
          const id = `${base}-${it.i}`;
          return (
            <li key={it.q} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={id}
                  onClick={() => setOpen(open === it.i ? null : it.i)}
                  className="flex min-h-14 w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-medium text-ink sm:text-xl"
                >
                  <span>
                    <Mark text={it.q} term={t} />
                  </span>
                  <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors", isOpen ? "border-amber bg-amber text-on-amber" : "border-line-strong text-ink-2")}>
                    {isOpen ? <Minus className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                  </span>
                </button>
              </h3>
              <div id={id} hidden={!isOpen} className="max-w-2xl pb-6 text-ink-2">
                <Mark text={it.a} term={t} />
              </div>
            </li>
          );
        })}
        {!shown.length && (
          <li className="py-8 text-ink-2">
            Nothing on that yet. Ask us at <a className="text-amber-ink underline" href="/contact?intent=contact">the contact page</a> and we&rsquo;ll answer within a day.
          </li>
        )}
      </ul>
    </div>
  );
}
