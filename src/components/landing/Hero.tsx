"use client";

import { useRef, type CSSProperties, type PointerEvent } from "react";
import { gsap } from "gsap";
import { siteConfig } from "@/config/site";
import { TrialButton } from "@/components/ui/TrialButton";
import { ButtonLink } from "@/components/ui/Button";
import { toolWindows } from "./ToolWindows";
import { SooqCard } from "./SooqCard";
import { Magnetic } from "./Tactile";
import { useScrollScene } from "./useScrollScene";

/** Fan positions (px from centre) for the seven tools — a hand of cards. */
const fan = [
  { x: -420, y: 64, z: -30, ry: 22, rz: -13, i: 0 },
  { x: -282, y: 14, z: -10, ry: 15, rz: -8, i: 2 },
  { x: -140, y: -20, z: 10, ry: 8, rz: -3.5, i: 4 },
  { x: 0, y: -46, z: -50, ry: 0, rz: 0.5, i: 6 },
  { x: 140, y: -20, z: 10, ry: -8, rz: 3.5, i: 5 },
  { x: 282, y: 14, z: -10, ry: -15, rz: 8, i: 3 },
  { x: 420, y: 64, z: -30, ry: -22, rz: 13, i: 1 },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  // Scrubbed collapse: --c follows scroll 1:1 from the very first pixel.
  useScrollScene(root, ({ mobile }) => {
    gsap.to(stage.current, {
      "--c": 1,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: mobile ? "bottom 45%" : "bottom top+=220", scrub: true },
    });
  });

  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    const el = stage.current;
    if (!el || !window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--ty", `${(((e.clientX - r.left) / r.width - 0.5) * 6).toFixed(2)}deg`);
    el.style.setProperty("--tx", `${(-((e.clientY - r.top) / r.height - 0.5) * 4).toFixed(2)}deg`);
  };

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(60%_60%_at_78%_20%,var(--wash-blue),transparent_70%),radial-gradient(50%_50%_at_10%_70%,var(--wash-amber),transparent_70%)]" />
      <div className="container-x relative pt-12 md:pt-20">
        <p className="font-mono text-xs text-ink-3">
          <span className="text-blue-ink">●</span> Agentic CRM for B2B sales &amp; marketing
        </p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:items-end">
          <h1 id="hero-title" className="text-display font-semibold leading-[0.92] tracking-[-0.035em]">
            Close the seven tabs.
            <span className="block text-amber-ink">Keep the pipeline.</span>
          </h1>
          <div className="lg:pb-3">
            <p className="text-lead max-w-md text-ink-2">
              SooqSense replaces the copy-paste between HubSpot, Gmail, Slack, LinkedIn and that spreadsheet with a small team of agents. They
              read every conversation, hand work to each other, and ask you before anything is sent.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Magnetic>
                <TrialButton />
              </Magnetic>
              <ButtonLink href={siteConfig.demoUrl} variant="secondary" size="lg">
                Book a demo
              </ButtonLink>
            </div>
            <p className="mt-3 font-mono text-xs text-ink-3">{siteConfig.trial.note}</p>
          </div>
        </div>
      </div>

      <div className="relative mt-10 overflow-hidden pb-6 md:mt-6">
        <div
          ref={stage}
          onPointerMove={tilt}
          className="stack-stage container-x"
          role="img"
          aria-label="Seven tool windows — a HubSpot deal, a Salesforce opportunity, a Gmail thread, a Slack message, a LinkedIn message, a Mailchimp report and a spreadsheet — fanned out, collapsing into one SooqSense morning queue."
        >
          <div className="stack-inner" aria-hidden="true">
            {toolWindows.map((t, n) => {
              const f = fan[n];
              const style = { "--x": f.x, "--y": f.y, "--z": f.z, "--ry": f.ry, "--rz": f.rz, "--i": f.i } as CSSProperties;
              return (
                <div key={t.id} className="stack-card" style={style}>
                  {t.node}
                </div>
              );
            })}
            <div className="stack-sooq">
              <SooqCard />
            </div>
          </div>
          <p aria-hidden="true" className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs text-ink-3">
            <span className="stack-count-before inline-block">7 tools · 23 tabs · 147 copy-pastes a week</span>
            <span className="stack-count-after absolute inset-0 text-center text-amber-ink">1 queue · 3 decisions</span>
          </p>
        </div>
      </div>
    </section>
  );
}
