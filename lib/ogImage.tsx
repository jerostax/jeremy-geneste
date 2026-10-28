import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { content } from "@/content";
import { buildProfile, chamonixToMontBlanc } from "./elevationProfile";
import { siteUrl, type Locale } from "./site";

export const ogSize = { width: 1200, height: 630 };

const stack = ["React", "Next.js", "Node.js"];

const asset = (...parts: string[]) => readFile(join(process.cwd(), ...parts));

// The same real Chamonix -> Mont Blanc profile as on the page, as a band along the bottom.
function profileBand() {
  const frame = { width: 1200, height: 190, top: 20, bottom: 190, minElevation: 900, maxElevation: 4900 };
  const { line, area } = buildProfile(chamonixToMontBlanc, frame);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="190" viewBox="0 0 1200 190">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#6fb2ff" stop-opacity="0.18"/><stop offset="1" stop-color="#6fb2ff" stop-opacity="0.02"/>
    </linearGradient></defs>
    <path d="${area}" fill="url(#g)"/>
    <path d="${line}" fill="none" stroke="#6fb2ff" stroke-opacity="0.75" stroke-width="3" stroke-linejoin="round"/>
  </svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export async function renderOgImage(locale: Locale) {
  const [display, text] = await Promise.all([
    asset("assets/fonts/BricolageGrotesque-SemiBold.woff"),
    asset("assets/fonts/InstrumentSans-Regular.woff"),
  ]);
  const t = content[locale];

  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: "#0b1220", color: "#e9eef6", fontFamily: "Instrument Sans" }}>
        <img src={profileBand()} width={1200} height={190} style={{ position: "absolute", left: 0, bottom: 0 }} alt="" />
        <div style={{ display: "flex", flexDirection: "column", padding: "80px 80px 0" }}>
          <div style={{ fontSize: 30, color: "#6fb2ff", letterSpacing: 1 }}>{t.meta.ogTagline}</div>
          <div style={{ marginTop: 14, fontFamily: "Bricolage Grotesque", fontSize: 120, letterSpacing: -4, lineHeight: 1 }}>Jérémy Geneste</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 38, color: "#bfcadb" }}>
            {stack.map((item, i) => (
              <div key={item} style={{ display: "flex", alignItems: "center" }}>
                {i > 0 && <div style={{ width: 8, height: 8, borderRadius: 4, background: "#6fb2ff", margin: "0 22px" }} />}
                {item}
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", right: 72, bottom: 34, fontSize: 30, color: "#e9eef6" }}>{new URL(siteUrl).host}</div>
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
