import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** The one emphasised word in a large heading. */
export function Em({ children }: { children: ReactNode }) {
  return <span className="text-accent-display">{children}</span>;
}

/** Section title (2–6 words, one line on desktop) + one plain sentence. */
export function SectionHead({
  id,
  title,
  children,
  align = "left",
  className,
}: {
  id: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      <h2 id={id} className="text-h2 font-semibold text-ink">
        {title}
      </h2>
      {children && <p className={cn("text-lead mt-4 text-ink-2", align === "center" && "mx-auto")}>{children}</p>}
    </div>
  );
}
