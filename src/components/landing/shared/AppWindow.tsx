import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { owner } from "@/config/demo";
import { Avatar } from "./Avatar";

/** A SooqSense app window: quiet title bar, token-driven surfaces in both themes. */
export function AppWindow({
  title,
  children,
  className,
  bodyClassName,
  showOwner = true,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  showOwner?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)] border border-line bg-window shadow-window",
        className,
      )}
    >
      <div className="flex h-10 items-center gap-3 border-b border-line bg-window-bar px-4">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        </span>
        <span className="min-w-0 flex-1 truncate text-center text-xs font-medium text-ink-3">{title}</span>
        {showOwner ? <Avatar initials={owner.initials} size="xs" tone="amber" /> : <span className="w-6" />}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
