import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "Ibis Labs LLC - Digital Stewardship & Architecture";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const iconData = readFileSync(join(process.cwd(), "public/thoth-icon-512x512.png"));
  const orbitronData = readFileSync(join(process.cwd(), "node_modules/@fontsource/orbitron/files/orbitron-latin-700-normal.woff"));
  const iconSrc = `data:image/png;base64,${iconData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "ui-monospace, 'Courier New', monospace",
        }}
      >
        {/* Outer border */}
        <div
          style={{
            position: "absolute",
            inset: 24,
            border: "1px solid #1a1a1a",
            borderRadius: 8,
            display: "flex",
          }}
        />

        {/* Top cyan accent */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: "20%",
            right: "20%",
            height: 2,
            background:
              "linear-gradient(to right, transparent, #1faafe, transparent)",
            display: "flex",
          }}
        />

        {/* Bottom cyan accent */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: "20%",
            right: "20%",
            height: 2,
            background:
              "linear-gradient(to right, transparent, #1faafe, transparent)",
            display: "flex",
          }}
        />

        {/* Corner marks */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            width: 20,
            height: 20,
            borderTop: "2px solid #1faafe",
            borderLeft: "2px solid #1faafe",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            width: 20,
            height: 20,
            borderTop: "2px solid #1faafe",
            borderRight: "2px solid #1faafe",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            width: 20,
            height: 20,
            borderBottom: "2px solid #1faafe",
            borderLeft: "2px solid #1faafe",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            width: 20,
            height: 20,
            borderBottom: "2px solid #1faafe",
            borderRight: "2px solid #1faafe",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
          }}
        >
          {/* Logo with glow */}
          <div
            style={{
              display: "flex",
              marginBottom: 32,
              filter: "drop-shadow(0 0 24px rgba(0,255,255,0.5))",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={iconSrc} width={140} height={140} alt="Ibis Labs logo" />
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              fontFamily: "Orbitron",
              color: "#FFFFFF",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 16,
              display: "flex",
            }}
          >
            IBIS LABS LLC
          </div>

          {/* Divider */}
          <div
            style={{
              width: 80,
              height: 2,
              background: "#1faafe",
              marginBottom: 16,
              display: "flex",
            }}
          />

          {/* Subtitle */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                fontSize: 22,
                color: "#1faafe",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              Digital Stewardship &amp; Architecture
            </div>
            <div
              style={{
                fontSize: 18,
                color: "#1faafe",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "flex",
                opacity: 0.8,
              }}
            >
              Specialized in high-performance Progressive Web Apps.
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Orbitron",
          data: orbitronData.buffer.slice(orbitronData.byteOffset, orbitronData.byteOffset + orbitronData.byteLength),
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
