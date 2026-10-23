// Adds a Content-Security-Policy <meta> to every built page (GitHub Pages can't send headers).
// Scripts may only be the site's own files, or the inline scripts Astro wrote into the page, each
// allowed by its SHA-256 hash, which is computed here after the build.
//
// Astro has its own experimental CSP, but it always adds a style-src hash, and any hash makes the
// browser ignore 'unsafe-inline', which would block the style="--tilt:…" attributes the prints use.
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Inline scripts only: those with a src are covered by 'self'
const INLINE_SCRIPT = /<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/gi;

/** @param {{ directives: string[] }} options every directive except script-src */
export default function csp({ directives }) {
  return {
    name: 'csp-meta',
    hooks: {
      /** @param {{ dir: URL, logger: import('astro').AstroIntegrationLogger }} params */
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const pages = (await readdir(root, { recursive: true })).filter((f) => f.endsWith('.html'));

        for (const page of pages) {
          const file = join(root, page);
          const html = await readFile(file, 'utf8');
          const hashes = [...html.matchAll(INLINE_SCRIPT)]
            .filter(([, body]) => body.trim())
            .map(([, body]) => `'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`);
          const policy = [...directives, ["script-src 'self'", ...new Set(hashes)].join(' ')].join('; ');
          const meta = `<meta http-equiv="Content-Security-Policy" content="${policy}">`;

          // The policy only covers what comes after it, so it goes right after the charset
          const at = html.match(/<meta charset[^>]*>/i) ?? html.match(/<head[^>]*>/i);
          if (!at || at.index === undefined) throw new Error(`csp: no <head> in ${page}`);
          const end = at.index + at[0].length;
          await writeFile(file, html.slice(0, end) + meta + html.slice(end));
        }
        logger.info(`Content-Security-Policy added to ${pages.length} pages`);
      },
    },
  };
}
