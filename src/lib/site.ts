export const siteConfig = {
  name: "Gerry unterwegs",
  description:
    "Persönliche Reiseberichte, Fotogalerien und ruhige Reiseübersichten von unterwegs.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  author: "Gerry",
  navigation: [
    { href: "/", label: "Start" },
    { href: "/reisen", label: "Reisen" },
    { href: "/blog", label: "Blog" },
    { href: "/ueber-mich", label: "Über mich" }
  ]
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
