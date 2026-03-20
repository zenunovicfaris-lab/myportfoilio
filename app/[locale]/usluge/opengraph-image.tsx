import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SEO Usluge BiH | Faris Zenunović";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: { locale: string };
}) {
  const isBS = params.locale === "bs";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f1117 0%, #0d1f2d 100%)",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(20, 184, 166, 0.15)",
            filter: "blur(80px)",
          }}
        />

        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#14b8a6",
              boxShadow: "0 0 12px #14b8a6",
            }}
          />
          <span
            style={{
              fontSize: 18,
              color: "#14b8a6",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {isBS ? "SEO Strucnjak · BiH" : "SEO Expert · BiH"}
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: 24,
          }}
        >
          {isBS ? "SEO Usluge" : "SEO Services"}
          <br />
          <span style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>
            {isBS ? "koje donose" : "that deliver"}
          </span>
          <br />
          {isBS ? "rezultate." : "results."}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 24,
            color: "#9ca3af",
            maxWidth: 700,
            lineHeight: 1.5,
            marginBottom: 48,
          }}
        >
          {isBS
            ? "Profesionalna SEO optimizacija za biznise u BiH i regiji."
            : "Professional SEO optimization for businesses in BiH and the region."}
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 48 }}>
          {[
            { value: "3x", label: isBS ? "Rast saobracaja" : "Traffic growth" },
            { value: "40+", label: isBS ? "Projekata" : "Projects" },
            { value: "4+", label: isBS ? "Godine iskustva" : "Years experience" },
          ].map((stat) => (
            <div key={stat.value} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: "#14b8a6", letterSpacing: "-0.03em" }}>
                {stat.value}
              </span>
              <span style={{ fontSize: 16, color: "#6b7280" }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Author */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span style={{ fontSize: 20, color: "#4b5563" }}>fariszenunovic.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
