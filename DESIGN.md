---
name: GV Werbetechnik
description: Premium-Dark-Luxury One-Pager für Fahrzeugfolierung & Werbetechnik in Münster — „Das Studio bei Nacht".
colors:
  noir: "#08090b"
  panel: "#101116"
  olive: "#5a6305"
  olive-hover: "#6c771b"
  olive-bright: "#bcc857"
  olive-soft: "#cdd56e"
  paper: "#edeae3"
  paper-dim: "#b7b3a8"
  ink-on-olive: "#f2f0e6"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(1.9rem, 4vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "normal"
  hero:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.6rem, 6.2vw, 5rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 300
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.42em"
rounded:
  sm: "2px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  button-x: "32px"
  button-y: "14px"
  field: "12px 16px"
  section-y: "clamp(5rem, 11vh, 9rem)"
components:
  button-primary:
    backgroundColor: "{colors.olive}"
    textColor: "{colors.ink-on-olive}"
    rounded: "{rounded.full}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "{colors.olive-hover}"
    textColor: "{colors.ink-on-olive}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
    padding: "14px 32px"
  button-outline-hover:
    textColor: "{colors.olive-bright}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.paper-dim}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  chip-selected:
    backgroundColor: "{colors.olive}"
    textColor: "{colors.ink-on-olive}"
  input:
    backgroundColor: "rgba(255,255,255,0.03)"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
---

# Design System: GV Werbetechnik

## 1. Overview

**Creative North Star: "Das Studio bei Nacht"**

Die Seite ist ein abgedunkeltes Werkstatt-Studio nach Feierabend: tiefes Noir-Schwarz als Bühne, ein einziger Lichtkegel, und das folierte Fahrzeug als Hauptdarsteller. Alles Wärme und alle Energie kommen aus **einem** Akzent — einem militärisch-edlen Olivgrün — getragen von Kino-Korn, weichen Glows und langsamen, exponentiell ausklingenden Übergängen. Nichts blinkt, nichts schreit. Die Hochwertigkeit entsteht aus Ruhe, Schwarz-Raum und Präzision im Detail, nicht aus Effekt-Lärm.

Das System ist **understated und selbstbewusst**: Playfair-Display-Serifen für die großen, ruhigen Aussagen, Inter in leichtem Gewicht für die nüchterne Fließtext-Stimme. Bewegung ist Teil des Materials (Satin-Sweep, sich „zeichnende" Linien, cinematic Sektions-Übergänge am Desktop), aber immer langsam und zielgerichtet. Conversion ist eingebaut, nicht angeklebt: Anruf, WhatsApp und Anfrage sind von überall einen kurzen Weg entfernt.

Ausdrücklich **abgelehnt** (aus PRODUCT.md): billige, überladene Tuning-Optik mit grellen Rabatt-Bannern und Clipart; der generische SaaS-/Template-Look aus gleichförmigen Icon-Karten; kalte, sterile Corporate-Sterilität. Und die üblichen AI-Tells — Gradient-Text, dekorative Glasmorphie, Seitenstreifen-Borders.

**Key Characteristics:**
- Noir-Bühne, ein Olive-Akzent, alles andere Neutral.
- Serif-Display (Playfair) gegen Sans-Body (Inter) auf klarer Kontrast-Achse.
- Flach + tonal: Tiefe durch Licht, Korn und Layering statt harter Schatten.
- Pill-Geometrie für Aktionen; großzügiger Schwarz-Raum.
- Langsame, exponentiell ausklingende Bewegung; `prefers-reduced-motion` ist Pflicht.

## 2. Colors

Eine Noir-Bühne mit einer einzigen olivgrünen Stimme — gedämpft im Großen, hell nur dort, wo Text Kontrast braucht.

### Primary
- **Studio-Olive** (`#5a6305`): Der Haupt-Akzent für Flächen — primäre Buttons, ausgewählte Chips, Lichtakzente, Glows. Trägt die Marken-Wärme. Zu dunkel für Text auf Noir; nie für Fließtext.
- **Olive-Hover** (`#6c771b`): Nur als Hover-Zustand des primären Buttons.
- **Signal-Olive** (`#bcc857`): Die helle Olive-Variante für **Text auf Dunkel** — Eyebrows, Links, aktive Nav, Icon-Akzente, Focus-Ring. Hält WCAG-Kontrast auf Noir.
- **Olive-Soft** (`#cdd56e`): Sparsame Erfolgs-/Soft-Akzente (z. B. Formular-Erfolgsmeldung).

### Neutral
- **Noir** (`#08090b`): Die Bühne — globaler Body-Hintergrund jeder Sektion.
- **Panel** (`#101116`): Minimal angehobene Flächen/Tiefenverläufe in Szenen.
- **Paper** (`#edeae3`): Primärer Textton auf Noir (Headlines, Vordergrund-Text).
- **Paper-Dim** (`#b7b3a8`): Sekundär-/Fließtext und ruhige Beschriftungen. Kontrast auf Noir prüfen — nie weiter abdunkeln.
- **Ink-on-Olive** (`#f2f0e6`): Textfarbe **auf** Olive-Flächen (Button-Label).
- **Line** (`rgba(188,200,87,0.28)`): Haarlinien, Borders, Divider — eine olivgetönte Transparenz, kein Vollton.

### Named Rules
**The One-Voice Rule.** Olive ist die **einzige** Akzentfarbe. Keine zweite Marken-Farbe, kein Verlauf zwischen zwei Tönen. Flächen tragen `#5a6305`, Text trägt `#bcc857`; die Trennung ist Absicht, kein Zufall.

## 3. Typography

**Display Font:** Playfair Display (mit Georgia, serif)
**Body Font:** Inter (mit system-ui, sans-serif)
**Label Font:** Inter (500, uppercase, weit gesperrt)

**Character:** Eine klare Kontrast-Achse — die hochkontrastige Serife Playfair gibt den großen Aussagen Eleganz und Ruhe; Inter in leichtem Gewicht hält den Fließtext nüchtern und gut lesbar. Keine zwei ähnlichen Sans-Schriften, kein Font-Geräusch.

### Hierarchy
- **Hero** (Playfair 500, `clamp(2.6rem, 6.2vw, 5rem)`, lh 1.02): Die eine Hero-Aussage, mit weichem Text-Shadow gegen das Video.
- **Display** (Playfair 500, `clamp(1.9rem, 4vw, 3rem)`, lh 1.05): Sektions-Überschriften (h2).
- **Title** (Playfair 400–500, `clamp(1.6rem, 2.5vw, 2.4rem)`): Karten-/Leistungs-Titel.
- **Body** (Inter 300, `1.0625rem`, lh 1.7): Fließtext; Zeilenlänge 65–75ch deckeln.
- **Label/Eyebrow** (Inter 500, `0.72rem`, tracking `0.42em`, uppercase, Farbe Signal-Olive): Kicker über Sektionen, Formular-Legends.

### Named Rules
**The Playfair-or-Inter Rule.** Headlines IMMER Playfair, Body/UI IMMER Inter. Die übrigen im Projekt geladenen Schriften (Anton, Sora, Bebas, Montserrat …) sind reine Varianten-Optionen und gehören **nicht** ins finale Design.

## 4. Elevation

Das System ist **flach und tonal**, nicht beschattet. Tiefe entsteht durch Licht und Atmosphäre — radiale Spotlights, weiche Olive-Hazes, Film-Korn (`hero-grain`, opacity ~0.045) und das Übereinanderschieben gepinnter Sektionen am Desktop — nicht durch Box-Shadows auf Karten. Schatten erscheinen nur dort, wo sie physikalisch Sinn ergeben: ein tiefer, diffuser Drop unter dem schwebenden Fahrzeug-Objekt und unter der hellen Rezensions-Karte, die als einziges Element aus der Noir-Bühne heraustritt.

### Shadow Vocabulary
- **Object-Drop** (`box-shadow: 0 40px 80px -20px rgba(0,0,0,0.85)`): Unter großen, „schwebenden" Objekten/Szenen — vermittelt Schwebe über dem Studioboden.
- **Lifted-Card** (`box-shadow: 0 40px 80px -30px rgba(0,0,0,0.75)`): Unter der hellen Google-Rezensions-Karte auf dunklem Grund.
- **Section-Cover** (`shadow-[0_-40px_80px_-20px_rgba(0,0,0,0.9)]`): Oberkante der über den Hero gleitenden Sektion (Desktop-Übergang).

### Named Rules
**The Light-Not-Shadow Rule.** Tiefe wird mit Licht, Glow und Korn erzeugt, nicht mit dunklen Box-Shadows auf jeder Karte. Karten sind im Ruhezustand flach mit einer `line`-Haarlinie; ein Schatten ist die Ausnahme für echt schwebende Elemente.

## 5. Components

Grundgefühl: **verfeinert & zurückhaltend** — ruhige Flächen, Haarlinien-Borders, langsame Farbübergänge, kein lauter Hover-Lift.

### Buttons
- **Shape:** Pille (`rounded-full`, 9999px).
- **Primary:** Olive-Fläche (`#5a6305`) mit Ink-on-Olive-Label (`#f2f0e6`), Padding `14px 32px`. Hero-Variante zusätzlich mit einmaligem Satin-Sweep beim Hover.
- **Outline (Secondary):** Transparent mit `line`-Border und Paper-Text; Hover verschiebt Border + Text auf Signal-Olive (`#bcc857`).
- **Hover / Focus:** `transition-colors` (langsam); sichtbarer Focus-Ring `2px solid #bcc857`, offset 3px.

### Chips (Leistungs-Auswahl)
- **Style:** Pille mit `line`-Border, Paper-Dim-Text, transparent.
- **State:** Ausgewählt → Olive-Fläche + Ink-on-Olive-Text; `aria-pressed` getragen. Unausgewählt-Hover → Border/Text Signal-Olive.

### Cards / Containers
- **Corner Style:** 16px (`rounded-2xl`) für Szenen-/Leistungs-Panels; 12px für kleinere Flächen.
- **Background:** Noir/Panel-Verläufe oder Foto mit Lesbarkeits-Overlay (Schwarz-Gradient).
- **Shadow Strategy:** Flach (siehe Elevation) — nur die helle Rezensions-Karte trägt `Lifted-Card`.
- **Border:** `line`-Haarlinie (`rgba(188,200,87,0.28)`).

### Inputs / Fields
- **Style:** `rounded-xl` (12px), Border `line`, Hintergrund `rgba(255,255,255,0.03)`, Text Paper, Placeholder Paper-Dim/50.
- **Focus:** Border + 1px-Ring in Signal-Olive (`focus:border-olive-bright focus:ring-1`), kein Outline-Doppel.

### Navigation
- **Style:** Fixe Topbar; transparent über dem Hero (Gradient-Scrim), nach Scroll Noir-Glas (`bg-[rgba(8,9,11,0.85)] backdrop-blur-md` + `line`-Unterkante). Links in Paper-Dim → Paper bei Hover. Logo „GV" in Playfair/Signal-Olive.
- **Mobile:** Vollflächiges Noir-Overlay-Menü mit großen Playfair-Links; Hamburger in Signal-Olive. Persistente Anrufen/WhatsApp-Leiste am unteren Rand bis `xl`.

### Signature: Cinematic Section Transitions
Am Desktop (≥1024px) pinnen Sektionen und die nächste schiebt sich per Zoom-Through/Wipe mit Blur + Abdunkeln darüber (`CoverPin`). **Auf Mobile bewusst deaktiviert** — dort einfaches gestapeltes, smooth/natives Scrollen. Lenis nur am Desktop. Alles `prefers-reduced-motion`-bewusst (Crossfade/instant).

## 6. Do's and Don'ts

### Do:
- **Do** Noir als Bühne lassen und Olive als **einzige** Akzentstimme einsetzen (The One-Voice Rule): Flächen `#5a6305`, Text `#bcc857`.
- **Do** Headlines in Playfair, Body/UI in Inter setzen — nie mischen, nie eine dritte Schrift.
- **Do** Fließtext mind. 4.5:1 gegen Noir halten; Paper-Dim ist die Untergrenze, nicht weiter abdunkeln. Zeilenlänge 65–75ch.
- **Do** Tiefe mit Licht, Glow und Film-Korn erzeugen, Karten flach mit `line`-Haarlinie halten.
- **Do** Pille-Geometrie (`rounded-full`) für Aktionen; sichtbarer Olive-Focus-Ring auf allem Interaktiven.
- **Do** jede Bewegung exponentiell ausklingen lassen (`cubic-bezier(0.22,1,0.36,1)`) und eine reduced-motion-Alternative liefern.

### Don't:
- **Don't** die Seite billig oder überladen wirken lassen — keine grellen Rabatt-/Aktions-Banner, keine Stockfoto-Tuning-Optik, kein Clipart, keine gestapelten Effekte.
- **Don't** in den generischen SaaS-/Template-Look verfallen — keine gleichförmigen Icon-Karten-Raster, keine Hero-Metric-Schablone (Riesenzahl + Label + Akzent).
- **Don't** kalt/steril/corporate werden — Wärme kommt aus Olive-Akzent, Playfair und echter Arbeit, nicht aus Body-Hintergründen.
- **Don't** AI-Tells verwenden: kein Gradient-Text (`background-clip:text`), keine dekorative Glasmorphie als Default, keine Seitenstreifen-Border (`border-left/right` > 1px als Farbakzent).
- **Don't** eine zweite Akzentfarbe oder einen Zwei-Ton-Verlauf einführen.
- **Don't** Headlines clampen, bis Wörter überlaufen — Hero-Copy auf jedem Breakpoint testen.
