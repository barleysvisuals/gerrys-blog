import type { Metadata } from "next";
import { FilterPanel } from "@/components/filter-panel";
import { getAllDestinations } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reisen",
  description: "Alle Reiseziele mit Suche und Filter nach Land und Tags.",
  alternates: {
    canonical: absoluteUrl("/reisen")
  }
};

export default function ReisenPage() {
  const destinations = getAllDestinations();

  return (
    <section className="container py-12 md:py-16">
      <div className="mb-10 max-w-3xl">
        <h1 className="font-serif text-5xl leading-tight text-foreground md:text-6xl">
          Reisen
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Reiseziele als gepflegte MDX-Dateien: mit Bild, Land, Tags, Infobox und
          verknüpften Blogbeiträgen.
        </p>
      </div>
      <FilterPanel type="destinations" items={destinations} />
    </section>
  );
}
