'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

/**
 * Cinematischer Sektionsübergang. Die Section wird gepinnt, sobald sie fertig
 * gescrollt ist; die nächste Section schiebt sich darüber.
 *
 * Zwei Varianten:
 *  - 'zoom'  (Standard): die gepinnte Section zoomt auf, verblasst und blurrt,
 *            die nächste taucht aus der Tiefe auf (Zoom-Through).
 *  - 'wipe'  : die gepinnte Section skaliert leicht zurück und dunkelt ab,
 *            während die nächste mit Tiefe darüber gleitet (Wipe — wie
 *            ursprünglich Hero → Studio).
 *
 * Mobile-stabil: Die maßgebliche Viewport-Höhe wird einmal gemessen und nur
 * bei echten Breiten-/Orientierungswechseln neu berechnet — NICHT bei den
 * laufenden Höhenänderungen durch die ein-/ausblendende Adressleiste. Dadurch
 * bleibt das Scroll-Ziel (Runway) während des Scrollens konstant und die
 * Übergänge glitchen nicht mehr.
 */
/**
 * Anteil der Viewport-Höhe, über den der Cover-Übergang läuft (Runway).
 * 1 = eine volle Bildschirmhöhe extra Scroll bis zur nächsten Section.
 * Kleiner = die nächste Section kommt früher, der Übergang ist knackiger.
 */
const COVER = 0.55;

export function CoverPin({
  children,
  z = 0,
  variant = 'zoom',
  className,
}: {
  children: ReactNode;
  z?: number;
  variant?: 'zoom' | 'wipe';
  className?: string;
}) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const lastWidth = useRef(0);
  const [vh, setVh] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;

    // top so setzen, dass Sections <= Viewport bei 0 pinnen und höhere
    // Sections erst komplett durchscrollen (negativer Offset).
    const recomputeTop = () => {
      setTop(Math.min(0, window.innerHeight - el.offsetHeight));
    };
    // Stabile Viewport-Höhe (Runway) — nur bei Breiten-/Orientierungswechsel.
    const recomputeVh = () => {
      setVh(window.innerHeight);
      recomputeTop();
    };

    recomputeVh();
    lastWidth.current = window.innerWidth;

    // Element-Größe (Inhalt/Orientierung) → top anpassen, aber Runway-Höhe
    // bleibt stabil, solange die Breite gleich ist.
    const ro = new ResizeObserver(recomputeTop);
    ro.observe(el);

    const onResize = () => {
      // Nur echte Breiten-/Orientierungsänderungen; reine Höhenänderungen
      // (Adressleiste) ignorieren → kein Springen während des Scrollens.
      if (window.innerWidth !== lastWidth.current) {
        lastWidth.current = window.innerWidth;
        recomputeVh();
      }
    };
    window.addEventListener('resize', onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Fenster = exakt die Cover-Phase (nächste Section wandert über den Viewport).
  // Das Animationsfenster ist an die verkürzte Runway gekoppelt (siehe COVER),
  // damit der Übergang über genau diese Strecke 0→1 läuft.
  const { scrollYProgress: p } = useScroll({
    target: containerRef,
    offset: [`end ${100 + COVER * 100}%`, 'end 100%'],
  });

  // Zoom-Through
  const zoomScale = useTransform(p, [0, 1], [1, 1.45]);
  const zoomOpacity = useTransform(p, [0.1, 0.85], [1, 0]);
  const blurNum = useTransform(p, [0.1, 0.9], [0, 6], { clamp: true });
  const zoomFilter = useTransform(blurNum, (v) => `blur(${v}px)`);

  // Wipe: leicht zurückskalieren + abdunkeln, nächste Section gleitet darüber
  const wipeScale = useTransform(p, [0, 0.9], [1, 0.92]);
  const wipeOpacity = useTransform(p, [0, 0.9], [1, 0.5]);
  const dim = useTransform(p, [0, 0.9], [0, 0.7]);

  if (reduce) {
    return (
      <div className={`relative ${className ?? ''}`} style={{ zIndex: z }}>
        {children}
      </div>
    );
  }

  const isWipe = variant === 'wipe';

  return (
    <div ref={containerRef} className={`relative ${className ?? ''}`} style={{ zIndex: z }}>
      {/* Sticky-Fenster klippt das skalierte Innere (kein Horizontal-Overflow) */}
      <div ref={stickyRef} className="sticky overflow-hidden" style={{ top }}>
        <motion.div
          className="will-change-transform [backface-visibility:hidden] [transform:translateZ(0)]"
          style={
            isWipe
              ? { scale: wipeScale, opacity: wipeOpacity, transformOrigin: 'center center' }
              : { scale: zoomScale, opacity: zoomOpacity, filter: zoomFilter, transformOrigin: 'center center' }
          }
        >
          {children}
        </motion.div>
        {isWipe && (
          <motion.div
            aria-hidden="true"
            style={{ opacity: dim }}
            className="pointer-events-none absolute inset-0 bg-black"
          />
        )}
      </div>
      {/* Cover-Runway: feste px-Höhe (mobil stabil, kein dvh-Resize beim Scrollen).
          Verkürzt um den Faktor COVER → die nächste Section kommt früher. */}
      <div
        style={{ height: vh ? vh * COVER : undefined }}
        className={vh ? '' : 'h-[55svh]'}
        aria-hidden="true"
      />
    </div>
  );
}
