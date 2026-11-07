"use client";

import { useRef } from "react";
import { Thread } from "../Thread";
import { ToolMark } from "../ToolMark";
import { useScene, gsap } from "../useScene";

const sequence = [
  { day: "Day 0", ch: "gmail" as const, what: "“The three days after a demo”", note: "Email" },
  { day: "Day 3", ch: "linkedin" as const, what: "Ahmed comments on their latest post", note: "LinkedIn" },
  { day: "Day 7", ch: "gmail" as const, what: "“What 40 demos a month looks like in HubSpot”", note: "Email" },
  { day: "Day 12", ch: "gmail" as const, what: "“Should I close the loop?”", note: "Email" },
];

const enriched = [
  { name: "James Whitfield", co: "Northwind, London", line: "Saw Northwind is hiring four SDRs in London…" },
  { name: "Lena Brandt", co: "HelioScale, Berlin", line: "Congrats on the new Berlin office. More demos, more follow-ups…" },
  { name: "Daniel Ortiz", co: "BrightPath, Austin", line: "Your demo page promises a reply within a day…" },
];

/** Chapter 4 — one call becomes a campaign for every account like Mira's. */
export function Campaigns() {
  const ref = useRef<HTMLElement>(null);

  useScene(ref, ({ desktop }, root) => {
    const paths = root.querySelectorAll<SVGPathElement>("[data-fan]");
    if (desktop && paths.length) {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.querySelector("[data-fanwrap]"), start: "top 80%", end: "bottom 55%", scrub: true } });
      paths.forEach((p) => {
        const len = p.getTotalLength();
        tl.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0);
      });
    }
    root.querySelectorAll<HTMLElement>("[data-col]").forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 + i * 16 },
        { opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "top 62%", scrub: true } },
      );
    });
  });

  return (
    <section ref={ref} id="campaigns" aria-labelledby="cp-title" className="scroll-mt-20">
      <Thread time="Tue 17:05" label="One call, many accounts" />
      <div className="mt-10 bg-bg-sunken md:mt-14">
        <div className="container-x py-20 md:py-28">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
            <h2 id="cp-title" className="text-h2 font-semibold">
              Mira isn&rsquo;t the only one losing the three days after a demo.
            </h2>
            <p className="max-w-md text-ink-2 md:justify-self-end">
              So the call becomes a campaign. Same insight, sent properly to every account that looks like hers, each email with a first line
              written for the person reading it.
            </p>
          </div>

          {/* Source → audience */}
          <div className="mt-14 flex flex-col items-center text-center">
            <blockquote className="paper max-w-xl px-5 py-4 text-left">
              <p className="font-mono text-[0.68rem] tracking-wide text-amber-ink uppercase">From the 15:30 call</p>
              <p className="mt-1.5 font-display text-lg leading-snug text-ink sm:text-xl">
                &ldquo;The demo isn&rsquo;t the problem. It&rsquo;s the three days after it.&rdquo;
              </p>
            </blockquote>
            <span className="h-8 w-[2px] rounded-full bg-amber" aria-hidden="true" />
            <p className="rounded-full border border-line-strong bg-bg-elev px-4 py-2 text-sm text-ink-2">
              <span className="font-display text-base font-semibold text-ink">214</span> RevOps leaders · 50–500 staff · on HubSpot · US, UK &amp; EU
            </p>
          </div>

          <div data-fanwrap className="relative hidden h-20 md:block" aria-hidden="true">
            <svg viewBox="0 0 1000 80" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              {["M500 0 C500 50, 190 30, 190 80", "M500 0 C500 40, 535 40, 535 80", "M500 0 C500 50, 830 30, 830 80"].map((d) => (
                <path key={d} data-fan d={d} fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke" className="stroke-amber" />
              ))}
            </svg>
          </div>

          <div className="mt-8 grid gap-5 md:mt-0 md:grid-cols-[1.15fr_1fr_0.9fr] md:items-start">
            <div data-col className="paper p-5">
              <p className="font-mono text-[0.68rem] tracking-wide text-ink-3 uppercase">Sequence · 4 touches · 12 days</p>
              <ol className="mt-4 space-y-3">
                {sequence.map((s) => (
                  <li key={s.day} className="grid grid-cols-[3.5rem_1.5rem_1fr] items-start gap-2 text-sm">
                    <span className="font-mono text-xs leading-6 text-ink-3">{s.day}</span>
                    <ToolMark id={s.ch} size="xs" />
                    <span className="text-ink">{s.what}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 border-t border-line pt-3 text-xs text-ink-3">Stops for anyone who replies or books. Sent from Ahmed&rsquo;s inbox, after approval.</p>
            </div>

            <div data-col className="paper p-5 md:mt-10">
              <p className="font-mono text-[0.68rem] tracking-wide text-ink-3 uppercase">Content enrichment · first lines</p>
              <ul className="mt-4 space-y-4">
                {enriched.map((e) => (
                  <li key={e.name}>
                    <p className="text-sm font-medium text-ink">
                      {e.name} <span className="font-normal text-ink-3">· {e.co}</span>
                    </p>
                    <p className="mt-1 rounded-[var(--radius-sm)] border-l-2 border-amber bg-bg-sunken px-3 py-1.5 text-sm text-ink-2">{e.line}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div data-col className="paper p-5 md:mt-20">
              <p className="font-mono text-[0.68rem] tracking-wide text-ink-3 uppercase">SEO brief · for the blog</p>
              <p className="mt-4 font-display text-lg leading-snug text-ink">post-demo follow-up email</p>
              <p className="mt-1 text-xs text-ink-3">Intent: commercial · Audience: RevOps, sales leads</p>
              <ul className="mt-4 space-y-2 text-sm text-ink-2">
                <li className="flex gap-2"><span className="font-mono text-xs leading-5 text-amber-ink">H2</span>Why the 72 hours after a demo decide the deal</li>
                <li className="flex gap-2"><span className="font-mono text-xs leading-5 text-amber-ink">H2</span>A follow-up template your reps will actually send</li>
                <li className="flex gap-2"><span className="font-mono text-xs leading-5 text-amber-ink">H2</span>Logging it in HubSpot without copy-paste</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
