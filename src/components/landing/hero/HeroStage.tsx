"use client";

import { useRef, type PointerEvent } from "react";
import { CheckCircle2, CornerDownRight } from "lucide-react";
import { ToolMark, ToolTile, type ToolId } from "../ToolMark";
import { useScene, gsap } from "../useScene";
import { story } from "../story";

/** Where each tool tile sits before the scroll pulls it into the node (% of stage). */
/** Desktop position (left/top) and phone position (ml/mt), in % of the stage. */
const tiles: { id: ToolId; left: string; top: string; ml: string; mt: string; detail: string; rot: number }[] = [
  { id: "gmail", left: "0%", top: "3%", ml: "2%", mt: "1%", detail: "214 unread", rot: -5 },
  { id: "slack", left: "33%", top: "-1%", ml: "27%", mt: "4%", detail: "#sales · 9 new", rot: 3 },
  { id: "hubspot", left: "66%", top: "4%", ml: "52%", mt: "0%", detail: "42 open deals", rot: 4 },
  { id: "salesforce", left: "82%", top: "33%", ml: "80%", mt: "3%", detail: "sync off", rot: -3 },
  { id: "linkedin", left: "80%", top: "66%", ml: "40%", mt: "91%", detail: "3 replies", rot: 5 },
  { id: "gcal", left: "1%", top: "88%", ml: "6%", mt: "89%", detail: "5 calls today", rot: -4 },
  { id: "mailchimp", left: "50%", top: "90%", ml: "74%", mt: "88%", detail: "draft · Q4", rot: 2 },
];

export function HeroStage() {
  const stage = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useScene(stage, (_c, root) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 30%", end: "bottom 45%", scrub: true, invalidateOnRefresh: true },
    });
    tiles.forEach((t, i) => {
      const el = root.querySelector<HTMLElement>(`[data-tile="${t.id}"]`);
      const target = root.querySelector<HTMLElement>(`[data-target="${t.id}"]`);
      if (!el || !target) return;
      const delta = () => {
        const a = el.getBoundingClientRect();
        const b = target.getBoundingClientRect();
        return { x: b.left + b.width / 2 - (a.left + a.width / 2), y: b.top + b.height / 2 - (a.top + a.height / 2) };
      };
      tl.to(el, { x: () => delta().x, y: () => delta().y, rotate: 0, scale: 0.35, opacity: 0, ease: "power2.in", duration: 1 }, i * 0.08);
      tl.fromTo(target, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, ease: "back.out(2.5)", duration: 0.3 }, i * 0.08 + 0.8);
    });
    tl.fromTo(root.querySelector("[data-connected]"), { opacity: 0.35 }, { opacity: 1, duration: 0.4 }, 0.6);
  });

  // Gentle tilt toward the cursor (fine pointers only; the CSS ignores it on touch).
  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !card.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.current.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
    card.current.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
  }
  function onLeave() {
    card.current?.style.setProperty("--rx", "0deg");
    card.current?.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      ref={stage}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto aspect-[1/1.3] w-full max-w-[560px] [perspective:1200px] sm:aspect-[1/0.98]"
    >
      {tiles.map((t) => (
        <div
          key={t.id}
          data-tile={t.id}
          className="absolute top-[var(--mt)] left-[var(--ml)] z-10 will-change-transform sm:top-[var(--t)] sm:left-[var(--l)]"
          style={{ ["--l" as string]: t.left, ["--t" as string]: t.top, ["--ml" as string]: t.ml, ["--mt" as string]: t.mt, rotate: `${t.rot}deg` }}
          aria-hidden="true"
        >
          <ToolTile id={t.id} detail={t.detail} className="max-sm:[&>span:last-child]:hidden max-sm:pr-2" />
        </div>
      ))}

      {/* The first workflow node — everything above collapses into this. */}
      <div className="absolute top-[15%] right-[6%] left-[4%] sm:top-[21%] sm:right-[19%] sm:left-[6%]">
        <div
          ref={card}
          className="paper relative p-4 transition-transform duration-500 ease-out [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] sm:p-5"
          role="img"
          aria-label={`Workflow trigger: website contact form from ${story.lead.name} at ${story.company.name}, routed to ${story.owner.name}.`}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-soft px-2.5 py-1 font-mono text-[0.68rem] tracking-wide text-amber-ink uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" /> Trigger
            </span>
            <span className="font-mono text-[0.7rem] text-ink-3">Tue 13:04</span>
          </div>
          <p className="mt-3 font-display text-lg font-semibold leading-snug text-ink sm:text-xl">Website contact form</p>
          <div className="mt-3 rounded-[var(--radius-md)] border border-line bg-bg-sunken p-3">
            <p className="text-sm font-medium text-ink">
              {story.lead.name} <span className="font-normal text-ink-3">· {story.lead.title}, {story.company.name}</span>
            </p>
            <p className="mt-1.5 line-clamp-2 text-sm text-ink-2">“{story.formMessage}”</p>
          </div>
          <p className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-ink-3">
            <CornerDownRight className="h-3.5 w-3.5" aria-hidden="true" />
            Routed to {story.owner.name}
            <span className="font-mono text-ink-2">{story.owner.email}</span>
          </p>
          <div data-connected className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3">
            <span className="flex items-center gap-1.5 text-xs text-ink-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-mint" aria-hidden="true" /> 7 tools, one agent
            </span>
            <span className="flex gap-1">
              {tiles.map((t) => (
                <span key={t.id} data-target={t.id} className="inline-flex">
                  <ToolMark id={t.id} size="xs" />
                </span>
              ))}
            </span>
          </div>
        </div>
        {/* Next-step stub: the thread starts here. */}
        <div className="ml-10 hidden h-10 w-[2px] rounded-full bg-amber sm:block" aria-hidden="true" />
        <div className="ml-6 hidden items-center gap-2 rounded-full sm:inline-flex border border-dashed border-line-strong bg-bg-elev px-3 py-1.5 font-mono text-[0.7rem] text-ink-3">
          next: enrich → score → follow up
        </div>
      </div>
    </div>
  );
}
