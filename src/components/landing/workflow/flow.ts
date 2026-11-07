import { nodeCatalog, type NodeKind } from "@/config/demo";

/** The inbound-lead workflow that grows down the centrepiece. */
export type StepKey = "trigger" | "enrich" | "security" | "ai" | "branch" | "yes" | "no";

export const stepKinds: Record<StepKey, NodeKind> = {
  trigger: "trigger",
  enrich: "enrich",
  security: "security",
  ai: "ai",
  branch: "branch",
  yes: "action",
  no: "campaign",
};

export const defaults: Record<StepKey, string> = {
  trigger: "Website contact form",
  enrich: "Company & firmographics",
  security: "Spam & bot screen",
  ai: "Score against ICP",
  branch: "If score ≥ 80",
  yes: "Send report to client",
  no: "Add to nurture sequence",
};

export const optionsFor = (key: StepKey) => nodeCatalog.find((n) => n.kind === stepKinds[key])?.options ?? [];
export const kindLabel = (key: StepKey) => nodeCatalog.find((n) => n.kind === stepKinds[key])?.label ?? key;

/** What each option produces for Mira's lead — the specific line under the node. */
const details: Record<string, string> = {
  // trigger
  "Website contact form": "Mira Haddad, Carthage Labs → iamahmedfayyaz@gmail.com",
  "LinkedIn reply": "Mira replied to Ahmed’s post on RevOps hiring",
  "New email from lead": "mira@carthagelabs.io · “Quick question on HubSpot sync”",
  "Meeting ended": "Discovery call with Mira Haddad · 32 min",
  "Deal stage changed": "Carthage Labs moved to Proposal",
  "Renewal in 30 days": "Carthage Labs renews on 14 Dec",
  // enrich
  "Company & firmographics": "Carthage Labs · 140 staff · Series B · Boston",
  "LinkedIn profile": "VP RevOps · 4 years in role · posts weekly",
  "Tech stack": "HubSpot · Gmail · Zoom · Slack",
  "Funding & headcount": "$24M Series B · hiring 6 AEs",
  // security
  "Spam & bot screen": "Passed · human, real domain, no risk flags",
  "Domain reputation": "carthagelabs.io · registered 2019 · SPF + DKIM OK",
  "PII redaction": "Phone number masked before any AI step",
  // ai
  "Score against ICP": "86 / 100 · RevOps buyer, right size, on HubSpot",
  "Summarise thread": "Wants demo follow-ups fixed before Q1 hiring",
  "Draft reply in your voice": "“Hi Mira, 40 demos a month is exactly where…”",
  "Write pitch report": "2-page brief: pains, stack, 12-seat pricing",
  "Generate SEO brief": "“post-demo follow-up” · outline + 6 questions",
  // branch
  "If score ≥ 80": "86 ≥ 80",
  "If no reply in 3 days": "Mira hasn’t replied yet",
  "If company > 200 staff": "Carthage Labs has 140",
  // action (yes)
  "Send email (after approval)": "Reply drafted · waits for Ahmed’s OK",
  "Update HubSpot": "Deal created · Discovery · $9,504",
  "Update Salesforce": "Opportunity created · Stage 1 · $9,504",
  "Create task": "Ahmed: call Mira before 16:00",
  "Send report to client": "Pitch report → Mira, once Ahmed approves",
  // campaign (no)
  "Add to nurture sequence": "4 emails over 21 days · RevOps track",
  "Send newsletter": "Monthly RevOps digest · next send Thu",
  "Launch LinkedIn touch": "Ahmed comments, then connects",
};

export const detailFor = (option: string) => details[option] ?? "Configured";

/** Which path Mira's lead takes for each branch condition. */
export const branchTakesYes: Record<string, boolean> = {
  "If score ≥ 80": true,
  "If no reply in 3 days": true,
  "If company > 200 staff": false,
};

export const captions: { key: StepKey; title: string; body: string }[] = [
  { key: "trigger", title: "The form lands", body: "Mira fills in the contact form at 13:04. SooqSense picks it up before Ahmed has opened his inbox." },
  { key: "enrich", title: "Enrich", body: "It looks Carthage Labs up: 140 people, Series B, already on HubSpot. No tabs." },
  { key: "security", title: "Check", body: "A real person on a real domain, not a bot or a competitor fishing for pricing." },
  { key: "ai", title: "Score", body: "Scored against your ideal customer profile. 86 out of 100." },
  { key: "branch", title: "Decide", body: "Hot leads get a pitch report and a drafted reply. Warm ones go into nurture. Click any step to change it." },
];
