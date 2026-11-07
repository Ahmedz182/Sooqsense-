import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social card for every route (routes may add their own). */
export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#16130f", color: "#f4efe6" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "#f0a54a" }} />
          <div style={{ fontSize: 36, fontWeight: 600 }}>sooqsense</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>Your whole sales stack.</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, color: "#f0a54a" }}>One agent.</div>
        </div>
        <div style={{ fontSize: 28, color: "#cdc5b7" }}>Agentic CRM · AI sales workflows · Meetings · Campaigns</div>
      </div>
    ),
    size,
  );
}
