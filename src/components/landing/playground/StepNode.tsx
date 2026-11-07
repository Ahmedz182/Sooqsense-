"use client";

import { memo } from "react";
import { Handle, Position, useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import type { NodeKind } from "@/config/demo";
import { cn } from "@/lib/cn";
import { kindTone, labelOf, optionsOf } from "./templates";

export type StepData = { kind: NodeKind; option: string; note?: string };
export type StepNodeType = Node<StepData, "step">;

/** A canvas node: kind chip + an option picker (guided edit, right on the node). */
export const StepNode = memo(function StepNode({ id, data, selected }: NodeProps<StepNodeType>) {
  const { updateNodeData } = useReactFlow();
  return (
    <div
      className={cn(
        "w-[212px] rounded-[var(--radius-md)] border bg-bg-elev p-3 shadow-sm transition-[border-color,box-shadow]",
        selected ? "border-amber shadow-[0_0_0_4px_var(--amber-soft)]" : "border-line-strong",
      )}
    >
      <Handle type="target" position={Position.Left} className="!h-3 !w-3 !border-2 !border-bg-elev !bg-amber" />
      <div className="flex items-center justify-between gap-2">
        <span className={cn("rounded-full px-2 py-0.5 font-mono text-[0.6rem] tracking-wide uppercase", kindTone[data.kind])}>{labelOf(data.kind)}</span>
        {data.note && <span className="truncate font-mono text-[0.6rem] text-ink-3">{data.note}</span>}
      </div>
      <label className="mt-2 block">
        <span className="sr-only">{labelOf(data.kind)} option</span>
        <select
          value={data.option}
          onChange={(e) => updateNodeData(id, { option: e.target.value })}
          className="nodrag w-full cursor-pointer appearance-none truncate rounded-[var(--radius-sm)] bg-transparent py-1 pr-1 text-sm font-medium text-ink outline-none hover:bg-bg-sunken focus-visible:bg-bg-sunken"
        >
          {optionsOf(data.kind).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
      <Handle type="source" position={Position.Right} className="!h-3 !w-3 !border-2 !border-bg-elev !bg-amber" />
    </div>
  );
});
