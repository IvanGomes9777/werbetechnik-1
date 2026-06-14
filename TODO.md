# TODO — offene Kundendaten & Aufgaben (Demo)

Diese Liste sammelt alle Platzhalter (`BEISPIEL` / `TODO` im Code). Aktuell
sind in `lib/site.ts` ausschließlich **Beispiel-/Demo-Daten** hinterlegt
(Name, Logo, Kontakt, Instagram, Bewertung führen bewusst nirgendwohin).
Standort Münster bleibt. Vor Live-Schaltung durch echte Kundendaten ersetzen.

## 🔴 Kundendaten ergänzen / bestätigen

- [ ] **E-Mail-Adresse** bestätigen — aktuell Beispiel `kontakt@muster-werbetechnik.de`
      (`lib/site.ts`, Kontakt, Impressum, Datenschutz).
- [ ] **Inhaber (Impressum)** ergänzen — `lib/site.ts` → `legal.owner`.
- [ ] **USt-IdNr. (Impressum)** ergänzen — `lib/site.ts` → `legal.vatId`.
- [ ] **Geo-Koordinaten** für JSON-LD/Map verifizieren — `lib/site.ts` → `geo`.
- [ ] **Domain/URL** final setzen — `lib/site.ts` → `url` (für JSON-LD, sitemap, OG).

## 🖼️ Medien

- [ ] **Hero-Video** von Ivan einsetzen — Slot in `components/Hero.tsx`
      (`{/* TODO: Hero-Video von Ivan einsetzen */}`). Container ist bereits
      auf `object-fit: cover` vorbereitet; aktuell Satin-Licht-Sweep (CSS).
- [ ] **Portfolio-Fotos** durch echte GV-Aufnahmen ersetzen —
      `components/Portfolio.tsx`. Aktuell rechtssichere CSS-Platzhalter (16:10).
  - [ ] Optional: Referenz-/Deep-Search-Fotos nur mit Nutzungsrecht live nehmen.
  - [ ] **Kennzeichen** auf echten Fotos unkenntlich machen (DSGVO).
  - [ ] `next/image` mit korrekten `sizes`/`alt` verwenden.
- [ ] **Logo** — falls vorhanden, GV-Monogramm-Fallback in `components/Monogram.tsx`
      ersetzen.
- [ ] **OG-Image** (`/public/og-image.jpg`, 1200×630) ergänzen — referenziert in
      `app/layout.tsx`.
- [ ] **Favicon** (`app/icon.png` / `favicon.ico`) ergänzen.

## ✉️ Funktionalität

- [ ] **Mailversand** des Anfrageformulars anbinden (z. B. Resend) —
      `app/actions.ts` (`// TODO: Mailversand anbinden`). Aktuell nur Konsolen-Log.
- [ ] **Analytics** (optional) konkretisieren — nur consent-gated laden;
      Platzhalter im Cookie-Banner & Datenschutz.

## ⚖️ Recht

- [ ] **AGB** rechtlich prüfen lassen (`app/agb/page.tsx` ist Entwurf/Platzhalter).
- [ ] **Preise** — bewusst „Preis nach kostenloser Begutachtung“. Falls „ab“-Preise
      gewünscht: nur als Beispiel kennzeichnen und mit Kunde bestätigen.

## ✅ Bereits erledigt

- Verifizierte Kundendaten eingepflegt (Adresse, Telefon, Öffnungszeiten,
  Instagram, 5,0-Bewertung, echte Rezension).
- Premium-Dark-Luxury-Design mit Signature-Gold-Haarlinien.
- Alle Sektionen: Hero, Studio, Finishes, Leistungen, Portfolio, Ablauf,
  Rezension, Kontakt.
- Rechtsseiten: Impressum, Datenschutz, AGB + Service-Disclaimer.
- Cookie-Banner (Privacy by default), consent-gated Google Maps.
- SEO: Metadata, JSON-LD `LocalBusiness` (AutoBodyShop), sitemap.ts, robots.ts.
- A11y: Skip-Link, sichtbarer Keyboard-Fokus, ARIA, `prefers-reduced-motion`.
