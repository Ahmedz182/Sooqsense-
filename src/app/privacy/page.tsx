import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How SooqSense collects, uses and protects personal data, including inbox, calendar and meeting data. GDPR-ready.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="7 November 2026">
      <p>
        This policy explains how SooqSense (&ldquo;we&rdquo;) handles personal data when you visit sooqsense.com or use the SooqSense
        workspace. We process data in line with the EU and UK General Data Protection Regulation (GDPR) and applicable US state privacy laws.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>Account details you give us: name, work email, company and team size.</li>
        <li>Workspace data you connect: email, calendar events, meeting recordings and transcripts, and CRM records.</li>
        <li>Usage data: pages viewed, features used and device information, collected with privacy-friendly analytics.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To run the product: build timelines, rank your action queue, draft messages and run the workflows you configure.</li>
        <li>To keep the service secure and reliable.</li>
        <li>To contact you about your account, waitlist place or demo request.</li>
      </ul>
      <p>We never sell personal data and never use your workspace data to train shared AI models.</p>
      <h2>Your control</h2>
      <p>
        Connected accounts are read-only until you grant more access, and nothing is sent on your behalf without approval unless you enable it
        for a specific workflow. You can disconnect integrations, export or delete your data at any time.
      </p>
      <h2>Your rights</h2>
      <p>
        You can request access, correction, deletion, restriction or portability of your personal data, and object to processing. Email{" "}
        <a className="text-amber-ink underline" href={`mailto:${siteConfig.contactEmail}`}>
          {siteConfig.contactEmail}
        </a>
        .
      </p>
      <h2>Retention and transfers</h2>
      <p>
        We keep data only as long as needed to provide the service or meet legal obligations. Where data leaves the EU/UK we rely on Standard
        Contractual Clauses or an equivalent safeguard.
      </p>
    </LegalPage>
  );
}
