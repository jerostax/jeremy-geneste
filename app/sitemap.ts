import type { MetadataRoute } from "next";
import { absoluteUrl, localePath, locales } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((locale) => [locale, absoluteUrl(localePath[locale])]));
  return locales.map((locale) => ({
    url: absoluteUrl(localePath[locale]),
    changeFrequency: "monthly",
    priority: locale === "fr" ? 1 : 0.9,
    alternates: { languages },
  }));
}
