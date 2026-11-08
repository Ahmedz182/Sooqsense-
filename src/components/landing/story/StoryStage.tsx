"use client";

import { useRef, type ReactNode } from "react";
import { owner } from "@/config/demo";
import { AppWindow } from "../shared/AppWindow";
import { screening } from "../shared/deal";
import { gsap, useScene } from "../shared/useScene";
import { chapters } from "./chapters";
import { DraftCard, EmailMessage, EnrichCard, HubSpotCard, LeadCard, ScreenCard } from "./cards";

const SUMMARY_H = 44; // collapsed rail card: 36px row + 8px gap

/** Rail card that can collapse to a one-line summary. Height is driven by the timeline. */
function RailCard({ name, summary, open = false, children }: { name: string; summary: string; open?: boolean; children: ReactNode }) {
  return (
    <div data-card={name} className="relative overflow-hidden" style={{ height: open ? "auto" : 0 }}>
      <div data-full className="pb-2">
        {children}
      </div>
      <div data-sum className="absolute inset-x-0 top-0 opacity-0">
        <div className="flex h-9 items-center gap-2 rounded-[var(--radius-md)] border border-line bg-window px-3 text-xs text-ink-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-mint" aria-hidden="true" />
          <span className="truncate">{summary}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Desktop (≥1024px, motion allowed): one pinned product window whose contents
 * change chapter by chapter. Scrubbed 1:1 to scroll, fully reversible, no snapping.
 */
export function StoryStage() {
  const root = useRef<HTMLDivElement>(null);

  useScene(root, ({ wide }, el) => {
    if (!wide) return;
    const q = gsap.utils.selector(el);
    const card = (n: string) => el.querySelector<HTMLElement>(`[data-card="${n}"]`)!;
    const part = (n: string, p: "full" | "sum") => card(n).querySelector<HTMLElement>(`[data-${p}]`)!;
    const fullH = (n: string) => part(n, "full").scrollHeight;
    const texts = q("[data-ch-text]");
    const segs = q("[data-seg]");
    const draftSheet = q("[data-draft]")[0];
    const lines = q("[data-draft-line]");
    const scoreNum = q("[data-score-num]")[0];
    const score = { v: 0 };

    // Chapter 1 state.
    gsap.set(texts, { autoAlpha: 0, y: 18 });
    gsap.set(texts[0], { autoAlpha: 1, y: 0 });
    gsap.set(segs, { scaleY: 0, transformOrigin: "50% 0%" });
    gsap.set(card("lead"), { height: fullH("lead") });
    gsap.set([card("apify"), card("screen"), card("hubspot")], { height: 0 });
    gsap.set(draftSheet, { yPercent: 112, autoAlpha: 1 });
    gsap.set(lines, { clipPath: "inset(0 100% 0 0)" });
    gsap.set(q("[data-score-bar]"), { scaleX: 0 });
    gsap.set(q("[data-sent-row]"), { autoAlpha: 0 });
    scoreNum.textContent = "0";

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * 4.6)}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Progress: each segment fills across its chapter.
    segs.forEach((s, i) => tl.to(s, { scaleY: 1, duration: 1 }, i));

    // Text crossfades at each chapter boundary — short, so each chapter holds most of its scroll.
    for (let i = 1; i < chapters.length; i++) {
      tl.to(texts[i - 1], { autoAlpha: 0, y: -14, duration: 0.12 }, i - 0.1);
      tl.to(texts[i], { autoAlpha: 1, y: 0, duration: 0.14 }, i - 0.02);
    }

    const collapse = (n: string, at: number) => {
      tl.to(card(n), { height: SUMMARY_H, duration: 0.2 }, at);
      tl.to(part(n, "full"), { autoAlpha: 0, duration: 0.12 }, at);
      tl.to(part(n, "sum"), { autoAlpha: 1, duration: 0.12 }, at + 0.08);
    };
    const expand = (n: string, at: number) => tl.to(card(n), { height: () => fullH(n), duration: 0.24 }, at);

    // 2 — enriched.
    collapse("lead", 0.92);
    expand("apify", 1.0);
    // 3 — screened and scored.
    collapse("apify", 1.92);
    expand("screen", 2.0);
    tl.to(q("[data-score-bar]"), { scaleX: 1, duration: 0.4 }, 2.2);
    tl.to(score, { v: screening.score, duration: 0.4, onUpdate: () => (scoreNum.textContent = String(Math.round(score.v))) }, 2.2);
    // 4 — the reply writes itself.
    collapse("screen", 2.92);
    tl.to(draftSheet, { yPercent: 0, duration: 0.24, ease: "power2.out" }, 3.0);
    lines.forEach((l, i) => tl.to(l, { clipPath: "inset(0 0% 0 0)", duration: 0.12 }, 3.22 + i * 0.12));
    // 5 — approved, sent, HubSpot updated.
    tl.to(q("[data-approve-btn]"), { scale: 0.94, duration: 0.06 }, 4.12);
    tl.to(q("[data-approve-btn]"), { scale: 1, duration: 0.06 }, 4.18);
    tl.to(q("[data-approve-row]"), { autoAlpha: 0, duration: 0.1 }, 4.22);
    tl.to(q("[data-sent-row]"), { autoAlpha: 1, duration: 0.1 }, 4.28);
    expand("hubspot", 4.3);
    tl.to({}, { duration: 0.35 }, 5);
  });

  return (
    <div ref={root} className="motion-stage">
      <div className="container-x grid h-[100svh] grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-12 pt-[var(--header-h)]">
        <div className="flex gap-7">
          <ol className="flex flex-col gap-1.5 pt-2" aria-hidden="true">
            {chapters.map((c) => (
              <li key={c.id} className="h-10 w-[3px] overflow-hidden rounded-full bg-line">
                <span data-seg className="block h-full w-full rounded-full bg-amber" />
              </li>
            ))}
          </ol>
          <div className="relative min-h-[220px] flex-1">
            {chapters.map((c, i) => (
              <div key={c.id} data-ch-text className="absolute inset-x-0 top-0" style={i ? { opacity: 0 } : undefined}>
                <h3 className="text-[2.125rem] leading-[1.1] font-semibold text-ink">{c.title}</h3>
                <p className="text-lead mt-4 max-w-sm text-ink-2">{c.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div aria-hidden="true">
          <AppWindow title={`Inbox — ${owner.email}`} bodyClassName="grid h-[min(600px,calc(100svh-180px))] min-h-[480px] grid-cols-[1fr_264px]">
            <div className="relative overflow-hidden p-6">
              <EmailMessage />
              <div data-draft className="absolute inset-x-4 bottom-4 opacity-0">
                <DraftCard animated />
              </div>
            </div>
            <div className="flex flex-col border-l border-line bg-window-pane p-3">
              <p className="px-1 pb-2.5 text-xs font-medium text-ink-3">SooqSense</p>
              <RailCard name="lead" summary="Lead · Mira Haddad, Carthage Labs" open>
                <LeadCard />
              </RailCard>
              <RailCard name="apify" summary="Enriched · 140 staff, Series B">
                <EnrichCard />
              </RailCard>
              <RailCard name="screen" summary="Passed · ICP score 86 / 100">
                <ScreenCard scoreRef />
              </RailCard>
              <RailCard name="hubspot" summary="HubSpot · Proposal sent">
                <HubSpotCard />
              </RailCard>
            </div>
          </AppWindow>
        </div>
      </div>
    </div>
  );
}
