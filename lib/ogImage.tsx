import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { content } from "@/content";
import type { Locale } from "./site";

export const ogSize = { width: 1200, height: 630 };

const asset = (...parts: string[]) => readFile(join(process.cwd(), ...parts));

export async function renderOgImage(locale: Locale) {
  const [display, text, photo] = await Promise.all([
    asset("assets/fonts/BricolageGrotesque-SemiBold.woff"),
    asset("assets/fonts/InstrumentSans-Regular.woff"),
    asset("public/jeremy-geneste.jpg"),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const t = content[locale];

  return new ImageResponse(
    (
      <div style={{ display: "flex", alignItems: "center", width: "100%", height: "100%", padding: 80, background: "#17181c", color: "#ededef", fontFamily: "Instrument Sans" }}>
        <img src={photoSrc} width={300} height={300} style={{ borderRadius: 150, objectFit: "cover" }} alt="" />
        <div style={{ display: "flex", flexDirection: "column", marginLeft: 64, flex: 1 }}>
          <div style={{ fontFamily: "Bricolage Grotesque", fontSize: 84, letterSpacing: -2, lineHeight: 1 }}>Jérémy Geneste</div>
          <div style={{ marginTop: 24, fontSize: 34, color: "#9a9ba3" }}>{t.meta.ogTagline}</div>
          <div style={{ marginTop: 40, width: 120, height: 8, borderRadius: 4, background: "#f2b84b" }} />
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Bricolage Grotesque", data: display, style: "normal", weight: 600 },
        { name: "Instrument Sans", data: text, style: "normal", weight: 400 },
      ],
    },
  );
}
