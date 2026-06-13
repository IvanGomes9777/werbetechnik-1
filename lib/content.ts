/**
 * Geteilte Inhalte für alle Design-Varianten — überall mit den echten
 * Kundendaten von GV Werbetechnik (siehe lib/site.ts).
 * Preise sind BEISPIEL-PREISE und als solche gekennzeichnet
 * (Endpreis nach kostenloser Begutachtung).
 */

/**
 * Showcase „Vorher / Nachher" (Section 3) — Szenen über das ganze
 * Leistungsspektrum (Fahrzeug, Lichtwerbung, Objektbeschriftung, Schilder).
 *
 * Die `surface`-Gradients sind hochwertige, rechtssichere Platzhalter, die das
 * Ergebnis stilisiert darstellen. Der „Vorher"-Zustand entsteht automatisch
 * durch einen Entsättigungs-/Abdunkel-Filter auf derselben Komposition.
 * Sind `beforeImg`/`afterImg` gesetzt, werden stattdessen zwei echte Fotos
 * gegeneinander gewischt (Fahrzeug = echte Aufnahmen).
 * TODO: restliche Szenen durch echte Vorher/Nachher-Fotopaare ersetzen (DSGVO:
 * Kennzeichen unkenntlich machen) — siehe TODO.md.
 */
export type ShowcaseScene = {
  id: string;
  label: string;
  caption: string;
  accent: string;
  surface: string;
  beforeImg?: string;
  afterImg?: string;
};

export const showcaseScenes: ShowcaseScene[] = [
  {
    id: 'fahrzeug',
    label: 'Fahrzeug',
    caption: 'Vollfolierung · Satin-Schwarz',
    accent: '#9aa6b5',
    surface:
      'radial-gradient(120% 80% at 72% 8%, rgba(188,200,87,0.18), transparent 55%), linear-gradient(150deg,#33373f,#181a1f 58%,#0d0e11)',
    beforeImg: '/showcase/gt3rs-vorher.webp',
    afterImg: '/showcase/gt3rs-nachher.webp',
  },
  {
    id: 'lichtwerbung',
    label: 'Lichtwerbung',
    caption: 'Leuchtschrift · Ladenfront',
    accent: '#cdd56e',
    surface:
      'radial-gradient(60% 45% at 50% 42%, rgba(205,213,110,0.55), rgba(90,99,5,0.12) 60%, transparent 72%), linear-gradient(180deg,#15170f,#0b0c08)',
    beforeImg: '/showcase/lichtwerbung-vorher.webp',
    afterImg: '/showcase/lichtwerbung-nachher.webp',
  },
  {
    id: 'objekt',
    label: 'Objektbeschriftung',
    caption: 'Schaufenster · Folienschrift',
    accent: '#9fb0c4',
    surface:
      'linear-gradient(125deg, rgba(255,255,255,0.10) 0 2px, transparent 2px 9px), radial-gradient(90% 70% at 30% 20%, rgba(159,176,196,0.22), transparent 60%), linear-gradient(160deg,#1b1f24,#0c0e10)',
    beforeImg: '/showcase/objekt-vorher.webp',
    afterImg: '/showcase/objekt-nachher.webp',
  },
  {
    id: 'schild',
    label: 'Schilder & Werbung',
    caption: 'Firmenschild · Eingang',
    accent: '#bcc857',
    surface:
      'radial-gradient(100% 80% at 50% 30%, rgba(188,200,87,0.20), transparent 58%), linear-gradient(155deg,#22251a,#101209)',
    beforeImg: '/showcase/schild-vorher.webp',
    afterImg: '/showcase/schild-nachher.webp',
  },
];

/**
 * Vertrauens-Band unter dem Slider.
 * `value: '5,0'` ist die verifizierte Google-Bewertung (lib/site.ts).
 * Die mit `confirm: true` markierten Zahlen sind BEISPIEL-Platzhalter und von
 * Ivan zu bestätigen, bevor sie als Fakt online gehen — siehe TODO.md.
 */
export const trustStats = [
  { value: '5,0', suffix: '★', label: 'Google-Bewertung', confirm: false },
  { value: '7', suffix: '+', label: 'Jahre Erfahrung', confirm: true },
  { value: '500', suffix: '+', label: 'Projekte umgesetzt', confirm: true },
] as const;

/**
 * Portfolio (Cinematic Filmstrip) — aktuell rechtssichere CSS-Platzhalter
 * (keine echten Fotos). `surface` ist der Platzhalter-Look pro Projekt.
 * TODO: durch echte GV-Projektfotos ersetzen (DSGVO: Kennzeichen unkenntlich) —
 * siehe TODO.md.
 */
export const portfolio = [
  {
    id: 'satin-schwarz',
    category: 'Fahrzeug',
    title: 'Satin-Schwarz Vollfolierung',
    surface: 'linear-gradient(150deg,#2f2f2f,#0d0d0d)',
  },
  {
    id: 'color-shift',
    category: 'Fahrzeug',
    title: 'Color-Shift Sportwagen',
    surface: 'linear-gradient(125deg,#00c2cc,#7a5cff 42%,#ff3fa0 78%,#00c2cc)',
  },
  {
    id: 'leuchtschrift',
    category: 'Lichtwerbung',
    title: 'Leuchtschrift Ladenfront',
    surface:
      'radial-gradient(60% 45% at 50% 40%, rgba(205,213,110,0.55), rgba(90,99,5,0.12) 60%, transparent 72%), linear-gradient(180deg,#15170f,#0b0c08)',
  },
  {
    id: 'schaufenster',
    category: 'Objektbeschriftung',
    title: 'Schaufenster-Beschriftung',
    surface:
      'linear-gradient(125deg, rgba(255,255,255,0.10) 0 2px, transparent 2px 9px), radial-gradient(90% 70% at 30% 20%, rgba(159,176,196,0.22), transparent 60%), linear-gradient(160deg,#1b1f24,#0c0e10)',
  },
  {
    id: 'firmenschild',
    category: 'Schilder',
    title: 'Firmenschild Eingang',
    surface:
      'radial-gradient(100% 80% at 50% 30%, rgba(188,200,87,0.22), transparent 58%), linear-gradient(155deg,#22251a,#101209)',
  },
  {
    id: 'carbon',
    category: 'Fahrzeug',
    title: 'Carbon-Akzente',
    surface:
      'repeating-linear-gradient(45deg,rgba(255,255,255,.06) 0 2px,transparent 2px 6px),repeating-linear-gradient(-45deg,rgba(255,255,255,.05) 0 2px,transparent 2px 6px),linear-gradient(#181818,#0c0c0c)',
  },
  {
    id: 'flotte',
    category: 'Werbung',
    title: 'Flottenbeschriftung',
    surface:
      'radial-gradient(80% 60% at 70% 20%, rgba(90,99,5,0.3), transparent 60%), linear-gradient(150deg,#1a1d12,#0c0d08)',
  },
  {
    id: 'camouflage',
    category: 'Fahrzeug',
    title: 'Camouflage-Folierung',
    surface:
      'radial-gradient(circle at 20% 30%,#2a3018 0 12%,transparent 13%),radial-gradient(circle at 62% 52%,#565f33 0 14%,transparent 15%),radial-gradient(circle at 82% 22%,#1c2010 0 11%,transparent 12%),radial-gradient(circle at 38% 76%,#6b733f 0 12%,transparent 13%),linear-gradient(#3a4327,#2a3018)',
  },
] as const;

export const trustChips = [
  { text: 'Premium-Gussfolien' },
  { text: 'Studio in Münster' },
  { text: 'Rückstandsfrei entfernbar' },
] as const;

export const services = [
  { name: 'Vollfolierung (Farbwechsel)', desc: 'Komplette Designfolierung — neue Farbe, voller Werterhalt.', price: 'ab 1.990 €', dauer: '2–4 Tage' },
  { name: 'Teilfolierung & Akzente', desc: 'Dach, Spiegel, Motorhaube — gezielte Akzente.', price: 'ab 290 €', dauer: '' },
  { name: 'Lackschutzfolie (PPF)', desc: 'Unsichtbarer Steinschlagschutz für den Originallack.', price: 'ab 890 €', dauer: '' },
  { name: 'Scheibentönung', desc: 'Nur zugelassene ABE-Folien, hintere Scheiben & Heck.', price: 'ab 149 €', dauer: '' },
  { name: 'Chrome-Delete', desc: 'Zierleisten in Schwarz oder Satin — cleaner Look.', price: 'ab 240 €', dauer: '' },
  { name: 'Werbebeschriftung & Flotten', desc: 'Gewerbliche Fahrzeugwerbung — Einzelfahrzeug bis Flotte.', price: 'Angebot', dauer: '' },
];

/**
 * Leistungen von GV Werbetechnik (echt).
 * Hinweis: Die Bilder (img) sind KI-generierte Platzhalter im Marken-Look —
 * bei Bedarf später durch echte GV-Fotos ersetzen.
 */
export const leistungen: {
  id: string;
  name: string;
  desc: string;
  img?: string;
}[] = [
  {
    id: 'carwrapping',
    name: 'Carwrapping',
    desc: 'Individuelle Folierung für einen einzigartigen Look.',
    img: '/leistungen/carwrapping.jpg',
  },
  {
    id: 'lackschutz',
    name: 'Lackschutz',
    desc: 'Unsichtbarer Schutz, der deinen Originallack bewahrt.',
    img: '/leistungen/lackschutz.jpg',
  },
  {
    id: 'kfz-folierung',
    name: 'KFZ-Folierung',
    desc: 'Mach dein Fahrzeug zur rollenden Werbefläche und gewinne Aufmerksamkeit unterwegs.',
    img: '/leistungen/kfz-folierung.jpg',
  },
  {
    id: 'lichtwerbung',
    name: 'Lichtwerbung',
    desc: 'Beleuchtete Schriftzüge, die deinen Betrieb auch im Dunkeln eindrucksvoll in Szene setzen.',
    img: '/leistungen/lichtwerbung.jpg',
  },
  {
    id: 'schilder',
    name: 'Schilder',
    desc: 'Stabile Schilder für Eingang, Gelände und Wegeleitung.',
    img: '/leistungen/schilder.jpg',
  },
  {
    id: 'objektbeschriftung',
    name: 'Objektbeschriftung',
    desc: 'Beschriftung für Gebäude, Fassaden, Fenster und Flächen.',
    img: '/leistungen/objektbeschriftung.jpg',
  },
];

export const steps = [
  { no: '01', title: 'Anfrage & Wunsch', desc: 'Formular mit Finish-Wunsch — gern mit Fotos deines Fahrzeugs.' },
  { no: '02', title: 'Beratung & Angebot', desc: 'Wir besprechen Material, Finish und Preis.' },
  { no: '03', title: 'Termin & Folierung', desc: 'Saubere, fachgerechte Verarbeitung auf Studio-Niveau.' },
  { no: '04', title: 'Abnahme & Pflege', desc: 'Gemeinsame Abnahme und konkrete Pflegehinweise.' },
  { no: '05', title: 'Papiere & Versicherung', desc: 'Bei Farbwechsel: Hinweis zu Fahrzeugpapieren & Versicherung.' },
];

export const trustPoints = [
  'Premium-Folien (3M, Avery Dennison, KPMF, Hexis)',
  'Saubere, fachgerechte Verarbeitung',
  'Werterhalt — Originallack bleibt geschützt',
  'Rückstandslos entfernbar',
  'Faire Preise, persönliche Beratung',
];

export const materialPartners = ['3M', 'Avery Dennison', 'KPMF', 'Hexis', 'Oracal'];

/** Galerie-Platzhalter (rechtssichere CSS-Kompositionen, 16:10).
 *  BEISPIEL – durch echte GV-Aufnahmen ersetzen, Kennzeichen unkenntlich machen. */
export const gallery = [
  { finish: 'Matt', vehicle: 'Sportlimousine', g: 'linear-gradient(135deg,#1c1c1c,#0a0a0a 60%,#202020)' },
  { finish: 'Satin', vehicle: 'SUV', g: 'linear-gradient(135deg,#34302a,#14120f 65%,#3a352d)' },
  { finish: 'Color-Shift', vehicle: 'Coupé', g: 'linear-gradient(135deg,#2a1f3d,#141018 50%,#3d2e1a)' },
  { finish: 'Custom', vehicle: 'Kompaktwagen', g: 'linear-gradient(135deg,#1a2733,#0a0f14 60%,#2e2417)' },
  { finish: 'Carbon', vehicle: 'Kombi', g: 'linear-gradient(135deg,#232323,#0c0c0c 60%,#1a1a1a)' },
  { finish: 'Satin-Chrome', vehicle: 'Roadster', g: 'linear-gradient(135deg,#3a3024,#16120c 60%,#4a3c28)' },
];
