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

- [ ] **Hero-Video** als Demo einsetzen — Slot in `components/Hero.tsx`
      (`{/* TODO: Hero-Video als Demo einsetzen */}`). Container ist bereits
      auf `object-fit: cover` vorbereitet; aktuell Satin-Licht-Sweep (CSS).
- [ ] **Vorher/Nachher-Fotos** (Section „Ergebnisse"):
      - **Fahrzeug** = KI-generiertes Paar (`public/showcase/gt3rs-{vorher,nachher}.webp`,
        weißer GT3 RS → satin-schwarz foliert). Bei Bedarf durch echte Aufnahme ersetzen.
      - **Lichtwerbung** = echtes Vorher-Foto + **KI-generiertes Nachher**
        (`lichtwerbung-nachher.webp`, beleuchtete „MUSTER WERBETECHNIK"-Fassade).
        Bei Bedarf durch echtes Referenzprojekt ersetzen.
      - **Objektbeschriftung** = KI-generiertes Paar (`objekt-{vorher,nachher}.webp`,
        leeres Schaufenster → mit „MUSTER WERBETECHNIK"-Folienbeschriftung).
      - **Schilder & Werbung** = KI-generiertes Paar (`schild-{vorher,nachher}.webp`,
        Eingang ohne Schild → mit montiertem „MUSTER WERBETECHNIK"-Firmenschild).
      - Alle 4 Szenen haben jetzt Vorher/Nachher-Bilder; Fahrzeug/Lichtwerbung/
        Objekt/Schild sind KI-generiert → bei Bedarf durch echte Projekte ersetzen.
      - DSGVO: sichtbare Kennzeichen (GT3 RS) ggf. unkenntlich machen.
- [ ] **Zahlen bestätigen** (Section „Ergebnisse", `trustStats` in
      `lib/content.ts`) — `Jahre Erfahrung` und `Projekte umgesetzt` sind
      BEISPIEL-Platzhalter (`confirm: true`). 5,0★ Google ist verifiziert.
- [ ] **Live-Google-Bewertungen** (Section „Bewertung", `components/Rezension.tsx`)
      — Wunsch: automatisch die **neuesten 3** Google-Bewertungen anzeigen
      (neue rückt rein, älteste fällt raus). Umsetzung via **Google Places API**
      („Place Details", liefert max. 5 Reviews, Sortierung „newest"), serverseitig
      mit ISR-Caching + Fallback auf die aktuelle Karte.
      Benötigt: `GOOGLE_PLACE_ID` + `GOOGLE_PLACES_API_KEY` (Billing aktiv) als
      Env-Variablen. Optional: nur ≥ 4 Sterne filtern. Aktuell: 1 feste Karte
      (Erika Mustermann) aus `lib/site.ts`.
- [ ] **Portfolio** (Cinematic Filmstrip, `components/Portfolio.tsx`) — aktuell
      rechtssichere CSS-Platzhalter-Kacheln (`portfolio` in `lib/content.ts`).
      Durch echte GV-Projektfotos ersetzen.
- [ ] **Portfolio-Fotos** durch echte GV-Aufnahmen ersetzen —
      `components/Portfolio.tsx`. Aktuell rechtssichere CSS-Platzhalter (16:10).
  - [ ] Optional: Referenz-/Deep-Search-Fotos nur mit Nutzungsrecht live nehmen.
  - [ ] **Kennzeichen** auf echten Fotos unkenntlich machen (DSGVO).
  - [ ] `next/image` mit korrekten `sizes`/`alt` verwenden.
- [ ] **Logo** — falls vorhanden, GV-Monogramm-Fallback in `components/Monogram.tsx`
      ersetzen.
- [ ] **OG-Image** (`/public/og-image.jpg`, 1200×630) ergänzen — referenziert in
      `app/layout.tsx`.
- [x] **Favicon** ergänzt — gebrandetes `app/icon.svg` (noir Kachel + olives
      „GV"-Monogramm). Bei Bedarf später durch echtes Logo ersetzen.

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
