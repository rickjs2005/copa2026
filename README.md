**English** | [Português](README.pt-BR.md)

# As Copas do Mundo (copa2026)

Editorial website about the history of the FIFA World Cup editions, with historic stadiums recreated in 3D in the browser. Built as a MilWeb portfolio piece. The site content is in Brazilian Portuguese.

> **Type:** fan-made, unofficial and non-commercial. Not affiliated with, sponsored or endorsed by FIFA, any football federation or sponsor, and it does not use official logos or marks. Competition, team and stadium names are used for informational and historical purposes only.
> **Demo:** https://copa2026-alpha.vercel.app

![Home page](docs/screenshots/hero.webp)

![3D stadiums](docs/screenshots/estadios-3d.webp)

## Pages

- `/`: home with a countdown to the 2026 final, a trophy section, recent finals, videos and trivia
- `/historia`: every edition from 1930 to 2022
- `/curiosidades`: trivia with a topic filter
- `/estadios` and `/estadios/[slug]`: eight historic stadiums generated in 3D (procedural models, no external 3D files), with a cinema mode for video recording
- `/figurinhas`: a sticker album of highlight players, with links to audio clips on YouTube

All content is static, in `src/data/`, accessed through the `src/lib/api.ts` facade. Pages are generated at build time (SSG). The site also ships `sitemap.xml`, `robots.txt`, a generated Open Graph image (`src/app/opengraph-image.tsx`) and JSON-LD.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4
- Framer Motion
- three, @react-three/fiber and @react-three/drei (3D scenes, loaded only on stadium pages)
- lucide-react

## Getting started

Prerequisites: Node.js 20.9+ (CI uses Node 22) and npm.

```bash
npm ci
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the build
npm run lint
```

## Environment variables

Copy `.env.example` to `.env.local` if you want to override the URL:

- `NEXT_PUBLIC_SITE_URL` (optional): canonical URL used in metadata, sitemap and Open Graph. When unset, the code falls back to the production URL defined in `src/lib/seo.tsx`.

## Structure

```
src/
  app/                 routes (App Router), sitemap, robots, OG image
  components/site/     UI components
  components/three/    3D stadium scenes and models
  data/                static content (history, trivia, stadiums, stickers, media)
  lib/                 data facade, SEO and utilities
```

## Media and credits

- Photos: loaded from Wikimedia Commons (`Special:FilePath`), not hosted in the repository; the author and license of each one are listed in `src/data/media.ts`, `src/data/stickers.ts` and `src/components/site/trophy-section.tsx`, and shown in the UI.
- Videos and audio: external YouTube links (static thumbnail + link, no iframe). Rights belong to the respective channels.
- 3D models: generated in code (procedural), no third-party files.

## Limitations

- Static content: scores and facts were written by hand and are not updated automatically.
- `npm run lint` reports 3 pre-existing errors (`react-hooks/set-state-in-effect`) in `countdown.tsx` and `stadium-experience.tsx`.
- The build renders the Open Graph image with an emoji, which Next downloads from `cdn.jsdelivr.net`; without access to that host the build fails on that route.

## Security

See [SECURITY.md](SECURITY.md).

## License

No license has been chosen yet; all rights reserved by the author.
