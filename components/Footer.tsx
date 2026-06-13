import { site, navLinks } from '@/lib/site';

const legalLinks = [
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutz', href: '/datenschutz' },
  { label: 'AGB', href: '/agb' },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const headingClass =
  'text-[0.78rem] uppercase tracking-[0.16em] text-olive-bright';
const linkClass =
  'text-sm font-light text-paper-dim transition-colors hover:text-paper';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-noir">
      <div className="wrap py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marke */}
          <div>
            <p className="font-playfair text-2xl text-paper">{site.name}</p>
            <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-paper-dim">
              {site.tagline}
            </p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-paper-dim transition-colors hover:text-paper"
            >
              <InstagramIcon className="h-[18px] w-[18px] text-olive-bright" />
              {site.instagram.handle}
            </a>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer-Navigation">
            <h3 className={headingClass}>Navigation</h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkClass}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontakt */}
          <div>
            <h3 className={headingClass}>Kontakt</h3>
            <address className="mt-4 space-y-2.5 not-italic text-sm font-light text-paper-dim">
              <p>
                {site.address.street}
                <br />
                {site.address.zip} {site.address.city}
              </p>
              <p>
                <a href={site.phoneHref} className="transition-colors hover:text-paper">
                  {site.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-paper"
                >
                  {site.email}
                </a>
              </p>
              <p className="text-paper-dim/80">{site.openingHours}</p>
            </address>
          </div>

          {/* Rechtliches */}
          <div>
            <h3 className={headingClass}>Rechtliches</h3>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkClass}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-paper-dim sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} {site.name}. Alle Rechte vorbehalten.</span>
          <span>Fahrzeugfolierung &amp; Werbetechnik · {site.address.city}</span>
        </div>
      </div>
    </footer>
  );
}
