/**
 * Showcase video collage (section right under the hero).
 *
 * PLACEHOLDER CLIPS: free stock footage from Mixkit (Mixkit Stock Video Free
 * License — commercial use allowed, no attribution required), streamed from
 * Mixkit's CDN. Replace each `src` with a real SooqSense product/feature video
 * (muted, short, seamless loop, ~720p H.264 MP4) — nothing else needs to change.
 *
 * `pos` places the clip on the desktop collage, in % of the stage. Neighbouring
 * clips overlap on purpose: their edges are feathered, so they dissolve into
 * one another like a single multi-exposure film.
 */
const mixkit = (id: number) => `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`;

export type ShowcaseVideo = {
  id: string;
  title: string;
  src: string;
  poster?: string;
  /** Desktop collage box, % of the stage (x/y = top-left). */
  pos: { x: number; y: number; w: number; h: number; z: number };
  /** Phone collage shape. */
  shape: "tall" | "wide" | "square";
};

export const showcaseVideos: ShowcaseVideo[] = [
  { id: "meetings", title: "Meeting notes, written for you", src: mixkit(46675), pos: { x: -4, y: -6, w: 36, h: 50, z: 2 }, shape: "wide" },
  { id: "inbox", title: "Inbox sorted before coffee", src: mixkit(206), pos: { x: 22, y: -8, w: 34, h: 42, z: 3 }, shape: "square" },
  { id: "outbound", title: "Outbound while you sleep", src: mixkit(17450), pos: { x: 48, y: -6, w: 32, h: 44, z: 2 }, shape: "tall" },
  { id: "approve", title: "Approve from your phone", src: mixkit(4915), pos: { x: 70, y: -8, w: 36, h: 54, z: 3 }, shape: "wide" },
  { id: "campaigns", title: "Campaigns that run themselves", src: mixkit(42620), pos: { x: -8, y: 30, w: 38, h: 46, z: 4 }, shape: "tall" },
  { id: "pipeline", title: "Pipeline that updates itself", src: mixkit(42664), pos: { x: 68, y: 36, w: 42, h: 46, z: 4 }, shape: "square" },
  { id: "deal-team", title: "Your deal team in one view", src: mixkit(4809), pos: { x: -6, y: 62, w: 52, h: 50, z: 3 }, shape: "wide" },
  { id: "log-off", title: "Log off on time", src: mixkit(4954), pos: { x: 38, y: 64, w: 68, h: 48, z: 3 }, shape: "tall" },
];
