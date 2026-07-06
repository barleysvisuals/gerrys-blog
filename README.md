# Gerry unterwegs - statischer Reiseblog

Ein modernes Next.js-Projekt für einen persönlichen Reiseblog mit App Router,
TypeScript, Tailwind CSS und dateibasierten Markdown-Inhalten. Es gibt kein Login, keine Datenbank,
kein CMS und keine serverseitige Benutzerverwaltung. Inhalte liegen als Dateien im
Projekt und können später leicht durch eine Coding-KI erweitert werden.

## Entwicklung

```bash
npm install
npm run dev
```

Die Website läuft danach lokal unter `http://localhost:3000`.

## Struktur

```text
content/
  posts/              # Blogbeiträge als .mdx/.md mit Frontmatter
  destinations/       # Reiseziele als .mdx/.md mit Frontmatter
public/
  images/             # lokale Bilder und Platzhalter
src/
  app/                # Next.js App Router Seiten
  components/         # wiederverwendbare UI-Komponenten
  lib/                # Content-Loader, SEO- und Bild-Helfer
  types/              # gemeinsame Content-Typen
```

## 1. Neuen Blogbeitrag hinzufügen

1. Neue Datei in `content/posts/` anlegen, zum Beispiel
   `content/posts/madeira-2027.mdx`.
2. Frontmatter aus einem bestehenden Beitrag kopieren.
3. `slug` eindeutig setzen. Der Beitrag erscheint unter `/blog/[slug]`.
4. `destinationSlug` auf ein existierendes Reiseziel setzen, damit der Beitrag
   auf der Zielseite erscheint.
5. Inhalt unterhalb des Frontmatters in Markdown schreiben.

Wichtig: `coverImage`, `coverAlt`, `tags`, `date`, `country` und `excerpt`
sollten immer gepflegt werden, weil sie für Karten, SEO und Open Graph genutzt
werden.

## 2. Neues Reiseziel hinzufügen

1. Neue Datei in `content/destinations/` anlegen, zum Beispiel
   `content/destinations/madeira.mdx`.
2. Frontmatter aus einem bestehenden Ziel kopieren.
3. `slug` eindeutig setzen. Das Ziel erscheint unter `/reisen/[slug]`.
4. Optional `travelTime`, `duration`, `tips`, `coordinates` und `gallery`
   ergänzen.

Die Übersichtsseite `/reisen` liest alle Ziele automatisch ein und stellt Suche
sowie Filter nach Land und Tags bereit.

## 3. Wo kommen Bilder hin?

Lokale Bilder liegen unter `public/images/`, am besten nach Ziel sortiert:

```text
public/images/neuseeland/cover.webp
public/images/neuseeland/fiordland.webp
public/images/neuseeland/queenstown.webp
```

In Frontmatter und MDX werden sie mit absolutem Public-Pfad referenziert:

```md
coverImage: "/images/neuseeland/cover.webp"
```

Alle Beispielbilder sind Platzhalter. Ersetze sie später durch echte Fotos im
gleichen Ordner oder passe die Pfade im Frontmatter an. Jede Bildreferenz sollte
einen aussagekräftigen Alt-Text besitzen.

## 4. Texte und Navigation ändern

- Navigation und globale Site-Daten: `src/lib/site.ts`
- Startseite: `src/app/page.tsx`
- Footer: `src/components/footer.tsx`
- Rechtliches: `src/app/impressum/page.tsx` und `src/app/datenschutz/page.tsx`

## 5. Deployment über GitHub und Vercel

1. Repository zu GitHub pushen.
2. In Vercel ein neues Projekt importieren.
3. Framework Preset: Next.js.
4. Build Command: `npm run build`.
5. Output Directory leer lassen, Vercel erkennt Next.js automatisch.
6. Optional `NEXT_PUBLIC_SITE_URL` auf die spätere Domain setzen, damit
   Canonicals, Sitemap und robots.txt korrekt sind.

Alle Inhaltsseiten werden statisch generiert. Das Projekt ist dadurch für Vercel
SSG geeignet und benötigt keine Datenbank.

## 6. Eigene Domain mit Vercel verbinden

1. Im Vercel-Projekt den Bereich `Settings -> Domains` öffnen.
2. Eigene Domain eintragen.
3. DNS-Einträge gemäß Vercel-Hinweis beim Domainanbieter setzen.
4. Nach erfolgreicher Verknüpfung `NEXT_PUBLIC_SITE_URL` auf die neue Domain
   setzen, zum Beispiel `https://www.meinreiseblog.de`.
5. Neu deployen, damit Sitemap, robots.txt und Canonical URLs aktualisiert werden.

## Externe Bilder vorbereiten

Standardmäßig nutzt die Website lokale Bilder aus `public/images`. Für
Cloudinary oder Cloudflare R2 ist die Architektur vorbereitet:

- `src/lib/images.ts` kann Pfade über `NEXT_PUBLIC_IMAGE_BASE_URL` auf eine
  externe Basis-URL abbilden.
- `next.config.ts` enthält bereits Beispiel-Patterns für Cloudinary und R2.

Wenn externe Bilder genutzt werden, Domain-Pattern und Datenschutzseite prüfen.

## Statischer Export

Das Projekt ist als statische Next.js-Seite auf Vercel ausgelegt und nutzt dabei
`next/image` mit Vercels Bildoptimierung. Ein kompletter `output: "export"` ist
möglich, erfordert aber üblicherweise `images.unoptimized: true` in
`next.config.ts`, weil beim reinen Export kein Image Optimization Service läuft.
