import { trustedBy, visible } from "@/config/trust";
import { SampleTag, Wordmark } from "./Proof";

/** "Trusted by" row. Renders nothing until there are real (or, in previews, sample) entries. */
export function TrustedBy() {
  const companies = visible(trustedBy);
  if (!companies.length) return null;
  const sample = companies.some((c) => c.sample);
  return (
    <div className="container-x pb-16 md:pb-20">
      <p className="flex items-center justify-center gap-2 text-center text-sm text-ink-3">
        Trusted by sales teams at {sample && <SampleTag />}
      </p>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-14">
        {companies.map((c) => (
          <li key={c.name}>
            <Wordmark company={c} />
          </li>
        ))}
      </ul>
    </div>
  );
}
