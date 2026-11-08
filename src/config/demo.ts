/**
 * Demo data used across product mock-ups, workflow canvases and examples.
 * REQUIRED: Ahmed Fayyaz and iamahmedfayyaz@gmail.com must appear in workflows.
 * Everyone else is fictional and aimed at US / UK / EU B2B buyers.
 */

export const owner = {
  name: "Ahmed Fayyaz",
  firstName: "Ahmed",
  initials: "AF",
  email: "iamahmedfayyaz@gmail.com",
  title: "Head of Sales",
  company: "SooqSense",
} as const;

export type DemoPerson = {
  name: string;
  initials: string;
  email: string;
  title: string;
  company: string;
  city: string;
};

export const people: DemoPerson[] = [
  { name: "Mira Haddad", initials: "MH", email: "mira@carthagelabs.io", title: "VP RevOps", company: "Carthage Labs", city: "Boston, US" },
  { name: "James Whitfield", initials: "JW", email: "james.w@northwind.co.uk", title: "Head of Growth", company: "Northwind", city: "London, UK" },
  { name: "Lena Brandt", initials: "LB", email: "lena@helioscale.de", title: "COO", company: "HelioScale", city: "Berlin, DE" },
  { name: "Daniel Ortiz", initials: "DO", email: "dortiz@brightpath.com", title: "Sales Director", company: "BrightPath", city: "Austin, US" },
  { name: "Sophie Laurent", initials: "SL", email: "sophie@maisonverte.fr", title: "Marketing Lead", company: "Maison Verte", city: "Paris, FR" },
  { name: "Priya Raman", initials: "PR", email: "priya@ledgerly.io", title: "Founder & CEO", company: "Ledgerly", city: "New York, US" },
];

/** Integration catalogue shown in mock-ups and the integrations section. */
export const integrations = [
  { id: "gmail", name: "Gmail", category: "Email", logo: "/logos/gmail.svg" },
  { id: "outlook", name: "Outlook", category: "Email", logo: "/logos/microsoft-outlook.svg" },
  { id: "gcal", name: "Google Calendar", category: "Calendar", logo: "/logos/google-calendar.svg" },
  { id: "zoom", name: "Zoom", category: "Meetings", logo: "/logos/zoom.svg" },
  { id: "meet", name: "Google Meet", category: "Meetings", logo: "/logos/google-meet.svg" },
  { id: "teams", name: "Microsoft Teams", category: "Meetings", logo: "/logos/microsoft-teams.svg" },
  { id: "hubspot", name: "HubSpot", category: "CRM", logo: "/logos/hubspot.svg" },
  { id: "salesforce", name: "Salesforce", category: "CRM", logo: "/logos/salesforce.svg" },
  { id: "slack", name: "Slack", category: "Team", logo: "/logos/slack.svg" },
  { id: "linkedin", name: "LinkedIn", category: "Prospecting", logo: "/logos/linkedin.svg" },
  { id: "mailchimp", name: "Mailchimp", category: "Campaigns", logo: "/logos/mailchimp.svg" },
  { id: "instantly", name: "Instantly", category: "Cold email", logo: "/logos/instantly.svg" },
  { id: "apify", name: "Apify", category: "Lead data & scraping", logo: "/logos/apify.svg" },
  { id: "sheets", name: "Google Sheets", category: "Data", logo: "/logos/google-sheets.svg" },
  { id: "notion", name: "Notion", category: "Docs", logo: "/logos/notion.svg" },
  { id: "webhooks", name: "Webhooks & API", category: "Developer", logo: null },
] as const;

/** Workflow node catalogue — shared vocabulary for builders and playgrounds. */
export type NodeKind = "trigger" | "source" | "enrich" | "security" | "ai" | "branch" | "action" | "meeting" | "campaign" | "notify";

export const nodeCatalog: { kind: NodeKind; label: string; options: string[] }[] = [
  { kind: "trigger", label: "Trigger", options: ["Website contact form", "LinkedIn reply", "New email from lead", "Meeting ended", "Deal stage changed", "Renewal in 30 days"] },
  { kind: "source", label: "Lead source (Apify actor)", options: ["Apify · Google Maps leads", "Apify · LinkedIn company scraper", "Apify · LinkedIn profile scraper", "Apify · Website contact crawler", "Apify · G2 reviews scraper"] },
  { kind: "enrich", label: "Enrich", options: ["Company & firmographics", "LinkedIn profile", "Tech stack", "Funding & headcount"] },
  { kind: "security", label: "Security check", options: ["Spam & bot screen", "Domain reputation", "PII redaction"] },
  { kind: "ai", label: "AI step", options: ["Score against ICP", "Summarise thread", "Draft reply in your voice", "Write pitch report", "Generate SEO brief"] },
  { kind: "branch", label: "Branch", options: ["If score ≥ 80", "If no reply in 3 days", "If company > 200 staff"] },
  { kind: "meeting", label: "Meeting", options: ["Book a call", "Record & transcribe", "Extract action items"] },
  { kind: "campaign", label: "Campaign", options: ["Add to nurture sequence", "Instantly · cold email campaign", "Instantly · inbox warm-up", "Mailchimp · newsletter", "Launch LinkedIn touch"] },
  { kind: "action", label: "Action", options: ["Send email (after approval)", "Update HubSpot", "Update Salesforce", "Create task", "Send report to client"] },
  { kind: "notify", label: "Notify", options: ["Slack #sales", "Email digest", "Morning queue"] },
];
