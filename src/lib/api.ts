// ============================================================
// Fachada de dados — módulos estáticos tipados hoje; API/CMS
// amanhã sem tocar nas páginas (por isso tudo é async).
// ============================================================

import { HISTORY } from "@/data/history";
import { CURIOSITIES } from "@/data/curiosities";
import { ICONIC_STADIUMS, ICONIC_BY_SLUG } from "@/data/iconic-stadiums";

/** Final da Copa de 2026 — MetLife, 19 de julho, 16h de Brasília. */
export const FINAL_KICKOFF = "2026-07-19T19:00:00Z";

export async function getHistory() {
  return [...HISTORY].sort((a, b) => b.year - a.year);
}

export async function getCuriosities() {
  return CURIOSITIES;
}

export async function getIconicStadiums() {
  return ICONIC_STADIUMS;
}

export async function getIconicStadium(slug: string) {
  return ICONIC_BY_SLUG.get(slug);
}

export function getFinalKickoff() {
  return FINAL_KICKOFF;
}
