'use client';

import { motion, type Variants } from 'framer-motion';
import { reviews, site } from '@/lib/site';

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

function Stars({ value = 5 }: { value?: number }) {
  return (
    <span
      className="text-[1.15rem] tracking-[0.2em] text-olive-bright"
      role="img"
      aria-label={`${value} von 5 Sternen`}
    >
      {'★'.repeat(value)}
    </span>
  );
}

export function Rezension() {
  const review = reviews[0];

  return (
    <section
      id="rezension"
      aria-label="Bewertungen"
      className="relative overflow-hidden bg-noir py-[clamp(5rem,12vh,9rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_55%_at_50%_50%,rgba(90,99,5,0.16),transparent_62%)]"
      />
      <div aria-hidden="true" className="hero-grain absolute inset-0" />

      <div className="relative mx-auto max-w-3xl px-[clamp(1.25rem,5vw,3.5rem)] text-center">
        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="eyebrow"
        >
          Bewertungen
        </motion.p>

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-6 flex items-center justify-center gap-3"
        >
          <span className="font-playfair text-[2.6rem] leading-none text-paper">
            {site.rating.value.toLocaleString('de-DE', {
              minimumFractionDigits: 1,
            })}
          </span>
          <span className="flex flex-col items-start">
            <Stars value={5} />
            <span className="mt-1 text-[0.75rem] uppercase tracking-[0.16em] text-paper-dim">
              auf {site.rating.source}
            </span>
          </span>
        </motion.div>

        <motion.blockquote
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="relative mt-10"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 font-playfair text-[6rem] leading-none text-olive/30"
          >
            &ldquo;
          </span>
          <p className="relative font-playfair text-[clamp(1.45rem,3vw,2.2rem)] font-medium leading-snug text-paper">
            {review.text}
          </p>
          <footer className="mt-7 text-[0.95rem] font-light text-paper-dim">
            <span className="text-paper">{review.author}</span> · Google-Rezension
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
