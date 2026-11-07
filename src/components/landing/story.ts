/**
 * The one deal this page follows. All demo values live here so copy, mock-ups
 * and the workflow stay consistent. Everyone except Ahmed Fayyaz is fictional.
 */
import { owner, people } from "@/config/demo";

const mira = people.find((p) => p.name === "Mira Haddad")!;

export const story = {
  owner,
  lead: mira,
  leadFirst: "Mira",
  formMessage:
    "We run about 40 demos a month and lose half the follow-ups somewhere between HubSpot and Gmail. Could we see SooqSense on our stack?",
  deal: {
    name: "Carthage Labs — Growth, 12 seats",
    amount: "$9,504",
    seats: 12,
    plan: "Growth · yearly",
  },
  company: { name: "Carthage Labs", staff: 140, stage: "Series B", city: "Boston, US", crm: "HubSpot", domain: "carthagelabs.io" },
  icpScore: 86,
} as const;

/** Ahmed's Tuesday before SooqSense — the problem timeline. */
export const oldTuesday = [
  { t: "08:47", what: "Opens Gmail. 214 unread, six of them from leads.", tabs: 3, tools: 1, missed: 0 },
  { t: "09:20", what: "Copies a demo request from Gmail into HubSpot by hand.", tabs: 7, tools: 2, missed: 0 },
  { t: "10:05", what: "Looks the company up on LinkedIn. Then on their website. Then on LinkedIn again.", tabs: 14, tools: 3, missed: 0 },
  { t: "11:40", what: "Two calls back to back. Notes go in a doc nobody will open.", tabs: 21, tools: 3, missed: 1 },
  { t: "14:15", what: "Slack: “did anyone reply to Northwind?” Nobody knows.", tabs: 28, tools: 4, missed: 2 },
  { t: "17:55", what: "Logs off. Follow-ups to James, Lena and Daniel never went out.", tabs: 37, tools: 4, missed: 3 },
] as const;
