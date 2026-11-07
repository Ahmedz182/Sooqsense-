"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, PencilLine, Undo2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { ToolMark, type ToolId } from "../ToolMark";

type Item = { id: string; tool: ToolId; to: string; subject: string; why: string; body: string };

const initial: Item[] = [
  {
    id: "mira",
    tool: "gmail",
    to: "Mira Haddad · Carthage Labs",
    subject: "Re: the three days after the demo",
    why: "From yesterday’s 15:30 call",
    body: "Hi Mira, thanks for the time yesterday. Pricing for 12 Growth seats on yearly billing is attached, plus the HubSpot sync guide for Sam.",
  },
  {
    id: "daniel",
    tool: "hubspot",
    to: "Daniel Ortiz · BrightPath",
    subject: "Pitch report: fixing demo follow-up at BrightPath",
    why: "Inbound form · ICP 82",
    body: "Hi Daniel, you mentioned your team promises a reply within a day. Here’s a two-page look at how that could run on its own.",
  },
  {
    id: "nurture",
    tool: "mailchimp",
    to: "RevOps nurture · 214 contacts",
    subject: "The three days after a demo",
    why: "Campaign step 1 of 4",
    body: "Most deals aren’t lost in the demo. They’re lost in the three days after it, somewhere between the CRM and the inbox.",
  },
];

/** The Wednesday-morning queue: approve or edit what the agent drafted overnight. */
export function ApprovalQueue() {
  const [items, setItems] = useState(initial);
  const [approved, setApproved] = useState<Record<string, boolean>>({});
  const [editing, setEditing] = useState<string | null>(null);
  const waiting = items.filter((i) => !approved[i.id]).length;

  return (
    <div className="paper overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3.5 sm:px-5">
        <div>
          <p className="text-sm font-medium text-ink">Morning queue · Ahmed Fayyaz</p>
          <p className="font-mono text-[0.7rem] text-ink-3">Wed 08:30 · drafted overnight</p>
        </div>
        <span aria-live="polite" className={cn("rounded-full px-2.5 py-1 font-mono text-xs tabular", waiting ? "bg-amber-soft text-amber-ink" : "bg-mint-soft text-mint")}>
          {waiting ? `${waiting} waiting` : "All clear"}
        </span>
      </div>
      <ul>
        {items.map((it) => {
          const ok = approved[it.id];
          const isEditing = editing === it.id;
          return (
            <li key={it.id} className={cn("border-b border-line px-4 py-4 last:border-b-0 sm:px-5", ok && "bg-bg-sunken")}>
              <div className="flex items-start gap-3">
                <ToolMark id={it.tool} size="sm" className="mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-ink-3">
                    {it.to} · <span className="font-mono text-[0.7rem]">{it.why}</span>
                  </p>
                  <p className={cn("mt-0.5 font-medium text-ink", ok && "text-ink-2")}>{it.subject}</p>
                  {isEditing ? (
                    <label className="mt-2 block">
                      <span className="sr-only">Edit draft</span>
                      <textarea
                        autoFocus
                        rows={4}
                        value={it.body}
                        onChange={(e) => setItems((s) => s.map((x) => (x.id === it.id ? { ...x, body: e.target.value } : x)))}
                        className="w-full rounded-[var(--radius-md)] border border-amber bg-bg-elev p-3 text-sm text-ink outline-none focus:shadow-[0_0_0_4px_var(--amber-soft)]"
                      />
                    </label>
                  ) : (
                    <p className="mt-1 line-clamp-2 text-sm text-ink-2">{it.body}</p>
                  )}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <AnimatePresence mode="popLayout" initial={false}>
                      {ok ? (
                        <motion.span
                          key="done"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 26 }}
                          className="inline-flex min-h-11 items-center gap-2 text-sm text-mint"
                        >
                          <Check className="h-4 w-4" aria-hidden="true" /> Approved · sends 08:31
                          <button
                            type="button"
                            onClick={() => setApproved((s) => ({ ...s, [it.id]: false }))}
                            className="ml-1 inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-ink-3 hover:bg-bg-elev hover:text-ink"
                          >
                            <Undo2 className="h-3.5 w-3.5" aria-hidden="true" /> Undo
                          </button>
                        </motion.span>
                      ) : (
                        <motion.span key="todo" className="inline-flex flex-wrap gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <button
                            type="button"
                            onClick={() => {
                              setApproved((s) => ({ ...s, [it.id]: true }));
                              setEditing(null);
                            }}
                            className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-amber px-4 text-sm font-medium text-on-amber transition-colors hover:bg-amber-hover"
                          >
                            <Check className="h-4 w-4" aria-hidden="true" /> {isEditing ? "Save & approve" : "Approve"}
                          </button>
                          <button
                            type="button"
                            aria-pressed={isEditing}
                            onClick={() => setEditing(isEditing ? null : it.id)}
                            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line-strong px-4 text-sm text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
                          >
                            <PencilLine className="h-4 w-4" aria-hidden="true" /> {isEditing ? "Done" : "Edit"}
                          </button>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
