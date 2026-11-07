import { Check, Minus } from "lucide-react";
import { comparison, plans } from "@/config/pricing";

function Cell({ v }: { v: string | boolean }) {
  if (v === true) return <Check className="mx-auto h-4 w-4 text-mint" aria-label="Included" />;
  if (v === false) return <Minus className="mx-auto h-4 w-4 text-line-strong" aria-label="Not included" />;
  return <span className="text-sm text-ink">{v}</span>;
}

/** Plan comparison, read straight from config. Scrolls sideways inside itself on phones. */
export function ComparisonTable() {
  return (
    <div className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)]">
      <table className="w-full min-w-[620px] border-collapse text-left">
        <caption className="sr-only">Compare SooqSense plans</caption>
        <thead>
          <tr className="border-b border-line-strong">
            <th scope="col" className="w-[40%] py-4 pr-4 font-mono text-xs font-normal tracking-wide text-ink-3 uppercase">
              Feature
            </th>
            {plans.map((p) => (
              <th key={p.id} scope="col" className="py-4 text-center font-display text-lg font-semibold text-ink">
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        {comparison.map((g) => (
          <tbody key={g.group}>
            <tr>
              <th colSpan={4} scope="colgroup" className="pt-8 pb-2 font-mono text-xs font-normal tracking-[0.14em] text-amber-ink uppercase">
                {g.group}
              </th>
            </tr>
            {g.rows.map((r) => (
              <tr key={r.label} className="border-b border-line">
                <th scope="row" className="py-3.5 pr-4 text-sm font-normal text-ink-2">
                  {r.label}
                </th>
                {r.values.map((v, i) => (
                  <td key={i} className="py-3.5 text-center">
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
