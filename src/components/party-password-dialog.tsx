"use client";

import { useEffect, useState } from "react";
import { LockKeyhole, X } from "lucide-react";

export const partyAccessKey = "gerry-party-access";
export const partyAccessValue = "granted";

const partyPasswordHash =
  "07f6b21e805dffdf8cedc67020076cfa497f76dcf9c91fbcf49717139335da24";

type PartyPasswordDialogProps = {
  open: boolean;
  onClose: () => void;
  onUnlocked: () => void;
};

async function hashPassword(value: string) {
  const encoded = new TextEncoder().encode(value.trim());
  const digest = await crypto.subtle.digest("SHA-256", encoded);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function PartyPasswordDialog({
  open,
  onClose,
  onUnlocked
}: PartyPasswordDialogProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setChecking(true);
    setError("");

    const matches = (await hashPassword(password)) === partyPasswordHash;

    if (matches) {
      sessionStorage.setItem(partyAccessKey, partyAccessValue);
      setPassword("");
      setChecking(false);
      onUnlocked();
      return;
    }

    setChecking(false);
    setError("Das Passwort stimmt nicht.");
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-petrol-dark/55 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="party-dialog-title"
        className="w-full max-w-sm rounded-lg border border-line bg-background p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-warm text-petrol">
              <LockKeyhole size={18} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange">
                Nur für Freunde
              </p>
              <h2 id="party-dialog-title" className="mt-1 font-serif text-2xl text-foreground">
                Partybereich öffnen
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-surface-warm hover:text-petrol"
            aria-label="Passwortfenster schließen"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <label htmlFor="party-password" className="text-sm font-semibold text-foreground">
            Passwort
          </label>
          <input
            id="party-password"
            type="password"
            value={password}
            autoFocus
            autoComplete="current-password"
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
            className="mt-2 h-12 w-full rounded-md border border-line bg-surface px-3 text-foreground outline-none transition focus:border-petrol focus:ring-2 focus:ring-petrol/15"
            aria-describedby={error ? "party-password-error" : undefined}
          />
          {error ? (
            <p id="party-password-error" className="mt-2 text-sm text-orange" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={checking || !password}
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-petrol px-5 text-sm font-semibold text-white transition hover:bg-petrol-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {checking ? "Wird geprüft …" : "OK"}
          </button>
        </form>
      </div>
    </div>
  );
}
