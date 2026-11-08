import Link from "next/link";
import { resolveHref, siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-[1.6fr_repeat(3,1fr)] md:py-16">
        <div className="col-span-2 max-w-xs md:col-span-1">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-ink-2">
            Follow-ups, meeting notes and CRM updates, ready for you to approve.
          </p>
        </div>
        {siteConfig.footer.map((col) => (
          <div key={col.title}>
            <h2 className="text-sm font-medium text-ink">{col.title}</h2>
            <ul className="mt-3">
              {col.links.map((l) => {
                const href = resolveHref(l.href);
                const cls = "inline-flex min-h-11 md:min-h-9 items-center text-sm text-ink-2 transition-colors hover:text-ink";
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
          </div>
        ))}
      </div>
      <div className="container-x flex flex-col gap-1 border-t border-line py-6 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} SooqSense</p>
        <p>Made for sales teams in the US, UK and Europe.</p>
      </div>
    </footer>
  );
}
