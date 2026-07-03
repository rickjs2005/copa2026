"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/** Fundo: linhas de campo em SVG recoloridas + brilhos discretos.
 *  Sem vídeo (LCP) e sem nada além de transform/opacity. */
function PitchBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-44 left-1/2 h-[460px] w-[720px] -translate-x-1/2 rounded-full bg-grass/12 blur-[130px]" />
      <div className="absolute -bottom-56 -left-28 h-[380px] w-[380px] rounded-full bg-gold/8 blur-[110px]" />

      <svg
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-[0.08]"
      >
        <g fill="none" stroke="currentColor" strokeWidth="2" className="text-grass-light">
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

      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
    </div>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const anim = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease: [0.21, 0.65, 0.36, 1] as const },
        };

  return (
    <section className="relative isolate flex min-h-[calc(100dvh-4rem)] items-center">
      <PitchBackdrop />

      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
        <motion.p
          {...anim(0)}
          className="font-display text-sm tracking-[0.3em] text-gold"
        >
          1930 ★ 2026 · 23ª edição em jogo · 8 campeões
        </motion.p>

        <h1 className="mt-6">
          <motion.span
            {...anim(0.08)}
            className="font-display block text-[17vw] leading-[0.88] text-foreground sm:text-8xl lg:text-[9.5rem]"
          >
            As Copas
          </motion.span>
          <motion.span
            {...anim(0.16)}
            className="font-display text-outline block text-[17vw] leading-[0.88] sm:text-8xl lg:text-[9.5rem]"
          >
            do Mundo
          </motion.span>
        </h1>

        <motion.p
          {...anim(0.24)}
          className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          96 anos de finais, gênios e arenas que viraram lendas. Percorra a
          história — e entre nos estádios icônicos em 3D.
        </motion.p>

        <motion.div {...anim(0.32)} className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/estadios"
            className="font-display inline-flex min-h-13 items-center gap-3 bg-grass px-8 text-base tracking-wider text-[#0b0d09] transition-colors hover:bg-grass-light"
          >
            Estádios em 3D →
          </Link>
          <Link
            href="/historia"
            className="font-display inline-flex min-h-13 items-center gap-3 border border-foreground/25 px-8 text-base tracking-wider text-foreground transition-colors hover:border-gold hover:text-gold"
          >
            Linha do tempo
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
