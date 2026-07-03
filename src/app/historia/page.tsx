import type { Metadata } from "next";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getHistory } from "@/lib/api";
import { breadcrumbLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "História das Copas — todos os campeões desde 1930",
  description:
    "A linha do tempo completa da Copa do Mundo: todos os campeões, finais e histórias marcantes de 1930 até 2022, rumo à edição de 2026.",
  alternates: { canonical: "/historia" },
};

export default async function HistoriaPage() {
  const history = await getHistory();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        eyebrow="1930 → 2026"
        title="História das Copas"
        description=" 96 anos, 22 edições e 8 países campeões — cada Copa contada em uma linha do tempo."
      />

      <ol className="relative space-y-8 border-l border-white/10 pl-8 sm:pl-10">
        {history.map((entry, i) => (
          <Reveal key={entry.year} delay={Math.min(i * 0.02, 0.1)}>
            <li className="relative">
              <span
                aria-hidden
                className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-emerald-400 bg-background text-[8px] sm:-left-[49px]"
              />
              <article className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-colors hover:border-emerald-500/30">
                <header className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-2xl font-black tabular-nums tracking-tight">
                    {entry.year}
                  </h2>
                  <span className="text-xs text-muted-foreground">Sede: {entry.host}</span>
                </header>
                <p className="mt-3 text-lg font-semibold">
                  <span aria-hidden>{entry.championFlag}</span> {entry.champion}
                  <span className="mx-2 text-sm font-normal text-muted-foreground">
                    {entry.finalScore}
                  </span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {entry.runnerUp}
                  </span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{entry.fact}</p>
              </article>
            </li>
          </Reveal>
        ))}
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
