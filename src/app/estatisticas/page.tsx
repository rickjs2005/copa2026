import type { Metadata } from "next";
import { Goal, Handshake, Square, TrendingUp, Users, Volleyball } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { TeamLabel } from "@/components/site/team-label";
import { Reveal } from "@/components/site/reveal";
import { getStats } from "@/lib/api";
import { formatNumber } from "@/lib/format";
import { breadcrumbLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Estatísticas — artilheiros, assistências e cartões",
  description:
    "Números da Copa do Mundo 2026: artilharia, líderes de assistência, cartões por seleção, total de gols e média de gols por partida.",
  alternates: { canonical: "/estatisticas" },
};

function StatTile({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6">
      <Icon aria-hidden className="h-5 w-5 text-emerald-400" />
      <p className="mt-4 text-3xl font-black tabular-nums tracking-tight sm:text-4xl">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export default async function EstatisticasPage() {
  const { scorers, assists, cards, totals } = await getStats();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        eyebrow="Números do torneio"
        title="Estatísticas"
        description="Atualizadas após cada rodada. Dados de demonstração nesta versão."
      />

      <Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile icon={Volleyball} label="Gols marcados" value={formatNumber(totals.goals)} />
          <StatTile icon={TrendingUp} label="Média de gols por jogo" value={totals.goalsPerMatch.toLocaleString("pt-BR")} />
          <StatTile icon={Goal} label="Jogos disputados" value={formatNumber(totals.matchesPlayed)} />
          <StatTile icon={Users} label="Público médio" value={formatNumber(totals.attendanceAvg)} />
        </div>
      </Reveal>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <Reveal>
          <section aria-labelledby="artilheiros">
            <h2 id="artilheiros" className="mb-6 flex items-center gap-2 text-xl font-bold">
              <Volleyball aria-hidden className="h-5 w-5 text-emerald-400" /> Artilheiros
            </h2>
            <ol className="space-y-2">
              {scorers.map((s, i) => (
                <li
                  key={s.player}
                  className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-3"
                >
                  <span className="w-6 text-lg font-black tabular-nums text-emerald-400">{i + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{s.player}</span>
                    <TeamLabel slug={s.team} link={false} flagSize="text-sm" className="text-xs text-muted-foreground" />
                  </span>
                  <span className="text-lg font-bold tabular-nums">
                    {s.goals} <span className="text-xs font-normal text-muted-foreground">gols</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        <div className="space-y-12">
          <Reveal>
            <section aria-labelledby="assistencias">
              <h2 id="assistencias" className="mb-6 flex items-center gap-2 text-xl font-bold">
                <Handshake aria-hidden className="h-5 w-5 text-emerald-400" /> Assistências
              </h2>
              <ol className="space-y-2">
                {assists.map((a, i) => (
                  <li
                    key={a.player}
                    className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-3"
                  >
                    <span className="w-6 text-sm font-black tabular-nums text-emerald-400">{i + 1}</span>
                    <span className="min-w-0 flex-1 truncate font-medium">{a.player}</span>
                    <span className="font-bold tabular-nums">{a.assists}</span>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          <Reveal>
            <section aria-labelledby="cartoes">
              <h2 id="cartoes" className="mb-6 flex items-center gap-2 text-xl font-bold">
                <Square aria-hidden className="h-5 w-5 fill-yellow-400 text-yellow-400" /> Cartões por seleção
              </h2>
              <ul className="space-y-2">
                {cards.map((c) => (
                  <li
                    key={c.team}
                    className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-3"
                  >
                    <TeamLabel slug={c.team} className="min-w-0 flex-1" flagSize="text-lg" />
                    <span className="flex items-center gap-1.5 text-sm tabular-nums">
                      <span aria-hidden className="h-3.5 w-2.5 rounded-[2px] bg-yellow-400" />
                      <span className="sr-only">amarelos:</span> {c.yellow}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm tabular-nums">
                      <span aria-hidden className="h-3.5 w-2.5 rounded-[2px] bg-red-500" />
                      <span className="sr-only">vermelhos:</span> {c.red}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>
      </div>

      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Estatísticas", path: "/estatisticas" },
        ])}
      />
    </div>
  );
}
