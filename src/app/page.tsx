import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd, faqLd, softwareLd } from "@/lib/jsonld";
import { faq } from "@/config/faq";
import { Hero } from "@/components/landing/hero/Hero";
import { Problem } from "@/components/landing/Problem";
import { WorkflowScene } from "@/components/landing/workflow/WorkflowScene";
import { Meetings } from "@/components/landing/meetings/Meetings";
import { Campaigns } from "@/components/landing/campaigns/Campaigns";
import { Control } from "@/components/landing/control/Control";
import { Integrations } from "@/components/landing/integrations/Integrations";
import { Playground } from "@/components/landing/playground/Playground";
import { PricingTeaser } from "@/components/landing/PricingTeaser";
import { Faq } from "@/components/landing/Faq";
import { FinalCta } from "@/components/landing/FinalCta";

/** V1 — "Ahmed's Tuesday": one inbound lead, from the first message to closed won. */
export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <Problem />
      <WorkflowScene />
      <Meetings />
      <Campaigns />
      <Control />
      <Integrations />
      <Playground />
      <PricingTeaser />
      <Faq />
      <FinalCta />
      <JsonLd data={[softwareLd(), faqLd(faq)]} />
    </SiteShell>
  );
}
