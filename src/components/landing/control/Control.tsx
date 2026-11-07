import { Thread } from "../Thread";
import { ApprovalQueue } from "./ApprovalQueue";

const promises = [
  { k: "Read-only by default", v: "SooqSense reads your inbox, calendar and CRM. It writes only where you have said it may." },
  { k: "Nothing sends without you", v: "Every email waits for approval. Auto-send is a switch you flip per workflow, never a default." },
  { k: "GDPR-ready", v: "EU or US data residency on Scale. Export or delete everything, any time." },
  { k: "Encrypted", v: "In transit and at rest." },
  { k: "Never trains shared models", v: "Your conversations stay yours. They are not used to train anyone’s AI." },
];

/** Chapter 5 — control and trust, told through Wednesday morning's queue. */
export function Control() {
  return (
    <section aria-labelledby="ct-title">
      <Thread time="Wed 08:30" label="Coffee, and three drafts" />
      <div className="container-x mt-10 grid gap-12 pb-20 md:mt-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:pb-24">
        <div className="md:order-2">
          <h2 id="ct-title" className="text-h2 font-semibold">
            The agent drafts.
            <span className="block">Ahmed decides.</span>
          </h2>
          <p className="text-lead mt-5 max-w-md text-ink-2">
            Overnight, SooqSense lined up everything that should go out today. Ahmed reads, tweaks a word, approves. Two minutes, not two hours.
            Try it.
          </p>
          <dl className="mt-10 divide-y divide-line border-y border-line">
            {promises.map((p) => (
              <div key={p.k} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <dt className="font-medium text-ink">{p.k}</dt>
                <dd className="text-ink-2">{p.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="md:order-1 md:pt-4">
          <ApprovalQueue />
        </div>
      </div>
    </section>
  );
}
