import { SiteShell } from "@/components/layout/SiteShell";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="container-x py-32 text-center">
        <p className="eyebrow">404</p>
        <h1 className="text-h1 mt-4 font-semibold">This page went cold.</h1>
        <p className="text-lead mx-auto mt-4 max-w-md text-ink-2">Unlike your deals, this one we couldn&rsquo;t save.</p>
        <ButtonLink href="/" className="mt-8">
          Back to home
        </ButtonLink>
      </section>
    </SiteShell>
  );
}
