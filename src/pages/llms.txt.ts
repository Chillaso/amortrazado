// /llms.txt: a plain-text summary of the business for AI assistants (ChatGPT, Gemini, Claude,
// Perplexity…), following https://llmstxt.org. Built from the same data as the pages.
import type { APIRoute } from 'astro';
import { contact } from '../data/contact';
import { faq } from '../data/faq';
import { euros, giftPrices, packs, priceLabel, weddingPrices } from '../data/prices';
import { averageRating, reviews } from '../data/reviews';

export const GET: APIRoute = ({ site }) => {
  const page = (path: string) => new URL(path, site).href;
  const list = (items: { name: string; price: number; from?: boolean; note?: string }[]) =>
    items.map((i) => `- ${i.name}${i.note ? ` (${i.note})` : ''}: ${priceLabel(i)}`).join('\n');

  const text = `# Amor Trazado

> Estudio de papelería de boda e ilustración personalizada de ${contact.owner}, en ${contact.city} (${contact.region}, España). Diseña y dibuja a mano invitaciones de boda, save the date, seating plan, minutas, meseros, marcasitios y carteles, además de retratos y mapas de pareja para regalar. Trabaja para parejas de toda España, en línea (videollamada, WhatsApp, email), y también se encarga de la impresión y el envío.

Valoración: ${averageRating.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} de 5 en Bodas.net (${reviews.length} opiniones, el 100 % de las parejas lo recomienda).

## Contacto

- WhatsApp: ${contact.phone} (${contact.whatsapp.split('?')[0]})
- Email: ${contact.email}
- Instagram: ${contact.instagram}
- TikTok: ${contact.tiktok}
- Bodas.net: ${contact.bodasNet}

## Packs de papelería de boda

${packs
  .map((p) => `### Pack ${p.name}: desde ${euros(p.price)}${p.featured ? ' (el más elegido)' : ''}\n${p.tagline}. ${p.perGuest}.\nIncluye: ${p.items.join('; ')}.`)
  .join('\n\n')}

## Papelería de boda por piezas (precios de diseño)

${list(weddingPrices)}

## Regalos e ilustración

${list(giftPrices)}

## Preguntas frecuentes

${faq.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Opiniones de parejas

${reviews.map((r) => `- ${r.name} (${r.source}, ${r.date}, ${r.rating}/5): "${r.text}"`).join('\n')}

## Páginas

- [Inicio](${page('/')}): papelería de boda, packs, opiniones y contacto
- [Papelería de boda](${page('/papeleria-bodas/')}): invitaciones, seating plan, minutas y packs
- [Ilustraciones personalizadas](${page('/ilustraciones/')}): retratos y mapas de pareja para regalar
- [Portfolio](${page('/portfolio/')}): trabajos reales
- [Mi historia](${page('/mi-historia/')}): cómo nació Amor Trazado
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
