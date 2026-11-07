# SooqSense marketing site — design spec

Date: 2026-11-07 · Owner: Ahmed Fayyaz

## 1. Goal

A production-grade, story-driven marketing site for **SooqSense**: an agentic CRM that has grown into an
AI **workflow platform for sales, marketing and campaigns**. The visitor should leave convinced to
**start the free trial** (or, if not ready, join the waitlist / book a demo).

Audience: B2B sales, RevOps, marketing and founder-led teams in the **US, UK and Europe**.
Tone: confident, calm, premium ("Apple-smooth"), never cluttered.

### The problem we sell against
Sales teams juggle HubSpot, Salesforce, Gmail/Outlook, Slack, LinkedIn, calendar, meeting recorders,
email-campaign tools and spreadsheets. Data is copied by hand, follow-ups slip, deals go cold.
SooqSense collapses that stack into **one agent + workflows** that read every conversation and run the
next move — with a human approving every send.

### What the product does (feature vocabulary — use these, invent nothing bigger)
- Inbox + calendar sync (Gmail, Outlook, Google Calendar); history backfill; relationship timeline & health score
- Daily ranked **action queue** (follow up, renewal due, draft ready) — nothing sends without approval
- **Workflows**: node-based automations (trigger → enrich → security check → AI step → branch → action / campaign / notify)
- **Meetings**: book, record, transcribe, summarise, extract action items, update CRM, draft follow-up
- **Campaigns**: email sequences, newsletters, LinkedIn touches, content enrichment, SEO briefs
- **Lead intake & security**: contact-form message → spam/risk screen → enrich → ICP score → pitch report to client
- Two-way sync with **HubSpot & Salesforce**; Slack alerts/approvals; REST API & webhooks
- Trust: read-only by default, GDPR-ready, encryption, data never trains shared models.
  **Do not claim SOC 2 or any certification** — not verified.

## 2. Non-negotiables

1. **Story, not a feature list.** Hero starts the story; each section advances it. **No repeated sections**,
   no section that re-says another with new wording.
2. **Interaction at three levels**: cinematic scroll (scrubbed), guided edits (click a node → swap option →
   flow updates), and a real **playground** (React Flow canvas, lazy-loaded; simplified tap version on mobile).
3. **Scroll is 1:1.** Animations are scrubbed to scroll position (GSAP ScrollTrigger `scrub`). A small scroll
   moves things a small amount; stopping stops; scrolling back reverses. **No scroll-jacking, no forced snapping.**
4. **Light + dark**, default = system, toggle remembered (`next-themes`, `data-theme`). Less pure black: warm charcoal.
5. **Mobile-first quality.** 390 px must be as considered as 1440 px. No horizontal scroll. Touch targets ≥ 44 px.
   Pinned scenes simplify on small screens. Native touch scroll on phones (Lenis is off for coarse pointers).
6. **prefers-reduced-motion**: every section must render its complete, final content statically (screenshots rely on this).
7. **Clean & minimal UI**: few nodes, few controls, generous whitespace, one idea per section.
8. **Copy for US/UK/EU B2B**: pipeline, quota, ICP, RevOps, GDPR, "Book a demo". USD pricing. Short sentences.
9. **Demo data**: **Ahmed Fayyaz** and **iamahmedfayyaz@gmail.com** must appear in workflows/mock-ups
   (see `src/config/demo.ts`); other fictional US/UK/EU people may be added there.
10. **SEO on every page**: `buildMetadata()` (title, description, canonical, keywords, OG/Twitter), JSON-LD
    (`Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`, `BreadcrumbList`), sitemap, robots, one `h1` per page,
    semantic landmarks, descriptive alt text / `aria-hidden` for decorative mock-ups.
11. **Safe dependencies**: exact pinned versions only (see `package.json`, `.npmrc save-exact`). Do not add a
    dependency unless essential; if you do, pin an exact version **published ≥ 2 weeks ago**, from a well-known
    publisher, and `npm audit` must report 0 vulnerabilities.
12. **No fake proof**: no invented testimonials, logos of customers, user counts or certifications.

## 3. Architecture (foundation on `main`)

```
src/
  app/                      routes: / , /pricing, /contact, /privacy, /terms, /api/leads, sitemap, robots, OG image
  config/site.ts            name, URLs (NEXT_PUBLIC_APP_URL → trial button), nav, footer, keywords
  config/pricing.ts         PLACEHOLDER plans, comparison table, pricing FAQ
  config/demo.ts            Ahmed Fayyaz + demo people, integrations, workflow node catalogue
  config/faq.ts             home FAQ (also FAQPage JSON-LD)
  theme/tokens.css          colour / type / radius / shadow / motion tokens, light + dark
  theme/version.css         per-version token overrides
  components/layout/        SiteShell (Header + Footer) — every page renders inside it
  components/ui/            Button, TrialButton, ThemeToggle, Logo
  components/forms/LeadForm waitlist / demo / contact → POST /api/leads
  components/providers/     ThemeProvider, SmoothScroll (Lenis ↔ ScrollTrigger)
  lib/seo.ts, lib/jsonld.tsx, lib/leads.ts (zod validation + pluggable delivery: webhook | Resend | log)
```

**"Dynamic theme" rule:** a landing version expresses its visual identity through `theme/tokens.css`,
`theme/version.css`, the shared primitives in `components/ui` and `components/layout`. Every other page
(pricing, contact, legal, 404) is built only from those, so switching versions restyles the whole site
automatically. Version-specific landing sections live in `src/components/landing/`.

### Stack (pinned)
Next.js 16.4.3 (App Router) · React 19.3.1 · TypeScript 5.9.3 · Tailwind CSS 4.3.3 · GSAP 3.15.0 (+ScrollTrigger)
· Lenis 1.3.27 · Motion 14.6.0 · @xyflow/react 12.12.0 · next-themes 0.4.6 · lucide-react 1.61.0 · zod 4.6.7.
Fonts: **Clash Display** (headings) + **Satoshi** (body), self-hosted from Fontshare; **JetBrains Mono** for data/UI.

### Conversion paths
- Primary: **Start free trial** → `siteConfig.appUrl` (staging for now). Appears in the header, the hero and the
  final CTA (+ playground / pricing) — once per section, never stacked.
- Secondary: **Book a demo** → `/contact?intent=demo`; **Join the waitlist** form (`LeadForm intent="waitlist"`).

## 4. Pages

| Route | Purpose | Must include |
|---|---|---|
| `/` | The story | hero (trial CTA), problem, workflow centrepiece with guided edits, meetings, campaigns, control/trust, integrations, playground, pricing teaser, FAQ, final CTA + waitlist |
| `/pricing` | Interactive pricing | monthly/yearly toggle, seat slider with live total, 3 plans from config, comparison table, pricing FAQ, CTA |
| `/contact` | Demo / waitlist / contact | intent switch via `?intent=`, LeadForm |
| `/privacy`, `/terms` | Legal (draft) | LegalPage layout |

## 5. Landing versions (one branch each)

| Branch | Story | Visual direction |
|---|---|---|
| `landing/v1-deal-story` | "Ahmed's Tuesday": one inbound lead from first message to closed deal; a single workflow grows node by node down the page | Editorial, warm, centred; cream/charcoal, amber accents |
| `landing/v2-command-canvas` | The page *is* a canvas: scroll moves a camera across one large workflow map; each region is a capability | Product-forward, dot-grid canvas, crisp cards, mint + amber |
| `landing/v3-stack-collapse` | Before → after: seven tools collapse into one agent; then a team of specialist agents (Inbox, Meetings, Campaigns, Security, Content) | Bold type, split screens, bento grid, blue + amber |

Each version must ship every page above, light + dark, desktop + mobile, and a screenshot set in
`docs/screenshots/<version>/` produced by `npm run screenshots`.

## 6. Quality gates (per version)
- `npm run typecheck` and `npm run build` pass; `npm audit` → 0 vulnerabilities.
- No horizontal overflow at 390 px; no console errors; Lighthouse-friendly (lazy-load heavy parts, `next/image`/SVG).
- Contrast AA in both themes (use `--amber-ink` for amber text on light backgrounds).
- Keyboard: every interactive node/control reachable and operable; visible focus.

## 7. Craft — it must NOT look AI-generated

Reference for *level of craft only* (not to copy): staging.artilence.com — same studio. What makes it feel
hand-made: hero built from **real product fragments in 3D perspective** (tilted cards with specific data like
"94.2%", "+$12,480.00", "Resolving ticket #482"), a **curved ribbon marquee** instead of a flat logo row,
stats told **"one number at a time"** with a stepper + live chart, soft brand-colour washes instead of neon
blobs, small floating tool tiles, live details (office local times), a searchable FAQ.

**Avoid (instant "AI template" tells):**
- Centered hero + gradient blob + 3 equal icon cards + "Features" grid + logo row + testimonial carousel.
- Icons in coloured rounded squares repeated in grids; emoji; generic illustrations or stock photos.
- Words: unlock, supercharge, revolutionize, seamless, elevate, empower, cutting-edge, game-changer, "in today's fast-paced world".
- Purple/indigo gradients, glassmorphism everywhere, glowing borders on every card, identical card sizes, uniform section rhythm.
- Gradient text on every heading; every section with an eyebrow + H2 + paragraph + grid.

**Do:**
- Build visuals from **real SooqSense UI fragments** with specific, believable data (names, times, amounts, email
  subjects, deal stages) — e.g. "Mira opened the proposal twice · Tue 09:14", "Ahmed Fayyaz approved 3 drafts".
- Vary layout rhythm: asymmetric editorial splits, full-bleed moments, a pinned scene, a quiet text-only beat.
- Tactile micro-interactions: cards that tilt toward the cursor, magnetic primary button, nodes that snap with a
  tiny spring, edges that draw on, a caret that types a draft, counters that tick.
- Live, local details: "09:41 in New York · 14:41 in London · 15:41 in Berlin" style clocks; relative timestamps.
- Human microcopy with a point of view, short sentences, a little wit ("Your CRM, minus the data entry.").
- Custom SVG icons/marks for integrations drawn simply (wordmark-in-a-tile), not a random icon pack mash-up.
- One signature motif per version that recurs subtly (e.g. the amber "next" dot, a connector line, a ribbon).
