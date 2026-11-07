import { Check, Minus } from "lucide-react";
import { comparison, plans } from "@/config/pricing";
import { cn } from "@/lib/cn";

const Cell = ({ v }: { v: string | boolean }) =>
  v === true ? (
    <Check className="mx-auto h-4 w-4 text-blue" aria-label="Included" />
  ) : v === false ? (
    <Minus className="mx-auto h-4 w-4 text-ink-3" aria-label="Not included" />
  ) : (
    <span className="font-mono text-[10px] text-ink sm:text-xs">{v}</span>
  );

export function ComparisonTable() {
  return (
    <div className="rounded-[var(--radius-xl)] border border-line bg-bg-elev">
      <table className="w-full table-fixed border-collapse text-left text-sm">
        <caption className="sr-only">Feature comparison across plans</caption>
        <colgroup>
          <col className="w-[46%] sm:w-[40%]" />
          {plans.map((p) => (
            <col key={p.id} />
          ))}
        </colgroup>
        <thead className="sticky top-[var(--header-h)] z-10 bg-bg-elev">
          <tr className="border-b border-line">
            <th scope="col" className="rounded-tl-[var(--radius-xl)] p-3 font-normal text-ink-3 sm:p-4">
              <span className="sr-only">Feature</span>
            </th>
            {plans.map((p) => (
              <th key={p.id} scope="col" className={cn("p-3 text-center font-display text-base font-semibold sm:p-4 sm:text-lg", p.highlight && "text-amber-ink")}>
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        {comparison.map((g) => (
          <tbody key={g.group}>
            <tr>
              <th colSpan={4} scope="colgroup" className="bg-bg-sunken px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-blue-ink sm:px-4">
                {g.group}
              </th>
            </tr>
            {g.rows.map((r) => (
              <tr key={r.label} className="border-t border-line">
                <th scope="row" className="p-3 text-[13px] font-normal text-ink-2 sm:p-4 sm:text-sm">
                  {r.label}
                </th>
                {r.values.map((v, i) => (
                  <td key={i} className={cn("p-2 text-center sm:p-4", plans[i].highlight && "bg-[color-mix(in_oklab,var(--bg-elev)_94%,var(--amber))]")}>
                    <Cell v={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
