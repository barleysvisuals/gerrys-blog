import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container grid min-h-[60vh] place-items-center py-16 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-petrol">
          404
        </p>
        <h1 className="mt-4 font-serif text-5xl text-foreground">Seite nicht gefunden</h1>
        <p className="mt-5 max-w-lg text-muted">
          Diese Route existiert nicht oder der Inhalt wurde verschoben.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-petrol px-5 text-sm font-semibold text-white transition hover:bg-petrol-dark"
        >
          Zur Startseite
        </Link>
      </div>
    </section>
  );
}
