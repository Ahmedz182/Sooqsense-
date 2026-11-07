"use client";

import { useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check } from "lucide-react";
import { owner, people } from "@/config/demo";
import { cn } from "@/lib/cn";
import { HandoffChip } from "./HandoffChip";
import { useScrollScene } from "./useScrollScene";

const mira = people[0];

const stages: { k: string; title: string; body: ReactNode }[] = [
  {
    k: "Recording",
    title: "Joins with consent",
    body: <p>Zoom · 32 min · both sides told at the start. Mira can say no; the agent leaves.</p>,
  },
  {
    k: "Transcript",
    title: "Every word, with who said it",
    body: (
      <ul className="space-y-1.5 font-mono text-[12px]">
        <li><span className="text-ink-3">14:06</span> <b className="font-medium text-ink">Mira:</b> We can’t roll out 40 seats without SSO.</li>
        <li><span className="text-ink-3">14:09</span> <b className="font-medium text-ink">Ahmed:</b> SSO is on Scale. I’ll send the comparison.</li>
        <li><span className="text-ink-3">14:21</span> <b className="font-medium text-ink">Mira:</b> Legal needs the DPA by the 20th.</li>
      </ul>
    ),
  },
  {
    k: "Summary",
    title: "Three lines, not three pages",
    body: <p className="font-display text-lg leading-snug text-ink">Renewal likely. Blocked on SSO and the DPA. Budget approved for 40 seats; decision by 30 Nov.</p>,
  },
  {
    k: "Action items",
    title: "Owners and dates, pulled out",
    body: (
      <ul className="space-y-2">
        {[
          ["Send Scale vs Growth comparison", "Ahmed · Wed"],
          ["DPA to legal@carthagelabs.io", "Ahmed · by 20 Nov"],
          ["Book security review", "Mira · next week"],
        ].map(([t, w]) => (
          <li key={t} className="flex items-center gap-2.5">
            <span className="grid h-4 w-4 place-items-center rounded-[5px] border border-blue text-blue"><Check className="h-3 w-3" aria-hidden="true" /></span>
            <span className="min-w-0 flex-1 text-ink">
              {t}
              <span className="block font-mono text-[11px] text-ink-3 sm:hidden">{w}</span>
            </span>
            <span className="hidden shrink-0 font-mono text-[11px] text-ink-3 sm:inline">{w}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    k: "CRM updated",
    title: "HubSpot, without opening HubSpot",
    body: (
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-[12px]">
        <dt className="text-ink-3">Stage</dt>
        <dd>Proposal <ArrowRight className="inline h-3 w-3 text-blue" aria-label="to" /> <b className="font-medium text-blue-ink">Negotiation</b></dd>
        <dt className="text-ink-3">Amount</dt>
        <dd>$38,400 <ArrowRight className="inline h-3 w-3 text-blue" aria-label="to" /> <b className="font-medium text-blue-ink">$48,000</b></dd>
        <dt className="text-ink-3">Next step</dt>
        <dd className="text-ink">Send SSO comparison</dd>
      </dl>
    ),
  },
  {
    k: "Follow-up drafted",
    title: "Written before you’ve closed the tab",
    body: (
      <div className="rounded-[12px] border border-dashed border-line-strong bg-bg p-3">
        <p className="font-mono text-[11px] text-ink-3">To: {mira.email}</p>
        <p className="mt-1 font-medium text-ink">SSO + DPA for the 40-seat rollout</p>
        <p className="mt-1 text-ink-2">Hi Mira — thanks for today. As promised, the comparison is attached and the DPA is with your legal team…</p>
        <HandoffChip from="Meetings" to="you · approve" className="mt-3" />
      </div>
    ),
  },
];

export function MeetingsSection() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(stages.length - 1);

  useScrollScene(root, (_c, el) => {
    setActive(0);
    el.querySelectorAll<HTMLElement>("[data-stage]").forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0.25, y: 24 }, { opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: card, start: "top 88%", end: "top 58%", scrub: true } });
      ScrollTrigger.create({ trigger: card, start: "top 60%", end: "bottom 60%", onToggle: (s) => s.isActive && setActive(i), onLeaveBack: () => i === 0 && setActive(0) });
    });
    return undefined;
  });

  return (
    <section ref={root} id="meetings" aria-labelledby="meet-title" className="scroll-mt-20 py-24 md:py-36">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:self-start">
          <p className="eyebrow">Meetings agent</p>
          <h2 id="meet-title" className="text-h2 mt-3 font-semibold">
            A 32-minute call becomes six things you didn’t have to do.
          </h2>

          {/* the call window */}
          <div aria-hidden="true" className="mt-8 overflow-hidden rounded-[var(--radius-xl)] border border-line bg-bg-inverse p-3 text-ink-inverse shadow-lg">
            <div className="flex items-center justify-between px-1 pb-3 font-mono text-[11px] opacity-80">
              <span>Carthage Labs × SooqSense · renewal</span>
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-rose" /> REC 23:41</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { n: owner.name, i: owner.initials, c: "London" },
                { n: mira.name, i: mira.initials, c: "Boston" },
              ].map((p, idx) => (
                <div key={p.n} className="relative grid aspect-[4/3] place-items-center rounded-[16px] bg-[color-mix(in_oklab,var(--bg-inverse)_86%,var(--blue))]">
                  <span className={cn("grid h-14 w-14 place-items-center rounded-full font-display text-lg font-semibold", idx === 0 ? "bg-amber text-on-amber" : "bg-blue text-on-blue")}>{p.i}</span>
                  <span className="absolute bottom-2 left-2 rounded-full bg-[color-mix(in_oklab,var(--bg-inverse)_70%,transparent)] px-2 py-0.5 text-[11px]">{p.n} · {p.c}</span>
                </div>
              ))}
            </div>
            <ol className="mt-3 grid grid-cols-6 gap-1.5 px-1 pb-1">
              {stages.map((s, i) => (
                <li key={s.k} className="min-w-0">
                  <span className={cn("block h-1 rounded-full transition-colors duration-300", i <= active ? "bg-amber" : "bg-[color-mix(in_oklab,var(--ink-inverse)_20%,transparent)]")} />
                  <span className={cn("mt-1.5 hidden truncate font-mono text-[10px] sm:block", i === active ? "opacity-100" : "opacity-55")}>{s.k}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <ol className="space-y-4">
          {stages.map((s, i) => (
            <li key={s.k} data-stage className="rounded-[var(--radius-lg)] border border-line bg-bg-elev p-5 md:p-6">
              <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-blue-ink">
                <span className="text-ink-3">{String(i + 1).padStart(2, "0")}</span> {s.k}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold">{s.title}</h3>
              <div className="mt-3 text-[0.95rem] text-ink-2">{s.body}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
