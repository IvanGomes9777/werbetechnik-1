'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

/**
 * Sticky-Stack-Übergang: Der Hero bleibt gepinnt, während die nächste
 * Section (over) mit Tiefe darüber gleitet. Der Hero skaliert dabei leicht
 * zurück und dunkelt ab — cinematischer Sektionswechsel.
 */
export function HeroStack({ hero, over }: { hero: ReactNode; over: ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Übergang spielt in der ersten Hälfte (während „over" hochgleitet)
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  const dim = useTransform(scrollYProgress, [0, 0.5], [0, 0.7]);

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
      <div className="sticky top-0 z-0 h-[100svh] overflow-hidden">
        <motion.div
          style={{ scale, opacity }}
          className="h-full w-full origin-center will-change-transform"
        >
          {hero}
        </motion.div>
        <motion.div
          aria-hidden="true"
          style={{ opacity: dim }}
          className="pointer-events-none absolute inset-0 bg-black"
        />
      </div>

      {/* Gleitet mit Tiefe über den Hero */}
      <div className="relative z-10 shadow-[0_-40px_80px_-20px_rgba(0,0,0,0.9)]">
        {over}
      </div>
    </div>
  );
}
