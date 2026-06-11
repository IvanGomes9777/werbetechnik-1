'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import type { ReactNode, PointerEvent } from 'react';

/**
 * Echter 3D-Tilt: die Karte neigt sich (rotateX/Y) zur Maus, mit Glanz-Sheen
 * und sanfter Spring-Physik. Auf Touch/Reduced-Motion deaktiviert.
 */
export function TiltCard({
  children,
  className,
  max = 9,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 180,
    damping: 18,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 180,
    damping: 18,
  });

  const glareX = useTransform(px, [0, 1], ['0%', '100%']);
  const glareY = useTransform(py, [0, 1], ['0%', '100%']);
  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x} ${y}, rgba(205,213,110,0.14), transparent 60%)`,
  );

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === 'touch') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className ?? ''}`}
    >
      {children}
      {glare ? (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBg }}
        />
      ) : null}
    </motion.div>
  );
}
