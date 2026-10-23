// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import csp from './integrations/csp.mjs';

// The contact Lambda is the only place the page sends data to (see src/lib/contact-api.ts)
const { PUBLIC_CONTACT_ENDPOINT } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const contactOrigin = PUBLIC_CONTACT_ENDPOINT ? new URL(PUBLIC_CONTACT_ENDPOINT).origin : '';

// https://astro.build/config
// Served from GitHub Pages at the root of https://amortrazado.com, the domain in public/CNAME.
// Locally the site runs at the root of http://localhost (npm run dev, npm run preview).
export default defineConfig({
  site: 'https://amortrazado.com',
  integrations: [
    csp({
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        // Inline style attributes are allowed: the prints set their tilt and tape with them
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        'font-src https://fonts.gstatic.com',
        `connect-src 'self'${contactOrigin ? ` ${contactOrigin}` : ''}`,
        "form-action 'self' mailto:",
        "base-uri 'self'",
        "object-src 'none'",
        'upgrade-insecure-requests',
      ],
    }),
  ],
});
