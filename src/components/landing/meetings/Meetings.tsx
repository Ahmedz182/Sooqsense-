"use client";

import { useRef } from "react";
import { Check, Mail } from "lucide-react";
import { cn } from "@/lib/cn";
import { Avatar } from "../shared/Avatar";
import { BrandLogo } from "../shared/BrandLogo";
import { SectionHead } from "../shared/SectionHead";
import { gsap, useScene } from "../shared/useScene";
import { summary, transcript } from "./meeting";

/** Chapter after the story: the call. A transcript that resolves into a summary. */
export function Meetings() {
  const root = useRef<HTMLElement>(null);

  useScene(root, (_c, el) => {
    const q = gsap.utils.selector(el);
    const marks = q("[data-mark]");
    const items = q("[data-sum-item]");
    gsap.set(marks, { autoAlpha: 0 });
    gsap.set(items, { autoAlpha: 0.12, y: 10 });
    gsap.set(q("[data-state-done]"), { autoAlpha: 0 });
    gsap.set(q("[data-state-rec]"), { autoAlpha: 1 });
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: q("[data-sheet]")[0], start: "top 78%", end: "bottom 62%", scrub: true },
    });
    marks.forEach((m, i) => {
      tl.to(m, { autoAlpha: 1, duration: 0.5 }, i);
      tl.to(items[i], { autoAlpha: 1, y: 0, duration: 0.5 }, i + 0.3);
    });
    tl.to(q("[data-state-rec]"), { autoAlpha: 0, duration: 0.3 }, marks.length);
    tl.to(q("[data-state-done]"), { autoAlpha: 1, duration: 0.3 }, marks.length);
    tl.to(items[items.length - 1], { autoAlpha: 1, y: 0, duration: 0.5 }, marks.length + 0.2);
  });

  let k = 0;
  return (
    <section ref={root} id="meetings" aria-labelledby="meetings-title" className="scroll-mt-[var(--header-h)] py-16 md:py-28">
      <div className="container-x">
        <SectionHead id="meetings-title" title="Then the call.">
          Mira books a call. SooqSense records it with consent, writes the summary, and drafts the follow-up before you hang up.
        </SectionHead>

        <div data-sheet className="mt-12 overflow-hidden rounded-[var(--radius-xl)] border border-line bg-bg-elev md:mt-16">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line px-5 py-4 sm:px-7">
            <BrandLogo id="meet" size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{summary.title}</p>
              <p className="truncate text-xs text-ink-3">{summary.meta}</p>
            </div>
            <span className="relative inline-flex h-7 items-center text-xs font-medium">
              <span data-state-rec className="absolute right-0 inline-flex items-center gap-1.5 whitespace-nowrap text-rose opacity-0">
                <span className="h-2 w-2 rounded-full bg-rose" aria-hidden="true" /> Recording
              </span>
              <span data-state-done className="inline-flex items-center gap-1.5 whitespace-nowrap text-mint">
                <Check className="h-3.5 w-3.5" aria-hidden="true" /> Summary ready
              </span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div className="border-line px-5 py-6 sm:px-7 lg:border-r lg:py-8">
              <p className="text-xs font-medium text-ink-3">Transcript</p>
              <ol className="mt-4 space-y-1">
                {transcript.map((l) => (
                  <li key={l.t} className="relative flex gap-3 rounded-[var(--radius-sm)] px-2 py-2 sm:gap-4">
                    {l.key !== undefined && <span data-mark className="absolute inset-0 rounded-[var(--radius-sm)] bg-marker" aria-hidden="true" />}
                    <span className="relative w-10 shrink-0 pt-0.5 text-xs text-ink-3 tabular">{l.t}</span>
                    <Avatar initials={l.who} size="xs" tone={l.who === "AF" ? "amber" : "blue"} className="relative mt-0.5" />
                    <p className={cn("relative text-sm leading-relaxed", l.key !== undefined ? "text-ink" : "text-ink-2")}>{l.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-t border-line bg-bg px-5 py-6 sm:px-7 lg:border-t-0 lg:py-8">
              <p className="text-xs font-medium text-ink-3">Summary</p>
              <ul className="mt-4 space-y-2.5">
                {summary.points.map((p) => (
                  <li key={p} data-sum-item={k++} className="text-sm leading-relaxed text-ink">
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-xs font-medium text-ink-3">Action items</p>
              <ul className="mt-3 space-y-2">
                {summary.actions.map((a) => (
                  <li key={a.text} data-sum-item={k++} className="flex items-start gap-2.5 text-sm text-ink">
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-[4px] border border-line-strong" aria-hidden="true" />
                    <span>
                      {a.text} <span className="text-ink-3">· {a.who}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div data-sum-item={k++} className="mt-7 flex items-center gap-3 rounded-[var(--radius-md)] border border-line bg-bg-elev p-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-soft text-amber-ink">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink">Follow-up drafted</p>
                  <p className="truncate text-xs text-ink-3">{summary.followUp}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-5 text-sm text-ink-3">Works with Zoom, Google Meet and Microsoft Teams. Notes land on the HubSpot deal too.</p>
      </div>
    </section>
  );
}
