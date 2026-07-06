import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  alternates: {
    canonical: absoluteUrl("/impressum")
  }
};

export default function ImpressumPage() {
  return (
    <section className="container max-w-3xl py-12 md:py-16">
      <h1 className="font-serif text-5xl text-foreground">Impressum</h1>
      <div className="article-prose mt-8">
        <p>
          Dies ist ein Platzhalter-Impressum. Bitte ersetze die Angaben vor der
          Veröffentlichung durch die rechtlich erforderlichen Informationen.
        </p>
        <h2>Angaben gemäß geltendem Recht</h2>
        <p>
          Name, Anschrift und weitere Pflichtangaben müssen hier durch die
          Betreiberin oder den Betreiber der Website ergänzt werden.
        </p>
        <h2>Kontakt</h2>
        <p>
          Vermeide eine öffentliche E-Mail-Adresse im Klartext, wenn du
          Spam-Schutz wünschst. Nutze stattdessen eine maskierte Schreibweise oder
          einen externen Kontaktkanal.
        </p>
      </div>
    </section>
  );
}
