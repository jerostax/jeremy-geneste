import assert from "node:assert/strict";
import { test } from "node:test";
import { content } from "@/content";
import { milestoneHref } from "./milestones";

test("milestoneHref links to a known anchor", () => {
  assert.equal(milestoneHref("pop-eye", ["pop-eye", "contact"]), "#pop-eye");
});

test("milestoneHref rejects an unknown target", () => {
  assert.throws(() => milestoneHref("nowhere", ["pop-eye", "contact"]), /nowhere/);
});

test("every milestone of every language points to a timeline entry or to the contact section", () => {
  for (const t of Object.values(content)) {
    const anchors = [...t.timeline.map((entry) => entry.id), "contact"];
    for (const milestone of t.ascent.milestones) assert.doesNotThrow(() => milestoneHref(milestone.target, anchors));
  }
});

test("timeline ids are unique and the same in every language", () => {
  const ids = Object.values(content).map((t) => t.timeline.map((entry) => entry.id));
  for (const list of ids) assert.equal(new Set(list).size, list.length);
  assert.deepEqual(ids[0], ids[1]);
});
