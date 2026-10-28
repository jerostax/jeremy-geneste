export type Locale = "fr" | "en";

export const locales: Locale[] = ["fr", "en"];

// Custom domain; the other domains and jeremy-geneste.vercel.app redirect here (308, set in Vercel).
export const siteUrl = "https://jeremy-geneste.com";

// First publication of the site, for the ProfilePage structured data.
export const siteCreated = "2026-10-28";

export const person = {
  name: "Jérémy Geneste",
  alternateName: "Jeremy Geneste",
  email: "jeremy.geneste@gmail.com",
  photo: "/jeremy-geneste.jpg",
  links: {
    linkedin: "https://www.linkedin.com/in/jeremy-geneste/",
    github: "https://github.com/jerostax",
  },
} as const;

export const localePath: Record<Locale, string> = { fr: "/", en: "/en" };

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}
