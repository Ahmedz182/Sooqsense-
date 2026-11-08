/**
 * TRUST — owner-supplied proof.
 *
 * Rules (spec §9):
 * - Entries marked `sample: true` are design placeholders. They render ONLY when
 *   NEXT_PUBLIC_SHOW_SAMPLE_PROOF=true (preview builds), always with a "Sample" tag.
 *   Production builds hide them. Replace them with real, permissioned entries and set
 *   `sample: false`.
 * - Sample testimonials use initials avatars and fictional company wordmarks — never
 *   stock photos and never real company logos.
 * - Security facts stay `confirmed: false` (tagged "To confirm" in previews) until the
 *   owner confirms each one is true today. No certifications that aren't audited (no SOC 2).
 */

export const showSampleProof = process.env.NEXT_PUBLIC_SHOW_SAMPLE_PROOF === "true";

/** Keep real entries; keep samples only in preview builds. */
export function visible<T extends { sample: boolean }>(items: T[]): T[] {
  return items.filter((i) => !i.sample || showSampleProof);
}

export type SecurityFact = { id: string; title: string; detail: string; confirmed: boolean };

export const securityFacts: SecurityFact[] = [
  { id: "read-only", title: "Read-only by default", detail: "SooqSense reads your inbox and calendar. It asks before it writes anything.", confirmed: false },
  { id: "approval", title: "Nothing sends without approval", detail: "Every email, CRM update and campaign waits for a person to approve it.", confirmed: false },
  { id: "encryption", title: "Encrypted in transit and at rest", detail: "TLS on every connection. Stored data is encrypted on disk.", confirmed: false },
  { id: "gdpr", title: "GDPR-ready", detail: "A data processing agreement, full export and deletion on request.", confirmed: false },
  { id: "no-training", title: "Never trains shared models", detail: "Your emails, calls and contacts are never used to train models for anyone else.", confirmed: false },
];

export type Founder = {
  name: string;
  role: string;
  note: string;
  /** Path under /public, e.g. "/team/ahmed.jpg". null shows an initials avatar. */
  photo: string | null;
  /** Draft wording until the owner approves it; shown like a sample until then. */
  sample: boolean;
};

export const founder: Founder = {
  name: "Ahmed Fayyaz",
  role: "Founder, SooqSense",
  note:
    "I built SooqSense after losing good deals to slow follow-ups and stale CRM records. It does the busywork. You stay in charge of every word that leaves your outbox.",
  photo: "/images/people/ahmed-fayyaz-lg.webp",
  sample: true,
};

/** "Trusted by" row. Fictional wordmarks until real customers agree to be named. */
export type TrustedCompany = { name: string; style: "serif" | "wide" | "mono" | "bold" | "light"; sample: boolean };

export const trustedBy: TrustedCompany[] = [
  { name: "Northwind", style: "bold", sample: true },
  { name: "HelioScale", style: "wide", sample: true },
  { name: "Ledgerly", style: "serif", sample: true },
  { name: "BRIGHTPATH", style: "light", sample: true },
  { name: "Maison Verte", style: "serif", sample: true },
  { name: "arcfield", style: "bold", sample: true },
];

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  /** 1–5 */
  rating: number;
  /** Path under /public to the customer's own logo, or null. Never a stock photo. */
  logo: string | null;
  sample: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote: "Our reps stopped spending Friday afternoons in the CRM. The follow-ups go out the same day, and I still approve every one.",
    name: "Hannah Brooks",
    title: "Head of Sales",
    company: "Northwind",
    rating: 5,
    logo: null,
    sample: true,
  },
  {
    quote: "The meeting notes land on the right deal before I've closed Zoom. That alone paid for the seats.",
    name: "Tomás Ruiz",
    title: "Account Executive",
    company: "HelioScale",
    rating: 5,
    logo: null,
    sample: true,
  },
  {
    quote: "We built our outbound in an afternoon: Apify list, scoring, Instantly sequence. It just runs.",
    name: "Kate Lindqvist",
    title: "RevOps Lead",
    company: "Ledgerly",
    rating: 5,
    logo: null,
    sample: true,
  },
];

export type ReviewSummary = { rating: number; count: number; label: string; sample: boolean };

export const reviewSummary: ReviewSummary = { rating: 4.9, count: 120, label: "average from early-access teams", sample: true };
