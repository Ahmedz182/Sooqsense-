/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/cn";
import { owner } from "@/config/demo";
import { initialsOf, photoOf } from "./people";

const sizes = { xs: "h-6 w-6 text-[0.6rem]", sm: "h-8 w-8 text-[0.7rem]", md: "h-10 w-10 text-xs", lg: "h-14 w-14 text-base", xl: "h-20 w-20 text-xl" };
const tones = {
  amber: "bg-amber-soft text-amber-ink",
  blue: "bg-blue-soft text-blue",
  mint: "bg-mint-soft text-mint",
  violet: "bg-violet-soft text-violet",
  neutral: "bg-bg-sunken text-ink-2",
};

/**
 * Avatar for product mock-ups. Pass `name` to use that person's mock-up portrait when
 * one exists (see people.ts); otherwise initials. Ahmed Fayyaz has no portrait on purpose.
 */
export function Avatar({
  initials,
  name,
  photo: explicitPhoto,
  size = "sm",
  tone = "neutral",
  className,
}: {
  initials?: string;
  name?: string;
  /** Force a specific photo (used for Ahmed's own photo in the hero only). */
  photo?: string;
  size?: keyof typeof sizes;
  tone?: keyof typeof tones;
  className?: string;
}) {
  const photo = explicitPhoto ?? (name ? photoOf[name] : undefined);
  if (!photo && name === owner.name && tone === "neutral") tone = "amber";
  if (photo)
    return (
      <img
        src={photo}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width={80}
        height={80}
        className={cn("inline-block shrink-0 rounded-full object-cover ring-1 ring-line", sizes[size], className)}
      />
    );
  return (
    <span
      aria-hidden="true"
      className={cn("inline-grid shrink-0 place-items-center rounded-full font-semibold tracking-wide", sizes[size], tones[tone], className)}
    >
      {initials ?? (name ? initialsOf(name) : "")}
    </span>
  );
}
