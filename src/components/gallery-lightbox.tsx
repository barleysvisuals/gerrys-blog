"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";
import { imageUrl } from "@/lib/images";
import type { GalleryImage } from "@/types/content";

type GalleryLightboxProps = {
  images: GalleryImage[];
};

export function GalleryLightbox({ images }: GalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];

  if (!images.length) {
    return null;
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${image.alt}`}
            type="button"
            className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-sand text-left shadow-sm"
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={imageUrl(image.src)}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            {image.caption ? (
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm text-white">
                {image.caption}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {activeImage ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/82 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Bildansicht"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-petrol-dark"
            aria-label="Lightbox schließen"
            onClick={() => setActiveIndex(null)}
          >
            <X size={20} />
          </button>
          <figure
            className="grid max-h-[88vh] max-w-5xl gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-[70vh] w-[min(92vw,980px)]">
              <Image
                src={imageUrl(activeImage.src)}
                alt={activeImage.alt}
                fill
                sizes="92vw"
                className="object-contain"
                priority
              />
            </div>
            {activeImage.caption ? (
              <figcaption className="text-center text-sm text-white/85">
                {activeImage.caption}
              </figcaption>
            ) : null}
          </figure>
        </div>
      ) : null}
    </>
  );
}
