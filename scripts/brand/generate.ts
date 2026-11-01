// Regenerates the whole brand kit from the font outlines: `npx tsx scripts/brand/generate.ts`.
// PNGs are rendered by headless Microsoft Edge (WSL path by default, override with BRAND_BROWSER).
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import opentype from "opentype.js";
import { person, siteUrl } from "../../lib/site";
import { colors, icoFile, letterPair, lettersSvg, lockupSvg, markSvg, signatureCopy, signatureHtml } from "./brand";

const root = resolve(import.meta.dirname, "../..");
const kit = join(root, "brand");
const browser = process.env.BRAND_BROWSER ?? "/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";

const pair = letterPair(opentype.loadSync(join(root, "assets/fonts/BricolageGrotesque-ExtraBold-opsz14-JG.ttf")));
const display = opentype.loadSync(join(root, "assets/fonts/BricolageGrotesque-SemiBold.woff"));
const { ink, accent, paper } = colors;

const svgs: Record<string, string> = {
  "jg-mark.svg": markSvg(pair, accent, ink), // primary
  "jg-mark-ink.svg": markSvg(pair, ink, accent), // light backgrounds
  "jg-mark-paper.svg": markSvg(pair, paper, ink), // blue or colored backgrounds
  "jg-mark-square.svg": markSvg(pair, accent, ink, { square: true }),
  "jg-letters-paper.svg": lettersSvg(pair, paper),
  "jg-letters-accent.svg": lettersSvg(pair, accent),
  "jg-letters-ink.svg": lettersSvg(pair, ink),
  "jg-lockup-dark.svg": lockupSvg(pair, display, accent, ink, paper),
  "jg-lockup-light.svg": lockupSvg(pair, display, accent, ink, ink),
  "jg-lockup-mono-dark.svg": lockupSvg(pair, display, paper, ink, paper),
  "jg-lockup-mono-light.svg": lockupSvg(pair, display, ink, paper, ink),
};

mkdirSync(join(kit, "svg"), { recursive: true });
mkdirSync(join(kit, "png"), { recursive: true });
for (const [file, content] of Object.entries(svgs)) writeFileSync(join(kit, "svg", file), content);

// Edge runs on Windows: hand it Windows paths.
const windowsPath = (path: string) => execFileSync("wslpath", ["-w", path]).toString().trim();
const work = mkdtempSync(join(tmpdir(), "brand-"));

function rasterize(svgFile: string, pngFile: string, width: number, height: number) {
  const page = join(work, `${width}x${height}-${svgFile}.html`);
  const source = `file:///${windowsPath(join(kit, "svg", svgFile)).replaceAll("\\", "/")}`;
  writeFileSync(page, `<!doctype html><style>html,body{margin:0;background:transparent}img{display:block}</style><img src="${source}" width="${width}" height="${height}">`);
  execFileSync(browser, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
    "--default-background-color=00000000", `--window-size=${width},${height}`,
    `--screenshot=${windowsPath(join(kit, "png", pngFile))}`, `file:///${windowsPath(page).replaceAll("\\", "/")}`,
  ], { stdio: "ignore" });
}

for (const size of [16, 32, 48, 96, 192, 512]) rasterize("jg-mark.svg", `jg-mark-${size}.png`, size, size);
rasterize("jg-mark.svg", "jg-mark-email-112.png", 112, 112); // shown at 56 px in the signature
rasterize("jg-mark-square.svg", "apple-icon-180.png", 180, 180);
for (const variant of ["dark", "light", "mono-dark", "mono-light"]) {
  const width = Number(/width="(\d+)"/.exec(svgs[`jg-lockup-${variant}.svg`])![1]);
  rasterize(`jg-lockup-${variant}.svg`, `jg-lockup-${variant}@2x.png`, width * 2, 192);
}
rmSync(work, { recursive: true, force: true });

const png = (file: string) => readFileSync(join(kit, "png", file));
writeFileSync(join(kit, "favicon.ico"), icoFile([16, 32, 48].map((size) => ({ size, png: png(`jg-mark-${size}.png`) }))));

const logoUrl = new URL("/brand/jg-mark-email-112.png", siteUrl).toString();
for (const lang of ["fr", "en"] as const) {
  writeFileSync(join(kit, `signature-${lang}.html`), `<!doctype html>\n<meta charset="utf-8">\n${signatureHtml(signatureCopy[lang], logoUrl, person.links)}\n`);
}

// Files the site serves.
copyFileSync(join(kit, "svg/jg-mark.svg"), join(root, "app/icon.svg"));
copyFileSync(join(kit, "favicon.ico"), join(root, "app/favicon.ico"));
copyFileSync(join(kit, "png/apple-icon-180.png"), join(root, "app/apple-icon.png"));
mkdirSync(join(root, "public/brand"), { recursive: true });
copyFileSync(join(kit, "png/jg-mark-email-112.png"), join(root, "public/brand/jg-mark-email-112.png"));

console.log(`Brand kit written to ${kit}`);
