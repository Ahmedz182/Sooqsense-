import { LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

/**
 * The signature motif: the collapsed amber SooqSense card, shrunk to a chip and
 * passed from one agent to the next.
 */
export function HandoffChip({ from, to, className }: { from?: string; to: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-amber py-1 pl-1 pr-2.5 font-mono text-[11px] font-medium text-on-amber shadow-[var(--glow-amber)]",
        className,
      )}
    >
      <LogoMark className="h-4 w-4 [&_rect]:fill-[var(--on-amber)] [&_path]:stroke-[var(--amber)] [&_circle]:fill-[var(--amber)]" />
      {from && <span className="opacity-75">{from} →</span>}
      <span>{to}</span>
    </span>
  );
}
