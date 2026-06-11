import type { Metadata } from 'next';
import { LegalLayout, LegalSection } from '@/components/LegalLayout';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Datenschutz',
  description:
    'Datenschutzerklärung von GV Werbetechnik gemäß DSGVO — inkl. Hinweise zu Foto-Uploads und Galeriebildern.',
  robots: { index: true, follow: false },
};

export default function DatenschutzPage() {
  return (
    <LegalLayout title="Datenschutzerklärung" updated="Juni 2026">
      <LegalSection heading="1. Verantwortlicher">
        <p>
          {site.name}, {site.address.street}, {site.address.zip}{' '}
          {site.address.city}
          <br />
          Telefon: {site.phone} · E-Mail: {site.email}
          {/* BEISPIEL – ersetzen: Kontaktdaten bestätigen */}
        </p>
      </LegalSection>

      <LegalSection heading="2. Allgemeines zur Datenverarbeitung">
        <p>
          Wir verarbeiten personenbezogene Daten nur, soweit dies zur
          Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte
          und Leistungen erforderlich ist. Rechtsgrundlagen sind insbesondere
          Art. 6 Abs. 1 lit. a, b und f DSGVO.
        </p>
      </LegalSection>

      <LegalSection heading="3. Kontakt- und Anfrageformular">
        <p>
          Wenn du uns über das Formular oder per E-Mail kontaktierst, verarbeiten
          wir die von dir angegebenen Daten (Name, Fahrzeug, Finish-/Umfangswunsch,
          Nachricht) ausschließlich zur Bearbeitung deiner Anfrage
          (Art. 6 Abs. 1 lit. b und f DSGVO). Die Daten werden gelöscht, sobald
          sie für den Zweck nicht mehr erforderlich sind und keine gesetzlichen
          Aufbewahrungspflichten entgegenstehen.
        </p>
      </LegalSection>

      <LegalSection heading="4. Foto-Uploads zu deinem Fahrzeug">
        <p>
          Sendest du uns Fotos deines Fahrzeugs (z. B. zur Vorab-Einschätzung),
          verarbeiten wir diese nur zur Beratung und Angebotserstellung. Die
          Fotos werden nach Abschluss bzw. nach Wegfall des Zwecks gelöscht,
          sofern du keiner weiteren Verwendung zugestimmt hast.
        </p>
      </LegalSection>

      <LegalSection heading="5. Galerie- und Referenzbilder">
        <p>
          Auf unseren Fahrzeugfotos in der Galerie machen wir Kennzeichen
          unkenntlich. Eine darüber hinausgehende Veröffentlichung von Aufnahmen
          deines Fahrzeugs erfolgt nur mit deiner ausdrücklichen Einwilligung,
          die du jederzeit mit Wirkung für die Zukunft widerrufen kannst.
        </p>
      </LegalSection>

      <LegalSection heading="6. Server-Logfiles">
        <p>
          Beim Aufruf der Website werden durch den Hosting-Provider automatisch
          Informationen (z. B. IP-Adresse, Datum/Uhrzeit, abgerufene Seite) in
          Server-Logfiles erfasst. Dies ist zur Sicherstellung eines
          störungsfreien Betriebs erforderlich (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </LegalSection>

      <LegalSection heading="7. Externe Dienste (nur mit Einwilligung)">
        <p>
          Externe Inhalte laden wir nur, wenn du im Cookie-Banner zugestimmt
          hast (Privacy by default):
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong className="text-paper">Google Maps</strong> (Google Ireland
            Ltd.) — zur Anzeige unseres Standorts. Dabei können Daten an Google,
            ggf. in die USA, übertragen werden.
          </li>
          <li>
            <strong className="text-paper">Instagram</strong> (Meta Platforms
            Ireland Ltd.) — beim Aufruf verlinkter Inhalte.
          </li>
          <li>
            <strong className="text-paper">Statistik</strong> — nur bei
            Zustimmung; aktuell als Platzhalter vorgesehen.
            {/* TODO: Analytics-Anbieter konkretisieren, falls eingesetzt */}
          </li>
        </ul>
        <p>
          Deine Einwilligung kannst du jederzeit über die „Cookie-Einstellungen“
          im Footer widerrufen.
        </p>
      </LegalSection>

      <LegalSection heading="8. Deine Rechte">
        <p>
          Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung
          der Verarbeitung, Datenübertragbarkeit sowie Widerspruch. Außerdem
          steht dir ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde
          zu.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
