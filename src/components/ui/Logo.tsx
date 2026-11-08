import Link from "next/link";
import { cn } from "@/lib/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-8 w-8", className)}>
      <rect width="32" height="32" rx="9" fill="var(--amber)" />
      <path
        d="M21.5 11.2c-1-1.5-2.9-2.4-5.2-2.4-3.2 0-5.4 1.7-5.4 4.1 0 2.3 1.7 3.3 4.9 4l1.3.3c1.8.4 2.5.9 2.5 1.8 0 1.1-1.2 1.9-3.1 1.9-1.8 0-3.2-.8-3.9-2.1"
        fill="none"
        stroke="var(--on-amber)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="21.6" cy="22.6" r="1.9" fill="var(--on-amber)" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="SooqSense home" className={cn("inline-flex min-h-11 items-center gap-2.5", className)}>
      <LogoMark />
      <span className="font-display text-[1.2rem] font-semibold tracking-tight text-ink">sooqsense</span>
    </Link>
  );
}
