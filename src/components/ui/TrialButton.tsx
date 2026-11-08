import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "./Button";

type Props = {
  size?: "sm" | "md" | "lg";
  label?: string;
  variant?: "primary" | "secondary";
  arrow?: boolean;
  className?: string;
};

/** The one primary conversion button. URL comes from NEXT_PUBLIC_APP_URL. */
export function TrialButton({ size = "lg", label = siteConfig.trial.label, variant = "primary", arrow = true, className }: Props) {
  return (
    <ButtonLink href={siteConfig.appUrl} size={size} variant={variant} className={className} data-cta="trial">
      {label}
      {arrow && <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />}
    </ButtonLink>
  );
}
