import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MatchCard } from "@/components/site/match-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getResults, getTodayMatches, getUpcomingMatches } from "@/lib/api";
import { groupByDay } from "@/lib/format";
import { breadcrumbLd, JsonLd, sportsEventLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Jogos de hoje, próximos jogos e resultados",
  description:
    "Todos os jogos da Copa do Mundo 2026: partidas de hoje ao vivo, calendário dos próximos jogos e resultados completos, com horários de Brasília.",
  alternates: { canonical: "/jogos" },
};

export default async function JogosPage() {
  const [today, upcoming, results] = await Promise.all([
    getTodayMatches(),
    getUpcomingMatches(24),
    getResults(24),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        eyebrow="Calendário"
        title="Jogos"
        description="Horários no fuso de Brasília. Resultados ao vivo quando disponíveis."
      />

      <Tabs defaultValue="hoje">
        <TabsList aria-label="Filtrar jogos">
          <TabsTrigger value="hoje">Hoje ({today.length})</TabsTrigger>
          <TabsTrigger value="proximos">Próximos</TabsTrigger>
          <TabsTrigger value="resultados">Resultados</TabsTrigger>
        </TabsList>

        <TabsContent value="hoje" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {today.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="proximos" className="mt-6 space-y-10">
          {groupByDay(upcoming).map(([day, matches]) => (
            <section key={day} aria-label={day}>
              <h3 className="mb-4 text-sm font-bold capitalize text-emerald-400">{day}</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {matches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </section>
          ))}
        </TabsContent>

        <TabsContent value="resultados" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((match) => (
              <MatchCard key={match.id} match={match} showDate />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <JsonLd data={breadcrumbLd([{ name: "Início", path: "/" }, { name: "Jogos", path: "/jogos" }])} />
      {today.map((m) => {
        const ld = sportsEventLd(m);
        return ld ? <JsonLd key={m.id} data={ld} /> : null;
      })}
    </div>
  );
}
