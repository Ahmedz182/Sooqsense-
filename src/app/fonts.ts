import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

/** Headings — Clash Display (Fontshare, ITF Free Font License), self-hosted. */
export const clash = localFont({
  src: [
    { path: "../fonts/ClashDisplay-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ClashDisplay-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/ClashDisplay-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/ClashDisplay-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
});

/** Body — Satoshi (Fontshare, ITF Free Font License), self-hosted. */
export const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-300.woff2", weight: "300", style: "normal" },
    { path: "../fonts/Satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Satoshi-700.woff2", weight: "700", style: "normal" },
    { path: "../fonts/Satoshi-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

/** Data / UI labels. */
export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});
