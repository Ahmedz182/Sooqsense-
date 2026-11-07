import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms that govern use of the SooqSense agentic CRM and website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="7 November 2026">
      <p>By creating a SooqSense workspace or using sooqsense.com you agree to these terms.</p>
      <h2>Your account</h2>
      <p>You are responsible for activity in your workspace and for keeping your credentials secure.</p>
      <h2>Your data</h2>
      <p>You own the data you bring to SooqSense. You grant us the rights needed to process it to provide the service you configure.</p>
      <h2>Acceptable use</h2>
      <ul>
        <li>Send email only to people you have a lawful basis to contact, in line with CAN-SPAM, PECR and GDPR.</li>
        <li>Obtain consent before recording meetings where the law requires it.</li>
        <li>Do not use the service to send spam, malware or unlawful content.</li>
      </ul>
      <h2>Trials and billing</h2>
      <p>Trials are free for 14 days with no card. Paid plans are billed per seat, monthly or yearly, and renew until cancelled.</p>
      <h2>Liability</h2>
      <p>The service is provided &ldquo;as is&rdquo;. To the extent permitted by law, our liability is limited to the fees paid in the prior 12 months.</p>
    </LegalPage>
  );
}
