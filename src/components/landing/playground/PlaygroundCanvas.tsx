"use client";

import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  Position,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Connection,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { Plus, RotateCcw, Trash2 } from "lucide-react";
import { nodeCatalog, type NodeKind } from "@/config/demo";
import { cn } from "@/lib/cn";
import { agents, kindOwner } from "../data";
import { detailFor, kindLabel, optionsFor } from "../workflow/model";
import { templates, type Template } from "./templates";

type StepData = { kind: NodeKind; option: string };
type StepNode = Node<StepData, "step">;

const ownerName = (k: NodeKind) => (kindOwner[k] === "you" ? "You" : agents[kindOwner[k] as keyof typeof agents].name);

function StepCard({ data, selected }: NodeProps<StepNode>) {
  const you = kindOwner[data.kind] === "you";
  return (
    <div className={cn("w-[180px] rounded-[14px] border bg-bg-elev p-3 shadow-sm transition-[border-color,box-shadow]", selected ? "border-blue shadow-md" : "border-line")}>
      {data.kind !== "trigger" && <Handle type="target" position={Position.Left} />}
      <p className={cn("font-mono text-[9.5px] font-medium uppercase tracking-[0.12em]", you ? "text-amber-ink" : "text-blue-ink")}>{ownerName(data.kind)}</p>
      <p className="mt-0.5 font-mono text-[10px] text-ink-3">{kindLabel(data.kind)}</p>
      <p className="mt-1 text-[13px] font-medium leading-tight text-ink">{data.option}</p>
      <p className="mt-1 truncate font-mono text-[9.5px] text-ink-2">{detailFor(data.option)}</p>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

const nodeTypes = { step: StepCard };

function layout(t: Template): { nodes: StepNode[]; edges: Edge[] } {
  const depth: Record<string, number> = { [t.steps[0].id]: 0 };
  t.links.forEach(([s, d]) => (depth[d] = Math.max(depth[d] ?? 0, (depth[s] ?? 0) + 1)));
  const nodes = t.steps.map<StepNode>((s) => ({
    id: s.id,
    type: "step",
    position: { x: (depth[s.id] ?? 0) * 215, y: (t.rows?.[s.id] ?? 0) * 120 },
    data: { kind: s.kind, option: s.option },
  }));
  const edges = t.links.map<Edge>(([s, d]) => ({ id: `${s}-${d}`, source: s, target: d, animated: false }));
  return { nodes, edges };
}

function Canvas() {
  const [tpl, setTpl] = useState(templates[0].id);
  const start = useMemo(() => layout(templates.find((t) => t.id === tpl)!), [tpl]);
  const [nodes, setNodes, onNodesChange] = useNodesState<StepNode>(start.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(start.edges);
  const [adding, setAdding] = useState(false);
  const { fitView } = useReactFlow();

  useEffect(() => {
    setNodes(start.nodes);
    setEdges(start.edges);
    requestAnimationFrame(() => fitView({ padding: 0.12, duration: 300 }));
  }, [start, setNodes, setEdges, fitView]);

  const selected = nodes.find((n) => n.selected);
  const onConnect = useCallback((c: Connection) => setEdges((e) => addEdge({ ...c, animated: false }, e)), [setEdges]);

  const add = (kind: NodeKind) => {
    const id = `n${Date.now().toString(36)}`;
    const from = selected ?? nodes[nodes.length - 1];
    const pos = from ? { x: from.position.x + 215, y: from.position.y + 150 } : { x: 0, y: 0 };
    setNodes((ns) => [...ns.map((n) => ({ ...n, selected: false })), { id, type: "step", position: pos, selected: true, data: { kind, option: optionsFor(kind)[0] } }]);
    if (from) setEdges((es) => addEdge({ id: `${from.id}-${id}`, source: from.id, target: id }, es));
    setAdding(false);
  };
  const remove = () => {
    if (!selected) return;
    setNodes((ns) => ns.filter((n) => n.id !== selected.id));
    setEdges((es) => es.filter((e) => e.source !== selected.id && e.target !== selected.id));
  };
  const setOption = (v: string) => selected && setNodes((ns) => ns.map((n) => (n.id === selected.id ? { ...n, data: { ...n.data, option: v } } : n)));

  const tool = "inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors disabled:opacity-40";

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-3">
        <div role="tablist" aria-label="Templates" className="flex flex-wrap gap-1 rounded-full bg-bg-sunken p-1">
          {templates.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tpl === t.id}
              onClick={() => setTpl(t.id)}
              className={cn("h-9 rounded-full px-3.5 text-sm transition-colors", tpl === t.id ? "bg-bg-elev text-ink shadow-sm" : "text-ink-2 hover:text-ink")}
            >
              {t.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <div className="relative">
            <button type="button" aria-expanded={adding} onClick={() => setAdding((v) => !v)} className={cn(tool, "bg-blue text-on-blue hover:bg-blue-hover")}>
              <Plus className="h-4 w-4" aria-hidden="true" /> Add step
            </button>
            {adding && (
              <ul className="absolute right-0 top-12 z-20 w-48 rounded-[14px] border border-line bg-bg-elev p-1 shadow-lg">
                {nodeCatalog
                  .filter((c) => c.kind !== "trigger")
                  .map((c) => (
                    <li key={c.kind}>
                      <button type="button" onClick={() => add(c.kind)} className="flex w-full items-center justify-between rounded-[10px] px-3 py-2 text-left text-sm text-ink hover:bg-bg-sunken">
                        {c.label}
                        <span className="font-mono text-[10px] text-ink-3">{ownerName(c.kind).replace(" agent", "")}</span>
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <button type="button" onClick={remove} disabled={!selected} className={cn(tool, "border border-line-strong text-ink hover:border-ink-3")}>
            <Trash2 className="h-4 w-4" aria-hidden="true" /> Remove
          </button>
          <button type="button" onClick={() => { setNodes(start.nodes); setEdges(start.edges); }} aria-label="Reset template" className={cn(tool, "px-3 text-ink-2 hover:bg-bg-sunken")}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="relative min-h-0 flex-1">
        <ReactFlow
          className="ss-flow"
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          fitViewOptions={{ padding: 0.12 }}
          minZoom={0.4}
          maxZoom={1.5}
          preventScrolling={false}
          zoomOnScroll={false}
          proOptions={{ hideAttribution: false }}
        >
          <Background variant={BackgroundVariant.Dots} gap={22} size={1.2} color="var(--grid-dot)" />
          <Controls showInteractive={false} position="bottom-left" />
        </ReactFlow>
        {selected && (
          <div className="absolute bottom-3 right-3 z-10 w-[min(320px,calc(100%-24px))] rounded-[14px] border border-line bg-bg-elev p-3 shadow-lg">
            <label className="grid gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-blue-ink">{kindLabel(selected.data.kind)} · {ownerName(selected.data.kind)}</span>
              <select value={selected.data.option} onChange={(e) => setOption(e.target.value)} className="h-10 rounded-[10px] border border-line-strong bg-bg px-3 text-sm text-ink">
                {optionsFor(selected.data.kind).map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
          </div>
        )}
        {!selected && (
          <p className="pointer-events-none absolute bottom-4 right-4 hidden font-mono text-[11px] text-ink-3 md:block">Drag from a dot to connect · click a step to change it</p>
        )}
      </div>
    </div>
  );
}

export default function PlaygroundCanvas() {
  return (
    <ReactFlowProvider>
      <Canvas />
    </ReactFlowProvider>
  );
}
