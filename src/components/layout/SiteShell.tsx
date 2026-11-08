import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SectionReveal } from "@/components/motion/SectionReveal";

/**
 * Every page renders inside SiteShell, so header, footer, spacing and theme are
 * shared. A landing version restyles all pages by editing these + tokens.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-amber focus:px-4 focus:py-2 focus:text-on-amber"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="pt-[var(--header-h)]">
        {children}
      </main>
      <Footer />
      <SectionReveal />
    </>
  );
}
