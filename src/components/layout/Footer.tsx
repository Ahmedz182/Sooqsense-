import Link from "next/link";
import { resolveHref, siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-sunken">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-ink-2">
            The agentic CRM that turns your inbox, calendar and calls into workflows that run themselves — with you approving every send.
          </p>
          <p className="mt-6 font-mono text-xs text-ink-3">Built for sales &amp; marketing teams in the US, UK and Europe.</p>
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
      <div className="container-x flex flex-col gap-2 border-t border-line py-6 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} SooqSense. All rights reserved.</p>
        <p className="font-mono text-xs">GDPR-ready · Nothing sends without your approval</p>
      </div>
    </footer>
  );
}
