const remoteImageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export function imageUrl(src: string) {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  if (remoteImageBaseUrl) {
    return `${remoteImageBaseUrl.replace(/\/$/, "")}/${src.replace(/^\//, "")}`;
  }

  return src;
}
