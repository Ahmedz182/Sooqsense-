import { nodeCatalog, type NodeKind } from "@/config/demo";
import type { IntegrationId } from "../shared/BrandLogo";

export type FlowNode = { id: string; kind: NodeKind; option: string; branch?: "Yes" | "No" };

/** A small inbound flow: few nodes, one branch. Options come from nodeCatalog. */
export const initialFlow: FlowNode[] = [
  { id: "n1", kind: "trigger", option: "New email from lead" },
  { id: "n2", kind: "source", option: "Apify · LinkedIn company scraper" },
  { id: "n3", kind: "ai", option: "Score against ICP" },
  { id: "n4", kind: "branch", option: "If score ≥ 80" },
  { id: "n5", kind: "action", option: "Send email (after approval)", branch: "Yes" },
  { id: "n6", kind: "campaign", option: "Instantly · cold email campaign", branch: "No" },
];

export const optionsOf = (kind: NodeKind) => nodeCatalog.find((c) => c.kind === kind)?.options ?? [];
export const labelOf = (kind: NodeKind) => nodeCatalog.find((c) => c.kind === kind)?.label ?? kind;

/** Real integration marks for options that name a product. */
export function logoFor(option: string): IntegrationId | null {
  const o = option.toLowerCase();
  if (o.startsWith("apify")) return "apify";
  if (o.startsWith("instantly")) return "instantly";
  if (o.startsWith("mailchimp")) return "mailchimp";
  if (o.includes("hubspot")) return "hubspot";
  if (o.includes("salesforce")) return "salesforce";
  if (o.includes("slack")) return "slack";
  if (o.includes("linkedin")) return "linkedin";
  return null;
}

export const kindDot: Record<NodeKind, string> = {
  trigger: "bg-amber",
  source: "bg-blue",
  enrich: "bg-blue",
  security: "bg-mint",
  ai: "bg-violet",
  branch: "bg-ink-3",
  meeting: "bg-rose",
  campaign: "bg-blue",
  action: "bg-amber",
  notify: "bg-mint",
};
