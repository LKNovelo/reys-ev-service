import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ray's EV Service — Mobile Tesla Repair, LA to San Diego";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at the edge so link previews (iMessage, Slack, Facebook, X) show a
 * branded card instead of a blank box. No binary asset to keep in sync.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f3a00",
          padding: "70px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
              marginBottom: 28,
            }}
          >
            Veteran-Owned · Tesla Toolbox 3 Certified
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: -1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Your Tesla.</span>
            <span>
              Fixed <span style={{ color: "#F5A623" }}>where you are.</span>
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.22)",
            paddingTop: 30,
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", color: "#fff" }}
          >
            <span style={{ fontSize: 34, fontWeight: 700 }}>
              Ray&apos;s EV Service
            </span>
            <span style={{ fontSize: 24, color: "rgba(255,255,255,0.7)" }}>
              Mobile EV Repair · LA to San Diego
            </span>
          </div>
          <div
            style={{
              display: "flex",
              background: "#F5A623",
              color: "#1A1A1A",
              fontSize: 30,
              fontWeight: 700,
              padding: "16px 30px",
              borderRadius: 12,
            }}
          >
            (951) 622-6222
          </div>
        </div>
      </div>
    ),
    size
  );
}
