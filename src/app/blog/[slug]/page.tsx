import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { MarkdownContent } from "@/components/markdown-content";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import {
  getAdjacentPosts,
  getAllPosts,
  getDestinationBySlug,
  getPostBySlug,
  getRelatedPosts
} from "@/lib/content";
import { formatDateRange } from "@/lib/date";
import { imageUrl } from "@/lib/images";
import { absoluteUrl, siteConfig } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: absoluteUrl(`/blog/${post.slug}`)
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: absoluteUrl(`/blog/${post.slug}`),
      images: [
        {
          url: post.coverImage,
          width: 1600,
          height: 1000,
          alt: post.coverAlt
        }
      ]
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const destination = getDestinationBySlug(post.destinationSlug);
  const relatedPosts = getRelatedPosts(post);
  const { previous, next } = getAdjacentPosts(post.slug);
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.coverImage),
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: siteConfig.author
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    keywords: post.tags.join(", ")
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <article>
        <header className="container max-w-4xl py-12 text-center md:py-16">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={15} />
              {formatDateRange(post.date, post.endDate)}
            </span>
            <span>{post.country}</span>
            {destination ? (
              <Link href={`/reisen/${destination.slug}`} className="text-petrol">
                {destination.title}
              </Link>
            ) : null}
          </div>
          <h1 className="mt-5 font-serif text-5xl leading-tight text-foreground md:text-7xl">
            {post.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
            {post.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-warm px-3 py-1 text-xs text-petrol-dark"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="container">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-lg">
            <Image
              src={imageUrl(post.coverImage)}
              alt={post.coverAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        <section className="container max-w-3xl py-12">
          <div className="article-prose">
            <MarkdownContent content={post.content} />
          </div>
        </section>

        {post.gallery?.length ? (
          <section className="container py-10">
            <SectionHeading title="Bildergalerie" intro="Weitere Eindrücke aus diesem Beitrag." />
            <GalleryLightbox images={post.gallery} />
          </section>
        ) : null}

        <nav className="container grid gap-4 border-y border-line py-8 md:grid-cols-2" aria-label="Beitragsnavigation">
          {previous ? (
            <Link href={`/blog/${previous.slug}`} className="rounded-lg bg-surface p-5 transition hover:bg-surface-warm">
              <span className="inline-flex items-center gap-2 text-sm text-muted">
                <ArrowLeft size={16} /> Vorheriger Beitrag
              </span>
              <strong className="mt-2 block font-serif text-xl text-foreground">{previous.title}</strong>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/blog/${next.slug}`} className="rounded-lg bg-surface p-5 text-right transition hover:bg-surface-warm">
              <span className="inline-flex items-center gap-2 text-sm text-muted">
                Nächster Beitrag <ArrowRight size={16} />
              </span>
              <strong className="mt-2 block font-serif text-xl text-foreground">{next.title}</strong>
            </Link>
          ) : null}
        </nav>

        {relatedPosts.length ? (
          <section className="container py-12">
            <SectionHeading title="Verwandte Beiträge" intro="Mehr aus derselben Gegend oder mit ähnlichen Tags." />
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </>
  );
}
