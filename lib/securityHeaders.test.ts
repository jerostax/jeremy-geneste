import assert from "node:assert/strict";
import { test } from "node:test";
import { buildContentSecurityPolicy, buildSecurityHeaders } from "./securityHeaders";

test("production policy forbids framing, plugins and eval", () => {
  const policy = buildContentSecurityPolicy(false);
  assert.match(policy, /frame-ancestors 'none'/);
  assert.match(policy, /object-src 'none'/);
  assert.doesNotMatch(policy, /'unsafe-eval'/);
  assert.match(policy, /upgrade-insecure-requests/);
});

test("development policy allows what React dev tooling needs", () => {
  const policy = buildContentSecurityPolicy(true);
  assert.match(policy, /'unsafe-eval'/);
  assert.match(policy, /connect-src 'self' ws:/);
  assert.doesNotMatch(policy, /upgrade-insecure-requests/);
});

test("security headers include the basics", () => {
  const keys = buildSecurityHeaders(false).map((header) => header.key);
  for (const key of ["Content-Security-Policy", "X-Content-Type-Options", "Referrer-Policy", "Strict-Transport-Security"]) {
    assert.ok(keys.includes(key), key);
  }
});
