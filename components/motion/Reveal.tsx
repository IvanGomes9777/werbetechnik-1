'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offset = (d: Direction) => {
  switch (d) {
    case 'up':
      return { y: 40 };
    case 'down':
      return { y: -40 };
    case 'left':
      return { x: 40 };
    case 'right':
      return { x: -40 };
    default:
      return {};
  }
};

/**
 * Scroll-Reveal mit sanfter 3D-Tiefe (leichtes rotateX + translateZ).
 * Premium-Easing, einmalig beim Eintreten in den Viewport.
 */
export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className,
  as = 'div',
  amount = 0.3,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'span';
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, rotateX: 7, ...offset(direction) },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          rotateX: 0,
          transition: {
            duration: 0.9,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      style={{ transformPerspective: 1000 }}
    >
      {children}
    </MotionTag>
  );
}

/** Container für gestaffelte Kinder (stagger). */
export function Stagger({
  children,
  className,
  delayChildren = 0.05,
  stagger = 0.09,
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  stagger?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { delayChildren, staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Einzelnes Stagger-Kind (in <Stagger> verwenden). */
export function StaggerItem({
  children,
  className,
  direction = 'up',
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, ...offset(direction) },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
      };
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
