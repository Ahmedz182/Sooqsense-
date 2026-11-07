"use client";

import { useRef } from "react";
import { Check, ShieldAlert, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import { useLive } from "./useLive";

const reveal = (on: boolean) => cn("transition-[opacity,transform] duration-500 ease-[var(--ease-out)]", on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1");

/* ---------- Inbox: enrich, score, then type the reply ----------------------- */
const draft = "Hi Mira — the Scale vs Growth comparison is attached. SSO is on Scale, and the DPA goes to your legal team today. Shall we pencil in Thursday?".split(" ");

export function InboxDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const step = useLive(ref, 10 + draft.length, 150, 18);
  const words = Math.max(0, step - 9);
  const chips = [
    { t: "VP RevOps", at: 2 },
    { t: "Carthage Labs · 120 staff", at: 4 },
    { t: "ICP 91", at: 6, hot: true },
  ];
  return (
    <div ref={ref} className="flex h-full flex-col gap-3 text-sm">
      <div className="rounded-[14px] border border-line bg-bg p-3">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-blue-soft font-mono text-[10px] text-blue-ink">MH</span>
          <div className="min-w-0">
            <p className="truncate font-medium">Mira Haddad</p>
            <p className="truncate font-mono text-[10px] text-ink-3">Re: Pricing for 40 seats · Tue 09:14</p>
          </div>
        </div>
        <p className="mt-2 text-ink-2">“Could you send the SSO comparison before Thursday? Legal is asking about the DPA too.”</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {chips.map((c) => (
            <span
              key={c.t}
              className={cn(
                "rounded-full border px-2 py-0.5 font-mono text-[10px]",
                c.hot ? "border-transparent bg-blue text-on-blue" : "border-line bg-bg-elev text-ink-2",
                reveal(step >= c.at),
              )}
            >
              {c.t}
            </span>
          ))}
        </div>
      </div>
      <div className="rounded-[14px] border border-dashed border-line-strong bg-bg-elev p-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">Draft · your voice</p>
        <p className="mt-2 min-h-[4.5rem] text-ink">
          {draft.slice(0, words).join(" ")}
          {words < draft.length && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-amber" />}
        </p>
        <p className={cn("mt-2 font-mono text-[11px] text-amber-ink", reveal(words >= draft.length))}>Waiting for your approval · not sent</p>
      </div>
      <div className="mt-auto rounded-[14px] bg-bg p-3">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">Carthage Labs · timeline</p>
          <p className="font-mono text-[11px] text-ink-2">
            health <b className="font-medium text-blue-ink">82</b> <span className="text-mint">▲ 6</span>
          </p>
        </div>
        <ol className="mt-3 grid grid-cols-4 gap-1.5">
          {[
            ["12 Oct", "Intro call"],
            ["21 Oct", "Proposal sent"],
            ["Tue", "Renewal call"],
            ["Today", "Reply drafted"],
          ].map(([d, t], i) => (
            <li key={d} className="min-w-0">
              <span className={cn("block h-1 rounded-full", i === 3 ? "bg-amber" : "bg-blue")} />
              <span className="mt-1.5 block font-mono text-[10px] text-ink-3">{d}</span>
              <span className="block truncate text-[11.5px] text-ink">{t}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ---------- Security: screen inbound before a human sees it ----------------- */
const inbound = [
  { from: "seo-boost@rankfast.biz", subj: "Guaranteed page 1 on Google", ok: false, why: "spam 0.97" },
  { from: "iamahmedfayyaz@gmail.com", subj: "Demo for a 6-person team?", ok: true, why: "risk 0.04" },
  { from: "billing@inv0ice-alerts.co", subj: "Overdue payment — act now", ok: false, why: "lookalike domain" },
  { from: "james.w@northwind.co.uk", subj: "Re: renewal terms", ok: true, why: "2 phone nos. masked" },
];

export function SecurityDemo() {
  const ref = useRef<HTMLUListElement>(null);
  const step = useLive(ref, inbound.length + 1, 1100);
  return (
    <ul ref={ref} className="space-y-1.5">
      {inbound.map((m, i) => {
        const done = step > i;
        return (
          <li key={m.from} className="flex items-center gap-2.5 rounded-[12px] border border-line bg-bg px-3 py-2">
            <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full transition-colors", !done ? "bg-bg-sunken text-ink-3" : m.ok ? "bg-mint-soft text-mint" : "bg-rose-soft text-rose")}>
              {done && !m.ok ? <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" /> : <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />}
            </span>
            <span className="min-w-0 flex-1">
              <span className={cn("block truncate font-mono text-[11px]", m.ok ? "text-ink" : "text-ink-3")}>{m.from}</span>
              <span className={cn("block truncate text-[12px]", done && !m.ok ? "text-ink-3 line-through" : "text-ink-2")}>{m.subj}</span>
            </span>
            <span className={cn("shrink-0 font-mono text-[10px]", m.ok ? "text-mint" : "text-rose", reveal(done))}>{m.ok ? "passed" : "blocked"}</span>
          </li>
        );
      })}
    </ul>
  );
}

/* ---------- Meetings: live transcript lines --------------------------------- */
const lines = [
  { t: "14:06", who: "Mira", s: "We can’t roll out 40 seats without SSO." },
  { t: "14:09", who: "Ahmed", s: "SSO is on Scale. I’ll send the comparison." },
  { t: "14:21", who: "Mira", s: "Legal needs the DPA by the 20th." },
];
const bars = [6, 14, 9, 20, 12, 24, 8, 16, 22, 10, 18, 7, 13, 21, 9, 15, 11, 19, 6, 12];

export function MeetingsDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const step = useLive(ref, lines.length + 2, 1300);
  return (
    <div ref={ref} className="space-y-3">
      <div className="flex items-center gap-3 rounded-[12px] bg-bg px-3 py-2">
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-rose">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose" /> REC 23:41
        </span>
        <span aria-hidden="true" className="flex h-7 flex-1 items-center gap-[3px]">
          {bars.map((h, i) => (
            <span key={i} className="w-[3px] flex-1 rounded-full bg-blue/70" style={{ height: `${h}px` }} />
          ))}
        </span>
      </div>
      <ul className="space-y-1.5 text-[12.5px]">
        {lines.map((l, i) => (
          <li key={l.t} className={cn("flex gap-2", reveal(step > i))}>
            <span className="font-mono text-[10px] leading-5 text-ink-3">{l.t}</span>
            <span>
              <b className="font-medium text-ink">{l.who}:</b> <span className="text-ink-2">{l.s}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className={cn("flex items-center gap-1.5 font-mono text-[11px] text-blue-ink", reveal(step > lines.length))}>
        <Check className="h-3.5 w-3.5" aria-hidden="true" /> 3 action items · HubSpot updated
      </p>
    </div>
  );
}

/* ---------- Campaigns: a sequence filling in --------------------------------- */
const seq = [
  { d: "Day 0", t: "Intro · the 3-workflow report", open: 58 },
  { d: "Day 3", t: "LinkedIn connect + note", open: 41 },
  { d: "Day 7", t: "Case: notes into HubSpot", open: 36 },
  { d: "Day 14", t: "Break-up email", open: 29 },
];

export function CampaignsDemo() {
  const ref = useRef<HTMLOListElement>(null);
  const step = useLive(ref, seq.length + 1, 1000);
  return (
    <ol ref={ref} className="relative space-y-2 pl-4 before:absolute before:inset-y-2 before:left-[5px] before:w-px before:bg-line-strong">
      {seq.map((s, i) => (
        <li key={s.d} className="relative">
          <span className={cn("absolute -left-4 top-2.5 h-[11px] w-[11px] rounded-full border-2 border-bg-elev transition-colors", step > i ? "bg-blue" : "bg-line-strong")} />
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[12.5px] text-ink">
              <span className="mr-2 font-mono text-[10px] text-ink-3">{s.d}</span>
              {s.t}
            </span>
            <span className="font-mono text-[10px] tabular-nums text-ink-2">{step > i ? `${s.open}%` : "—"}</span>
          </div>
          <span className="mt-1 block h-1 overflow-hidden rounded-full bg-bg-sunken">
            <span className="block h-full origin-left rounded-full bg-blue transition-transform duration-700 ease-[var(--ease-out)]" style={{ transform: `scaleX(${step > i ? s.open / 100 : 0})` }} />
          </span>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Content & SEO: a brief writing itself --------------------------- */
const outline = ["Why call notes never reach the CRM", "The four fields reps forget", "What to automate, what to keep", "Template: the 2-minute recap"];

export function ContentDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const step = useLive(ref, outline.length + 1, 1000);
  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
      <dl className="grid grid-cols-2 gap-x-3 gap-y-3 self-start rounded-[14px] bg-bg p-3">
        <div className="col-span-2">
          <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">Keyword</dt>
          <dd className="font-medium">AI meeting notes for sales</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] text-ink-3">Volume</dt>
          <dd className="font-display text-2xl font-semibold">1.9k</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] text-ink-3">Difficulty</dt>
          <dd className="font-display text-2xl font-semibold">34</dd>
        </div>
        <div className="col-span-2 h-1.5 overflow-hidden rounded-full bg-bg-sunken">
          <span className="block h-full w-[34%] rounded-full bg-amber" />
        </div>
      </dl>
      <ol className="space-y-1.5">
        {outline.map((h, i) => (
          <li key={h} className={cn("flex gap-2 rounded-[10px] border border-line bg-bg px-3 py-1.5 text-[12.5px]", reveal(step > i))}>
            <span className="font-mono text-[10px] leading-5 text-blue-ink">H2</span>
            {h}
          </li>
        ))}
        <li className={cn("pl-1 font-mono text-[11px] text-ink-3", reveal(step > outline.length - 1))}>1,600 words · links to /pricing · ready for newsletter #14</li>
      </ol>
    </div>
  );
}
