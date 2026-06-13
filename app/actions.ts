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
  const leistung = String(formData.get('leistung') ?? '').trim();
  const vehicle = String(formData.get('vehicle') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();
  // Honeypot gegen Bots
  const trap = String(formData.get('company') ?? '').trim();

  if (trap) {
    return { status: 'success', message: 'Danke für deine Anfrage.' };
  }

  if (!name || !message) {
    return {
      status: 'error',
      message: 'Bitte Name und Nachricht ausfüllen.',
    };
  }

  // TODO: Mailversand anbinden (z.B. Resend). Vorerst Konsolen-Log.
  console.log('[Kontaktanfrage GV Werbetechnik]', {
    name,
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
