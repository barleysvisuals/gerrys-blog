import type { Metadata } from "next";
import { FilterPanel } from "@/components/filter-panel";
import { getAllPosts } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Alle Reiseberichte sortiert nach Datum mit Suche und Filtern.",
  alternates: {
    canonical: absoluteUrl("/blog")
  }
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="container py-12 md:py-16">
      <div className="mb-10 max-w-3xl">
        <h1 className="font-serif text-5xl leading-tight text-foreground md:text-6xl">
          Blog
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Reiseberichte, Fotostrecken und Notizen. Die neuesten Beiträge stehen
          automatisch oben.
        </p>
      </div>
      <FilterPanel type="posts" items={posts} />
    </section>
  );
}
