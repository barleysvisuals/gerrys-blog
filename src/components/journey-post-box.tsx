import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { formatDateRange } from "@/lib/date";
import { imageUrl } from "@/lib/images";
import type { ContentEntry, PostFrontmatter } from "@/types/content";

type JourneyPostBoxProps = {
  post: ContentEntry<PostFrontmatter>;
  index: number;
};

export function JourneyPostBox({ post, index }: JourneyPostBoxProps) {
  const images = [
    { src: post.coverImage, alt: post.coverAlt, caption: "Titelbild" },
    ...(post.gallery || [])
  ].slice(0, 3);

  return (
    <article
      id={post.slug}
      className="scroll-mt-24 rounded-lg border border-line bg-surface p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-petrol/35 hover:shadow-md md:p-6"
    >
      <div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <span className="inline-flex items-center gap-2">
            <MapPin size={16} className="text-petrol" />
            {post.region ? `${post.region}, ` : ""}
            {post.country}
          </span>
          <span className="inline-flex items-center gap-2">
            <CalendarDays size={16} className="text-orange" />
            {formatDateRange(post.date, post.endDate)}
          </span>
        </div>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground md:text-4xl">
          {post.title}
        </h2>
      </div>

      <p className="mt-5 max-w-3xl text-base leading-8 text-muted">{post.excerpt}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
        <Link
          href={`/blog/${post.slug}`}
          className="group relative aspect-[16/10] overflow-hidden rounded-md bg-sand"
        >
          <Image
            src={imageUrl(images[0].src)}
            alt={images[0].alt}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 520px, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
          {images.slice(1, 3).map((image) => (
            <Link
              key={`${post.slug}-${image.src}`}
              href={`/blog/${post.slug}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-md bg-sand"
            >
              <Image
                src={imageUrl(image.src)}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 220px, 50vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end border-t border-line pt-5">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex min-h-10 items-center justify-center rounded-md bg-petrol px-4 text-sm font-semibold text-white transition hover:bg-petrol-dark"
        >
          Beitrag lesen
        </Link>
      </div>
    </article>
  );
}
