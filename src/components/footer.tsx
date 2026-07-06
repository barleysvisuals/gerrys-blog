import Link from "next/link";
import { Camera, Map, PenLine } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-[#f4eee3]">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
        <div>
          <p className="font-serif text-2xl text-petrol-dark">Gerry unterwegs</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted">
            Reiseberichte, Fotogalerien und Notizen für alle, die Orte lieber
            langsam entdecken.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Entdecken</p>
          <div className="mt-4 grid gap-3 text-sm text-muted">
            <Link href="/reisen" className="hover:text-petrol">
              Reisen
            </Link>
            <Link href="/blog" className="hover:text-petrol">
              Blog
            </Link>
            <Link href="/ueber-mich" className="hover:text-petrol">
              Über mich
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Rechtliches</p>
          <div className="mt-4 grid gap-3 text-sm text-muted">
            <Link href="/impressum" className="hover:text-petrol">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-petrol">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-3 border-t border-line py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} Gerry unterwegs. Alle Rechte vorbehalten.</p>
        <div className="flex gap-4 text-petrol" aria-hidden="true">
          <Map size={16} />
          <Camera size={16} />
          <PenLine size={16} />
        </div>
      </div>
    </footer>
  );
}
