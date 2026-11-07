import { Thread } from "../Thread";
import { Ribbon } from "./Ribbon";
import { WriteBack } from "./WriteBack";

/** Chapter 6 — closed won, and the CRM already has every detail. */
export function Integrations() {
  return (
    <section id="integrations" aria-labelledby="in-title" className="scroll-mt-20">
      <Thread time="Fri 14:20" label="Order form signed" />
      <div className="container-x mt-10 grid gap-10 md:mt-14 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-16">
        <div>
          <h2 id="in-title" className="text-h2 font-semibold">
            Closed won.
            <span className="block text-ink-3">HubSpot already knew.</span>
          </h2>
          <p className="text-lead mt-5 max-w-md text-ink-2">
            Every call summary, approved email and stage change was written back as it happened. Nobody spent Friday afternoon updating the
            CRM, because nobody had to.
          </p>
          <p className="mt-6 max-w-md text-sm text-ink-3">
            Two-way sync with HubSpot and Salesforce. Slack gets the ping in #sales. Anything else talks to the REST API and webhooks.
          </p>
        </div>
        <WriteBack />
      </div>
      <div className="mt-16 pb-16 md:mt-20 md:pb-24">
        <Ribbon />
      </div>
    </section>
  );
}
