import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Award, Globe, Star, User } from "lucide-react";
import { MatchCard } from "@/components/site/match-card";
import { getAllTeams, getTeamBySlug, getTeamMatches } from "@/lib/api";
import { breadcrumbLd, JsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  const teams = await getAllTeams();
  return teams.map((team) => ({ slug: team.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const team = await getTeamBySlug(slug);
  if (!team) return {};
  return {
    title: `${team.name} na Copa 2026 — elenco, jogos e história`,
    description: `Tudo sobre ${team.name} na Copa do Mundo 2026: grupo ${team.group}, técnico ${team.coach}, ranking FIFA #${team.fifaRanking}, jogos, títulos e jogadores destaque.`,
    alternates: { canonical: `/selecoes/${team.slug}` },
  };
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
      <Icon aria-hidden className="h-4 w-4 text-emerald-400" />
      <p className="mt-3 text-xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export default async function SelecaoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const team = await getTeamBySlug(slug);
  if (!team) notFound();

  const matches = await getTeamMatches(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/selecoes"
        className="inline-flex min-h-11 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-emerald-400"
      >
        <ArrowLeft aria-hidden className="h-4 w-4" /> Todas as seleções
      </Link>

      <header className="mt-6 flex flex-wrap items-center gap-5">
        <span aria-hidden className="text-7xl sm:text-8xl">{team.flag}</span>
        <div>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">{team.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {team.code} · Grupo {team.group} · {team.appearances}ª participação
          </p>
        </div>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Fact icon={Globe} label="Ranking FIFA" value={`#${team.fifaRanking}`} />
        <Fact icon={Award} label="Títulos mundiais" value={team.titles === 0 ? "—" : `${team.titles} ${team.titles === 1 ? "título" : "títulos"}`} />
        <Fact icon={User} label="Técnico" value={team.coach} />
        <Fact icon={Star} label="Craque" value={team.star} />
      </div>

      <section className="mt-12 max-w-3xl" aria-labelledby="historia-selecao">
        <h2 id="historia-selecao" className="text-xl font-bold">História em Copas</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{team.history}</p>
      </section>

      <section className="mt-12" aria-labelledby="destaques">
        <h2 id="destaques" className="text-xl font-bold">Jogadores destaque</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {team.highlights.map((player) => (
            <li
              key={player}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium"
            >
              {player}
            </li>
          ))}
        </ul>
      </section>

      {matches.length > 0 && (
        <section className="mt-12" aria-labelledby="jogos-selecao">
          <h2 id="jogos-selecao" className="mb-6 text-xl font-bold">
            Jogos de {team.name} nesta Copa
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} showDate />
            ))}
          </div>
        </section>
      )}

      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Seleções", path: "/selecoes" },
          { name: team.name, path: `/selecoes/${team.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SportsTeam",
          name: `Seleção de ${team.name}`,
          sport: "Futebol",
          coach: { "@type": "Person", name: team.coach },
          athlete: team.highlights.map((name) => ({ "@type": "Person", name })),
        }}
      />
    </div>
  );
}
