import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { JourneyRouteMap } from "@/components/journey-route-map";
import { getAllPosts } from "@/lib/content";
import { journeyLocations, journeyPath } from "@/lib/route-data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Meine Reisestrecke",
  description:
    "Gerrys bisherige Reisestrecke durch Neuseeland mit allen Stationen und passenden Reiseberichten.",
  alternates: {
    canonical: absoluteUrl("/route")
  }
};

export default function RoutePage() {
  const allPosts = getAllPosts();
  const locations = journeyLocations.map((location) => ({
    ...location,
    posts: location.postSlugs.flatMap((slug) => {
      const post = allPosts.find((candidate) => candidate.slug === slug);

      return post
        ? [
            {
              slug: post.slug,
              title: post.title,
              date: post.date,
              excerpt: post.excerpt,
              coverImage: post.coverImage,
              coverAlt: post.coverAlt
            }
          ]
        : [];
    })
  }));

  return (
    <main className="container min-w-0 overflow-x-clip py-10 md:py-14">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line bg-surface px-4 text-sm font-semibold text-petrol transition hover:border-petrol/35 hover:bg-surface-warm"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Zurück zur Übersicht
        </Link>
      </div>
      <div className="mb-8 max-w-3xl md:mb-10">
        <h1 className="break-words font-serif text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl">
          Meine Reisestrecke
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Hier kannst du sehen, wo ich bisher in Neuseeland unterwegs war. Tippe
          auf eine Station, um die passenden Beiträge zu öffnen.
        </p>
      </div>

      <JourneyRouteMap locations={locations} journeyPath={journeyPath} />

      <p className="mt-5 text-xs leading-5 text-muted">
        Kartenbasis: gemeinfreie Neuseeland-Kartendaten von Wikimedia Commons.
        Die eingezeichnete Strecke zeigt den ungefähren Reiseverlauf.
      </p>
    </main>
  );
}
