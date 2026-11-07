import { nodeCatalog, type NodeKind } from "@/config/demo";

export type PStep = { id: string; kind: NodeKind; option: string; note?: string };
export type Template = { id: string; name: string; blurb: string; steps: PStep[]; fork?: [PStep, PStep] };

let n = 0;
const s = (kind: NodeKind, option: string, note?: string): PStep => ({ id: `t${++n}`, kind, option, note });

export const templates: Template[] = [
  {
    id: "inbound",
    name: "Inbound lead",
    blurb: "Form fill → checked, enriched, scored, routed.",
    steps: [
      s("trigger", "Website contact form", "Test: iamahmedfayyaz@gmail.com"),
      s("security", "Spam & bot screen"),
      s("enrich", "Company & firmographics"),
      s("ai", "Score against ICP"),
      s("branch", "If score ≥ 80"),
    ],
    fork: [s("action", "Send report to client", "Yes"), s("campaign", "Add to nurture sequence", "No")],
  },
  {
    id: "followup",
    name: "Post-meeting follow-up",
    blurb: "Call ends → notes, CRM and a draft by Ahmed.",
    steps: [
      s("trigger", "Meeting ended", "Owner: Ahmed Fayyaz"),
      s("meeting", "Record & transcribe"),
      s("meeting", "Extract action items"),
      s("ai", "Draft reply in your voice"),
      s("action", "Update HubSpot"),
      s("notify", "Morning queue"),
    ],
  },
  {
    id: "renewal",
    name: "Renewal rescue",
    blurb: "30 days out, quiet account → act before it churns.",
    steps: [s("trigger", "Renewal in 30 days"), s("ai", "Summarise thread"), s("branch", "If no reply in 3 days")],
    fork: [s("action", "Create task", "Yes"), s("notify", "Slack #sales", "No")],
  },
  {
    id: "campaign",
    name: "Campaign launch",
    blurb: "One insight → sequence, LinkedIn touch, SEO brief.",
    steps: [
      s("trigger", "Deal stage changed"),
      s("enrich", "LinkedIn profile"),
      s("ai", "Generate SEO brief"),
      s("campaign", "Add to nurture sequence"),
      s("campaign", "Launch LinkedIn touch"),
      s("notify", "Email digest"),
    ],
  },
];

export const catalog = nodeCatalog;
export const optionsOf = (kind: NodeKind) => nodeCatalog.find((c) => c.kind === kind)?.options ?? [];
export const labelOf = (kind: NodeKind) => nodeCatalog.find((c) => c.kind === kind)?.label ?? kind;

export const kindTone: Record<NodeKind, string> = {
  trigger: "bg-amber-soft text-amber-ink",
  enrich: "bg-blue-soft text-blue",
  security: "bg-mint-soft text-mint",
  ai: "bg-violet-soft text-violet",
  branch: "bg-bg-sunken text-ink-2",
  meeting: "bg-rose-soft text-rose",
  campaign: "bg-blue-soft text-blue",
  action: "bg-amber-soft text-amber-ink",
  notify: "bg-mint-soft text-mint",
};

let uid = 0;
export const newId = () => `u${Date.now().toString(36)}${++uid}`;
