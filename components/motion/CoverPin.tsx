'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

/**
 * Einheitlicher Zoom-Through-Sektionsübergang (wie Hero → Studio):
 * Die Section wird gepinnt, sobald sie fertig gescrollt ist; die nächste
 * Section schiebt sich darüber, während die gepinnte aufzoomt, verblasst
 * und leicht blurrt.
 *
 * Funktioniert auch für Sections, die höher als der Viewport sind:
 * der Sticky-Offset wird per ResizeObserver so gesetzt, dass die Section
 * erst komplett durchgescrollt wird und dann mit der Unterkante pinnt.
 */
export function CoverPin({ children, z = 0 }: { children: ReactNode; z?: number }) {
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

  const scale = useTransform(p, [0, 1], [1, 1.45]);
  const opacity = useTransform(p, [0.1, 0.85], [1, 0]);
  const blurNum = useTransform(p, [0.1, 0.9], [0, 6], { clamp: true });
  const filter = useTransform(blurNum, (v) => `blur(${v}px)`);

  if (reduce) {
    return (
      <div className="relative" style={{ zIndex: z }}>
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative" style={{ zIndex: z }}>
      {/* Sticky-Fenster klippt das skalierte Innere (kein Horizontal-Overflow) */}
      <div ref={stickyRef} className="sticky overflow-hidden" style={{ top }}>
        <motion.div
          className="will-change-transform"
          style={{ scale, opacity, filter, transformOrigin: 'center center' }}
        >
          {children}
        </motion.div>
      </div>
      {/* Cover-Runway: währenddessen schiebt sich die nächste Section darüber */}
      <div className="h-[100dvh]" aria-hidden="true" />
    </div>
  );
}
