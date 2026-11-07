"use client";

import { useEffect, useState } from "react";

const cities = [
  { c: "New York", tz: "America/New_York" },
  { c: "London", tz: "Europe/London" },
  { c: "Berlin", tz: "Europe/Berlin" },
];

/** "09:41 New York · 14:41 London · 15:41 Berlin" — rendered after mount to avoid hydration drift. */
export function LocalClocks({ className }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);
  const fmt = (tz: string) => (now ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(now) : "--:--");
  return (
    <p className={className}>
      {cities.map((x, i) => (
        <span key={x.c} className="inline-block whitespace-nowrap">
          {i > 0 && <span className="mx-2 text-line-strong">·</span>}
          <span className="tabular-nums text-ink-2">{fmt(x.tz)}</span> {x.c}
        </span>
      ))}
    </p>
  );
}
