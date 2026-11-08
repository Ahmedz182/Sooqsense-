#!/usr/bin/env node
/**
 * Records a slow scroll through the home page for design review.
 *
 *   node scripts/record-video.mjs --base http://localhost:3000 --out docs/screenshots/v4/video \
 *     --theme light --device desktop --seconds 32 --name home-light-desktop
 *
 * Desktop scrolls with the mouse wheel (smooth scroll + scrubbed scenes), mobile with
 * touch-style scrollTo steps. Uses the machine's Playwright, like screenshots.mjs.
 */
import { createRequire } from "node:module";
import { mkdir, rename, readdir, rm } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
let playwright;
try {
  playwright = require("playwright");
} catch {
  playwright = require(path.join(process.env.NODE_PATH || "/usr/lib/node_modules", "playwright"));
}
const { chromium } = playwright;

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, cur, i, arr) => (cur.startsWith("--") ? [...acc, [cur.slice(2), arr[i + 1]]] : acc), []),
);
const base = (args.base || "http://localhost:3000").replace(/\/$/, "");
const out = args.out || "docs/screenshots/video";
const theme = args.theme || "light";
const mobile = (args.device || "desktop") === "mobile";
const seconds = Number(args.seconds || 32);
const name = args.name || `home-${theme}-${mobile ? "mobile" : "desktop"}`;

const viewport = mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 };
const tmp = path.join(out, `.tmp-${name}`);
await mkdir(tmp, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport,
  isMobile: mobile,
  hasTouch: mobile,
  deviceScaleFactor: 1,
  colorScheme: theme,
  recordVideo: { dir: tmp, size: viewport },
});
await ctx.addInitScript((t) => localStorage.setItem("theme", t), theme);
const page = await ctx.newPage();
await page.goto(base + "/", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1500);

const total = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
const frames = Math.round((seconds - 3) * 10);
const per = total / frames;
// Keep the pointer in the page margin so interactive canvases never capture the wheel.
await page.mouse.move(40, viewport.height / 2);
for (let i = 1; i <= frames; i++) {
  if (mobile) await page.evaluate((y) => window.scrollTo(0, y), Math.round(per * i));
  else await page.mouse.wheel(0, per);
  // Recording slows each wheel call, so desktop waits less per step to keep the pace.
  await page.waitForTimeout(mobile ? 100 : 50);
}
await page.waitForTimeout(1500);
await page.close();
await ctx.close();
await browser.close();

const [file] = (await readdir(tmp)).filter((f) => f.endsWith(".webm"));
const dest = path.join(out, `${name}.webm`);
await rename(path.join(tmp, file), dest);
await rm(tmp, { recursive: true, force: true });
console.log("saved", dest);
