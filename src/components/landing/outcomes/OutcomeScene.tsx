import { ArrowRight, Check, Clock } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";
import { Avatar } from "../shared/Avatar";
import { BrandLogo } from "../shared/BrandLogo";
import type { Scene, SceneStep } from "./scenes";

function StepLogo({ logo }: { logo: SceneStep["logo"] }) {
  if (logo === "sooqsense")
    return (
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] border border-line bg-[var(--logo-tile)]">
        <LogoMark className="h-5 w-5" />
      </span>
    );
  return <BrandLogo id={logo} size="sm" decorative />;
}

/**
 * A workflow outcome told as a scene: the person at the centre, the steps that ran
 * for them as floating product cards, and the before/after it adds up to.
 */
export function OutcomeScene({ scene, className }: { scene: Scene; className?: string }) {
  return (
    <figure data-scene className={cn("relative flex flex-col rounded-[var(--radius-xl)] border border-line bg-bg-elev p-5 sm:p-6", className)}>
      <figcaption className="flex items-center gap-3">
        <Avatar name={scene.person} size="md" />
        <div className="min-w-0">
          <p className="truncate font-semibold tracking-tight text-ink">{scene.title}</p>
          <p className="truncate text-xs text-ink-3">{scene.personNote}</p>
        </div>
      </figcaption>

      <ol className="relative mt-5 space-y-2">
        <span className="absolute top-4 bottom-4 left-[27px] w-px bg-line-strong" aria-hidden="true" />
        {scene.steps.map((s, i) => (
          <li
            key={i}
            data-scene-step
            className={cn(
              "relative flex items-center gap-3 rounded-[var(--radius-md)] border bg-window px-3 py-2.5",
              s.status === "approved" || s.status === "waiting" ? "border-amber shadow-[0_0_0_3px_var(--amber-soft)]" : "border-line",
              i % 2 === 1 && "sm:ml-3",
            )}
          >
            <StepLogo logo={s.logo} />
            <p className="min-w-0 flex-1 text-sm leading-snug text-ink">{s.text}</p>
            {s.who && s.status && <Avatar name={s.who} size="xs" />}
            <span className="tabular shrink-0 text-xs text-ink-3">{s.time}</span>
            {s.status === "waiting" ? (
              <Clock className="h-3.5 w-3.5 shrink-0 text-amber-ink" aria-label="Waiting for approval" />
            ) : (
              <Check className="h-3.5 w-3.5 shrink-0 text-mint" aria-label="Done" />
            )}
          </li>
        ))}
      </ol>

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-t border-line pt-4">
        <div>
          <p className="text-xs text-ink-3">Before</p>
          <p className="text-sm text-ink-2 line-through decoration-line-strong">{scene.before}</p>
        </div>
        <ArrowRight className="h-4 w-4 text-ink-3" aria-hidden="true" />
        <div>
          <p className="text-xs text-ink-3">With SooqSense</p>
          <p className="text-sm font-semibold text-ink">{scene.after}</p>
        </div>
      </div>
    </figure>
  );
}
