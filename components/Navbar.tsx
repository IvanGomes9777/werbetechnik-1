'use client';

import { useEffect, useState } from 'react';

const links = [
  { label: 'Studio', href: '#studio' },
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Ergebnisse', href: '#ergebnisse' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Kontakt', href: '#kontakt' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? 'border-b border-[var(--line)] bg-[rgba(8,9,11,0.85)] backdrop-blur-md'
          : 'border-b border-transparent bg-gradient-to-b from-black/55 to-transparent'
      }`}
    >
      <nav
        aria-label="Hauptnavigation"
        className="wrap flex h-[4.75rem] items-center justify-between"
      >
        <a
          href="#top"
          aria-label="GV Werbetechnik — Startseite"
          className="group flex items-baseline gap-2"
        >
          <span className="font-playfair text-[1.4rem] tracking-[0.18em] text-[var(--olive-bright)]">
            GV
          </span>
          <span className="hidden text-[0.6rem] uppercase tracking-[0.32em] text-paper-dim sm:inline">
            Werbetechnik · Münster
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm tracking-wide text-[var(--paper-dim)] transition-colors hover:text-paper"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#kontakt"
            className="border border-[var(--line)] px-5 py-2 text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:border-[var(--olive-bright)] hover:text-[var(--olive-bright)]"
          >
            Beratung anfragen
          </a>
        </div>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-px w-6 bg-[var(--olive-bright)] transition-transform duration-300 ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
          <span className={`h-px w-6 bg-[var(--olive-bright)] transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`h-px w-6 bg-[var(--olive-bright)] transition-transform duration-300 ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
        </button>
      </nav>
    </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className={`fixed inset-0 z-[45] flex flex-col bg-noir transition-opacity duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="wrap flex flex-1 flex-col justify-center gap-1 py-24">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-[var(--line)] py-5 font-playfair text-3xl text-paper transition-colors hover:text-[var(--olive-bright)]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setOpen(false)}
            className="mt-8 w-fit border border-[var(--olive-bright)] px-7 py-3 text-xs uppercase tracking-[0.2em] text-[var(--olive-bright)]"
          >
            Beratung anfragen
          </a>
        </div>
      </div>
    </>
  );
}
