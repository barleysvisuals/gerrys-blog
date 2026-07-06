import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, Compass, MapPinned } from "lucide-react";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { MarkdownContent } from "@/components/markdown-content";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import {
  getAllDestinations,
  getDestinationBySlug,
  getPostsByDestination
} from "@/lib/content";
import { imageUrl } from "@/lib/images";
import { absoluteUrl } from "@/lib/site";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllDestinations().map((destination) => ({
    slug: destination.slug
  }));
}

export async function generateMetadata({
  params
}: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    return {};
  }

  return {
    title: destination.title,
    description: destination.excerpt,
    alternates: {
      canonical: absoluteUrl(`/reisen/${destination.slug}`)
    },
    openGraph: {
      title: destination.title,
      description: destination.excerpt,
      type: "article",
      url: absoluteUrl(`/reisen/${destination.slug}`),
      images: [
        {
          url: destination.coverImage,
          width: 1600,
          height: 1000,
          alt: destination.coverAlt
        }
      ]
    }
  };
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  const posts = getPostsByDestination(destination.slug);
  const destinationJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.title,
    description: destination.excerpt,
    image: absoluteUrl(destination.coverImage),
    url: absoluteUrl(`/reisen/${destination.slug}`),
    touristType: destination.tags,
    address: {
      "@type": "PostalAddress",
      addressCountry: destination.country
    },
    geo: destination.coordinates
      ? {
          "@type": "GeoCoordinates",
          latitude: destination.coordinates.lat,
          longitude: destination.coordinates.lng
        }
      : undefined
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationJsonLd) }}
      />
      <article>
        <section className="relative min-h-[62vh] overflow-hidden bg-petrol-dark text-white">
          <Image
            src={imageUrl(destination.coverImage)}
            alt={destination.coverAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.72]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-petrol-dark via-petrol-dark/35 to-transparent" />
          <div className="container relative flex min-h-[62vh] items-end pb-12 pt-24">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sand">
                {destination.country}
                {destination.region ? ` / ${destination.region}` : ""}
              </p>
              <h1 className="mt-4 font-serif text-5xl leading-tight md:text-7xl">
                {destination.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/84">
                {destination.excerpt}
              </p>
            </div>
          </div>
        </section>

        <section className="container grid gap-10 py-14 lg:grid-cols-[1fr_320px]">
          <div className="article-prose max-w-3xl">
            <MarkdownContent content={destination.content} />
          </div>

          <aside className="h-fit rounded-lg border border-line bg-surface p-6 shadow-sm">
            <h2 className="font-serif text-2xl text-foreground">Reiseinfos</h2>
            <div className="mt-5 grid gap-4 text-sm text-muted">
              {destination.travelTime ? (
                <p className="flex gap-3">
                  <Compass className="mt-0.5 shrink-0 text-petrol" size={18} />
                  <span>
                    <strong className="block text-foreground">Beste Reisezeit</strong>
                    {destination.travelTime}
                  </span>
                </p>
              ) : null}
              {destination.duration ? (
                <p className="flex gap-3">
                  <Clock className="mt-0.5 shrink-0 text-petrol" size={18} />
                  <span>
                    <strong className="block text-foreground">Dauer</strong>
                    {destination.duration}
                  </span>
                </p>
              ) : null}
              {destination.coordinates ? (
                <p className="flex gap-3">
                  <MapPinned className="mt-0.5 shrink-0 text-petrol" size={18} />
                  <span>
                    <strong className="block text-foreground">Koordinaten</strong>
                    {destination.coordinates.lat}, {destination.coordinates.lng}
                  </span>
                </p>
              ) : null}
            </div>
            {destination.tips?.length ? (
              <div className="mt-6 border-t border-line pt-5">
                <p className="text-sm font-semibold text-foreground">Tipps</p>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted">
                  {destination.tips.map((tip) => (
                    <li key={tip}>- {tip}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </section>

        {destination.gallery?.length ? (
          <section className="container py-10">
            <SectionHeading title="Bildergalerie" intro="Beispielbilder aus diesem Reiseziel." />
            <GalleryLightbox images={destination.gallery} />
          </section>
        ) : null}

        <section className="container py-12">
          <SectionHeading
            title="Zugehörige Beiträge"
            intro={`Reiseberichte und Notizen zu ${destination.title}.`}
          />
          {posts.length ? (
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-muted">Zu diesem Ziel gibt es noch keine Beiträge.</p>
          )}
        </section>
      </article>
    </>
  );
}
