import { ImageResponse } from "next/og";

export const alt = "Layl Labs — I Build with AI Agents";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Accent line */}
        <div
          style={{
            width: 60,
            height: 3,
            background: "#e4e4e7",
            marginBottom: 32,
            borderRadius: 2,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontSize: 18,
            color: "#a1a1aa",
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            marginBottom: 24,
          }}
        >
          LAYL — YOUNGHA KIM
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#fafafa",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginBottom: 12,
          }}
        >
          I Build with
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#e4e4e7",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginBottom: 40,
          }}
        >
          AI Agents
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 22,
            color: "#71717a",
            lineHeight: 1.5,
          }}
        >
          만들고, 실험하고, 과정을 공유합니다.
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            fontSize: 20,
            color: "#52525b",
            letterSpacing: "-0.01em",
          }}
        >
          Layl Labs.
        </div>
      </div>
    ),
    { ...size }
  );
}
