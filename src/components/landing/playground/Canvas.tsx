"use client";

import "@xyflow/react/dist/style.css";
import "./playground.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Connection,
  type Edge,
} from "@xyflow/react";
import { useTheme } from "next-themes";
import { Plus, RotateCcw, Trash2 } from "lucide-react";
import type { NodeKind } from "@/config/demo";
import { catalog, newId, optionsOf, type Template } from "./templates";
import { StepNode, type StepNodeType } from "./StepNode";

const nodeTypes = { step: StepNode };
const GAP = 260;
const ROW = 150;
const PER_ROW = 8;
const at = (i: number) => ({ x: (i % PER_ROW) * GAP, y: Math.floor(i / PER_ROW) * ROW });
const fit = { padding: 0.08, maxZoom: 1 };

function build(t: Template): { nodes: StepNodeType[]; edges: Edge[] } {
  const nodes: StepNodeType[] = t.steps.map((s, i) => ({ id: s.id, type: "step", position: at(i), data: { kind: s.kind, option: s.option, note: s.note } }));
  const edges: Edge[] = t.steps.slice(1).map((s, i) => ({ id: `e-${t.steps[i].id}-${s.id}`, source: t.steps[i].id, target: s.id }));
  if (t.fork) {
    const last = t.steps[t.steps.length - 1];
    const p = at(t.steps.length);
    t.fork.forEach((f, k) => {
      nodes.push({ id: f.id, type: "step", position: { x: p.x, y: p.y + (k === 0 ? -60 : 60) }, data: { kind: f.kind, option: f.option, note: f.note } });
      edges.push({ id: `e-${last.id}-${f.id}`, source: last.id, target: f.id, label: f.note });
    });
  }
  return { nodes, edges };
}

function Flow({ template }: { template: Template }) {
  const initial = useMemo(() => build(template), [template]);
  const [nodes, setNodes, onNodesChange] = useNodesState<StepNodeType>(initial.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initial.edges);
  const [menu, setMenu] = useState(false);
  const { fitView, deleteElements } = useReactFlow();
  const { resolvedTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  const reset = useCallback(() => {
    setNodes(initial.nodes);
    setEdges(initial.edges);
    requestAnimationFrame(() => fitView({ ...fit, duration: 400 }));
  }, [initial, setNodes, setEdges, fitView]);

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (!menu) return;
    const close = (e: PointerEvent) => !menuRef.current?.contains(e.target as Node) && setMenu(false);
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [menu]);

  const onConnect = useCallback((c: Connection) => setEdges((es) => addEdge({ ...c, id: `e-${c.source}-${c.target}-${newId()}` }, es)), [setEdges]);

  const selected = nodes.filter((n) => n.selected);

  function add(kind: NodeKind) {
    const from = selected[0] ?? [...nodes].sort((a, b) => b.position.x - a.position.x || b.position.y - a.position.y)[0];
    const id = newId();
    const taken = (x: number, y: number) => nodes.some((n) => Math.abs(n.position.x - x) < 60 && Math.abs(n.position.y - y) < 70);
    let pos = from ? { x: from.position.x + GAP, y: from.position.y } : { x: 0, y: 0 };
    while (taken(pos.x, pos.y)) pos = { ...pos, y: pos.y + 130 };
    setNodes((ns) => [...ns.map((n) => ({ ...n, selected: false })), { id, type: "step", position: pos, selected: true, data: { kind, option: optionsOf(kind)[0] } }]);
    if (from) setEdges((es) => [...es, { id: `e-${from.id}-${id}`, source: from.id, target: id }]);
    setMenu(false);
    requestAnimationFrame(() => fitView({ ...fit, duration: 400 }));
  }

  const btn =
    "inline-flex h-10 items-center gap-1.5 rounded-full border border-line-strong bg-bg-elev px-4 text-sm text-ink-2 transition-colors hover:border-ink-3 hover:text-ink disabled:opacity-45 disabled:hover:border-line-strong";

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      colorMode={resolvedTheme === "dark" ? "dark" : "light"}
      fitView
      fitViewOptions={fit}
      minZoom={0.4}
      maxZoom={1.6}
      deleteKeyCode={["Backspace", "Delete"]}
      defaultEdgeOptions={{ type: "smoothstep" }}
      preventScrolling={false}
      zoomOnScroll={false}
      className="pg-flow"
      aria-label="Workflow playground canvas"
    >
      <Background variant={BackgroundVariant.Dots} gap={22} size={1.1} />
      <Controls showInteractive={false} position="bottom-right" />
      <Panel position="top-left" className="!m-3 flex flex-wrap gap-2">
        <div ref={menuRef} className="relative">
          <button type="button" className={btn} aria-expanded={menu} onClick={() => setMenu((v) => !v)}>
            <Plus className="h-4 w-4" aria-hidden="true" /> Add step
          </button>
          {menu && (
            <ul className="absolute top-12 left-0 z-10 w-60 rounded-[var(--radius-md)] border border-line bg-bg-elev p-1.5 shadow-lg">
              {catalog.map((c) => (
                <li key={c.kind}>
                  <button type="button" onClick={() => add(c.kind)} className="flex min-h-10 w-full items-center rounded-[var(--radius-sm)] px-3 text-left text-sm text-ink-2 hover:bg-bg-sunken hover:text-ink">
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="button" className={btn} disabled={!selected.length} onClick={() => deleteElements({ nodes: selected.map((n) => ({ id: n.id })) })}>
          <Trash2 className="h-4 w-4" aria-hidden="true" /> Remove
        </button>
        <button type="button" className={btn} onClick={reset}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset
        </button>
      </Panel>
      <Panel position="bottom-left" className="!m-3 text-xs text-ink-3">
        {nodes.length} steps · {edges.length} connections · drag from a dot to connect
      </Panel>
    </ReactFlow>
  );
}

/** Desktop playground: a real React Flow canvas. Loaded lazily, only near the viewport. */
export default function Canvas({ template }: { template: Template }) {
  return (
    <ReactFlowProvider>
      <Flow template={template} />
    </ReactFlowProvider>
  );
}
