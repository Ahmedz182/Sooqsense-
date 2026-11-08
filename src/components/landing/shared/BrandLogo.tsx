/* eslint-disable @next/next/no-img-element */
import { integrations } from "@/config/demo";
import { cn } from "@/lib/cn";

export type IntegrationId = (typeof integrations)[number]["id"];

/** Logos whose official colour needs a dark tile to stay legible on light surfaces. */
const needsContrastTile = new Set<IntegrationId>(["mailchimp"]);

const tileSizes = { xs: "h-6 w-6 rounded-[6px] p-1", sm: "h-8 w-8 rounded-[8px] p-1.5", md: "h-11 w-11 rounded-[10px] p-2.5", lg: "h-14 w-14 rounded-[14px] p-3" };
const bareSizes = { xs: "h-4 w-4", sm: "h-5 w-5", md: "h-7 w-7", lg: "h-9 w-9" };

export function integration(id: IntegrationId) {
  return integrations.find((i) => i.id === id)!;
}

/**
 * An official integration mark from /public/logos, on a small neutral tile.
 * Marks are never recoloured; only the tile behind them adapts to the theme.
 */
export function BrandLogo({
  id,
  size = "sm",
  tile = true,
  decorative = false,
  className,
}: {
  id: IntegrationId;
  size?: keyof typeof tileSizes;
  tile?: boolean;
  decorative?: boolean;
  className?: string;
}) {
  const it = integration(id);
  const img = it.logo ? (
    <img src={it.logo} alt={decorative ? "" : it.name} width={32} height={32} loading="lazy" decoding="async" className="h-full w-full object-contain" />
  ) : (
    <svg viewBox="0 0 24 24" className="h-full w-full text-ink-2" aria-hidden={decorative} role={decorative ? undefined : "img"} aria-label={decorative ? undefined : it.name}>
      <path d="M8 7 3 12l5 5M16 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (!tile) return <span className={cn("inline-block shrink-0", bareSizes[size], className)}>{img}</span>;
  return (
    <span
      className={cn("inline-grid shrink-0 place-items-center border border-line", tileSizes[size], className)}
      style={{ background: needsContrastTile.has(it.id) ? "var(--logo-tile-contrast)" : "var(--logo-tile)" }}
    >
      {img}
    </span>
  );
}
