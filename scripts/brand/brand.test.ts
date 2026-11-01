import assert from "node:assert/strict";
import { join } from "node:path";
import { test } from "node:test";
import opentype from "opentype.js";
import { icoFile, letterPair, lettersSvg, markSvg, signatureCopy, signatureHtml } from "./brand";

const font = opentype.loadSync(join(import.meta.dirname, "../../assets/fonts/BricolageGrotesque-ExtraBold-opsz14-JG.ttf"));
const pair = letterPair(font);

test("letter pair starts at x = 0 and spans the cap height", () => {
  assert.ok(pair.width > 800 && pair.width < 1100);
  assert.ok(pair.top < -640 && pair.bottom > 0);
});

test("mark is a 96 px square with a rounded tile, or square corners on demand", () => {
  const mark = markSvg(pair, "#6fb2ff", "#0b1220");
  assert.match(mark, /viewBox="0 0 96 96"/);
  assert.match(mark, /rx="21"/);
  assert.match(markSvg(pair, "#6fb2ff", "#0b1220", { square: true }), /rx="0"/);
});

test("letters are centered horizontally in the tile", () => {
  const [, x, , scale] = /translate\(([\d.]+) ([\d.]+)\) scale\(([\d.]+)\)/.exec(markSvg(pair, "#000", "#fff"))!.map(Number);
  assert.ok(Math.abs(x + pair.width * scale + x - 96) < 0.05);
});

test("letters-only SVG crops to the glyph box", () => {
  assert.match(lettersSvg(pair, "#fff"), new RegExp(`viewBox="0 ${pair.top} `));
});

test("ico header lists each PNG with its size and offset", () => {
  const ico = icoFile([{ size: 16, png: Buffer.from("aaaa") }, { size: 32, png: Buffer.from("bbbbbb") }]);
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 2);
  assert.equal(ico[6], 16);
  assert.equal(ico.readUInt32LE(6 + 8), 4);
  assert.equal(ico.readUInt32LE(6 + 12), 6 + 32);
  assert.equal(ico.readUInt32LE(22 + 12), 6 + 32 + 4);
  assert.equal(ico.subarray(42).toString(), "bbbbbb");
});

test("signature uses a PNG logo, text links and no SVG", () => {
  const html = signatureHtml(signatureCopy.fr, "https://example.com/logo.png", { linkedin: "https://li", github: "https://gh" });
  assert.match(html, /<img src="https:\/\/example.com\/logo.png"/);
  assert.match(html, />LinkedIn<\/a>/);
  assert.match(html, />GitHub<\/a>/);
  assert.match(html, /Développeur fullstack JavaScript et IA/);
  assert.doesNotMatch(html, /<svg/);
});
