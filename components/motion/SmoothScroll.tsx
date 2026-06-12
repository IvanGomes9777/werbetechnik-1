'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis Smooth-Scroll — die Basis für den „butterweichen" Premium-Look.
 * Respektiert prefers-reduced-motion (dann nativer Scroll, kein Lerp).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Anker-Links (#…) sanft ansteuern
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        // Sektionen stecken in <CoverPin> (sticky + Runway). Die innere
        // <section> liegt damit MITTEN in der gepinnten Übergangsphase — würde
        // man sie direkt ansteuern, landet man „auf dem Übergang". Stattdessen
        // den CoverPin-Container ansteuern: dessen Anfang ist genau die Position,
        // an der die Sektion fertig gepinnt und voll sichtbar ist.
        const pin = (el as HTMLElement).closest<HTMLElement>('[data-coverpin]');
        lenis.scrollTo(pin ?? (el as HTMLElement), { offset: -10 });
      }
    };
    document.addEventListener('click', onClick);

    // ---- Sektions-Navigation am Handy/Tablet (< lg) ---------------------------
    // Ziel: EINE Wisch-/Wheel-Geste trägt direkt zur nächsten Sektion — durch den
    // CoverPin-Übergang hindurch (Animation läuft mit, sanft via lenis.scrollTo),
    // statt zwei-/dreimal scrollen zu müssen. Lange Inhaltssektionen
    // (z. B. Leistungen-Akkordeon) bleiben frei scrollbar: dort wird nur an den
    // oberen/unteren Rändern „weitergeschnappt".
    const teardown: Array<() => void> = [];
    if (window.matchMedia('(max-width: 1023px)').matches) {
      type Target = { y: number; el: HTMLElement; pin: boolean };
      let targets: Target[] = [];

      const computeTargets = () => {
        const seen = new Set<HTMLElement>();
        const list: Target[] = [];
        document
          .querySelectorAll<HTMLElement>('[data-coverpin]')
          .forEach((el) => {
            if (seen.has(el)) return;
            seen.add(el);
            list.push({ y: el.getBoundingClientRect().top + window.scrollY, el, pin: true });
          });
        const leistungen = document.getElementById('leistungen');
        if (leistungen && !seen.has(leistungen)) {
          list.push({
            y: leistungen.getBoundingClientRect().top + window.scrollY,
            el: leistungen,
            pin: false,
          });
        }
        targets = list.sort((a, b) => a.y - b.y);
      };
      computeTargets();

      const EPS = 4;
      // Index der Sektion, in der wir uns gerade befinden (inkl. Runway danach).
      const floorIndex = (y: number) => {
        let i = 0;
        for (let k = 0; k < targets.length; k++) if (targets[k].y <= y + EPS) i = k;
        return i;
      };
      const nextDown = (y: number) => targets.findIndex((t) => t.y > y + EPS);
      const nextUp = (y: number) => {
        for (let k = targets.length - 1; k >= 0; k--) if (targets[k].y < y - EPS) return k;
        return -1;
      };

      let animating = false;
      const goTo = (index: number) => {
        if (index < 0 || index >= targets.length) return;
        animating = true;
        lenis.scrollTo(targets[index].y, {
          duration: 1.15,
          lock: true,
          onComplete: () => {
            animating = false;
          },
        });
      };

      // Entscheidet, ob die Geste „gejackt" wird (= zur Nachbarsektion springt)
      // oder natives Scrollen innerhalb einer langen Inhaltssektion erlaubt bleibt.
      const inJackZone = (dir: 1 | -1) => {
        const cur = targets[floorIndex(window.scrollY)];
        if (!cur || cur.pin) return true; // CoverPin-Sektionen immer durchspringen
        const r = cur.el.getBoundingClientRect();
        const atTop = r.top >= -EPS;
        const atBottom = r.bottom <= window.innerHeight + EPS;
        return dir > 0 ? atBottom : atTop;
      };

      const targetFor = (dir: 1 | -1) =>
        dir > 0 ? nextDown(window.scrollY) : nextUp(window.scrollY);

      // -- Wheel (Trackpad/Maus an kleinen Screens) --
      const onWheel = (e: WheelEvent) => {
        if (animating) {
          e.preventDefault();
          return;
        }
        if (Math.abs(e.deltaY) < 4) return;
        computeTargets(); // Positionen frisch (Runway-Höhen sind dann gesetzt)
        const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;
        if (!inJackZone(dir)) return; // freies Scrollen in langer Sektion
        const idx = targetFor(dir);
        if (idx < 0) return; // nichts mehr in diese Richtung
        e.preventDefault();
        goTo(idx);
      };
      window.addEventListener('wheel', onWheel, { passive: false });
      teardown.push(() => window.removeEventListener('wheel', onWheel));

      // -- Touch --
      const SWIPE = 28; // px, ab hier gilt es als bewusste Wischgeste
      let startY = 0;
      let handled = false;
      const onTouchStart = (e: TouchEvent) => {
        startY = e.touches[0].clientY;
        handled = false;
        computeTargets(); // Positionen frisch zu Gestenbeginn
      };
      const onTouchMove = (e: TouchEvent) => {
        if (animating) {
          e.preventDefault();
          return;
        }
        const dy = startY - e.touches[0].clientY; // >0 = Wisch nach oben = nächste
        const dir: 1 | -1 = dy >= 0 ? 1 : -1;
        if (!inJackZone(dir)) return; // freies natives Scrollen zulassen
        // In der Jack-Zone natives Scrollen unterbinden und gezielt springen.
        e.preventDefault();
        if (handled || Math.abs(dy) < SWIPE) return;
        const idx = targetFor(dir);
        if (idx < 0) return;
        handled = true;
        goTo(idx);
      };
      const onTouchEnd = () => {
        handled = false;
      };
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd, { passive: true });
      teardown.push(() => window.removeEventListener('touchstart', onTouchStart));
      teardown.push(() => window.removeEventListener('touchmove', onTouchMove));
      teardown.push(() => window.removeEventListener('touchend', onTouchEnd));

      const onResize = () => computeTargets();
      window.addEventListener('resize', onResize);
      teardown.push(() => window.removeEventListener('resize', onResize));
    }

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      teardown.forEach((fn) => fn());
      lenis.destroy();
    };
  }, []);

  return null;
}
