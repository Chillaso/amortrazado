// Frequently asked questions: shown on the home and wedding stationery pages, and given to search
// engines and AI assistants (FAQPage structured data and /llms.txt). Answers are plain text.
import { packs } from './prices';

const revisions = packs.map((p) => `${p.revisions} en el pack ${p.name}`).join(', ').replace(/, ([^,]*)$/, ' y $1');

export const faq: { q: string; a: string }[] = [
  {
    q: '¿Cómo reservo mi fecha? ¿Hay que pagar una señal?',
    a: 'Sí. Para reservar vuestra fecha y empezar a diseñar pido una señal del 40 % del presupuesto. El resto se paga antes de entregar los archivos finales o de mandar a imprimir. Os lo detallo todo por escrito en el presupuesto, sin letra pequeña.',
  },
  {
    q: '¿Cuántas revisiones incluye cada pack?',
    a: `Las rondas de revisiones dependen del pack: ${revisions}. En cada ronda podéis pedir los cambios que queráis sobre el diseño (textos, colores, detalles de la ilustración). Si necesitáis alguna más, se presupuesta aparte.`,
  },
  {
    q: '¿Os encargáis también de la impresión?',
    a: 'Sí, si lo necesitáis. Los precios de los packs incluyen el diseño y los archivos listos para imprimir; la impresión se presupuesta aparte según cantidad, papel y acabados. Trabajo con papeles de alta calidad y acabados cuidados. Si preferís imprimir por vuestra cuenta, os entrego los archivos preparados para imprenta.',
  },
  {
    q: '¿Hacéis envíos? ¿Trabajáis solo en Jerez?',
    a: 'Trabajo desde Jerez de la Frontera (Cádiz) para parejas de toda España. Todo el proceso puede hacerse por videollamada, WhatsApp o email. Los archivos digitales se entregan por email y, si encargáis la impresión, os la envío por mensajería con seguimiento a cualquier punto de España.',
  },
  {
    q: '¿Qué pasa si cancelamos o cambiamos la fecha de la boda?',
    a: 'Si cambiáis la fecha, adaptamos los diseños sin problema. Si canceláis, la señal cubre el trabajo ya realizado y no se devuelve una vez empezado el diseño; lo que no se haya hecho todavía no se cobra. Cualquier caso especial lo hablamos con calma.',
  },
  {
    q: '¿Con cuánta antelación debo pedirlo?',
    a: 'Lo ideal es escribirme entre 6 y 9 meses antes de la boda si queréis save the date, y unos 4 meses antes para el resto de la papelería. Si vais con prisa, escribidme igualmente: el pack Amor Trazado incluye prioridad de entrega.',
  },
];
