import { SiteShell } from "@/components/layout/SiteShell";
import { TrialButton } from "@/components/ui/TrialButton";
import { JsonLd, faqLd, softwareLd } from "@/lib/jsonld";
import { faq } from "@/config/faq";

/** Foundation placeholder — each landing version replaces this page. */
export default function HomePage() {
  return (
    <SiteShell>
      <section className="container-x py-32 text-center">
        <p className="eyebrow">Foundation</p>
        <h1 className="text-display mx-auto mt-4 max-w-4xl font-semibold">
          The CRM that tells you what to do <span className="text-amber-ink">next.</span>
        </h1>
        <div className="mt-10 flex justify-center">
          <TrialButton />
        </div>
      </section>
      <JsonLd data={[softwareLd(), faqLd(faq)]} />
    </SiteShell>
  );
}
