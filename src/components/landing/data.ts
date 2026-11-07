/**
 * V3 landing copy + mock data. Everything a section shows lives here so the
 * components stay about layout and motion. People come from config/demo.ts.
 */
import type { NodeKind } from "@/config/demo";

export type AgentId = "inbox" | "meetings" | "campaigns" | "security" | "content";

export const agents: Record<AgentId, { name: string; role: string }> = {
  inbox: { name: "Inbox agent", role: "Reads every thread, enriches, scores, drafts replies." },
  meetings: { name: "Meetings agent", role: "Joins the call, writes it up, updates the deal." },
  campaigns: { name: "Campaigns agent", role: "Runs sequences, newsletters and LinkedIn touches." },
  security: { name: "Security agent", role: "Screens every inbound before anyone sees it." },
  content: { name: "Content & SEO agent", role: "Writes pitch reports, briefs and posts." },
};

/** Which agent owns a workflow node kind. */
export const kindOwner: Record<NodeKind, AgentId | "you"> = {
  trigger: "inbox",
  enrich: "inbox",
  security: "security",
  ai: "inbox",
  branch: "inbox",
  meeting: "meetings",
  campaign: "campaigns",
  action: "you",
  notify: "inbox",
};

/** One believable line of output for every option in nodeCatalog. */
export const optionDetail: Record<string, string> = {
  "Website contact form": "from iamahmedfayyaz@gmail.com",
  "LinkedIn reply": "Ahmed Fayyaz replied to your DM",
  "New email from lead": "“Pricing for 40 seats?” · 09:14",
  "Meeting ended": "Carthage Labs renewal · 32 min",
  "Deal stage changed": "Proposal → Negotiation",
  "Renewal in 30 days": "Carthage Labs · $48,000 ARR",
  "Company & firmographics": "B2B SaaS · 11–50 staff · London",
  "LinkedIn profile": "Head of Sales · 6 yrs in role",
  "Tech stack": "HubSpot, Gmail, Slack, Zoom",
  "Funding & headcount": "Seed · hiring 3 AEs",
  "Spam & bot screen": "passed · risk 0.04",
  "Domain reputation": "gmail.com · personal domain flagged",
  "PII redaction": "2 phone numbers masked",
  "Score against ICP": "ICP score 86 / 100",
  "Summarise thread": "6 emails → 3 lines",
  "Draft reply in your voice": "112 words · waiting for you",
  "Write pitch report": "4 pages · tailored to sales teams",
  "Generate SEO brief": "“agentic CRM” · 2.4k/mo",
  "If score ≥ 80": "86 → yes",
  "If no reply in 3 days": "last reply 1 day ago → no",
  "If company > 200 staff": "11–50 staff → no",
  "Book a call": "Thu 15:30 GMT offered",
  "Record & transcribe": "consent sent to both sides",
  "Extract action items": "3 owners · 3 due dates",
  "Add to nurture sequence": "5 emails over 21 days",
  "Send newsletter": "Issue #14 · Friday 08:00",
  "Launch LinkedIn touch": "connect + 1 note, day 2",
  "Send email (after approval)": "in your queue for review",
  "Update HubSpot": "contact + deal written back",
  "Update Salesforce": "lead converted to opp",
  "Create task": "“Call Ahmed” · due tomorrow",
  "Send report to client": "after you approve",
  "Slack #sales": "posted with Approve button",
  "Email digest": "in tomorrow’s 08:00 digest",
  "Morning queue": "ranked #2 for tomorrow",
};

/** Before/After problem split. */
export const beforeTabs = [
  "HubSpot · Deals",
  "Inbox (214)",
  "Salesforce · Opps",
  "Slack | #sales",
  "LinkedIn · Messaging",
  "Mailchimp · Reports",
  "pipeline_FINAL_v7.xlsx",
  "Zoom · Recordings",
  "Calendar",
  "Notes – Carthage",
];

export const approvals = [
  {
    id: "mira",
    agent: "Inbox agent" as const,
    to: "Mira Haddad · Carthage Labs",
    subject: "SSO + DPA for the 40-seat rollout",
    body: "Hi Mira — as promised, the Scale vs Growth comparison is attached. SSO is included on Scale, and our DPA is on its way to legal@carthagelabs.io today.",
    why: "Promised on Tuesday’s call",
  },
  {
    id: "ahmed",
    agent: "Content & SEO agent" as const,
    to: "Ahmed Fayyaz · iamahmedfayyaz@gmail.com",
    subject: "Your pitch report: 3 workflows for a 6-person sales team",
    body: "Ahmed — based on the form you sent on Monday, here are the three workflows we’d switch on first, and what each one replaces.",
    why: "ICP score 86 · inbound",
  },
  {
    id: "lena",
    agent: "Campaigns agent" as const,
    to: "Lena Brandt · HelioScale",
    subject: "Two times for next week",
    body: "Hi Lena — sorry for the slow reply. Would Tuesday 10:00 or Wednesday 15:00 CET work for a 20-minute call?",
    why: "No reply for 9 days",
  },
  {
    id: "james",
    agent: "Campaigns agent" as const,
    to: "Newsletter · 1,284 RevOps leads",
    subject: "Issue #14: why meeting notes never reach the CRM",
    body: "This week: the 4 fields reps forget after every call, and a template to stop forgetting them.",
    why: "Scheduled Fri 08:00",
  },
];

export const trustFacts = [
  { k: "Read-only", v: "until you grant more. Connecting Gmail doesn’t let anything send." },
  { k: "Approval", v: "on every outbound by default. Auto-send is opt-in, per workflow." },
  { k: "GDPR-ready", v: "DPA on request, EU or US data residency on Scale." },
  { k: "Encrypted", v: "in transit and at rest." },
  { k: "Yours", v: "Your data never trains shared models." },
];

export const writeBacks = [
  { tool: "HubSpot", text: "Deal “Carthage Labs renewal” → Negotiation", time: "14:33" },
  { tool: "HubSpot", text: "Amount $38,400 → $48,000", time: "14:33" },
  { tool: "Salesforce", text: "Lead Ahmed Fayyaz converted · Opp-00418", time: "14:36" },
  { tool: "Slack", text: "#sales · approval requested for 2 drafts", time: "14:37" },
  { tool: "Gmail", text: "Draft saved to Ahmed’s outbox — not sent", time: "14:38" },
  { tool: "Calendar", text: "Security review booked with Mira, Thu 16:00", time: "14:41" },
];
