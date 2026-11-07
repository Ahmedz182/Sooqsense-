import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbLd, faqLd, softwareLd } from "@/lib/jsonld";
import { pricingFaq } from "@/config/pricing";
import { siteConfig } from "@/config/site";
import { PricingCalculator } from "@/components/pricing/PricingCalculator";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { FaqSearch } from "@/components/ui/FaqSearch";
import { TrialButton } from "@/components/ui/TrialButton";
import { ButtonLink } from "@/components/ui/Button";

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
      <section className="container-x pt-14 pb-16 md:pt-20 md:pb-20">
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <p className="eyebrow">Pricing</p>
            <h1 className="text-h1 mt-4 font-semibold">Pay for the seats that sell. Not for the ones that watch.</h1>
          </div>
          <p className="text-lead max-w-md text-ink-2 md:justify-self-end">
            Per seat, in USD. Viewers are free. Try any plan for 14 days without a card, then keep what works.
          </p>
        </div>
        <div className="mt-12">
          <PricingCalculator />
        </div>
      </section>

      <section aria-labelledby="compare-title" className="container-x pb-20 md:pb-28">
        <h2 id="compare-title" className="text-h2 font-semibold">
          Compare plans
        </h2>
        <div className="mt-8">
          <ComparisonTable />
        </div>
      </section>

      <section aria-labelledby="pfaq-title" className="border-t border-line bg-bg-sunken">
        <div className="container-x grid gap-10 py-20 md:grid-cols-[0.7fr_1.3fr] md:gap-16 md:py-28">
          <h2 id="pfaq-title" className="text-h2 font-semibold">
            Billing, plainly.
          </h2>
          <FaqSearch items={pricingFaq} placeholder="Search billing questions" />
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-h2 max-w-2xl font-semibold">See tomorrow&rsquo;s queue before you pay a cent.</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
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
