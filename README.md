# jeremy-geneste.com

Personal site of **Jérémy Geneste**, full-stack JavaScript / TypeScript developer based in Paris, looking for a permanent role in Paris / Île-de-France.

**Live:** [jeremy-geneste.com](https://jeremy-geneste.com) (French) · [jeremy-geneste.com/en](https://jeremy-geneste.com/en) (English)

## Stack

- [Next.js 16](https://nextjs.org) (App Router, static rendering) and React 19
- TypeScript, Tailwind CSS 4
- [Resend](https://resend.com) for the contact form, [Vercel BotID](https://vercel.com/docs/botid) against bots
- Hosted on Vercel, tests with the Node.js test runner (`tsx --test`)

## Technical choices

**Bilingual without an i18n library.** French at `/` and English at `/en`, each with its own root layout (route groups), so every page ships the right `<html lang>`. There is no redirect based on the browser language: search engine crawlers always see both versions. `canonical`, `hreflang` (`fr`, `en`, `x-default`) and the sitemap tie them together. The copy lives in two typed dictionaries (`content/fr.ts`, `content/en.ts`).

**Everything that matters is in the server HTML.** The page is statically rendered; client JavaScript only replays animations (`components/PageEffects.tsx`). The figures, the timeline and the elevation profile are readable without JavaScript and by search engines. A `ProfilePage` + `Person` JSON-LD links the site to LinkedIn and GitHub.

**A real elevation profile as the timeline.** The experience section is led by the elevation profile from Chamonix to the Mont Blanc summit: 100 SRTM 30 m samples from the OpenTopoData API, stored in `lib/elevationProfile.ts`. A pure, tested helper turns them into SVG paths; career steps sit on the route and the track is drawn once when it comes into view.

**A hardened contact form.** `app/api/contact/route.ts` checks, in order: a per-instance rate limit, a same-origin `Origin` header, a JSON body under 20 KB, Vercel BotID, a honeypot field, then server-side validation. Emails are sent as plain text from a verified domain (DKIM, SPF), with the visitor as `reply_to`. The validation, request guard and rate limiter are pure functions with tests.

**Security headers on every page.** Content Security Policy (everything from this origin, no framing, no plugins, `unsafe-eval` in development only), HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`. The CSP has no nonce on purpose: a nonce would make every page dynamic.

**Motion with restraint.** One page-load entrance, figures that count down, the profile drawn once, a sidebar that follows the section being read. All of it respects `prefers-reduced-motion`.

## Run locally

```bash
npm ci
npm run dev        # http://localhost:3000
npm run typecheck
npm test
```

The contact form needs `RESEND_API_KEY`. Without it, the API answers `503` and nothing is sent.

## Workflow

`main` is protected: every change goes through a pull request with green CI (typecheck and tests), squash-merged. Dependabot opens grouped updates weekly (npm) and monthly (GitHub Actions).
