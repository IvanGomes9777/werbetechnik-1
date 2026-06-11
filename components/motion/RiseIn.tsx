'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

/**
 * Scroll-getriebener Sektionsübergang: die Section „steigt" beim Eintreten
 * in den Viewport mit Skalierung, leichtem 3D-Kippen und Fade an ihren Platz.
 * intensity 'strong' für markante Wechsel, 'soft' für dezente.
 */
export function RiseIn({
  children,
  intensity = 'soft',
}: {
  children: ReactNode;
  intensity?: 'strong' | 'soft';
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start center'],
  });

  const strong = intensity === 'strong';
  const scale = useTransform(scrollYProgress, [0, 1], [strong ? 0.9 : 0.96, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [strong ? 80 : 40, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [strong ? 6 : 3, 0]);

  if (reduce) {
    return <div ref={ref}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity,
        y,
        rotateX,
        transformPerspective: 1300,
        transformOrigin: 'center top',
      }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}
