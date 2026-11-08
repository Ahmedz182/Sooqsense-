import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/SiteShell";

/** Shared layout for legal documents. Content is a DRAFT pending legal review. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <SiteShell>
      <article className="container-x max-w-3xl py-20 md:py-28">
        <h1 className="text-h1 font-semibold">{title}</h1>
        <p className="mt-3 text-sm text-ink-3">Last updated {updated} · Draft pending legal review</p>
        <div className="mt-10 space-y-6 text-ink-2 [&_h2]:mt-12 [&_h2]:text-h3 [&_h2]:font-semibold [&_a]:text-amber-ink [&_a]:underline [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
      </article>
    </SiteShell>
  );
}
