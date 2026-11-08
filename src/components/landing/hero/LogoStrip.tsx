import { integrations } from "@/config/demo";
import { cn } from "@/lib/cn";
import { BrandLogo, type IntegrationId } from "../shared/BrandLogo";

/** Six of the most-recognised marks show on phones (one row); all fifteen from tablet up. */
const phone = new Set<IntegrationId>(["gmail", "outlook", "zoom", "hubspot", "salesforce", "slack"]);

export function LogoStrip() {
  const withLogo = integrations.filter((i) => i.logo);
  return (
    <div className="container-x mt-14 pb-20 md:mt-20 md:pb-28">
      <p className="text-center text-sm text-ink-3">Works with the tools you already use.</p>
      <ul className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {withLogo.map((i) => (
          <li key={i.id} className={cn(!phone.has(i.id) && "hidden sm:block")} title={i.name}>
            <BrandLogo id={i.id} size="md" />
          </li>
        ))}
      </ul>
    </div>
  );
}
