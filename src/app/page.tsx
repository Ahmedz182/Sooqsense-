import "@/components/landing/landing.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd, faqLd, softwareLd } from "@/lib/jsonld";
import { faq } from "@/config/faq";
import { Hero } from "@/components/landing/Hero";
import { ProblemSplit } from "@/components/landing/ProblemSplit";
import { AgentsBento } from "@/components/landing/AgentsBento";
import { WorkflowSection } from "@/components/landing/workflow/WorkflowSection";
import { MeetingsSection } from "@/components/landing/MeetingsSection";
import { CampaignsSection } from "@/components/landing/CampaignsSection";
import { ControlSection } from "@/components/landing/ControlSection";
import { IntegrationsSection } from "@/components/landing/IntegrationsSection";
import { PlaygroundSection } from "@/components/landing/playground/PlaygroundSection";
import { PricingTeaser } from "@/components/landing/PricingTeaser";
import { FaqSection } from "@/components/landing/FaqSection";
import { FinalCta } from "@/components/landing/FinalCta";

/** V3 — "Stack collapse → a team of agents". Seven tools fold into one card, the card opens into five agents. */
export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <ProblemSplit />
      <AgentsBento />
      <WorkflowSection />
      <MeetingsSection />
      <CampaignsSection />
      <ControlSection />
      <IntegrationsSection />
      <PlaygroundSection />
      <PricingTeaser />
      <FaqSection />
      <FinalCta />
      <JsonLd data={[softwareLd(), faqLd(faq)]} />
    </SiteShell>
  );
}
