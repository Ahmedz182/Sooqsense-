"use client";

import { useRef, type CSSProperties } from "react";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { TrialButton } from "@/components/ui/TrialButton";
import { Em } from "../shared/SectionHead";

/** Headline, one sentence, two buttons, one trust line. The product window continues in <Showcase />. */
export function Hero() {
  const root = useRef<HTMLElement>(null);


  return (
    <section ref={root} aria-labelledby="hero-title" className="overflow-hidden pb-4 pt-16 md:pt-24">
      <div className="container-x text-center">
        <h1 id="hero-title" className="text-display mx-auto font-semibold tracking-[-0.03em] text-ink">
          {["Your", "Next", "Deal", "Starts", "In", "Your"].map((w, i) => (
            <span key={i}>
              <span className="hero-word" style={{ "--i": i } as CSSProperties}>
                {w}
              </span>{" "}
            </span>
          ))}
          <span className="hero-word" style={{ "--i": 6 } as CSSProperties}>
            <Em>Inbox</Em>.
          </span>
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
    </section>
  );
}
