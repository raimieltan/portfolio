# Sean Raimiel Tan — Portfolio

Personal site at [raimiel.xyz](https://raimiel.xyz).

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS 3
- IBM Plex Sans/Mono + Fraunces (via `next/font/google`)
- Dynamic Open Graph image via Next's Edge `ImageResponse`
- Static SVG favicon

## Structure

- `app/` — routes, root layout, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `icon.svg`
- `components/` — section components (Hero, About, Experience, Projects, Skills, Contact, Nav, Footer)
- `lib/site.ts` — canonical SEO constants (URL, title, description, keywords)
- `lib/data.ts` — profile, experience, projects, skills content

## Local dev

```bash
npm install
npm run dev
```

## SEO

- Canonical URL + Open Graph + Twitter cards wired from `lib/site.ts`
- `schema.org/Person` and `schema.org/WebSite` JSON-LD in root layout
- Auto-generated `sitemap.xml` and `robots.txt` via App Router file conventions

Content is data-driven — updating `lib/data.ts` is the only change needed for resume-level edits.
