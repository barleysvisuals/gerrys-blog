"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { DestinationCard } from "@/components/destination-card";
import { PostCard } from "@/components/post-card";
import type {
  ContentEntry,
  DestinationFrontmatter,
  PostFrontmatter
} from "@/types/content";

type SharedItem = {
  title: string;
  excerpt: string;
  country: string;
  tags: string[];
};

type DestinationFilterPanelProps = {
  type: "destinations";
  items: ContentEntry<DestinationFrontmatter>[];
};

type PostFilterPanelProps = {
  type: "posts";
  items: ContentEntry<PostFrontmatter>[];
};

type FilterPanelProps = DestinationFilterPanelProps | PostFilterPanelProps;

export function FilterPanel(props: FilterPanelProps) {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("Alle");
  const [tag, setTag] = useState("Alle");

  const countries = useMemo(
    () => ["Alle", ...Array.from(new Set(props.items.map((item) => item.country))).sort()],
    [props.items]
  );
  const tags = useMemo(
    () => [
      "Alle",
      ...Array.from(new Set(props.items.flatMap((item) => item.tags))).sort()
    ],
    [props.items]
  );

  const filteredItems = props.items.filter((item: SharedItem) => {
    const haystack = `${item.title} ${item.excerpt} ${item.country} ${item.tags.join(" ")}`;
    const matchesQuery = haystack.toLowerCase().includes(query.toLowerCase());
    const matchesCountry = country === "Alle" || item.country === country;
    const matchesTag = tag === "Alle" || item.tags.includes(tag);

    return matchesQuery && matchesCountry && matchesTag;
  });

  return (
    <div>
      <div className="mb-8 grid gap-3 rounded-lg border border-line bg-surface p-4 shadow-sm md:grid-cols-[1fr_220px_220px]">
        <label className="relative block">
          <span className="sr-only">Suchen</span>
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={props.type === "posts" ? "Beiträge suchen" : "Reisen suchen"}
            className="h-12 w-full rounded-md border border-line bg-background pl-10 pr-3 text-sm outline-none transition focus:border-petrol"
          />
        </label>
        <label>
          <span className="sr-only">Land filtern</span>
          <select
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className="h-12 w-full rounded-md border border-line bg-background px-3 text-sm outline-none transition focus:border-petrol"
          >
            {countries.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Tag filtern</span>
          <select
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            className="h-12 w-full rounded-md border border-line bg-background px-3 text-sm outline-none transition focus:border-petrol"
          >
            {tags.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      {filteredItems.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {props.type === "destinations"
            ? filteredItems.map((item) => (
                <DestinationCard
                  key={item.slug}
                  destination={item as ContentEntry<DestinationFrontmatter>}
                />
              ))
            : filteredItems.map((item) => (
                <PostCard key={item.slug} post={item as ContentEntry<PostFrontmatter>} />
              ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-line bg-surface p-10 text-center text-muted">
          Keine passenden Inhalte gefunden.
        </div>
      )}
    </div>
  );
}
