import assert from "node:assert/strict";
import { test } from "node:test";
import { en } from "../content/en";
import { fr } from "../content/fr";
import { buildMetadata } from "./seo";

test("link previews get the short share description, search engines keep the full one", () => {
  for (const [locale, content] of [["fr", fr], ["en", en]] as const) {
    const metadata = buildMetadata(locale, content);
    assert.equal(metadata.description, content.meta.description);
    assert.equal(metadata.openGraph?.description, content.meta.shareDescription);
    assert.equal(metadata.twitter?.description, content.meta.shareDescription);
    assert.ok(content.meta.shareDescription.length <= 170, `${locale} share description is too long`);
  }
});

test("the card shows the domain under the title, not the name a second time", () => {
  const openGraph = buildMetadata("fr", fr).openGraph as { siteName?: string };
  assert.equal(openGraph.siteName, "jeremy-geneste.com");
});

test("canonical and hreflang are unchanged", () => {
  assert.deepEqual(buildMetadata("fr", fr).alternates, {
    canonical: "https://jeremy-geneste.com/",
    languages: {
      fr: "https://jeremy-geneste.com/",
      en: "https://jeremy-geneste.com/en",
      "x-default": "https://jeremy-geneste.com/",
    },
  });
  assert.equal(buildMetadata("en", en).alternates?.canonical, "https://jeremy-geneste.com/en");
});
