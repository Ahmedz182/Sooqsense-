"use client";

import { useEffect, useState } from "react";

const zones = [
  { city: "New York", tz: "America/New_York" },
  { city: "London", tz: "Europe/London" },
  { city: "Berlin", tz: "Europe/Berlin" },
];

function fmt(tz: string, d: Date) {
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz }).format(d);
}

/** Live office times — a small reminder that pipeline never sleeps in one zone. */
export function LiveClocks() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-3">
      <span className="relative inline-flex h-2 w-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-mint opacity-50" />
        <span className="relative h-2 w-2 rounded-full bg-mint" />
      </span>
      {zones.map((z, i) => (
        <span key={z.city} className="tabular">
          <time suppressHydrationWarning>{now ? fmt(z.tz, now) : "--:--"}</time> in {z.city}
          {i < zones.length - 1 && <span className="ml-3 text-line-strong">/</span>}
        </span>
      ))}
    </p>
  );
}
