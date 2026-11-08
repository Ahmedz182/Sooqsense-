import type { IntegrationId } from "../shared/BrandLogo";

export type SceneStep = {
  logo: IntegrationId | "sooqsense";
  text: string;
  time: string;
  /** Who owns / approved the step (shows their avatar). */
  who?: string;
  status?: "done" | "waiting" | "approved";
};

export type Scene = {
  id: string;
  title: string;
  person: string;
  personNote: string;
  steps: SceneStep[];
  before: string;
  after: string;
};

/** Illustrative workflow outcomes, shown inside product UI — not marketing claims. */
export const scenes: Scene[] = [
  {
    id: "outbound",
    title: "Outbound, while you slept",
    person: "Ahmed Fayyaz",
    personNote: "One approval at 08:05",
    steps: [
      { logo: "apify", text: "214 RevOps leads found", time: "02:10" },
      { logo: "linkedin", text: "Enriched: funding, headcount, role", time: "02:14" },
      { logo: "sooqsense", text: "61 scored above 80", time: "02:15" },
      { logo: "instantly", text: "Sequence approved and started", time: "08:05", who: "Ahmed Fayyaz", status: "approved" },
      { logo: "gmail", text: "12 replies, sorted by intent", time: "Day 3" },
      { logo: "gcal", text: "3 meetings booked", time: "Day 4" },
    ],
    before: "6 hours of list building",
    after: "1 approval",
  },
  {
    id: "call",
    title: "After the call",
    person: "Ahmed Fayyaz",
    personNote: "Reviewed in 2 minutes",
    steps: [
      { logo: "zoom", text: "Call with Mira ended", time: "16:02" },
      { logo: "sooqsense", text: "Summary and 3 action items", time: "16:03" },
      { logo: "hubspot", text: "Deal and notes updated", time: "16:03" },
      { logo: "gmail", text: "Follow-up drafted in your voice", time: "16:05" },
      { logo: "slack", text: "Team told in #sales", time: "16:05" },
      { logo: "gmail", text: "Approved and sent", time: "16:07", who: "Ahmed Fayyaz", status: "approved" },
    ],
    before: "40 minutes of notes and CRM",
    after: "2 minutes to review",
  },
  {
    id: "inbound",
    title: "A website lead",
    person: "Mira Haddad",
    personNote: "Filled in the contact form",
    steps: [
      { logo: "sooqsense", text: "Form from Mira Haddad", time: "09:12", who: "Mira Haddad" },
      { logo: "sooqsense", text: "Screened: real person, safe domain", time: "09:12" },
      { logo: "apify", text: "Company enriched: 140 staff", time: "09:13" },
      { logo: "sooqsense", text: "Scored 86 against your ICP", time: "09:13" },
      { logo: "gmail", text: "Pitch report waiting for Ahmed", time: "09:14", who: "Ahmed Fayyaz", status: "waiting" },
      { logo: "gmail", text: "Sent after approval", time: "09:16", status: "done" },
    ],
    before: "Reply the next day",
    after: "Reply in 4 minutes",
  },
];
