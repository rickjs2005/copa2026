import type { Metadata } from "next";
import { Users } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { StadiumExperienceLazy } from "@/components/three/stadium-experience-loader";
import { ICONIC_STADIUMS } from "@/data/iconic-stadiums";
import { breadcrumbLd, JsonLd } from "@/lib/seo";

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
        {ICONIC_STADIUMS.map((stadium, i) => (
          <Reveal key={stadium.slug} delay={Math.min(i * 0.04, 0.2)}>
            <article className="flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-colors hover:border-emerald-500/30">
              <p className="text-3xl" aria-hidden>{stadium.flag}</p>
              <h2 className="mt-3 text-lg font-bold leading-snug">{stadium.name}</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {stadium.city}, {stadium.country} · {stadium.cups}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {stadium.fact}
              </p>
              <p className="mt-4 flex items-center gap-1.5 border-t border-white/5 pt-4 text-sm font-semibold">
                <Users aria-hidden className="h-4 w-4 text-emerald-400" />
                {stadium.capacity} lugares
              </p>
            </article>
          </Reveal>
        ))}
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
