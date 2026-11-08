"use client";

import { useRef } from "react";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { TrialButton } from "@/components/ui/TrialButton";
import { gsap, useScene } from "../shared/useScene";
import { HeroWindow } from "./HeroWindow";
import { LogoStrip } from "./LogoStrip";
import { Em } from "../shared/SectionHead";
import { TrustedBy } from "../trust/TrustedBy";

/** Headline, one sentence, two buttons, one product window. Nothing else. */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  // The window starts tilted back and eases flat as you scroll — scrubbed 1:1.
  useScene(root, ({ narrow }) => {
    const win = root.current?.querySelector<HTMLElement>("[data-hero-window]");
    if (!win) return;
    gsap.fromTo(
      win,
      { rotateX: narrow ? 10 : 16, scale: narrow ? 0.97 : 0.94, transformPerspective: 1800, transformOrigin: "50% 0%" },
      {
        rotateX: 0,
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: narrow ? "+=360" : "+=560", scrub: true },
      },
    );
  });

  return (
    <section ref={root} aria-labelledby="hero-title" className="overflow-hidden pt-16 md:pt-24">
      <div className="container-x text-center">
        <h1 id="hero-title" className="text-display mx-auto font-semibold tracking-[-0.03em] text-ink">
          Your next deal starts in your <Em>inbox</Em>.
        </h1>
        <p className="text-lead mx-auto mt-5 max-w-[34rem] text-ink-2">
          SooqSense takes it from there — follow-ups, meeting notes and CRM updates, ready for you to approve.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <TrialButton className="w-full sm:w-auto" />
          <ButtonLink href={siteConfig.demoUrl} variant="secondary" size="lg" className="w-full sm:w-auto">
            Book a demo
          </ButtonLink>
        </div>
        <p className="mx-auto mt-6 max-w-[22rem] text-sm text-ink-3 sm:max-w-none">
          Nothing sends without your approval<span aria-hidden="true" className="hidden sm:inline"> · </span>
          <br className="sm:hidden" />
          Read-only by default<span aria-hidden="true"> · </span>GDPR-ready
        </p>
      </div>
      <div className="container-x mt-14 md:mt-20">
        <div data-hero-window className="hero-tilt mx-auto max-w-[1120px] will-change-transform" aria-hidden="true">
          <HeroWindow />
        </div>
      </div>
      <LogoStrip />
      <TrustedBy />
    </section>
  );
}
