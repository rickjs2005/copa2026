const TIME_ZONE = "America/Sao_Paulo";

export function formatKickoffTime(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  }).format(new Date(iso));
}

export function formatKickoffDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    timeZone: TIME_ZONE,
  }).format(new Date(iso));
}

export function formatFullDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(new Date(iso));
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("pt-BR").format(n);
}

/** Agrupa partidas por dia (chave legível pt-BR, fuso de Brasília). */
export function groupByDay<T extends { kickoff: string }>(items: T[]) {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const key = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      timeZone: TIME_ZONE,
    }).format(new Date(item.kickoff));
    const list = map.get(key) ?? [];
    list.push(item);
    map.set(key, list);
  }
  return [...map.entries()];
}
