import type { Metadata } from "next";
import { GroupTable } from "@/components/site/group-table";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getGroups } from "@/lib/api";
import { breadcrumbLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tabela e classificação dos grupos",
  description:
    "Classificação completa dos 12 grupos da Copa do Mundo 2026: pontos, vitórias, saldo de gols e classificados para o mata-mata, grupo por grupo.",
  alternates: { canonical: "/tabela" },
};

export default async function TabelaPage() {
  const groups = await getGroups();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        eyebrow="Fase de grupos"
        title="Classificação"
        description="Os dois primeiros de cada grupo e os 8 melhores terceiros avançam ao mata-mata. Linhas destacadas = classificados diretos."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {groups.map((group, i) => (
          <Reveal key={group.id} delay={Math.min(i * 0.04, 0.2)}>
            <GroupTable group={group.id} standings={group.standings} />
          </Reveal>
        ))}
      </div>
      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Tabela", path: "/tabela" },
        ])}
      />
    </div>
  );
}
