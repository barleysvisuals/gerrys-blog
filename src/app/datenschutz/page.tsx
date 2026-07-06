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
          Diese statische Beispielseite verwendet keine Datenbank, kein Login und
          keine serverseitige Benutzerverwaltung. Bitte prüfe vor dem Deployment,
          ob weitere Dienste wie Analytics, Karten, Newsletter oder CDN-Bilder
          eingebunden werden.
        </p>
        <h2>Server-Logs</h2>
        <p>
          Beim Hosting können technische Zugriffsdaten durch den Hostinganbieter
          verarbeitet werden. Ergänze hier die konkreten Informationen deines
          Hosters.
        </p>
        <h2>Bilder und externe Dienste</h2>
        <p>
          Lokale Bilder liegen unter `public/images`. Falls später Cloudinary oder
          Cloudflare R2 genutzt wird, sollten die entsprechenden Datenschutzangaben
          ergänzt werden.
        </p>
      </div>
    </section>
  );
}
