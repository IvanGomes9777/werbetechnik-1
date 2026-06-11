'use client';

import { useEffect } from 'react';
import type { MotionValue } from 'framer-motion';

/**
 * Gyroskop-Tilt für Touch-Geräte: speist dieselben Motion-Values wie der
 * Maus-Tilt (mx/my in [-0.5, 0.5]) aus der Geräteneigung.
 * - Nur auf Touch-Geräten aktiv, respektiert prefers-reduced-motion.
 * - iOS 13+ erfordert eine Erlaubnis nach einer Nutzergeste (erste Berührung).
 */
export function useGyroTilt(mx: MotionValue<number>, my: MotionValue<number>) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isTouch || reduce || !('DeviceOrientationEvent' in window)) return;

    const clamp = (v: number) => Math.max(-0.5, Math.min(0.5, v));
    let baseBeta: number | null = null;

    const handle = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0; // links/rechts
      const beta = e.beta ?? 0; // vor/zurück
      if (baseBeta === null) baseBeta = beta; // auf Haltewinkel kalibrieren
      mx.set(clamp(gamma / 38));
      my.set(clamp((beta - baseBeta) / 38));
    };

    // @ts-expect-error – requestPermission existiert nur auf iOS
    const needsPermission = typeof DeviceOrientationEvent.requestPermission === 'function';

    const attach = () => window.addEventListener('deviceorientation', handle);

    const requestOnGesture = () => {
      // @ts-expect-error – iOS-spezifisch
      DeviceOrientationEvent.requestPermission()
        .then((state: string) => {
          if (state === 'granted') attach();
        })
        .catch(() => {});
      window.removeEventListener('touchstart', requestOnGesture);
    };

    if (needsPermission) {
      window.addEventListener('touchstart', requestOnGesture, { once: true });
    } else {
      attach();
    }

    return () => {
      window.removeEventListener('deviceorientation', handle);
      window.removeEventListener('touchstart', requestOnGesture);
    };
  }, [mx, my]);
}
