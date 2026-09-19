"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Map } from "lucide-react";
import { PartyPasswordDialog } from "@/components/party-password-dialog";

export function FriendsAccessButton() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-surface hover:text-petrol-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol"
        aria-label="Passwortgeschützten Partybereich öffnen"
        title="Nur für Freunde"
      >
        <Map size={16} aria-hidden="true" />
      </button>
      <PartyPasswordDialog
        open={open}
        onClose={() => setOpen(false)}
        onUnlocked={() => {
          setOpen(false);
          router.push("/party", { scroll: true });
        }}
      />
    </>
  );
}
