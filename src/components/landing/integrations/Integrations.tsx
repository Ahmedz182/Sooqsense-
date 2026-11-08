import { ArrowLeftRight } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import { BrandLogo, integration, type IntegrationId } from "../shared/BrandLogo";
import { SectionHead } from "../shared/SectionHead";

const groups: { name: string; ids: IntegrationId[] }[] = [
  { name: "Email & calendar", ids: ["gmail", "outlook", "gcal"] },
  { name: "Meetings", ids: ["zoom", "meet", "teams"] },
  { name: "Prospecting & data", ids: ["apify", "linkedin", "sheets"] },
  { name: "Campaigns", ids: ["instantly", "mailchimp"] },
  { name: "Team & docs", ids: ["slack", "notion", "webhooks"] },
];

function SyncDiagram() {
  return (
    <div className="rounded-[var(--radius-xl)] border border-line bg-bg-elev p-6 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col items-center gap-2.5">
          <BrandLogo id="hubspot" size="lg" />
          <span className="text-sm font-medium text-ink">HubSpot</span>
        </div>
        <ArrowLeftRight className="h-5 w-5 shrink-0 text-ink-3" aria-hidden="true" />
        <div className="flex flex-col items-center gap-2.5">
          <span className="grid h-14 w-14 place-items-center rounded-[14px] border border-line bg-bg">
            <LogoMark className="h-9 w-9" />
          </span>
          <span className="text-sm font-medium text-ink">SooqSense</span>
        </div>
        <ArrowLeftRight className="h-5 w-5 shrink-0 text-ink-3" aria-hidden="true" />
        <div className="flex flex-col items-center gap-2.5">
          <BrandLogo id="salesforce" size="lg" />
          <span className="text-sm font-medium text-ink">Salesforce</span>
        </div>
      </div>
      <p className="mt-7 border-t border-line pt-5 text-sm leading-relaxed text-ink-2">
        <span className="font-medium text-ink">Two-way sync.</span> Contacts, deals, notes and activities stay current in both directions. Your CRM stays the system of record.
      </p>
    </div>
  );
}

/** All fifteen official marks, grouped by job — a calm list, not a wall of tiles. */
export function Integrations() {
  return (
    <section id="integrations" aria-labelledby="integrations-title" className="scroll-mt-[var(--header-h)] py-16 md:py-28">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div>
          <SectionHead id="integrations-title" title="Works where you work.">
            Connect your inbox in a minute. SooqSense works on top of the tools your team already uses.
          </SectionHead>
          <div className="mt-10">
            <SyncDiagram />
          </div>
        </div>
        <ul className="divide-y divide-line border-y border-line self-start">
          {groups.map((g) => (
            <li key={g.name} className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-[136px_1fr] sm:items-center">
              <h3 className="text-sm font-medium text-ink-3">{g.name}</h3>
              <ul className="flex flex-wrap gap-x-5 gap-y-4">
                {g.ids.map((id) => (
                  <li key={id} className="flex items-center gap-3">
                    <BrandLogo id={id} size="md" decorative />
                    <span className="text-[0.9375rem] font-medium text-ink">{integration(id).name}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
