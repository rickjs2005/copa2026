import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Copa do Mundo 2026 — jogos, tabela e estatísticas";

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
          🇺🇸 🇲🇽 🇨🇦 · 11 JUN — 19 JUL
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
          Copa do Mundo
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
          2026
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa" }}>
          Jogos · Tabela · Mata-mata · Estatísticas · Seleções
        </div>
      </div>
    ),
    size
  );
}
