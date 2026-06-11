'use client';

import { useEffect, useState } from 'react';
import {
  CONSENT_EVENT,
  DEFAULT_CONSENT,
  readConsent,
  writeConsent,
  type Consent,
} from '@/lib/consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState(false);
  const [choices, setChoices] = useState<Consent>(DEFAULT_CONSENT);

  useEffect(() => {
    if (!readConsent()) setVisible(true);
  }, []);

  // Öffnen über Footer-Link „Cookie-Einstellungen“
  useEffect(() => {
    const open = () => {
      setChoices(readConsent() ?? DEFAULT_CONSENT);
      setSettings(true);
      setVisible(true);
    };
    window.addEventListener('open-cookie-settings', open);
    return () => window.removeEventListener('open-cookie-settings', open);
  }, []);

  const save = (consent: Consent) => {
    writeConsent(consent);
    setVisible(false);
    setSettings(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie-Einstellungen"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-line bg-noir/95 backdrop-blur-md"
    >
      <div className="container-content py-6">
        {!settings ? (
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-paper-dim">
              Wir nutzen nur technisch notwendige Cookies. Externe Dienste
              (Google Maps, Instagram, Statistik) laden wir ausschließlich mit
              deiner Zustimmung.{' '}
              <a href="/datenschutz" className="text-gold underline">
                Datenschutz
              </a>
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => save(DEFAULT_CONSENT)}
                className="rounded-full border border-line px-5 py-2.5 text-sm text-paper transition-colors hover:border-gold hover:text-gold"
              >
                Nur notwendige
              </button>
              <button
                type="button"
                onClick={() => setSettings(true)}
                className="rounded-full border border-line px-5 py-2.5 text-sm text-paper transition-colors hover:border-gold hover:text-gold"
              >
                Einstellungen
              </button>
              <button
                type="button"
                onClick={() =>
                  save({ maps: true, social: true, analytics: true })
                }
                className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-noir transition-colors hover:bg-gold-soft"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <p className="font-display text-lg text-paper">
              Cookie-Einstellungen
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-center justify-between gap-4 rounded-sm border border-line p-4">
                <span className="text-sm text-paper">
                  Notwendig
                  <span className="mt-1 block text-xs text-paper-dim">
                    Immer aktiv
                  </span>
                </span>
                <input type="checkbox" checked disabled aria-label="Notwendig" />
              </li>
              {(
                [
                  ['maps', 'Google Maps'],
                  ['social', 'Social-Embeds (Instagram)'],
                  ['analytics', 'Statistik'],
                ] as const
              ).map(([key, label]) => (
                <li
                  key={key}
                  className="flex items-center justify-between gap-4 rounded-sm border border-line p-4"
                >
                  <span className="text-sm text-paper">{label}</span>
                  <input
                    type="checkbox"
                    checked={choices[key]}
                    onChange={(e) =>
                      setChoices((c) => ({ ...c, [key]: e.target.checked }))
                    }
                    aria-label={label}
                  />
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => save(choices)}
                className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-noir transition-colors hover:bg-gold-soft"
              >
                Auswahl speichern
              </button>
              <button
                type="button"
                onClick={() => save(DEFAULT_CONSENT)}
                className="rounded-full border border-line px-5 py-2.5 text-sm text-paper transition-colors hover:border-gold hover:text-gold"
              >
                Nur notwendige
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Wird vom CONSENT_EVENT-System genutzt; Re-Export für Konsistenz.
export { CONSENT_EVENT };
