import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbLd, faqLd, softwareLd } from "@/lib/jsonld";
import { pricingFaq } from "@/config/pricing";
import { siteConfig } from "@/config/site";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { TrialButton } from "@/components/ui/TrialButton";
import { PricingCalculator } from "@/components/landing/pricing/PricingCalculator";
import { ComparisonTable } from "@/components/landing/pricing/ComparisonTable";

export const metadata: Metadata = buildMetadata({
  title: "Pricing — Agentic CRM plans for sales & marketing teams",
  description:
    "Simple per-seat pricing for SooqSense, the agentic CRM and AI sales workflow platform. Start with a 14-day free trial — no credit card. Plans for founders, growing sales teams and RevOps-led companies.",
  path: "/pricing",
  keywords: ["CRM pricing", "AI CRM pricing", "sales automation pricing", "HubSpot alternative pricing"],
});

export default function PricingPage() {
  return (
    <SiteShell>
      <section className="container-x pb-16 pt-14 md:pt-20">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">Pricing</p>
            <h1 className="text-h1 mt-4 font-semibold">
              Pay for the people who sell. <span className="text-amber-ink">The agents come with them.</span>
            </h1>
          </div>
          <p className="text-lead max-w-md text-ink-2">Viewers are free. Every plan starts with a 14-day trial — no card, and nothing sends without your approval.</p>
        </div>
        <div className="mt-12">
          <PricingCalculator />
        </div>
        <p className="mt-4 font-mono text-xs text-ink-3">Prices in USD, excluding VAT and sales tax.</p>
      </section>

      <section aria-labelledby="compare-title" className="container-x py-16">
        <h2 id="compare-title" className="text-h2 font-semibold">
          Side by side
        </h2>
        <div className="mt-8">
          <ComparisonTable />
        </div>
      </section>

      <section aria-labelledby="pfaq-title" className="container-x grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <h2 id="pfaq-title" className="text-h2 font-semibold">
          Billing, <span className="text-blue-ink">plainly.</span>
        </h2>
        <Accordion items={pricingFaq} />
      </section>

      <section className="container-x pb-24 pt-8">
        <div className="flex flex-col gap-6 rounded-[var(--radius-xl)] border border-line bg-bg-sunken p-6 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="font-display text-3xl font-semibold">Try it on your own inbox first.</p>
            <p className="mt-2 text-ink-2">{siteConfig.trial.note}. Your first morning queue arrives the next day.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <TrialButton />
            <ButtonLink href={siteConfig.demoUrl} variant="secondary" size="lg">
              Book a demo
            </ButtonLink>
          </div>
        </div>
      </section>
      <JsonLd data={[softwareLd(), faqLd(pricingFaq), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])]} />
    </SiteShell>
  );
}
