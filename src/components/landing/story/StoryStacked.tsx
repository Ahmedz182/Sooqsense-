"use client";

import { useRef, type ReactNode } from "react";
import { owner } from "@/config/demo";
import { cn } from "@/lib/cn";
import { AppWindow } from "../shared/AppWindow";
import { gsap, useScene } from "../shared/useScene";
import { chapters } from "./chapters";
import { DraftCard, EmailMessage, EnrichCard, HubSpotCard, ScreenCard } from "./cards";

const visuals: { title: string; body: ReactNode }[] = [
  { title: `Inbox — ${owner.email}`, body: <EmailMessage /> },
  { title: "Lead · Mira Haddad", body: <EnrichCard /> },
  { title: "Lead · Mira Haddad", body: <ScreenCard /> },
  { title: "Reply to Mira", body: <DraftCard /> },
  {
    title: "Reply to Mira",
    body: (
      <div className="space-y-3">
        <DraftCard sent />
        <HubSpotCard />
      </div>
    ),
  },
];

function Steps({ at }: { at: number }) {
  return (
    <ol className="flex gap-1.5" aria-label={`Step ${at + 1} of ${chapters.length}`}>
      {chapters.map((c, i) => (
        <li key={c.id} className={cn("h-[3px] w-6 rounded-full", i <= at ? "bg-amber" : "bg-line")} />
      ))}
    </ol>
  );
}

/**
 * Phones, tablets and reduced motion: the five chapters stack, each with its own
 * small window in its complete state.
 */
export function StoryStacked() {
  const root = useRef<HTMLDivElement>(null);

  useScene(root, ({ narrow }, el) => {
    if (!narrow) return;
    el.querySelectorAll<HTMLElement>("[data-chapter-visual]").forEach((v) => {
      gsap.fromTo(v, { autoAlpha: 0.35, y: 28 }, { autoAlpha: 1, y: 0, ease: "none", scrollTrigger: { trigger: v, start: "top 95%", end: "top 65%", scrub: true } });
    });
  });

  return (
    <div ref={root} className="motion-stacked container-x pt-16 pb-4 md:pt-24 md:pb-8">
      <ol className="space-y-20 md:space-y-28">
        {chapters.map((c, i) => (
          <li key={c.id} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,7fr)] lg:gap-14">
            <div>
              <Steps at={i} />
              <h3 className="mt-5 text-[clamp(1.75rem,1.4rem+1vw,2.25rem)] leading-[1.1] font-semibold text-ink">{c.title}</h3>
              <p className="text-lead mt-3 max-w-md text-ink-2">{c.text}</p>
            </div>
            <div data-chapter-visual aria-hidden="true">
              <AppWindow title={visuals[i].title} bodyClassName="bg-window-pane p-4 sm:p-6">
                <div className="mx-auto max-w-md">{visuals[i].body}</div>
              </AppWindow>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
