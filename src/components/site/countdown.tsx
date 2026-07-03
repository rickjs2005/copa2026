"use client";

import { useEffect, useState } from "react";

function diff(target: number) {
  const delta = Math.max(0, target - Date.now());
  return {
    days: Math.floor(delta / 86_400_000),
    hours: Math.floor(delta / 3_600_000) % 24,
    minutes: Math.floor(delta / 60_000) % 60,
    seconds: Math.floor(delta / 1_000) % 60,
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
 *  servidor e hidrata no cliente — zero CLS, zero mismatch. */
export function Countdown({ target }: { target: string }) {
  const [time, setTime] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    const ts = new Date(target).getTime();
    setTime(diff(ts));
    const id = setInterval(() => setTime(diff(ts)), 1000);
    return () => clearInterval(id);
  }, [target]);

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
