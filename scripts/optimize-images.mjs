// Resizes the original high-resolution photos and illustrations in 01-resources/originals
// and writes them to public/images/pieces, plus the logo files in public/images.
// Run with: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = '01-resources/originals';
const OUT = 'public/images/pieces';
mkdirSync(OUT, { recursive: true });

// [source file, output name, width] — width is about twice the largest size the page shows
const images = [
  ['papeleria-collage.png', 'papeleria-collage', 1800],
  ['invitacion-ramo.png', 'invitacion-ramo', 720],
  ['save-the-date.png', 'save-the-date', 720],
  ['invitacion-flores.png', 'invitacion-flores', 720],
  ['seating-plan-jardin.jpg', 'seating-plan-jardin', 1200],
  ['ilus-amigas.png', 'ilus-amigas', 720],
  ['mapa-pareja.png', 'mapa-pareja', 900],
  ['retrato-contacto.png', 'retrato-contacto', 720],
];

for (const [file, name, width] of images) {
  const info = await sharp(`${SRC}/${file}`)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(`${OUT}/${name}.webp`);
  console.log(`${name}.webp ${info.width}x${info.height}`);
}

// The full logo for the header, and the stamp alone (its left part) for small marks.
const logo = sharp(`${SRC}/logo.png`).trim();
const { data, info } = await logo.toBuffer({ resolveWithObject: true });
const full = await sharp(data).resize({ height: 160 }).webp({ quality: 90 }).toFile('public/images/logo.webp');
console.log(`logo.webp ${full.width}x${full.height}`);
const stamp = sharp(data).extract({ left: 0, top: 0, width: info.height, height: info.height });
const mark = await stamp.clone().resize(96).webp({ quality: 90 }).toFile('public/images/logo-mark.webp');
console.log(`logo-mark.webp ${mark.width}x${mark.height}`);
await stamp.clone().resize(64).png().toFile('public/favicon.png');
console.log('favicon.png 64x64');
