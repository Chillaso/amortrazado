// Cuts the photographs and illustrations out of the composed slides in
// 01-resources/desktop and writes them to src/assets/images.
// Run with: node scripts/crop-images.mjs
// Only crops that hold up at the size the page shows them are kept.
// The other images come from 01-resources/originals (see optimize-images.mjs).
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = '01-resources/desktop';
const OUT = 'src/assets/images';
mkdirSync(OUT, { recursive: true });

// [output name, source slide, left, top, width, height]
const crops = [
  ['menu-mesa', 'section2', 910, 86, 397, 596],
  ['retrato-novios-marco', 'section6', 52, 18, 520, 740],
  ['ilus-baile', 'section6-3', 100, 36, 466, 341],
  ['ilus-beso', 'section6-3', 586, 36, 278, 341],
  ['ilus-invierno', 'section6-3', 883, 36, 439, 539],
  ['ilus-perro', 'section6-3', 689, 390, 175, 341],
];

for (const [name, slide, left, top, width, height] of crops) {
  await sharp(`${SRC}/${slide}.webp`)
    .extract({ left, top, width, height })
    .webp({ quality: 90 })
    .toFile(`${OUT}/${name}.webp`);
  console.log(`${name}.webp ${width}x${height}`);
}
