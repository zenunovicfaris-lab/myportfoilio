import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Faris Zenunović | SEO Specialist - Technical SEO, Content & Web Development";
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
          background: "linear-gradient(135deg, #0a0a0f 0%, #0d1f2d 100%)",
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
            top: -120,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "rgba(20, 184, 166, 0.16)",
            filter: "blur(90px)",
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
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {isBS ? "SEO Specialist · BiH" : "SEO Specialist · Bosnia"}
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            marginBottom: 22,
          }}
        >
          Faris Zenunović
        </div>

        {/* Title line */}
        <div
          style={{
            fontSize: 30,
            color: "#9ca3af",
            maxWidth: 820,
            lineHeight: 1.4,
            marginBottom: 48,
          }}
        >
          {isBS
            ? "Technical SEO · Content · Web Development"
            : "Technical SEO · Content · Web Development"}
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 48 }}>
          {[
            { value: "50+", label: isBS ? "Sajtova" : "Websites built" },
            { value: "3x", label: isBS ? "Rast saobracaja" : "Traffic growth" },
            { value: "4+", label: isBS ? "Godine iskustva" : "Years experience" },
          ].map((stat) => (
            <div key={stat.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: "#14b8a6", letterSpacing: "-0.03em" }}>
                {stat.value}
              </span>
              <span style={{ fontSize: 16, color: "#6b7280" }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Domain */}
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
