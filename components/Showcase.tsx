'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  animate,
  useInView,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { showcaseScenes, trustStats, trustChips } from '@/lib/content';

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/* Eine Szene als Vollfläche. Mit echtem Foto (`img`) wird dieses formatfüllend
   gezeigt; sonst dient der `surface`-Gradient als Platzhalter — „nachher" in
   voller Farbe, „vorher" als dieselbe Komposition entsättigt + abgedunkelt. */
function SceneLayer({
  surface,
  img,
  alt,
  variant,
}: {
  surface: string;
  img?: string;
  alt?: string;
  variant: 'before' | 'after';
}) {
  return (
    <div className="absolute inset-0">
      {img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={img}
          alt={alt ?? ''}
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: surface,
            filter:
              variant === 'before'
                ? 'grayscale(1) brightness(0.45) contrast(1.05)'
                : undefined,
          }}
        />
      )}
      {!img && variant === 'after' && (
        <span className="pointer-events-none absolute inset-[-20%] bg-[linear-gradient(110deg,transparent_42%,rgba(255,255,255,0.16)_50%,transparent_60%)]" />
      )}
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_120%,rgba(0,0,0,0.55),transparent_55%)]" />
    </div>
  );
}

/* Zahl, die beim Sichtbarwerden hochzählt. */
function CountUp({ value, suffix }: { value: string; suffix?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const decimals = value.includes(',') ? 1 : 0;
  const target = parseFloat(value.replace(',', '.'));

  const fmt = (n: number) =>
    decimals
      ? n.toFixed(1).replace('.', ',')
      : Math.round(n).toLocaleString('de-DE');

  const [shown, setShown] = useState(reduce ? value : fmt(0));

  useEffect(() => {
    if (reduce || !inView) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(fmt(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  return (
    <span ref={ref}>
      {shown}
      {suffix ? <span className="text-olive-bright">{suffix}</span> : null}
    </span>
  );
}

export function Showcase() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  // Reglerposition in %: Start mittig (50) — links „vorher" (Basisbild),
  // rechts „nachher"; ziehen blendet das Nachher-Bild stufenlos ein/aus.
  const [pos, setPos] = useState(50);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const cur = showcaseScenes[active];

  const setFromClientX = (clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromClientX(e.clientX);
  };
  const endDrag = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPos((p) => Math.max(0, p - 4));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPos((p) => Math.min(100, p + 4));
    }
  };

  return (
    <section
      id="ergebnisse"
      aria-label="Ergebnisse — Vorher / Nachher über alle Leistungen"
      className="relative overflow-hidden bg-noir py-[clamp(5rem,11vh,9rem)]"
    >
      {/* finish-/akzent-reaktiver Hintergrund */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 -top-32 h-[50rem] w-[50rem] rounded-full blur-[120px]"
        animate={{ backgroundColor: cur.accent, opacity: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-48 h-[46rem] w-[46rem] rounded-full blur-[120px]"
        animate={{ backgroundColor: cur.accent, opacity: 0.22 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
      <div aria-hidden="true" className="hero-grain absolute inset-0" />

      <div className="relative wrap text-center">
        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="eyebrow"
        >
          Ergebnisse
        </motion.p>
        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mx-auto mt-4 max-w-2xl font-playfair text-[clamp(1.9rem,4vw,3rem)] font-medium text-paper"
        >
          Sehen, was möglich ist.
        </motion.h2>
        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mx-auto mt-4 max-w-md text-[0.98rem] font-light text-paper-dim"
        >
          Vom Fahrzeug bis zur leuchtenden Fassade — zieh den Regler.
        </motion.p>

        {/* ---- Vorher / Nachher Slider ---- */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          ref={stageRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          style={{ touchAction: 'pan-y' }}
          className="relative mx-auto mt-10 aspect-[16/9] w-full max-w-4xl cursor-ew-resize select-none overflow-hidden rounded-3xl border border-line shadow-[0_50px_90px_-30px_rgba(0,0,0,0.85)] sm:mt-12"
        >
          {/* Vorher (Vollfläche) */}
          <SceneLayer
            surface={cur.surface}
            img={cur.beforeImg}
            alt={`${cur.label} – vorher`}
            variant="before"
          />
          {/* Nachher (auf die rechte Seite des Reglers geklippt) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
          >
            <SceneLayer
              surface={cur.surface}
              img={cur.afterImg}
              alt={`${cur.label} – nachher`}
              variant="after"
            />
          </div>

          {/* Ecken-Labels */}
          <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-paper-dim backdrop-blur-sm">
            Vorher
          </span>
          <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-black/35 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-paper backdrop-blur-sm">
            Nachher
          </span>

          {/* Caption (Szenen-Titel) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-start gap-0.5 bg-gradient-to-t from-black/80 to-transparent px-5 pb-5 pt-12 text-left sm:px-7">
            <span className="font-playfair text-[clamp(1.2rem,2.4vw,1.8rem)] text-paper">
              {cur.label}
            </span>
            <span className="text-[0.85rem] font-light text-paper-dim">
              {cur.caption}
            </span>
          </div>

          {/* Trennlinie + Griff */}
          <div
            className="pointer-events-none absolute inset-y-0 w-[2px] bg-[linear-gradient(180deg,transparent,rgba(188,200,87,0.95),transparent)]"
            style={{ left: `${pos}%`, transform: 'translateX(-1px)' }}
          />
          <button
            type="button"
            role="slider"
            aria-label="Vorher-Nachher-Regler"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={onKeyDown}
            style={{ left: `${pos}%` }}
            className="absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-olive-bright bg-noir/80 text-olive-bright shadow-[0_8px_24px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-colors hover:bg-noir focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive-bright"
          >
            <span aria-hidden="true" className="text-sm tracking-tighter">
              ⟨⟩
            </span>
          </button>
        </motion.div>

        {/* ---- Kategorie-Pills ---- */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          role="tablist"
          aria-label="Leistung auswählen"
          className="mt-8 flex flex-wrap justify-center gap-2.5"
        >
          {showcaseScenes.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                className={`rounded-full border px-4 py-2.5 text-sm tracking-wide transition-colors ${
                  isActive
                    ? 'border-olive bg-olive text-[#f2f0e6]'
                    : 'border-line text-paper-dim hover:border-olive-bright hover:text-paper'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </motion.div>

        {/* ---- Zahlen & Vertrauen ---- */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto mt-14 max-w-3xl border-t border-line pt-10"
        >
          <dl className="grid grid-cols-3 gap-4">
            {trustStats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-playfair text-[clamp(2rem,5vw,3.2rem)] leading-none text-paper">
                  <CountUp value={s.value} suffix={s.suffix} />
                </dd>
                <span className="mt-2 text-[0.78rem] uppercase tracking-[0.16em] text-paper-dim">
                  {s.label}
                </span>
              </div>
            ))}
          </dl>

          <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {trustChips.map((c) => (
              <li
                key={c.text}
                className="text-sm font-light text-paper-dim"
              >
                {c.text}
              </li>
            ))}
          </ul>

          <a
            href="#kontakt"
            className="mt-9 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-olive-bright transition-colors hover:text-olive-soft"
          >
            Projekt anfragen <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
