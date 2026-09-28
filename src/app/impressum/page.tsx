import type { Metadata } from "next";
import { absoluteUrl, legalConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung von Gerry unterwegs.",
  alternates: {
    canonical: absoluteUrl("/impressum")
  }
};

function Address() {
  return (
    <address className="not-italic">
      {legalConfig.name}
      <br />
      {legalConfig.street}
      <br />
      <strong className="text-orange">{legalConfig.city}</strong>
      <br />
      {legalConfig.country}
    </address>
  );
}
export default function ImpressumPage() {
  return (
    <section className="container max-w-3xl py-12 md:py-16">
      <h1 className="font-serif text-5xl text-foreground">Impressum</h1>
      <div className="article-prose mt-8">
        <h2>Angaben gemäß § 5 DDG</h2>
        <Address />

        <h2>Kontakt</h2>
        <p>
          E-Mail:{" "}
          <a href={`mailto:${legalConfig.email}`}>{legalConfig.email}</a>
        </p>

        <h2>Verantwortlich für den Inhalt</h2>
        <p>Verantwortlich gemäß § 18 Abs. 2 MStV:</p>
        <Address />

        <h2>Haftung für Inhalte und Links</h2>
        <p>
          Die Inhalte dieses Blogs wurden mit Sorgfalt erstellt. Für externe
          Inhalte, auf die über Links verwiesen wird, sind die jeweiligen
          Anbieter verantwortlich. Rechtswidrige Inhalte werden nach
          Bekanntwerden entfernt.
        </p>

        <h2>Urheberrecht</h2>
        <p>
          Die auf dieser Website veröffentlichten Texte und Bilder unterliegen
          dem Urheberrecht. Jede darüber hinausgehende Verwendung bedarf der
          vorherigen Zustimmung der jeweiligen Rechteinhaber, soweit sie nicht
          gesetzlich erlaubt ist.
        </p>
      </div>
    </section>
  );
}
