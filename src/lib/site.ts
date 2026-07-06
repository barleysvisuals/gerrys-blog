export const siteConfig = {
  name: "Gerry unterwegs",
  description:
    "Gerrys Reisetagebuch als Erinnerung für sich selbst, Freunde und Verwandte.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  author: "Gerry",
  navigation: [
    { href: "/", label: "Start" },
    { href: "/blog", label: "Reisetagebuch" },
    { href: "/reisen", label: "Route" }
  ]
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
