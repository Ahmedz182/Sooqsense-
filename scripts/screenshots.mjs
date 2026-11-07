#!/usr/bin/env node
/**
 * Captures the site for design review.
 *
 *   node scripts/screenshots.mjs --base http://localhost:3000 --out docs/screenshots
 *
 * For every route × theme (light, dark) × device (desktop 1440, mobile 390):
 *   - full/<route>-<theme>-<device>.png   full page, reduced motion (every section in its final state)
 *   - flow/<theme>-<device>/NN.png        home page only: viewport frames while scrolling, to show the story
 *
 * Uses the machine's Playwright (require('playwright')) — no project dependency.
 */
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
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
const out = args.out || "docs/screenshots";
const routes = (args.routes || "/,/pricing,/contact,/privacy,/terms").split(",");
const flowSteps = Number(args.steps || 14);

const devices = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};
const themes = ["light", "dark"];
const slug = (r) => (r === "/" ? "home" : r.replace(/^\//, "").replace(/\//g, "-"));

const browser = await chromium.launch();
try {
  for (const theme of themes) {
    for (const [deviceName, device] of Object.entries(devices)) {
      // Full-page captures with reduced motion: sections must render their final state.
      const ctx = await browser.newContext({ ...device, colorScheme: theme, reducedMotion: "reduce" });
      await ctx.addInitScript((t) => localStorage.setItem("theme", t), theme);
      const page = await ctx.newPage();
      await mkdir(path.join(out, "full"), { recursive: true });
      for (const route of routes) {
        await page.goto(base + route, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        // Walk the page so lazy/IntersectionObserver content mounts, then return to top.
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 600) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 60));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(400);
        const file = path.join(out, "full", `${slug(route)}-${theme}-${deviceName}.png`);
        await page.screenshot({ path: file, fullPage: true });
        console.log("saved", file);
      }
      await ctx.close();

      // Story flow: real motion, viewport frames while scrolling the home page.
      const fctx = await browser.newContext({ ...device, colorScheme: theme, deviceScaleFactor: 1 });
      await fctx.addInitScript((t) => localStorage.setItem("theme", t), theme);
      const fpage = await fctx.newPage();
      const dir = path.join(out, "flow", `${theme}-${deviceName}`);
      await mkdir(dir, { recursive: true });
      await fpage.goto(base + "/", { waitUntil: "networkidle" });
      await fpage.evaluate(() => document.fonts.ready);
      await fpage.waitForTimeout(1200);
      const total = await fpage.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
      for (let i = 0; i <= flowSteps; i++) {
        const y = Math.round((total * i) / flowSteps);
        if (device.isMobile) {
          await fpage.evaluate((yy) => window.scrollTo(0, yy), y);
        } else {
          const cur = await fpage.evaluate(() => window.scrollY);
          await fpage.mouse.move(720, 450);
          await fpage.mouse.wheel(0, y - cur);
        }
        await fpage.waitForTimeout(900);
        const file = path.join(dir, `${String(i).padStart(2, "0")}.png`);
        await fpage.screenshot({ path: file });
      }
      console.log("saved flow", dir);
      await fctx.close();
    }
  }
} finally {
  await browser.close();
}
