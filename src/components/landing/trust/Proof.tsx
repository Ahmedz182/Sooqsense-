import { Star } from "lucide-react";
import { cn } from "@/lib/cn";
import type { TrustedCompany } from "@/config/trust";

/** Marks any sample or unconfirmed entry, so nothing unverified passes as fact. */
export function SampleTag({ label = "Sample", className }: { label?: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 shrink-0 items-center rounded-full border border-dashed border-line-strong px-2 align-middle text-[0.6875rem] font-normal tracking-normal text-ink-3",
        className,
      )}
    >
      {label}
    </span>
  );
}

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5", className)} role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={cn("h-4 w-4", i <= Math.round(rating) ? "fill-amber text-amber" : "text-line-strong")} aria-hidden="true" />
      ))}
    </span>
  );
}

const wordmark: Record<TrustedCompany["style"], string> = {
  serif: "font-[Georgia,serif] italic text-[1.35rem] tracking-tight",
  wide: "text-[1.05rem] font-semibold uppercase tracking-[0.22em]",
  mono: "font-mono text-lg tracking-tight",
  bold: "text-[1.4rem] font-bold tracking-[-0.04em]",
  light: "text-[1.1rem] font-light tracking-[0.3em]",
};

/** A fictional company wordmark (text only — never a real logo). */
export function Wordmark({ company }: { company: TrustedCompany }) {
  return <span className={cn("whitespace-nowrap text-ink-2", wordmark[company.style])}>{company.name}</span>;
}
