import { ArrowRight, Check, Pencil, ShieldCheck } from "lucide-react";
import { owner } from "@/config/demo";
import { cn } from "@/lib/cn";
import { Avatar } from "../shared/Avatar";
import { BrandLogo } from "../shared/BrandLogo";
import { deal, draft, enrichment, mira, miraEmail, screening } from "../shared/deal";

/** Small product cards for the story. Shared by the pinned stage and the stacked chapters. */

export const cardBox = "rounded-[var(--radius-md)] border border-line bg-window";

export function CardLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-xs font-medium text-ink-3", className)}>{children}</p>;
}

export function EmailMessage({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Avatar name={mira.name} size="md" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink">{mira.name}</p>
          <p className="truncate text-xs text-ink-3">
            {mira.email} → {owner.email}
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-ink-3">
          <BrandLogo id="gmail" size="xs" tile={false} decorative />
          <span className="tabular">{miraEmail.time}</span>
        </span>
      </div>
      <p className="mt-4 text-[0.9375rem] font-semibold text-ink">{miraEmail.subject}</p>
      <div className={cn("mt-2 space-y-2 text-sm leading-relaxed text-ink-2", compact && "[&>p:nth-child(3)]:hidden")}>
        {miraEmail.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </div>
  );
}

export function LeadCard() {
  return (
    <div className={cn(cardBox, "p-3.5")}>
      <CardLabel>New lead</CardLabel>
      <div className="mt-2.5 flex items-center gap-2.5">
        <Avatar name={mira.name} />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink">{mira.name}</p>
          <p className="truncate text-xs text-ink-3">
            {mira.title} · {mira.company}
          </p>
        </div>
      </div>
      <p className="mt-3 text-xs text-ink-2">Inbound · pricing question · {miraEmail.time}</p>
    </div>
  );
}

export function EnrichCard() {
  return (
    <div className={cn(cardBox, "p-3.5")}>
      <div className="flex items-center gap-2">
        <BrandLogo id="apify" size="xs" />
        <p className="min-w-0 truncate text-xs font-medium text-ink">{enrichment.actor}</p>
      </div>
      <dl className="mt-3 divide-y divide-line">
        {enrichment.rows.map((r) => (
          <div key={r.k} className="flex items-baseline justify-between gap-3 py-1.5 text-xs">
            <dt className="text-ink-3">{r.k}</dt>
            <dd className="truncate text-right font-medium text-ink">{r.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ScreenCard({ scoreRef = false }: { scoreRef?: boolean }) {
  return (
    <div className={cn(cardBox, "p-3.5")}>
      <div className="flex items-center justify-between gap-2">
        <CardLabel>Security check</CardLabel>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-mint">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Passed
        </span>
      </div>
      <ul className="mt-2 space-y-1">
        {screening.checks.map((c) => (
          <li key={c} className="flex items-center gap-1.5 text-xs text-ink-2">
            <Check className="h-3 w-3 shrink-0 text-mint" aria-hidden="true" /> {c}
          </li>
        ))}
      </ul>
      <div className="mt-3.5 border-t border-line pt-3">
        <div className="flex items-baseline justify-between">
          <CardLabel>ICP score</CardLabel>
          <p className="text-ink">
            <span data-score-num={scoreRef || undefined} className="tabular text-xl font-semibold">
              {screening.score}
            </span>
            <span className="text-xs text-ink-3"> / 100</span>
          </p>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg-sunken">
          <div data-score-bar={scoreRef || undefined} className="h-full origin-left rounded-full bg-amber" style={{ width: `${screening.score}%` }} />
        </div>
      </div>
    </div>
  );
}

export function DraftCard({ sent = false, animated = false }: { sent?: boolean; animated?: boolean }) {
  return (
    <div className={cn(cardBox, "p-4 shadow-md")}>
      <div className="flex items-center justify-between gap-2">
        <CardLabel>Draft · in {owner.firstName}&rsquo;s voice</CardLabel>
        <BrandLogo id="gmail" size="xs" tile={false} decorative />
      </div>
      <div className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink">
        {draft.lines.map((l) => (
          <p key={l} data-draft-line={animated || undefined}>
            {l}
          </p>
        ))}
      </div>
      <div className="relative mt-4 h-9">
        <div data-approve-row={animated || undefined} className={cn("absolute inset-0 flex items-center gap-2", sent && !animated && "hidden")}>
          <span className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line-strong px-3.5 text-xs text-ink-2">
            <Pencil className="h-3.5 w-3.5" aria-hidden="true" /> Edit
          </span>
          <span data-approve-btn={animated || undefined} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-amber px-4 text-xs font-medium text-on-amber">
            Approve &amp; send <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
        <div data-sent-row={animated || undefined} className={cn("absolute inset-0 flex items-center gap-2 text-xs text-ink-2", !sent && !animated && "hidden", animated && "opacity-0")}>
          <Avatar name={owner.name} size="xs" />
          Approved by {owner.name} · sent {deal.synced}
        </div>
      </div>
    </div>
  );
}

export function HubSpotCard() {
  return (
    <div className={cn(cardBox, "p-3.5")}>
      <div className="flex items-center gap-2">
        <BrandLogo id="hubspot" size="xs" />
        <p className="text-xs font-medium text-ink">Deal updated in HubSpot</p>
      </div>
      <p className="mt-3 text-sm font-medium text-ink">{deal.name}</p>
      <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-ink-3 line-through decoration-line-strong">{deal.from}</span>
        <ArrowRight className="h-3 w-3 text-ink-3" aria-hidden="true" />
        <span className="rounded-full bg-amber-soft px-2 py-0.5 font-medium text-amber-ink">{deal.stage}</span>
      </p>
      <div className="mt-3 flex items-center justify-between border-t border-line pt-2.5 text-xs">
        <span className="tabular font-medium text-ink">{deal.value}</span>
        <span className="text-ink-3">Synced {deal.synced}</span>
      </div>
      <p className="mt-2.5 flex items-center gap-1.5 text-xs text-ink-2">
        <BrandLogo id="slack" size="xs" tile={false} decorative /> Posted to #sales
      </p>
    </div>
  );
}
