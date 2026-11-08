import { SiteShell } from "@/components/layout/SiteShell";
import { Hero } from "@/components/landing/hero/Hero";
import { Story } from "@/components/landing/story/Story";
import { Meetings } from "@/components/landing/meetings/Meetings";
import { Campaigns } from "@/components/landing/campaigns/Campaigns";
import { Workflows } from "@/components/landing/workflows/Workflows";
import { Playground } from "@/components/landing/playground/Playground";
import { Integrations } from "@/components/landing/integrations/Integrations";
import { Trust } from "@/components/landing/trust/Trust";
import { Faq, FinalCta, PricingTeaser } from "@/components/landing/Closing";
import { JsonLd, faqLd, softwareLd } from "@/lib/jsonld";
import { faq } from "@/config/faq";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <Story />
      <Meetings />
      <Campaigns />
      <Workflows />
      <Playground />
      <Integrations />
      <Trust />
      <PricingTeaser />
      <Faq />
      <FinalCta />
      <JsonLd data={[softwareLd(), faqLd(faq)]} />
    </SiteShell>
  );
}
