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
    // BEISPIEL – ersetzen: Google Place ID aus dem Google-Unternehmensprofil
    // eintragen, damit der Link direkt den „Rezension schreiben“-Dialog öffnet.
    // Solange leer, wird auf die Google-Maps-Suche nach dem Studio verlinkt.
    googlePlaceId: '',
  },
  url: 'https://www.gv-werbetechnik.de',
  legal: {
    // BEISPIEL – ersetzen: Inhaber & USt-IdNr. ergänzen
    owner: 'Vorname Nachname',
    vatId: 'DE000000000',
  },
} as const;

/**
 * Direkt-Link zum Abgeben einer Google-Rezension.
 * Mit Place ID öffnet sich der „Rezension schreiben“-Dialog, sonst Fallback
 * auf die Google-Maps-Suche, über die Besucher das Studio finden & bewerten.
 */
export const googleReviewUrl = site.rating.googlePlaceId
  ? `https://search.google.com/local/writereview?placeid=${site.rating.googlePlaceId}`
  : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${site.name} ${site.address.city}`,
    )}`;

export const reviews = [
  {
    author: 'Felix Schröter',
    rating: 5,
    text: 'Für mich die beste Anlaufstelle für Fahrzeugfolierung in Münster und Umgebung. Faire Preise und ein überaus kompetentes sowie sympathisches Team!',
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
