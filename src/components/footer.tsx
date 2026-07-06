import Link from "next/link";
import { Camera, Map, PenLine } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-[#f4eee3]">
      <div className="container flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-2xl text-petrol-dark">Gerry unterwegs</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted">
            Ein Reisetagebuch als Erinnerung für später und als kleiner
            Mitlese-Ort für Freunde und Verwandte.
          </p>
        </div>
        <Link href="/datenschutz" className="text-sm text-muted hover:text-petrol">
          Datenschutz
        </Link>
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
