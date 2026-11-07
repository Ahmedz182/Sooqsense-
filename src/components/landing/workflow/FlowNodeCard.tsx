"use client";

import { motion } from "motion/react";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/cn";
import { detailFor, kindLabel, type FlowNode } from "./model";

const spring = { type: "spring", stiffness: 520, damping: 30, mass: 0.7 } as const;

export function FlowNodeCard({
  node,
  option,
  editing,
  muted,
  onEdit,
  className,
}: {
  node: FlowNode;
  option: string;
  editing: boolean;
  muted?: boolean;
  onEdit: () => void;
  className?: string;
}) {
  const isYou = node.kind === "action";
  return (
    <motion.button
      type="button"
      onClick={onEdit}
      aria-expanded={editing}
      aria-controls="flow-editor"
      aria-label={`${kindLabel(node.kind)} step, run by ${node.owner}: ${option}. Change this step`}
      whileTap={{ scale: 0.97 }}
      transition={spring}
      className={cn(
        "group relative flex w-full flex-col rounded-[16px] border bg-bg-elev p-3 text-left shadow-sm transition-[border-color,box-shadow,opacity] duration-300 hover:border-blue hover:shadow-md",
        editing ? "border-amber shadow-[0_0_0_3px_var(--amber-soft)]" : "border-line",
        muted && "opacity-55",
        className,
      )}
    >
      <span className="flex items-center justify-between gap-2">
        <span className={cn("truncate font-mono text-[10px] font-medium uppercase tracking-[0.12em]", isYou ? "text-amber-ink" : "text-blue-ink")}>{node.owner}</span>
        <Pencil className="h-3 w-3 shrink-0 text-ink-3 opacity-60 transition-opacity group-hover:opacity-100" aria-hidden="true" />
      </span>
      <span className="mt-1 font-mono text-[10px] text-ink-3">
        {node.branch ? `${node.branch === "yes" ? "Yes" : "No"} · ` : ""}
        {kindLabel(node.kind)}
      </span>
      <motion.span
        key={`l-${option}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="mt-1.5 block text-[0.92rem] font-medium leading-tight text-ink"
      >
        {option}
      </motion.span>
      <span className="mt-1 block truncate font-mono text-[10px] text-ink-2">{detailFor(option)}</span>
    </motion.button>
  );
}
