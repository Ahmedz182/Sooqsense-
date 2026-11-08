"use client";

import { useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { people } from "@/config/demo";
import { BrandLogo } from "../shared/BrandLogo";
import { Avatar } from "../shared/Avatar";
import { SectionHead } from "../shared/SectionHead";
import { gsap, useScene } from "../shared/useScene";

const leads = people.filter((p) => p.name !== "Mira Haddad").slice(0, 5);

const sequence = [
  { day: "Day 0", subject: "Fridays back from CRM updates" },
  { day: "Day 3", subject: "A two-minute walkthrough" },
  { day: "Day 7", subject: "Try it on your own pipeline" },
  { day: "Day 12", subject: "Closing the loop" },
];

function LeadList() {
  return (
    <div className="rounded-[var(--radius-lg)] border border-line bg-bg-elev p-5">
      <div className="flex items-center gap-2.5">
        <BrandLogo id="apify" size="sm" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink">Apify · LinkedIn profile scraper</p>
          <p className="text-xs text-ink-3">RevOps leaders, US, UK and EU</p>
        </div>
      </div>
      <ul className="mt-4 divide-y divide-line border-y border-line">
        {leads.map((p) => (
          <li key={p.email} data-lead className="flex items-center gap-3 py-2.5">
            <Avatar initials={p.initials} size="xs" />
            <p className="min-w-0 flex-1 truncate text-sm text-ink">
              {p.name} <span className="text-ink-3">· {p.company}</span>
            </p>
            <span className="hidden shrink-0 text-xs text-ink-3 sm:inline">{p.city}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-ink-3">
        <span className="tabular font-medium text-ink">1,240</span> leads, enriched and checked
      </p>
    </div>
  );
}

function Sequence() {
  return (
    <div className="rounded-[var(--radius-lg)] border border-line bg-bg-elev p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <BrandLogo id="instantly" size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink">Instantly · cold email campaign</p>
          <p className="text-xs text-ink-3">Q1 RevOps outreach · 4 steps</p>
        </div>
        <span className="text-xs font-medium text-mint">Approved by Ahmed</span>
      </div>

      {/* Desktop: horizontal track. Phones: vertical. */}
      <div className="relative mt-7">
        <div className="absolute top-[7px] right-[12%] left-[12%] hidden h-[2px] bg-line md:block" aria-hidden="true">
          <div data-track-x className="h-full origin-left bg-amber" />
        </div>
        <div className="absolute top-2 bottom-2 left-[7px] w-[2px] bg-line md:hidden" aria-hidden="true">
          <div data-track-y className="h-full w-full origin-top bg-amber" />
        </div>
        <ol className="relative grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-4">
          {sequence.map((s) => (
            <li key={s.day} data-step className="flex gap-4 md:flex-col md:items-center md:gap-3 md:text-center">
              <span className="relative mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 border-amber bg-bg-elev md:mt-0" aria-hidden="true">
                <span data-dot className="h-1.5 w-1.5 rounded-full bg-amber" />
              </span>
              <div>
                <p className="text-xs font-medium text-ink-3">{s.day}</p>
                <p className="mt-1 text-sm text-ink">{s.subject}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-7 border-t border-line pt-4 text-xs text-ink-3">
        40 sends a day per inbox, warmed up first. Replies come back to your SooqSense inbox.
      </p>
    </div>
  );
}

function Newsletter() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[var(--radius-lg)] border border-line bg-bg-elev p-5">
      <BrandLogo id="mailchimp" size="sm" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-ink">No reply after day 12? Mailchimp · monthly newsletter</p>
        <p className="text-xs text-ink-3">They join the next issue instead of going cold.</p>
      </div>
    </div>
  );
}

/** One-to-many: an Apify list feeds an Instantly sequence and a Mailchimp newsletter. */
export function Campaigns() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ wide }, el) => {
    const q = gsap.utils.selector(el);
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: q("[data-campaign-visual]")[0], start: "top 75%", end: "bottom 70%", scrub: true },
    });
    tl.fromTo(q("[data-lead]"), { autoAlpha: 0.2, x: -8 }, { autoAlpha: 1, x: 0, stagger: 0.15, duration: 0.4 }, 0);
    tl.fromTo(q(wide ? "[data-track-x]" : "[data-track-y]"), wide ? { scaleX: 0 } : { scaleY: 0 }, wide ? { scaleX: 1, duration: 1.2 } : { scaleY: 1, duration: 1.2 }, 0.6);
    tl.fromTo(q("[data-dot]"), { scale: 0 }, { scale: 1, stagger: 0.36, duration: 0.12 }, 0.6);
    tl.fromTo(q("[data-newsletter]"), { autoAlpha: 0.2, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 1.7);
  });

  return (
    <section ref={root} id="campaigns" aria-labelledby="campaigns-title" className="scroll-mt-[var(--header-h)] bg-bg-sunken py-16 md:py-28">
      <div className="container-x">
        <SectionHead id="campaigns-title" title="Then a thousand more.">
          The same care, one-to-many. Apify finds the people, Instantly runs the sequence, and Mailchimp keeps everyone else warm.
        </SectionHead>

        <div data-campaign-visual className="mt-12 grid grid-cols-1 items-start gap-4 md:mt-16 lg:grid-cols-[minmax(0,4fr)_auto_minmax(0,8fr)] lg:gap-5">
          <LeadList />
          <div className="grid place-items-center text-ink-3 lg:h-full" aria-hidden="true">
            <ArrowDown className="h-5 w-5 lg:hidden" />
            <ArrowRight className="hidden h-5 w-5 lg:block" />
          </div>
          <div className="grid gap-4">
            <Sequence />
            <div data-newsletter>
              <Newsletter />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
