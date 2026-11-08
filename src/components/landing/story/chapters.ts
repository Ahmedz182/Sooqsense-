export type Chapter = { id: string; title: string; text: string };

/** Five beats of one deal. Titles stay 2–5 words; one sentence each. */
export const chapters: Chapter[] = [
  {
    id: "writes-in",
    title: "A lead writes in.",
    text: "Mira Haddad, VP RevOps at Carthage Labs, asks about pricing for 12 seats.",
  },
  {
    id: "enriched",
    title: "Enriched before you look.",
    text: "An Apify actor pulls her company and LinkedIn data: 140 staff, Series B, Boston.",
  },
  {
    id: "scored",
    title: "Screened and scored.",
    text: "The message passes the security check and scores 86 against your ideal customer.",
  },
  {
    id: "reply",
    title: "The reply writes itself.",
    text: "A draft appears in Ahmed’s voice, with the right plan, price and a time to meet.",
  },
  {
    id: "approved",
    title: "You approve. It’s sent.",
    text: "Ahmed reads it, approves, and the HubSpot deal updates on its own.",
  },
];
