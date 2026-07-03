import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "As Copas do Mundo — história e estádios icônicos em 3D";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(600px 300px at 50% 0%, rgba(52,211,153,0.25), transparent)",
          gap: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#34d399",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          🏆 1930 — 2026 · 22 EDIÇÕES
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 110,
            fontWeight: 900,
            color: "#fafafa",
            letterSpacing: -4,
          }}
        >
          As Copas do
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 130,
            fontWeight: 900,
            color: "#34d399",
            letterSpacing: -4,
            marginTop: -30,
          }}
        >
          Mundo
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa" }}>
          História · Campeões · Estádios icônicos em 3D
        </div>
      </div>
    ),
    size
  );
}
