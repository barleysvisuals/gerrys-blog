"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CalendarDays, LockKeyhole, Map, PartyPopper, Wine } from "lucide-react";
import {
  partyAccessKey,
  partyAccessValue,
  PartyPasswordDialog
} from "@/components/party-password-dialog";
import { formatDate } from "@/lib/date";
import { imageUrl } from "@/lib/images";

export function PartyArea() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setUnlocked(sessionStorage.getItem(partyAccessKey) === partyAccessValue);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (unlocked === null) {
    return (
      <section className="container grid min-h-[55vh] place-items-center py-16 text-center">
        <p className="text-sm text-muted">Zugang wird geprüft …</p>
      </section>
    );
  }

  if (!unlocked) {
    return (
      <>
        <section className="container grid min-h-[55vh] place-items-center py-16 text-center">
          <div className="max-w-lg">
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-surface-warm text-petrol">
              <LockKeyhole size={24} aria-hidden="true" />
            </span>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-orange">
              Nur für Freunde
            </p>
            <h1 className="mt-3 font-serif text-5xl leading-tight text-foreground">
              Geschützter Partybereich
            </h1>
            <p className="mt-5 leading-7 text-muted">
              Hier landen die Geschichten und Bilder, die nur für den Freundeskreis
              bestimmt sind.
            </p>
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-petrol px-5 text-sm font-semibold text-white transition hover:bg-petrol-dark"
            >
              <Map size={17} aria-hidden="true" />
              Passwort eingeben
            </button>
          </div>
        </section>
        <PartyPasswordDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onUnlocked={() => {
            setDialogOpen(false);
            setUnlocked(true);
          }}
        />
      </>
    );
  }

  return (
    <section className="container py-12 md:py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange">
            Nur für Freunde
          </p>
          <h1 className="mt-3 font-serif text-5xl leading-tight text-foreground md:text-6xl">
            Partytagebuch
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Die etwas weniger öffentlichen Geschichten von unterwegs.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem(partyAccessKey);
            setUnlocked(false);
          }}
          className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-md border border-line bg-surface px-4 text-sm font-semibold text-muted transition hover:bg-surface-warm hover:text-petrol"
        >
          <LockKeyhole size={16} aria-hidden="true" />
          Bereich sperren
        </button>
      </div>

      <div className="mt-12 flex items-center justify-between gap-5 rounded-lg border border-line bg-surface-warm p-6 shadow-sm md:max-w-md">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange">
            Hausverbot-Counter
          </p>
          <p className="mt-1 font-serif text-5xl leading-none text-foreground">1</p>
        </div>
        <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-surface text-orange">
          <PartyPopper size={27} aria-hidden="true" />
        </span>
      </div>

      <article className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
        <div className="relative aspect-[16/9] overflow-hidden bg-surface-warm">
          <Image
            src={imageUrl("/images/party/hausverbot-counter-1/club.jpg")}
            alt="Tanzfläche eines Clubs in Sydney unter rotem Licht"
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        <div className="px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={16} aria-hidden="true" />
              {formatDate("2026-09-24")}
            </span>
            <span className="inline-flex items-center gap-2">
              <Wine size={16} aria-hidden="true" />
              Sydney
            </span>
          </div>

          <h2 className="mt-5 font-serif text-4xl leading-tight text-foreground md:text-5xl">
            Hausverbot-Counter: 1
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Gestern Abend gab es für mich und ein paar andere erst einmal
            Hausverbot. Wir wollten vor dem Club unseren eigenen Wein trinken –
            was beim Security schon nicht besonders gut ankam. Als dann auch noch
            die Flasche herunterfiel, war die Stimmung endgültig vorbei.
          </p>
          <p className="mt-4 text-lg leading-8 text-muted">
            Der Security und der direkt danebenstehende Besitzer fanden die Aktion
            gar nicht lustig. Bleibt nur zu hoffen, dass das Ganze heute schon
            wieder vergessen ist.
          </p>

          <figure className="mt-8 overflow-hidden rounded-lg border border-line bg-surface-warm">
            <Image
              src={imageUrl("/images/party/hausverbot-counter-1/nachtlichter.jpg")}
              alt="Verwackelte Lichter auf dem nächtlichen Weg durch Sydney"
              width={1368}
              height={1824}
              sizes="(max-width: 896px) 100vw, 816px"
              className="h-auto w-full object-cover"
            />
          </figure>
        </div>
      </article>
    </section>
  );
}
