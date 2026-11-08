"use client";

import { memo } from "react";
import { Handle, Position, useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { ChevronDown } from "lucide-react";
import type { NodeKind } from "@/config/demo";
import { cn } from "@/lib/cn";
import { BrandLogo } from "../shared/BrandLogo";
import { kindDot, logoFor } from "../workflows/flow";
import { labelOf, optionsOf } from "./templates";

export type StepData = { kind: NodeKind; option: string; note?: string };
export type StepNodeType = Node<StepData, "step">;

/** Canvas node: kind + an option picker right on the node. */
export const StepNode = memo(function StepNode({ id, data, selected }: NodeProps<StepNodeType>) {
  const { updateNodeData } = useReactFlow();
  const logo = logoFor(data.option);
  return (
    <div
      className={cn(
        "w-[220px] rounded-[var(--radius-md)] border bg-bg-elev px-3 py-2.5 transition-[border-color,box-shadow]",
        selected ? "border-amber shadow-[0_0_0_4px_var(--amber-soft)]" : "border-line-strong shadow-sm",
      )}
    >
      <Handle type="target" position={Position.Left} className="!h-2.5 !w-2.5 !border-2 !border-bg-elev !bg-amber" />
      <div className="flex items-center justify-between gap-2 text-xs text-ink-3">
        <span className="flex min-w-0 items-center gap-1.5">
          <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", kindDot[data.kind])} aria-hidden="true" />
          <span className="truncate">{labelOf(data.kind)}</span>
        </span>
      </div>
      <label className="relative mt-1.5 flex items-center gap-2">
        {logo && <BrandLogo id={logo} size="xs" decorative />}
        <span className="sr-only">{labelOf(data.kind)} option</span>
        <select
          value={data.option}
          onChange={(e) => updateNodeData(id, { option: e.target.value })}
          className="nodrag min-w-0 flex-1 cursor-pointer appearance-none truncate rounded-[var(--radius-sm)] bg-transparent py-1 pr-5 text-sm font-medium text-ink outline-none hover:bg-bg-sunken focus-visible:bg-bg-sunken"
        >
          {optionsOf(data.kind).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-0.5 h-3.5 w-3.5 text-ink-3" aria-hidden="true" />
      </label>
      {data.note && <p className="truncate text-[0.7rem] text-ink-3">{data.note}</p>}
      <Handle type="source" position={Position.Right} className="!h-2.5 !w-2.5 !border-2 !border-bg-elev !bg-amber" />
    </div>
  );
});
