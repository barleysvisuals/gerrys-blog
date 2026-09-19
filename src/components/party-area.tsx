"use client";

import { useEffect, useState } from "react";
import { LockKeyhole, Map, PartyPopper } from "lucide-react";
import {
  partyAccessKey,
  partyAccessValue,
  PartyPasswordDialog
} from "@/components/party-password-dialog";

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

      <div className="mt-12 rounded-lg border border-dashed border-line bg-surface p-10 text-center shadow-sm">
        <PartyPopper className="mx-auto text-orange" size={30} aria-hidden="true" />
        <h2 className="mt-4 font-serif text-3xl text-foreground">Noch keine Partyeinträge</h2>
        <p className="mx-auto mt-3 max-w-xl leading-7 text-muted">
          Sobald du festlegst, welche Beiträge privat sein sollen, erscheinen sie
          hier im gleichen Aufbau wie das normale Reisetagebuch.
        </p>
      </div>
    </section>
  );
}
