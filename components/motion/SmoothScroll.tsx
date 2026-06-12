'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Smooth-Scroll-Steuerung.
 *
 * Desktop (≥ lg): Lenis für butterweiches Mausrad-Scrolling.
 * Handy/Tablet (< lg): NATIVES Scrolling — bewusst kein Lenis-Touch-Hijack und
 *   kein Section-Snapping. Das hatte auf Mobile gegen die CoverPin-Übergänge und
 *   gegen Touch-Bedienelemente (z. B. den Vorher/Nachher-Slider) gekämpft und
 *   das Scrollen verbuggt. Die cinematic Übergänge laufen weiterhin rein
 *   scrollgesteuert — nur eben mit dem zuverlässigen nativen Scroll.
 *
 * Respektiert prefers-reduced-motion (komplett nativ, kein Lerp).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const isMobile = window.matchMedia('(max-width: 1023px)').matches;

    // Lenis nur am Desktop. Auf Mobile bleibt der Browser-Scroll nativ.
    let lenis: Lenis | null = null;
    let raf = 0;
    if (!isMobile) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
      });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    // Anker-Links (#…) sanft ansteuern — Sektionen stecken in <CoverPin>
    // (sticky + Runway); deshalb den CoverPin-Container ansteuern, nicht die
    // innere <section> (die läge mitten in der Übergangsphase).
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const target =
        (el as HTMLElement).closest<HTMLElement>('[data-coverpin]') ??
        (el as HTMLElement);
      if (lenis) {
        lenis.scrollTo(target, { offset: -10 });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - 10;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };
    document.addEventListener('click', onClick);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      lenis?.destroy();
    };
  }, []);

  return null;
}
