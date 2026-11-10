// Real reviews from couples, shown in the reviews section and given to search engines.
//
// To add one (from bodas.net, Google Business Profile or anywhere else), copy an entry, paste the
// text exactly as the couple wrote it, and pick the photo of the piece you made for them:
//   source  where it was published: 'bodas.net' or 'google' (it links back there)
//   date    YYYY-MM-DD, the day it was published
//   image   file name inside src/assets/images/ (the piece you made for them)
//   piece   what that piece is, shown under the photo
//   alt     what the photo shows, for people who can't see it
export interface Review {
  name: string;
  source: 'bodas.net' | 'google';
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title?: string;
  text: string;
  image: string;
  piece: string;
  alt: string;
}

export const reviews: Review[] = [
  {
    name: 'Laura',
    source: 'bodas.net',
    date: '2026-09-13',
    rating: 5,
    title: 'Regalo único',
    text:
      'Ha sido una experiencia excelente de principio a fin. Marina supo plasmar nuestra historia de pareja de una forma muy bonita, cuidada y totalmente personalizada. El resultado nos encantó porque consiguieron reflejar momentos importantes para nosotros y convertirlos en un recuerdo muy especial. Se ajustó perfectamente al presupuesto acordado y, en nuestra opinión, la relación calidad-precio es muy buena, especialmente teniendo en cuenta que se trata de un trabajo personalizado y realizado con mucho detalle. Además, destacaría especialmente su profesionalidad: la comunicación fue muy fluida, estuvieron pendientes de las indicaciones y fue muy atenta durante todo el proceso. Sin duda, los recomendaríamos a otras parejas que busquen un recuerdo original, emotivo y diferente de su historia.',
    image: 'mapa-pareja.webp',
    piece: 'Su mapa de pareja',
    alt: 'Mapa ilustrado de la historia de Laura y Raúl, con los lugares y momentos que han vivido juntos',
  },
  {
    name: 'Carlos',
    source: 'bodas.net',
    date: '2026-09-01',
    rating: 5,
    title: 'Los detalles importan',
    text:
      'Marina ha sido una persona que nos ha acompañado durante todo el viaje de preparación de la boda, dándonos las mejores recomendaciones y haciendo el diseño personalizado a nuestros gustos. Atenta, creativa y siempre dispuesta para atender nuestras dudas, además el trabajo salió más rapido de lo esperado y superó nuestras expectativas. Sin duda lo recomendaría para todas las bodas o eventos que quieran darle un toque personalizado y que se fijen en los detalles que luego los invitados valoran de verdad',
    image: 'mi-boda.webp',
    piece: 'Invitación de boda',
    alt: 'Dos invitaciones con código QR, junto a una etiqueta de madera con iniciales y corchos sobre una mesa rústica',
  },
  {
    name: 'Ana',
    source: 'bodas.net',
    date: '2026-10-20',
    rating: 5,
    title: 'Rapidez y eficacia',
    text:
      'Marina fue muy amable y estuvo a nuestra disposición durante todo el proceso de diseño. Además, fue adaptándose a nuestros gustos.',
    image: 'panuelo1.webp',
    piece: 'Regalo personalizado',
    alt: 'Invitación con marco floral verde y malva, junto a plumas y hojas sobre una mesa de madera',
  },
];

export const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
