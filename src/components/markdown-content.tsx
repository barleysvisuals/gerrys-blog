import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { imageUrl } from "@/lib/images";

type MarkdownContentProps = {
  content: string;
};

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        img: ({ src, alt }) => {
          const imageSrc = typeof src === "string" ? src : "";

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
