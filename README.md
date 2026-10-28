# jeremy-geneste.com

Personal site of **Jérémy Geneste**, full-stack JavaScript / TypeScript developer based in Paris, looking for a permanent role in Paris / Île-de-France.

**Live:** [jeremy-geneste.com](https://jeremy-geneste.com) (French) · [jeremy-geneste.com/en](https://jeremy-geneste.com/en) (English)

## Stack

- [Next.js 16](https://nextjs.org) (App Router, static rendering) and React 19
- TypeScript, Tailwind CSS 4
- [Resend](https://resend.com) for the contact form, [Vercel BotID](https://vercel.com/docs/botid) against bots
- Hosted on Vercel, tests with the Node.js test runner (`tsx --test`)

## Technical choices

**Bilingual without an i18n library.** French at `/` and English at `/en`, each with its own root layout (route groups), so every page ships the right `<html lang>`. There is no redirect based on the browser language: search engine crawlers always see both versions. `canonical`, `hreflang` (`fr`, `en`, `x-default`) and the sitemap tie them together. The copy lives in two typed dictionaries (`content/fr.ts`, `content/en.ts`). With two root layouts there is no shared one for a 404, so a bilingual `global-not-found` page handles unknown URLs.

**Everything that matters is in the server HTML.** The page is statically rendered. Client JavaScript is limited to the animations (`components/PageEffects.tsx`), the contact form (`components/ContactForm.tsx`) and the BotID check. The figures, the timeline and the elevation profile are readable without JavaScript and by search engines. A `ProfilePage` + `Person` JSON-LD links the site to LinkedIn and GitHub.

**Share images generated, not drawn.** `opengraph-image` routes render one 1200 × 630 image per language with `next/og`, reusing the site fonts and the same elevation profile. Link previews get their own short description, separate from the search engine one.

**A real elevation profile as the timeline.** The experience section is led by the elevation profile from Chamonix to the Mont Blanc summit: 100 SRTM 30 m samples from the OpenTopoData API, stored in `lib/elevationProfile.ts`. A pure, tested helper turns them into SVG paths; career steps sit on the route and the track is drawn once when it comes into view.

**A hardened contact form.** `app/api/contact/route.ts` checks, in order: a per-instance rate limit, a same-origin `Origin` header, a JSON body under 20 KB, Vercel BotID, a honeypot field, then server-side validation. Emails are sent as plain text from a verified domain (DKIM, SPF), with the visitor as `reply_to`. The validation, request guard and rate limiter are pure functions with tests.

**Security headers on every page.** Content Security Policy (everything from this origin, no framing, no plugins, `unsafe-eval` in development only), HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`. The CSP has no nonce on purpose: a nonce would make every page dynamic.

**Motion with restraint.** One page-load entrance, figures that count down, the profile drawn once, a sidebar that follows the section being read. All of it respects `prefers-reduced-motion`.

**The resume as code.** `cv/fr.html` and `cv/en.html` are the sources of the downloadable resumes: printed from the browser to one-page A4 PDFs in `public/cv/`, so they are real text (searchable, readable by applicant tracking systems), light, and contain no phone number by construction. See `cv/README.md`.

## Project structure

```
app/            routes: (fr)/ and (en)/en/ root layouts, api/contact, share images, sitemap, robots, 404
components/     page sections, contact form, elevation profile, client-side effects
content/        typed FR and EN copy
lib/            pure helpers (contact validation, request guard, rate limit, profile geometry, SEO, security headers) and their tests
cv/             resume sources (HTML + CSS)
public/         photos and resume PDFs
```

## Run locally

```bash
npm ci
npm run dev        # http://localhost:3000
npm run typecheck
npm test
```

The contact form needs `RESEND_API_KEY`. Without it, the API answers `503` and nothing is sent.

## Workflow

`main` is protected: every change goes through a pull request with green CI (typecheck and tests), squash-merged, and merged branches are deleted automatically. Dependabot groups minor and patch npm updates weekly and GitHub Actions updates monthly; major versions of TypeScript and `@types/node` are bumped by hand (TypeScript must be supported by Next.js, `@types/node` follows the Node.js version in use, 24 in CI).
