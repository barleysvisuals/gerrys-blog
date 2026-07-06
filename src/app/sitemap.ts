import type { MetadataRoute } from "next";
import { getAllDestinations, getAllPosts } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/reisen", "/blog", "/ueber-mich", "/impressum", "/datenschutz"];
  const postRoutes = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date)
  }));
  const destinationRoutes = getAllDestinations().map((destination) => ({
    url: `${siteConfig.url}/reisen/${destination.slug}`,
    lastModified: new Date()
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date()
    })),
    ...postRoutes,
    ...destinationRoutes
  ];
}
