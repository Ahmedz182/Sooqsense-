"use client";

import { useRef } from "react";
import { showcaseVideos, type ShowcaseVideo } from "@/config/showcase";
import { HeroWindow } from "../hero/HeroWindow";
import { gsap, useScene } from "../shared/useScene";
import { VideoTile } from "./VideoTile";

const WIN_W = 1120; // the window is laid out at this width and scaled with transforms

/**
 * Right under the hero. The hero's product window rises into the centre of the
 * screen and holds the focus; as you keep scrolling it zooms out and dims while
 * a collage of feature videos zooms in around it. The clips overlap with feathered
 * edges (and blend like a double exposure) so they read as one film showing many
 * things at once.
 *
 * Desktop (≥1024px, motion allowed): pinned and scrubbed 1:1 to scroll.
 * Phones, tablets, reduced motion: the window, then an overlapping masonry of the same clips.
 */
export function Showcase() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ wide }, el) => {
    if (!wide) return;
    const q = gsap.utils.selector(el);
    const stage = q("[data-stage]")[0] as HTMLElement;
    const win = q("[data-win]")[0] as HTMLElement;
    const tilt = q("[data-tilt]")[0] as HTMLElement;
    const dim = q("[data-dim]")[0] as HTMLElement;
    const bg = q("[data-bg]")[0] as HTMLElement;
    const tiles = q("[data-tile]") as HTMLElement[];
    const captions = q("[data-caption]");

    const winH = () => win.offsetHeight;
    const endScale = () => Math.min((stage.clientWidth * 0.43) / WIN_W, (stage.clientHeight * 0.5) / winH());
    const startScale = () => Math.min((stage.clientWidth * 0.84) / WIN_W, (window.innerHeight * 0.74) / winH());

    // Approach: the window flattens and rises into the centre before the pin starts.
    gsap.fromTo(
      tilt,
      { rotateX: 14, transformPerspective: 1800, transformOrigin: "50% 0%" },
      { rotateX: 0, ease: "none", scrollTrigger: { trigger: el, start: "top 85%", end: "top top", scrub: true } },
    );
    gsap.set(win, { xPercent: -50, yPercent: -50, scale: startScale });
    gsap.fromTo(win, { y: -120 }, { y: 0, ease: "none", scrollTrigger: { trigger: el, start: "top 85%", end: "top top", scrub: true } });

    gsap.set(bg, { autoAlpha: 0 });
    gsap.set(dim, { autoAlpha: 0 });
    gsap.set(captions, { autoAlpha: 0, y: 8 });
    // Each clip waits just outside its place and farther from the centre than it ends up.
    tiles.forEach((t) => {
      const cx = Number(t.dataset.cx) - 50;
      const cy = Number(t.dataset.cy) - 50;
      gsap.set(t, { autoAlpha: 0, scale: 1.55, x: cx * 11, y: cy * 8, filter: "blur(10px)" });
    });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * 2)}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // The stage darkens, the window zooms out and steps back…
    tl.to(bg, { autoAlpha: 1, duration: 0.35 }, 0.05);
    tl.to(win, { scale: endScale, duration: 0.65, ease: "power1.inOut" }, 0.15);
    tl.to(dim, { autoAlpha: 1, duration: 0.3 }, 0.6);
    // …while the clips zoom in from outside and come into focus, nearest-to-centre first.
    const byDistance = [...tiles].sort((a, b) => dist(a) - dist(b));
    byDistance.forEach((t, i) => {
      tl.to(t, { autoAlpha: 1, scale: 1, x: 0, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power2.out" }, 0.3 + i * 0.055);
    });
    tl.to(captions, { autoAlpha: 1, y: 0, duration: 0.15, stagger: 0.02 }, 0.9);
    tl.to({}, { duration: 0.2 }, 1.1);
  });

  return (
    <section ref={root} aria-labelledby="showcase-title" className="relative">
      <h2 id="showcase-title" className="sr-only">
        SooqSense across a sales day: inbox, meetings, campaigns, approvals and pipeline
      </h2>

      {/* Desktop: pinned stage */}
      <div className="motion-stage">
        <div data-stage className="relative h-[100svh] overflow-hidden">
          <div data-bg className="absolute inset-0 bg-[var(--showcase-bg)]" />
          <div className="absolute inset-0">
            {showcaseVideos.map((v, i) => (
              <div
                key={v.id}
                data-tile
                data-cx={v.pos.x + v.pos.w / 2}
                data-cy={v.pos.y + v.pos.h / 2}
                className="absolute will-change-transform"
                style={{ left: `${v.pos.x}%`, top: `${v.pos.y}%`, width: `${v.pos.w}%`, height: `${v.pos.h}%`, zIndex: v.pos.z }}
              >
                <VideoTile video={v} delay={i * 2.3} caption={captionInset(v)} className="h-full w-full" />
              </div>
            ))}
          </div>
          <div data-win aria-hidden="true" className="absolute left-1/2 top-[52%] z-10 will-change-transform" style={{ width: WIN_W }}>
            <div data-tilt className="rounded-[var(--radius-lg)] shadow-[0_40px_120px_-30px_rgb(0_0_0/0.7)]">
              <HeroWindow />
            </div>
            <div data-dim className="pointer-events-none absolute inset-0 rounded-[var(--radius-lg)] bg-black/40" />
          </div>
        </div>
      </div>

      {/* Phones, tablets and reduced motion */}
      <div className="motion-stacked">
        <div className="container-x pb-10 pt-4">
          <div aria-hidden="true" className="mx-auto max-w-[1120px]">
            <HeroWindow />
          </div>
        </div>
        <div className="bg-[var(--showcase-bg)] pb-20 pt-8">
          <div className="mx-auto max-w-[56rem] gap-0 [column-gap:0] sm:columns-2">
            {showcaseVideos.map((v, i) => (
              <StackedTile key={v.id} video={v} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Keep each caption inside the visible stage (3–97% across, above 94% down). */
function captionInset({ pos }: ShowcaseVideo) {
  const left = Math.max(17, ((3 - pos.x) / pos.w) * 100 + 2);
  const right = Math.max(17, ((pos.x + pos.w - 97) / pos.w) * 100 + 2);
  const bottom = Math.max(19, ((pos.y + pos.h - 93) / pos.h) * 100);
  return { left, right, bottom };
}

function dist(el: HTMLElement) {
  const dx = Number(el.dataset.cx) - 50;
  const dy = Number(el.dataset.cy) - 50;
  return Math.hypot(dx, dy);
}

const shapeClass: Record<ShowcaseVideo["shape"], string> = {
  tall: "aspect-[4/5]",
  wide: "aspect-[16/10]",
  square: "aspect-square",
};

/** Phone/tablet collage: clips stagger left/right and overlap vertically, edges feathered. */
function StackedTile({ video, index }: { video: ShowcaseVideo; index: number }) {
  const left = index % 2 === 0;
  return (
    <div
      className={`relative -mb-12 break-inside-avoid sm:-mb-16 ${left ? "mr-6 sm:mr-0" : "ml-6 sm:ml-0"}`}
      style={{ zIndex: 10 - (index % 4) }}
    >
      <VideoTile video={video} delay={index * 2.3} feather={13} className={`w-full ${shapeClass[video.shape]}`} />
    </div>
  );
}
