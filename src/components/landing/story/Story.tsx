import { StoryStacked } from "./StoryStacked";
import { StoryStage } from "./StoryStage";

/** The centrepiece: one deal, five chapters, one product window. */
export function Story() {
  return (
    <section id="product" aria-labelledby="story-title" className="scroll-mt-[var(--header-h)] border-t border-line">
      <h2 id="story-title" className="sr-only">
        How SooqSense works one lead, from first email to updated deal
      </h2>
      <StoryStage />
      <StoryStacked />
    </section>
  );
}
