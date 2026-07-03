import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getHistory } from "@/lib/api";
import { MEDIA_IMAGES } from "@/data/media";
import { breadcrumbLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "História das Copas — todos os campeões desde 1930",
  description:
    "A linha do tempo completa da Copa do Mundo: todos os campeões, finais e histórias marcantes de 1930 até 2022, rumo à edição de 2026 — com fotos históricas.",
  alternates: { canonical: "/historia" },
};

// primeira foto histórica disponível de cada ano
const PHOTO_BY_YEAR = new Map(
  [...MEDIA_IMAGES]
    .reverse()
    .filter((m) => m.year)
    .map((m) => [m.year as number, m])
);

export default async function HistoriaPage() {
  const history = await getHistory();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        eyebrow="1930 → 2026"
        title="História das Copas"
        description="96 anos, 22 edições e 8 países campeões — cada Copa contada em uma linha do tempo."
      />

      <ol className="relative space-y-8 border-l border-border pl-8 sm:pl-10">
        {history.map((entry, i) => {
          const photo = PHOTO_BY_YEAR.get(entry.year);
          return (
            <Reveal key={entry.year} delay={Math.min(i * 0.02, 0.1)}>
              <li className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-grass bg-background text-[8px] sm:-left-[49px]"
                />
                <article className="overflow-hidden border border-border bg-card transition-colors hover:border-gold/50">
                  {photo && (
                    <figure className="relative aspect-[21/9] overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 768px"
                        className="object-cover"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-[#0b0d09]/90 via-transparent to-transparent"
                      />
                      <figcaption className="absolute bottom-2 left-4 right-4 text-[10px] leading-snug text-foreground/75">
                        {photo.caption}{" "}
                        <span className="opacity-70">· {photo.credit}</span>
                      </figcaption>
                    </figure>
                  )}
                  <div className="p-6">
                    <header className="flex flex-wrap items-baseline justify-between gap-2">
                      <h2 className="font-display text-3xl tabular-nums">{entry.year}</h2>
                      <span className="text-xs text-muted-foreground">Sede: {entry.host}</span>
                    </header>
                    <p className="mt-3 text-lg font-semibold">
                      <span aria-hidden>{entry.championFlag}</span> {entry.champion}
                      <span className="mx-2 text-sm font-normal text-gold">
                        {entry.finalScore}
                      </span>
                      <span className="text-sm font-normal text-muted-foreground">
                        {entry.runnerUp}
                      </span>
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {entry.fact}
                    </p>
                  </div>
                </article>
              </li>
            </Reveal>
          );
        })}
      </ol>

      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "História", path: "/historia" },
        ])}
      />
    </div>
  );
}
