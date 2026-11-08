import { nodeCatalog, type NodeKind } from "@/config/demo";
import type { IntegrationId } from "../shared/BrandLogo";

export type RunState = "done" | "running" | "waiting" | "skipped";
export type FlowNode = { id: string; kind: NodeKind; option: string; branch?: "Yes" | "No" | "Always"; state: RunState; owner?: string; detail?: string };

/** A small inbound flow: few nodes, one branch. Options come from nodeCatalog. */
export const initialFlow: FlowNode[] = [
  { id: "n1", kind: "trigger", option: "New email from lead", state: "done", owner: "Ahmed Fayyaz", detail: "Mira Haddad · 09:12" },
  { id: "n2", kind: "source", option: "Apify · LinkedIn company scraper", state: "done", detail: "140 staff · Series B" },
  { id: "n3", kind: "ai", option: "Score against ICP", state: "done", detail: "Scored 86" },
  { id: "n4", kind: "branch", option: "If score ≥ 80", state: "done", detail: "Yes" },
  { id: "n5", kind: "action", option: "Send email (after approval)", branch: "Yes", state: "waiting", owner: "Ahmed Fayyaz", detail: "Waiting for Ahmed" },
  { id: "n6", kind: "campaign", option: "Instantly · cold email campaign", branch: "No", state: "skipped", detail: "Not needed" },
  { id: "n7", kind: "notify", option: "Slack #sales", branch: "Always", state: "running", detail: "Posting…" },
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
  if (o.includes("email")) return "gmail";
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
