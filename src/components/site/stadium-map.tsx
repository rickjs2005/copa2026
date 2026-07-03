import type { Stadium } from "@/data/types";

/** Mapa esquemático das 16 sedes — posições relativas num plano
 *  estilizado (não é projeção geográfica). Leve: só divs e CSS. */
export function StadiumMap({ stadiums }: { stadiums: Stadium[] }) {
  return (
    <figure className="relative">
      <div
      role="img"
      aria-label={`Mapa esquemático com as ${stadiums.length} cidades-sede nos Estados Unidos, México e Canadá`}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-white/[0.04] via-transparent to-emerald-500/[0.05] sm:aspect-[2/1]"
    >
      {/* grade de fundo */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {stadiums.map((s) => (
        <div
          key={s.slug}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${s.map.x}%`, top: `${s.map.y}%` }}
        >
          <a
            href={`#${s.slug}`}
            aria-label={`${s.name}, ${s.city}`}
            className="block rounded-full p-2"
          >
            <span
              aria-hidden
              className="block h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.8)] transition-transform group-hover:scale-150"
            />
          </a>
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-full z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-background/95 px-2.5 py-1 text-xs font-medium backdrop-blur group-hover:block group-focus-within:block"
          >
            {s.countryFlag} {s.city}
          </span>
        </div>
      ))}
      </div>
      <figcaption className="mt-3 text-xs text-muted-foreground">
        Disposição esquemática das 16 cidades-sede — toque em um ponto para ir ao estádio.
      </figcaption>
    </figure>
  );
}
