import { ImageResponse } from "next/og";
import { OG_IMAGE_ALT } from "@/lib/site";

export const runtime = "edge";
export const alt = OG_IMAGE_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0a0908",
          color: "#f4efe6",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* corner annotations (mono-ish via serif system for reliability) */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#c04a1e",
          }}
        >
          <span>SRT / Portfolio · 2026</span>
          <span>Iloilo, PH · GMT+8</span>
        </div>

        {/* title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 120,
          }}
        >
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#d4ff2e",
              marginBottom: 18,
            }}
          >
            Sean Raimiel Tan
          </div>
          <div
            style={{
              fontSize: 110,
              lineHeight: 0.95,
              fontStyle: "italic",
              letterSpacing: "-0.04em",
              color: "#f4efe6",
            }}
          >
            Senior Full-Stack
          </div>
          <div
            style={{
              fontSize: 110,
              lineHeight: 0.95,
              fontStyle: "italic",
              letterSpacing: "-0.04em",
              color: "#d9d3c6",
            }}
          >
            Software Engineer.
          </div>
        </div>

        {/* bottom row */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#d9d3c6",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontSize: 18,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#6b6660",
                marginBottom: 10,
              }}
            >
              Stack
            </span>
            <span>NestJS · Prisma · Next.js · React Native · Azure · RAG</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                backgroundColor: "#d4ff2e",
                borderRadius: 999,
                display: "block",
              }}
            />
            <span
              style={{
                fontSize: 20,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#d4ff2e",
              }}
            >
              Available for work
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
