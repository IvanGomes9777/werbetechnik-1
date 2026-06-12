'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { portfolio } from '@/lib/content';

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function Portfolio() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });

  const step = () => {
    const el = trackRef.current;
    return el ? Math.min(el.clientWidth * 0.85, 380) : 380;
  };
  const scrollByDir = (dir: number) => {
    trackRef.current?.scrollBy({
      left: dir * step(),
      behavior: reduce ? 'auto' : 'smooth',
    });
  };

  // Maus-Drag zum Scrollen (Touch nutzt natives Wischen).
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft };
    el.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const endDrag = () => {
    drag.current.active = false;
  };

  return (
    <section
      id="portfolio"
      aria-label="Portfolio — ausgewählte Arbeiten"
      className="relative overflow-hidden bg-noir py-[clamp(5rem,11vh,9rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(90,99,5,0.14),transparent_60%)]"
      />
      <div aria-hidden="true" className="hero-grain absolute inset-0" />

      <div className="relative">
        <div className="wrap">
          <div className="flex items-end justify-between gap-6">
            <div>
              <motion.p
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                className="eyebrow"
              >
                Portfolio
              </motion.p>
              <motion.h2
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                className="mt-4 max-w-2xl font-playfair text-[clamp(1.9rem,4vw,3rem)] font-medium text-paper"
              >
                Ausgewählte Arbeiten.
              </motion.h2>
            </div>

            {/* Pfeil-Buttons (Desktop) */}
            <div className="hidden shrink-0 gap-3 sm:flex">
              <button
                type="button"
                onClick={() => scrollByDir(-1)}
                aria-label="Vorherige Arbeiten"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-paper-dim transition-colors hover:border-olive-bright hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive-bright"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                onClick={() => scrollByDir(1)}
                aria-label="Weitere Arbeiten"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-paper-dim transition-colors hover:border-olive-bright hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive-bright"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filmstrip */}
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[clamp(1.25rem,5vw,3.5rem)] pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-12 [&::-webkit-scrollbar]:hidden"
        >
          {portfolio.map((item) => (
            <article
              key={item.id}
              className="group relative aspect-[3/4] w-[78vw] max-w-[340px] shrink-0 cursor-grab snap-start overflow-hidden rounded-2xl border border-line shadow-[0_40px_80px_-40px_rgba(0,0,0,0.85)] active:cursor-grabbing sm:w-[340px]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                style={{ background: item.surface }}
              />
              {/* Satin-Sweep */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-30%] translate-x-[-60%] bg-[linear-gradient(110deg,transparent_44%,rgba(255,255,255,0.16)_50%,transparent_58%)] transition-transform duration-1000 ease-out group-hover:translate-x-[60%]"
              />
              {/* Lesbarkeits-Verlauf */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="inline-flex rounded-full border border-line bg-black/30 px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-olive-bright backdrop-blur-sm">
                  {item.category}
                </span>
                <h3 className="mt-3 font-playfair text-[1.35rem] leading-tight text-paper">
                  {item.title}
                </h3>
              </div>
            </article>
          ))}

          {/* Abschluss-Karte: CTA */}
          <a
            href="#kontakt"
            className="group relative grid aspect-[3/4] w-[78vw] max-w-[340px] shrink-0 snap-start place-items-center overflow-hidden rounded-2xl border border-olive/60 bg-[linear-gradient(160deg,#1b1d14,#0e0f0b)] text-center sm:w-[340px]"
          >
            <div className="px-7">
              <p className="font-playfair text-[1.5rem] leading-tight text-paper">
                Dein Projekt als Nächstes?
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-olive-bright transition-colors group-hover:text-olive-soft">
                Jetzt anfragen <span aria-hidden="true">→</span>
              </span>
            </div>
          </a>
        </div>

        <p className="wrap mt-5 text-[0.8rem] font-light text-paper-dim">
          <span aria-hidden="true">←</span> ziehen · wischen{' '}
          <span aria-hidden="true">→</span>
        </p>
      </div>
    </section>
  );
}
