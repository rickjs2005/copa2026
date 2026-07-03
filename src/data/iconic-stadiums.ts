// ============================================================
// Estádios que definiram as Copas — modelos 3D PROCEDURAIS
// (formas estilizadas próprias; nenhum modelo/marca protegida).
// Os params alimentam o gerador paramétrico em stadium-model.tsx.
// ============================================================

export type StadiumRoof = "ring" | "arch" | "shell" | "open" | "crown";

export type IconicStadium = {
  slug: string;
  name: string;
  city: string;
  country: string;
  flag: string;
  cups: string; // edições marcantes
  capacity: string;
  headline: string;
  fact: string;
  params: {
    /** raio da elipse do anel (x = largura, z = profundidade) */
    rx: number;
    rz: number;
    /** altura da arquibancada */
    height: number;
    /** inclinação de abertura do bowl (0–1) */
    flare: number;
    roof: StadiumRoof;
    bowlColor: string;
    roofColor: string;
    accentColor: string;
    /** intensidade do brilho noturno */
    glow: number;
    /** metalico (Lusail dourado) */
    metal?: boolean;
  };
};

export const ICONIC_STADIUMS: IconicStadium[] = [
  {
    slug: "centenario",
    name: "Estádio Centenário",
    city: "Montevidéu",
    country: "Uruguai",
    flag: "🇺🇾",
    cups: "Copa de 1930 — a primeira final",
    capacity: "60.000",
    headline: "Onde tudo começou",
    fact: "Construído em apenas 9 meses para a primeira Copa, viu o Uruguai vencer a Argentina por 4 a 2 na final inaugural. É o único estádio declarado Monumento Histórico do Futebol Mundial pela FIFA.",
    params: { rx: 6.6, rz: 5.4, height: 1.5, flare: 0.55, roof: "open", bowlColor: "#c9c2b4", roofColor: "#c9c2b4", accentColor: "#7ec8ff", glow: 0.5 },
  },
  {
    slug: "maracana",
    name: "Maracanã",
    city: "Rio de Janeiro",
    country: "Brasil",
    flag: "🇧🇷",
    cups: "Finais de 1950 e 2014",
    capacity: "78.838",
    headline: "O templo do futebol",
    fact: "Recebeu quase 200 mil pessoas na final de 1950 — o maior público da história do esporte. 64 anos depois, foi palco da final de 2014. Nenhum outro estádio sediou duas finais de Copa.",
    params: { rx: 7.2, rz: 6.4, height: 1.7, flare: 0.4, roof: "ring", bowlColor: "#ded9cd", roofColor: "#f2efe6", accentColor: "#34d399", glow: 0.9 },
  },
  {
    slug: "wembley",
    name: "Wembley",
    city: "Londres",
    country: "Inglaterra",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    cups: "Final de 1966",
    capacity: "90.000",
    headline: "O arco sobre a história",
    fact: "No Wembley original, a Inglaterra venceu sua única Copa, em 1966, com o gol mais debatido de todos os tempos. O novo estádio ergueu um arco de 133 metros visível de toda Londres.",
    params: { rx: 7.0, rz: 5.8, height: 2.1, flare: 0.35, roof: "arch", bowlColor: "#d8dade", roofColor: "#eceef2", accentColor: "#7ec8ff", glow: 1.0 },
  },
  {
    slug: "azteca",
    name: "Estádio Azteca",
    city: "Cidade do México",
    country: "México",
    flag: "🇲🇽",
    cups: "Finais de 1970 e 1986 · abertura de 2026",
    capacity: "83.264",
    headline: "O gigante da altitude",
    fact: "Único palco de duas finais com Pelé (1970) e Maradona (1986) coroados. A 2.200 metros de altitude, viu a 'Mão de Deus' e o 'Gol do Século' no mesmo jogo — e abriu a Copa de 2026.",
    params: { rx: 7.4, rz: 6.0, height: 2.3, flare: 0.25, roof: "shell", bowlColor: "#b8aa96", roofColor: "#8f8474", accentColor: "#ffd166", glow: 0.7 },
  },
  {
    slug: "rose-bowl",
    name: "Rose Bowl",
    city: "Pasadena",
    country: "Estados Unidos",
    flag: "🇺🇸",
    cups: "Final de 1994",
    capacity: "92.542",
    headline: "O anfiteatro da Califórnia",
    fact: "A final de 1994 — Brasil campeão nos pênaltis sobre a Itália — aconteceu neste anfiteatro a céu aberto de 1922, cravado entre montanhas. Foi a primeira final decidida por pênaltis.",
    params: { rx: 6.8, rz: 6.2, height: 1.3, flare: 0.65, roof: "open", bowlColor: "#d9c8a8", roofColor: "#d9c8a8", accentColor: "#ff9f7e", glow: 0.45 },
  },
  {
    slug: "soccer-city",
    name: "Soccer City",
    city: "Joanesburgo",
    country: "África do Sul",
    flag: "🇿🇦",
    cups: "Final de 2010",
    capacity: "84.490",
    headline: "A cabaça africana",
    fact: "Inspirado na calabash — a cabaça tradicional africana —, recebeu a primeira final em solo africano ao som de milhões de vuvuzelas. A Espanha levantou ali sua primeira taça.",
    params: { rx: 6.9, rz: 6.3, height: 2.5, flare: -0.25, roof: "open", bowlColor: "#b0603a", roofColor: "#b0603a", accentColor: "#ffb454", glow: 0.8 },
  },
  {
    slug: "lusail",
    name: "Lusail",
    city: "Lusail",
    country: "Catar",
    flag: "🇶🇦",
    cups: "Final de 2022",
    capacity: "88.966",
    headline: "A taça dourada",
    fact: "O bowl dourado do deserto recebeu a final que muitos chamam de a maior de todas: Argentina 3 (4) × (2) 3 França, com hat-trick de Mbappé e a coroação de Messi.",
    params: { rx: 7.0, rz: 6.6, height: 2.2, flare: 0.3, roof: "crown", bowlColor: "#c9973f", roofColor: "#e3b45c", accentColor: "#ffd166", glow: 1.1, metal: true },
  },
  {
    slug: "metlife",
    name: "New York New Jersey Stadium",
    city: "East Rutherford",
    country: "Estados Unidos",
    flag: "🇺🇸",
    cups: "Final de 2026",
    capacity: "82.500",
    headline: "O palco da próxima história",
    fact: "Em 19 de julho de 2026, o colosso de aço a 15 minutos de Manhattan escreve o capítulo final da maior Copa já disputada — 48 seleções, 104 jogos, 3 países.",
    params: { rx: 7.3, rz: 6.1, height: 2.4, flare: 0.2, roof: "ring", bowlColor: "#9aa2ad", roofColor: "#c3c9d2", accentColor: "#7ec8ff", glow: 1.0, metal: true },
  },
];

export const ICONIC_BY_SLUG = new Map(ICONIC_STADIUMS.map((s) => [s.slug, s]));
