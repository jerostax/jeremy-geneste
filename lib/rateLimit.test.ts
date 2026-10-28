import assert from "node:assert/strict";
import { test } from "node:test";
import { createRateLimiter } from "./rateLimit";

test("allows up to the limit within a window, then blocks", () => {
  const allow = createRateLimiter(2, 1000);
  assert.equal(allow("ip", 0), true);
  assert.equal(allow("ip", 10), true);
  assert.equal(allow("ip", 20), false);
});

test("counts each key separately", () => {
  const allow = createRateLimiter(1, 1000);
  assert.equal(allow("a", 0), true);
  assert.equal(allow("b", 0), true);
  assert.equal(allow("a", 1), false);
});

test("opens a new window once the previous one has expired", () => {
  const allow = createRateLimiter(1, 1000);
  assert.equal(allow("ip", 0), true);
  assert.equal(allow("ip", 500), false);
  assert.equal(allow("ip", 1000), true);
});
