import { cn } from "@/lib/cn";

const sizes = { xs: "h-6 w-6 text-[0.6rem]", sm: "h-8 w-8 text-[0.7rem]", md: "h-10 w-10 text-xs", lg: "h-14 w-14 text-base" };
const tones = {
  amber: "bg-amber-soft text-amber-ink",
  blue: "bg-blue-soft text-blue",
  mint: "bg-mint-soft text-mint",
  violet: "bg-violet-soft text-violet",
  neutral: "bg-bg-sunken text-ink-2",
};

/** Initials avatar (no stock photos). */
export function Avatar({
  initials,
  size = "sm",
  tone = "neutral",
  className,
}: {
  initials: string;
  size?: keyof typeof sizes;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-grid shrink-0 place-items-center rounded-full font-semibold tracking-wide", sizes[size], tones[tone], className)}
    >
      {initials}
    </span>
  );
}
