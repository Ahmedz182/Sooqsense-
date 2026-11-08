import { owner } from "@/config/demo";

/**
 * Faces for the product mock-ups. Stock portraits (public/images/CREDITS.md) are used
 * ONLY as illustrative avatars inside the product UI — never next to testimonials.
 * Ahmed Fayyaz is a real person and uses his own supplied photo (owner.photo).
 */
const p = (n: number) => `/images/people/person-${String(n).padStart(2, "0")}.webp`;

export const photoOf: Record<string, string> = {
  [owner.name]: owner.photo,
  "Mira Haddad": p(1),
  "James Whitfield": p(2),
  "Lena Brandt": p(3),
  "Daniel Ortiz": p(4),
  "Sophie Laurent": p(5),
  "Owen Price": p(7),
  "Elena Novak": p(8),
  "Marcus Hale": p(9),
  "Chloe Martin": p(10),
  "Noah Becker": p(11),
  "Anna Weber": p(12),
  "Omar Siddiqui": p(13),
  "Isabel Moreno": p(14),
  "Arjun Mehta": p(15),
  "Grace Okafor": p(16),
  "Rachel Kim": p(17),
};

export const initialsOf = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** The buying group at Carthage Labs — who knows whom. */
export const account = {
  company: "Carthage Labs",
  people: [
    { name: "Mira Haddad", title: "VP RevOps", role: "Champion", note: "Emails you weekly" },
    { name: "Owen Price", title: "CFO", role: "Economic buyer", note: "Mira’s manager" },
    { name: "Marcus Hale", title: "Head of Sales", role: "User lead", note: "Works with Mira" },
    { name: "Elena Novak", title: "Sales Ops Manager", role: "Evaluator", note: "Reports to Mira" },
    { name: "Grace Okafor", title: "IT & Security", role: "Approver", note: "Met Noah at SaaStr" },
  ],
  /** Edges: [from, to, label] */
  links: [
    ["Ahmed Fayyaz", "Mira Haddad", "Emailing since Oct"],
    ["Mira Haddad", "Owen Price", "Reports to"],
    ["Mira Haddad", "Marcus Hale", "Works with"],
    ["Mira Haddad", "Elena Novak", "Manages"],
    ["Noah Becker", "Grace Okafor", "Met at SaaStr"],
  ] as const,
  team: [
    { name: "Ahmed Fayyaz", title: "Account owner" },
    { name: "Noah Becker", title: "Solutions engineer" },
  ],
};
