"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { people } from "@/config/demo";
import { cn } from "@/lib/cn";
import { HandoffChip } from "./HandoffChip";
import { useScrollScene } from "./useScrollScene";

const DAYS = 21;
const lanes: { name: string; agent: string; blocks: { d: number; w: number; t: string; amber?: boolean }[] }[] = [
  { name: "SEO brief", agent: "Content", blocks: [{ d: 0, w: 3, t: "Brief" }] },
  { name: "Email", agent: "Campaigns", blocks: [{ d: 3, w: 1.8, t: "Intro" }, { d: 7, w: 1.8, t: "Case" }, { d: 14, w: 2.2, t: "Last nudge" }] },
  { name: "LinkedIn", agent: "Campaigns", blocks: [{ d: 4, w: 2, t: "Connect" }, { d: 10, w: 2, t: "Note" }] },
  { name: "Newsletter", agent: "Campaigns", blocks: [{ d: 5, w: 2.4, t: "#14" }, { d: 12, w: 2.4, t: "#15" }, { d: 19, w: 2, t: "#16" }] },
  { name: "Replies", agent: "Inbox", blocks: [{ d: 8, w: 3, t: "→ to you", amber: true }, { d: 15, w: 3, t: "→ to you", amber: true }] },
];

const [, james, , , sophie, priya] = people;
const variants = [
  { p: james, line: "saw Northwind is hiring four SDRs — here’s how teams that size stop losing call notes." },
  { p: sophie, line: "with the spring launch coming, here’s the brief we’d hand your newsletter team." },
  { p: priya, line: "congrats on the seed round. Founders tell us follow-ups are the first thing to slip." },
];

export function CampaignsSection() {
  const root = useRef<HTMLElement>(null);

  useScrollScene(root, (_c, el) => {
    const st = { trigger: "[data-lanes]", start: "top 80%", end: "bottom 45%", scrub: true };
    const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: st });
    tl.fromTo("[data-today]", { left: "0%" }, { left: "100%", duration: 1 }, 0);
    el.querySelectorAll<HTMLElement>("[data-block]").forEach((b) => {
      const at = Number(b.dataset.block) / DAYS;
      tl.fromTo(b, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.08 }, at * 0.95);
    });
  });

  return (
    <section ref={root} id="campaigns" aria-labelledby="camp-title" className="scroll-mt-20 border-y border-line bg-bg-sunken py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-16">
          <p aria-hidden="true" className="font-display text-[clamp(4.5rem,3rem+7vw,10rem)] font-semibold leading-[0.85] tracking-[-0.04em]">
            1<span className="text-ink-3">→</span><span className="text-blue-ink">1,284</span>
          </p>
          <div>
            <p className="eyebrow">Campaigns + Content agents</p>
            <h2 id="camp-title" className="text-h2 mt-3 font-semibold">One brief. 1,284 conversations. None of them a mail-merge.</h2>
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 md:grid-cols-4">
          {[
            ["Audience", "RevOps leads · US, UK, DE"],
            ["Enriched", "412 this week"],
            ["Removed", "38 bounced before send"],
            ["Rule", "Stops the moment they reply"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">{k}</dt>
              <dd className="mt-1 text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        {/* lanes */}
        <div data-lanes className="relative mt-10 rounded-[var(--radius-xl)] border border-line bg-bg-elev p-4 md:p-6" role="img" aria-label="A 21-day campaign plan: SEO brief on day 0, emails on days 3, 7 and 14, LinkedIn touches on days 4 and 10, newsletters on days 5, 12 and 19, and replies routed to you.">
          <div aria-hidden="true" className="grid grid-cols-[4.5rem_1fr] gap-x-3 md:grid-cols-[7rem_1fr]">
            <span />
            <div className="relative h-6 font-mono text-[10px] text-ink-3">
              {[0, 7, 14, 21].map((d) => (
                <span key={d} className="absolute top-0 whitespace-nowrap" style={{ left: `${(d / (DAYS + 1)) * 100}%`, transform: d === 21 ? "translateX(-60%)" : undefined }}>
                  {d === 0 ? "Day 0" : d}
                </span>
              ))}
            </div>
            {lanes.map((l) => (
              <div key={l.name} className="contents">
                <div className="flex flex-col justify-center border-t border-line py-2.5">
                  <span className="text-[13px] font-medium text-ink">{l.name}</span>
                  <span className="font-mono text-[10px] text-blue-ink">{l.agent}</span>
                </div>
                <div className="relative border-t border-line py-2.5">
                  <div className="relative h-8">
                    {l.blocks.map((b) => (
                      <span
                        key={b.d}
                        data-block={b.d}
                        className={cn(
                          "absolute top-0 flex h-8 origin-left items-center overflow-hidden whitespace-nowrap rounded-[8px] px-2 font-mono text-[10px] md:text-[11px]",
                          b.amber ? "bg-amber text-on-amber" : "bg-blue-soft text-blue-ink",
                        )}
                        style={{ left: `${(b.d / (DAYS + 1)) * 100}%`, width: `${(b.w / (DAYS + 1)) * 100}%` }}
                      >
                        <span className="hidden truncate sm:block">{b.t}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute bottom-4 left-[calc(4.5rem+0.75rem+1rem)] right-4 top-11 md:bottom-6 md:left-[calc(7rem+0.75rem+1.5rem)] md:right-6 md:top-[3.25rem]">
            <span data-today className="absolute inset-y-0 left-[41%] w-px bg-amber">
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-amber" />
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          <article className="rounded-[var(--radius-xl)] border border-line bg-bg-elev p-5 md:p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-blue-ink">Same sequence, three openings</h3>
            <ul className="mt-4 divide-y divide-line">
              {variants.map((v) => (
                <li key={v.p.email} className="flex gap-3 py-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-soft font-mono text-[10px] text-blue-ink">{v.p.initials}</span>
                  <p className="text-[0.95rem] text-ink-2">
                    <b className="font-medium text-ink">{v.p.name.split(" ")[0]}</b> — {v.line}
                    <span className="mt-0.5 block font-mono text-[10px] text-ink-3">{v.p.title}, {v.p.company} · {v.p.city}</span>
                  </p>
                </li>
              ))}
            </ul>
          </article>
          <article className="flex flex-col rounded-[var(--radius-xl)] border border-line bg-bg-elev p-5 md:p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-blue-ink">Content agent → Campaigns agent</h3>
            <p className="mt-4 font-display text-2xl font-medium leading-snug">
              The SEO brief becomes the blog post, the newsletter and the day-7 email. Written once, used three times.
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
              <HandoffChip from="Content" to="Campaigns" />
              <span className="font-mono text-[11px] text-ink-3">brief · 1,600 words · newsletter #14</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
