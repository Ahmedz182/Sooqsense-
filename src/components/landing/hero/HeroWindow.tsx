import { CalendarDays, Inbox, ListTodo, Megaphone, Reply, Search, Workflow, BriefcaseBusiness } from "lucide-react";
import { owner } from "@/config/demo";
import { cn } from "@/lib/cn";
import { AppWindow } from "../shared/AppWindow";
import { BrandLogo, type IntegrationId } from "../shared/BrandLogo";
import { Avatar } from "../shared/Avatar";
import { inbox, mira, miraEmail } from "../shared/deal";

const nav = [
  { label: "Inbox", icon: Inbox, count: "12", active: true },
  { label: "Today", icon: ListTodo, count: "3" },
  { label: "Pipeline", icon: BriefcaseBusiness },
  { label: "Meetings", icon: CalendarDays },
  { label: "Workflows", icon: Workflow },
  { label: "Campaigns", icon: Megaphone },
];

const connected: IntegrationId[] = ["gmail", "gcal", "zoom", "hubspot", "slack", "apify"];

function Sidebar() {
  return (
    <aside className="hidden flex-col border-r border-line bg-window-pane p-3 lg:flex">
      <div className="flex items-center gap-2.5 px-2 py-2">
        <Avatar name={owner.name} />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink">{owner.name}</p>
          <p className="truncate text-[0.7rem] text-ink-3">{owner.email}</p>
        </div>
      </div>
      <ul className="mt-4 space-y-0.5">
        {nav.map(({ label, icon: Icon, count, active }) => (
          <li
            key={label}
            className={cn(
              "flex h-9 items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 text-sm",
              active ? "bg-bg-sunken font-medium text-ink" : "text-ink-2",
            )}
          >
            <Icon className="h-4 w-4 text-ink-3" aria-hidden="true" />
            <span className="flex-1">{label}</span>
            {count && <span className="tabular text-xs text-ink-3">{count}</span>}
          </li>
        ))}
      </ul>
      <div className="mt-auto px-2 pb-1">
        <p className="text-xs text-ink-3">Connected</p>
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {connected.map((id) => (
            <li key={id}>
              <BrandLogo id={id} size="sm" decorative />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function Row({ who, initials, subject, preview, time, fresh = false }: { who: string; initials: string; subject: string; preview: string; time: string; fresh?: boolean }) {
  return (
    <li className={cn("relative flex gap-3 overflow-hidden border-b border-line px-4 py-3.5", fresh && "arrive bg-marker")}>
      {fresh && <span className="absolute top-[22px] left-1.5 h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />}
      <Avatar initials={initials} name={who} size="md" tone={fresh ? "amber" : "neutral"} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className={cn("truncate text-sm text-ink", fresh ? "font-semibold" : "font-medium")}>{who}</p>
          <span className="shrink-0 tabular text-xs text-ink-3">{time}</span>
        </div>
        <p className={cn("truncate text-sm", fresh ? "text-ink" : "text-ink-2")}>{subject}</p>
        <p className="truncate text-xs text-ink-3">{preview}</p>
      </div>
    </li>
  );
}

function MessageList() {
  return (
    <div className="flex min-w-0 flex-col border-line lg:border-r">
      <div className="flex h-12 items-center justify-between gap-3 border-b border-line px-4">
        <p className="text-sm font-semibold text-ink">Inbox</p>
        <span className="flex h-8 flex-1 items-center gap-2 rounded-full bg-bg-sunken px-3 text-xs text-ink-3 sm:max-w-[200px]">
          <Search className="h-3.5 w-3.5" aria-hidden="true" /> Search
        </span>
      </div>
      <ul className="overflow-hidden">
        <Row who={mira.name} initials={mira.initials} subject={miraEmail.subject} preview={miraEmail.preview} time={miraEmail.time} fresh />
        {inbox.map((m) => (
          <Row key={m.who} {...m} />
        ))}
      </ul>
    </div>
  );
}

function ReadingPane() {
  return (
    <article className="hidden min-w-0 flex-col p-7 md:flex">
      <h3 className="text-xl font-semibold tracking-tight text-ink">{miraEmail.subject}</h3>
      <div className="mt-5 flex items-center gap-3">
        <Avatar name={mira.name} size="md" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-ink">
            {mira.name} <span className="font-normal text-ink-3">· {mira.title}, {mira.company}</span>
          </p>
          <p className="truncate text-xs text-ink-3">
            {mira.email} → {owner.email}
          </p>
        </div>
        <span className="flex items-center gap-2 text-xs text-ink-3">
          <BrandLogo id="gmail" size="xs" tile={false} decorative />
          <span className="tabular">Today, {miraEmail.time}</span>
        </span>
      </div>
      <div className="mt-6 max-w-[52ch] space-y-3.5 text-[0.9375rem] leading-relaxed text-ink-2">
        {miraEmail.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-8">
        <span className="inline-flex h-9 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-ink-2">
          <Reply className="h-4 w-4" aria-hidden="true" /> Reply
        </span>
        <span className="inline-flex h-9 items-center gap-2 rounded-full bg-bg-sunken px-3.5 text-sm text-ink-2">
          <BrandLogo id="hubspot" size="xs" tile={false} decorative /> New contact in HubSpot
        </span>
      </div>
    </article>
  );
}

/** Ahmed's inbox, the moment Mira's message lands. Decorative — the copy around it carries the meaning. */
export function HeroWindow() {
  return (
    <AppWindow title={`Inbox — ${owner.email}`} bodyClassName="grid grid-cols-1 h-[440px] md:h-[500px] md:grid-cols-[300px_1fr] lg:h-[560px] lg:grid-cols-[208px_340px_1fr]">
      <Sidebar />
      <MessageList />
      <ReadingPane />
    </AppWindow>
  );
}
