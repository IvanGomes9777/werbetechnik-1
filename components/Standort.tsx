'use client';

import { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { site } from '@/lib/site';
import { readConsent, writeConsent, CONSENT_EVENT, DEFAULT_CONSENT } from '@/lib/consent';

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

// Öffnungszeiten (spiegelt site.openingHours): Mo–Fr 08:00–17:00, Sa/So zu.
// Schlüssel = JS-Wochentag (0 = Sonntag … 6 = Samstag). Zeiten in Minuten.
const OPEN_FROM = 8 * 60; // 08:00
const OPEN_TO = 17 * 60; // 17:00
const HOURS: Record<number, { label: string; open: boolean }> = {
  1: { label: 'Montag', open: true },
  2: { label: 'Dienstag', open: true },
  3: { label: 'Mittwoch', open: true },
  4: { label: 'Donnerstag', open: true },
  5: { label: 'Freitag', open: true },
  6: { label: 'Samstag', open: false },
  0: { label: 'Sonntag', open: false },
};
const ORDER = [1, 2, 3, 4, 5, 6, 0];

// Aktuelle Zeit in Europe/Berlin (unabhängig von der Geräte-Zeitzone).
function berlinNow() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Berlin',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const wd = parts.find((p) => p.type === 'weekday')?.value ?? 'Sun';
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0');
  const min = Number(parts.find((p) => p.type === 'minute')?.value ?? '0');
  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { day: map[wd] ?? 0, minutes: hour * 60 + min };
}

const fullAddress = `${site.address.street}, ${site.address.zip} ${site.address.city}`;
const mapQuery = `${site.name} ${fullAddress}`;
const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=15&output=embed`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;

export function Standort() {
  const [now, setNow] = useState<{ day: number; minutes: number } | null>(null);
  const [mapsAllowed, setMapsAllowed] = useState(false);

  // Live-Status (Europe/Berlin), jede Minute aktualisiert.
  useEffect(() => {
    const tick = () => setNow(berlinNow());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  // Consent für Google Maps (Privacy by default).
  useEffect(() => {
    const sync = () => setMapsAllowed(!!readConsent()?.maps);
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  const grantMaps = () => {
    const cur = readConsent() ?? DEFAULT_CONSENT;
    writeConsent({ ...cur, maps: true });
    setMapsAllowed(true);
  };

  const isOpenNow =
    now != null && HOURS[now.day].open && now.minutes >= OPEN_FROM && now.minutes < OPEN_TO;

  return (
    <section
      id="standort"
      aria-label="Standort & Öffnungszeiten"
      className="relative overflow-hidden bg-noir py-[clamp(5rem,11vh,9rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_55%_at_50%_0%,rgba(90,99,5,0.14),transparent_60%)]"
      />
      <div aria-hidden="true" className="hero-grain absolute inset-0" />

      <div className="relative wrap">
        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="eyebrow"
        >
          Standort
        </motion.p>
        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-4 max-w-2xl font-playfair text-[clamp(1.9rem,4vw,3rem)] font-medium text-paper"
        >
          Besuch uns im Studio.
        </motion.h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-stretch">
          {/* Karte (DSGVO-Consent) */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative min-h-[320px] overflow-hidden rounded-2xl border border-line lg:min-h-[460px]"
          >
            {mapsAllowed ? (
              <iframe
                title={`Karte: ${site.name}, ${fullAddress}`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
                style={{ border: 0, filter: 'grayscale(0.4) contrast(1.05)' }}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[linear-gradient(160deg,#15170f,#0e0f0b)] px-6 text-center">
                <p className="max-w-sm text-sm font-light leading-relaxed text-paper-dim">
                  Die Google-Karte wird erst nach deiner Zustimmung geladen
                  (Datenschutz). Dabei werden Daten an Google übertragen.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={grantMaps}
                    className="rounded-full bg-olive px-5 py-2.5 text-sm font-medium text-[#f2f0e6] transition-colors hover:bg-olive-bright"
                  >
                    Karte laden
                  </button>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-line px-5 py-2.5 text-sm text-paper-dim transition-colors hover:border-olive-bright hover:text-paper"
                  >
                    Route planen
                  </a>
                </div>
              </div>
            )}
          </motion.div>

          {/* Infos + Öffnungszeiten */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p className="font-playfair text-2xl text-paper">{site.name}</p>

            <address className="mt-4 space-y-1 not-italic text-[1.0625rem] font-light text-paper-dim">
              <p>{site.address.street}</p>
              <p>
                {site.address.zip} {site.address.city}
              </p>
            </address>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem]">
              <a href={site.phoneHref} className="text-olive-bright transition-colors hover:text-olive-soft">
                {site.phone}
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-paper-dim transition-colors hover:text-paper"
              >
                Route planen <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Öffnungszeiten + Live-Status */}
            <div className="mt-8 border-t border-line pt-6">
              <div className="flex items-center gap-3">
                <h3 className="text-[0.78rem] uppercase tracking-[0.16em] text-paper-dim">
                  Öffnungszeiten
                </h3>
                {now && (
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.72rem] font-medium ${
                      isOpenNow
                        ? 'bg-olive/20 text-olive-soft'
                        : 'bg-white/[0.06] text-paper-dim'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full ${
                        isOpenNow ? 'bg-olive-bright' : 'bg-paper-dim'
                      }`}
                    />
                    {isOpenNow ? 'Jetzt geöffnet' : 'Geschlossen'}
                  </span>
                )}
              </div>

              <ul className="mt-4 space-y-2 text-[0.95rem]">
                {ORDER.map((d) => {
                  const h = HOURS[d];
                  const today = now?.day === d;
                  return (
                    <li
                      key={d}
                      className={`flex justify-between gap-4 ${
                        today ? 'text-paper' : 'text-paper-dim'
                      }`}
                    >
                      <span className={today ? 'font-medium' : 'font-light'}>
                        {h.label}
                        {today && <span className="ml-2 text-olive-bright">· heute</span>}
                      </span>
                      <span className="font-light tabular-nums">
                        {h.open ? '08:00 – 17:00' : 'geschlossen'}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-[0.8rem] font-light text-paper-dim/80">
                Zeiten in deutscher Zeit (Europe/Berlin).
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
