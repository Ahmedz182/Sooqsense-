/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { resolveHref, siteConfig } from "@/config/site";
import { integrations } from "@/config/demo";
import { Logo, LogoMark } from "@/components/ui/Logo";

/** The tools that feed SooqSense in the footer ribbon (real logos). */
const feed = integrations.filter((i) => i.logo).slice(0, 12);

/**
 * Footer — always dark (its own data-theme), so every page ends on the same note:
 * a ribbon of the real tools flowing into SooqSense, the link columns, and an
 * oversized wordmark that sits on the bottom edge.
 */
export function Footer() {
  return (
    <footer data-theme="dark" className="relative overflow-hidden border-t border-line bg-bg-sunken text-ink">
      {/* Ribbon: every tool → one agent */}
      <div className="container-x pt-14 md:pt-20">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-sm text-lg font-medium leading-snug text-ink">
            Every tool you sell with, <span className="text-accent-display">one</span> place to act.
          </p>
          <div aria-hidden="true" className="relative flex w-full items-center md:w-auto">
            <ul className="flex flex-wrap items-center gap-2 md:flex-nowrap">
              {feed.map((i) => (
                <li key={i.id} className="grid h-9 w-9 place-items-center rounded-[10px] bg-[#fbf8f2] shadow-sm ring-1 ring-black/5">
                  <img src={i.logo!} alt="" width={18} height={18} loading="lazy" className="h-[18px] w-[18px] object-contain" />
                </li>
              ))}
            </ul>
            <span className="footer-flow mx-3 hidden h-px w-16 md:block lg:w-24" />
            <LogoMark className="hidden h-10 w-10 shrink-0 md:block" />
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="container-x mt-12 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-12 md:mt-16 md:grid-cols-[1.6fr_repeat(3,1fr)]">
        <div className="col-span-2 max-w-xs md:col-span-1">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-ink-2">
            The agentic CRM for sales and marketing teams. Follow-ups, meeting notes and CRM updates, ready for you to approve.
          </p>
          <a href={`mailto:${siteConfig.contactEmail}`} className="mt-5 inline-flex min-h-11 items-center text-sm text-amber-ink hover:underline">
            {siteConfig.contactEmail}
          </a>
        </div>
        {siteConfig.footer.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-ink-3">{col.title}</h2>
            <ul className="mt-3">
              {col.links.map((l) => {
                const href = resolveHref(l.href);
                const cls = "inline-flex min-h-11 items-center text-sm text-ink-2 transition-colors hover:text-ink md:min-h-9";
                return (
                  <li key={l.label}>
                    {href.startsWith("http") ? (
                      <a href={href} className={cls}>
                        {l.label}
                      </a>
                    ) : (
                      <Link href={href} className={cls}>
                        {l.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        ))}
      </div>

      <div className="container-x mt-12 flex flex-col gap-1 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} SooqSense. All rights reserved.</p>
        <p>Made for sales teams in the US, UK and Europe.</p>
      </div>

      {/* Oversized wordmark resting on the bottom edge */}
      <p
        aria-hidden="true"
        className="footer-wordmark pointer-events-none mt-6 select-none whitespace-nowrap text-center font-semibold leading-[0.78] tracking-[-0.06em]"
      >
        sooqsense
      </p>
    </footer>
  );
}
