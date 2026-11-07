import type { ReactNode } from "react";
import { agents, type AgentId } from "./data";
import { CampaignsDemo, ContentDemo, InboxDemo, MeetingsDemo, SecurityDemo } from "./AgentDemos";
import { HandoffChip } from "./HandoffChip";
import { TiltCard } from "./Tactile";
import { cn } from "@/lib/cn";

const tiles: { id: AgentId; demo: ReactNode; hands: string; area: string; lead: string }[] = [
  {
    id: "inbox",
    demo: <InboxDemo />,
    hands: "Meetings",
    area: "md:col-span-6 lg:col-span-7 lg:row-span-2",
    lead: "Reads the thread, works out who Mira is and how much she matters, then writes the reply you would have written at 23:00.",
  },
  { id: "security", demo: <SecurityDemo />, hands: "Inbox", area: "md:col-span-3 lg:col-span-5", lead: "Spam, lookalike domains and stray phone numbers stop here." },
  { id: "meetings", demo: <MeetingsDemo />, hands: "Inbox", area: "md:col-span-3 lg:col-span-5", lead: "Joins with consent. Leaves with notes, owners and dates." },
  { id: "campaigns", demo: <CampaignsDemo />, hands: "you", area: "md:col-span-3 lg:col-span-5", lead: "Sequences that stop the moment someone replies." },
  { id: "content", demo: <ContentDemo />, hands: "Campaigns", area: "md:col-span-3 lg:col-span-7", lead: "Briefs and pitch reports, sourced from what your buyers actually ask." },
];

export function AgentsBento() {
  return (
    <section id="product" aria-labelledby="agents-title" className="scroll-mt-20 bg-bg-sunken py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <h2 id="agents-title" className="text-h1 font-semibold">
            Open the amber card. <span className="text-blue-ink">There’s a team inside.</span>
          </h2>
          <p className="text-lead max-w-md text-ink-2 lg:justify-self-end">
            Five specialists, each good at one job. They pass work along with a handoff — and the last stop is always you.
          </p>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-6 lg:grid-cols-12 lg:gap-5">
          {tiles.map((t) => (
            <li key={t.id} className={cn("min-w-0", t.area)}>
              <TiltCard max={3} className="h-full">
                <article className="flex h-full flex-col rounded-[var(--radius-xl)] border border-line bg-bg-elev p-5 shadow-sm md:p-6">
                  <header className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inset-0 animate-ping rounded-full bg-blue opacity-40 motion-reduce:hidden" />
                      <span className="relative h-2.5 w-2.5 rounded-full bg-blue" />
                    </span>
                    <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-ink">{agents[t.id].name}</h3>
                  </header>
                  <p className={cn("mt-3 text-ink", t.id === "inbox" ? "font-display text-2xl font-medium leading-tight md:text-[1.75rem]" : "text-[0.98rem]")}>{t.lead}</p>
                  <div className="mt-5 flex-1">{t.demo}</div>
                  <footer className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                    <span className="font-mono text-[11px] text-ink-3">hands off to</span>
                    <HandoffChip to={t.hands === "you" ? "you" : `${t.hands} agent`} />
                  </footer>
                </article>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
