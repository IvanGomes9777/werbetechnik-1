'use client';

import { motion, type Variants } from 'framer-motion';
import { reviews, site } from '@/lib/site';

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function Stars({
  value = 5,
  className,
}: {
  value?: number;
  className?: string;
}) {
  return (
    <span
      className={className}
      role="img"
      aria-label={`${value} von 5 Sternen`}
    >
      {'★'.repeat(value)}
    </span>
  );
}

export function Rezension() {
  const review = reviews[0];
  const initials = review.author
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <section
      id="rezension"
      aria-label="Bewertungen"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-noir py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_55%_at_50%_45%,rgba(90,99,5,0.16),transparent_62%)]"
      />
      <div aria-hidden="true" className="hero-grain absolute inset-0" />

      <div className="relative mx-auto w-full max-w-xl px-[clamp(1.25rem,5vw,3.5rem)] text-center">
        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="eyebrow"
        >
          Bewertungen
        </motion.p>
        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-4 font-playfair text-[clamp(1.9rem,4vw,3rem)] font-medium text-paper"
        >
          Das sagen Kunden.
        </motion.h2>
        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-4 flex items-center justify-center gap-2 text-[0.9rem] text-paper-dim"
        >
          <span className="font-medium text-paper">
            {site.rating.value.toLocaleString('de-DE', {
              minimumFractionDigits: 1,
            })}
          </span>
          <Stars className="tracking-[0.12em] text-[#fbbc04]" />
          <span>
            · {site.rating.count} {site.rating.source}-Bewertung
          </span>
        </motion.p>

        {/* Authentische Google-Rezensions-Karte */}
        <motion.figure
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto mt-10 max-w-[480px] rounded-2xl bg-[#faf9f6] p-6 text-left shadow-[0_40px_80px_-30px_rgba(0,0,0,0.75)] ring-1 ring-black/5 sm:p-7"
        >
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[linear-gradient(150deg,#6b7411,#454d05)] font-medium text-[#f2f0e6]"
            >
              {initials}
            </span>
            <div className="min-w-0">
              <p className="font-medium text-[#202124]">{review.author}</p>
              <p className="text-[0.8rem] text-[#5f6368]">Lokaler Guide</p>
            </div>
            <GoogleG className="ml-auto h-6 w-6 shrink-0" />
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Stars className="text-[1.05rem] tracking-[0.1em] text-[#fbbc04]" />
            <span className="text-[0.8rem] text-[#5f6368]">Google-Rezension</span>
          </div>

          <blockquote className="mt-3 text-[1rem] leading-relaxed text-[#3c4043]">
            {review.text}
          </blockquote>
        </motion.figure>
      </div>
    </section>
  );
}
