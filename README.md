# SooqSense — marketing site

Next.js marketing site for **SooqSense**, the agentic CRM and AI workflow platform for sales & marketing teams.

```bash
npm ci
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
npm run build && npm start
npm run screenshots -- --base http://localhost:3000 --out docs/screenshots/local
```

- Design spec: [`docs/specs/2026-11-07-landing-design.md`](docs/specs/2026-11-07-landing-design.md)
- Change trial / sign-in URL: `NEXT_PUBLIC_APP_URL` (defaults to staging)
- Waitlist & contact leads: set `LEADS_WEBHOOK_URL` or the `RESEND_*` variables (see `.env.example`); otherwise they are logged on the server.
- Pricing is a placeholder in `src/config/pricing.ts`.
- Theme tokens: `src/theme/tokens.css` (+ `version.css`). All pages use them, so a version restyles the whole site.

Landing versions live on branches `landing/v1-deal-story`, `landing/v2-command-canvas`, `landing/v3-stack-collapse`.
