# Amor Trazado — amortrazado.com

Static site built with [Astro](https://astro.build). No UI framework: every section is an `.astro`
component, shared styles and hand-made devices (prints, washi tape, hand-drawn checks, paper grain)
live in `src/styles/global.css`. Client JavaScript: the contact form and the motion script.
Type: Fraunces (headings and text) and Caveat (handwritten notes), from Google Fonts.

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
| `src/pages/index.astro` | Landing: hero, papelería, statement, process, packs, illustrations, contact |
| `src/pages/papeleria-bodas.astro` | Wedding stationery page |
| `src/pages/ilustraciones.astro` | Custom illustration page |
| `src/components/` | One component per section; `StampMark.astro` is the logo stamp drawn in SVG |
| `src/lib/contact-api.ts` | Sends the contact form (mocked until a backend exists, see below) |
| `src/data/contact.ts` | Email, WhatsApp and Instagram links used everywhere |
| `public/images/pieces/` | Photos and illustrations cut from the slides in `01-resources/` |
| `scripts/crop-images.mjs` | Regenerates `public/images/pieces/` from `01-resources/desktop/` |

## Motion

`src/scripts/handmade.ts` runs every effect, triggered by scrolling into view so it also plays on
phones: prints dropping onto the table and their tape sticking, illustration frames swinging, pack
cards being dealt, the process slip printing out, hand-drawn lines drawing themselves and
hand-drawn annotations ([Rough Notation](https://roughnotation.com)). Springs and scroll triggers
come from [Motion](https://motion.dev). Sections opt in with `data-*` attributes (listed at the top
of the script). With reduced motion, or if the script fails to load, the page shows its final state.
Page-to-page navigation uses CSS cross-document view transitions.

## Contact form

The form validates in the browser and calls `sendContactRequest()` in `src/lib/contact-api.ts`.
Until there is a backend it only simulates the request (and logs the payload to the console); an
email ending in `@fallo.test` simulates a failure so the error message can be checked.
To connect the backend, set `PUBLIC_CONTACT_ENDPOINT` at build time: the form data is POSTed there
as JSON (`name, email, phone, services[], eventDate, location, guests, message, consent`) and any
2xx response counts as sent.

## Before launch

- Replace the WhatsApp placeholder number in `src/data/contact.ts`.
- Connect the contact form to a backend (see above).
- The images are crops of 1366px slides, so the page never shows them larger than their real size.
  With the original high-resolution photos they could be used larger; keep the file names, or
  update the `src` and `width`/`height` in the components.

## Colours

Crimson `#a92b4b` (actions, statement, footer), sage `#9fbc98` and blush `#e8cbbf` (fields and pack
cards), on a pale paper ground `#f6f3f2` with wine-black ink `#2e1b21`.
