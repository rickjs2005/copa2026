"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { History, Sparkles } from "lucide-react";

/** Fundo: campo de futebol estilizado em SVG + brilhos de gradiente.
 *  Só CSS/SVG — nada de vídeo (LCP) e nada além de transform/opacity. */
function PitchBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[120px]" />
      <div className="absolute -bottom-52 -left-32 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[100px]" />
      <div className="absolute -right-32 top-1/3 h-[360px] w-[360px] rounded-full bg-emerald-400/8 blur-[100px]" />

      <svg
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-[0.09]"
      >
        <g fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-300">
          <circle cx="600" cy="350" r="130" />
          <circle cx="600" cy="350" r="4" fill="currentColor" />
          <line x1="600" y1="0" x2="600" y2="700" />
          <rect x="0" y="150" width="180" height="400" />
          <rect x="1020" y="150" width="180" height="400" />
          <rect x="0" y="250" width="70" height="200" />
          <rect x="1130" y="250" width="70" height="200" />
          <path d="M180 265 A120 120 0 0 1 180 435" />
          <path d="M1020 265 A120 120 0 0 0 1020 435" />
        </g>
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
    </div>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const anim = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.21, 0.65, 0.36, 1] as const },
        };

  return (
    <section className="relative isolate flex min-h-[calc(100dvh-4rem)] items-center">
      <PitchBackdrop />

      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
        <div className="max-w-3xl">
          <motion.p
            {...anim(0)}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300"
          >
            1930 — 2026 · 22 edições · 8 campeões
          </motion.p>

          <motion.h1
            {...anim(0.08)}
            className="text-balance text-5xl font-black leading-[1.02] tracking-tighter sm:text-7xl lg:text-8xl"
          >
            As Copas do{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Mundo
            </span>
          </motion.h1>

          <motion.p
            {...anim(0.16)}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            96 anos de finais, gênios e arenas que viraram lendas. Percorra a
            história — e entre nos estádios icônicos em 3D.
          </motion.p>

          <motion.div {...anim(0.24)} className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/estadios"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-400 px-7 text-sm font-bold text-black transition-transform hover:scale-[1.03] active:scale-[0.98] motion-reduce:transform-none"
            >
              <Sparkles aria-hidden className="h-4 w-4" />
              Estádios em 3D
            </Link>
            <Link
              href="/historia"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 text-sm font-semibold backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/10"
            >
              <History aria-hidden className="h-4 w-4" />
              Linha do tempo
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
