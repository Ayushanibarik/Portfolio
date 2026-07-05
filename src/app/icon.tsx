import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const runtime = "edge";
export const size = {
  width: 96,
  height: 96
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 24,
          backgroundColor: "#050505",
          backgroundImage:
            "radial-gradient(circle at 28% 18%, rgba(92,119,255,0.62), transparent 42%), linear-gradient(145deg, #151515, #050505)",
          color: "white",
          fontFamily: "Inter, Arial, sans-serif",
          fontSize: 32,
          fontWeight: 900,
          letterSpacing: -1
        }}
      >
        {site.initials}
      </div>
    ),
    size
  );
}
