import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
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
          backgroundColor: "#0a0908",
          color: "#d4ff2e",
          fontSize: 44,
          fontWeight: 600,
          fontStyle: "italic",
          fontFamily: "serif",
          letterSpacing: "-0.04em",
        }}
      >
        s
      </div>
    ),
    { ...size },
  );
}
