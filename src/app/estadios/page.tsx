import type { Metadata } from "next";
import { MapPin, Users } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { StadiumMap } from "@/components/site/stadium-map";
import { Reveal } from "@/components/site/reveal";
import { getAllStadiums } from "@/lib/api";
import { formatNumber } from "@/lib/format";
import { breadcrumbLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Estádios e cidades-sede",
  description:
    "Os 16 estádios da Copa do Mundo 2026 nos Estados Unidos, México e Canadá: capacidade, cidade, curiosidades e o palco da grande final.",
  alternates: { canonical: "/estadios" },
};

export default async function EstadiosPage() {
  const stadiums = await getAllStadiums();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        eyebrow="🇺🇸 🇲🇽 🇨🇦 Três países-sede"
        title="Estádios"
        description="16 arenas em 3 países — a maior operação da história das Copas."
      />

      <Reveal>
        <StadiumMap stadiums={stadiums} />
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stadiums.map((stadium, i) => (
          <Reveal key={stadium.slug} delay={Math.min(i * 0.03, 0.15)}>
            <article
              id={stadium.slug}
              className="flex h-full scroll-mt-24 flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-colors hover:border-emerald-500/30"
            >
              {/* "foto" estilizada sem assets externos: gradiente único por sede */}
              <div
                aria-hidden
                className="mb-5 flex h-28 items-end justify-between rounded-xl bg-gradient-to-br from-emerald-500/20 via-white/[0.03] to-cyan-500/15 p-4"
              >
                <span className="text-4xl">{stadium.countryFlag}</span>
                <span className="text-4xl opacity-40">🏟️</span>
              </div>
              <h2 className="text-lg font-bold leading-snug">{stadium.name}</h2>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin aria-hidden className="h-3.5 w-3.5" />
                {stadium.city}, {stadium.country}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {stadium.description}
              </p>
              <p className="mt-4 flex items-center gap-1.5 border-t border-white/5 pt-4 text-sm font-semibold">
                <Users aria-hidden className="h-4 w-4 text-emerald-400" />
                {formatNumber(stadium.capacity)} lugares
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Estádios", path: "/estadios" },
        ])}
      />
    </div>
  );
}
