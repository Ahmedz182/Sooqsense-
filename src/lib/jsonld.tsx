import { siteConfig } from "@/config/site";
import { plans } from "@/config/pricing";

type Json = Record<string, unknown>;

/** Renders a JSON-LD <script>. `<` is escaped so content can never break out of the tag. */
export function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const organizationLd = (): Json => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon.svg`,
  email: siteConfig.contactEmail,
  description: siteConfig.description,
});

export const websiteLd = (): Json => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
});

export const softwareLd = (): Json => {
  const priced = plans.filter((p) => p.monthly !== null);
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "CRM",
    operatingSystem: "Web",
    url: siteConfig.url,
    description: siteConfig.description,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: Math.min(...priced.map((p) => p.yearly ?? p.monthly ?? 0)),
      highPrice: Math.max(...priced.map((p) => p.monthly ?? 0)),
      offerCount: plans.length,
    },
    featureList: [
      "AI workflow builder for sales and marketing",
      "Inbox, calendar and meeting sync",
      "Meeting recording, transcripts, summaries and action items",
      "Lead enrichment and LinkedIn signals",
      "Email campaigns and follow-up sequences",
      "HubSpot and Salesforce two-way sync",
    ],
  };
};

export const faqLd = (items: readonly { q: string; a: string }[]): Json => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a },
  })),
});

export const breadcrumbLd = (items: { name: string; path: string }[]): Json => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${siteConfig.url}${it.path}`,
  })),
});
