"use client";

import { useRef } from "react";
import { AppWindow } from "../shared/AppWindow";
import { BrandLogo, type IntegrationId } from "../shared/BrandLogo";
import { Em, SectionHead } from "../shared/SectionHead";
import { gsap, useScene } from "../shared/useScene";
import { ConnectionsGraph, ConnectionsList } from "./Connections";
import { ContactPanel } from "./ContactPanel";

const timeline: { when: string; what: string; logo: IntegrationId }[] = [
  { when: "Tue 09:12", what: "Mira asked about pricing for 12 seats", logo: "gmail" },
  { when: "Tue 09:16", what: "Reply approved and sent by Ahmed", logo: "gmail" },
  { when: "Thu 14:00", what: "Discovery call, summary and follow-up", logo: "meet" },
  { when: "Fri 10:02", what: "Owen opened the proposal twice", logo: "hubspot" },
];

/** The account view: contact detail, relationship health, and who knows whom. */
export function Account() {
  const root = useRef<HTMLElement>(null);

  useScene(root, (_c, el) => {
    const q = gsap.utils.selector(el);
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: q("[data-account-window]")[0], start: "top 80%", end: "center 55%", scrub: true },
    });
    tl.fromTo(q("[data-person]"), { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, stagger: 0.12, duration: 0.3 }, 0);
    tl.fromTo(q("[data-link]"), { strokeDasharray: "0 1" }, { strokeDasharray: "1 0", stagger: 0.1, duration: 0.4 }, 0.25);
    tl.fromTo(q("[data-health]"), { scaleX: 0 }, { scaleX: 1, duration: 0.5 }, 0.2);
    tl.fromTo(q("[data-event]"), { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, stagger: 0.12, duration: 0.25 }, 0.4);
  });

  return (
    <section ref={root} id="account" data-theme="dark" aria-labelledby="account-title" className="scroll-mt-[var(--header-h)] bg-bg-sunken py-16 text-ink md:py-28">
      <div className="container-x">
        <SectionHead id="account-title" title={<>See the whole <Em>account</Em>.</>}>
          Every email, call and CRM record about Carthage Labs in one place, with the people who matter and how they connect.
        </SectionHead>

        <div data-account-window className="mt-12 md:mt-16" aria-hidden="true">
          <AppWindow title="Carthage Labs — account" bodyClassName="grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] lg:grid-cols-[320px_minmax(0,1fr)]">
            <ContactPanel />
            <div className="flex min-w-0 flex-col border-t border-line md:border-t-0">
              <div className="border-b border-line p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-ink">People at Carthage Labs</p>
                  <p className="text-xs text-ink-3">5 contacts · 2 warm paths</p>
                </div>
                <div className="mt-3 hidden lg:block">
                  <ConnectionsGraph />
                </div>
                <div className="mt-1 lg:hidden">
                  <ConnectionsList />
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-sm font-medium text-ink">Timeline</p>
                <ol className="mt-4 space-y-3.5">
                  {timeline.map((t) => (
                    <li key={t.when} data-event className="flex items-center gap-3 text-sm">
                      <BrandLogo id={t.logo} size="xs" />
                      <span className="tabular w-[4.75rem] shrink-0 text-xs text-ink-3">{t.when}</span>
                      <span className="min-w-0 truncate text-ink">{t.what}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </AppWindow>
        </div>
      </div>
    </section>
  );
}
