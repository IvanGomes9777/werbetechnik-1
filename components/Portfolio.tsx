'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { portfolio } from '@/lib/content';
import { site } from '@/lib/site';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

type Item = (typeof portfolio)[number];

function Card({ item, dup = false }: { item: Item; dup?: boolean }) {
  return (
    <a
      href="#kontakt"
      aria-hidden={dup || undefined}
      tabIndex={dup ? -1 : undefined}
      aria-label={`${item.title} — ${item.category}, anfragen`}
      className="group/card relative block aspect-[3/4] w-[68vw] max-w-[320px] shrink-0 snap-start cursor-pointer overflow-hidden rounded-2xl border border-line shadow-[0_40px_80px_-40px_rgba(0,0,0,0.85)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-olive-bright hover:shadow-[0_34px_64px_-22px_rgba(0,0,0,0.9),0_0_28px_-6px_rgba(188,200,87,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive-bright sm:w-[320px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover/card:scale-[1.09]"
        style={{ background: item.surface }}
      />
      {/* Olive-Schimmer beim Hovern */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(188,200,87,0.22),transparent_60%)]"
      />
      {/* Satin-Sweep beim Hovern */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-30%] translate-x-[-60%] bg-[linear-gradient(110deg,transparent_44%,rgba(255,255,255,0.18)_50%,transparent_58%)] transition-transform duration-1000 ease-out group-hover/card:translate-x-[60%]"
      />
      {/* Lesbarkeits-Verlauf */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
      />
      {/* Pfeil-Badge (erscheint beim Hovern) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-4 grid h-9 w-9 translate-y-1 place-items-center rounded-full border border-olive-bright/70 bg-noir/55 text-olive-bright opacity-0 backdrop-blur-sm transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100"
      >
        →
      </span>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <span className="inline-flex rounded-full border border-line bg-black/30 px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-olive-bright backdrop-blur-sm">
          {item.category}
        </span>
        <h3 className="mt-3 font-playfair text-[1.3rem] leading-tight text-paper transition-colors duration-300 group-hover/card:text-white">
          {item.title}
        </h3>
      </div>
    </a>
  );
}

export function Portfolio() {
  const reduce = useReducedMotion();

  return (
    <section
      id="portfolio"
      aria-label="Portfolio — ausgewählte Arbeiten"
      className="relative overflow-hidden bg-noir py-[clamp(5rem,11vh,9rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(90,99,5,0.14),transparent_60%)]"
      />
      <div aria-hidden="true" className="hero-grain absolute inset-0" />

      <div className="relative">
        <div className="wrap">
          <motion.p
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="eyebrow"
          >
            Portfolio
          </motion.p>
          <motion.h2
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="mt-4 max-w-2xl font-playfair text-[clamp(1.9rem,4vw,3rem)] font-medium text-paper"
          >
            Ausgewählte Arbeiten.
          </motion.h2>
        </div>

        {reduce ? (
          // Reduced Motion: statischer, scrollbarer Streifen (alle Größen)
          <div className="mt-10 flex snap-x gap-5 overflow-x-auto px-[clamp(1.25rem,5vw,3.5rem)] pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {portfolio.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <>
            {/* Mobile/Tablet: manuell wischen — keine Auto-Bewegung */}
            <div className="mt-10 flex snap-x gap-5 overflow-x-auto px-[clamp(1.25rem,5vw,3.5rem)] pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
              {portfolio.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
            {/* Desktop (lg+): Auto-Showreel, pausiert beim Hovern */}
            <div className="group/strip mt-10 hidden overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)] sm:mt-12 lg:block">
              <div
                className="flex w-max gap-5 animate-marquee group-hover/strip:[animation-play-state:paused]"
                style={{ animationDuration: '52s' }}
              >
                {portfolio.map((item) => (
                  <Card key={item.id} item={item} />
                ))}
                {portfolio.map((item) => (
                  <Card key={`dup-${item.id}`} item={item} dup />
                ))}
              </div>
            </div>
          </>
        )}

        <div className="wrap mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
          {/* Gut sichtbarer Instagram-Button — mehr Arbeiten im Feed */}
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/ig inline-flex items-center gap-3 rounded-full border border-olive-bright/60 bg-olive/15 px-6 py-3.5 text-[0.95rem] font-medium text-paper shadow-[0_0_0_0_rgba(188,200,87,0)] transition-all duration-300 hover:border-olive-bright hover:bg-olive/25 hover:shadow-[0_0_28px_-6px_rgba(188,200,87,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive-bright"
          >
            <InstagramIcon className="h-5 w-5 text-olive-bright transition-transform duration-300 group-hover/ig:scale-110" />
            <span>
              Mehr auf Instagram{' '}
              <span className="text-olive-bright">{site.instagram.handle}</span>
            </span>
          </a>

          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-olive-bright transition-colors hover:text-olive-soft"
          >
            Dein Projekt anfragen <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
