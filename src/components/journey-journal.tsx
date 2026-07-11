import { JourneyPostBox } from "@/components/journey-post-box";
import { JourneyRegionMenu } from "@/components/journey-region-menu";
import type { ContentEntry, PostFrontmatter } from "@/types/content";

type JourneyRegion = {
  region: string;
  posts: ContentEntry<PostFrontmatter>[];
};

type JourneyJournalProps = {
  posts: ContentEntry<PostFrontmatter>[];
  regions: JourneyRegion[];
};

export function JourneyJournal({ posts, regions }: JourneyJournalProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:items-start">
      <div>
        <JourneyRegionMenu regions={regions} />
      </div>
      <div className="grid gap-6">
        {posts.map((post, index) => (
          <JourneyPostBox key={post.slug} post={post} index={index} />
        ))}
      </div>
    </div>
  );
}
