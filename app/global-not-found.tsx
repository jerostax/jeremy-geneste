import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { localePath } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page introuvable · Page not found",
};

// Unmatched URLs have no locale, so the page speaks both languages.
export default function GlobalNotFound() {
  return (
    <html lang="fr" className={`${fontVariables} antialiased`}>
      <body className="grid min-h-screen place-items-center px-4">
        <main className="max-w-md">
          <p className="text-[15px] text-muted">404</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em]">Cette page n’existe pas.</h1>
          <p lang="en" className="mt-2 text-lg text-muted">This page doesn’t exist.</p>
          <p className="mt-8 flex gap-4">
            <a href={localePath.fr} className="rounded-lg bg-accent px-5 py-3 font-semibold text-ink">Retour à l’accueil</a>
            <a href={localePath.en} hrefLang="en" lang="en" className="px-2 py-3 underline underline-offset-2">Home in English</a>
          </p>
        </main>
      </body>
    </html>
  );
}
