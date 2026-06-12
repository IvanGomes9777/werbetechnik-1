'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis Smooth-Scroll — die Basis für den „butterweichen" Premium-Look.
 * Respektiert prefers-reduced-motion (dann nativer Scroll, kein Lerp).
 *
 * Am Handy/Tablet (< lg) zusätzlich Sektions-Navigation: Eine Wischgeste trägt
 * direkt zur nächsten Sektion — der Finger führt die Seite flüssig mit
 * (Lenis syncTouch), beim Loslassen wird genau eine Sektion weiter eingerastet.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const isMobile = window.matchMedia('(max-width: 1023px)').matches;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Mobil: Lenis steuert die Touch-Bewegung (führt den Finger flüssig mit)
      // — Voraussetzung dafür, dass wir beim Loslassen sauber einrasten können,
      // ohne gegen den nativen Fling zu kämpfen.
      syncTouch: isMobile,
      syncTouchLerp: 0.1,
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
    // Ziel: EINE Wischgeste trägt direkt zur nächsten Sektion — durch den
    // CoverPin-Übergang hindurch (Animation läuft mit). Die Seite folgt dem
    // Finger flüssig; beim Loslassen wird genau eine Sektion weiter eingerastet.
    // Lange Inhaltssektionen (Leistungen) bleiben frei scrollbar; dort wird nur
    // an den oberen/unteren Rändern weitergesprungen.
    const teardown: Array<() => void> = [];
    if (isMobile) {
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
      // Sektion, in der wir uns gerade befinden (inkl. Runway danach).
      const floorIndex = (y: number) => {
        let i = 0;
        for (let k = 0; k < targets.length; k++) if (targets[k].y <= y + EPS) i = k;
        return i;
      };
      const nearestIndex = (y: number) => {
        let best = 0;
        let bd = Infinity;
        targets.forEach((t, i) => {
          const d = Math.abs(t.y - y);
          if (d < bd) {
            bd = d;
            best = i;
          }
        });
        return best;
      };
      const nextDown = (y: number) => targets.findIndex((t) => t.y > y + EPS);
      const nextUp = (y: number) => {
        for (let k = targets.length - 1; k >= 0; k--) if (targets[k].y < y - EPS) return k;
        return -1;
      };

      let animating = false;
      const goTo = (index: number) => {
        const idx = Math.max(0, Math.min(index, targets.length - 1));
        if (!targets[idx]) return;
        animating = true;
        lenis.scrollTo(targets[idx].y, {
          // Langsamer + sanfter Sektionswechsel: Ease-in-out (weicher Start UND
          // weiches Auslaufen) statt des schnellen Ease-out → nicht ruckartig.
          duration: 1.7,
          easing: (t: number) =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
          lock: true,
          onComplete: () => {
            animating = false;
          },
        });
      };

      // In einer langen Inhaltssektion (nicht-Pin) frei scrollen lassen, außer
      // am jeweiligen Rand in Wischrichtung.
      const freeScroll = (dir: 1 | -1) => {
        const cur = targets[floorIndex(window.scrollY)];
        if (!cur || cur.pin) return false;
        const r = cur.el.getBoundingClientRect();
        const atTop = r.top >= -EPS;
        const atBottom = r.bottom <= window.innerHeight + EPS;
        return dir > 0 ? !atBottom : !atTop;
      };

      // -- Touch: Finger führt flüssig mit (Lenis), beim Loslassen einrasten --
      const SWIPE = 24; // px
      const FAST = 0.3; // px/ms — schneller Flick zählt auch bei kurzer Strecke
      let startY = 0;
      let lastY = 0;
      let startT = 0;
      const onTouchStart = (e: TouchEvent) => {
        startY = lastY = e.touches[0].clientY;
        startT = Date.now();
        computeTargets();
      };
      const onTouchMove = (e: TouchEvent) => {
        lastY = e.touches[0].clientY;
      };
      const onTouchEnd = () => {
        if (animating) return;
        const dy = startY - lastY; // >0 = Wisch nach oben = nächste Sektion
        const dir: 1 | -1 = dy >= 0 ? 1 : -1;
        const dt = Math.max(1, Date.now() - startT);
        const deliberate = Math.abs(dy) >= SWIPE || Math.abs(dy) / dt >= FAST;
        const y = window.scrollY;
        const cur = targets[floorIndex(y)];

        // Inhaltssektion (z. B. Leistungen): frei scrollbar. NIEMALS auf den
        // eigenen Sektionsanfang zurückspringen (sonst „scrollt die Seite
        // automatisch nach oben", wenn man darin nach unten/oben scrollt). Nur
        // an den Rändern per bewusstem Wisch zur Nachbarsektion wechseln.
        if (cur && !cur.pin) {
          if (!deliberate) return;
          const r = cur.el.getBoundingClientRect();
          if (dir < 0 && r.top >= -EPS) {
            const idx = nextUp(y);
            if (idx >= 0) goTo(idx);
          } else if (dir > 0 && r.bottom <= window.innerHeight + EPS) {
            const idx = nextDown(y);
            if (idx >= 0) goTo(idx);
          }
          return;
        }

        // Pin-Sektion (cinematic): sauber auf genau eine Sektion einrasten.
        let idx: number;
        if (deliberate) {
          idx = dir > 0 ? nextDown(y) : nextUp(y);
          if (idx < 0) idx = nearestIndex(y); // nichts mehr in diese Richtung → halten
        } else {
          idx = nearestIndex(y); // sanftes Einrasten auf die aktuelle Sektion
        }
        goTo(idx);
      };
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onTouchEnd, { passive: true });
      teardown.push(() => window.removeEventListener('touchstart', onTouchStart));
      teardown.push(() => window.removeEventListener('touchmove', onTouchMove));
      teardown.push(() => window.removeEventListener('touchend', onTouchEnd));

      // -- Wheel (Trackpad/Maus an kleinen Screens) --
      const onWheel = (e: WheelEvent) => {
        if (animating) {
          e.preventDefault();
          return;
        }
        if (Math.abs(e.deltaY) < 4) return;
        const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;
        if (freeScroll(dir)) return;
        computeTargets();
        const idx = dir > 0 ? nextDown(window.scrollY) : nextUp(window.scrollY);
        if (idx < 0) return;
        e.preventDefault();
        goTo(idx);
      };
      window.addEventListener('wheel', onWheel, { passive: false });
      teardown.push(() => window.removeEventListener('wheel', onWheel));

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
