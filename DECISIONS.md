# Arhitekturalne odluke

## Zašto SQLite umjesto PostgreSQL?

Za ovaj zadatak odabrao sam SQLite jer:
- Zero configuration - reviewer može pokrenuti projekt bez Docker-a ili eksterne baze
- Drizzle ORM omogućuje laku migraciju na PostgreSQL u produkciji
- Za CRUD operacije nad jednom tablicom, SQLite je više nego dovoljan

U produkcijskom okruženju s više korisnika, migrirao bih na PostgreSQL.

## Zašto slug umjesto ID-a u URL-u?

- SEO friendly URL-ovi (`/recepti/kremasta-tjestenina` vs `/recepti/abc123`)
- Čitljiviji za korisnike
- Coolinarika koristi isti pristup

Trade-off: Slug mora biti jedinstven i stabilan. Implementirao sam auto-generiranje iz naslova s provjerom duplikata.

## Server Components vs Client Components

Odlučio sam koristiti Server Components za stranice jer:
- Recepti su content-heavy i trebaju SEO
- Nema potrebe za client-side state na stranicama za prikaz
- Brže inicijalno učitavanje

Client Components bi koristio za:
- Forme za CRUD operacije
- Search s debounce-om
- Interaktivne filtere

## CDN strategija

Slike se spremaju kao relativni path (`/recipes/slug/hero.jpg`) umjesto punog URL-a jer:
- Omogućuje laku promjenu CDN providera
- Environment varijabla kontrolira base URL
- U produkciji bi se `CDN_BASE_URL` postavio na pravi CDN (npr. Cloudflare, AWS CloudFront)

Cache headeri (`max-age=31536000, immutable`) pretpostavljaju da se slike ne mijenjaju. Za verzioniranje slika, dodao bih hash u filename (npr. `hero.a1b2c3.jpg`).

## Validacija

Zod schema na backendu jer:
- Type-safe validacija
- Automatsko generiranje TypeScript tipova
- Detaljne error poruke koje se mogu prikazati korisniku

Frontend validacija bi bila duplicirana za UX, ali backend UVIJEK validira jer se ne smije vjerovati inputu.

## Što bih dodao s više vremena

1. **Pagination** - trenutno vraća sve recepte, što ne skalira
2. **Search** - full-text pretraživanje po nazivu i sastojcima
3. **Image upload** - integracija s S3/Cloudflare R2
4. **Caching** - Redis za API response cache
5. **Rate limiting** - zaštita API-ja od abuse-a
6. **E2E testovi** - Playwright za kritične user flow-ove
