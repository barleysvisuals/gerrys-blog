import Image from "next/image";
import { JourneyJournal } from "@/components/journey-journal";
import { getJourneyPosts, getJourneyRegions } from "@/lib/content";
import { imageUrl } from "@/lib/images";

export default function HomePage() {
  const posts = getJourneyPosts();
  const regions = getJourneyRegions();

  return (
    <>
      <section className="container grid gap-8 py-8 md:grid-cols-[0.95fr_1.05fr] md:py-10">
        <div className="self-center">
          <h1 className="font-serif text-5xl leading-[1.02] text-foreground md:text-6xl">
            Mein Reisetagebuch nach dem Abi.
          </h1>
          <div className="mt-6 max-w-xl space-y-4 text-lg leading-8 text-muted">
            <p>Bilder. Gedanken. Kleine Geschichten.</p>
            <div>
              <p>Für zuhause.</p>
              <p>Für später.</p>
              <p>Für mich.</p>
            </div>
          </div>
          <div className="mt-6 grid max-w-md grid-cols-3 gap-3 rounded-lg border border-line bg-surface p-3 text-center shadow-sm">
            <div>
              <p className="font-serif text-3xl text-petrol">{posts.length}</p>
              <p className="mt-1 text-xs text-muted">Beiträge</p>
            </div>
            <div className="border-x border-line">
              <p className="font-serif text-3xl text-petrol">{regions.length}</p>
              <p className="mt-1 text-xs text-muted">Regionen</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-petrol">∞</p>
              <p className="mt-1 text-xs text-muted">Bock auf mehr</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-line bg-surface shadow-xl">
            <Image
              src={imageUrl("/images/neuseeland/suedinsel-cover.svg")}
              alt="Illustrative Berg- und Seenlandschaft als Auftakt zur Neuseelandreise"
              fill
              priority
              sizes="(min-width: 768px) 52vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f5efe4] py-10 md:py-12">
        <div className="container">
          <div className="mb-8 max-w-3xl">
            <h2 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
              Reisetagebuch
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Links findest du die Route über Singapur, Nordinsel und Südinsel.
              Rechts stehen die einzelnen Etappen chronologisch in ihren eigenen
              kleinen Boxen.
            </p>
          </div>
          <JourneyJournal posts={posts} regions={regions} />
        </div>
      </section>
    </>
  );
}
