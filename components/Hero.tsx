'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { site } from '@/lib/site';

const container: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.2, staggerChildren: 0.12 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28, rotateX: 8 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * HERO — Layout A (Lower-Third), cinematic + Premium-Motion.
 * - Scroll-Parallax: Szene-Ebenen bewegen sich unterschiedlich schnell (Tiefe)
 * - Maus-3D-Tilt: die Studio-Szene neigt sich leicht zur Maus
 * - Gestaffelter Entrance der Headline/CTAs
 * TODO: Hero-Video von Ivan einsetzen (Vollbild-<video>-Slot vorbereitet).
 */
export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-Parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Maus-Parallax / 3D-Tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const rotX = useTransform(sy, [-0.5, 0.5], [4, -4]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const carX = useTransform(sx, [-0.5, 0.5], [26, -26]);
  const spotX = useTransform(sx, [-0.5, 0.5], [-18, 18]);

  const onMouse = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={onMouse}
      aria-label="Einleitung"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      {/* ---- Video-Slot + Studio-Szene-Platzhalter (parallax + 3D-tilt) ---- */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: reduce ? 0 : sceneY,
          scale: reduce ? 1 : sceneScale,
          rotateX: reduce ? 0 : rotX,
          rotateY: reduce ? 0 : rotY,
          transformPerspective: 1200,
        }}
      >
        {/*
          TODO: Hero-Video:
          <video className="absolute inset-0 h-full w-full object-cover"
            autoPlay muted loop playsInline poster="/hero-poster.jpg">
            <source src="/hero.webm" type="video/webm" />
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        */}
        <div className="hero-scene" aria-hidden="true">
          <motion.div className="hero-spot" style={{ x: reduce ? 0 : spotX }} />
          <div className="hero-haze" />
          <motion.div className="hero-car" style={{ x: reduce ? 0 : carX }}>
            <div className="hero-cabin" />
            <div className="hero-glass" />
            <div className="hero-body" />
            <div className="hero-wheel" style={{ left: '12%' }} />
            <div className="hero-wheel" style={{ right: '12%' }} />
            <div className="hero-rim" />
          </motion.div>
          <div className="hero-floor" />
          <div className="hero-grain" />
        </div>
      </motion.div>

      {/* Lokale Scrims */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-black/80 via-black/45 to-transparent"
      />

      {/* Video-Hinweis (entfällt mit echtem Video) */}
      <span className="absolute left-1/2 top-[6.5rem] z-10 -translate-x-1/2 rounded-full border border-line bg-black/30 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-paper-dim sm:left-[clamp(1.25rem,5vw,3.5rem)] sm:translate-x-0">
        ▶ Hero-Video folgt
      </span>

      {/* ---- Lower-Third Content (stagger entrance + scroll fade) ---- */}
      <motion.div
        className="wrap relative z-10 pb-16 sm:pb-20"
        style={{ y: reduce ? 0 : contentY, opacity: reduce ? 1 : contentOpacity }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
          style={{ transformPerspective: 1000 }}
        >
          <div className="max-w-2xl">
            <motion.p variants={item} className="eyebrow">
              {site.tagline}
            </motion.p>
            <motion.h1
              variants={item}
              className="mt-5 font-playfair text-[clamp(2.6rem,6.2vw,5rem)] font-medium leading-[1.02] text-paper"
            >
              Vollendung in jedem Detail.
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-5 max-w-xl text-[1.0625rem] font-light leading-relaxed text-paper-dim"
            >
              Premium-Folierung für anspruchsvolle Fahrzeuge — präzise
              verarbeitet, werterhaltend, rückstandslos entfernbar.
            </motion.p>
            <motion.div
              variants={item}
              className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a
                href="#kontakt"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-olive px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-[#f2f0e6] transition-colors hover:bg-[#6c771b]"
              >
                <span className="relative z-10">Beratung anfragen</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-olive-bright hover:text-olive-bright"
              >
                Portfolio ansehen <span aria-hidden="true">↓</span>
              </a>
            </motion.div>
          </div>

          <motion.p
            variants={item}
            className="shrink-0 text-sm text-paper-dim sm:text-right"
          >
            <span className="block font-playfair text-3xl text-olive-bright">
              5,0 ★
            </span>
            Google · Münster
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Scroll-Cue */}
      {!reduce ? (
        <motion.div
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1] }}
          transition={{ delay: 1.2, duration: 1.4 }}
        >
          <motion.div
            className="flex h-9 w-5 items-start justify-center rounded-full border border-line p-1"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="block h-1.5 w-px bg-olive-bright" />
          </motion.div>
        </motion.div>
      ) : null}
    </section>
  );
}
