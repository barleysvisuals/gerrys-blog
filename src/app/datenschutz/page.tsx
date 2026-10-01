import type { Metadata } from "next";
import { absoluteUrl, legalConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung für den Reiseblog Gerry unterwegs.",
  alternates: {
    canonical: absoluteUrl("/datenschutz")
  }
};

export default function DatenschutzPage() {
  return (
    <section className="container max-w-3xl py-12 md:py-16">
      <h1 className="font-serif text-5xl text-foreground">
        Datenschutzerklärung
      </h1>
      <div className="article-prose mt-8">
        <p>Stand: September 2026</p>

        <h2>1. Verantwortlicher</h2>
        <p>
          {legalConfig.name}
          <br />
          {legalConfig.street}
          <br />
          <strong className="text-orange">{legalConfig.city}</strong>
          <br />
          {legalConfig.country}
          <br />
          E-Mail:{" "}
          <a href={`mailto:${legalConfig.email}`}>{legalConfig.email}</a>
        </p>

        <h2>2. Allgemeines zur Datenverarbeitung</h2>
        <p>
          Dieser Reiseblog ist überwiegend als statische Website aufgebaut. Es
          gibt derzeit kein öffentliches Benutzerkonto, keine Kommentare, kein
          Kontaktformular und keinen Newsletter. Für einzelne Beiträge wird
          ausschließlich eine anonyme, zusammengefasste Aufrufzahl geführt.
          Personenbezogene Daten werden nur verarbeitet, soweit dies für die
          Bereitstellung und Sicherheit der Website oder zur Bearbeitung einer
          Kontaktaufnahme erforderlich ist.
        </p>

        <h2>3. Hosting und Server-Protokolle</h2>
        <p>
          Die Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina,
          CA 91723, USA, gehostet. Beim Aufruf der Website verarbeitet Vercel
          technisch erforderliche Verbindungs- und Nutzungsdaten. Dazu können
          insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene
          Seite, Referrer, Browsertyp, Betriebssystem sowie Fehler- und
          Diagnosedaten gehören.
        </p>
        <p>
          Die Verarbeitung erfolgt zur sicheren, stabilen und effizienten
          Bereitstellung der Website auf Grundlage von Art. 6 Abs. 1 lit. f
          DSGVO. Unser berechtigtes Interesse liegt im sicheren Betrieb dieses
          Online-Angebots. Vercel verarbeitet Daten als Dienstleister; bei einer
          Übermittlung in die USA stützt Vercel den Transfer unter anderem auf
          die Standardvertragsklauseln der Europäischen Kommission.
        </p>
        <p>
          Weitere Informationen enthält die{" "}
          <a
            href="https://vercel.com/legal/privacy-notice"
            rel="noreferrer"
            target="_blank"
          >
            Datenschutzerklärung von Vercel
          </a>
          .
        </p>

        <h2>4. Kontaktaufnahme per E-Mail</h2>
        <p>
          Wenn du per E-Mail Kontakt aufnimmst, verarbeiten wir die übermittelten
          Angaben zur Bearbeitung deiner Nachricht. Rechtsgrundlage ist Art. 6
          Abs. 1 lit. b DSGVO, soweit es um vorvertragliche oder vertragliche
          Anliegen geht, im Übrigen Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte
          Interesse besteht in der Beantwortung von Anfragen.
        </p>

        <h2>5. Cookies, Analyse und externe Inhalte</h2>
        <p>
          Diese Website setzt keine eigenen Analyse- oder Marketing-Cookies ein
          und verwendet keine Analyse-Dienste wie Google Analytics. Der
          Aufrufzähler verwendet weder Cookies noch lokale Besucherkennungen.
          Bilder werden lokal von der Website ausgeliefert. Es werden
          derzeit keine Karten, Videos, Social-Media-Widgets oder sonstigen
          externen Inhalte automatisch eingebettet.
        </p>

        <h2>6. Supabase</h2>
        <p>
          Für den anonymen Aufrufzähler wird Supabase als Datenbankdienst
          eingesetzt. Beim Öffnen eines Beitrags übermittelt der Server der
          Website lediglich dessen technische Kennung und erhöht die dazu
          gespeicherte Gesamtzahl. Es werden dafür keine Besucher-ID, kein
          Benutzerkonto und keine IP-Adresse des Besuchers in der
          Aufrufzähler-Tabelle gespeichert. Supabase kann beim technischen
          Betrieb eigene Server-Protokolle verarbeiten.
        </p>

        <h2>7. Speicherdauer</h2>
        <p>
          Personenbezogene Daten werden gelöscht, sobald der Zweck ihrer
          Verarbeitung entfällt und keine gesetzlichen Aufbewahrungspflichten
          entgegenstehen. Die Speicherdauer technischer Protokolldaten richtet
          sich ergänzend nach den Einstellungen und Vorgaben des Hostinganbieters.
          E-Mail-Anfragen werden gelöscht, wenn sie abschließend bearbeitet sind
          und keine gesetzlichen Pflichten oder berechtigten Interessen eine
          weitere Aufbewahrung erfordern.
        </p>

        <h2>8. Deine Rechte</h2>
        <p>Du hast nach Maßgabe der gesetzlichen Voraussetzungen das Recht auf:</p>
        <ul>
          <li>Auskunft über deine verarbeiteten personenbezogenen Daten,</li>
          <li>Berichtigung unrichtiger Daten,</li>
          <li>Löschung oder Einschränkung der Verarbeitung,</li>
          <li>Datenübertragbarkeit,</li>
          <li>
            Widerspruch gegen Verarbeitungen auf Grundlage berechtigter
            Interessen sowie
          </li>
          <li>Widerruf einer Einwilligung mit Wirkung für die Zukunft.</li>
        </ul>
        <p>
          Außerdem besteht das Recht, sich bei einer Datenschutzaufsichtsbehörde
          zu beschweren. Du kannst dich insbesondere an die Behörde deines
          gewöhnlichen Aufenthaltsorts, deines Arbeitsplatzes oder des Orts des
          mutmaßlichen Verstoßes wenden.
        </p>

        <h2>9. Verschlüsselung</h2>
        <p>
          Die Website wird über eine verschlüsselte HTTPS-Verbindung ausgeliefert.
          Dadurch werden übertragene Daten vor dem unbefugten Mitlesen während
          der Übertragung geschützt.
        </p>

        <h2>10. Änderungen dieser Datenschutzerklärung</h2>
        <p>
          Diese Datenschutzerklärung wird angepasst, wenn sich Funktionen,
          eingesetzte Dienste oder rechtliche Anforderungen ändern.
        </p>
      </div>
    </section>
  );
}
