"use client";

import { useRef, type ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Thread } from "../Thread";
import { ToolMark } from "../ToolMark";
import { useScene, gsap } from "../useScene";
import { story } from "../story";
import { CallCard } from "./CallCard";

const transcript = [
  { t: "06:41", who: "Mira", text: "Honestly, the demo isn't the problem. It's the three days after it." },
  { t: "07:02", who: "Ahmed", text: "Who writes the follow-up today?" },
  { t: "07:05", who: "Mira", text: "Whoever remembers. And then nobody logs it in HubSpot." },
  { t: "21:30", who: "Mira", text: "If we start, it's twelve seats. I need it live before Q1 hiring." },
];

const actions = [
  { who: "Ahmed", what: "Send pricing for 12 Growth seats, yearly" },
  { who: "Ahmed", what: "Share the HubSpot sync guide" },
  { who: "Mira", what: "Loop in Sam from IT about Google SSO" },
];

const draft = `Hi Mira,

Thanks for the time today. You said the demo isn't the problem, the three days after it are, so here's what that looks like fixed: pricing for 12 Growth seats on yearly billing, and the HubSpot sync guide for Sam.

Happy to do a 20-minute setup call Thursday so you're live before Q1 hiring.

Ahmed`;

function Fragment({ label, time, children }: { label: string; time: string; children: ReactNode }) {
  return (
    <div data-frag className="paper p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between font-mono text-[0.68rem] tracking-wide text-ink-3 uppercase">
        <span className="text-amber-ink">{label}</span>
        <span>{time}</span>
      </div>
      {children}
    </div>
  );
}

/** Chapter 3 — after the call: transcript → summary → actions → CRM → follow-up. */
export function Meetings() {
  const ref = useRef<HTMLElement>(null);

  useScene(ref, (_c, root) => {
    root.querySelectorAll<HTMLElement>("[data-frag]").forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "top 70%", scrub: true } });
    });
    root.querySelectorAll<HTMLElement>("[data-tick]").forEach((el) => {
      gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, ease: "back.out(3)", scrollTrigger: { trigger: el, start: "top 80%", end: "top 70%", scrub: true } });
    });
    const typer = root.querySelector<HTMLElement>("[data-type]");
    if (typer) {
      const full = typer.textContent ?? "";
      const state = { n: 0 };
      gsap.to(state, {
        n: full.length,
        ease: "none",
        scrollTrigger: { trigger: typer, start: "top 85%", end: "bottom 45%", scrub: true },
        onUpdate: () => {
          typer.textContent = full.slice(0, Math.round(state.n));
        },
      });
      return () => {
        typer.textContent = full;
      };
    }
  });

  return (
    <section ref={ref} id="meetings" aria-labelledby="mt-title" className="scroll-mt-20">
      <Thread time="Tue 15:30" label="Discovery call with Mira" />
      <div className="container-x mt-8 md:mt-12">
        <h2 id="mt-title" className="text-h1 max-w-4xl font-semibold">
          The call ends. <span className="text-ink-3">The work doesn&rsquo;t.</span>
        </h2>
        <p className="text-lead mt-5 max-w-xl text-ink-2">
          Ahmed talks. SooqSense listens, writes it down, files it in the right place and has the follow-up ready before his next coffee.
        </p>
      </div>

      <div className="container-x mt-12 grid gap-8 pb-24 md:mt-16 md:grid-cols-[0.85fr_1fr] md:gap-14 md:pb-24">
        <div className="md:sticky md:top-28 md:self-start">
          <CallCard />
        </div>

        <div className="grid gap-5">
          <Fragment label="Transcript" time="16:02">
            <ul className="space-y-3">
              {transcript.map((l) => (
                <li key={l.t} className="grid grid-cols-[3rem_1fr] gap-2 text-[0.95rem]">
                  <span className="font-mono text-xs leading-6 text-ink-3">{l.t}</span>
                  <span>
                    <span className="font-medium text-ink">{l.who}</span> <span className="text-ink-2">{l.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Fragment>

          <Fragment label="Summary" time="16:03">
            <p className="font-display text-xl leading-snug text-ink">
              Carthage Labs loses demo follow-ups between HubSpot and Gmail. 12 seats if live before Q1. Decision: Mira, with IT sign-off.
            </p>
          </Fragment>

          <Fragment label="Action items" time="16:03">
            <ul className="space-y-2.5">
              {actions.map((a) => (
                <li key={a.what} className="flex items-start gap-3">
                  <span data-tick className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint text-bg">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-ink-2">
                    <span className="font-medium text-ink">{a.who}:</span> {a.what}
                  </span>
                </li>
              ))}
            </ul>
          </Fragment>

          <Fragment label="CRM updated" time="16:04">
            <div className="flex items-center gap-2 text-sm font-medium text-ink">
              <ToolMark id="hubspot" size="xs" /> {story.deal.name}
            </div>
            <dl className="mt-3 grid gap-2 text-sm">
              {[
                ["Stage", "Discovery", "Proposal"],
                ["Amount", "—", story.deal.amount],
                ["Next step", "—", "Pricing + setup call, Thu"],
              ].map(([k, from, to]) => (
                <div key={k} className="grid grid-cols-[5.5rem_1fr] items-center gap-2">
                  <dt className="text-ink-3">{k}</dt>
                  <dd className="flex flex-wrap items-center gap-2">
                    <span className="text-ink-3 line-through decoration-line-strong">{from}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-amber-ink" aria-hidden="true" />
                    <span className="rounded-full bg-amber-soft px-2 py-0.5 text-ink">{to}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Fragment>

          <Fragment label="Follow-up draft" time="16:05">
            <p className="text-sm text-ink-3">
              To <span className="font-mono">{story.lead.email}</span> · from <span className="font-mono">{story.owner.email}</span>
            </p>
            <p className="mt-1 text-sm font-medium text-ink">Re: the three days after the demo</p>
            <div className="mt-3 min-h-[15rem] rounded-[var(--radius-md)] bg-bg-sunken p-4 text-[0.95rem] leading-relaxed whitespace-pre-line text-ink-2 sm:min-h-[13rem]">
              <span data-type>{draft}</span>
              <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-pulse bg-amber" aria-hidden="true" />
            </div>
            <p className="mt-3 text-xs text-ink-3">Written in Ahmed&rsquo;s voice from the transcript. Sits in his queue until he approves it.</p>
          </Fragment>
        </div>
      </div>
    </section>
  );
}
