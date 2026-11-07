import { faq } from "@/config/faq";
import { siteConfig } from "@/config/site";
import { FaqSearch } from "@/components/ui/FaqSearch";
import { Thread } from "./Thread";

/** Chapter 9 — the questions RevOps asks before the trial. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20">
      <Thread time="Questions" label="Before you connect anything" />
      <div className="container-x mt-10 grid gap-10 pb-20 md:mt-12 md:grid-cols-[0.7fr_1.3fr] md:gap-16 md:pb-24">
        <div>
          <h2 id="faq-title" className="text-h2 font-semibold">
            Fair questions.
          </h2>
          <p className="mt-5 max-w-xs text-ink-2">
            The ones RevOps asks us first. Anything else, write to{" "}
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-amber-ink underline underline-offset-4">
              {siteConfig.contactEmail}
            </a>
            .
          </p>
        </div>
        <FaqSearch items={faq} />
      </div>
    </section>
  );
}
