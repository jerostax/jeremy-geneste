import type { Metadata } from "next";
import type { Content } from "@/content/types";
import { absoluteUrl, localePath, person, siteCreated, siteUrl, type Locale } from "./site";

const ogLocale: Record<Locale, string> = { fr: "fr_FR", en: "en_US" };

export function buildMetadata(locale: Locale, content: Content): Metadata {
  const url = absoluteUrl(localePath[locale]);
  return {
    metadataBase: new URL(siteUrl),
    title: content.meta.title,
    description: content.meta.description,
    authors: [{ name: person.name, url: siteUrl }],
    alternates: {
      canonical: url,
      languages: {
        fr: absoluteUrl(localePath.fr),
        en: absoluteUrl(localePath.en),
        "x-default": absoluteUrl(localePath.fr),
      },
    },
    openGraph: {
      type: "profile",
      firstName: "Jérémy",
      lastName: "Geneste",
      url,
      // Shown under the title in link cards (LinkedIn...): the domain, not the name a second time.
      siteName: new URL(siteUrl).host,
      title: content.meta.title,
      description: content.meta.shareDescription,
      locale: ogLocale[locale],
      alternateLocale: ogLocale[locale === "fr" ? "en" : "fr"],
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.shareDescription,
    },
  };
}

// The WebSite node gives Google the site name shown in results ("Jérémy Geneste",
// not the domain used as og:site_name for link cards).
export function buildPersonJsonLd(locale: Locale, content: Content) {
  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: absoluteUrl("/"),
    name: person.name,
    alternateName: [person.alternateName, new URL(siteUrl).host],
    inLanguage: ["fr", "en"],
  };
  const profilePage = {
    "@type": "ProfilePage",
    "@id": `${absoluteUrl(localePath[locale])}#page`,
    url: absoluteUrl(localePath[locale]),
    inLanguage: locale,
    name: content.meta.title,
    isPartOf: { "@id": website["@id"] },
    dateCreated: siteCreated,
    mainEntity: {
      "@type": "Person",
      // One identity shared by both language versions.
      "@id": `${siteUrl}/#person`,
      name: person.name,
      alternateName: person.alternateName,
      givenName: "Jérémy",
      familyName: "Geneste",
      jobTitle: content.meta.jobTitle,
      description: content.meta.description,
      url: absoluteUrl("/"),
      image: absoluteUrl(person.photo),
      email: `mailto:${person.email}`,
      address: {
        "@type": "PostalAddress",
        addressRegion: "Île-de-France",
        addressCountry: "FR",
      },
      knowsLanguage: ["fr", "en"],
      knowsAbout: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Artificial intelligence", "PostgreSQL", "Technical SEO", "Web performance"],
      alumniOf: { "@type": "EducationalOrganization", name: "L’École Multimédia" },
      sameAs: Object.values(person.links),
    },
  };
  return { "@context": "https://schema.org", "@graph": [website, profilePage] as const };
}

// JSON.stringify does not escape "<": a "</script>" in a string would end the tag.
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
