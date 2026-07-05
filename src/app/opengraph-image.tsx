import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const runtime = "edge";
export const alt = `${site.name} - ${site.tagline}`;
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0A",
          backgroundImage:
            "radial-gradient(circle at 24% 18%, rgba(84,112,255,0.34), transparent 30%), radial-gradient(circle at 84% 16%, rgba(161,105,255,0.24), transparent 28%)",
          color: "white",
          fontFamily: "Inter, Arial, sans-serif"
        }}
      >
        <div
          style={{
            width: 1020,
            height: 450,
            border: "1px solid rgba(255,255,255,0.13)",
            borderRadius: 44,
            padding: 54,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundImage: "linear-gradient(145deg, rgba(255,255,255,0.11), rgba(255,255,255,0.035))",
            boxShadow: "0 30px 120px rgba(0,0,0,0.45)"
          }}
        >
          <div
            style={{
              width: 78,
              height: 78,
              borderRadius: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "white",
              color: "black",
              fontSize: 31,
              fontWeight: 900
            }}
          >
            {site.initials}
          </div>
          <div>
            <div style={{ fontSize: 74, fontWeight: 750, letterSpacing: -1.5 }}>{site.name}</div>
            <div style={{ marginTop: 24, maxWidth: 820, fontSize: 34, lineHeight: 1.25, color: "rgba(255,255,255,0.72)" }}>
              {site.tagline}
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
