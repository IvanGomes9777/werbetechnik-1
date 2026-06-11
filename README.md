# GV Werbetechnik — Website

Premium-Dark-Luxury Website für die Fahrzeugfolierung **GV Werbetechnik** in
Münster. Cinematic, edel, understated — „Studio bei Nacht“.

## Tech-Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (Design-Tokens als CSS-Variablen + Theme-Extension)
- Fonts via `next/font/google` (Playfair Display, Jost)
- Animationen: CSS + IntersectionObserver, `prefers-reduced-motion`-bewusst
- Deployment: **Vercel**

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Production-Build
npm run lint
```

## Struktur

```
app/
  layout.tsx         Root-Layout, Fonts, JSON-LD LocalBusiness, Navbar/Footer
  page.tsx           Startseite (alle Sektionen)
  actions.ts         Server Action für das Anfrageformular
  impressum/ datenschutz/ agb/   Rechtsseiten
  sitemap.ts robots.ts
components/           Navbar, Hero, Studio, Finishes, Leistungen, Portfolio,
                      Ablauf, Rezension, Kontakt, Footer, CookieBanner, …
lib/
  site.ts            Zentrale Geschäftsdaten (verifiziert + Beispiel-Platzhalter)
  consent.ts         Consent-Management (Privacy by default)
```

## Design-Signature

Goldene Haarlinien, die sich beim Scrollen „zeichnen“ (IntersectionObserver),
ein Satin-Licht-Sweep im Hero und Gold-Hover-Linien auf den Service-Cards.
Gold (`--gold`) ist der einzige Akzent.

## Offene Punkte

Alle Platzhalter und nachzutragenden Kundendaten sind in **[TODO.md](./TODO.md)**
gesammelt.
