import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  alternates: {
    canonical: absoluteUrl("/datenschutz")
  }
};

export default function DatenschutzPage() {
  return (
    <section className="container max-w-3xl py-12 md:py-16">
      <h1 className="font-serif text-5xl text-foreground">Datenschutz</h1>
      <div className="article-prose mt-8">
        <p>
          Dieser private Reiseblog ist als statische Website gebaut. Es gibt kein
          Login, keine Kommentare, keinen Newsletter, kein Kontaktformular, keine
          Datenbank und kein eigenes Tracking.
        </p>
        <h2>Server-Logs</h2>
        <p>
          Beim Aufruf der Website können durch den Hostinganbieter Vercel
          technische Zugriffsdaten verarbeitet werden, zum Beispiel IP-Adresse,
          Zeitpunkt des Aufrufs, angeforderte Seite, Browser-Informationen und
          Server-Logdaten. Diese Verarbeitung dient dem sicheren und stabilen
          Betrieb der Website.
        </p>
        <h2>Cookies und Tracking</h2>
        <p>
          Diese Website setzt selbst keine Tracking-Cookies und nutzt keine
          Analyse-Tools wie Google Analytics. Bilder werden aktuell lokal aus dem
          Projekt geladen.
        </p>
        <h2>Externe Dienste</h2>
        <p>
          Die Website wird über Vercel gehostet. Falls später weitere Dienste wie
          Karten, eingebettete Inhalte, externe Bildspeicher oder Analyse-Tools
          hinzukommen, sollte diese Datenschutzerklärung entsprechend ergänzt
          werden.
        </p>
        <h2>Kontakt</h2>
        <p>
          Da der Blog vor allem für eigene Erinnerungen sowie Freunde und
          Verwandte gedacht ist, gibt es aktuell keine öffentliche
          Kontaktfunktion auf der Website.
        </p>
      </div>
    </section>
  );
}
