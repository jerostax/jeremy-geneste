import assert from "node:assert/strict";
import { test } from "node:test";
import { buildProfile, chamonixToMontBlanc } from "./elevationProfile";

const frame = { width: 800, height: 220, top: 40, bottom: 200, minElevation: 1000, maxElevation: 5000 };

test("the data climbs from the valley to the summit", () => {
  assert.equal(chamonixToMontBlanc.length, 100);
  assert.ok(chamonixToMontBlanc[0] < 1100);
  assert.ok(chamonixToMontBlanc[chamonixToMontBlanc.length - 1] > 4700);
});

test("the line starts at the left edge and ends at the right edge", () => {
  const { line } = buildProfile([1000, 3000, 5000], frame);
  assert.equal(line, "M0.0 200.0 L400.0 120.0 L800.0 40.0");
});

test("the area closes along the bottom of the frame", () => {
  const { area } = buildProfile([1000, 5000], frame);
  assert.ok(area.endsWith("L800 220 L0 220 Z"));
});

test("pointAt maps a fraction of the route and clamps out-of-range values", () => {
  const { pointAt } = buildProfile([1000, 3000, 5000], frame);
  assert.deepEqual(pointAt(0.5), { x: 400, y: 120, elevation: 3000 });
  assert.deepEqual(pointAt(-1), pointAt(0));
  assert.deepEqual(pointAt(2), pointAt(1));
});
