import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Google wants a square favicon whose side is a multiple of 48 px.
export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default async function Icon() {
  const display = await readFile(join(process.cwd(), "assets/fonts/BricolageGrotesque-SemiBold.woff"));
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          borderRadius: 21,
          background: "#6fb2ff",
          color: "#0b1220",
          fontFamily: "Bricolage Grotesque",
          fontSize: 51,
          letterSpacing: -1.5,
        }}
      >
        JG
      </div>
    ),
    { ...size, fonts: [{ name: "Bricolage Grotesque", data: display, style: "normal", weight: 600 }] },
  );
}
