"use client";

import { useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { integrations } from "@/config/demo";
import { LogoMark } from "@/components/ui/Logo";
import { writeBacks } from "./data";
import { useScrollScene } from "./useScrollScene";

const short: Record<string, string> = { gcal: "Calendar", meet: "Meet", sheets: "Sheets", webhooks: "API" };
const inner = ["hubspot", "salesforce", "gmail", "slack", "outlook", "gcal"];
const ring = (ids: string[]) => integrations.filter((i) => ids.includes(i.id));
const outer = integrations.filter((i) => !inner.includes(i.id)).map((i) => i.id);

function Ring({ n, ids, r }: { n: 1 | 2; ids: string[]; r: string }) {
  const items = ring(ids);
  return (
    <div className="orbit-ring" data-ring={n}>
      {items.map((it, i) => (
        <span
          key={it.id}
          className="orbit-tile"
          style={{ "--a": `${(360 / items.length) * i + (n === 2 ? 30 : 0)}deg`, "--r": `var(${r})` } as CSSProperties}
        >
          <span
            className={
              n === 1
                ? "block whitespace-nowrap rounded-[10px] border border-blue/30 bg-bg-elev px-2 py-1.5 font-display text-[11px] font-semibold text-ink shadow-md sm:px-3.5 sm:py-2 sm:text-[15px]"
                : "block whitespace-nowrap rounded-full border border-line bg-bg px-2 py-1 font-mono text-[10px] text-ink-2 sm:px-3 sm:text-[11px]"
            }
          >
            {short[it.id] ?? it.name}
          </span>
        </span>
      ))}
    </div>
  );
}

export function IntegrationsSection() {
  const root = useRef<HTMLElement>(null);
  useScrollScene(root, () => {
    gsap.fromTo("[data-orbit]", { "--spin": "-40deg" }, { "--spin": "40deg", ease: "none", scrollTrigger: { trigger: "[data-orbit]", start: "top bottom", end: "bottom top", scrub: true } });
    gsap.fromTo("[data-wb] li", { opacity: 0.2, x: 16 }, { opacity: 1, x: 0, stagger: 0.12, ease: "none", scrollTrigger: { trigger: "[data-wb]", start: "top 85%", end: "bottom 60%", scrub: true } });
  });

  return (
    <section ref={root} id="integrations" aria-labelledby="int-title" className="scroll-mt-20 overflow-hidden bg-bg-sunken py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">Integrations</p>
          <h2 id="int-title" className="text-h2 mt-3 font-semibold">
            Keep HubSpot. Keep Salesforce. <span className="text-ink-3">Stop typing into them.</span>
          </h2>
        </div>
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div data-orbit className="orbit" role="img" aria-label="SooqSense at the centre, connected to HubSpot, Salesforce, Gmail, Slack, Outlook and Google Calendar, with Zoom, Google Meet, LinkedIn, Mailchimp, Google Sheets and webhooks on the outer ring.">
            <div aria-hidden="true" className="absolute inset-0">
              <span className="absolute left-1/2 top-1/2 aspect-square w-[calc(var(--r1)*2)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-blue/35" />
              <span className="absolute left-1/2 top-1/2 aspect-square w-[calc(var(--r2)*2)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line-strong" />
              <span className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center gap-1 rounded-[22px] bg-amber px-4 py-3 text-on-amber shadow-[var(--glow-amber)] sm:px-6 sm:py-5">
                <LogoMark className="h-7 w-7 sm:h-9 sm:w-9 [&_rect]:fill-[var(--on-amber)] [&_path]:stroke-[var(--amber)] [&_circle]:fill-[var(--amber)]" />
                <span className="font-mono text-[10px] font-medium sm:text-[11px]">5 agents</span>
              </span>
              <Ring n={1} ids={inner} r="--r1" />
              <Ring n={2} ids={outer} r="--r2" />
            </div>
          </div>

          <div>
            <p className="max-w-md text-ink-2">
              Two-way sync with HubSpot and Salesforce, approvals in Slack, drafts in Gmail or Outlook. Here’s what the agents wrote back after one call:
            </p>
            <ol data-wb className="mt-6 overflow-hidden rounded-[var(--radius-lg)] border border-line bg-bg-elev font-mono text-[12px]">
              {writeBacks.map((w, i) => (
                <li key={i} className="grid grid-cols-[3rem_5.5rem_1fr] items-baseline gap-2 border-b border-line px-4 py-3 last:border-0 sm:grid-cols-[3rem_6.5rem_1fr]">
                  <span className="text-ink-3">{w.time}</span>
                  <span className="text-blue-ink">{w.tool}</span>
                  <span className="min-w-0 text-ink">{w.text}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 font-mono text-xs text-ink-3">Plus a REST API and webhooks for everything else.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
