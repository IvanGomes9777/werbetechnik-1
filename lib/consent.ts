'use client';

/**
 * Schlankes Consent-Management (Privacy by default).
 * Nichts wird ohne Zustimmung geladen: Google Maps, Social-Embeds, Analytics.
 */

export type Consent = {
  maps: boolean;
  social: boolean;
  analytics: boolean;
};

export const DEFAULT_CONSENT: Consent = {
  maps: false,
  social: false,
  analytics: false,
};

const KEY = 'gv-consent';
export const CONSENT_EVENT = 'gv-consent-change';

export function readConsent(): Consent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    return { ...DEFAULT_CONSENT, ...(JSON.parse(raw) as Partial<Consent>) };
  } catch {
    return null;
  }
}

export function writeConsent(consent: Consent): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
}
