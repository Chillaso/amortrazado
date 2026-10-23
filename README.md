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
https://amortrazado.com: `astro.config.mjs` sets `site` to that address, and `public/CNAME` tells
GitHub Pages to serve it on the custom domain. The site has no base path, so the root of the
domain is the root of the site.

One-time setup for the domain:

- **DNS:** at the registrar, point `amortrazado.com` at GitHub Pages (A records to GitHub's Pages
  IPs, see GitHub's docs on custom domains). For `www`, add a CNAME record pointing `www` at
  `chillaso.github.io`. GitHub redirects
  `www.amortrazado.com` to `amortrazado.com`, the domain in `public/CNAME`.
- **Pages:** Settings → Pages → Custom domain should read `amortrazado.com`. Once the certificate is
  issued, tick **Enforce HTTPS**.
- **Contact Lambda:** its `ALLOWED_ORIGINS` must include `https://amortrazado.com`, or the browser
  blocks the form on the live site.

Internal links and images go through `url()` from `src/lib/url.ts`, so they would pick up a base
path if one were ever set again.

## Security

- **Content-Security-Policy:** GitHub Pages can't send headers, so `integrations/csp.mjs` writes a
  CSP `<meta>` into every built page: scripts only from the site itself (inline ones by hash,
  computed after the build), fonts from Google Fonts, and requests only to the site and the
  contact endpoint (`PUBLIC_CONTACT_ENDPOINT`, read in `astro.config.mjs`). A new third-party
  script, font or API needs its origin added to the directives there. The policy is not applied
  in `npm run dev`; check new things with `npm run build && npm run preview`.
- **Form:** field lengths and the email check match the backend's validation; the request goes
  without cookies or referrer.
- **CI:** actions are pinned to commit SHAs, `npm ci` skips install scripts, and Dependabot
  (`.github/dependabot.yml`) proposes npm and action updates weekly.

## Structure

| Path | What |
| --- | --- |
| `src/pages/index.astro` | Landing: hero, papelería, statement, process, packs, illustrations, contact |
| `src/pages/papeleria-bodas.astro` | Wedding stationery page |
| `src/pages/ilustraciones.astro` | Custom illustration page |
| `src/pages/portfolio.astro` | Portfolio: every past work on one board |
| `src/data/portfolio.ts` | The portfolio works, in display order |
| `src/components/` | One component per section |
| `integrations/csp.mjs` | Adds the Content-Security-Policy `<meta>` to every built page |
| `src/lib/contact-api.ts` | Sends the contact form to the backend (mocked without one, see below) |
| `src/data/contact.ts` | Email, WhatsApp, Instagram and TikTok links used everywhere |
| `src/assets/images/` | Every photo and illustration, used by the sections and the portfolio |
| `public/images/logo*.webp`, `public/favicon.png` | The logo, and its stamp alone for small marks |
| `01-resources/originals/` | Original high-resolution photos, illustrations and logo |
| `scripts/optimize-images.mjs` | Resizes `01-resources/originals/` into `src/assets/images/` (and the logo into `public/images/`) |
| `scripts/crop-images.mjs` | Regenerates the minuta and illustration-wall crops in `src/assets/images/` from `01-resources/desktop/` |

## Motion

`src/scripts/handmade.ts` runs every effect, triggered by scrolling into view so it also plays on
phones: prints dropping onto the table and their tape sticking, illustration frames swinging, pack
cards being dealt, the process slip printing out, hand-drawn lines drawing themselves and
hand-drawn annotations ([Rough Notation](https://roughnotation.com)). Springs and scroll triggers
come from [Motion](https://motion.dev). Sections opt in with `data-*` attributes (listed at the top
of the script). With reduced motion, or if the script fails to load, the page shows its final state.
Page-to-page navigation uses CSS cross-document view transitions.

## Portfolio

`/portfolio` shows every work listed in `src/data/portfolio.ts`, on one long board (three columns
on desktop, two on phones). Images live in `src/assets/images/`, the same folder the other sections
use, so a photo is never stored twice.

To show an image in the portfolio:

1. Put the file in `src/assets/images/` (`.png`, `.jpg`, `.jpeg`, `.webp` or `.avif`, any size: it is
   resized and converted to WebP at build time). Use a short name without spaces, e.g.
   `invitacion-lucia.jpg`.
2. Add an entry to the `portfolio` list in `src/data/portfolio.ts`:

   ```ts
   {
     image: 'invitacion-lucia.jpg',          // file name in src/assets/images/
     alt: 'Invitación ilustrada con olivos',  // what the image shows (for screen readers)
   },
   ```

3. Order: the list order is the order on the page, left to right and then down. Move an entry up or
   down to reorder. To hide a work, delete (or comment out) its entry; the file can stay.

Every work shows a small crimson "+" and opens at full size when clicked.
If an entry names a file that isn't in `src/assets/images/`, the build stops and says which one.

## Contact form

The form validates in the browser and calls `sendContactRequest()` in `src/lib/contact-api.ts`,
which POSTs it as JSON (`name, email, phone, services[], eventDate, location, guests, message,
consent`) to `PUBLIC_CONTACT_ENDPOINT`. Any 2xx response counts as sent.

The backend is an AWS Lambda in its own repository, `bck-contact-lambda`: it emails each request,
as pretty-printed JSON, to a configurable address. Its README covers the AWS setup.

- **Production:** set the repository variable `PUBLIC_CONTACT_ENDPOINT` (Settings → Secrets and
  variables → Actions → Variables) to the Lambda's Function URL. The deploy workflow passes it to
  the build. Without it the form shows the error message instead of pretending to send.
- **Locally:** without the variable, `npm run dev` simulates the request and logs it to the
  console; an email ending in `@fallo.test` simulates a failure. To test against the real Lambda,
  add `PUBLIC_CONTACT_ENDPOINT=https://…` to a `.env` file and add `http://localhost:4321` to the
  Lambda's `ALLOWED_ORIGINS`.

## Before launch

- Set up the contact Lambda and the `PUBLIC_CONTACT_ENDPOINT` variable (see Contact form).
- The minuta photo and most of the illustrations wall are still crops of 1366px slides, so the page
  never shows them larger than their real size. With the originals, add them to
  `01-resources/originals/` and `scripts/optimize-images.mjs`.

## Colours

Crimson `#a92b4b` (actions, statement, footer), sage `#9fbc98` and blush `#e8cbbf` (fields and pack
cards), on a pale paper ground `#f6f3f2` with wine-black ink `#2e1b21`.
