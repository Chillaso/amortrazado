// Contact details used across the site.
const whatsappNumber = '34640722188';
// Amor Trazado, C. Guernica, Jerez de la Frontera
const googlePlaceId = 'ChIJE_NZOLfHDQ0RMO3wCZsiBh0';

/** The message WhatsApp opens with, so the first line of the chat is already written. */
export const whatsappWelcome =
  '¡Hola Marina! Vengo de la web de Amor Trazado y me gustaría pedir información para nuestra boda.';

/** A wa.me link that opens the chat with a message already typed (the welcome one by default). */
export const whatsappLink = (text = whatsappWelcome) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

export const contact = {
  email: 'amortrazado@gmail.com',
  phone: `+${whatsappNumber}`,
  whatsapp: whatsappLink(),
  instagram: 'https://instagram.com/amortrazado',
  instagramHandle: '@amortrazado',
  tiktok: 'https://www.tiktok.com/@amortrazado',
  tiktokHandle: '@amortrazado',
  bodasNet: 'https://www.bodas.net/invitaciones-de-boda/amor-trazado--e291563',
  bodasNetReviews: 'https://www.bodas.net/invitaciones-de-boda/amor-trazado--e291563/opiniones',
  // The Google Business Profile, by its Place ID (find it at
  // https://developers.google.com/maps/documentation/places/web-service/place-id). The profile
  // opens the listing in Google Maps; the reviews link opens the "write a review" box on it.
  // Leave googlePlaceId empty and neither is shown.
  googlePlaceId,
  googleProfile: googlePlaceId ? `https://www.google.com/maps/search/?api=1&query=Amor%20Trazado&query_place_id=${googlePlaceId}` : '',
  // The listing's permanent Maps link (its CID), used in the structured data for search engines
  googleMaps: 'https://maps.google.com/?cid=2091397126242233648',
  googleReviews: googlePlaceId ? `https://search.google.com/local/writereview?placeid=${googlePlaceId}` : '',
  street: 'C. Guernica',
  postalCode: '11406',
  geo: { latitude: 36.6838632, longitude: -6.1045976 },
  city: 'Jerez de la Frontera',
  region: 'Cádiz',
  owner: 'Marina',
};
