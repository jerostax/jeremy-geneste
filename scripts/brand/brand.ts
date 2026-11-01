// Pure builders for the JG brand assets. Everything is derived from one source: the J and G
// outlines of Bricolage Grotesque ExtraBold at optical size 14 (heavier and more open than the
// site's SemiBold, so the mark stays legible at 16 px).
import type { Font } from "opentype.js";

// Site palette (app/globals.css) plus darker shades of the same hues for light backgrounds:
// the accent is only 2.3:1 on white, the link shade 5.5:1, the muted shade 6:1.
export const colors = {
  ink: "#0b1220",
  accent: "#6fb2ff",
  paper: "#e9eef6",
  link: "#1469bc",
  mutedOnLight: "#55647a",
  ruleOnLight: "#d5dce6",
  separatorOnLight: "#b8c2d1",
} as const;

// The mark lives in a 96 x 96 square, like the previous favicon.
const TILE = 96;
const RADIUS = 21;
const LETTERS_WIDTH = 0.66; // share of the tile width taken by the letters
const PAIR_GAP = 18; // font units between the J stem and the G bowl

export type Pair = { d: string; width: number; top: number; bottom: number };

// The J and G set side by side, J starting at x = 0, baseline at y = 0 (font units, 1000/em).
export function letterPair(font: Font): Pair {
  const j = font.charToGlyph("J");
  const g = font.charToGlyph("G");
  const jBox = j.getPath(0, 0, 1000).getBoundingBox();
  const gBox = g.getPath(0, 0, 1000).getBoundingBox();
  const gx = jBox.x2 + PAIR_GAP - gBox.x1;
  return {
    d: j.getPath(-jBox.x1, 0, 1000).toPathData(1) + g.getPath(gx - jBox.x1, 0, 1000).toPathData(1),
    width: gx + gBox.x2 - jBox.x1,
    top: Math.min(jBox.y1, gBox.y1),
    bottom: Math.max(jBox.y2, gBox.y2),
  };
}

const svg = (width: number, height: number, body: string, viewBox = `0 0 ${width} ${height}`) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${viewBox}">${body}</svg>`;

// Letters centered in the tile, on their own bounding box.
function lettersInTile(pair: Pair, fill: string) {
  const scale = (TILE * LETTERS_WIDTH) / pair.width;
  const x = (TILE - pair.width * scale) / 2;
  const y = TILE / 2 - ((pair.top + pair.bottom) / 2) * scale;
  return `<path transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${scale.toFixed(5)})" fill="${fill}" d="${pair.d}"/>`;
}

const tile = (pair: Pair, background: string, letters: string, radius = RADIUS) =>
  `<rect width="${TILE}" height="${TILE}" rx="${radius}" fill="${background}"/>${lettersInTile(pair, letters)}`;

// Tile mark. `square` drops the rounded corners (iOS rounds the apple-touch icon itself).
export function markSvg(pair: Pair, background: string, letters: string, { square = false } = {}) {
  return svg(TILE, TILE, tile(pair, background, letters, square ? 0 : RADIUS));
}

// Letters only, cropped to their bounding box.
export function lettersSvg(pair: Pair, fill: string) {
  const height = pair.bottom - pair.top;
  const width = Math.ceil(pair.width);
  return svg(width, Math.ceil(height), `<path fill="${fill}" d="${pair.d}"/>`, `0 ${pair.top} ${width} ${height}`);
}

// Text converted to outlines, with tracking in em.
export function textPath(font: Font, text: string, size: number, tracking: number) {
  let x = 0;
  let d = "";
  for (const glyph of font.stringToGlyphs(text)) {
    d += glyph.getPath(x, 0, size).toPathData(2);
    x += ((glyph.advanceWidth ?? 0) / font.unitsPerEm) * size + tracking * size;
  }
  return { d, width: x - tracking * size };
}

// Horizontal lockup: tile + name in the site's display face (Bricolage SemiBold, -0.02em).
export function lockupSvg(pair: Pair, display: Font, background: string, letters: string, nameFill: string) {
  const size = 44;
  const gap = 26;
  const text = textPath(display, "Jérémy Geneste", size, -0.02);
  const capHeight = (660 / 1000) * size;
  const width = Math.ceil(TILE + gap + text.width + 2);
  const baseline = TILE / 2 + capHeight / 2;
  return svg(width, TILE, `${tile(pair, background, letters)}<path transform="translate(${TILE + gap} ${baseline.toFixed(2)})" fill="${nameFill}" d="${text.d}"/>`);
}

// .ico container holding PNG images (supported by every current browser).
export function icoFile(images: { size: number; png: Buffer }[]) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map(({ size, png }) => {
    const entry = Buffer.alloc(16);
    entry[0] = size >= 256 ? 0 : size;
    entry[1] = size >= 256 ? 0 : size;
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...images.map(({ png }) => png)]);
}

export type SignatureCopy = { title: string; site: string };

export const signatureCopy: Record<"fr" | "en", SignatureCopy> = {
  fr: { title: "Développeur fullstack JavaScript et IA", site: "https://jeremy-geneste.com/" },
  en: { title: "Full-stack JavaScript and AI developer", site: "https://jeremy-geneste.com/en" },
};

// Email signature: tables, inline styles and system fonts only (what Gmail and Outlook keep),
// a PNG logo (no SVG in mail clients) and text links, which survive blocked images.
export function signatureHtml(copy: SignatureCopy, logoUrl: string, links: { linkedin: string; github: string }) {
  const font = "font-family:Arial,Helvetica,sans-serif";
  const link = (href: string, label: string) => `<a href="${href}" style="color:${colors.link};text-decoration:none">${label}</a>`;
  const separator = `<span style="color:${colors.separatorOnLight}">&nbsp;·&nbsp;</span>`;
  return `<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;${font}">
  <tr>
    <td style="padding:0 14px 0 0;vertical-align:middle">
      <a href="${copy.site}"><img src="${logoUrl}" width="56" height="56" alt="JG" style="display:block;border:0;width:56px;height:56px"></a>
    </td>
    <td style="padding:0 0 0 14px;border-left:1px solid ${colors.ruleOnLight};vertical-align:middle">
      <div style="font-size:16px;line-height:20px;font-weight:bold;color:${colors.ink}">Jérémy Geneste</div>
      <div style="font-size:13px;line-height:18px;color:${colors.mutedOnLight};padding-top:2px">${copy.title}</div>
      <div style="font-size:13px;line-height:18px;padding-top:6px">${link(copy.site, "jeremy-geneste.com")}${separator}${link(links.linkedin, "LinkedIn")}${separator}${link(links.github, "GitHub")}</div>
    </td>
  </tr>
</table>`;
}
