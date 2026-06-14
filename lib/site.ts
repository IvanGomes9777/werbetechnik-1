/**
 * Zentrale Geschäftsdaten — BEISPIELDATEN (Demo/Platzhalter).
 * Alle Angaben sind frei erfunden und führen bewusst nirgendwohin.
 * Standort: Münster. Vor Live-Schaltung durch echte Kundendaten ersetzen.
 */

export const site = {
  name: 'Muster Werbetechnik',
  tagline: 'Fahrzeugfolierung & Werbetechnik · Münster',
  // BEISPIEL – Demo-Adresse, leitet nirgendwohin
  email: 'kontakt@muster-werbetechnik.de',
  phone: '0123 4567890',
  phoneHref: 'tel:+491234567890',
  address: {
    street: 'Musterstraße 1',
    zip: '48143',
    city: 'Münster',
    country: 'DE',
  },
  geo: {
    // BEISPIEL – ungefähre Lage Münster (Demo)
    lat: 51.9607,
    lng: 7.6261,
  },
  openingHours: 'Mo–Fr 08:00–17:00 Uhr · Sa & So geschlossen',
  instagram: {
    // BEISPIEL – Demo-Handle, Button führt bewusst nirgendwohin
    handle: '@muster_werbetechnik',
    url: '#',
  },
  rating: {
    value: 5.0,
    count: 1,
    source: 'Google',
    // BEISPIEL – Google-Bewertung-Button führt bewusst nirgendwohin (Demo).
    reviewUrl: '#',
  },
  url: 'https://www.muster-werbetechnik.de',
  legal: {
    // BEISPIEL – Demo-Angaben
    owner: 'Max Mustermann',
    vatId: 'DE123456789',
  },
} as const;

export const reviews = [
  {
    author: 'Erika Mustermann',
    rating: 5,
    text: 'Beispiel-Rezension: Top Beratung und sauberes Ergebnis — die beste Anlaufstelle für Fahrzeugfolierung in Münster und Umgebung. (Platzhalter-Text)',
  },
] as const;

export const navLinks = [
  { label: 'Studio', href: '#studio' },
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Ergebnisse', href: '#ergebnisse' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Standort', href: '#standort' },
  { label: 'Bewertungen', href: '#rezension' },
  { label: 'Kontakt', href: '#kontakt' },
] as const;
