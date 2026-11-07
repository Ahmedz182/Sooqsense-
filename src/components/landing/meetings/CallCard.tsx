import { ToolMark } from "../ToolMark";
import { story } from "../story";

const bars = [6, 14, 9, 22, 30, 18, 11, 26, 34, 20, 12, 8, 16, 28, 22, 10, 6, 18, 24, 14, 9, 20, 30, 16, 8, 12, 22, 18, 10, 6];

/** The 15:30 discovery call between Ahmed and Mira, as SooqSense sees it. */
export function CallCard() {
  return (
    <div className="paper overflow-hidden" role="img" aria-label="Video call between Ahmed Fayyaz and Mira Haddad, recorded and transcribed, 32 minutes 14 seconds.">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <span className="flex items-center gap-2 text-sm font-medium text-ink">
          <ToolMark id="zoom" size="xs" /> Carthage Labs × SooqSense
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[0.7rem] text-rose">
          <span className="h-2 w-2 animate-pulse rounded-full bg-rose" /> REC 32:14
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 p-2">
        {[
          { i: story.owner.initials, n: story.owner.name, r: "London" },
          { i: story.lead.initials, n: story.lead.name, r: "Boston" },
        ].map((p, k) => (
          <div key={p.n} className="relative grid aspect-[4/3] place-items-center rounded-[var(--radius-md)] bg-bg-sunken">
            <span className={k === 0 ? "grid h-14 w-14 place-items-center rounded-full bg-amber-soft font-display text-lg text-amber-ink" : "grid h-14 w-14 place-items-center rounded-full bg-blue-soft font-display text-lg text-blue"}>
              {p.i}
            </span>
            <span className="absolute bottom-2 left-2 rounded-full bg-bg-elev/90 px-2 py-0.5 text-[0.7rem] text-ink-2">
              {p.n} · {p.r}
            </span>
            {k === 1 && <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-mint ring-4 ring-mint-soft" aria-hidden="true" />}
          </div>
        ))}
      </div>
      <div className="flex h-12 items-center gap-[3px] px-4" aria-hidden="true">
        {bars.map((h, i) => (
          <span key={i} className="w-full rounded-full bg-amber/70" style={{ height: `${h}px` }} />
        ))}
      </div>
      <p className="border-t border-line px-4 py-3 font-mono text-[0.7rem] text-ink-3">Recorded with consent · Tue 15:30–16:02 · Notes taken by SooqSense</p>
    </div>
  );
}
