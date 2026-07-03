import type { Metadata } from "next";
import { Bracket } from "@/components/site/bracket";
import { MatchCard } from "@/components/site/match-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getBracket, getResults } from "@/lib/api";
import { breadcrumbLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mata-mata — chaveamento completo",
  description:
    "O chaveamento do mata-mata da Copa do Mundo 2026: caminho de cada seleção das oitavas à grande final no MetLife Stadium, em 19 de julho.",
  alternates: { canonical: "/mata-mata" },
};

export default async function MataMataPage() {
  const [rounds, results] = await Promise.all([getBracket(), getResults(8)]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        eyebrow="Fase final"
        title="Mata-mata"
        description="Das oitavas de final à decisão — arraste para o lado para ver o caminho até a taça."
      />
      <Bracket rounds={rounds} />

      <div className="mt-20">
        <SectionHeading
          eyebrow="32 avos de final"
          title="Resultados da fase anterior"
          href="/jogos"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((match) => (
            <MatchCard key={match.id} match={match} showDate />
          ))}
        </div>
      </div>

      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Mata-mata", path: "/mata-mata" },
        ])}
      />
    </div>
  );
}
