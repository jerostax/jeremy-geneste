export type Locale = "fr" | "en";

export const locales: Locale[] = ["fr", "en"];

// Change this when a custom domain is added (keep a 301 from the old one).
export const siteUrl = "https://jeremy-geneste.vercel.app";

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
