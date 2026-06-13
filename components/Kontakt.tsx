'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { motion, type Variants } from 'framer-motion';
import { submitContact, type ContactState } from '@/app/actions';
import { leistungen } from '@/lib/content';
import { site } from '@/lib/site';

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

// Leistungen, für die ein Fahrzeug relevant ist → Fahrzeug-Feld einblenden.
const VEHICLE_LEISTUNGEN = new Set(['carwrapping', 'lackschutz', 'kfz-folierung']);
const initialState: ContactState = { status: 'idle' };

const fieldClass =
  'w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-paper placeholder:text-paper-dim/50 transition-colors focus:border-olive-bright focus:outline-none focus:ring-1 focus:ring-olive-bright';

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.512 5.26l-.999 3.648 3.976-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-olive px-8 py-3.5 font-medium text-[#f2f0e6] transition-colors hover:bg-olive-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive-bright disabled:opacity-60"
    >
      {pending ? 'Senden …' : 'Anfrage senden'}
      <span aria-hidden="true">→</span>
    </button>
  );
}

export function Kontakt() {
  const [state, formAction] = useFormState(submitContact, initialState);
  const [leistung, setLeistung] = useState('');
  const isVehicle = VEHICLE_LEISTUNGEN.has(leistung);
  const waNumber = site.phoneHref.replace(/\D/g, '');

  return (
    <section
      id="kontakt"
      aria-label="Kontakt"
      className="relative overflow-hidden bg-noir py-[clamp(5rem,11vh,9rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_55%_at_50%_0%,rgba(90,99,5,0.16),transparent_60%)]"
      />
      <div aria-hidden="true" className="hero-grain absolute inset-0" />

      <div className="relative mx-auto w-full max-w-2xl px-[clamp(1.25rem,5vw,3.5rem)]">
        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-4 text-center font-playfair text-[clamp(1.9rem,4vw,3rem)] font-medium text-paper"
        >
          Lass uns dein Projekt starten.
        </motion.h2>
        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mx-auto mt-4 max-w-md text-center text-[0.98rem] font-light text-paper-dim"
        >
          Kostenlose Begutachtung — wir melden uns zeitnah.
        </motion.p>

        {/* Quick-Contact-Buttons */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-9 flex flex-wrap justify-center gap-3"
        >
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2.5 rounded-full bg-olive px-5 py-3 text-[0.95rem] font-medium text-[#f2f0e6] transition-colors hover:bg-olive-bright"
          >
            <PhoneIcon className="h-[18px] w-[18px]" />
            Anrufen
          </a>
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-line px-5 py-3 text-[0.95rem] font-medium text-paper transition-colors hover:border-olive-bright hover:text-paper"
          >
            <WhatsAppIcon className="h-[18px] w-[18px] text-[#25D366]" />
            WhatsApp
          </a>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-line px-5 py-3 text-[0.95rem] font-medium text-paper transition-colors hover:border-olive-bright"
          >
            <InstagramIcon className="h-[18px] w-[18px] text-olive-bright" />
            Instagram
          </a>
        </motion.div>

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="my-9 flex items-center gap-4 text-[0.78rem] uppercase tracking-[0.18em] text-paper-dim"
        >
          <span className="h-px flex-1 bg-line" />
          oder schreib uns
          <span className="h-px flex-1 bg-line" />
        </motion.div>

        {/* Formular */}
        <motion.form
          action={formAction}
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-6"
        >
          {/* Honeypot (für Menschen unsichtbar) */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          {/* Leistung wählen */}
          <fieldset>
            <legend className="mb-3 text-[0.78rem] uppercase tracking-[0.16em] text-paper-dim">
              Welche Leistung?
            </legend>
            <input type="hidden" name="leistung" value={leistung} />
            <div className="flex flex-wrap gap-2.5">
              {leistungen.map((l) => {
                const active = leistung === l.id;
                return (
                  <button
                    key={l.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setLeistung(active ? '' : l.id)}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      active
                        ? 'border-olive bg-olive text-[#f2f0e6]'
                        : 'border-line text-paper-dim hover:border-olive-bright hover:text-paper'
                    }`}
                  >
                    {l.name}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Bedingtes Fahrzeug-Feld */}
          {isVehicle && (
            <div>
              <label htmlFor="vehicle" className="mb-2 block text-[0.78rem] uppercase tracking-[0.16em] text-paper-dim">
                Fahrzeug
              </label>
              <input
                id="vehicle"
                name="vehicle"
                type="text"
                placeholder="z. B. Audi RS3, BMW M4 …"
                className={fieldClass}
              />
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-[0.78rem] uppercase tracking-[0.16em] text-paper-dim">
                Name <span className="text-olive-bright">*</span>
              </label>
              <input id="name" name="name" type="text" required placeholder="Dein Name" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-[0.78rem] uppercase tracking-[0.16em] text-paper-dim">
                E-Mail <span className="text-olive-bright">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="name@beispiel.de"
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-[0.78rem] uppercase tracking-[0.16em] text-paper-dim">
              Handynummer <span className="text-paper-dim/60">(optional)</span>
            </label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="0176 …" className={fieldClass} />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-[0.78rem] uppercase tracking-[0.16em] text-paper-dim">
              Nachricht <span className="text-olive-bright">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Erzähl uns kurz von deinem Projekt …"
              className={`${fieldClass} resize-y`}
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SubmitButton />
            {state.status !== 'idle' && (
              <p
                role="status"
                className={`text-sm ${
                  state.status === 'success' ? 'text-olive-soft' : 'text-red-400'
                }`}
              >
                {state.message}
              </p>
            )}
          </div>

          <p className="text-[0.78rem] font-light leading-relaxed text-paper-dim">
            Mit dem Absenden stimmst du der Verarbeitung deiner Angaben zur
            Bearbeitung der Anfrage zu.{' '}
            <a href="/datenschutz" className="text-olive-bright underline-offset-2 hover:underline">
              Datenschutz
            </a>
            .
          </p>
        </motion.form>
      </div>
    </section>
  );
}
