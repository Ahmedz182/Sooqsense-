import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

/**
 * Brand typeface candidates (round 2). All four map to the same CSS variable,
 * `--font-brand`; only the one picked by NEXT_PUBLIC_FONT is applied in the
 * root layout. Once a font is chosen, delete the others and their files.
 */

/** Geist 1.8.2 (Vercel, SIL OFL). */
const geist = localFont({
  src: [{ path: "../fonts/Geist-Variable.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-brand",
  display: "swap",
});

/** General Sans (Fontshare, ITF Free Font License). */
const generalSans = localFont({
  src: [
    { path: "../fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-brand",
  display: "swap",
});

/** Instrument Sans (SIL OFL, via Fontsource 5.3.0 files). */
const instrumentSans = localFont({
  src: [
    { path: "../fonts/InstrumentSans-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/InstrumentSans-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/InstrumentSans-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-brand",
  display: "swap",
});

/** Satoshi (Fontshare, ITF Free Font License). */
const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Satoshi-700.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-brand",
  display: "swap",
});


/** Poppins (SIL OFL, via Fontsource 5.3.0 files). */
const poppins = localFont({
  src: [
    { path: "../fonts/Poppins-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Poppins-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Poppins-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-brand",
  display: "swap",
});

/** Raleway (SIL OFL, via Fontsource 5.3.0 files). */
const raleway = localFont({
  src: [
    { path: "../fonts/Raleway-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Raleway-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Raleway-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-brand",
  display: "swap",
});

/**
 * Helvetica is not licensable as a free web font, so this option uses the
 * visitor's installed Helvetica Neue / Helvetica (Apple devices) and falls
 * back to Arial elsewhere. See `.font-helvetica` in globals.css.
 */
const helvetica = { variable: "font-helvetica" } as const;

const brandFonts = { geist, general: generalSans, instrument: instrumentSans, satoshi, poppins, raleway, helvetica } as const;
export type BrandFont = keyof typeof brandFonts;

const choice = (process.env.NEXT_PUBLIC_FONT || "geist") as BrandFont;
export const brand = brandFonts[choice] ?? geist;

/** Data / UI labels. */
export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});
