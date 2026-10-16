"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import type { JourneyLocation } from "@/lib/route-data";

type RoutePostPreview = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
};

type JourneyRouteMapProps = {
  locations: Array<JourneyLocation & { posts: RoutePostPreview[] }>;
  journeyPath: string[];
};

const mapBounds = {
  left: 166.4418,
  right: 178.5377,
  top: -34.3941,
  bottom: -47.2817,
  width: 410,
  height: 568
};

function project(lat: number, lng: number) {
  return {
    x:
      ((lng - mapBounds.left) / (mapBounds.right - mapBounds.left)) *
      mapBounds.width,
    y:
      ((mapBounds.top - lat) / (mapBounds.top - mapBounds.bottom)) *
      mapBounds.height
  };
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(`${date}T12:00:00`));
}

export function JourneyRouteMap({
  locations,
  journeyPath
}: JourneyRouteMapProps) {
  const [selectedId, setSelectedId] = useState(
    locations.at(-1)?.id || locations[0]?.id || ""
  );
  const selectedLocation =
    locations.find((location) => location.id === selectedId) || locations[0];
  const selectedPosts = [...(selectedLocation?.posts || [])].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  const routePoints = useMemo(
    () =>
      journeyPath
        .map((id) => locations.find((location) => location.id === id))
        .filter((location): location is (typeof locations)[number] => Boolean(location))
        .map((location) => project(location.lat, location.lng))
        .map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`)
        .join(" "),
    [journeyPath, locations]
  );

  if (!selectedLocation) {
    return null;
  }

  return (
    <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start">
      <div className="min-w-0">
        <div className="relative overflow-hidden rounded-lg border border-line bg-[#dcebea] shadow-sm dark:bg-[#172623]">
          <svg
            viewBox="0 250 280 318"
            role="img"
            aria-labelledby="route-map-title route-map-description"
            className="block aspect-[4/5] w-full"
          >
            <title id="route-map-title">Meine Reisestrecke auf der Südinsel</title>
            <desc id="route-map-description">
              Eine Karte mit den bisherigen Stationen Christchurch, Akaroa,
              Lyttelton, Adventure Park, Sheffield, Arthur&apos;s Pass und Hokitika.
            </desc>
            <image
              href="/maps/new-zealand-blank.svg"
              x="0"
              y="0"
              width="410"
              height="568"
              opacity="0.58"
              className="grayscale"
            />
            <polyline
              points={routePoints}
              fill="none"
              stroke="var(--petrol)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="5 4"
              vectorEffect="non-scaling-stroke"
              opacity="0.85"
            />
            {locations.map((location) => {
              const point = project(location.lat, location.lng);
              const selected = location.id === selectedId;

              return (
                <g
                  key={location.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${location.name} auf der Karte auswählen`}
                  aria-pressed={selected}
                  onClick={() => setSelectedId(location.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedId(location.id);
                    }
                  }}
                  className="cursor-pointer outline-none"
                >
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={selected ? 8 : 6}
                    fill="var(--surface)"
                    stroke="var(--petrol)"
                    strokeWidth={selected ? 3 : 2}
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={selected ? 3.4 : 2.5}
                    fill="var(--orange)"
                  />
                </g>
              );
            })}
          </svg>
          <div className="pointer-events-none absolute inset-x-4 bottom-4 flex justify-between text-xs text-foreground/75">
            <span className="rounded bg-background/85 px-2 py-1 backdrop-blur">
              Südinsel, Neuseeland
            </span>
            <span className="rounded bg-background/85 px-2 py-1 backdrop-blur">
              Strecke ungefähr
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2" aria-label="Stationen auswählen">
          {locations.map((location) => (
            <button
              key={location.id}
              type="button"
              onClick={() => setSelectedId(location.id)}
              className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petrol ${
                location.id === selectedId
                  ? "border-petrol bg-petrol text-white"
                  : "border-line bg-surface text-foreground hover:border-petrol hover:text-petrol"
              }`}
            >
              <MapPin size={15} aria-hidden="true" />
              {location.name}
            </button>
          ))}
        </div>
      </div>

      <section
        aria-live="polite"
        aria-label={`Beiträge zu ${selectedLocation.name}`}
        className="min-w-0 space-y-6"
      >
        {selectedPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-lg border border-line bg-surface p-5 shadow-sm md:p-6"
          >
              <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-surface-warm">
                <Image
                  src={post.coverImage}
                  alt={post.coverAlt}
                  fill
                  sizes="(min-width: 1024px) 390px, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 flex items-center gap-2 text-xs text-muted">
                <CalendarDays size={14} aria-hidden="true" />
                {formatDate(post.date)}
              </p>
              <h3 className="mt-2 font-serif text-2xl leading-tight text-foreground">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-petrol px-4 py-2.5 text-sm font-medium text-white transition hover:bg-petrol-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petrol"
              >
                Beitrag lesen
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
