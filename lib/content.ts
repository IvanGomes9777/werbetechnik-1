/**
 * Geteilte Inhalte für alle Design-Varianten — überall mit den echten
 * Kundendaten von GV Werbetechnik (siehe lib/site.ts).
 * Preise sind BEISPIEL-PREISE und als solche gekennzeichnet
 * (Endpreis nach kostenloser Begutachtung).
 */

export const finishes = [
  {
    id: 'matt',
    icon: '🖤',
    name: 'Matt',
    desc: 'Komplett glanzlos — schluckt Reflexe, wirkt edel und understated. Lässt Form und Linien des Fahrzeugs sprechen.',
    surface: 'linear-gradient(150deg,#2b2b2b,#0e0e0e)',
    accent: '#9a9a9a',
  },
  {
    id: 'satin',
    icon: '✨',
    name: 'Satin',
    desc: 'Seidiger, weicher Tiefenglanz zwischen Matt und Hochglanz. Hochwertig und warm, ohne zu spiegeln.',
    surface: 'linear-gradient(150deg,#4a4e57,#1c1e23 60%,#15161a)',
    accent: '#9aa6b5',
  },
  {
    id: 'chrome',
    icon: '🪞',
    name: 'Satin-Chrome',
    desc: 'Metallisch glänzend wie poliertes oder gebürstetes Metall — fängt das Licht in feinen Linien. Premium und auffällig.',
    surface:
      'repeating-linear-gradient(125deg,#8e9193 0 2px,#cfd2d4 2px 4px,#7c7f81 4px 7px)',
    accent: '#d6dadd',
  },
  {
    id: 'colorshift',
    icon: '🌈',
    name: 'Color-Shift',
    desc: 'Farbwechsel je nach Lichtwinkel — aus jeder Perspektive ein anderer Ton. Lebendig, individuell und unverwechselbar.',
    surface: 'linear-gradient(125deg,#00c2cc,#7a5cff 42%,#ff3fa0 78%,#00c2cc)',
    accent: '#8b5cff',
  },
  {
    id: 'carbon',
    icon: '🏁',
    name: 'Carbon-Optik',
    desc: 'Feine Carbonfaser-Struktur — sportlicher Look, ideal für Akzente wie Dach, Spiegel oder Motorhaube.',
    surface:
      'repeating-linear-gradient(45deg,rgba(255,255,255,.06) 0 2px,transparent 2px 6px),repeating-linear-gradient(-45deg,rgba(255,255,255,.05) 0 2px,transparent 2px 6px),linear-gradient(#181818,#0c0c0c)',
    accent: '#6b7077',
  },
  {
    id: 'camouflage',
    icon: '🪖',
    name: 'Camouflage',
    desc: 'Tarnmuster nach Wunsch — Army, Digital oder individuell. Markanter Auftritt mit Charakter.',
    surface:
      'radial-gradient(circle at 20% 30%,#2a3018 0 12%,transparent 13%),radial-gradient(circle at 62% 52%,#565f33 0 14%,transparent 15%),radial-gradient(circle at 82% 22%,#1c2010 0 11%,transparent 12%),radial-gradient(circle at 38% 76%,#6b733f 0 12%,transparent 13%),radial-gradient(circle at 88% 82%,#2a3018 0 15%,transparent 16%),linear-gradient(#3a4327,#2a3018)',
    accent: '#9fae4e',
  },
  {
    id: 'custom',
    icon: '🎨',
    name: 'Custom-Design',
    desc: 'Individuell: Wunschfarben, Muster, Grafiken und Logos — alles ist möglich. Auch die Basis für Werbe- & Flottenfolierung.',
    surface: 'linear-gradient(125deg,#ff6a00,#ff1fa0 32%,#7a5cff 64%,#00e5ff)',
    accent: '#ff2da6',
  },
];

export const services = [
  { icon: '🚗', name: 'Vollfolierung (Farbwechsel)', desc: 'Komplette Designfolierung — neue Farbe, voller Werterhalt.', price: 'ab 1.990 €', dauer: '2–4 Tage' },
  { icon: '🎯', name: 'Teilfolierung & Akzente', desc: 'Dach, Spiegel, Motorhaube — gezielte Akzente.', price: 'ab 290 €', dauer: '' },
  { icon: '🛡️', name: 'Lackschutzfolie (PPF)', desc: 'Unsichtbarer Steinschlagschutz für den Originallack.', price: 'ab 890 €', dauer: '' },
  { icon: '🌑', name: 'Scheibentönung', desc: 'Nur zugelassene ABE-Folien, hintere Scheiben & Heck.', price: 'ab 149 €', dauer: '' },
  { icon: '✂️', name: 'Chrome-Delete', desc: 'Zierleisten in Schwarz oder Satin — cleaner Look.', price: 'ab 240 €', dauer: '' },
  { icon: '📣', name: 'Werbebeschriftung & Flotten', desc: 'Gewerbliche Fahrzeugwerbung — Einzelfahrzeug bis Flotte.', price: 'Angebot', dauer: '' },
];

/**
 * Leistungen von GV Werbetechnik (echt).
 * Hinweis: Die Bilder (img) sind KI-generierte Platzhalter im Marken-Look —
 * bei Bedarf später durch echte GV-Fotos ersetzen.
 */
export const leistungen: {
  id: string;
  icon: string;
  name: string;
  desc: string;
  img?: string;
}[] = [
  {
    id: 'carwrapping',
    icon: '🚗',
    name: 'Carwrapping',
    desc: 'Individuelle Folierung für einen einzigartigen Look.',
    img: '/leistungen/carwrapping.jpg',
  },
  {
    id: 'lackschutz',
    icon: '🛡️',
    name: 'Lackschutz',
    desc: 'Unsichtbarer Schutz, der deinen Originallack bewahrt.',
    img: '/leistungen/lackschutz.jpg',
  },
  {
    id: 'kfz-folierung',
    icon: '📣',
    name: 'KFZ-Folierung',
    desc: 'Mach dein Fahrzeug zur rollenden Werbefläche und gewinne Aufmerksamkeit unterwegs.',
    img: '/leistungen/kfz-folierung.jpg',
  },
  {
    id: 'lichtwerbung',
    icon: '💡',
    name: 'Lichtwerbung',
    desc: 'Beleuchtete Schriftzüge, die deinen Betrieb auch im Dunkeln eindrucksvoll in Szene setzen.',
    img: '/leistungen/lichtwerbung.jpg',
  },
  {
    id: 'schilder',
    icon: '🪧',
    name: 'Schilder',
    desc: 'Stabile Schilder für Eingang, Gelände und Wegeleitung.',
    img: '/leistungen/schilder.jpg',
  },
  {
    id: 'objektbeschriftung',
    icon: '🏢',
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
