// ============================================================
// Mídia real e verificada
// - Imagens: Wikimedia Commons via Special:FilePath (todas
//   checadas com HTTP 200 + content-type image/* em 2026-07)
// - Vídeos: YouTube, ids validados via oEmbed (títulos reais)
// ============================================================

export type MediaImage = {
  /** URL https://commons.wikimedia.org/wiki/Special:FilePath/NOME?width=1200 */
  src: string;
  /** descrição em pt-BR */
  alt: string;
  /** legenda editorial curta em pt-BR */
  caption: string;
  /** "Foto: <autor> · Wikimedia Commons (<licença>)" */
  credit: string;
  /** slug quando for de estádio */
  stadium?:
    | "centenario"
    | "maracana"
    | "wembley"
    | "azteca"
    | "rose-bowl"
    | "soccer-city"
    | "lusail"
    | "metlife";
  /** quando ligada a uma edição da Copa */
  year?: number;
};

export const MEDIA_IMAGES: MediaImage[] = [
  // ---------------------------------------------------------- estádios
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Estadio_Centenario_(vista_a%C3%A9rea).jpg?width=1200",
    alt: "Vista aérea do Estádio Centenário, em Montevidéu, com a Torre dos Homenagens ao fundo",
    caption: "O Centenário visto do alto: aqui o futebol mundial disputou sua primeira final, em 1930.",
    credit: "Foto: Marcelo Campi · Wikimedia Commons (CC BY-SA 2.0)",
    stadium: "centenario",
    year: 1930,
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Maracana_Stadium_June_2013.jpg?width=1200",
    alt: "Interior do Maracanã visto da arquibancada, com gramado e cobertura branca",
    caption: "O templo do futebol: nenhum outro estádio recebeu duas finais de Copa do Mundo.",
    credit: "Foto: Governo do Brasil · Wikimedia Commons (CC BY 3.0 BR)",
    stadium: "maracana",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Wembley_Stadium,_illuminated.jpg?width=1200",
    alt: "Estádio de Wembley iluminado à noite, com o arco de 133 metros aceso",
    caption: "O arco de Wembley domina o céu de Londres — herdeiro do palco da final de 1966.",
    credit: "Foto: Rob (Reino Unido) · Wikimedia Commons (CC BY 2.0)",
    stadium: "wembley",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Estadio_Azteca_07a.jpg?width=1200",
    alt: "Interior do Estádio Azteca, na Cidade do México, com arquibancadas lotadas",
    caption: "O Azteca viu Pelé em 1970 e Maradona em 1986 — e abre sua terceira Copa em 2026.",
    credit: "Foto: Jymlii Manzo · Wikimedia Commons (CC BY 2.0)",
    stadium: "azteca",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Rose_Bowl,_panorama.jpg?width=1200",
    alt: "Panorama do Rose Bowl, em Pasadena, com as montanhas de San Gabriel ao fundo",
    caption: "O Rose Bowl, palco da final de 1994 — a primeira decidida nos pênaltis.",
    credit: "Foto: woo (Irvine, EUA) · Wikimedia Commons (CC BY 2.0)",
    stadium: "rose-bowl",
    year: 1994,
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/FNB_Stadium_(The_Calabash).jpg?width=1200",
    alt: "Fachada do FNB Stadium (Soccer City), em Joanesburgo, com painéis que imitam uma cabaça africana",
    caption: "Soccer City, a 'cabaça' de Joanesburgo: abertura e final da primeira Copa africana, em 2010.",
    credit: "Foto: Kabelo Serutle · Wikimedia Commons (CC BY-SA 4.0)",
    stadium: "soccer-city",
    year: 2010,
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Lusail_Iconic_Stadium_-_2022_FIFA_WC.jpg?width=1200",
    alt: "Estádio Lusail iluminado em tom dourado durante a Copa do Mundo de 2022",
    caption: "O dourado de Lusail: palco da final épica entre Argentina e França em 2022.",
    credit: "Foto: Hossein Zohrevand · Wikimedia Commons (CC BY 4.0)",
    stadium: "lusail",
    year: 2022,
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Metlife_stadium_(Aerial_view).jpg?width=1200",
    alt: "Vista aérea do MetLife Stadium, em East Rutherford, Nova Jersey",
    caption: "O MetLife Stadium, nos arredores de Nova York: endereço da final de 19 de julho de 2026.",
    credit: "Foto: Anthony Quintano · Wikimedia Commons (CC BY 2.0)",
    stadium: "metlife",
    year: 2026,
  },
  // ---------------------------------------------------------- históricas
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Jules_Rimet_trophy_replica.jpg?width=1200",
    alt: "Réplica da taça Jules Rimet, com a deusa Nike sustentando um vaso dourado",
    caption: "A Jules Rimet, primeira taça da Copa: roubada duas vezes, virou lenda por si só.",
    credit: "Foto: obra de Abel Lafleur · Wikimedia Commons (domínio público)",
    year: 1930,
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/FIFA_World_Cup_Trophy_(Ank_Kumar,_Infosys_Limited)_01.jpg?width=1200",
    alt: "Troféu da Copa do Mundo FIFA em ouro maciço, em exposição sob luz escura",
    caption: "6,1 kg e 36,8 cm de ouro 18 quilates: o troféu que toda seleção persegue desde 1974.",
    credit: "Foto: Ank Kumar · Wikimedia Commons (CC BY-SA 4.0)",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Uruguay_national_football_team_1930.jpg?width=1200",
    alt: "Seleção uruguaia de 1930 perfilada antes da final contra a Argentina",
    caption: "Os primeiros campeões do mundo: o Uruguai que venceu a Argentina por 4 a 2 em 1930.",
    credit: "Foto: autor desconhecido · Wikimedia Commons (domínio público)",
    year: 1930,
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Uruguay_goal_v_argentina_1930.jpg?width=1200",
    alt: "Lance de gol do Uruguai contra a Argentina na final da Copa de 1930, no Centenário",
    caption: "A primeira final: Uruguai e Argentina duelam diante de 68 mil pessoas no Centenário.",
    credit: "Foto: autor desconhecido · Wikimedia Commons (domínio público)",
    stadium: "centenario",
    year: 1930,
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Copa_de_1950,_torcedores_observam_o_cartaz_da_copa.jpg?width=1200",
    alt: "Torcedores observam o cartaz oficial da Copa do Mundo de 1950 no Brasil",
    caption: "Rio de Janeiro, 1950: o país parou diante do cartaz da primeira Copa no Brasil.",
    credit: "Foto: autor desconhecido · Wikimedia Commons (domínio público)",
    year: 1950,
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Gol_ghiggia_vs_brasil.jpg?width=1200",
    alt: "Ghiggia marca o gol do título uruguaio contra o Brasil no Maracanã, em 1950",
    caption: "O instante do Maracanazo: Ghiggia silencia quase 200 mil pessoas em 16 de julho de 1950.",
    credit: "Foto: autor desconhecido · Wikimedia Commons (domínio público)",
    stadium: "maracana",
    year: 1950,
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/First_game_of_the_2010_FIFA_World_Cup,_South_Africa_vs_Mexico.jpg?width=1200",
    alt: "Jogo de abertura da Copa de 2010 entre África do Sul e México no Soccer City lotado",
    caption: "11 de junho de 2010: a Copa chega à África pela primeira vez, ao som de vuvuzelas.",
    credit: "Foto: Shine 2010 · Wikimedia Commons (CC BY 2.0)",
    stadium: "soccer-city",
    year: 2010,
  },
];

export type MediaVideo = {
  /** id do vídeo no YouTube (validado via oEmbed) */
  id: string;
  /** título real retornado pelo oEmbed */
  title: string;
  /** descrição editorial em pt-BR */
  label: string;
};

export const MEDIA_VIDEOS: MediaVideo[] = [
  {
    id: "q7UhdRXPGYc",
    title: "History of the FIFA World Cup",
    label: "Documentário curto da TRT World percorrendo a história do torneio, de 1930 ao formato atual.",
  },
  {
    id: "shAICJd-G0Y",
    title: "the entire history of the World Cup, i guess",
    label: "Toda a história da Copa recontada em ritmo acelerado e bem-humorado — edição por edição.",
  },
  {
    id: "-ccNkksrfls",
    title: "Maradona 'Hand of God' Goal 1986 World Cup",
    label: "O lance mais polêmico da história das Copas: a 'Mão de Deus' de Maradona contra a Inglaterra em 1986.",
  },
  {
    id: "angxOsY8RSc",
    title: "Maracanazo: A Final da Copa de 1950 que Chocou o Mundo",
    label: "Em português: a reconstrução do Maracanazo, a decisão de 1950 que traumatizou o Brasil.",
  },
  {
    id: "XNAKyAJmpAU",
    title: "2026 World Cup - All 16 Stadiums 🇨🇦🇲🇽🇺🇸",
    label: "Tour completo pelos 16 estádios da Copa de 2026 no Canadá, México e Estados Unidos.",
  },
  {
    id: "5phjb7Yw4hA",
    title: "World Cup 2026 stadiums: All you need to know",
    label: "Guia da Al Jazeera com tudo o que você precisa saber sobre as sedes do Mundial de 2026.",
  },
  {
    id: "86pMi-kgB2c",
    title: "MELHORES MOMENTOS: PORTUGAL 2 X 1 CROÁCIA | COPA DO MUNDO FIFA™ 2026 | 16 AVOS DE FINAL",
    label: "Melhores momentos da CazéTV no mata-mata da Copa de 2026: Portugal x Croácia nos 16 avos.",
  },
  {
    id: "yeH-ENCbEqA",
    title: "MELHORES MOMENTOS: ESTADOS UNIDOS 2 X 0 BÓSNIA | COPA DO MUNDO FIFA™ 2026 | 16 AVOS DE FINAL",
    label: "Os donos da casa em ação: melhores momentos de Estados Unidos x Bósnia pela CazéTV.",
  },
];
