import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { formatDate } from "@/lib/date";
import { imageUrl } from "@/lib/images";
import type { ContentEntry, PostFrontmatter } from "@/types/content";

type PostCardProps = {
  post: ContentEntry<PostFrontmatter>;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid overflow-hidden rounded-lg border border-line bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={imageUrl(post.coverImage)}
          alt={post.coverAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <span className="inline-flex items-center gap-2">
            <CalendarDays size={15} />
            {formatDate(post.date)}
          </span>
          <span>{post.country}</span>
        </div>
        <h3 className="mt-3 font-serif text-2xl leading-tight text-foreground">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{post.excerpt}</p>
      </div>
    </Link>
  );
}
