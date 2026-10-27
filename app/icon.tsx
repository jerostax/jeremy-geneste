import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const serifItalic = await readFile(join(process.cwd(), "assets/fonts/InstrumentSerif-Italic.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#0d0c0a",
          color: "#ece5d8",
          fontFamily: "Instrument Serif",
          fontStyle: "italic",
          fontSize: 46,
        }}
      >
        jg<span style={{ color: "#ff5a1f" }}>.</span>
      </div>
    ),
    { ...size, fonts: [{ name: "Instrument Serif", data: serifItalic, style: "italic", weight: 400 }] },
  );
}
