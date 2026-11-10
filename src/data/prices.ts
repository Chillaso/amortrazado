// Prices and packs, in one place: the packs section, the price lists, the FAQ and the structured
// data for search engines all read from here, so a price changes everywhere at once.
//   from   true = "desde" (the price grows with the number of pieces or people)

export interface Pack {
  id: string;
  name: string;
  tagline: string;
  price: number;
  /** A line under the price: what it comes to per guest at a 150-guest wedding */
  perGuest: string;
  revisions: number;
  items: string[];
  featured?: boolean;
}

export const packs: Pack[] = [
  {
    id: 'primer-trazo',
    name: 'Primer Trazo',
    tagline: 'Todo lo esencial para empezar a contar vuestra historia',
    price: 80,
    perGuest: 'Menos de 0,60 € por invitado en una boda de 150',
    revisions: 2,
    items: [
      'Diseño personalizado de invitación',
      'Diseño de save the date o lámina',
      'Reuniones y 2 rondas de revisiones',
      'Archivos finales preparados para imprimir',
      'Versión digital adaptada a WhatsApp y redes',
    ],
  },
  {
    id: 'nuestra-historia',
    name: 'Nuestra Historia',
    tagline: 'Una misma historia, presente en cada pequeño detalle',
    price: 225,
    perGuest: 'Menos de 2 € por invitado en una boda de 150',
    revisions: 3,
    items: [
      'Todo el pack Primer Trazo',
      'Seating plan',
      'Meseros',
      'Minutas',
      'Marcasitios',
      '3 rondas de revisiones',
    ],
    featured: true,
  },
  {
    id: 'amor-trazado',
    name: 'Amor Trazado',
    tagline: 'Para quienes quieren que hasta el último rincón hable de ellos',
    price: 300,
    perGuest: '2 € por invitado en una boda de 150',
    revisions: 4,
    items: [
      'Todo el pack Nuestra Historia',
      'Retrato ilustrado de pareja',
      'Cartel de bienvenida',
      '4 rondas de revisiones',
      'Prioridad de entrega',
    ],
  },
];

export interface PriceItem {
  name: string;
  price: number;
  from?: boolean;
  note?: string;
}

export const weddingPrices: PriceItem[] = [
  { name: 'Invitación', price: 50, from: true },
  { name: 'Estampado de sobres', price: 30 },
  { name: 'Save the date', price: 30 },
  { name: 'Seating plan', price: 60, from: true },
  { name: 'Meseros', price: 30, from: true },
  { name: 'Minutas', price: 35 },
  { name: 'Marcasitios', price: 20, from: true },
  { name: 'Cartel de bienvenida', price: 45 },
  { name: 'Lámina personalizada', price: 20 },
];

export const giftPrices: PriceItem[] = [
  { name: 'Retrato digital', price: 20, note: '1 persona' },
  { name: 'Retrato de pareja', price: 30, from: true },
  { name: 'Mapa de pareja', price: 45, from: true },
  { name: 'Regalo personalizado', price: 35, from: true },
  { name: 'Camisetas personalizadas', price: 30, from: true },
];

/** "50 €", "0,60 €": Spanish number format */
export const euros = (n: number) => `${n.toLocaleString('es-ES')} €`;
export const priceLabel = (p: { price: number; from?: boolean }) => `${p.from ? 'desde ' : ''}${euros(p.price)}`;
