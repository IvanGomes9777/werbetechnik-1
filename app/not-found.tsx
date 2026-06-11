import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-content flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] text-paper">
        Seite nicht gefunden
      </h1>
      <p className="mt-4 max-w-md text-paper-dim">
        Diese Seite gibt es nicht (mehr). Zurück ins Studio?
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full border border-gold px-6 py-3 text-sm uppercase tracking-eyebrow text-gold transition-colors hover:bg-gold hover:text-noir"
      >
        Zur Startseite
      </Link>
    </section>
  );
}
