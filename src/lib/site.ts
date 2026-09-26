function ensureProtocol(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function isPlaceholderUrl(url?: string) {
  if (!url) {
    return true;
  }

  try {
    const hostname = new URL(ensureProtocol(url)).hostname.replace(/^www\./, "");
    return hostname === "example.com" || hostname === "example.de";
  } catch {
    return true;
  }
}

function resolveSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  const resolvedUrl =
    !isPlaceholderUrl(configuredUrl) && configuredUrl
      ? configuredUrl
      : vercelUrl || "http://localhost:3000";

  return ensureProtocol(resolvedUrl).replace(/\/+$/, "");
}

export const siteConfig = {
  name: "Gerry unterwegs",
  description:
    "Gerrys Reisetagebuch als Erinnerung für sich selbst, Freunde und Verwandte.",
  url: resolveSiteUrl(),
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
