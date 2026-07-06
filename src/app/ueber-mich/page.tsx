import type { Metadata } from "next";
import Image from "next/image";
import { absoluteUrl } from "@/lib/site";
import { imageUrl } from "@/lib/images";

export const metadata: Metadata = {
  title: "Über mich",
  description: "Persönliche Vorstellung von Gerry unterwegs.",
  alternates: {
    canonical: absoluteUrl("/ueber-mich")
  }
};

export default function AboutPage() {
  return (
    <section className="container grid gap-10 py-12 md:grid-cols-[0.85fr_1.15fr] md:py-16">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-lg">
        <Image
          src={imageUrl("/images/allgemein/about.svg")}
          alt="Portrait-Platzhalter für die persönliche Vorstellung"
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="self-center">
        <h1 className="font-serif text-5xl leading-tight text-foreground md:text-6xl">
          Über mich
        </h1>
        <div className="mt-6 max-w-2xl space-y-5 text-lg leading-8 text-muted">
          <p>
            Ich bin Gerry und sammle hier Reisegeschichten, Routen, kleine
            Entdeckungen und Bilder, die sonst viel zu schnell in irgendeinem
            Fotoarchiv verschwinden.
          </p>
          <p>
            Die Seite ist bewusst statisch aufgebaut: Texte liegen in MDX-Dateien,
            Bilder in `public/images`, und neue Inhalte können später durch eine
            Coding-KI oder direkt im Editor ergänzt werden.
          </p>
          <p>
            Kontaktangaben werden aus Datenschutzgründen nicht als Klartext-Mail
            veröffentlicht. Nutze hier später gern ein Kontaktformular eines
            separaten Dienstes oder eine bewusst maskierte Adresse.
          </p>
        </div>
      </div>
    </section>
  );
}
