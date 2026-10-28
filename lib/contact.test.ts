import assert from "node:assert/strict";
import { test } from "node:test";
import { buildContactEmail, isSpam, isValidEmail, parseContactInput, validateContact } from "./contact";

const valid = { name: "Ada Lovelace", email: "ada@example.com", company: "", message: "Hello", website: "" };

test("isValidEmail accepts ordinary addresses", () => {
  assert.ok(isValidEmail("ada@example.com"));
  assert.ok(isValidEmail("first.last+tag@mail.example.co.uk"));
});

test("isValidEmail rejects addresses that could carry a mailto query or spaces", () => {
  assert.equal(isValidEmail("a@b.co?cc=x@evil.example"), false);
  assert.equal(isValidEmail("a b@example.com"), false);
  assert.equal(isValidEmail("ada@example"), false);
  assert.equal(isValidEmail(""), false);
});

test("parseContactInput trims strings and ignores non-string values", () => {
  const input = parseContactInput({ name: "  Ada ", email: 42, message: "Hi\n" });
  assert.deepEqual(input, { name: "Ada", email: "", company: "", message: "Hi", website: "" });
  assert.deepEqual(parseContactInput(null).name, "");
});

test("validateContact lists every invalid field", () => {
  const result = validateContact({ ...valid, name: "", email: "nope", message: "" });
  assert.deepEqual(result, { ok: false, fields: ["name", "email", "message"] });
});

test("validateContact rejects a message over the limit", () => {
  const result = validateContact({ ...valid, message: "x".repeat(5001) });
  assert.deepEqual(result, { ok: false, fields: ["message"] });
});

test("validateContact returns the data without the honeypot", () => {
  const result = validateContact(valid);
  assert.ok(result.ok);
  assert.equal("website" in result.data, false);
});

test("isSpam is true only when the hidden field is filled", () => {
  assert.equal(isSpam(valid), false);
  assert.equal(isSpam({ ...valid, website: "http://spam.example" }), true);
});

test("buildContactEmail keeps the subject on one line and replies to the visitor", () => {
  const email = buildContactEmail({ ...valid, name: "Ada\r\nBcc: x@evil.example", company: "Acme" });
  assert.equal(email.subject.includes("\n"), false);
  assert.equal(email.replyTo, "ada@example.com");
  assert.match(email.text, /Entreprise : Acme/);
});
