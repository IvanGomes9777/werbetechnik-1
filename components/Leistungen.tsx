'use client';

import { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { leistungen } from '@/lib/content';

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/* Bild-/Platzhalter-Szene pro Leistung. Nutzt ein echtes Foto, wenn vorhanden. */
function Scene({ active, img, alt }: { active: boolean; img?: string; alt?: string }) {
  if (img) {
    return (
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src={img}
          alt={alt ?? ''}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
            active ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-55'
          }`}
        />
        {/* Lesbarkeits-Overlay (stärker, wenn aufgeklappt) */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            active
              ? 'bg-gradient-to-t from-black/90 via-black/40 to-black/25'
              : 'bg-black/55'
          }`}
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 transition-opacity duration-500 ${
        active
          ? 'opacity-100 bg-[radial-gradient(120%_90%_at_75%_12%,rgba(90,99,5,0.34),transparent_55%),linear-gradient(160deg,#1b1d14,#0e0f0b)]'
          : 'opacity-100 bg-[linear-gradient(160deg,#15170f,#0e0f0b)]'
      }`}
    >
      <span
        className={`absolute left-[10%] right-[30%] top-[44%] h-[3px] bg-[linear-gradient(90deg,transparent,rgba(188,200,87,0.9),#fff,transparent)] blur-[0.5px] transition-opacity duration-500 ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

export function Leistungen() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  // Desktop: animierte Spaltenbreiten (aktive Lamelle wird breit)
  const cols = leistungen
    .map((_, i) => (i === active ? '6fr' : '1fr'))
    .join(' ');

  return (
    <section
      id="leistungen"
      aria-label="Leistungen"
      className="relative overflow-hidden bg-noir py-[clamp(5rem,11vh,9rem)]"
    >
      {/* Section-Hintergrund: Oliv-Schein + feine Linien + Korn */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(90,99,5,0.16),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(135deg,rgba(188,200,87,0.6)_0_1px,transparent_1px_24px)]"
      />
      <div aria-hidden="true" className="hero-grain absolute inset-0" />

      <div className="relative wrap">
        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="eyebrow"
        >
          Leistungen
        </motion.p>
        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-4 max-w-2xl font-playfair text-[clamp(1.9rem,4vw,3rem)] font-medium text-paper"
        >
          Vom Fahrzeug bis zur Fassade.
        </motion.h2>

        {/* ---- Desktop: Expanding Panels ---- */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-12 hidden h-[460px] gap-3.5 lg:grid"
          style={{
            gridTemplateColumns: cols,
            transition: reduce
              ? undefined
              : 'grid-template-columns 700ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {leistungen.map((s, i) => {
            const isActive = i === active;
            return (
              <div
                key={s.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line"
              >
                <Scene active={isActive} img={s.img} alt={s.name} />

                {/* Eingeklappt: vertikaler Name */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-end transition-opacity duration-300 ${
                    isActive ? 'pointer-events-none opacity-0' : 'opacity-100'
                  }`}
                >
                  <span className="mb-6 font-playfair text-xl tracking-wide text-paper-dim [writing-mode:vertical-rl] rotate-180">
                    {s.name}
                  </span>
                </div>

                {/* Aufgeklappt: Foto-Slot + Info */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive ? 'opacity-100 delay-150' : 'pointer-events-none opacity-0'
                  }`}
                >
                  <div className="absolute inset-x-7 bottom-7">
                    <h3 className="font-playfair text-[clamp(1.6rem,2.5vw,2.4rem)] text-paper">
                      {s.name}
                    </h3>
                    <p className="mt-3 max-w-md text-[0.95rem] font-light leading-relaxed text-[#e7e4da]">
                      {s.desc}
                    </p>
                    <a
                      href="#kontakt"
                      className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-olive-bright"
                    >
                      Anfragen <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* ---- Mobile/Tablet: Tap-Akkordeon ---- */}
        <div className="mt-10 flex flex-col gap-3 lg:hidden">
          {leistungen.map((s, i) => {
            const isOpen = i === active;
            return (
              <div
                key={s.id}
                className="overflow-hidden rounded-2xl border border-line bg-[linear-gradient(160deg,#15170f,#0e0f0b)]"
              >
                <button
                  type="button"
                  onClick={() => setActive(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left"
                >
                  <span className="font-playfair text-xl text-paper">{s.name}</span>
                  <span
                    className={`ml-auto text-olive-bright transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5">
                        <div className="relative h-40 overflow-hidden rounded-xl">
                          <Scene active img={s.img} alt={s.name} />
                        </div>
                        <p className="mt-4 text-[0.95rem] font-light leading-relaxed text-paper-dim">
                          {s.desc}
                        </p>
                        <a
                          href="#kontakt"
                          className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-olive-bright"
                        >
                          Anfragen <span aria-hidden="true">→</span>
                        </a>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
