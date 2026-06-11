'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

/**
 * Zoom-Through-Übergang: Der Hero bleibt gepinnt und „zoomt durch" —
 * er skaliert auf, verblasst und blurrt leicht, während die nächste Section
 * (over) aus der Tiefe auftaucht und hochgleitet. Cinematischer Sektionswechsel.
 */
export function HeroStack({ hero, over }: { hero: ReactNode; over: ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Hero „durchfliegen"
  const heroScale = useTransform(p, [0, 0.5], [1, 1.6]);
  const heroOpacity = useTransform(p, [0.12, 0.5], [1, 0]);
  const blurNum = useTransform(p, [0.1, 0.5], [0, 6], { clamp: true });
  const heroFilter = useTransform(blurNum, (v) => `blur(${v}px)`);

  // Nächste Section taucht aus der Tiefe auf
  const overScale = useTransform(p, [0, 0.5], [1.12, 1]);
  const overOpacity = useTransform(p, [0, 0.22], [0.15, 1]);

  if (reduce) {
    return (
      <>
        {hero}
        {over}
      </>
    );
  }

  return (
    <div ref={ref} className="relative">
      <div className="sticky top-0 z-0 h-[100dvh] overflow-hidden">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity, filter: heroFilter }}
          className="h-full w-full origin-center will-change-transform"
        >
          {hero}
        </motion.div>
      </div>

      {/* Taucht aus der Tiefe auf und gleitet über den Hero.
          overflow-hidden klippt das Skalieren (kein horizontales Überlaufen). */}
      <div className="relative z-10 overflow-hidden">
        <motion.div
          style={{ scale: overScale, opacity: overOpacity }}
          className="origin-center will-change-transform"
        >
          {over}
        </motion.div>
      </div>
    </div>
  );
}
