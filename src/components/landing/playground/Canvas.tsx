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
import { Play, Plus, RotateCcw, Trash2 } from "lucide-react";
import type { NodeKind } from "@/config/demo";
import { catalog, newId, optionsOf, type Template } from "./templates";
import { StepNode, type StepNodeType } from "./StepNode";

const nodeTypes = { step: StepNode };
const GAP = 260;
const ROW = 160;
const PER_ROW = 8;
const at = (i: number) => ({ x: (i % PER_ROW) * GAP, y: Math.floor(i / PER_ROW) * ROW });
const fit = { padding: 0.08, maxZoom: 1 };

function build(t: Template): { nodes: StepNodeType[]; edges: Edge[] } {
  const nodes: StepNodeType[] = t.steps.map((s, i) => ({ id: s.id, type: "step", position: at(i), data: { kind: s.kind, option: s.option, note: s.note } }));
  const edges: Edge[] = t.steps.slice(1).map((s, i) => ({ id: `e-${t.steps[i].id}-${s.id}`, source: t.steps[i].id, target: s.id }));
  if (t.fork) {
    // Fork drops below the branch so the canvas stays wide and readable, not one long row.
    const last = t.steps[t.steps.length - 1];
    const p = at(t.steps.length - 1);
    t.fork.forEach((f, k) => {
      nodes.push({ id: f.id, type: "step", position: { x: p.x + (k === 0 ? -GAP / 2 : GAP / 2), y: p.y + ROW }, data: { kind: f.kind, option: f.option, note: f.note } });
      edges.push({ id: `e-${last.id}-${f.id}`, source: last.id, target: f.id, label: f.note });
    });
    if (t.after) {
      nodes.push({ id: t.after.id, type: "step", position: { x: p.x, y: p.y + ROW * 2 }, data: { kind: t.after.kind, option: t.after.option, note: t.after.note } });
      t.fork.forEach((f) => edges.push({ id: `e-${f.id}-${t.after!.id}`, source: f.id, target: t.after!.id }));
    }
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

  // Run: light up each step in order (breadth-first from the trigger), edges flowing.
  const [running, setRunning] = useState(false);
  const timers = useRef<number[]>([]);
  const run = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const ids = nodes.map((n) => n.id);
    const incoming = new Set(edges.map((e) => e.target));
    const order: string[] = [];
    const queue = ids.filter((id) => !incoming.has(id));
    while (queue.length) {
      const id = queue.shift()!;
      if (order.includes(id)) continue;
      order.push(id);
      edges.filter((e) => e.source === id).forEach((e) => queue.push(e.target));
    }
    ids.forEach((id) => !order.includes(id) && order.push(id));
    setRunning(true);
    setNodes((ns) => ns.map((n) => ({ ...n, data: { ...n.data, run: undefined } })));
    setEdges((es) => es.map((e) => ({ ...e, animated: true })));
    const STEP = 650;
    order.forEach((id, i) => {
      timers.current.push(window.setTimeout(() => setNodes((ns) => ns.map((n) => (n.id === id ? { ...n, data: { ...n.data, run: "running" } } : n))), i * STEP));
      timers.current.push(window.setTimeout(() => setNodes((ns) => ns.map((n) => (n.id === id ? { ...n, data: { ...n.data, run: "done" } } : n))), i * STEP + STEP * 0.85));
    });
    timers.current.push(
      window.setTimeout(() => {
        setRunning(false);
        setEdges((es) => es.map((e) => ({ ...e, animated: false })));
      }, order.length * STEP + 200),
    );
  }, [nodes, edges, setNodes, setEdges]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Run once on first view so visitors see it working (skipped under reduced motion).
  const autoRan = useRef(false);
  useEffect(() => {
    if (autoRan.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    autoRan.current = true;
    const t = window.setTimeout(run, 900);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <button type="button" onClick={run} disabled={running} className="inline-flex h-10 items-center gap-1.5 rounded-full bg-amber px-4 text-sm font-medium text-on-amber transition-colors hover:bg-amber-hover disabled:opacity-70">
          <Play className="h-4 w-4" aria-hidden="true" /> {running ? "Running…" : "Test run"}
        </button>
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
        {running ? "Running with Mira Haddad’s email…" : `${nodes.length} steps · ${edges.length} connections · drag from a dot to connect`}
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
