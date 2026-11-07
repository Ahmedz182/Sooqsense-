import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type BuildMetadataInput = {
  title?: string;
  description?: string;
  /** Path beginning with "/", used for the canonical URL. */
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
};

/**
 * One helper for every page's <head>: title, description, canonical, keywords,
 * Open Graph and Twitter cards. OG images come from each route's opengraph-image.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  keywords = [],
  noIndex = false,
}: BuildMetadataInput = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} — ${siteConfig.tagline}`;
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description,
    keywords: [...new Set([...keywords, ...siteConfig.keywords])],
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "Business Software",
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitter,
      creator: siteConfig.twitter,
      title: fullTitle,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    formatDetection: { email: false, telephone: false, address: false },
  };
}
