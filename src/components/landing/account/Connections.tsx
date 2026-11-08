import { owner } from "@/config/demo";
import { cn } from "@/lib/cn";
import { Avatar } from "../shared/Avatar";
import { account } from "../shared/people";

type NodePos = { name: string; title: string; x: number; y: number; ours?: boolean; key?: boolean };

/** Positions in % of the graph box. Our side on the left, the account on the right. */
const nodes: NodePos[] = [
  { name: owner.name, title: "You", x: 11, y: 28, ours: true },
  { name: "Noah Becker", title: "Your SE", x: 11, y: 78, ours: true },
  { name: "Mira Haddad", title: "VP RevOps · Champion", x: 46, y: 30, key: true },
  { name: "Owen Price", title: "CFO · Economic buyer", x: 84, y: 14 },
  { name: "Marcus Hale", title: "Head of Sales", x: 84, y: 50 },
  { name: "Elena Novak", title: "Sales Ops", x: 70, y: 84 },
  { name: "Grace Okafor", title: "IT & Security", x: 40, y: 82 },
];

const pos = (n: string) => nodes.find((x) => x.name === n)!;

/** Who knows whom at the account: lines draw on scroll (scrubbed). Wide screens only. */
export function ConnectionsGraph() {
  return (
    <div className="relative h-[320px]">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {account.links.map(([a, b], i) => {
          const A = pos(a);
          const B = pos(b);
          const warm = a === owner.name;
          return (
            <line
              key={i}
              data-link
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              pathLength={1}
              stroke={warm ? "var(--amber)" : "var(--line-strong)"}
              strokeWidth={warm ? 2 : 1.25}
              strokeDasharray={a === "Noah Becker" ? "0.03 0.025" : undefined}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>
      {nodes.map((n) => (
        <div
          key={n.name}
          data-person
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <Avatar
            name={n.name}
            initials={n.name === owner.name ? owner.initials : undefined}
            tone="amber"
            size={n.key ? "lg" : "md"}
            className={cn(n.key && "ring-2 ring-amber ring-offset-2 ring-offset-window")}
          />
          <p className="mt-1.5 text-xs font-medium whitespace-nowrap text-ink">{n.name}</p>
          <p className="text-[0.6875rem] whitespace-nowrap text-ink-3">{n.title}</p>
        </div>
      ))}
    </div>
  );
}

/** Phones: the same relationships as a short list. */
export function ConnectionsList() {
  return (
    <ul className="divide-y divide-line">
      {account.people.map((p) => {
        return (
          <li key={p.name} className="flex items-center gap-3 py-3">
            <Avatar name={p.name} size="md" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">
                {p.name} <span className="font-normal text-ink-3">· {p.title}</span>
              </p>
              <p className="truncate text-xs text-ink-3">
                {p.role} · {p.note}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
