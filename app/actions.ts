'use server';

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

/**
 * Anfrage-Formular: Server Action.
 * Validiert die Pflichtfelder und gibt eine Erfolgsmeldung zurück.
 * TODO: Mailversand anbinden (z.B. Resend) — aktuell nur Konsolen-Log.
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const leistung = String(formData.get('leistung') ?? '').trim();
  const vehicle = String(formData.get('vehicle') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();
  // Honeypot gegen Bots
  const trap = String(formData.get('company') ?? '').trim();

  if (trap) {
    return { status: 'success', message: 'Danke für deine Anfrage.' };
  }

  if (!name || !email || !message) {
    return {
      status: 'error',
      message: 'Bitte Name, E-Mail und Nachricht ausfüllen.',
    };
  }

  // Einfache E-Mail-Format-Prüfung (Rückkanal muss zustellbar sein).
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      status: 'error',
      message: 'Bitte eine gültige E-Mail-Adresse angeben.',
    };
  }

  // TODO: Mailversand anbinden (z.B. Resend). Vorerst Konsolen-Log.
  console.log('[Kontaktanfrage Muster Werbetechnik]', {
    name,
    email,
    leistung,
    vehicle,
    phone,
    message,
    receivedAt: new Date().toISOString(),
  });

  return {
    status: 'success',
    message:
      'Danke für deine Anfrage! Wir melden uns zeitnah für eine kostenlose Begutachtung.',
  };
}
