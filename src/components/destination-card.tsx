import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { imageUrl } from "@/lib/images";
import type { ContentEntry, DestinationFrontmatter } from "@/types/content";

type DestinationCardProps = {
  destination: ContentEntry<DestinationFrontmatter>;
};

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link
      href={`/reisen/${destination.slug}`}
      className="group block overflow-hidden rounded-lg border border-line bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl(destination.coverImage)}
          alt={destination.coverAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-sm text-petrol">
          <MapPin size={16} />
          <span>{destination.country}</span>
          {destination.region ? <span>/ {destination.region}</span> : null}
        </div>
        <h3 className="mt-3 font-serif text-2xl leading-tight text-foreground">
          {destination.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
          {destination.excerpt}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {destination.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface-warm px-3 py-1 text-xs text-petrol-dark"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
