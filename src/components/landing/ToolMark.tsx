import { cn } from "@/lib/cn";

/**
 * Simple hand-drawn marks for the tools SooqSense connects to: a short wordmark
 * in a tile, tinted with a theme token. Not official logos — intentionally plain.
 */
export const toolMarks = {
  gmail: { mono: "Gm", name: "Gmail", tone: "rose" },
  outlook: { mono: "Ol", name: "Outlook", tone: "blue" },
  gcal: { mono: "31", name: "Calendar", tone: "mint" },
  zoom: { mono: "Zm", name: "Zoom", tone: "blue" },
  meet: { mono: "Mt", name: "Meet", tone: "mint" },
  hubspot: { mono: "Hs", name: "HubSpot", tone: "amber" },
  salesforce: { mono: "Sf", name: "Salesforce", tone: "blue" },
  slack: { mono: "#", name: "Slack", tone: "violet" },
  linkedin: { mono: "in", name: "LinkedIn", tone: "blue" },
  mailchimp: { mono: "Mc", name: "Mailchimp", tone: "amber" },
  sheets: { mono: "▦", name: "Sheets", tone: "mint" },
  webhooks: { mono: "{}", name: "API", tone: "violet" },
} as const;

export type ToolId = keyof typeof toolMarks;

const tones = {
  rose: "bg-rose-soft text-rose",
  blue: "bg-blue-soft text-blue",
  mint: "bg-mint-soft text-mint",
  amber: "bg-amber-soft text-amber-ink",
  violet: "bg-violet-soft text-violet",
} as const;

export function ToolMark({ id, size = "md", className }: { id: ToolId; size?: "xs" | "sm" | "md"; className?: string }) {
  const t = toolMarks[id];
  const s = size === "xs" ? "h-6 w-6 text-[0.62rem] rounded-[5px]" : size === "sm" ? "h-8 w-8 text-[0.72rem] rounded-[7px]" : "h-10 w-10 text-sm rounded-[9px]";
  return (
    <span aria-hidden="true" className={cn("inline-grid shrink-0 place-items-center font-mono font-medium leading-none", s, tones[t.tone], className)}>
      {t.mono}
    </span>
  );
}

/** A floating tool tile: mark + name, like a sticker on the desk. */
export function ToolTile({ id, className, detail }: { id: ToolId; className?: string; detail?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 whitespace-nowrap rounded-[var(--radius-md)] border border-line bg-bg-elev py-2 pr-3.5 pl-2 shadow-md", className)}>
      <ToolMark id={id} size="sm" />
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-medium text-ink">{toolMarks[id].name}</span>
        {detail && <span className="font-mono text-[0.68rem] text-ink-3">{detail}</span>}
      </span>
    </span>
  );
}
