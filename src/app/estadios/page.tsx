import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { StadiumExperienceLazy } from "@/components/three/stadium-experience-loader";
import { ICONIC_STADIUMS } from "@/data/iconic-stadiums";
import { MEDIA_IMAGES } from "@/data/media";
import { breadcrumbLd, JsonLd } from "@/lib/seo";

// first-wins: a primeira foto de cada estádio é o "cartão-postal"
// (as seguintes são históricas e vivem na linha do tempo)
const PHOTO_BY_STADIUM = new Map<string, (typeof MEDIA_IMAGES)[number]>();
for (const m of MEDIA_IMAGES) {
  if (m.stadium && !PHOTO_BY_STADIUM.has(m.stadium)) {
    PHOTO_BY_STADIUM.set(m.stadium, m);
  }
}

export const metadata: Metadata = {
  title: "Estádios icônicos das Copas em 3D",
  description:
    "Explore em 3D os estádios que definiram a história das Copas do Mundo: Maracanã, Azteca, Wembley, Lusail e mais — do Centenário de 1930 à final de 2026.",
  alternates: { canonical: "/estadios" },
};

export default function EstadiosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        eyebrow="Experiência interativa"
        title="Os palcos das finais, em 3D"
        description="Arraste para orbitar cada estádio. Ative o Modo cinema para uma câmera lenta perfeita para gravar."
      />

      <StadiumExperienceLazy />

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ICONIC_STADIUMS.map((stadium) => {
          const photo = PHOTO_BY_STADIUM.get(stadium.slug);
          return (
            <Link
              key={stadium.slug}
              href={`/estadios/${stadium.slug}`}
              className="group block h-full"
            >
              <article className="flex h-full flex-col border border-border bg-card transition-colors group-hover:border-gold/50">
                {photo && (
                  <figure className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"
                    />
                    <span className="absolute bottom-2 left-3 text-2xl" aria-hidden>
                      {stadium.flag}
                    </span>
                  </figure>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-xl leading-snug transition-colors group-hover:text-gold">
                    {stadium.name}
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stadium.city}, {stadium.country} · {stadium.cups}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {stadium.fact}
                  </p>
                  <p className="mt-4 flex items-center gap-1.5 border-t border-border pt-4 text-sm font-semibold">
                    <Users aria-hidden className="h-4 w-4 text-grass" />
                    {stadium.capacity} lugares
                  </p>
                  {photo && (
                    <p className="mt-2 text-[11px] leading-snug text-muted-foreground">
                      {photo.credit}
                    </p>
                  )}
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      <p className="mt-10 text-xs text-muted-foreground">
        Os modelos 3D são representações estilizadas e autorais, inspiradas nas
        formas históricas de cada arena — sem uso de projetos ou marcas
        protegidas.
      </p>

      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Estádios em 3D", path: "/estadios" },
        ])}
      />
    </div>
  );
}
