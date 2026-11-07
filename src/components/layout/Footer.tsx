import Link from "next/link";
import { resolveHref, siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { LocalClocks } from "@/components/ui/LocalClocks";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-sunken">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="col-span-2 max-w-sm md:col-span-1">
          <Logo />
          <p className="mt-4 text-ink-2">
            The agentic CRM that turns your inbox, calendar and calls into workflows that run themselves — with you approving every send.
          </p>
          <p className="mt-6 font-mono text-xs text-ink-3">Built for sales &amp; marketing teams in the US, UK and Europe.</p>
          <LocalClocks className="mt-2 font-mono text-xs text-ink-3" />
        </div>
        {siteConfig.footer.map((col) => (
          <div key={col.title}>
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3">{col.title}</h2>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => {
                const href = resolveHref(l.href);
                const external = href.startsWith("http");
                return (
                  <li key={l.label}>
                    {external ? (
                      <a href={href} className="text-ink-2 transition-colors hover:text-ink">
                        {l.label}
                      </a>
                    ) : (
                      <Link href={href} className="text-ink-2 transition-colors hover:text-ink">
                        {l.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-x overflow-hidden" aria-hidden="true">
        <p className="select-none font-display sm:whitespace-nowrap text-[clamp(2.5rem,6.4vw,6rem)] font-semibold leading-[0.8] tracking-[-0.045em] text-[color-mix(in_oklab,var(--ink)_9%,var(--bg-sunken))]">
          five agents<span className="text-amber">.</span> one you<span className="text-blue">.</span>
        </p>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-line py-6 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} SooqSense. All rights reserved.</p>
        <p className="font-mono text-xs">GDPR-ready · Nothing sends without your approval</p>
      </div>
    </footer>
  );
}
