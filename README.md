# Amor Trazado — amortrazado.com

Static site built with [Astro](https://astro.build). No UI framework: every section is an `.astro`
component, styles live in `src/styles/global.css` (tokens) plus each component's scoped `<style>`,
and the only client JavaScript is the scroll reveal (in `Layout.astro`) and the live invitation
(`InvitationLab.astro`).

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs dist/
```

## Deploy

Every push to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`
(repo Settings → Pages → Source must be **GitHub Actions**). The site is served at
https://chillaso.github.io/amortrazado/, so `astro.config.mjs` sets `base: '/amortrazado'`.
Internal links and images go through `url()` from `src/lib/url.ts` so they pick up the base path.

To move to the custom domain later: set `site: 'https://amortrazado.com'`, remove `base`, add
`public/CNAME` with `amortrazado.com`, and point the DNS at GitHub Pages.

## Structure

| Path | What |
| --- | --- |
| `src/pages/index.astro` | Landing: hero, papelería, live invitation, process, packs, illustrations, contact |
| `src/pages/papeleria-bodas.astro` | Wedding stationery page |
| `src/pages/ilustraciones.astro` | Custom illustration page |
| `src/components/` | One component per section; `StampMark.astro` is the logo stamp drawn in SVG |
| `src/data/contact.ts` | Email, WhatsApp and Instagram links used everywhere |
| `public/images/pieces/` | Photos and illustrations cut from the slides in `01-resources/` |
| `scripts/crop-images.mjs` | Regenerates `public/images/pieces/` from `01-resources/desktop/` |

## Before launch

- Replace the WhatsApp placeholder number in `src/data/contact.ts`.
- Replace the images in `public/images/pieces/` with the original high-resolution photos
  (the current ones are crops of 1366px slides and look soft on large or retina screens).
  Keep the file names, or update the `src` and `width`/`height` in the components.

## Colours

Crimson `#a92b4b` (actions, accents, footer), sage `#9fbc98` (fields), blush `#e2c3b6`, on a
low-chroma bone ground `#f6f4f3` with wine-black ink `#2a1a1e`. Typeface: Sentient (Fontshare).
