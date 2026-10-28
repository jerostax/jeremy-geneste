import assert from "node:assert/strict";
import { test } from "node:test";
import { checkRequestShape } from "./requestGuard";

const sameSite = {
  origin: "https://jeremy-geneste.com",
  host: "jeremy-geneste.com",
  contentType: "application/json",
  contentLength: "120",
};

test("accepts a same-origin JSON post", () => {
  assert.equal(checkRequestShape(sameSite), null);
  assert.equal(checkRequestShape({ ...sameSite, contentType: "application/json; charset=utf-8" }), null);
});

test("rejects another origin, a missing origin or a malformed one", () => {
  assert.equal(checkRequestShape({ ...sameSite, origin: "https://evil.example" }), "cross_origin");
  assert.equal(checkRequestShape({ ...sameSite, origin: null }), "cross_origin");
  assert.equal(checkRequestShape({ ...sameSite, origin: "not a url" }), "cross_origin");
});

test("rejects a look-alike host", () => {
  assert.equal(checkRequestShape({ ...sameSite, origin: "https://jeremy-geneste.com.evil.example" }), "cross_origin");
});

test("rejects non-JSON bodies and oversized payloads", () => {
  assert.equal(checkRequestShape({ ...sameSite, contentType: "text/plain" }), "unsupported_media_type");
  assert.equal(checkRequestShape({ ...sameSite, contentLength: "20001" }), "too_large");
});
