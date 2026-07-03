import Link from "next/link";
import { Hero } from "@/components/site/hero";
import { MatchCard } from "@/components/site/match-card";
import { SectionHeading } from "@/components/site/section-heading";
import { Countdown } from "@/components/site/countdown";
import { Reveal } from "@/components/site/reveal";
import { TeamLabel } from "@/components/site/team-label";
import {
  getFinalKickoff,
  getNews,
  getStats,
  getTodayMatches,
  getUpcomingMatches,
} from "@/lib/api";
import { formatFullDate, formatKickoffDate, formatKickoffTime } from "@/lib/format";
import { JsonLd, sportsEventLd } from "@/lib/seo";

export default async function Home() {
  const [today, upcoming, stats, news] = await Promise.all([
    getTodayMatches(),
    getUpcomingMatches(6),
    getStats(),
    getNews(),
  ]);

  return (
    <>
      <Hero />

      {/* Jogos de hoje */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Hoje"
            title="Jogos de hoje"
            description="Horários no fuso de Brasília."
            href="/jogos"
            linkLabel="Calendário completo"
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {today.map((match, i) => (
            <Reveal key={match.id} delay={i * 0.06}>
              <MatchCard match={match} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Countdown para a final */}
      <section className="border-y border-white/8 bg-gradient-to-b from-emerald-500/[0.06] to-transparent">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-16 text-center sm:px-6 sm:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
              A decisão se aproxima
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
              Contagem regressiva para a Final
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              {formatFullDate(getFinalKickoff())} · New York New Jersey Stadium
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Countdown target={getFinalKickoff()} />
          </Reveal>
        </div>
      </section>

      {/* Próximos jogos */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <SectionHeading eyebrow="Agenda" title="Próximos jogos" href="/jogos" />
        </Reveal>
        <div className="relative">
          <div
            aria-hidden
            className="absolute bottom-2 left-[7px] top-2 hidden w-px bg-gradient-to-b from-emerald-400/60 via-white/10 to-transparent sm:block"
          />
          <ol className="space-y-4">
            {upcoming.map((match, i) => (
              <Reveal key={match.id} delay={i * 0.04}>
                <li className="relative sm:pl-10">
                  <span
                    aria-hidden
                    className="absolute left-0 top-1/2 hidden h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-emerald-400 bg-background sm:block"
                  />
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4 transition-colors hover:border-emerald-500/30">
                    <span className="w-28 text-sm font-semibold text-emerald-400">
                      {formatKickoffDate(match.kickoff)}
                    </span>
                    <span className="w-12 text-sm tabular-nums text-muted-foreground">
                      {formatKickoffTime(match.kickoff)}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-wrap items-center gap-2 font-medium">
                      <TeamLabel slug={match.home} flagSize="text-lg" />
                      <span className="text-muted-foreground">x</span>
                      <TeamLabel slug={match.away} flagSize="text-lg" />
                    </span>
                    <span className="hidden text-xs text-muted-foreground md:block">
                      {match.stage}
                    </span>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Artilheiros + notícias */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
        <Reveal>
          <SectionHeading eyebrow="Números" title="Artilharia" href="/estatisticas" />
          <ol className="space-y-2">
            {stats.scorers.slice(0, 5).map((s, i) => (
              <li
                key={s.player}
                className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-3.5"
              >
                <span className="w-6 text-lg font-black tabular-nums text-emerald-400">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{s.player}</span>
                  <TeamLabel
                    slug={s.team}
                    link={false}
                    flagSize="text-sm"
                    className="text-xs text-muted-foreground"
                  />
                </span>
                <span className="text-xl font-bold tabular-nums">{s.goals}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.08}>
          <SectionHeading eyebrow="Agora" title="Últimas notícias" href="/noticias" />
          <div className="space-y-2">
            {news.slice(0, 4).map((item) => (
              <Link
                key={item.slug}
                href="/noticias"
                className="block rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4 transition-colors hover:border-emerald-500/30"
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                  {item.category}
                </span>
                <span className="mt-1 block font-semibold leading-snug">{item.title}</span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {item.readingMinutes} min de leitura
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {today.map((m) => {
        const ld = sportsEventLd(m);
        return ld ? <JsonLd key={m.id} data={ld} /> : null;
      })}
    </>
  );
}
