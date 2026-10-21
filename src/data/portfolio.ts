// The works shown on /portfolio, in the order they appear: move an entry up or down to reorder.
//
// To add a work, drop the image into src/assets/images/ (any size: it is resized at build time)
// and add an entry here with its file name.
//   image        file name inside src/assets/images/
//   alt          what the image shows, for people who can't see it
//   title        optional, shown in the description card
//   description  optional; without it the piece can't be opened
//   note         optional handwritten caption under the print
export interface PortfolioWork {
  image: string;
  alt: string;
  title?: string;
  description?: string;
  note?: string;
}

export const portfolio: PortfolioWork[] = [
  {
    image: 'papeleria-collage.webp',
    alt: 'Papelería de boda en tonos lila: invitación, timeline, minuta, tarjetas y sellos ilustrados',
    title: 'Papelería de Vicky y Víctor',
    description:
      'Invitación, timeline, minuta, tarjetas y sellos en tonos lila, con los edificios del lugar de la celebración dibujados a mano.',
  },
  {
    image: 'save-the-date.webp',
    alt: 'Save the date ilustrado de Óscar y Felipe, con la pareja sentada en un sofá rosa',
    title: 'Save the date de Óscar y Felipe',
    description: 'Un save the date ilustrado con la pareja retratada en un sofá rosa, para anunciar la fecha a su manera.',
    note: 'save the date',
  },
  {
    image: 'retrato-novios-marco.webp',
    alt: 'Retrato ilustrado de unos novios dentro de un marco ondulado granate',
    title: 'Retrato de novios',
    description: 'Retrato ilustrado de la pareja el día de su boda, enmarcado con una línea ondulada en granate.',
  },
  {
    image: 'invitacion-ramo.webp',
    alt: 'Una novia sostiene la invitación ilustrada de Berta y Javier junto a su ramo',
    note: 'invitación de boda',
  },
  {
    image: 'mapa-pareja.webp',
    alt: 'Mapa ilustrado de la historia de Laura y Raúl, con los lugares y momentos que han vivido juntos',
    title: 'Mapa de Laura y Raúl',
    description:
      'Un mapa ilustrado que recorre los lugares y momentos que Laura y Raúl han vivido juntos. Y la historia continúa.',
  },
  {
    image: 'ilus-baile.webp',
    alt: 'Ilustración de una pareja abrazada, ella con falda roja levantando un pie',
  },
  {
    image: 'seating-plan-jardin.webp',
    alt: 'Seating plan con tarjetas colgadas entre macetas de flores, frutas y velas en un jardín',
    title: 'Seating plan entre flores',
    description: 'Las tarjetas de cada mesa, colocadas entre macetas, frutas y velas para recibir a los invitados.',
    note: 'seating plan',
  },
  {
    image: 'ilus-amigas.webp',
    alt: 'Ilustración de un grupo de amigas abrazadas, en tonos verdes, malvas y azules',
  },
  {
    image: 'menu-mesa.webp',
    alt: 'Minuta ilustrada «Menú de bodas» sobre una mesa de madera junto a una vela',
    note: 'la minuta',
  },
  {
    image: 'ilus-beso.webp',
    alt: 'Ilustración de una pareja besándose, él con chistera',
  },
  {
    image: 'invitacion-flores.webp',
    alt: 'Dos manos sostienen una invitación ilustrada delante de un ramo de flores naranjas y granates',
  },
  {
    image: 'ilus-invierno.webp',
    alt: 'Ilustración de una pareja con gorros de lana y abrigos de invierno',
  },
  {
    image: 'ilus-perro.webp',
    alt: 'Ilustración de un bulldog francés marrón tumbado',
    note: 'también peludos',
  },
];
