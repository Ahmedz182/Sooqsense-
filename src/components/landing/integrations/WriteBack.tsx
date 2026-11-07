"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";
import { ToolMark } from "../ToolMark";
import { story } from "../story";

const crms = {
  hubspot: {
    label: "HubSpot",
    record: "Deal",
    fields: [
      ["Deal name", story.deal.name],
      ["Deal stage", "Closed won"],
      ["Amount", `${story.deal.amount} / year`],
      ["Close date", "Fri 14:20"],
      ["Deal owner", story.owner.name],
      ["Associated contact", `${story.lead.name} · ${story.lead.title}`],
    ],
  },
  salesforce: {
    label: "Salesforce",
    record: "Opportunity",
    fields: [
      ["Opportunity", story.deal.name],
      ["Stage", "Closed Won"],
      ["Amount", `${story.deal.amount}`],
      ["Close Date", "Fri 14:20"],
      ["Opportunity Owner", story.owner.name],
      ["Contact Role", `${story.lead.name} · Decision Maker`],
    ],
  },
} as const;

const activity = [
  { t: "Tue 13:06", what: "Lead created from contact form, ICP 86" },
  { t: "Tue 16:03", what: "Call summary + 3 action items logged" },
  { t: "Wed 08:31", what: "Follow-up approved by Ahmed, sent" },
  { t: "Fri 14:20", what: "Order form signed · stage → closed won" },
];

/** The same record, written back to whichever CRM the team already runs. */
export function WriteBack() {
  const [crm, setCrm] = useState<keyof typeof crms>("hubspot");
  const c = crms[crm];
  return (
    <div className="paper overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
        <p className="font-mono text-[0.7rem] tracking-wide text-ink-3 uppercase">Written back · no copy-paste</p>
        <div className="flex rounded-full border border-line bg-bg-sunken p-1" role="group" aria-label="Show record in">
          {(Object.keys(crms) as (keyof typeof crms)[]).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={crm === k}
              onClick={() => setCrm(k)}
              className={cn(
                "relative inline-flex min-h-11 items-center gap-2 rounded-full px-3.5 text-sm transition-colors",
                crm === k ? "text-ink" : "text-ink-3 hover:text-ink",
              )}
            >
              {crm === k && <motion.span layoutId="crm-pill" className="absolute inset-0 rounded-full bg-bg-elev shadow-sm" transition={{ type: "spring", stiffness: 500, damping: 34 }} />}
              <span className="relative inline-flex items-center gap-2">
                <ToolMark id={k} size="xs" /> {crms[k].label}
              </span>
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={crm} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="p-4 sm:p-5">
          <p className="text-xs text-ink-3">{c.record}</p>
          <dl className="mt-2 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {c.fields.map(([k, v]) => (
              <div key={k} className="min-w-0">
                <dt className="text-xs text-ink-3">{k}</dt>
                <dd className={cn("truncate text-sm text-ink", /closed/i.test(v) && "font-medium text-mint")}>{v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </AnimatePresence>
      <ol className="border-t border-line bg-bg-sunken px-4 py-4 sm:px-5">
        {activity.map((a) => (
          <li key={a.t} className="grid grid-cols-[5rem_1fr] gap-2 py-1 text-sm">
            <span className="font-mono text-xs leading-6 text-ink-3">{a.t}</span>
            <span className="text-ink-2">{a.what}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
