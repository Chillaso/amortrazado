// The sitemap search engines read (linked from robots.txt). Lists every page, built at build time.
import type { APIRoute } from 'astro';

const pages = import.meta.glob('./**/*.astro', { eager: false });

export const GET: APIRoute = ({ site }) => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = Object.keys(pages)
    .map((file) => file.replace(/^\.\//, '').replace(/\.astro$/, '').replace(/(^|\/)index$/, ''))
    .filter((path) => !path.split('/').some((part) => part.startsWith('_') || part.startsWith('[') || part === '404'))
    .sort()
    .map((path) => {
      const loc = new URL(path ? `/${path}/` : '/', site).href;
      return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><priority>${path ? '0.8' : '1.0'}</priority></url>`;
    });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
