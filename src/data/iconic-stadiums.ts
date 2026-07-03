// ============================================================
// Estádios que definiram as Copas — modelos 3D PROCEDURAIS
// (formas estilizadas próprias; nenhum modelo/marca protegida).
// Cada estádio tem: um PERFIL de lathe próprio (silhueta),
// proporções sx/sz próprias e UM MARCO único (landmark).
// Os params alimentam o gerador paramétrico em stadium-model.tsx.
// ============================================================

/** Ponto do perfil revolucionado do bowl: [raio, altura]. */
export type BowlPoint = [radius: number, y: number];

/** Marco arquitetônico único de cada estádio (união discriminada). */
export type Landmark =
  /** Centenário: torre Art Déco lateral — caixas empilhadas afinando, topo emissivo. */
  | { kind: "deco-tower"; height: number; color: string; tipColor: string }
  /** Maracanã: anel de cobertura plano e largo sobressaindo p/ dentro + banda de assentos. */
  | {
      kind: "flat-ring";
      y: number;
      inner: number;
      outer: number;
      color: string;
      seatBand: { color: string; top: number; bottom: number; y: number; height: number };
    }
  /** Wembley: arco gigante atravessando por cima (arc em radianos, tilt em graus). */
  | { kind: "arch"; radius: number; tube: number; arc: number; tiltDeg: number; color: string; emissive: string; ringColor: string }
  /** Azteca: canopy inclinada pendurada sobre as arquibancadas. */
  | { kind: "hanging-canopy"; topRadius: number; bottomRadius: number; height: number; y: number; color: string }
  /** Rose Bowl: só torres de luz finas — anfiteatro a céu aberto. */
  | { kind: "light-towers"; count: number; height: number; radius: number }
  /** Soccer City: anéis horizontais em tons de terra revestindo a cabaça (mosaico). */
  | { kind: "calabash-rings"; bands: number; colors: string[] }
  /** Lusail: coroa luminosa dourada no topo. */
  | { kind: "crown"; radius: number; y: number; color: string; intensity: number }
  /** MetLife: lâminas verticais de aço instanciadas ao redor do perímetro. */
  | {
      kind: "steel-blades";
      count: number;
      height: number;
      radius: number;
      width: number;
      color: string;
      topRingColor: string;
    };

export type StadiumParams = {
  /** escala horizontal da elipse (x = largura, z = profundidade) */
  sx: number;
  sz: number;
  /** perfil da arquibancada revolucionado (LatheGeometry) */
  profile: BowlPoint[];
  /** suaviza o perfil com Catmull-Rom (cabaça, Lusail) */
  smooth?: boolean;
  bowlColor: string;
  roughness: number;
  metalness: number;
  /** cor de destaque (usada também pela luz da cena) */
  accentColor: string;
  /** banda emissiva interna (glow do evento) */
  glow: number;
  glowR: number;
  glowY: number;
  landmark: Landmark;
};

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
  params: StadiumParams;
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
    params: {
      // bowl raso e aberto, concreto claro envelhecido
      sx: 1.0,
      sz: 0.86,
      profile: [
        [4.6, 0.04],
        [4.6, 0.3],
        [5.7, 0.55],
        [7.3, 1.0],
        [7.55, 1.0],
        [7.6, 0.04],
      ],
      bowlColor: "#cfc7b4",
      roughness: 0.95,
      metalness: 0.0,
      accentColor: "#7ec8ff",
      glow: 0.5,
      glowR: 4.63,
      glowY: 0.5,
      // Torre de los Homenajes estilizada: ~2.5× a altura do bowl
      landmark: { kind: "deco-tower", height: 2.5, color: "#d9d2c0", tipColor: "#ffd98a" },
    },
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
    params: {
      // o mais LARGO de todos, bowl baixo
      sx: 1.42,
      sz: 1.2,
      profile: [
        [4.6, 0.04],
        [4.6, 0.32],
        [5.9, 0.68],
        [7.3, 1.12],
        [7.5, 1.12],
        [7.55, 0.04],
      ],
      bowlColor: "#ded8ca",
      roughness: 0.9,
      metalness: 0.05,
      accentColor: "#34d399",
      glow: 0.9,
      glowR: 4.63,
      glowY: 0.55,
      // anel de cobertura branco, plano, sobressaindo para dentro + assentos azuis
      landmark: {
        kind: "flat-ring",
        y: 1.24,
        inner: 3.85,
        outer: 7.95,
        color: "#f6f3ea",
        seatBand: { color: "#2e6fd8", top: 5.9, bottom: 5.15, y: 0.62, height: 0.5 },
      },
    },
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
    params: {
      // bowl prata médio — o arco domina a silhueta
      sx: 0.98,
      sz: 0.85,
      profile: [
        [4.6, 0.05],
        [4.6, 0.5],
        [5.5, 1.05],
        [6.9, 1.9],
        [7.15, 1.9],
        [7.2, 0.05],
      ],
      bowlColor: "#d7dade",
      roughness: 0.45,
      metalness: 0.55,
      accentColor: "#7ec8ff",
      glow: 1.0,
      glowR: 4.63,
      glowY: 1.0,
      // raio ~1.6× o do estádio (7.2 → 10.5 c/ margem), tubo grosso, ~15° de inclinação
      landmark: {
        kind: "arch",
        radius: 10.5,
        tube: 0.28,
        arc: 2.1,
        tiltDeg: 15,
        color: "#eef1f5",
        emissive: "#9fd4ff",
        ringColor: "#e3e6ec",
      },
    },
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
    params: {
      // o mais ALTO e fundo; retangular (rz bem menor), concreto cru escuro
      sx: 1.12,
      sz: 0.74,
      profile: [
        [4.6, 0.05],
        [4.6, 0.45],
        [5.3, 1.3],
        [6.3, 2.5],
        [6.95, 3.35],
        [7.15, 3.35],
        [7.2, 0.05],
      ],
      bowlColor: "#7e7566",
      roughness: 1.0,
      metalness: 0.0,
      accentColor: "#ffd166",
      glow: 0.7,
      glowR: 4.63,
      glowY: 1.5,
      // canopy inclinada pendurada sobre as arquibancadas
      landmark: {
        kind: "hanging-canopy",
        topRadius: 7.35,
        bottomRadius: 5.35,
        height: 1.0,
        y: 2.95,
        color: "#5f594c",
      },
    },
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
    params: {
      // o oposto do Azteca: rasíssimo, enorme, céu aberto, tons areia/rosado
      sx: 1.32,
      sz: 1.24,
      profile: [
        [4.6, 0.03],
        [4.6, 0.18],
        [6.1, 0.42],
        [7.9, 0.9],
        [8.15, 0.9],
        [8.2, 0.03],
      ],
      bowlColor: "#e2cba9",
      roughness: 1.0,
      metalness: 0.0,
      accentColor: "#ff9f7e",
      glow: 0.45,
      glowR: 4.63,
      glowY: 0.42,
      // só torres de luz finas — anfiteatro antigo
      landmark: { kind: "light-towers", count: 6, height: 2.7, radius: 8.9 },
    },
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
    params: {
      // CABAÇA: barriga p/ fora no meio, boca menor no topo (perfil suavizado)
      sx: 1.0,
      sz: 0.92,
      profile: [
        [5.0, 0.0],
        [6.3, 0.5],
        [6.95, 1.4],
        [6.55, 2.15],
        [5.5, 2.6],
        [4.95, 2.8],
      ],
      smooth: true,
      bowlColor: "#b0603a",
      roughness: 0.85,
      metalness: 0.0,
      accentColor: "#ffb454",
      glow: 0.85,
      glowR: 4.7,
      glowY: 2.3,
      // mosaico: anéis horizontais alternando terracota/âmbar/marrom
      landmark: {
        kind: "calabash-rings",
        bands: 11,
        colors: ["#8f4a28", "#c8763f", "#e5a25a", "#a05630", "#d88a49", "#7a3f22"],
      },
    },
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
    params: {
      // dourado metálico com CINTURA côncava elegante — a 'joia'
      sx: 1.05,
      sz: 0.98,
      profile: [
        [5.95, 0.02],
        [5.4, 0.7],
        [5.2, 1.35],
        [5.55, 2.0],
        [6.6, 2.6],
      ],
      smooth: true,
      bowlColor: "#c9973f",
      roughness: 0.22,
      metalness: 0.9,
      accentColor: "#ffd166",
      glow: 1.15,
      glowR: 5.0,
      glowY: 1.35,
      // coroa luminosa no topo
      landmark: { kind: "crown", radius: 6.5, y: 2.62, color: "#ffd98a", intensity: 1.4 },
    },
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
    params: {
      // moderno: cinza-metálico frio, topo plano tecnológico, glow azul interno
      sx: 1.15,
      sz: 0.95,
      profile: [
        [4.6, 0.05],
        [4.6, 0.5],
        [5.7, 1.5],
        [6.6, 2.55],
        [6.8, 2.55],
        [6.85, 0.05],
      ],
      bowlColor: "#8f97a3",
      roughness: 0.35,
      metalness: 0.8,
      accentColor: "#4db8ff",
      glow: 1.05,
      glowR: 4.63,
      glowY: 1.4,
      // anel de lâminas verticais de aço com frestas (instanciadas)
      landmark: {
        kind: "steel-blades",
        count: 64,
        height: 3.05,
        radius: 7.05,
        width: 0.42,
        color: "#b9c1cc",
        topRingColor: "#2a2f36",
      },
    },
  },
];

export const ICONIC_BY_SLUG = new Map(ICONIC_STADIUMS.map((s) => [s.slug, s]));
