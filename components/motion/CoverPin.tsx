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
 * Funktioniert auch für Sections, die höher als der Viewport sind:
 * der Sticky-Offset wird per ResizeObserver so gesetzt, dass die Section
 * erst komplett durchgescrollt wird und dann mit der Unterkante pinnt.
 */
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
  const [top, setTop] = useState(0);

  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;
    const update = () => {
      // Section kleiner/gleich Viewport: pin bei top 0.
      // Größer: negativer Offset, sodass die Unterkante pinnt.
      setTop(Math.min(0, window.innerHeight - el.offsetHeight));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  // Fenster = exakt die Cover-Phase (nächste Section wandert über den Viewport)
  const { scrollYProgress: p } = useScroll({
    target: containerRef,
    offset: ['end 200%', 'end 100%'],
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
      <div className="relative" style={{ zIndex: z }}>
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
          className="will-change-transform"
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
      {/* Cover-Runway: währenddessen schiebt sich die nächste Section darüber */}
      <div className="h-[100dvh]" aria-hidden="true" />
    </div>
  );
}
