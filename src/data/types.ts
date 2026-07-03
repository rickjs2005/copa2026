export type GroupId =
  | "A" | "B" | "C" | "D" | "E" | "F"
  | "G" | "H" | "I" | "J" | "K" | "L";

export type Team = {
  slug: string;
  name: string;
  code: string; // sigla FIFA de 3 letras
  flag: string; // emoji — sem escudos protegidos por direitos autorais
  group: GroupId;
  fifaRanking: number;
  titles: number;
  appearances: number;
  coach: string;
  star: string;
  history: string;
  highlights: string[]; // jogadores destaque
};

export type MatchStatus = "agendado" | "ao-vivo" | "encerrado";

export type MatchStage =
  | "Fase de grupos"
  | "32 avos de final"
  | "Oitavas de final"
  | "Quartas de final"
  | "Semifinal"
  | "Disputa de 3º lugar"
  | "Final";

export type Match = {
  id: string;
  stage: MatchStage;
  group?: GroupId;
  kickoff: string; // ISO 8601 UTC
  stadium: string; // slug
  home: string; // slug do time ou rótulo ("Vencedor QF1")
  away: string;
  homeScore: number | null;
  awayScore: number | null;
  status: MatchStatus;
};

export type Stadium = {
  slug: string;
  name: string;
  city: string;
  country: "Estados Unidos" | "México" | "Canadá";
  countryFlag: string;
  capacity: number;
  description: string;
  /** posição aproximada no mapa estilizado (0–100) */
  map: { x: number; y: number };
};

export type GroupStanding = {
  team: string; // slug
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
};

export type ScorerStat = { player: string; team: string; goals: number };
export type AssistStat = { player: string; team: string; assists: number };
export type CardStat = { team: string; yellow: number; red: number };

export type HistoryEntry = {
  year: number;
  host: string;
  champion: string;
  championFlag: string;
  runnerUp: string;
  finalScore: string;
  fact: string;
};

export type Curiosity = { title: string; text: string; tag: string };

export type NewsItem = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string; // ISO
  readingMinutes: number;
};

export type FaqItem = { question: string; answer: string };

export type BracketRound = {
  name: MatchStage;
  matches: string[]; // ids de Match
};
