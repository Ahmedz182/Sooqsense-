"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { ShowcaseVideo } from "@/config/showcase";
import { cn } from "@/lib/cn";

/**
 * Muted, looping, inline video that only plays while it is on screen.
 * The edges are feathered (see .feather) so tiles melt into their neighbours.
 */
export function VideoTile({
  video,
  className,
  delay = 0,
  caption,
  feather,
}: {
  video: ShowcaseVideo;
  className?: string;
  delay?: number;
  /** Caption inset in % of the tile (left/right/bottom), to keep it inside the visible stage. */
  caption?: { left: number; right: number; bottom: number };
  /** Feather width in % of the tile (default 24). */
  feather?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className={cn("feather relative overflow-hidden", className)} style={feather ? ({ "--f": `${feather}%` } as CSSProperties) : undefined}>
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-hidden="true"
        className="kenburns h-full w-full object-cover brightness-[0.86] saturate-[1.05]"
        style={{ animationDelay: `${-delay}s` }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
      <figcaption
        data-caption
        className="absolute text-sm font-medium leading-snug text-white drop-shadow"
        style={{ left: `${caption?.left ?? 17}%`, right: `${caption?.right ?? 17}%`, bottom: `${caption?.bottom ?? 19}%` }}
      >
        {video.title}
      </figcaption>
    </figure>
  );
}
