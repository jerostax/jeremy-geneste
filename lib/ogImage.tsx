import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { content } from "@/content";
import type { Locale } from "./site";

export const ogSize = { width: 1200, height: 630 };

const fontPath = (file: string) => join(process.cwd(), "assets/fonts", file);

export async function renderOgImage(locale: Locale) {
  const [serif, serifItalic, mono, photo] = await Promise.all([
    readFile(fontPath("InstrumentSerif-Regular.ttf")),
    readFile(fontPath("InstrumentSerif-Italic.ttf")),
    readFile(fontPath("IBMPlexMono-Regular.ttf")),
    readFile(join(process.cwd(), "public/jeremy-geneste.jpg")),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0d0c0a", color: "#ece5d8" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: 72 }}>
          <div style={{ display: "flex", alignItems: "center", fontFamily: "Plex Mono", fontSize: 22, color: "#948b7d", letterSpacing: 4 }}>
            <div style={{ width: 14, height: 14, background: "#ff5a1f", marginRight: 18 }} />
            {content[locale].meta.ogTagline.toUpperCase()}
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Instrument Serif", fontSize: 168, lineHeight: 0.88 }}>
            <span>Jérémy</span>
            <span style={{ fontStyle: "italic" }}>
              Geneste<span style={{ color: "#ff5a1f", fontStyle: "normal" }}>.</span>
            </span>
          </div>
        </div>
        <img src={photoSrc} width={420} height={630} style={{ objectFit: "cover", filter: "grayscale(1)" }} alt="" />
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: serifItalic, style: "italic", weight: 400 },
        { name: "Plex Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
