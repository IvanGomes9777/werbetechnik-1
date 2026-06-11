/** Einheitlicher Rahmen für die Rechtsseiten (Impressum, Datenschutz, AGB). */
export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="container-content max-w-3xl pb-24 pt-36">
      <p className="eyebrow">Rechtliches</p>
      <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] text-paper">{title}</h1>
      {updated ? (
        <p className="mt-3 text-sm text-paper-dim">Stand: {updated}</p>
      ) : null}
      <div className="legal-prose mt-10 space-y-8 text-[0.98rem] leading-relaxed text-paper-dim">
        {children}
      </div>
      <a
        href="/"
        className="mt-14 inline-flex items-center gap-2 text-sm uppercase tracking-eyebrow text-gold transition-colors hover:text-gold-soft"
      >
        <span aria-hidden="true">←</span> Zur Startseite
      </a>
    </article>
  );
}

/** Abschnitts-Heading für Rechtstexte. */
export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-xl text-paper">{heading}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
