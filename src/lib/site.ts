export const siteConfig = {
  name: "Gerry unterwegs",
  description:
    "Gerrys chronologisches Reisetagebuch über Singapur nach Neuseeland.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  author: "Gerry",
  navigation: [
    { href: "/", label: "Start" },
    { href: "/blog", label: "Reisetagebuch" },
    { href: "/reisen", label: "Route" },
    { href: "/ueber-mich", label: "Über mich" }
  ]
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
