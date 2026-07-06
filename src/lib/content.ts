import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  ContentEntry,
  DestinationFrontmatter,
  PostFrontmatter
} from "@/types/content";

const contentDirectory = path.join(process.cwd(), "content");

function readMdxDirectory<T>(directoryName: "posts" | "destinations") {
  const directory = path.join(contentDirectory, directoryName);
  const files = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  return files.map((file) => {
    const filePath = path.join(directory, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      ...(data as T),
      content
    } satisfies ContentEntry<T>;
  });
}

export function getAllPosts() {
  return readMdxDirectory<PostFrontmatter>("posts").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getJourneyPosts() {
  return readMdxDirectory<PostFrontmatter>("posts").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getJourneyRegions() {
  const posts = getJourneyPosts();
  const groupedPosts = new Map<string, ContentEntry<PostFrontmatter>[]>();

  posts.forEach((post) => {
    const region = post.region || post.country;
    groupedPosts.set(region, [...(groupedPosts.get(region) || []), post]);
  });

  return Array.from(groupedPosts.entries()).map(([region, regionPosts]) => ({
    region,
    posts: regionPosts
  }));
}

export function getFeaturedPosts(limit = 3) {
  return getAllPosts()
    .filter((post) => post.featured)
    .slice(0, limit);
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug: string) {
  const posts = getJourneyPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    previous: posts[index + 1],
    next: posts[index - 1]
  };
}

export function getRelatedPosts(post: ContentEntry<PostFrontmatter>, limit = 3) {
  return getAllPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .filter(
      (candidate) =>
        candidate.destinationSlug === post.destinationSlug ||
        candidate.tags.some((tag) => post.tags.includes(tag))
    )
    .slice(0, limit);
}

export function getAllDestinations() {
  return readMdxDirectory<DestinationFrontmatter>("destinations").sort((a, b) =>
    a.title.localeCompare(b.title, "de")
  );
}

export function getFeaturedDestinations(limit = 3) {
  return getAllDestinations()
    .filter((destination) => destination.featured)
    .slice(0, limit);
}

export function getDestinationBySlug(slug: string) {
  return getAllDestinations().find((destination) => destination.slug === slug);
}

export function getPostsByDestination(destinationSlug: string) {
  return getAllPosts().filter((post) => post.destinationSlug === destinationSlug);
}

export function getAllTags() {
  return Array.from(
    new Set([
      ...getAllPosts().flatMap((post) => post.tags),
      ...getAllDestinations().flatMap((destination) => destination.tags)
    ])
  ).sort((a, b) => a.localeCompare(b, "de"));
}

export function getAllCountries() {
  return Array.from(
    new Set([
      ...getAllPosts().map((post) => post.country),
      ...getAllDestinations().map((destination) => destination.country)
    ])
  ).sort((a, b) => a.localeCompare(b, "de"));
}
