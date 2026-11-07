/**
 * Site-wide configuration. Every page, header, footer, CTA and SEO tag reads from
 * here — change a URL or a nav item once and the whole site follows.
 */

const trimSlash = (u: string) => u.replace(/\/+$/, "");

export const siteConfig = {
  name: "SooqSense",
  shortName: "SooqSense",
  tagline: "The agentic CRM that runs your sales workflows",
  description:
    "SooqSense is the agentic CRM and AI workflow platform for B2B sales and marketing teams. It reads your inbox, calendar and calls, enriches every lead, runs follow-ups and email campaigns, and keeps HubSpot and Salesforce up to date — one workspace instead of seven tools.",
  url: trimSlash(process.env.NEXT_PUBLIC_SITE_URL || "https://sooqsense.com"),
  /** Every "Start free trial" / "Sign in" button. Staging for now — swap via env. */
  appUrl: trimSlash(process.env.NEXT_PUBLIC_APP_URL || "https://staging.sooqsense.com"),
  /** Optional external booking link; falls back to the on-site contact page. */
  demoUrl: process.env.NEXT_PUBLIC_DEMO_URL || "/contact?intent=demo",
  locale: "en_US",
  twitter: "@sooqsense",
  contactEmail: "hello@sooqsense.com",
  trial: {
    label: "Start free trial",
    note: "14 days free · No credit card",
  },
  keywords: [
    "agentic CRM",
    "AI CRM",
    "AI sales workflow automation",
    "sales workflow builder",
    "sales follow-up automation",
    "AI sales assistant",
    "HubSpot alternative",
    "Salesforce alternative",
    "AI meeting notes for sales",
    "meeting summaries and action items",
    "email campaign automation",
    "lead enrichment",
    "LinkedIn prospecting automation",
    "RevOps automation",
    "B2B sales automation",
    "pipeline management software",
  ],
  nav: [
    { label: "Product", href: "/#product" },
    { label: "Workflows", href: "/#workflows" },
    { label: "Integrations", href: "/#integrations" },
    { label: "Pricing", href: "/pricing" },
  ],
  footer: [
    {
      title: "Product",
      links: [
        { label: "Workflows", href: "/#workflows" },
        { label: "Meeting intelligence", href: "/#meetings" },
        { label: "Campaigns", href: "/#campaigns" },
        { label: "Integrations", href: "/#integrations" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Contact sales", href: "/contact?intent=demo" },
        { label: "Join the waitlist", href: "/contact?intent=waitlist" },
        { label: "Sign in", href: "APP" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ],
} as const;

/** Resolve the special "APP" href used in config to the app URL. */
export function resolveHref(href: string) {
  return href === "APP" ? siteConfig.appUrl : href;
}

export type SiteConfig = typeof siteConfig;
