"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";

const order = ["system", "light", "dark"] as const;
const icons = { system: Monitor, light: Sun, dark: Moon };

/** Cycles system → light → dark. Renders a stable placeholder before hydration. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const current = (mounted ? theme : "system") as (typeof order)[number];
  const Icon = icons[current] ?? Monitor;
  const next = order[(order.indexOf(current) + 1) % order.length];
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Theme: ${current}. Switch to ${next}`}
      title={`Theme: ${current}`}
      className={cn(
        "inline-flex h-11 w-11 md:h-10 md:w-10 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-bg-sunken hover:text-ink",
        className,
      )}
    >
      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
    </button>
  );
}
