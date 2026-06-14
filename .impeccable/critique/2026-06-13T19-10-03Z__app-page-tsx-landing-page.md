---
target: Landing Page (app/page.tsx)
total_score: 32
p0_count: 0
p1_count: 2
timestamp: 2026-06-13T19-10-03Z
slug: app-page-tsx-landing-page
---
# Critique — Landing Page (Muster Werbetechnik)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Form-States + Nav-Scroll-State gut; kein „Absende"-Fortschritt über Button-Text hinaus |
| 2 | Match System / Real World | 4 | Deutsch, geduzt, domänennah, klare Reihenfolge |
| 3 | User Control and Freedom | 3 | Mobile-Menü Esc, Cookie-Kontrolle; Formular kein Entwurf-Restore |
| 4 | Consistency and Standards | 4 | Konsistente Tokens/Komponenten, ein Akzent |
| 5 | Error Prevention | 3 | Required-Felder, Honeypot, bedingtes Fahrzeug-Feld |
| 6 | Recognition Rather Than Recall | 3 | Sichtbare Nav, Leistungs-Chips; viele Nav-Punkte (7) |
| 7 | Flexibility and Efficiency | 3 | Click-to-Call/WhatsApp, Chip-Prefill |
| 8 | Aesthetic and Minimalist Design | 3 | Starke Identität, aber Eyebrow-Scaffolding + Platzhalter-Bilder |
| 9 | Error Recovery | 3 | Form-Fehler in Klartext, Eingaben bleiben erhalten |
| 10 | Help and Documentation | 3 | Kontaktdaten/Datenschutz sichtbar; für Landingpage ausreichend |
| **Total** | | **32/40** | **Good — solide Basis, gezielte Schwächen** |

## Anti-Patterns Verdict

**LLM-Assessment:** Sieht NICHT nach Standard-AI-Slop aus — das committed Dark-Cinematic mit einem Olive-Akzent vermeidet den Beige-/Template-Reflex und hat echten POV. ABER zwei Tells trüben das Bild: (1) der weit gesperrte Eyebrow-Kicker über fast jeder Sektion (`.eyebrow` in Leistungen, Kontakt, Rezension …) ist genau das AI-Scaffold, das DESIGN.md/Skill als Don't führt; (2) Platzhalter-Flächen statt echter Fotos in bildgetriebenen Sektionen.

**Deterministischer Scan (detect.mjs):** 2 Warnungen. `broken-image` (Studio.tsx:18) = **False Positive** (Treffer im Code-Kommentar), deckt aber den realen CSS-Platzhalter auf. `em-dash-overuse` (layout.tsx, 11×) = überwiegend Meta-/JSON-LD-Text; deutsche Gedankenstriche, größtenteils legitim, Cadence im Blick behalten.

**Visual Overlays:** Nicht ausgeführt — keine zuverlässige Browser-Automatisierung/Dev-Server in dieser Umgebung. Visuelle Bewertung stützt sich auf Code + früheren Live-Abruf der Produktionsseite.

## Overall Impression
Eine überdurchschnittliche, markenstarke Seite mit klarer Kino-Ästhetik und einem hervorragenden Kontakt-Flow. Die größte verschenkte Chance: ein **Fahrzeug-Folier-Betrieb ohne sichtbare echte Arbeit**. Carwrapping ist zutiefst visuell — Platzhalter statt Vorher/Nachher-Fotos widerspricht dem eigenen Prinzip „Show, don't tell".

## What's Working
- **Committed Identität:** Noir-Bühne + ein Olive-Akzent, Playfair/Inter, Kino-Korn. Kein generischer Look, echter POV.
- **Kontakt-Sektion:** Leistungs-Chips, bedingtes Fahrzeug-Feld, Honeypot, Server-Action, Click-to-Call/WhatsApp — durchdacht und konversionsstark.
- **A11y-Fundament:** aria-Labels, sichtbare Focus-States, `prefers-reduced-motion` respektiert, mobile Scroll-Vereinfachung.

## Priority Issues

- **[P1] Platzhalter statt echter Fotos in bildgetriebenen Sektionen.** Studio (CSS-Platzhalter, TODO), Showcase/Portfolio teils generierte/Platzhalter-Szenen. **Warum:** Im Brand-Register IST das Bild das Produkt; ein Folierer muss seine Arbeit zeigen. Platzhalter senken Vertrauen und Conversion direkt. **Fix:** echte Vorher/Nachher- und Detail-Fotos einsetzen (öffnet `/public`-Slots). **Command:** /impeccable harden bzw. echte Assets.
- **[P1] Eyebrow-Kicker über fast jeder Sektion.** Der gesperrte Olive-Uppercase-Kicker ist AI-Grammatik, sobald er Sektions-Scaffold wird. **Warum:** zieht eine sonst distinkte Seite Richtung Template. **Fix:** Eyebrows auf 1–2 bewusste Stellen reduzieren oder durch eine andere Kadenz ersetzen. **Command:** /impeccable typeset.
- **[P2] Social Proof zu dünn, zu prominent.** Eine einzige Google-Bewertung füllt einen 100svh-Screen und nennt offen „1 Bewertung". **Warum:** kann Vertrauen eher schwächen. **Fix:** Trust-Signale bündeln (Folien-Marken, Kennzahlen, Garantie); Bewertung einbetten statt allein tragen lassen. **Command:** /impeccable craft (Trust-Leiste).
- **[P2] Font-Paarung im Reflex-Lane.** Playfair Display + Inter stehen beide auf der Reflex-Reject-Liste (Trainingsdaten-Defaults). Identitätserhalt schlägt das bei bereits ausgeliefertem Brand — daher P2 —, aber eine charaktervollere Display-Schrift würde die Seite aus dem „edles AI-Dark-Template"-Eindruck heben. **Command:** /impeccable typeset.
- **[P3] Nav mit 7 Punkten.** Knapp über dem ≤5-Working-Memory-Richtwert. **Fix:** ggf. „Ergebnisse/Portfolio" oder „Studio/Standort" bündeln. **Command:** /impeccable layout.

## Persona Red Flags

**Jordan (Erstbesucher):** Trifft in Studio/Portfolio auf Platzhalter statt echter Folierungen — kann die Kompetenz nicht einschätzen und springt ab. Sucht Beweise, findet Stimmung.

**Casey (Mobile, unterwegs):** Gut bedient durch die persistente Anrufen/WhatsApp-Bar. Aber: lange Cinematic-Strecke (am Desktop) und die fehlenden echten Bilder kosten Geduld; will schnell „echte Arbeit" sehen.

**Riley (Stresstester):** Single-Review-Sektion wirkt bei „1 Bewertung" entlarvend; Platzhalter-Bilder lesen sich wie „noch nicht fertig". Prüft, ob Anspruch und Realität übereinstimmen.

**Lukas (lokaler Auto-Enthusiast, Projekt-Persona):** Will Lack, Naht, Kantenabschluss in Großaufnahme sehen, bevor er anfragt. Ohne Detail-Fotos bleibt die Premium-Behauptung unbelegt.

## Minor Observations
- `em-dash`-Cadence in Meta-Texten im Blick behalten (Detector-Hinweis).
- Placeholder-Text in Inputs nutzt `paper-dim/50` — Kontrast gegen den dunkel-transparenten Feldgrund prüfen (Richtung 4.5:1).
- README nennt „Gold" als Akzent, Code ist auf Olive umgestellt — Doku/Realität minimal auseinander (nicht nutzersichtbar).

## Questions to Consider
- Was, wenn die **echte Arbeit** (Vorher/Nachher in Großaufnahme) die Held:in der Seite wäre statt der CSS-Kulisse?
- Braucht jede Sektion einen Eyebrow — oder gewinnt die Seite, wenn nur eine ihn trägt?
- Wie würde eine selbstbewusste Version des Social Proofs aussehen, die nicht von „1 Bewertung" lebt?
