import type { Metadata } from 'next';
import { LegalLayout, LegalSection } from '@/components/LegalLayout';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum und Anbieterkennzeichnung von Muster Werbetechnik, Münster.',
  robots: { index: true, follow: false },
};

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      <LegalSection heading="Angaben gemäß § 5 DDG">
        <p>
          {site.name}
          <br />
          {/* BEISPIEL – ersetzen: Inhaber ergänzen */}
          Inhaber: {site.legal.owner}
          <br />
          {site.address.street}
          <br />
          {site.address.zip} {site.address.city}
        </p>
      </LegalSection>

      <LegalSection heading="Kontakt">
        <p>
          Telefon: {site.phone}
          <br />
          {/* BEISPIEL – ersetzen: E-Mail bestätigen */}
          E-Mail: {site.email}
        </p>
      </LegalSection>

      <LegalSection heading="Umsatzsteuer-ID">
        <p>
          {/* BEISPIEL – ersetzen: USt-IdNr. ergänzen */}
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG:
          <br />
          {site.legal.vatId}
        </p>
      </LegalSection>

      <LegalSection heading="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>
          {/* BEISPIEL – ersetzen */}
          {site.legal.owner}, Anschrift wie oben.
        </p>
      </LegalSection>

      <LegalSection heading="EU-Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{' '}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold underline"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . Wir sind nicht verpflichtet und nicht bereit, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </LegalSection>

      <LegalSection heading="Haftung für Inhalte">
        <p>
          Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach
          den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
          überwachen.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
