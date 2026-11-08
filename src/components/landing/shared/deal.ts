import { owner, people } from "@/config/demo";

/** The one deal the home page follows: Mira Haddad at Carthage Labs → Ahmed Fayyaz. */
export const mira = people.find((p) => p.name === "Mira Haddad")!;

export const miraEmail = {
  from: mira,
  to: owner.email,
  time: "09:12",
  subject: "Pricing for 12 seats",
  preview: "Hi Ahmed, we're comparing tools for our sales team and…",
  body: [
    "Hi Ahmed,",
    "We're comparing tools for our sales team of 12. Could you share pricing, and whether you sync both ways with HubSpot?",
    "We'd like to decide before Q1 planning.",
    "Thanks, Mira",
  ],
};

export const enrichment = {
  actor: "Apify · LinkedIn company scraper",
  rows: [
    { k: "Company", v: "Carthage Labs" },
    { k: "Headcount", v: "140" },
    { k: "Funding", v: "Series B" },
    { k: "HQ", v: "Boston, US" },
    { k: "Contact", v: "VP RevOps · LinkedIn" },
  ],
};

export const screening = {
  checks: ["Not spam or a bot", "Domain reputation: good", "Real company, real person"],
  score: 86,
  reasons: ["B2B SaaS, 100–500 staff", "Uses HubSpot", "Buying in the next 90 days"],
};

export const draft = {
  subject: "Re: Pricing for 12 seats",
  lines: [
    "Hi Mira, thanks for reaching out.",
    "For 12 seats, Growth is $66 per seat a month billed yearly, and it syncs both ways with HubSpot.",
    "Happy to show it on your own pipeline. Does Thursday at 2pm ET work?",
    "Best, Ahmed",
  ],
};

export const deal = {
  name: "Carthage Labs · 12 seats",
  stage: "Proposal sent",
  from: "New lead",
  value: "$9,504 / yr",
  owner: owner.name,
  synced: "09:16",
};

/** Other threads in Ahmed's inbox (for the hero window). */
export const inbox = [
  { who: "James Whitfield", initials: "JW", subject: "Re: Q1 rollout plan", preview: "Works for us. Can we add two more seats for…", time: "08:47" },
  { who: "Lena Brandt", initials: "LB", subject: "Contract redlines", preview: "Legal is happy with clause 7. One note on…", time: "08:20" },
  { who: "Daniel Ortiz", initials: "DO", subject: "Intro: BrightPath × SooqSense", preview: "Looping in our sales director, who owns…", time: "Yesterday" },
  { who: "Sophie Laurent", initials: "SL", subject: "Newsletter feedback", preview: "Loved the November issue. Quick question on…", time: "Yesterday" },
  { who: "Priya Raman", initials: "PR", subject: "Renewal next month", preview: "Before we renew, could we talk about…", time: "Mon" },
];
