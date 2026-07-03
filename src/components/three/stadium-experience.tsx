"use client";

import { useEffect, useState } from "react";
import { Clapperboard, Users, X } from "lucide-react";
import { ICONIC_STADIUMS } from "@/data/iconic-stadiums";
import { StadiumScene } from "./stadium-scene";
import { cn } from "@/lib/utils";

export function StadiumExperience() {
  const [selected, setSelected] = useState(ICONIC_STADIUMS[1]); // Maracanã abre o show
  const [cinema, setCinema] = useState(false);

  // ESC sai do modo cinema
  useEffect(() => {
    if (!cinema) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCinema(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cinema]);

  return (
    <div
      className={cn(
        "relative overflow-hidden border-white/10 bg-[#0b0d10]",
        cinema ? "fixed inset-0 z-[90]" : "rounded-3xl border"
      )}
    >
      <div className={cinema ? "h-dvh w-full" : "h-[68dvh] min-h-[480px] w-full"}>
        <StadiumScene stadium={selected} cinema={cinema} />
      </div>

      {/* painel de informações */}
      {!cinema && (
        <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col gap-3 p-5 sm:max-w-md sm:p-7">
          <div className="pointer-events-auto rounded-2xl border border-white/10 bg-black/55 p-5 backdrop-blur-xl sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
              {selected.headline}
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
              {selected.flag} {selected.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {selected.city}, {selected.country} · {selected.cups}
            </p>
            <p className="mt-3 hidden text-sm leading-relaxed text-zinc-300 sm:block">
              {selected.fact}
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users aria-hidden className="h-3.5 w-3.5 text-emerald-400" />
              Capacidade: {selected.capacity}
            </p>
          </div>
        </div>
      )}

      {/* botão modo cinema */}
      <button
        type="button"
        onClick={() => setCinema(!cinema)}
        className={cn(
          "absolute right-5 top-5 z-10 inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-sm font-semibold backdrop-blur-xl transition-colors",
          cinema
            ? "border-white/20 bg-black/60 text-white hover:bg-black/80"
            : "border-emerald-400/40 bg-emerald-400/15 text-emerald-300 hover:bg-emerald-400/25"
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
        <nav
          aria-label="Escolher estádio"
          className="absolute inset-x-0 bottom-0 flex gap-2 overflow-x-auto p-4 sm:justify-center sm:p-5"
        >
          {ICONIC_STADIUMS.map((stadium) => (
            <button
              key={stadium.slug}
              type="button"
              onClick={() => setSelected(stadium)}
              aria-pressed={stadium.slug === selected.slug}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-xs font-semibold backdrop-blur-xl transition-colors",
                stadium.slug === selected.slug
                  ? "border-emerald-400 bg-emerald-400 text-black"
                  : "border-white/15 bg-black/45 text-zinc-200 hover:border-emerald-400/50"
              )}
            >
              {stadium.flag} {stadium.name.replace("New York New Jersey Stadium", "NY/NJ 2026")}
            </button>
          ))}
        </nav>
      )}

      {/* dica de gravação no modo cinema */}
      {cinema && (
        <p className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-xs text-zinc-300 backdrop-blur-xl">
          🎬 Gravando? Win + Alt + R inicia a captura de tela do Windows
        </p>
      )}
    </div>
  );
}
