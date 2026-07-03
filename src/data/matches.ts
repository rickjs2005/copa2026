import type { BracketRound, Match } from "./types";

// ============================================================
// Calendário de DEMONSTRAÇÃO alinhado ao formato real de 2026
// (104 jogos; 32 avos até 3/jul, oitavas 4–7/jul, quartas 9–11,
// semis 14–15, 3º lugar 18, final 19/jul no MetLife).
// Placares e confrontos são fictícios — prontos p/ API oficial.
// ============================================================

export const MATCHES: Match[] = [
  // ---------- Resultados recentes (32 avos encerrados) ----------
  { id: "r32-01", stage: "32 avos de final", kickoff: "2026-06-29T16:00:00Z", stadium: "sofi", home: "argentina", away: "australia", homeScore: 2, awayScore: 0, status: "encerrado" },
  { id: "r32-02", stage: "32 avos de final", kickoff: "2026-06-29T20:00:00Z", stadium: "lumen", home: "espanha", away: "chile", homeScore: 3, awayScore: 1, status: "encerrado" },
  { id: "r32-03", stage: "32 avos de final", kickoff: "2026-06-30T16:00:00Z", stadium: "azteca", home: "mexico", away: "dinamarca", homeScore: 1, awayScore: 1, status: "encerrado" },
  { id: "r32-04", stage: "32 avos de final", kickoff: "2026-06-30T20:00:00Z", stadium: "att-dallas", home: "franca", away: "colombia", homeScore: 2, awayScore: 1, status: "encerrado" },
  { id: "r32-05", stage: "32 avos de final", kickoff: "2026-07-01T16:00:00Z", stadium: "gillette", home: "inglaterra", away: "costa-do-marfim", homeScore: 2, awayScore: 0, status: "encerrado" },
  { id: "r32-06", stage: "32 avos de final", kickoff: "2026-07-01T20:00:00Z", stadium: "bmo-field", home: "alemanha", away: "equador", homeScore: 1, awayScore: 0, status: "encerrado" },
  { id: "r32-07", stage: "32 avos de final", kickoff: "2026-07-01T23:00:00Z", stadium: "bbva", home: "marrocos", away: "suecia", homeScore: 2, awayScore: 1, status: "encerrado" },

  // ---------- Jogos de HOJE (2 de julho) ----------
  { id: "r32-08", stage: "32 avos de final", kickoff: "2026-07-02T16:00:00Z", stadium: "lincoln-financial", home: "brasil", away: "coreia-do-sul", homeScore: 1, awayScore: 0, status: "ao-vivo" },
  { id: "r32-09", stage: "32 avos de final", kickoff: "2026-07-02T19:00:00Z", stadium: "arrowhead", home: "estados-unidos", away: "nigeria", homeScore: null, awayScore: null, status: "agendado" },
  { id: "r32-10", stage: "32 avos de final", kickoff: "2026-07-02T22:00:00Z", stadium: "hard-rock", home: "portugal", away: "japao", homeScore: null, awayScore: null, status: "agendado" },
  { id: "r32-11", stage: "32 avos de final", kickoff: "2026-07-03T01:00:00Z", stadium: "levis", home: "uruguai", away: "senegal", homeScore: null, awayScore: null, status: "agendado" },

  // ---------- Próximos (32 avos de 3/jul + oitavas) ----------
  { id: "r32-12", stage: "32 avos de final", kickoff: "2026-07-03T17:00:00Z", stadium: "nrg", home: "holanda", away: "egito", homeScore: null, awayScore: null, status: "agendado" },
  { id: "r32-13", stage: "32 avos de final", kickoff: "2026-07-03T20:00:00Z", stadium: "mercedes-benz", home: "italia", away: "noruega", homeScore: null, awayScore: null, status: "agendado" },
  { id: "r32-14", stage: "32 avos de final", kickoff: "2026-07-03T23:30:00Z", stadium: "akron", home: "croacia", away: "belgica", homeScore: null, awayScore: null, status: "agendado" },

  { id: "r16-01", stage: "Oitavas de final", kickoff: "2026-07-04T17:00:00Z", stadium: "lincoln-financial", home: "argentina", away: "mexico", homeScore: null, awayScore: null, status: "agendado" },
  { id: "r16-02", stage: "Oitavas de final", kickoff: "2026-07-04T21:00:00Z", stadium: "att-dallas", home: "espanha", away: "marrocos", homeScore: null, awayScore: null, status: "agendado" },
  { id: "r16-03", stage: "Oitavas de final", kickoff: "2026-07-05T17:00:00Z", stadium: "metlife", home: "franca", away: "inglaterra", homeScore: null, awayScore: null, status: "agendado" },
  { id: "r16-04", stage: "Oitavas de final", kickoff: "2026-07-05T21:00:00Z", stadium: "sofi", home: "alemanha", away: "Vencedor J8", homeScore: null, awayScore: null, status: "agendado" },
  { id: "r16-05", stage: "Oitavas de final", kickoff: "2026-07-06T17:00:00Z", stadium: "arrowhead", home: "Vencedor J9", away: "Vencedor J10", homeScore: null, awayScore: null, status: "agendado" },
  { id: "r16-06", stage: "Oitavas de final", kickoff: "2026-07-06T21:00:00Z", stadium: "nrg", home: "Vencedor J11", away: "Vencedor J12", homeScore: null, awayScore: null, status: "agendado" },
  { id: "r16-07", stage: "Oitavas de final", kickoff: "2026-07-07T17:00:00Z", stadium: "bc-place", home: "Vencedor J13", away: "Vencedor J14", homeScore: null, awayScore: null, status: "agendado" },
  { id: "r16-08", stage: "Oitavas de final", kickoff: "2026-07-07T21:00:00Z", stadium: "azteca", home: "Vencedor J15", away: "Vencedor J16", homeScore: null, awayScore: null, status: "agendado" },

  // ---------- Quartas, semis, decisões ----------
  { id: "qf-01", stage: "Quartas de final", kickoff: "2026-07-09T20:00:00Z", stadium: "gillette", home: "Vencedor O1", away: "Vencedor O2", homeScore: null, awayScore: null, status: "agendado" },
  { id: "qf-02", stage: "Quartas de final", kickoff: "2026-07-10T20:00:00Z", stadium: "sofi", home: "Vencedor O3", away: "Vencedor O4", homeScore: null, awayScore: null, status: "agendado" },
  { id: "qf-03", stage: "Quartas de final", kickoff: "2026-07-11T17:00:00Z", stadium: "arrowhead", home: "Vencedor O5", away: "Vencedor O6", homeScore: null, awayScore: null, status: "agendado" },
  { id: "qf-04", stage: "Quartas de final", kickoff: "2026-07-11T21:00:00Z", stadium: "hard-rock", home: "Vencedor O7", away: "Vencedor O8", homeScore: null, awayScore: null, status: "agendado" },
  { id: "sf-01", stage: "Semifinal", kickoff: "2026-07-14T20:00:00Z", stadium: "att-dallas", home: "Vencedor Q1", away: "Vencedor Q2", homeScore: null, awayScore: null, status: "agendado" },
  { id: "sf-02", stage: "Semifinal", kickoff: "2026-07-15T20:00:00Z", stadium: "mercedes-benz", home: "Vencedor Q3", away: "Vencedor Q4", homeScore: null, awayScore: null, status: "agendado" },
  { id: "third", stage: "Disputa de 3º lugar", kickoff: "2026-07-18T19:00:00Z", stadium: "hard-rock", home: "Perdedor S1", away: "Perdedor S2", homeScore: null, awayScore: null, status: "agendado" },
  { id: "final", stage: "Final", kickoff: "2026-07-19T19:00:00Z", stadium: "metlife", home: "Vencedor S1", away: "Vencedor S2", homeScore: null, awayScore: null, status: "agendado" },
];

export const FINAL_KICKOFF = "2026-07-19T19:00:00Z";

export const BRACKET: BracketRound[] = [
  { name: "Oitavas de final", matches: ["r16-01", "r16-02", "r16-03", "r16-04", "r16-05", "r16-06", "r16-07", "r16-08"] },
  { name: "Quartas de final", matches: ["qf-01", "qf-02", "qf-03", "qf-04"] },
  { name: "Semifinal", matches: ["sf-01", "sf-02"] },
  { name: "Final", matches: ["final"] },
];

export const MATCHES_BY_ID = new Map(MATCHES.map((m) => [m.id, m]));
