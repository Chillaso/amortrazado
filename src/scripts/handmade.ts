// Hand-made motion for the whole site. Everything is triggered by scrolling into view (not by
// hover), so it plays the same on phones. With reduced motion nothing here runs and the page is
// shown in its final state.
//
// Markup hooks:
//   [data-pile]            a group whose [data-drop] children are laid down one after another
//   [data-drop]            a print dropped onto the table; its .tape pieces stick afterwards
//   [data-swing]           a frame that swings on its nail before settling
//   [data-deal]            a card dealt onto the table
//   [data-draw]            an SVG whose paths draw themselves (paths need pathLength="1")
//   [data-print]           the process slip, fed out of a printer slot
//   [data-annotate=type]   a hand-drawn underline/highlight/circle/box (Rough Notation)
//   [data-float]           drifts slightly while its section scrolls past
import { animate, inView, scroll, stagger } from 'motion';
import { annotate } from 'rough-notation';
import type { RoughAnnotationType } from 'rough-notation/lib/model';

const root = document.documentElement;
const spring = { type: 'spring', stiffness: 170, damping: 15, mass: 0.9 } as const;

function once(selector: string, run: (el: HTMLElement) => void, amount = 0.25) {
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    inView(el, () => run(el), { amount });
  });
}

function stickTape(scope: Element, delay: number) {
  const tapes = scope.querySelectorAll<HTMLElement>(':scope > .tape');
  if (!tapes.length) return;
  animate(
    tapes,
    { scaleX: [0, 1], opacity: [0, 1] },
    { duration: 0.35, delay: stagger(0.12, { startDelay: delay }), ease: [0.22, 1, 0.36, 1] },
  );
}

function drop(items: HTMLElement[], startDelay = 0) {
  items.forEach((el, i) => {
    const delay = startDelay + i * 0.16;
    const lean = i % 2 ? -7 : 6;
    animate(
      el,
      { opacity: [0, 1], y: [-46, 0], scale: [1.08, 1], rotate: [lean, 0] },
      { ...spring, delay, opacity: { duration: 0.25, delay } },
    );
    stickTape(el, delay + 0.4);
  });
}

function draw(svg: Element, delay = 0) {
  const paths = svg.querySelectorAll<SVGPathElement>('path');
  animate(paths, { strokeDashoffset: [1, 0] }, { duration: 1.2, delay: stagger(0.15, { startDelay: delay }), ease: [0.65, 0, 0.35, 1] });
}

function setup() {
  // Prints dropped onto the table, a pile at a time
  document.querySelectorAll<HTMLElement>('[data-pile]').forEach((pile) => {
    const items = [...pile.querySelectorAll<HTMLElement>('[data-drop]')];
    const isHero = pile.closest('.hero');
    if (isHero) drop(items, 0.2);
    else inView(pile, () => drop(items), { amount: 0.2 });
  });

  // Loose prints outside a pile
  once('[data-drop]:not([data-pile] [data-drop])', (el) => drop([el]));

  // Frames on the wall swing from their nail
  document.querySelectorAll<HTMLElement>('[data-swing-group]').forEach((group) => {
    inView(group, () => {
      group.querySelectorAll<HTMLElement>('[data-swing]').forEach((el, i) => {
        const delay = i * 0.12;
        animate(el, { opacity: [0, 1] }, { duration: 0.3, delay });
        animate(el, { rotate: [i % 2 ? 9 : -9, 0] }, { type: 'spring', stiffness: 90, damping: 6, mass: 1, delay });
        stickTape(el, delay + 0.3);
      });
    }, { amount: 0.15 });
  });

  // Pack cards dealt one by one
  document.querySelectorAll<HTMLElement>('[data-deal-group]').forEach((group) => {
    inView(group, () => {
      group.querySelectorAll<HTMLElement>('[data-deal]').forEach((el, i) => {
        const delay = i * 0.1;
        animate(el, { opacity: [0, 1] }, { duration: 0.2, delay });
        animate(el, { x: [-70, 0], y: [30, 0], rotate: [-14, 0] }, { ...spring, delay });
      });
    }, { amount: 0.15 });
  });

  // The process slip comes out of the printer
  // (watch the slot, not the slip: the slip starts outside it and would never be seen)
  document.querySelectorAll<HTMLElement>('[data-print]').forEach((el) => {
    inView(el.parentElement ?? el, () => {
      animate(el, { y: ['-102%', '0%'] }, { duration: 1.6, ease: [0.45, 0, 0.2, 1], delay: 0.1 });
    }, { amount: 0.3 });
  });

  // Lines that draw themselves
  document.querySelectorAll<SVGElement>('[data-draw]').forEach((svg) => {
    const delay = Number(svg.dataset.drawDelay ?? 0);
    if (svg.closest('.hero')) draw(svg, delay);
    else inView(svg, () => draw(svg, delay), { amount: 0.4 });
  });

  // Hand-drawn annotations
  document.querySelectorAll<HTMLElement>('[data-annotate]').forEach((el) => {
    const a = annotate(el, {
      type: el.dataset.annotate as RoughAnnotationType,
      color: el.dataset.color ?? '#a92b4b',
      strokeWidth: Number(el.dataset.stroke ?? 2),
      padding: Number(el.dataset.padding ?? 4),
      iterations: 2,
      multiline: true,
      animationDuration: 900,
    });
    inView(el, () => {
      setTimeout(() => a.show(), Number(el.dataset.delay ?? 300));
    }, { amount: 1, margin: '0px 0px -10% 0px' });
  });

  // Slight drift while scrolling
  document.querySelectorAll<HTMLElement>('[data-float]').forEach((el) => {
    const range = Number(el.dataset.float || 30);
    scroll(animate(el, { y: [range * 0.5, -range * 0.5] }, { ease: 'linear' }), {
      target: el.closest('section') ?? el,
      offset: ['start end', 'end start'],
    });
  });

  // The form's success check, drawn when the message is sent
  document.addEventListener('contact:sent', () => {
    document.querySelectorAll('[data-sent] [data-draw-on-sent]').forEach((svg) => draw(svg));
  });

  (window as unknown as { __fx: boolean }).__fx = true;
}

if (root.classList.contains('fx')) setup();
