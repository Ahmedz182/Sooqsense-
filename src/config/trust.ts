/**
 * TRUST — owner-supplied facts.
 *
 * Nothing here is invented proof. Every item stays `confirmed: false` (and shows a
 * small "placeholder" tag on the site) until the owner confirms it is true today.
 * Customer quotes render only when the `customers` array has entries.
 * Do not add certifications that have not been audited (no SOC 2).
 */

export type SecurityFact = {
  id: string;
  title: string;
  detail: string;
  confirmed: boolean;
};

export const securityFacts: SecurityFact[] = [
  {
    id: "read-only",
    title: "Read-only by default",
    detail: "SooqSense reads your inbox and calendar. It asks before it writes anything.",
    confirmed: false,
  },
  {
    id: "approval",
    title: "Nothing sends without approval",
    detail: "Every email, CRM update and campaign waits for a person to approve it.",
    confirmed: false,
  },
  {
    id: "encryption",
    title: "Encrypted in transit and at rest",
    detail: "TLS on every connection. Stored data is encrypted on disk.",
    confirmed: false,
  },
  {
    id: "gdpr",
    title: "GDPR-ready",
    detail: "A data processing agreement, full export and deletion on request.",
    confirmed: false,
  },
  {
    id: "no-training",
    title: "Never trains shared models",
    detail: "Your emails, calls and contacts are never used to train models for anyone else.",
    confirmed: false,
  },
];

export type Founder = {
  name: string;
  role: string;
  note: string;
  /** Path under /public, e.g. "/team/ahmed.jpg". null shows an initials avatar. */
  photo: string | null;
  confirmed: boolean;
};

export const founder: Founder = {
  name: "Ahmed Fayyaz",
  role: "Founder, SooqSense",
  note:
    "I built SooqSense after losing good deals to slow follow-ups and stale CRM records. It does the busywork. You stay in charge of every word that leaves your outbox.",
  photo: null,
  confirmed: false,
};

export type CustomerQuote = {
  name: string;
  title: string;
  company: string;
  quote: string;
  /** Path under /public to the customer's logo, or null. */
  logo: string | null;
};

/** Real customer quotes only, shared with permission. Leave empty until then. */
export const customers: CustomerQuote[] = [];
