/**
 * Zentrale Geschäftsdaten für GV Werbetechnik.
 * Verifizierte Kundendaten + klar markierte Beispiel-Platzhalter.
 * Offene Punkte sind in TODO.md gesammelt.
 */

export const site = {
  name: 'GV Werbetechnik',
  tagline: 'Fahrzeugfolierung & Werbetechnik · Münster',
  // BEISPIEL – ersetzen: E-Mail vom Kunden bestätigen lassen
  email: 'kontakt@gv-werbetechnik.de',
  phone: '0176 64978347',
  phoneHref: 'tel:+4917664978347',
  address: {
    street: 'Loddenheide 39',
    zip: '48155',
    city: 'Münster',
    country: 'DE',
  },
  geo: {
    // BEISPIEL – ersetzen: exakte Koordinaten verifizieren (Loddenheide, Münster)
    lat: 51.9344,
    lng: 7.6661,
  },
  openingHours: 'Mo–Fr 08:00–17:00 Uhr · Sa & So geschlossen',
  instagram: {
    handle: '@gv_werbetechnik',
    url: 'https://www.instagram.com/gv_werbetechnik/',
  },
  rating: {
    value: 5.0,
    count: 1,
    source: 'Google',
  },
  url: 'https://www.gv-werbetechnik.de',
  legal: {
    // BEISPIEL – ersetzen: Inhaber & USt-IdNr. ergänzen
    owner: 'Vorname Nachname',
    vatId: 'DE000000000',
  },
} as const;

export const reviews = [
  {
    author: 'Felix Schröter',
    rating: 5,
    text: 'Für mich die beste Anlaufstelle für Fahrzeugfolierung in Münster und Umgebung. Faire Preise und ein überaus kompetentes sowie sympathisches Team!',
  },
] as const;

export const navLinks = [
  { label: 'Studio', href: '#studio' },
  { label: 'Finishes', href: '#finishes' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Kontakt', href: '#kontakt' },
] as const;
