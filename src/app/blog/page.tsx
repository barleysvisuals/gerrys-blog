import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { JourneyJournal } from "@/components/journey-journal";
import { getJourneyPosts, getJourneyRegions } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reisetagebuch",
  description: "Chronologisches Reisetagebuch vom Abschied zuhause bis unterwegs.",
  alternates: {
    canonical: absoluteUrl("/blog")
  }
};

export default function BlogPage() {
  const posts = getJourneyPosts();
  const regions = getJourneyRegions();

  return (
    <section className="container py-12 md:py-16">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line bg-surface px-4 text-sm font-semibold text-petrol transition hover:border-petrol/35 hover:bg-surface-warm"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Zurück zur Übersicht
        </Link>
      </div>
      <div className="mb-10 max-w-3xl">
        <h1 className="font-serif text-5xl leading-tight text-foreground md:text-6xl">
          Reisetagebuch
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Die Reise in Etappen: vom Abschied zuhause bis zu allem, was unterwegs
          noch kommt. Nach Reiseabschnitten einklappbar, im Hauptbereich
          chronologisch mit Ort, Zeitraum, Text und Bildern.
        </p>
      </div>
      <JourneyJournal posts={posts} regions={regions} />
    </section>
  );
}
