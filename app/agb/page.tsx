import type { Metadata } from 'next';
import { LegalLayout, LegalSection } from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'AGB',
  description:
    'Allgemeine Geschäftsbedingungen von Muster Werbetechnik — Folierung, Verarbeitung, Haftung und Entfernbarkeit.',
  robots: { index: true, follow: false },
};

export default function AgbPage() {
  return (
    <LegalLayout title="Allgemeine Geschäftsbedingungen" updated="Juni 2026">
      {/* BEISPIEL – ersetzen: AGB rechtlich prüfen und an den Betrieb anpassen */}
      <p className="rounded-sm border border-line bg-anthracite p-4 text-sm">
        Hinweis: Diese AGB sind ein Entwurf/Platzhalter und sollten vor
        Veröffentlichung rechtlich geprüft und an den Betrieb angepasst werden.
      </p>

      <LegalSection heading="1. Geltungsbereich">
        <p>
          Diese Bedingungen gelten für alle Leistungen der Fahrzeugfolierung und
          Werbebeschriftung von Muster Werbetechnik gegenüber Verbrauchern und
          Unternehmern.
        </p>
      </LegalSection>

      <LegalSection heading="2. Angebot & Vertragsschluss">
        <p>
          Der Endpreis ergibt sich nach kostenloser Begutachtung und ist
          abhängig von Fahrzeug, Material und Aufwand. Ein Vertrag kommt mit
          Auftragsbestätigung bzw. Beginn der Arbeiten zustande.
        </p>
      </LegalSection>

      <LegalSection heading="3. Material- & Verarbeitungsgarantie">
        <p>
          Wir verarbeiten Premium-Folien namhafter Hersteller (z. B. 3M, Avery
          Dennison, KPMF, Hexis) fachgerecht. Es gelten die jeweiligen
          Herstellergarantien auf das Material. Auf unsere Verarbeitung
          gewähren wir Gewährleistung im gesetzlichen Rahmen.
        </p>
      </LegalSection>

      <LegalSection heading="4. Zustand des Fahrzeugs & bestehende Lackschäden">
        <p>
          Bei Annahme dokumentieren wir den Fahrzeug- und Lackzustand
          (Foto-Dokumentation). Für bereits vorhandene Lackschäden,
          Vorschäden, Roststellen oder nicht fachgerecht ausgeführte
          Vorlackierungen übernehmen wir keine Haftung. Auf nicht intaktem oder
          frisch lackiertem Lack kann die Haftung der Folie eingeschränkt sein.
        </p>
      </LegalSection>

      <LegalSection heading="5. Entfernbarkeit & Lackzustand">
        <p>
          Hochwertige Folien sind bei intaktem Originallack in der Regel
          rückstandslos entfernbar. Bei vorgeschädigtem, ausgebleichtem oder
          nicht werkseitigem Lack kann es beim Entfernen zu Beeinträchtigungen
          kommen; hierfür übernehmen wir keine Haftung.
        </p>
      </LegalSection>

      <LegalSection heading="6. Mitwirkungspflichten des Kunden">
        <p>
          Bei Farbwechsel-Folierungen ist die geänderte Fahrzeugfarbe in den
          Fahrzeugpapieren und bei der Versicherung zu aktualisieren. Bei
          Scheibentönungen sind die gesetzlichen Vorgaben (ABE/Gutachten, nur
          hintere Seiten- und Heckscheibe) einzuhalten. Custom-Designs dürfen
          keine fremden Marken- oder Urheberrechte verletzen.
        </p>
      </LegalSection>

      <LegalSection heading="7. Zahlung">
        <p>
          Sofern nicht anders vereinbart, ist die Vergütung nach Abnahme der
          Arbeiten fällig.
        </p>
      </LegalSection>

      <LegalSection heading="8. Haftung">
        <p>
          Wir haften unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie
          bei Verletzung von Leben, Körper und Gesundheit. Im Übrigen ist die
          Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
