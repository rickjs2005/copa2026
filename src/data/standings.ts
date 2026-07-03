import type { GroupId, GroupStanding } from "./types";
import { TEAMS } from "./teams";

// [vitórias, empates, derrotas, gols pró, gols contra] — fase de grupos
// encerrada (3 jogos). Dados de demonstração, prontos para API oficial.
type Row = [slug: string, w: number, d: number, l: number, gf: number, ga: number];

const RESULTS: Record<GroupId, Row[]> = {
  A: [["mexico", 2, 1, 0, 5, 2], ["coreia-do-sul", 2, 0, 1, 4, 3], ["polonia", 1, 1, 1, 3, 3], ["africa-do-sul", 0, 0, 3, 1, 5]],
  B: [["dinamarca", 2, 1, 0, 6, 2], ["equador", 2, 0, 1, 4, 2], ["canada", 1, 1, 1, 4, 4], ["gana", 0, 0, 3, 1, 7]],
  C: [["brasil", 3, 0, 0, 7, 1], ["marrocos", 2, 0, 1, 4, 2], ["croacia", 1, 0, 2, 3, 4], ["escocia", 0, 0, 3, 0, 7]],
  D: [["estados-unidos", 2, 1, 0, 6, 2], ["suica", 1, 2, 0, 3, 1], ["costa-do-marfim", 1, 0, 2, 3, 5], ["paraguai", 0, 1, 2, 1, 5]],
  E: [["argentina", 3, 0, 0, 8, 1], ["noruega", 2, 0, 1, 6, 3], ["argelia", 1, 0, 2, 2, 5], ["australia", 0, 0, 3, 1, 8]],
  F: [["franca", 2, 1, 0, 7, 2], ["japao", 2, 1, 0, 5, 2], ["senegal", 1, 0, 2, 3, 4], ["panama", 0, 0, 3, 0, 7]],
  G: [["inglaterra", 2, 1, 0, 5, 1], ["colombia", 2, 1, 0, 4, 1], ["tunisia", 1, 0, 2, 2, 4], ["nova-zelandia", 0, 0, 3, 0, 5]],
  H: [["espanha", 3, 0, 0, 9, 2], ["uruguai", 2, 0, 1, 5, 3], ["egito", 1, 0, 2, 3, 5], ["honduras", 0, 0, 3, 1, 8]],
  I: [["portugal", 2, 1, 0, 6, 2], ["nigeria", 2, 0, 1, 5, 3], ["uzbequistao", 1, 1, 1, 3, 4], ["chile", 0, 0, 3, 2, 7]],
  J: [["alemanha", 2, 1, 0, 6, 1], ["suecia", 2, 0, 1, 5, 3], ["catar", 1, 0, 2, 2, 5], ["peru", 0, 1, 2, 1, 5]],
  K: [["belgica", 2, 1, 0, 5, 2], ["italia", 2, 1, 0, 4, 1], ["iran", 1, 0, 2, 2, 4], ["costa-rica", 0, 0, 3, 1, 5]],
  L: [["holanda", 2, 1, 0, 6, 2], ["servia", 1, 2, 0, 4, 2], ["arabia-saudita", 1, 0, 2, 3, 5], ["jordania", 0, 1, 2, 1, 5]],
};

export const GROUPS: GroupId[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

export function getGroupStandings(group: GroupId): GroupStanding[] {
  return RESULTS[group].map(([team, won, drawn, lost, goalsFor, goalsAgainst]) => ({
    team,
    played: won + drawn + lost,
    won,
    drawn,
    lost,
    goalsFor,
    goalsAgainst,
    points: won * 3 + drawn,
  }));
}

export function getTeamsOfGroup(group: GroupId) {
  return TEAMS.filter((t) => t.group === group);
}
