import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
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
          borderRadius: 14,
          background: "#6fb2ff",
          color: "#0b1220",
          fontFamily: "Bricolage Grotesque",
          fontSize: 34,
          letterSpacing: -1,
        }}
      >
        JG
      </div>
    ),
    { ...size, fonts: [{ name: "Bricolage Grotesque", data: display, style: "normal", weight: 600 }] },
  );
}
