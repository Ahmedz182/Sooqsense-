"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { faq } from "@/config/faq";
import { siteConfig } from "@/config/site";
import { Accordion } from "@/components/ui/Accordion";

export function FaqSection() {
  const [q, setQ] = useState("");
  const items = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? faq.filter((f) => (f.q + f.a).toLowerCase().includes(t)) : faq;
  }, [q]);

  return (
    <section aria-labelledby="faq-title" className="container-x py-24 md:py-32">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:self-start">
          <h2 id="faq-title" className="text-h2 font-semibold">
            Questions, answered <span className="text-blue-ink">plainly.</span>
          </h2>
          <label className="relative mt-8 block max-w-sm">
            <span className="sr-only">Search questions</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" aria-hidden="true" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Try “HubSpot” or “GDPR”"
              className="h-12 w-full rounded-full border border-line-strong bg-bg-elev pl-11 pr-4 text-ink outline-none placeholder:text-ink-3 focus:border-amber focus:shadow-[0_0_0_4px_var(--amber-soft)]"
            />
          </label>
          <p className="mt-4 text-sm text-ink-3">
            Still stuck? <a href={`mailto:${siteConfig.contactEmail}`} className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-amber">{siteConfig.contactEmail}</a>
          </p>
        </div>
        <div aria-live="polite">
          {items.length ? (
            <Accordion key={q.trim() ? "s" : "all"} items={items} query={q} />
          ) : (
            <p className="border-y border-line py-8 text-ink-2">Nothing on “{q}” yet. Email us and we’ll answer it — then add it here.</p>
          )}
        </div>
      </div>
    </section>
  );
}
