// Cuts the photographs and illustrations out of the composed slides in
// 01-resources/desktop and writes them to public/images/pieces.
// Run with: node scripts/crop-images.mjs
// Replace these crops with the original high-resolution files when available.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = '01-resources/desktop';
const OUT = 'public/images/pieces';
mkdirSync(OUT, { recursive: true });

// [output name, source slide, left, top, width, height]
const crops = [
  ['invitacion-mesa', 'section1', 690, 62, 617, 628],
  ['grullas', 'section2', 58, 86, 398, 596],
  ['mesa-frutas', 'section2', 485, 86, 397, 596],
  ['menu-mesa', 'section2', 910, 86, 397, 596],
  ['suite-kraft', 'section4', 0, 0, 1366, 768],
  ['pieza-invitacion', 'section4', 86, 92, 384, 540],
  ['pieza-menu', 'section4', 550, 94, 258, 522],
  ['pieza-seating', 'section4', 880, 90, 382, 538],
  ['seating-calabazas', 'section1-1', 77, 55, 555, 657],
  ['mesa-panorama', 'section3', 0, 662, 1366, 106],
  ['retrato-grupo-manos', 'section6-2', 683, 62, 624, 628],
  ['retrato-novios-marco', 'section6', 52, 18, 520, 740],
  ['ilus-baile', 'section6-3', 100, 36, 466, 341],
  ['ilus-beso', 'section6-3', 586, 36, 278, 341],
  ['ilus-invierno', 'section6-3', 883, 36, 439, 539],
  ['ilus-novios', 'section6-3', 100, 390, 276, 341],
  ['ilus-grupo', 'section6-3', 395, 390, 276, 341],
  ['ilus-perro', 'section6-3', 689, 390, 175, 341],
];

for (const [name, slide, left, top, width, height] of crops) {
  await sharp(`${SRC}/${slide}.webp`)
    .extract({ left, top, width, height })
    .webp({ quality: 90 })
    .toFile(`${OUT}/${name}.webp`);
  console.log(`${name}.webp ${width}x${height}`);
}
