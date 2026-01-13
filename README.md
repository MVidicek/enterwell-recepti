# Recepti - Mini aplikacija

Mini aplikacija za upravljanje receptima izrađena kao zadatak za Enterwell.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Jezik**: TypeScript
- **Baza**: SQLite + Drizzle ORM
- **Styling**: Tailwind CSS
- **Validacija**: Zod

## Pokretanje projekta

### Preduvjeti

- Node.js 18.17+ ili 20+
- npm 9+

### Instalacija

```bash
# Kloniraj repozitorij
git clone https://github.com/MVidicek/enterwell-recepti.git
cd enterwell-recepti

# Instaliraj dependencies
npm install

# Pokreni database setup
npm run db:push

# Unesi seed podatke
npm run db:seed

# Pokreni development server
npm run dev
```

Aplikacija će biti dostupna na http://localhost:3000

## Struktura projekta

```
src/
├── app/
│   ├── api/recipes/       # API endpoints (CRUD)
│   ├── cdn/               # Simulirani CDN
│   └── recepti/           # Frontend stranice
├── components/
│   ├── ui/                # Generičke komponente
│   └── recipes/           # Domenske komponente
├── lib/
│   ├── db/                # Database config i schema
│   └── utils/             # Pomoćne funkcije
├── types/                 # TypeScript tipovi
└── validators/            # Zod validacijske scheme
```

## API Endpoints

| Metoda | Endpoint | Opis |
|--------|----------|------|
| GET | /api/recipes | Dohvati sve recepte |
| GET | /api/recipes/:slug | Dohvati jedan recept |
| POST | /api/recipes | Kreiraj novi recept |
| PUT | /api/recipes/:slug | Ažuriraj recept |
| DELETE | /api/recipes/:slug | Obriši recept |

## Arhitekturalne odluke

### Server vs Client komponente

- **Server Components**: Koriste se za stranice koje trebaju SEO (lista recepata, detalj recepta). Data fetching se odvija na serveru.
- **Client Components**: Koriste se za interaktivne elemente (forme, modali - nisu implementirani u osnovnoj verziji).

### CDN simulacija

Slike se u bazi spremaju kao relativni pathovi (npr. `/recipes/slug/hero.jpg`). Frontend koristi environment varijablu `CDN_BASE_URL` za konstrukciju punog URL-a. U development modu, postoji fake CDN ruta koja servira slike iz `public/cdn/` direktorija s odgovarajućim cache headerima.

### Validacija

Input validacija se odvija na backendu koristeći Zod. Svaki endpoint vraća konzistentne error response u formatu:

```json
{
  "error": "Opis greške",
  "details": { ... }
}
```

## Environment varijable

```env
# Database
DATABASE_URL=file:./dev.db

# CDN
NEXT_PUBLIC_CDN_BASE_URL=http://localhost:3000/cdn

# API URL
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Napomene

- Seed podaci uključuju 5 recepata s realnim sadržajem
- CRUD operacije persistiraju u SQLite bazu
- Projekt je optimiziran za SEO s proper metadata na svim stranicama

## Moguća poboljšanja

Stvari koje bih implementirao u produkcijskoj verziji:

### Performance
- [ ] Redis cache za API response-e
- [ ] ISR (Incremental Static Regeneration) za stranice recepata
- [ ] Image optimization s sharp + WebP format

### Features
- [ ] Full-text search s SQLite FTS5 ili Meilisearch
- [ ] Filtriranje po kategoriji, težini, vremenu
- [ ] Korisničke ocjene i komentari
- [ ] Favoriti (requires auth)

### DevOps
- [ ] Docker Compose za lokalni development
- [ ] GitHub Actions CI/CD pipeline
- [ ] E2E testovi s Playwright

### Sigurnost
- [ ] Rate limiting na API endpoints
- [ ] CORS konfiguracija za produkciju
- [ ] Input sanitization za XSS zaštitu
