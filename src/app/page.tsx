import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { Hero } from "@/components/site/hero";
import { Ticker } from "@/components/site/ticker";
import { TrophySection } from "@/components/site/trophy-section";
import { SectionHeading } from "@/components/site/section-heading";
import { Countdown } from "@/components/site/countdown";
import { Reveal } from "@/components/site/reveal";
import { getCuriosities, getFinalKickoff, getHistory } from "@/lib/api";
import { formatFullDate } from "@/lib/format";
import { ICONIC_STADIUMS } from "@/data/iconic-stadiums";
import { MEDIA_VIDEOS } from "@/data/media";
import { VideoCard } from "@/components/site/video-card";

export default async function Home() {
  const [history, curiosities] = await Promise.all([getHistory(), getCuriosities()]);
  const champions = history.slice(0, 4);

  return (
    <>
      <Hero />

      <Ticker />

      {/* Chamada para a experiência 3D */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <Link
            href="/estadios"
            className="group relative block overflow-hidden border border-border bg-gradient-to-br from-grass/15 via-white/[0.02] to-gold/10 p-8 transition-colors hover:border-grass/40 sm:p-14"
          >
            <div
              aria-hidden
              className="absolute -right-10 -top-16 text-[180px] opacity-10 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-20 motion-reduce:transform-none sm:text-[260px]"
            >
              🏟️
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-grass">
              Experiência interativa
            </p>
            <h2 className="mt-3 max-w-2xl text-balance text-3xl font-black tracking-tight sm:text-5xl">
              Entre nos estádios que definiram as Copas — em 3D
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Do Centenário de 1930 ao palco da final de 2026: orbite o
              Maracanã, o Azteca, Wembley e o dourado Lusail. Com Modo cinema
              para você gravar e compartilhar.
            </p>
            <span className="font-display mt-7 inline-flex min-h-13 items-center gap-3 bg-grass px-8 text-base tracking-wider text-[#0b0d09] transition-colors group-hover:bg-grass-light">
              Explorar em 3D
              <ArrowRight aria-hidden className="h-4 w-4" />
            </span>
            <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {ICONIC_STADIUMS.map((s) => (
                <span key={s.slug}>
                  {s.flag} {s.name.split(" ")[0]}
                </span>
              ))}
            </p>
          </Link>
        </Reveal>
      </section>

      {/* Countdown para a final de 2026 */}
      <section className="border-y border-border bg-gradient-to-b from-grass/[0.06] to-transparent">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-16 text-center sm:px-6 sm:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-grass">
              O próximo capítulo
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
              Contagem regressiva para a Final de 2026
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

      {/* A Taça — imagem ultra + curiosidades */}
      <TrophySection />

      {/* Últimos campeões → história */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Galeria de campeões"
            title="As últimas finais"
            href="/historia"
            linkLabel="Linha do tempo completa"
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {champions.map((entry, i) => (
            <Reveal key={entry.year} delay={i * 0.05}>
              <Link
                href="/historia"
                className="flex h-full flex-col border border-border bg-card p-6 transition-colors hover:border-gold/50"
              >
                <p className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="text-2xl font-black tabular-nums text-foreground">
                    {entry.year}
                  </span>
                  <Trophy aria-hidden className="h-4 w-4 text-grass" />
                </p>
                <p className="mt-4 text-lg font-bold">
                  <span aria-hidden>{entry.championFlag}</span> {entry.champion}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {entry.finalScore} · {entry.runnerUp}
                </p>
                <p className="mt-3 flex-1 text-xs leading-relaxed text-muted-foreground">
                  {entry.fact}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Momentos em vídeo */}
      {MEDIA_VIDEOS.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
          <Reveal>
            <SectionHeading
              eyebrow="Aperte o play"
              title="Momentos em vídeo"
              description="A história das Copas contada em imagens — direto no YouTube."
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MEDIA_VIDEOS.slice(0, 4).map((video, i) => (
              <Reveal key={video.id} delay={i * 0.05}>
                <VideoCard video={video} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Curiosidades */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Você sabia?"
            title="Curiosidades das Copas"
            href="/curiosidades"
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-3">
          {curiosities.slice(0, 3).map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <article className="h-full border border-border bg-card p-6">
                <span className="inline-flex w-fit items-center border border-border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-grass">
                  {item.tag}
                </span>
                <h3 className="mt-4 font-bold leading-snug">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
