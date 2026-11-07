import { siteConfig } from "@/config/site";
import { TrialButton } from "@/components/ui/TrialButton";
import { ButtonLink } from "@/components/ui/Button";
import { LiveClocks } from "./LiveClocks";
import { HeroStage } from "./HeroStage";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="wash-amber pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" aria-hidden="true" />
      <div className="container-x grid items-center gap-12 pt-10 pb-8 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pt-20">
        <div className="max-w-[40rem]">
          <LiveClocks />
          <h1 id="hero-title" className="text-display mt-6 font-semibold">
            Your sales stack, folded into <span className="text-amber-ink">one agent.</span>
          </h1>
          <p className="text-lead mt-6 max-w-[34rem] text-ink-2">
            SooqSense reads every form fill, email and call, then runs the next step as a workflow: enrich the lead, score it, draft the
            follow-up, update HubSpot. Nothing leaves your outbox until you say so.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TrialButton />
            <ButtonLink href={siteConfig.demoUrl} variant="secondary" size="lg">
              Book a demo
            </ButtonLink>
          </div>
          <p className="mt-4 font-mono text-xs text-ink-3">{siteConfig.trial.note} · Works with HubSpot &amp; Salesforce</p>
        </div>
        <HeroStage />
      </div>
    </section>
  );
}
