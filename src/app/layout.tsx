import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { brand, jetbrains } from "./fonts";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, organizationLd, websiteLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f4ec" },
    { media: "(prefers-color-scheme: dark)", color: "#121110" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${brand.variable} ${jetbrains.variable}`}>
      <body>
        <ThemeProvider>
          <SmoothScroll />
          {children}
        </ThemeProvider>
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}
