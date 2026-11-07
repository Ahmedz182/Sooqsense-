import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Window chrome for the "before" stack: a tool name, a status dot, some real-looking data. */
function Win({ app, tone, meta, children, className }: { app: string; tone: string; meta?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-bg-elev text-left shadow-[var(--tilt-shadow)]", className)}>
      <div className="flex items-center gap-2 border-b border-line bg-bg-sunken/60 px-3 py-2">
        <span className="h-2 w-2 rounded-full" style={{ background: `var(--${tone})` }} />
        <span className="font-mono text-[11px] font-medium text-ink">{app}</span>
        {meta && <span className="ml-auto font-mono text-[10px] text-ink-3">{meta}</span>}
      </div>
      <div className="flex-1 p-3 text-[12px] leading-snug text-ink-2">{children}</div>
    </div>
  );
}

const Row = ({ k, v, warn }: { k: string; v: string; warn?: boolean }) => (
  <div className="flex justify-between gap-2 border-b border-line/70 py-1 last:border-0">
    <span className="text-ink-3">{k}</span>
    <span className={cn("font-mono text-[11px]", warn ? "text-rose" : "text-ink")}>{v}</span>
  </div>
);

export const toolWindows: { id: string; label: string; node: ReactNode }[] = [
  {
    id: "hubspot",
    label: "HubSpot deal",
    node: (
      <Win app="HubSpot" tone="amber" meta="Deals">
        <p className="font-medium text-ink">Carthage Labs — renewal</p>
        <Row k="Amount" v="$48,000" />
        <Row k="Stage" v="Proposal sent" />
        <Row k="Last activity" v="9 days ago" warn />
      </Win>
    ),
  },
  {
    id: "salesforce",
    label: "Salesforce opportunity",
    node: (
      <Win app="Salesforce" tone="blue" meta="Opp-00412">
        <p className="font-medium text-ink">Northwind — expansion</p>
        <Row k="Value" v="£22,500" />
        <Row k="Close" v="30 Nov" />
        <Row k="Next step" v="— empty —" warn />
      </Win>
    ),
  },
  {
    id: "gmail",
    label: "Gmail thread",
    node: (
      <Win app="Gmail" tone="rose" meta="Inbox 214">
        <p className="font-medium text-ink">Re: Pricing for 40 seats</p>
        <p className="mt-1 text-ink-3">Mira Haddad · 3 unread</p>
        <p className="mt-2 line-clamp-2">“Could you send the SSO comparison before Thursday? Legal is asking…”</p>
      </Win>
    ),
  },
  {
    id: "slack",
    label: "Slack message",
    node: (
      <Win app="Slack" tone="violet" meta="#sales">
        <p>
          <b className="text-ink">Daniel Ortiz</b> <span className="font-mono text-[10px] text-ink-3">16:48</span>
        </p>
        <p className="mt-1">did anyone get back to HelioScale? Lena asked for times last week</p>
        <p className="mt-2 font-mono text-[10px] text-ink-3">2 replies · no owner</p>
      </Win>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn message",
    node: (
      <Win app="LinkedIn" tone="blue" meta="Messaging">
        <p className="font-medium text-ink">Lena Brandt</p>
        <p className="mt-1">“Happy to chat next week — what times work for you?”</p>
        <p className="mt-2 font-mono text-[10px] text-rose">Seen · no reply 12d</p>
      </Win>
    ),
  },
  {
    id: "mailchimp",
    label: "Mailchimp report",
    node: (
      <Win app="Mailchimp" tone="mint" meta="Reports">
        <p className="font-medium text-ink">Q4 webinar invite</p>
        <Row k="Sent" v="1,284" />
        <Row k="Opens" v="31.4%" />
        <Row k="Clicks → CRM" v="not synced" warn />
      </Win>
    ),
  },
  {
    id: "sheet",
    label: "Pipeline spreadsheet",
    node: (
      <Win app="pipeline_FINAL_v7.xlsx" tone="mint">
        <div className="grid grid-cols-[1.4fr_1fr_0.8fr] gap-x-2 font-mono text-[10px]">
          {["Account", "Owner", "Stage", "HelioScale", "?", "Demo", "Northwind", "Daniel", "Opp", "Ledgerly", "Priya??", "#REF!"].map((c, i) => (
            <span key={i} className={cn("truncate border-b border-line/70 py-1", i < 3 ? "text-ink-3" : "text-ink", c === "#REF!" && "text-rose")}>
              {c}
            </span>
          ))}
        </div>
      </Win>
    ),
  },
];
