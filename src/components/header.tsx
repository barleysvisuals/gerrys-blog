import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-background/92 backdrop-blur">
      <div className="container flex h-18 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-serif text-2xl text-petrol-dark transition hover:text-petrol"
        >
          Gerry unterwegs
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
