"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function diff(target: number) {
  const delta = target - Date.now();
  return {
    done: delta <= 0,
    days: Math.max(0, Math.floor(delta / 86_400_000)),
    hours: Math.max(0, Math.floor(delta / 3_600_000) % 24),
    minutes: Math.max(0, Math.floor(delta / 60_000) % 60),
    seconds: Math.max(0, Math.floor(delta / 1_000) % 60),
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center border border-border bg-card px-4 py-3 sm:px-7 sm:py-5">
      <span className="font-display text-4xl tabular-nums sm:text-6xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
        {label}
      </span>
    </div>
  );
}

/** Contagem regressiva para a final. Renderiza placeholder estável no
 *  servidor e hidrata no cliente — zero CLS, zero mismatch.
 *  Quando o alvo passa, vira um bloco editorial pós-final. */
export function Countdown({ target }: { target: string }) {
  const [time, setTime] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    const ts = new Date(target).getTime();
    setTime(diff(ts));
    const id = setInterval(() => setTime(diff(ts)), 1000);
    return () => clearInterval(id);
  }, [target]);

  // pós-final: nada de dígitos congelados em 00:00:00
  if (time?.done) {
    return (
      <div
        role="status"
        aria-label="A grande final já aconteceu"
        className="flex flex-col items-center gap-4 border border-border bg-card px-6 py-10 text-center sm:px-14"
      >
        <span aria-hidden className="text-4xl sm:text-5xl">
          🏆
        </span>
        <p className="font-display text-3xl">A grande final aconteceu</p>
        <p className="text-sm text-muted-foreground sm:text-base">
          19 de julho de 2026 · New York New Jersey Stadium
        </p>
        <Link
          href="/historia"
          className="font-display mt-2 inline-flex min-h-12 items-center gap-2 border border-gold px-7 text-sm tracking-wider text-gold transition-colors hover:bg-gold hover:text-black"
        >
          Reviva a história das Copas →
        </Link>
      </div>
    );
  }

  const t = time ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <div
      role="timer"
      aria-label="Contagem regressiva para a final"
      className={time ? "flex gap-3 sm:gap-4" : "flex gap-3 opacity-40 sm:gap-4"}
    >
      <Unit value={t.days} label="dias" />
      <Unit value={t.hours} label="horas" />
      <Unit value={t.minutes} label="min" />
      <Unit value={t.seconds} label="seg" />
    </div>
  );
}
