'use client';

import { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { useGyroTilt } from './motion/useGyroTilt';
import { finishes } from '@/lib/content';

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function Finishes() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(3); // Color-Shift als Eyecatcher-Start
  const cur = finishes[active];

  // 3D-Tilt (Maus + Gyro) auf die Finish-Fläche
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 18 });
  const sy = useSpring(my, { stiffness: 70, damping: 18 });
  const rotX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  useGyroTilt(mx, my);

  const onMouse = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="finishes"
      aria-label="Finishes — Folien-Oberflächen"
      className="relative overflow-hidden bg-noir py-[clamp(5rem,11vh,9rem)]"
    >
      {/* Hintergrund reagiert auf das gewählte Finish */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-20 h-[40rem] w-[40rem] rounded-full blur-[130px]"
        animate={{ backgroundColor: cur.accent, opacity: 0.16 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-40 h-[36rem] w-[36rem] rounded-full blur-[130px]"
        animate={{ backgroundColor: cur.accent, opacity: 0.12 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      <div className="relative wrap text-center">
        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="eyebrow"
        >
          Finishes
        </motion.p>
        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mx-auto mt-4 max-w-2xl font-playfair text-[clamp(1.9rem,4vw,3rem)] font-medium text-paper"
        >
          Wähle dein Finish.
        </motion.h2>
        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mx-auto mt-4 max-w-md text-[0.98rem] font-light text-paper-dim"
        >
          Für dein Carwrapping — ob Vollfolierung oder einzelne Akzente.
        </motion.p>

        {/* ---- Finish-Fläche (morpht per Crossfade) ---- */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          onMouseMove={onMouse}
          onMouseLeave={() => {
            mx.set(0);
            my.set(0);
          }}
          style={{
            rotateX: reduce ? 0 : rotX,
            rotateY: reduce ? 0 : rotY,
            transformPerspective: 1100,
          }}
          className="relative mx-auto mt-10 aspect-[16/7] w-full overflow-hidden rounded-3xl shadow-[0_50px_90px_-30px_rgba(0,0,0,0.85)] sm:mt-12"
        >
          {finishes.map((f, i) => (
            <motion.div
              key={f.id}
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: f.surface }}
              initial={false}
              animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.04 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
          {/* Satin-Sweep */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[-20%] bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.22)_50%,transparent_62%)]"
          />
          {/* Finish-Name */}
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={cur.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-playfair text-[clamp(2rem,5vw,4.2rem)] text-white [text-shadow:0_4px_30px_rgba(0,0,0,0.45)]"
              >
                {cur.name}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ---- Auswahl-Pills ---- */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          role="tablist"
          aria-label="Finish auswählen"
          className="mt-8 flex flex-wrap justify-center gap-2.5"
        >
          {finishes.map((f, i) => {
            const isActive = i === active;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm tracking-wide transition-colors ${
                  isActive
                    ? 'border-olive bg-olive text-[#f2f0e6]'
                    : 'border-line text-paper-dim hover:border-olive-bright hover:text-paper'
                }`}
              >
                <span aria-hidden="true">{f.icon}</span>
                {f.name}
              </button>
            );
          })}
        </motion.div>

        {/* ---- Beschreibung ---- */}
        <div className="mx-auto mt-7 min-h-[5.5rem] max-w-xl">
          <AnimatePresence mode="wait">
            <motion.p
              key={cur.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-[1.0625rem] font-light leading-relaxed text-paper-dim"
            >
              {cur.desc}
            </motion.p>
          </AnimatePresence>
          <a
            href="#kontakt"
            className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-olive-bright transition-colors hover:text-olive-soft"
          >
            Dieses Finish anfragen <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
