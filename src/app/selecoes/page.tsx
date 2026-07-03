import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/site/section-heading";
import { getAllTeams } from "@/lib/api";
import { breadcrumbLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "As 48 seleções da Copa",
  description:
    "Todas as 48 seleções da Copa do Mundo 2026: elenco, técnico, títulos, ranking FIFA, história e jogadores destaque de cada país.",
  alternates: { canonical: "/selecoes" },
};

export default async function SelecoesPage() {
  const teams = await getAllTeams();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        eyebrow="48 países"
        title="Seleções"
        description="Toque em uma seleção para ver história, elenco, técnico e destaques."
      />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {teams.map((team) => (
          <li key={team.slug}>
            <Link
              href={`/selecoes/${team.slug}`}
              className="group flex h-full items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-emerald-500/30 hover:bg-white/[0.05]"
            >
              <span aria-hidden className="text-3xl transition-transform group-hover:scale-110 motion-reduce:transform-none">
                {team.flag}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-semibold">{team.name}</span>
                <span className="block text-xs text-muted-foreground">
                  Grupo {team.group} · #{team.fifaRanking} FIFA
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Seleções", path: "/selecoes" },
        ])}
      />
    </div>
  );
}
