import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { imageUrl } from "@/lib/images";

type MarkdownContentProps = {
  content: string;
};

function getVideoType(src: string) {
  if (/\.mov(?:$|\?)/i.test(src)) {
    return "video/quicktime";
  }

  if (/\.webm(?:$|\?)/i.test(src)) {
    return "video/webm";
  }

  if (/\.mp4(?:$|\?)/i.test(src)) {
    return "video/mp4";
  }

  return null;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        img: ({ src, alt }) => {
          const imageSrc = typeof src === "string" ? src : "";
          const videoType = getVideoType(imageSrc);

          if (videoType) {
            return (
              <span className="my-8 block">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={alt || "Video aus dem Reisebeitrag"}
                  className="h-auto w-full rounded-lg bg-black shadow-sm"
                >
                  <source src={imageUrl(imageSrc)} type={videoType} />
                  Dein Browser kann dieses Video leider nicht abspielen.
                </video>
              </span>
            );
          }

          return (
            <Image
              src={imageUrl(imageSrc)}
              alt={alt || ""}
              width={1200}
              height={800}
              sizes="(min-width: 1024px) 760px, 100vw"
              className="rounded-lg"
            />
          );
        },
        a: ({ href, children }) => (
          <a href={href} target={href?.startsWith("http") ? "_blank" : undefined}>
            {children}
          </a>
        )
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
