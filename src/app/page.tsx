import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { DestinationCard } from "@/components/destination-card";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllPosts, getFeaturedDestinations, getFeaturedPosts } from "@/lib/content";
import { imageUrl } from "@/lib/images";

export default function HomePage() {
  const featuredDestinations = getFeaturedDestinations(3);
  const latestPosts = getFeaturedPosts(3);
  const galleryImages = getAllPosts().flatMap((post) => post.gallery || []).slice(0, 6);

  return (
    <>
      <section className="container grid min-h-[calc(78vh-72px)] items-center gap-10 py-12 md:grid-cols-[0.92fr_1.08fr] md:py-16">
        <div className="animate-in">
          <h1 className="font-serif text-5xl leading-[1.02] text-foreground md:text-7xl">
            Gerry unterwegs
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Ein persönlicher Reiseblog für Orte, die man nicht abhaken muss:
            Reiseberichte, ruhige Fotostrecken und praktische Notizen aus Europa
            und darüber hinaus.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/reisen">Alle Reisen</ButtonLink>
            <ButtonLink href="/blog" variant="secondary">
              Neueste Beiträge
            </ButtonLink>
          </div>
        </div>
        <div className="relative animate-in">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-2xl md:aspect-[16/11]">
            <Image
              src={imageUrl("/images/allgemein/hero.svg")}
              alt="Weite Reiselandschaft mit Bergen und Wasser als Hero-Bild"
              fill
              priority
              sizes="(min-width: 768px) 54vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-6 hidden max-w-xs rounded-lg border border-line bg-surface p-4 shadow-lg md:block">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-warm text-petrol">
                <MapPin size={18} />
              </span>
              <p className="text-sm leading-6 text-muted">
                Neue Reisen werden als MDX-Dateien gepflegt und automatisch in
                Listen, Sitemap und Detailseiten sichtbar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <SectionHeading
          title="Hervorgehobene Reisen"
          intro="Drei Beispielziele zeigen, wie Reiseübersichten später wachsen können."
          action={
            <Link
              href="/reisen"
              className="inline-flex items-center gap-2 text-sm font-semibold text-petrol"
            >
              Alle Reisen <ArrowRight size={16} />
            </Link>
          }
        />
        <div className="grid gap-6 md:grid-cols-3">
          {featuredDestinations.map((destination) => (
            <DestinationCard key={destination.slug} destination={destination} />
          ))}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container">
          <SectionHeading
            title="Neueste Beiträge"
            intro="Kurze und lange Reiseberichte mit Datum, Land, Tags und sauberer URL."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <SectionHeading
          title="Galerie-Vorschau"
          intro="Alle Galeriebilder besitzen Alt-Texte und können später leicht ausgetauscht werden."
          action={
            <span className="inline-flex items-center gap-2 text-sm text-muted">
              <Camera size={16} /> Beispielgalerie
            </span>
          }
        />
        <GalleryLightbox images={galleryImages} />
      </section>
    </>
  );
}
