import type { AssistStat, CardStat, ScorerStat } from "./types";

// Estatísticas de DEMONSTRAÇÃO (fase de grupos + 32 avos) — prontas p/ API.
export const TOP_SCORERS: ScorerStat[] = [
  { player: "Kylian Mbappé", team: "franca", goals: 5 },
  { player: "Erling Haaland", team: "noruega", goals: 5 },
  { player: "Lamine Yamal", team: "espanha", goals: 4 },
  { player: "Vinícius Júnior", team: "brasil", goals: 4 },
  { player: "Julián Álvarez", team: "argentina", goals: 4 },
  { player: "Harry Kane", team: "inglaterra", goals: 3 },
  { player: "Santiago Giménez", team: "mexico", goals: 3 },
  { player: "Victor Osimhen", team: "nigeria", goals: 3 },
  { player: "Alexander Isak", team: "suecia", goals: 3 },
  { player: "Cristiano Ronaldo", team: "portugal", goals: 2 },
];

export const TOP_ASSISTS: AssistStat[] = [
  { player: "Lionel Messi", team: "argentina", assists: 4 },
  { player: "Lamine Yamal", team: "espanha", assists: 4 },
  { player: "Kevin De Bruyne", team: "belgica", assists: 3 },
  { player: "Rodrygo", team: "brasil", assists: 3 },
  { player: "Xavi Simons", team: "holanda", assists: 3 },
  { player: "Bukayo Saka", team: "inglaterra", assists: 2 },
  { player: "Achraf Hakimi", team: "marrocos", assists: 2 },
  { player: "Florian Wirtz", team: "alemanha", assists: 2 },
];

export const CARDS: CardStat[] = [
  { team: "argentina", yellow: 8, red: 0 },
  { team: "uruguai", yellow: 8, red: 1 },
  { team: "holanda", yellow: 7, red: 0 },
  { team: "marrocos", yellow: 6, red: 0 },
  { team: "mexico", yellow: 6, red: 1 },
  { team: "alemanha", yellow: 5, red: 0 },
  { team: "brasil", yellow: 4, red: 0 },
  { team: "espanha", yellow: 3, red: 0 },
];

export const TOURNAMENT_TOTALS = {
  matchesPlayed: 79,
  goals: 214,
  goalsPerMatch: 2.71,
  yellowCards: 289,
  redCards: 9,
  attendanceAvg: 61240,
};
