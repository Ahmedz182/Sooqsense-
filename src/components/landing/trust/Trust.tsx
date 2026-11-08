/* eslint-disable @next/next/no-img-element */
import { Check } from "lucide-react";
import { customers, founder, securityFacts } from "@/config/trust";
import { Avatar } from "../shared/Avatar";
import { SectionHead } from "../shared/SectionHead";

/** Shown only on items the owner hasn't confirmed yet, so nothing unverified passes as fact. */
export function PlaceholderTag() {
  return (
    <span className="ml-2 inline-flex h-5 items-center rounded-full border border-dashed border-line-strong px-2 align-middle text-[0.6875rem] font-normal text-ink-3">
      placeholder
    </span>
  );
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function FounderNote() {
  return (
    <figure className="flex flex-col self-start rounded-[var(--radius-xl)] bg-bg-sunken p-7 sm:p-9">
      <blockquote className="text-lg leading-relaxed text-ink sm:text-xl">&ldquo;{founder.note}&rdquo;</blockquote>
      <figcaption className="mt-8 flex items-center gap-3.5">
        {founder.photo ? (
          <img src={founder.photo} alt={founder.name} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
        ) : (
          <Avatar initials={initials(founder.name)} size="lg" tone="amber" />
        )}
        <div>
          <p className="font-medium text-ink">
            {founder.name}
            {!founder.confirmed && <PlaceholderTag />}
          </p>
          <p className="text-sm text-ink-3">{founder.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function CustomerQuotes() {
  if (!customers.length) return null;
  return (
    <ul className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
      {customers.map((c) => (
        <li key={c.name}>
          <figure className="border-t border-line pt-6">
            {c.logo && <img src={c.logo} alt={c.company} className="mb-5 h-6 w-auto" />}
            <blockquote className="text-lg leading-relaxed text-ink">&ldquo;{c.quote}&rdquo;</blockquote>
            <figcaption className="mt-4 text-sm text-ink-3">
              {c.name}, {c.title} · {c.company}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

/** Security facts, a founder's note, and real customer quotes once there are some. */
export function Trust() {
  return (
    <section id="trust" aria-labelledby="trust-title" className="scroll-mt-[var(--header-h)] py-16 md:py-28">
      <div className="container-x">
        <SectionHead id="trust-title" title="Built to be trusted.">
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
                  <h3 className="text-base font-medium tracking-normal text-ink">
                    {f.title}
                    {!f.confirmed && <PlaceholderTag />}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{f.detail}</p>
                </div>
              </li>
            ))}
          </ul>
          <FounderNote />
        </div>
        <CustomerQuotes />
      </div>
    </section>
  );
}
