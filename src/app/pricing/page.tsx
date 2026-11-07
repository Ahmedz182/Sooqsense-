import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbLd, faqLd, softwareLd } from "@/lib/jsonld";
import { plans, pricingFaq } from "@/config/pricing";

export const metadata: Metadata = buildMetadata({
  title: "Pricing — Agentic CRM plans for sales & marketing teams",
  description:
    "Simple per-seat pricing for SooqSense, the agentic CRM and AI sales workflow platform. Start with a 14-day free trial — no credit card. Plans for founders, growing sales teams and RevOps-led companies.",
  path: "/pricing",
  keywords: ["CRM pricing", "AI CRM pricing", "sales automation pricing", "HubSpot alternative pricing"],
});

/** Foundation placeholder — each landing version builds the interactive pricing page. */
export default function PricingPage() {
  return (
    <SiteShell>
      <section className="container-x py-24">
        <h1 className="text-h1 font-semibold">Pricing</h1>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {plans.map((p) => (
            <li key={p.id} className="rounded-[var(--radius-lg)] border border-line bg-bg-elev p-6">
              <h2 className="text-h3">{p.name}</h2>
              <p className="mt-2 text-ink-2">{p.blurb}</p>
            </li>
          ))}
        </ul>
      </section>
      <JsonLd data={[softwareLd(), faqLd(pricingFaq), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])]} />
    </SiteShell>
  );
}
