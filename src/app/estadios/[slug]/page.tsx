import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Users } from "lucide-react";
import { ShareButton } from "@/components/site/share-button";
import { StadiumExperienceLazy } from "@/components/three/stadium-experience-loader";
import { ICONIC_BY_SLUG, ICONIC_STADIUMS } from "@/data/iconic-stadiums";
import { MEDIA_IMAGES } from "@/data/media";
import { breadcrumbLd, JsonLd, SITE_URL } from "@/lib/seo";

/** Primeira foto real de cada estádio (a foto "cartão-postal" vem antes das históricas). */
function photoFor(slug: string) {
  return MEDIA_IMAGES.find((m) => m.stadium === slug);
}

export function generateStaticParams() {
  return ICONIC_STADIUMS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const stadium = ICONIC_BY_SLUG.get(slug);
  if (!stadium) return {};

  return {
    title: `${stadium.name} — história, fotos e 3D`,
    description: `${stadium.headline}: a história do ${stadium.name}, em ${stadium.city}, ${stadium.country} — palco de ${stadium.cups}. Fotos reais, curiosidades e um modelo 3D interativo para explorar.`,
    alternates: { canonical: `/estadios/${slug}` },
  };
}

export default async function EstadioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stadium = ICONIC_BY_SLUG.get(slug);
  if (!stadium) notFound();

  const index = ICONIC_STADIUMS.findIndex((s) => s.slug === slug);
  const prev = ICONIC_STADIUMS[(index - 1 + ICONIC_STADIUMS.length) % ICONIC_STADIUMS.length];
  const next = ICONIC_STADIUMS[(index + 1) % ICONIC_STADIUMS.length];
  const photo = photoFor(slug);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      {/* breadcrumb visível */}
      <nav aria-label="Trilha de navegação">
        <Link
          href="/estadios"
          className="inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-gold"
        >
          ← Todos os estádios
        </Link>
      </nav>

      {/* header editorial */}
      <header className="mt-6">
        <span aria-hidden className="block text-5xl sm:text-6xl">
          {stadium.flag}
        </span>
        <h1 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-tight sm:text-7xl">
          {stadium.name}
        </h1>
        <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <span>
            {stadium.city}, {stadium.country}
          </span>
          <span aria-hidden>·</span>
          <span>{stadium.cups}</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
            <Users aria-hidden className="h-4 w-4 text-grass" />
            {stadium.capacity} lugares
          </span>
        </p>
      </header>

      {/* foto real — estática, nunca dentro de wrapper animado */}
      {photo && (
        <figure className="mt-10">
          <div className="relative aspect-[16/9] overflow-hidden border border-border bg-card">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"
            />
          </div>
          <figcaption className="mt-2 text-[11px] leading-snug text-muted-foreground">
            {photo.caption} {photo.credit}
          </figcaption>
        </figure>
      )}

      <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {stadium.fact}
      </p>

      <div className="mt-6">
        <ShareButton
          url={`${SITE_URL}/estadios/${slug}`}
          title={`${stadium.name} — história, fotos e 3D`}
        />
      </div>

      {/* 3D do próprio estádio */}
      <section className="mt-14">
        <h2 className="font-display text-3xl uppercase tracking-tight sm:text-4xl">
          Explore em 3D
        </h2>
        <p className="mt-2 mb-6 text-sm text-muted-foreground">
          Arraste para orbitar o modelo estilizado do {stadium.name}.
        </p>
        <StadiumExperienceLazy initialSlug={slug} />
      </section>

      {/* navegação circular entre estádios */}
      <nav
        aria-label="Outros estádios"
        className="mt-14 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
      >
        <Link
          href={`/estadios/${prev.slug}`}
          className="group flex min-h-11 items-center gap-3 border border-border bg-card p-4 transition-colors hover:border-gold/50"
        >
          <span aria-hidden className="text-2xl">
            {prev.flag}
          </span>
          <span className="min-w-0">
            <span className="block text-xs text-muted-foreground">← Anterior</span>
            <span className="block truncate font-display text-lg uppercase leading-snug transition-colors group-hover:text-gold">
              {prev.name}
            </span>
          </span>
        </Link>
        <Link
          href={`/estadios/${next.slug}`}
          className="group flex min-h-11 items-center justify-end gap-3 border border-border bg-card p-4 text-right transition-colors hover:border-gold/50"
        >
          <span className="min-w-0">
            <span className="block text-xs text-muted-foreground">Próximo estádio →</span>
            <span className="block truncate font-display text-lg uppercase leading-snug transition-colors group-hover:text-gold">
              {next.name}
            </span>
          </span>
          <span aria-hidden className="text-2xl">
            {next.flag}
          </span>
        </Link>
      </nav>

      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Estádios em 3D", path: "/estadios" },
          { name: stadium.name, path: `/estadios/${slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "StadiumOrArena",
          name: stadium.name,
          address: {
            "@type": "PostalAddress",
            addressLocality: stadium.city,
            addressCountry: stadium.country,
          },
        }}
      />
    </div>
  );
}
