# As Copas do Mundo (copa2026)

Site editorial independente sobre a história das Copas do Mundo, feito como peça de portfólio da MilWeb. Não tem vínculo com a FIFA nem com federações.

Páginas:

- `/`: home com contagem regressiva da final de 2026, seção da Taça, campeões e vídeos
- `/historia`: edições de 1930 a 2022
- `/curiosidades`: curiosidades com filtro por tema
- `/estadios` e `/estadios/[slug]`: oito estádios históricos gerados em 3D (modelos procedurais, sem arquivos 3D externos), com um modo cinema para gravação de vídeo
- `/figurinhas`: álbum de figurinhas dos destaques da edição

Todo o conteúdo é estático, em `src/data/`, acessado pela fachada `src/lib/api.ts`. As páginas são geradas no build (SSG).

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4
- Framer Motion
- three, @react-three/fiber e @react-three/drei (cenas 3D, carregadas só nas páginas de estádios)
- lucide-react

## Como rodar

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
npm run start   # serve o build
npm run lint
```

## Variáveis de ambiente

- `NEXT_PUBLIC_SITE_URL` (opcional): URL canônica usada em metadata, sitemap e Open Graph. Sem ela, o código usa o endereço de produção definido em `src/lib/seo.tsx`.
