import Link from "next/link";
import { ChevronDown, MapPinned } from "lucide-react";
import { formatDateRange } from "@/lib/date";
import type { ContentEntry, PostFrontmatter } from "@/types/content";

type JourneyRegion = {
  region: string;
  posts: ContentEntry<PostFrontmatter>[];
};

type JourneyRegionMenuProps = {
  regions: JourneyRegion[];
};

export function JourneyRegionMenu({ regions }: JourneyRegionMenuProps) {
  return (
    <aside className="sticky top-24 h-fit rounded-lg border border-line bg-surface/92 p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-3 border-b border-line pb-4">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-warm text-petrol">
          <MapPinned size={18} />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange">
            Route
          </p>
          <h2 className="font-serif text-2xl text-foreground">Nach Region</h2>
        </div>
      </div>

      <div className="grid gap-2">
        {regions.map((region, index) => (
          <details
            key={region.region}
            open={index === 0}
            className="group rounded-md border border-line bg-background px-3 py-2"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-foreground">
              <span>{region.region}</span>
              <span className="flex items-center gap-2 text-xs font-medium text-muted">
                {region.posts.length}
                <ChevronDown
                  size={16}
                  className="transition group-open:rotate-180"
                  aria-hidden="true"
                />
              </span>
            </summary>
            <ol className="mt-3 grid gap-2 border-t border-line pt-3">
              {region.posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`#${post.slug}`}
                    className="block rounded-md px-2 py-2 text-sm leading-5 text-muted transition hover:bg-surface-warm hover:text-petrol"
                  >
                    <span className="block font-medium text-foreground">{post.title}</span>
                    <span className="mt-1 block text-xs">
                      {post.region ? `${post.region} / ` : ""}
                      {formatDateRange(post.date, post.endDate)}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </details>
        ))}
      </div>
    </aside>
  );
}
