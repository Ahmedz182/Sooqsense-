/* eslint-disable @next/next/no-img-element */
import { Check } from "lucide-react";
import { founder, reviewSummary, securityFacts, showSampleProof, testimonials, visible } from "@/config/trust";
import { Avatar } from "../shared/Avatar";
import { Em, SectionHead } from "../shared/SectionHead";
import { SampleTag, Stars } from "./Proof";

function Reviews() {
  const quotes = visible(testimonials);
  const summary = !reviewSummary.sample || showSampleProof ? reviewSummary : null;
  if (!quotes.length && !summary) return null;
  return (
    <div className="mt-14 md:mt-16">
      {summary && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="tabular text-3xl font-semibold tracking-tight text-ink">{summary.rating.toFixed(1)}</span>
          <Stars rating={summary.rating} />
          <span className="text-sm text-ink-2">
            {summary.label} · {summary.count} reviews
          </span>
          {summary.sample && <SampleTag />}
        </div>
      )}
      <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {quotes.map((t) => (
          <li key={t.name}>
            <figure className="flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-bg-elev p-6">
              <div className="flex items-center justify-between gap-3">
                <Stars rating={t.rating} />
                {t.sample && <SampleTag />}
              </div>
              <blockquote className="mt-4 flex-1 leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                {/* Initials only: stock photos never sit next to a quote. */}
                <Avatar initials={t.name.split(" ").map((w) => w[0]).join("")} size="md" tone="neutral" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{t.name}</p>
                  <p className="truncate text-xs text-ink-3">
                    {t.title}, {t.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FounderNote() {
  if (founder.sample && !showSampleProof) return null;
  return (
    <figure className="flex flex-col self-start rounded-[var(--radius-xl)] border border-line bg-bg-elev p-7 text-ink sm:p-9">
      <blockquote className="text-lg leading-relaxed sm:text-xl">&ldquo;{founder.note}&rdquo;</blockquote>
      <figcaption className="mt-8 flex items-center gap-3.5">
        {founder.photo ? (
          <img src={founder.photo} alt={founder.name} width={56} height={56} className="h-14 w-14 rounded-full object-cover ring-1 ring-line" />
        ) : (
          <Avatar initials="AF" size="lg" tone="amber" />
        )}
        <div>
          <p className="flex items-center gap-2 font-medium text-ink">
            {founder.name}
            {founder.sample && <SampleTag label="Draft" />}
          </p>
          <p className="text-sm text-ink-3">{founder.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

/** Security facts, a founder's note, reviews and testimonials. */
export function Trust() {
  return (
    <section id="trust" data-theme="dark" aria-labelledby="trust-title" className="scroll-mt-[var(--header-h)] bg-bg-sunken py-16 text-ink md:py-28">
      <div className="container-x">
        <SectionHead id="trust-title" title={<>Built to be <Em>trusted</Em>.</>}>
          SooqSense works inside your inbox and your CRM. Here is exactly what it can and can&rsquo;t do.
        </SectionHead>
        <div className="mt-12 grid grid-cols-1 gap-10 md:mt-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <ul className="divide-y divide-line border-y border-line">
            {securityFacts.map((f) => (
              <li key={f.id} className="flex gap-4 py-5">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mint-soft text-mint">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="flex flex-wrap items-center gap-2 text-base font-medium tracking-normal text-ink">
                    {f.title}
                    {!f.confirmed && <SampleTag label="To confirm" />}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{f.detail}</p>
                </div>
              </li>
            ))}
          </ul>
          <FounderNote />
        </div>
        <Reviews />
      </div>
    </section>
  );
}
