import { owner } from "@/config/demo";
import { Avatar } from "../shared/Avatar";
import { BrandLogo } from "../shared/BrandLogo";
import { deal, mira } from "../shared/deal";
import { account } from "../shared/people";

const health = 82;

/** Contact detail: who, which deal, how healthy the relationship is, and who's on it. */
export function ContactPanel() {
  return (
    <aside className="flex flex-col gap-6 border-line p-5 sm:p-6 md:border-r">
      <div className="flex items-center gap-4">
        <Avatar name={mira.name} size="lg" />
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold tracking-tight text-ink">{mira.name}</p>
          <p className="truncate text-sm text-ink-2">
            {mira.title} · {mira.company}
          </p>
          <p className="truncate text-xs text-ink-3">{mira.city}</p>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
        <div>
          <dt className="text-xs text-ink-3">Deal value</dt>
          <dd className="tabular mt-0.5 font-medium text-ink">{deal.value}</dd>
        </div>
        <div>
          <dt className="text-xs text-ink-3">Stage</dt>
          <dd className="mt-1">
            <span className="rounded-full bg-amber-soft px-2 py-0.5 text-xs font-medium text-amber-ink">{deal.stage}</span>
          </dd>
        </div>
        <div>
          <dt className="text-xs text-ink-3">Expected close</dt>
          <dd className="mt-0.5 font-medium text-ink">Dec 18</dd>
        </div>
        <div>
          <dt className="text-xs text-ink-3">Source</dt>
          <dd className="mt-0.5 flex items-center gap-1.5 font-medium text-ink">
            <BrandLogo id="gmail" size="xs" tile={false} decorative /> Inbound
          </dd>
        </div>
      </dl>

      <div>
        <div className="flex items-baseline justify-between text-xs">
          <span className="text-ink-3">Relationship health</span>
          <span className="font-medium text-mint">Strong · {health}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg-sunken">
          <div data-health className="h-full origin-left rounded-full bg-mint" style={{ width: `${health}%` }} />
        </div>
        <p className="mt-2 text-xs text-ink-3">Replies within 2 hours · 3 people engaged · proposal opened twice</p>
      </div>

      <div className="mt-auto border-t border-line pt-5">
        <p className="text-xs text-ink-3">Deal team</p>
        <ul className="mt-3 space-y-2.5">
          {account.team.map((m) => (
            <li key={m.name} className="flex items-center gap-2.5">
              <Avatar name={m.name} initials={m.name === owner.name ? owner.initials : undefined} tone="amber" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{m.name}</p>
                <p className="truncate text-xs text-ink-3">{m.title}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-ink-3">
          <BrandLogo id="hubspot" size="xs" tile={false} decorative /> Synced with HubSpot · 2 min ago
        </p>
      </div>
    </aside>
  );
}
