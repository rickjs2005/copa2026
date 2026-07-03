"use client";

import { useEffect, useRef, useState } from "react";
import { Clapperboard, Users, X } from "lucide-react";
import { ICONIC_BY_SLUG, ICONIC_STADIUMS } from "@/data/iconic-stadiums";
import { ShareButton } from "@/components/site/share-button";
import { StadiumScene } from "./stadium-scene";
import { cn } from "@/lib/utils";

export type StadiumExperienceProps = {
  /** Abre já no estádio correspondente quando válido (fallback: Maracanã). */
  initialSlug?: string;
};

export function StadiumExperience({ initialSlug }: StadiumExperienceProps) {
  const [selected, setSelected] = useState(
    () => (initialSlug && ICONIC_BY_SLUG.get(initialSlug)) || ICONIC_STADIUMS[1] // Maracanã abre o show
  );
  const [cinema, setCinema] = useState(false);

  // Dica de gravação por plataforma — null até detectar (nunca renderiza a dica errada)
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  // Suporte a WebGL — null enquanto testa; só monta o Canvas se true
  const [webglOk, setWebglOk] = useState<boolean | null>(null);

  // Render 3D pausado fora da viewport / aba oculta
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);

  // Hint de gesto — some no primeiro pointerdown/touchstart e não volta
  const [hintDismissed, setHintDismissed] = useState(false);

  // ESC sai do modo cinema
  useEffect(() => {
    if (!cinema) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCinema(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cinema]);

  // Detecta plataforma no cliente (evita dica do Windows num celular)
  useEffect(() => {
    setIsMobile(
      navigator.maxTouchPoints > 1 || /Android|iPhone|iPad/i.test(navigator.userAgent)
    );
  }, []);

  // Testa a criação do contexto WebGL antes de montar o Canvas
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    setWebglOk(Boolean(gl));
  }, []);

  // Pausa o frameloop quando o container sai da viewport
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // …ou quando a aba fica oculta
  useEffect(() => {
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // No cinema (fixed fullscreen) o wrapper está sempre na viewport; a aba oculta ainda pausa
  const active = pageVisible && (cinema || inView);

  const dismissHint = () => setHintDismissed(true);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative overflow-hidden border-white/10 bg-[#0b0d10]",
        cinema ? "fixed inset-0 z-[90]" : "border"
      )}
    >
      <div
        className={cinema ? "h-dvh w-full" : "h-[68dvh] min-h-[480px] w-full"}
        onPointerDown={dismissHint}
        onTouchStart={dismissHint}
      >
        {webglOk === false ? (
          <div className="flex h-full w-full items-center justify-center border border-border bg-card p-8">
            <p className="max-w-sm text-center text-sm leading-relaxed text-muted-foreground">
              Seu navegador não conseguiu carregar o 3D 😕 — mas as fotos reais
              dos estádios estão logo abaixo.
            </p>
          </div>
        ) : (
          webglOk && <StadiumScene stadium={selected} cinema={cinema} active={active} />
        )}
      </div>

      {/* hint de gesto — primeiro carregamento, some no primeiro toque */}
      {webglOk && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 px-4 py-2 backdrop-blur-sm transition-opacity duration-500",
            hintDismissed ? "opacity-0" : "opacity-100"
          )}
        >
          <p className="font-display text-sm uppercase tracking-wide text-foreground">
            ↻ Arraste para orbitar
          </p>
        </div>
      )}

      {/* painel de informações */}
      {!cinema && (
        <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col gap-3 p-5 sm:max-w-md sm:p-7">
          <div className="pointer-events-auto border border-white/10 bg-black/55 p-5 backdrop-blur-xl sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-grass">
              {selected.headline}
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
              {selected.flag} {selected.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {selected.city}, {selected.country} · {selected.cups}
            </p>
            <p className="mt-3 hidden text-sm leading-relaxed text-foreground/85 sm:block">
              {selected.fact}
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users aria-hidden className="h-3.5 w-3.5 text-grass" />
              Capacidade: {selected.capacity}
            </p>
            <div className="mt-4">
              <ShareButton
                url={`https://copa2026-alpha.vercel.app/estadios/${selected.slug}`}
                title={`${selected.name} em 3D — As🏆Copas`}
              />
            </div>
          </div>
        </div>
      )}

      {/* botão modo cinema */}
      <button
        type="button"
        onClick={() => setCinema(!cinema)}
        className={cn(
          "absolute right-5 top-5 z-10 inline-flex min-h-11 items-center gap-2 border px-5 text-sm font-semibold backdrop-blur-xl transition-colors",
          cinema
            ? "border-white/20 bg-black/60 text-white hover:bg-black/80"
            : "border-grass/40 bg-grass/15 text-grass-light hover:bg-grass/25"
        )}
      >
        {cinema ? (
          <>
            <X aria-hidden className="h-4 w-4" /> Sair (Esc)
          </>
        ) : (
          <>
            <Clapperboard aria-hidden className="h-4 w-4" /> Modo cinema
          </>
        )}
      </button>

      {/* seletor de estádios */}
      {!cinema && (
        <div className="absolute inset-x-0 bottom-0">
          <nav
            aria-label="Escolher estádio"
            className="flex gap-2 overflow-x-auto p-4 sm:justify-center sm:p-5"
          >
            {ICONIC_STADIUMS.map((stadium) => (
              <button
                key={stadium.slug}
                type="button"
                onClick={() => setSelected(stadium)}
                aria-pressed={stadium.slug === selected.slug}
                className={cn(
                  "shrink-0 whitespace-nowrap border px-4 py-2.5 text-xs font-semibold backdrop-blur-xl transition-colors",
                  stadium.slug === selected.slug
                    ? "border-grass bg-grass text-black"
                    : "border-white/15 bg-black/45 text-foreground/90 hover:border-grass/50"
                )}
              >
                {stadium.flag} {stadium.name.replace("New York New Jersey Stadium", "NY/NJ 2026")}
              </button>
            ))}
          </nav>
          {/* máscaras de fade — há mais conteúdo rolável nas laterais */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#0b0d10] to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#0b0d10] to-transparent"
          />
        </div>
      )}

      {/* dica de gravação no modo cinema — contextual por plataforma */}
      {cinema && isMobile !== null && (
        <p className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-xs text-foreground/85 backdrop-blur-xl">
          {isMobile
            ? "🎬 Gravando? Use a gravação de tela do seu celular"
            : "🎬 Gravando? Win + Alt + R inicia a captura de tela do Windows"}
        </p>
      )}

      {/* marca d'água do modo cinema — assinatura dos vídeos gravados */}
      {cinema && (
        <div className="pointer-events-none absolute bottom-5 right-5 z-10 text-right [text-shadow:0_1px_10px_rgba(0,0,0,0.85)]">
          <p className="font-display text-lg uppercase leading-none text-foreground">
            As<span aria-hidden className="text-[0.8em]">🏆</span>Copas
          </p>
          <p className="mt-1 text-[11px] text-foreground/70">copa2026-alpha.vercel.app</p>
        </div>
      )}
    </div>
  );
}
