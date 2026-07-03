import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";

// A foto real do troféu (Wikimedia Commons, verificada) em alta resolução
const TROPHY_SRC =
  "https://commons.wikimedia.org/wiki/Special:FilePath/FIFA_World_Cup_Trophy_(Ank_Kumar,_Infosys_Limited)_01.jpg?width=1600";
const TROPHY_CREDIT = "Foto: Ank Kumar · Wikimedia Commons (CC BY-SA 4.0)";

const TROPHY_FACTS = [
  {
    stat: "6,1 kg",
    title: "de ouro 18 quilates",
    text: "São 36,8 cm de altura com duas faixas de malaquita verde na base. O desenho de Silvio Gazzaniga (1971) mostra dois atletas erguendo o planeta — venceu um concurso com 53 propostas.",
  },
  {
    stat: "Nº 2",
    title: "da história",
    text: "Esta taça só existe porque a primeira sumiu: a Jules Rimet foi roubada em Londres em 1966 (achada por um cachorro, o Pickles) e de novo no Rio em 1983 — quando foi derretida e nunca mais vista.",
  },
  {
    stat: "1970",
    title: "o Brasil ficou com a primeira",
    text: "Ao vencer o tri no México, o Brasil ganhou a Jules Rimet em definitivo — regra prevista pelo próprio Rimet. A taça atual, criada em 1974, é eterna da FIFA: campeão nenhum a leva para casa; recebe uma réplica banhada a ouro.",
  },
  {
    stat: "2038",
    title: "o espaço acaba",
    text: "Os campeões são gravados na base desde 1974 — e só há lugar para os vencedores até 2038. Pelo protocolo, apenas campeões mundiais e chefes de Estado podem tocá-la com as mãos nuas.",
  },
];

export function TrophySection() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* a imagem ultra da taça */}
        <Reveal>
          <figure className="relative mx-auto max-w-md lg:max-w-none">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 scale-110 rounded-full bg-[radial-gradient(closest-side,rgba(217,168,66,0.28),transparent)] blur-2xl"
            />
            <div className="relative aspect-[3/4] overflow-hidden border border-gold/25">
              <Image
                src={TROPHY_SRC}
                alt="Troféu da Copa do Mundo FIFA em ouro maciço, fotografado sobre fundo escuro"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#0b0d09]/70 via-transparent to-transparent"
              />
              <p className="font-display absolute bottom-4 left-4 right-4 text-2xl leading-none text-foreground sm:text-3xl">
                O objeto mais cobiçado{" "}
                <span className="text-gold">do futebol</span>
              </p>
            </div>
            <figcaption className="mt-2 text-[10px] text-muted-foreground/70">
              {TROPHY_CREDIT}
            </figcaption>
          </figure>
        </Reveal>

        {/* curiosidades da taça */}
        <div>
          <Reveal>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
              <span aria-hidden className="h-px w-8 bg-gold/60" />
              Desde 1974 nas mãos dos campeões
            </p>
            <h2 className="font-display text-4xl sm:text-6xl">A Taça</h2>
          </Reveal>

          <div className="mt-8 space-y-4">
            {TROPHY_FACTS.map((fact, i) => (
              <Reveal key={fact.stat} delay={i * 0.06}>
                <article className="flex gap-5 border border-border bg-card p-5 transition-colors hover:border-gold/50">
                  <p className="w-20 shrink-0">
                    <span className="font-display block text-2xl leading-none text-gold">
                      {fact.stat}
                    </span>
                    <span className="mt-1 block text-[10px] uppercase leading-tight tracking-wider text-muted-foreground">
                      {fact.title}
                    </span>
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{fact.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <Link
              href="/curiosidades"
              className="group mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-grass-light"
            >
              Mais curiosidades das Copas
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
