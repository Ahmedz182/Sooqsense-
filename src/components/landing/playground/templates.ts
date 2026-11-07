import type { NodeKind } from "@/config/demo";

export type Step = { id: string; kind: NodeKind; option: string };
export type Template = { id: string; name: string; blurb: string; steps: Step[]; links: [string, string][]; rows?: Record<string, number> };

/** Steps run left → right; `rows` nudges branch outcomes up (-1) or down (+1). */
export const templates: Template[] = [
  {
    id: "inbound",
    name: "Inbound lead",
    blurb: "Contact form → screened, scored, routed.",
    steps: [
      { id: "a", kind: "trigger", option: "Website contact form" },
      { id: "b", kind: "security", option: "Spam & bot screen" },
      { id: "c", kind: "enrich", option: "Company & firmographics" },
      { id: "d", kind: "ai", option: "Score against ICP" },
      { id: "e", kind: "branch", option: "If score ≥ 80" },
      { id: "f", kind: "action", option: "Send report to client" },
      { id: "g", kind: "campaign", option: "Add to nurture sequence" },
    ],
    links: [["a", "b"], ["b", "c"], ["c", "d"], ["d", "e"], ["e", "f"], ["e", "g"]],
    rows: { f: -1, g: 1 },
  },
  {
    id: "meeting",
    name: "Post-meeting follow-up",
    blurb: "Call ends → notes, CRM, draft.",
    steps: [
      { id: "a", kind: "trigger", option: "Meeting ended" },
      { id: "b", kind: "meeting", option: "Extract action items" },
      { id: "c", kind: "ai", option: "Draft reply in your voice" },
      { id: "d", kind: "action", option: "Update HubSpot" },
      { id: "e", kind: "notify", option: "Slack #sales" },
    ],
    links: [["a", "b"], ["b", "c"], ["c", "d"], ["d", "e"]],
  },
  {
    id: "renewal",
    name: "Renewal rescue",
    blurb: "30 days out → nudge, then a call.",
    steps: [
      { id: "a", kind: "trigger", option: "Renewal in 30 days" },
      { id: "b", kind: "ai", option: "Summarise thread" },
      { id: "c", kind: "action", option: "Send email (after approval)" },
      { id: "d", kind: "branch", option: "If no reply in 3 days" },
      { id: "e", kind: "meeting", option: "Book a call" },
      { id: "f", kind: "notify", option: "Morning queue" },
    ],
    links: [["a", "b"], ["b", "c"], ["c", "d"], ["d", "e"], ["d", "f"]],
    rows: { e: -1, f: 1 },
  },
  {
    id: "campaign",
    name: "Campaign launch",
    blurb: "One brief → newsletter + LinkedIn.",
    steps: [
      { id: "a", kind: "trigger", option: "Deal stage changed" },
      { id: "b", kind: "enrich", option: "Funding & headcount" },
      { id: "c", kind: "ai", option: "Generate SEO brief" },
      { id: "d", kind: "campaign", option: "Send newsletter" },
      { id: "e", kind: "campaign", option: "Launch LinkedIn touch" },
      { id: "f", kind: "notify", option: "Email digest" },
    ],
    links: [["a", "b"], ["b", "c"], ["c", "d"], ["c", "e"], ["d", "f"]],
    rows: { d: -1, e: 1, f: -1 },
  },
];
