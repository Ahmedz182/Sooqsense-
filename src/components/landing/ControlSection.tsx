"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlarmClock, Check, Pencil, RotateCcw } from "lucide-react";
import { approvals, trustFacts } from "./data";
import { cn } from "@/lib/cn";

type Item = (typeof approvals)[number] & { body: string };
type Done = { id: string; how: "approved" | "snoozed" };

const spring = { type: "spring", stiffness: 380, damping: 32 } as const;
const btn = "inline-flex min-h-11 items-center gap-1.5 rounded-full px-3.5 sm:px-4 text-sm font-medium transition-colors";

export function ControlSection() {
  const [queue, setQueue] = useState<Item[]>(approvals.map((a) => ({ ...a })));
  const [done, setDone] = useState<Done[]>([]);
  const [editing, setEditing] = useState<string | null>(null);

  const resolve = (id: string, how: Done["how"]) => {
    setQueue((q) => q.filter((i) => i.id !== id));
    setDone((d) => [...d, { id, how }]);
    setEditing(null);
  };
  const reset = () => {
    setQueue(approvals.map((a) => ({ ...a })));
    setDone([]);
  };
  const approved = done.filter((d) => d.how === "approved").length;
  const snoozed = done.filter((d) => d.how === "snoozed").length;

  return (
    <section aria-labelledby="control-title" className="container-x py-24 md:py-36">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <p className="eyebrow">You stay in charge</p>
          <h2 id="control-title" className="text-h1 mt-3 font-semibold">
            The agents draft. <span className="text-amber-ink">You decide.</span>
          </h2>
          <p className="text-lead mt-5 max-w-md text-ink-2">Nothing leaves your outbox until you say so. Try it — this queue is real enough to click.</p>
          <dl className="mt-10 divide-y divide-line border-y border-line">
            {trustFacts.map((f) => (
              <div key={f.k} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5">
                <dt className="font-mono text-xs uppercase tracking-[0.12em] text-blue-ink">{f.k}</dt>
                <dd className="text-[0.95rem] text-ink-2">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-[var(--radius-xl)] border border-line bg-bg-sunken p-3 md:p-4">
          <div className="flex items-center justify-between px-2 pb-3 pt-1">
            <p className="whitespace-nowrap font-display text-lg font-semibold">Waiting for you</p>
            <p className="font-mono text-xs text-ink-3" aria-live="polite">
              {queue.length} left · {approved} approved<span className="hidden sm:inline"> · {snoozed} snoozed</span>
            </p>
          </div>
          <ul className="space-y-2">
            <AnimatePresence initial={false}>
              {queue.map((it) => (
                <motion.li
                  key={it.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 40, transition: { duration: 0.22 } }}
                  transition={spring}
                  className="rounded-[var(--radius-lg)] border border-line bg-bg-elev p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue-ink">{it.agent}</span>
                    <span className="font-mono text-[11px] text-ink-3">{it.why}</span>
                  </div>
                  <p className="mt-2 truncate text-sm text-ink-3">To {it.to}</p>
                  <p className="font-medium text-ink">{it.subject}</p>
                  {editing === it.id ? (
                    <label className="mt-2 block">
                      <span className="sr-only">Edit draft</span>
                      <textarea
                        autoFocus
                        value={it.body}
                        onChange={(e) => setQueue((q) => q.map((x) => (x.id === it.id ? { ...x, body: e.target.value } : x)))}
                        rows={3}
                        className="w-full rounded-[12px] border border-amber bg-bg p-3 text-[0.95rem] text-ink outline-none focus:shadow-[0_0_0_4px_var(--amber-soft)]"
                      />
                    </label>
                  ) : (
                    <p className="mt-1 line-clamp-2 text-[0.95rem] text-ink-2">{it.body}</p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button type="button" onClick={() => resolve(it.id, "approved")} className={cn(btn, "bg-amber text-on-amber hover:bg-amber-hover")}>
                      <Check className="h-4 w-4" aria-hidden="true" /> {editing === it.id ? "Save & approve" : "Approve"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(editing === it.id ? null : it.id)}
                      aria-pressed={editing === it.id}
                      className={cn(btn, "border border-line-strong bg-bg text-ink hover:border-ink-3")}
                    >
                      <Pencil className="h-3.5 w-3.5" aria-hidden="true" /> Edit
                    </button>
                    <button type="button" onClick={() => resolve(it.id, "snoozed")} className={cn(btn, "text-ink-2 hover:bg-bg-sunken hover:text-ink")}>
                      <AlarmClock className="h-4 w-4" aria-hidden="true" /> Snooze<span className="hidden sm:inline"> to 09:00</span>
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          {queue.length === 0 && (
            <div className="grid place-items-center gap-3 rounded-[var(--radius-lg)] border border-dashed border-line-strong px-6 py-10 text-center">
              <p className="font-display text-2xl font-semibold">Inbox zero, before your coffee.</p>
              <p className="text-sm text-ink-2">
                {approved} sent with your name on {approved === 1 ? "it" : "them"}. {snoozed > 0 ? `${snoozed} back at 09:00 tomorrow.` : ""}
              </p>
              <button type="button" onClick={reset} className={cn(btn, "border border-line-strong bg-bg-elev text-ink")}>
                <RotateCcw className="h-4 w-4" aria-hidden="true" /> Refill the queue
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
