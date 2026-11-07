/**
 * PRICING — PLACEHOLDER VALUES.
 * These plans and prices are illustrative until the real pricing is decided.
 * Edit them here; the home-page teaser, /pricing page and JSON-LD all read this file.
 */

export type BillingCycle = "monthly" | "yearly";

export type Plan = {
  id: "starter" | "growth" | "scale";
  name: string;
  blurb: string;
  /** USD per seat per month, billed monthly. null = custom/contact sales. */
  monthly: number | null;
  /** USD per seat per month when billed yearly. */
  yearly: number | null;
  minSeats: number;
  highlight?: boolean;
  cta: { label: string; href: "TRIAL" | "DEMO" };
  features: string[];
};

export const YEARLY_DISCOUNT_LABEL = "2 months free";

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    blurb: "For founders and solo sellers who live in their inbox.",
    monthly: 29,
    yearly: 24,
    minSeats: 1,
    cta: { label: "Start free trial", href: "TRIAL" },
    features: [
      "Gmail / Outlook + Calendar sync",
      "Daily ranked action queue",
      "AI follow-up drafts in your voice",
      "Meeting notes & summaries (10 hrs/mo)",
      "5 active workflows",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    blurb: "For sales and marketing teams running real pipeline.",
    monthly: 79,
    yearly: 66,
    minSeats: 3,
    highlight: true,
    cta: { label: "Start free trial", href: "TRIAL" },
    features: [
      "Everything in Starter",
      "Unlimited workflows & visual builder",
      "Lead enrichment + LinkedIn signals",
      "Email campaigns & sequences",
      "HubSpot & Salesforce two-way sync",
      "Slack alerts and approvals",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    blurb: "For RevOps-led orgs that need control, security and scale.",
    monthly: null,
    yearly: null,
    minSeats: 20,
    cta: { label: "Talk to sales", href: "DEMO" },
    features: [
      "Everything in Growth",
      "SSO / SAML & SCIM",
      "EU or US data residency",
      "Custom workflow nodes & API",
      "Audit log & approval policies",
      "Dedicated success manager",
    ],
  },
];

/** Feature comparison rows for the /pricing page. true/false or a short string. */
export const comparison: { group: string; rows: { label: string; values: [string | boolean, string | boolean, string | boolean] }[] }[] = [
  {
    group: "Workspace",
    rows: [
      { label: "Inbox, calendar & meeting sync", values: [true, true, true] },
      { label: "Daily action queue", values: [true, true, true] },
      { label: "Relationship timeline & health score", values: [true, true, true] },
    ],
  },
  {
    group: "Workflows & AI",
    rows: [
      { label: "Active workflows", values: ["5", "Unlimited", "Unlimited"] },
      { label: "Visual workflow builder", values: [true, true, true] },
      { label: "Meeting recording hours / month", values: ["10", "50 per seat", "Unlimited"] },
      { label: "Lead enrichment & LinkedIn signals", values: [false, true, true] },
      { label: "Email campaigns & sequences", values: [false, true, true] },
      { label: "Custom nodes & API", values: [false, false, true] },
    ],
  },
  {
    group: "Integrations",
    rows: [
      { label: "Gmail, Outlook, Google Calendar", values: [true, true, true] },
      { label: "HubSpot & Salesforce two-way sync", values: [false, true, true] },
      { label: "Slack approvals", values: [false, true, true] },
      { label: "Webhooks & REST API", values: [false, true, true] },
    ],
  },
  {
    group: "Security & control",
    rows: [
      { label: "Nothing sends without approval", values: [true, true, true] },
      { label: "GDPR-ready data processing", values: [true, true, true] },
      { label: "SSO / SAML & SCIM", values: [false, false, true] },
      { label: "EU or US data residency", values: [false, false, true] },
      { label: "Audit log", values: [false, "30 days", "Unlimited"] },
    ],
  },
];

export const pricingFaq = [
  {
    q: "Is there really no credit card for the trial?",
    a: "Yes. The 14-day trial is free with no card. Connect Gmail or Outlook and you'll see your first action queue the next morning.",
  },
  {
    q: "Can I mix plans across my team?",
    a: "Each workspace runs on one plan, but you only pay for seats that send email or own pipeline. Viewers are free.",
  },
  {
    q: "Do you offer annual billing?",
    a: `Yes — annual billing gives you ${YEARLY_DISCOUNT_LABEL} compared with paying monthly.`,
  },
  {
    q: "What happens when the trial ends?",
    a: "Nothing is deleted. Pick a plan to keep your workflows running, or export everything as CSV.",
  },
];
