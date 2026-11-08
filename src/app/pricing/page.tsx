import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PricingCalculator } from "@/components/pricing/PricingCalculator";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { FaqSearch } from "@/components/ui/FaqSearch";
import { TrialButton } from "@/components/ui/TrialButton";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbLd, faqLd, softwareLd } from "@/lib/jsonld";
import { pricingFaq } from "@/config/pricing";
import { siteConfig } from "@/config/site";

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
      <section aria-labelledby="pricing-title" className="container-x pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-2xl">
          <h1 id="pricing-title" className="text-h1 font-semibold text-ink">
            Pricing that grows with you.
          </h1>
          <p className="text-lead mt-4 text-ink-2">Pay per seat that sends email or owns pipeline. Try any plan free for 14 days.</p>
        </div>
        <div className="mt-10 md:mt-12">
          <PricingCalculator />
        </div>
      </section>

      <section aria-labelledby="compare-title" className="border-t border-line py-16 md:py-24">
        <div className="container-x">
          <h2 id="compare-title" className="text-h2 font-semibold text-ink">
            Compare plans.
          </h2>
          <div className="mt-8">
            <ComparisonTable />
          </div>
        </div>
      </section>

      <section aria-labelledby="pfaq-title" className="border-t border-line py-16 md:py-24">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <h2 id="pfaq-title" className="text-h2 self-start font-semibold text-ink">
            Pricing questions.
          </h2>
          <FaqSearch items={pricingFaq} />
        </div>
      </section>

      <section aria-labelledby="pcta-title" className="bg-bg-sunken py-16 md:py-24">
        <div className="container-x flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="pcta-title" className="text-h2 font-semibold text-ink">
              Try it free for 14 days.
            </h2>
            <p className="mt-3 text-ink-2">{siteConfig.trial.note}. Cancel any time.</p>
          </div>
          <TrialButton />
        </div>
      </section>
      <JsonLd data={[softwareLd(), faqLd(pricingFaq), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])]} />
    </SiteShell>
  );
}
