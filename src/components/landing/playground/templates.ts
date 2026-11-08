import { nodeCatalog, type NodeKind } from "@/config/demo";

export type PStep = { id: string; kind: NodeKind; option: string; note?: string };
export type Template = { id: string; name: string; steps: PStep[]; fork?: [PStep, PStep]; after?: PStep };

let n = 0;
const s = (kind: NodeKind, option: string, note?: string): PStep => ({ id: `t${++n}`, kind, option, note });

export const templates: Template[] = [
  {
    id: "outbound",
    name: "Outbound list",
    steps: [
      s("source", "Apify · LinkedIn profile scraper", "Owner: Ahmed Fayyaz"),
      s("enrich", "Funding & headcount"),
      s("ai", "Score against ICP"),
      s("branch", "If score ≥ 80"),
    ],
    fork: [s("campaign", "Instantly · cold email campaign", "Yes"), s("action", "Update HubSpot", "No")],
    after: s("notify", "Slack #sales"),
  },
  {
    id: "inbound",
    name: "Inbound lead",
    steps: [
      s("trigger", "Website contact form", "Test: iamahmedfayyaz@gmail.com"),
      s("security", "Spam & bot screen"),
      s("source", "Apify · LinkedIn company scraper"),
      s("ai", "Score against ICP"),
      s("branch", "If score ≥ 80"),
    ],
    fork: [s("action", "Send report to client", "Yes"), s("campaign", "Add to nurture sequence", "No")],
  },
  {
    id: "followup",
    name: "After the call",
    steps: [
      s("trigger", "Meeting ended", "Owner: Ahmed Fayyaz"),
      s("meeting", "Record & transcribe"),
      s("meeting", "Extract action items"),
      s("ai", "Draft reply in your voice"),
      s("action", "Update HubSpot"),
    ],
  },
  {
    id: "renewal",
    name: "Renewal rescue",
    steps: [s("trigger", "Renewal in 30 days"), s("ai", "Summarise thread"), s("branch", "If no reply in 3 days")],
    fork: [s("action", "Create task", "Yes"), s("campaign", "Mailchimp · newsletter", "No")],
  },
];

export const catalog = nodeCatalog;
export const optionsOf = (kind: NodeKind) => nodeCatalog.find((c) => c.kind === kind)?.options ?? [];
export const labelOf = (kind: NodeKind) => nodeCatalog.find((c) => c.kind === kind)?.label ?? kind;

let uid = 0;
export const newId = () => `u${Date.now().toString(36)}${++uid}`;
