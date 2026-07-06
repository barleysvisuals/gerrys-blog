import type { Metadata } from "next";
import { JourneyJournal } from "@/components/journey-journal";
import { getJourneyPosts, getJourneyRegions } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reisetagebuch",
  description: "Chronologisches Reisetagebuch über Singapur nach Neuseeland.",
  alternates: {
    canonical: absoluteUrl("/blog")
  }
};

export default function BlogPage() {
  const posts = getJourneyPosts();
  const regions = getJourneyRegions();

  return (
    <section className="container py-12 md:py-16">
      <div className="mb-10 max-w-3xl">
        <h1 className="font-serif text-5xl leading-tight text-foreground md:text-6xl">
          Reisetagebuch
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Die Reise in Etappen: Singapur als Auftakt, danach vor allem
          Neuseeland. Nach Reiseabschnitten einklappbar, im Hauptbereich
          chronologisch mit Ort, Zeitraum, Text und Bildern.
        </p>
      </div>
      <JourneyJournal posts={posts} regions={regions} />
    </section>
  );
}
