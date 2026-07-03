// ============================================================
// Fachada de dados — hoje serve módulos estáticos tipados;
// amanhã troca por fetch() de uma API oficial sem tocar nas
// páginas. Todas as funções são async por esse motivo.
// ============================================================

import { MATCHES, MATCHES_BY_ID, BRACKET, FINAL_KICKOFF } from "@/data/matches";
import { TEAMS, getTeam } from "@/data/teams";
import { STADIUMS, getStadium } from "@/data/stadiums";
import { GROUPS, getGroupStandings, getTeamsOfGroup } from "@/data/standings";
import { TOP_SCORERS, TOP_ASSISTS, CARDS, TOURNAMENT_TOTALS } from "@/data/stats";
import { HISTORY } from "@/data/history";
import { CURIOSITIES } from "@/data/curiosities";
import { NEWS } from "@/data/news";
import { FAQ } from "@/data/faq";
import type { Match } from "@/data/types";

const DAY_MS = 86_400_000;

/** "Hoje" fixado na data de referência do dataset de demonstração —
 *  com API real, troque por new Date(). */
export const REFERENCE_NOW = new Date("2026-07-02T18:00:00Z");

function isSameUtcDay(a: Date, b: Date) {
  return a.toISOString().slice(0, 10) === b.toISOString().slice(0, 10);
}

export async function getTodayMatches(): Promise<Match[]> {
  return MATCHES.filter((m) => isSameUtcDay(new Date(m.kickoff), REFERENCE_NOW));
}

export async function getUpcomingMatches(limit = 12): Promise<Match[]> {
  return MATCHES.filter(
    (m) => m.status === "agendado" && new Date(m.kickoff).getTime() > REFERENCE_NOW.getTime() + DAY_MS / 4
  )
    .sort((a, b) => a.kickoff.localeCompare(b.kickoff))
    .slice(0, limit);
}

export async function getResults(limit = 12): Promise<Match[]> {
  return MATCHES.filter((m) => m.status === "encerrado")
    .sort((a, b) => b.kickoff.localeCompare(a.kickoff))
    .slice(0, limit);
}

export async function getLiveMatches(): Promise<Match[]> {
  return MATCHES.filter((m) => m.status === "ao-vivo");
}

export async function getBracket() {
  return BRACKET.map((round) => ({
    name: round.name,
    matches: round.matches
      .map((id) => MATCHES_BY_ID.get(id))
      .filter((m): m is Match => Boolean(m)),
  }));
}

export async function getGroups() {
  return GROUPS.map((id) => ({
    id,
    standings: getGroupStandings(id),
    teams: getTeamsOfGroup(id),
  }));
}

export async function getAllTeams() {
  return [...TEAMS].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}

export async function getTeamBySlug(slug: string) {
  return getTeam(slug);
}

export async function getTeamMatches(slug: string): Promise<Match[]> {
  return MATCHES.filter((m) => m.home === slug || m.away === slug).sort((a, b) =>
    a.kickoff.localeCompare(b.kickoff)
  );
}

export async function getAllStadiums() {
  return STADIUMS;
}

export async function getStadiumBySlug(slug: string) {
  return getStadium(slug);
}

export async function getStats() {
  return { scorers: TOP_SCORERS, assists: TOP_ASSISTS, cards: CARDS, totals: TOURNAMENT_TOTALS };
}

export async function getHistory() {
  return [...HISTORY].sort((a, b) => b.year - a.year);
}

export async function getCuriosities() {
  return CURIOSITIES;
}

export async function getNews() {
  return [...NEWS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getFaq() {
  return FAQ;
}

export function getFinalKickoff() {
  return FINAL_KICKOFF;
}
