import { nodeCatalog, type NodeKind } from "@/config/demo";
import { agents, optionDetail } from "../data";

export type FlowNode = {
  id: string;
  kind: NodeKind;
  owner: string;
  initial: string;
  /** Desktop canvas position: left % and vertical centre (px in a 300px canvas). */
  left: number;
  cy: number;
  branch?: "yes" | "no";
};

export const NODE_W = 14; // % of canvas width
export const CANVAS_H = 300;

export const flowNodes: FlowNode[] = [
  { id: "trigger", kind: "trigger", owner: agents.inbox.name, initial: "Website contact form", left: 0, cy: 150 },
  { id: "security", kind: "security", owner: agents.security.name, initial: "Spam & bot screen", left: 17.2, cy: 150 },
  { id: "enrich", kind: "enrich", owner: agents.inbox.name, initial: "Company & firmographics", left: 34.4, cy: 150 },
  { id: "score", kind: "ai", owner: agents.inbox.name, initial: "Score against ICP", left: 51.6, cy: 150 },
  { id: "branch", kind: "branch", owner: "Workflow", initial: "If score ≥ 80", left: 68.8, cy: 150 },
  { id: "yes", kind: "ai", owner: "Content agent", initial: "Write pitch report", left: 86, cy: 58, branch: "yes" },
  { id: "no", kind: "campaign", owner: agents.campaigns.name, initial: "Add to nurture sequence", left: 86, cy: 242, branch: "no" },
];

/** Edge paths in a 1000×300 viewBox (stretched horizontally to the canvas). */
export const flowEdges: { id: string; d: string; to: string }[] = flowNodes.slice(1).map((n) => {
  if (n.branch) {
    const x1 = (68.8 + NODE_W) * 10;
    const x2 = n.left * 10;
    const mid = (x1 + x2) / 2;
    return { id: `e-${n.id}`, to: n.id, d: `M${x1} 150 C ${mid} 150, ${mid} ${n.cy}, ${x2} ${n.cy}` };
  }
  const prev = flowNodes[flowNodes.indexOf(n) - 1];
  return { id: `e-${n.id}`, to: n.id, d: `M${(prev.left + NODE_W) * 10} 150 L ${n.left * 10} 150` };
});

export const kindLabel = (k: NodeKind) => nodeCatalog.find((c) => c.kind === k)?.label ?? k;
export const optionsFor = (k: NodeKind) => nodeCatalog.find((c) => c.kind === k)?.options ?? [];
export const detailFor = (option: string) => optionDetail[option] ?? "configured";

/** Fake but consistent run log timestamps, one second apart. */
export const runTime = (i: number) => `09:14:${String(2 + i * 3).padStart(2, "0")}`;
