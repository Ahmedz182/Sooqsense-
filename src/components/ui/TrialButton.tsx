import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "./Button";

/** The one primary conversion button. URL comes from NEXT_PUBLIC_APP_URL. */
export function TrialButton({
  size = "lg",
  label = siteConfig.trial.label,
  variant = "primary",
  className,
}: {
  size?: "sm" | "md" | "lg";
  label?: string;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <ButtonLink href={siteConfig.appUrl} size={size} variant={variant} className={className} data-cta="trial">
      {label}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
    </ButtonLink>
  );
}
