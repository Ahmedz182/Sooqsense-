import { Check } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

const items = [
  { t: "Reply to Mira Haddad", s: "SSO comparison · draft ready", done: false },
  { t: "Carthage Labs renewal", s: "$48,000 · due in 30 days", done: false },
  { t: "Lena Brandt went quiet", s: "nudge drafted · 2 times offered", done: true },
];

/** The one amber card the seven tools collapse into: tomorrow's morning queue. */
export function SooqCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-[18px] bg-amber p-1.5 text-left text-on-amber shadow-[var(--glow-amber)]", className)}>
      <div className="flex items-center gap-2 px-2.5 pb-2 pt-1.5">
        <LogoMark className="h-5 w-5 [&_rect]:fill-[var(--on-amber)] [&_path]:stroke-[var(--amber)] [&_circle]:fill-[var(--amber)]" />
        <span className="whitespace-nowrap font-mono text-[11px] font-medium">SooqSense · Mon 08:30</span>
        <span className="ml-auto whitespace-nowrap font-mono text-[10px] opacity-75">3 need you</span>
      </div>
      <ul className="space-y-1">
        {items.map((it) => (
          <li key={it.t} className="flex items-center gap-2.5 rounded-[12px] bg-[color-mix(in_oklab,var(--bg-elev)_88%,var(--amber))] px-2.5 py-2 text-ink">
            <span
              className={cn(
                "grid h-4 w-4 shrink-0 place-items-center rounded-full border",
                it.done ? "border-mint bg-mint text-bg-elev" : "border-line-strong",
              )}
            >
              {it.done && <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[12.5px] font-medium leading-tight">{it.t}</span>
              <span className="block truncate font-mono text-[10px] text-ink-3">{it.s}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
