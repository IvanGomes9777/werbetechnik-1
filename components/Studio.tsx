'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from 'framer-motion';

/**
 * STUDIO — Design H (Center-Statement).
 * Vollflächiges Hintergrundbild mit Scroll-Parallax, zentrierte Headline
 * mit Oliv-Outline, Glas-Statband (gestaffelter Entrance).
 *
 * TODO: Hintergrundbild von Ivan einsetzen — Datei als /public/studio-bg.jpg
 * ablegen und unten den <img>-Slot aktivieren. Bis dahin CSS-Platzhalter.
 */

const stats = [
  { b: '5,0★', s: 'Google' },
  { b: '100%', s: 'Werterhalt' },
  { b: 'Rückstandslos', s: 'entfernbar' },
  { b: 'Premium', s: 'Materialien' },
];

const textVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const lineVariants: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: 8 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};
const bandVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const cellVariants: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Studio() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Parallax: Bild bewegt sich langsamer als der Inhalt
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.06, 1.12]);

  return (
    <section
      id="studio"
      ref={ref}
      aria-label="Studio — über GV Werbetechnik"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden"
    >
      {/* ---- Hintergrundbild (Parallax) ---- */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ y: reduce ? 0 : bgY, scale: reduce ? 1.06 : bgScale }}
      >
        {/* Hintergrundbild: matt-schwarzer Urus im Studio (Oliv-Akzente) */}
        <img
          src="/studio-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-grain" />
      </motion.div>

      {/* Overlays für Lesbarkeit — Bild bleibt klar sichtbar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_42%,transparent_38%,rgba(0,0,0,0.78)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#0b0c0e]/25"
      />

      {/* ---- Zentriertes Statement ---- */}
      <motion.div
        variants={textVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.45 }}
        className="wrap relative z-10 flex flex-col items-center pb-44 pt-28 text-center sm:pb-48"
        style={{ transformPerspective: 1000 }}
      >
        <motion.p variants={lineVariants} className="eyebrow">
          Studio · GV Werbetechnik · Münster
        </motion.p>
        <motion.h2
          variants={lineVariants}
          className="mt-6 font-playfair text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.08] text-paper"
        >
          Folierung auf
          <br />
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: '1.4px var(--olive-bright)' }}
          >
            Studio-Niveau.
          </span>
        </motion.h2>
        <motion.p
          variants={lineVariants}
          className="mt-6 max-w-xl text-[1.0625rem] font-light leading-relaxed text-[#c9c5ba]"
        >
          Von der Fahrzeugfolierung bis zur Lichtwerbung — Premium-Materialien,
          verarbeitet mit Sorgfalt, Präzision und einem Auge fürs Detail.
        </motion.p>
      </motion.div>

      {/* ---- Glas-Statband ---- */}
      <motion.dl
        variants={bandVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className="absolute bottom-10 z-10 mx-5 grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-[rgba(8,9,8,0.55)] backdrop-blur-md sm:grid-cols-4"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.s}
            variants={cellVariants}
            className={`px-7 py-5 text-center sm:px-9 ${
              i > 0 ? 'border-l border-line max-sm:[&:nth-child(3)]:border-l-0' : ''
            } ${i >= 2 ? 'max-sm:border-t max-sm:border-line' : ''}`}
          >
            <dt className="sr-only">{s.s}</dt>
            <dd>
              <span className="block font-playfair text-xl leading-tight text-olive-bright sm:text-2xl">
                {s.b}
              </span>
              <span className="text-[0.68rem] uppercase tracking-[0.12em] text-[#c9c5ba]">
                {s.s}
              </span>
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}
