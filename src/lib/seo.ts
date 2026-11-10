// Structured data (schema.org JSON-LD) for search engines and AI assistants: who Amor Trazado is,
// where it works, what it sells and for how much, what couples say, and the FAQ. Built from the
// same data the pages show, so both always agree.
import { contact } from '../data/contact';
import { faq } from '../data/faq';
import { euros, giftPrices, packs, weddingPrices } from '../data/prices';
import { averageRating, reviews } from '../data/reviews';

export const SITE_NAME = 'Amor Trazado';
export const SITE_URL = 'https://amortrazado.com';
const BUSINESS_ID = `${SITE_URL}/#negocio`;

const sameAs = [contact.instagram, contact.tiktok, contact.bodasNet, contact.googleMaps].filter(Boolean);

const offer = (name: string, price: number, description?: string) => ({
  '@type': 'Offer',
  name,
  ...(description && { description }),
  priceSpecification: { '@type': 'PriceSpecification', minPrice: price, priceCurrency: 'EUR' },
  priceCurrency: 'EUR',
  price,
  availability: 'https://schema.org/InStock',
  areaServed: { '@type': 'Country', name: 'España' },
});

export function business(logo: string, image: string) {
  const prices = [...packs, ...weddingPrices, ...giftPrices].map((p) => p.price);
  return {
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': BUSINESS_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo,
    image,
    description:
      'Estudio de papelería de boda e ilustración personalizada en Jerez de la Frontera (Cádiz). Invitaciones de boda ilustradas a mano, save the date, seating plan, minutas, meseros, marcasitios, retratos y mapas de pareja. Trabaja para toda España.',
    slogan: 'Historias trazadas con amor',
    email: contact.email,
    telephone: contact.phone,
    priceRange: `${euros(Math.min(...prices))} - ${euros(Math.max(...prices))}`,
    currenciesAccepted: 'EUR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.street,
      postalCode: contact.postalCode,
      addressLocality: contact.city,
      addressRegion: contact.region,
      addressCountry: 'ES',
    },
    geo: { '@type': 'GeoCoordinates', ...contact.geo },
    hasMap: contact.googleMaps,
    areaServed: [
      { '@type': 'City', name: contact.city },
      { '@type': 'AdministrativeArea', name: 'Provincia de Cádiz' },
      { '@type': 'AdministrativeArea', name: 'Andalucía' },
      { '@type': 'Country', name: 'España' },
    ],
    founder: { '@type': 'Person', name: contact.owner, jobTitle: 'Ilustradora y diseñadora de papelería de boda' },
    knowsLanguage: 'es',
    knowsAbout: [
      'Invitaciones de boda',
      'Papelería de boda personalizada',
      'Ilustración personalizada',
      'Save the date',
      'Seating plan',
      'Retratos de pareja ilustrados',
      'Mapas de pareja',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: contact.phone,
      email: contact.email,
      availableLanguage: 'Spanish',
    },
    sameAs,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toFixed(1),
      bestRating: '5',
      worstRating: '1',
      reviewCount: reviews.length,
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      datePublished: r.date,
      name: r.title,
      reviewBody: r.text,
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      publisher: { '@type': 'Organization', name: r.source === 'google' ? 'Google' : 'Bodas.net' },
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Papelería de boda e ilustraciones',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Packs de papelería de boda',
          itemListElement: packs.map((p) => offer(`Pack ${p.name}`, p.price, `${p.tagline}. Incluye: ${p.items.join(', ')}.`)),
        },
        {
          '@type': 'OfferCatalog',
          name: 'Papelería de boda por piezas',
          itemListElement: weddingPrices.map((p) => offer(p.name, p.price)),
        },
        {
          '@type': 'OfferCatalog',
          name: 'Regalos e ilustración',
          itemListElement: giftPrices.map((p) => offer(p.name, p.price)),
        },
      ],
    },
  };
}

export const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#web`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: 'es-ES',
  publisher: { '@id': BUSINESS_ID },
};

export const faqPage = (pageUrl: string) => ({
  '@type': 'FAQPage',
  '@id': `${pageUrl}#preguntas-frecuentes`,
  mainEntity: faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const breadcrumb = (pageUrl: string, name: string) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name, item: pageUrl },
  ],
});

export const webPage = (pageUrl: string, title: string, description: string, type = 'WebPage') => ({
  '@type': type,
  '@id': `${pageUrl}#pagina`,
  url: pageUrl,
  name: title,
  description,
  inLanguage: 'es-ES',
  isPartOf: { '@id': `${SITE_URL}/#web` },
  about: { '@id': BUSINESS_ID },
});

/** JSON for a <script type="application/ld+json">, safe to put inside HTML */
export const jsonLd = (graph: object[]) =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
