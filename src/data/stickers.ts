// =============================================================================
// Álbum de Figurinhas — Copa 2026
// Dados verificados em 03/07/2026:
// - Fotos: Wikimedia Commons (Special:FilePath validado com HTTP 200 + image/*)
// - Áudios: YouTube (cada ID validado via oEmbed; videoTitle = título real)
// =============================================================================

export type StickerRarity = "lendaria" | "ouro" | "prata";

export type Sticker = {
  slug: string;
  name: string;
  country: string;
  flag: string; // emoji
  position: string; // ex.: "Atacante"
  shirt: number; // número da camisa clássico do jogador
  rarity: StickerRarity;
  photo: { src: string; credit: string } | null; // null = figurinha ilustrada (sem foto)
  memePhrase: string; // a frase/meme curta da figurinha (pt-BR, própria — máx ~90 chars)
  funFact: string; // 1-2 frases sobre o jogador nesta Copa/meme (pt-BR)
  audio: { label: string; youtubeId: string; videoTitle: string } | null;
};

const commons = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=800`;

export const STICKERS: Sticker[] = [
  {
    slug: "lionel-messi",
    name: "Lionel Messi",
    country: "Argentina",
    flag: "🇦🇷",
    position: "Atacante",
    shirt: 10,
    rarity: "lendaria",
    photo: {
      src: commons("Lionel-Messi-Argentina-2022-FIFA-World-Cup%20(cropped).jpg"),
      credit: "Foto: Hossein Zohrevand · Wikimedia Commons (CC BY 4.0)",
    },
    memePhrase: "“We Arredi!” — o sotaque que ganhou a Copa antes da bola rolar.",
    funFact:
      "Maior artilheiro da história das Copas: 19 gols, superou Klose em 22/06/2026 — e é o artilheiro desta edição, com 6. A pronúncia dele de “we are ready” na música oficial com Shakira e Burna Boy virou meme mundial.",
    audio: {
      label: "We Arredi! A música oficial 🎤",
      youtubeId: "fcnDmrtj6Sk",
      videoTitle: "Shakira, Burna Boy - Dai Dai (Official Video)",
    },
  },
  {
    slug: "marc-cucurella",
    name: "Marc Cucurella",
    country: "Espanha",
    flag: "🇪🇸",
    position: "Lateral",
    shirt: 24,
    rarity: "ouro",
    photo: {
      src: commons("Marc%20Cucurella%2020042025%20(1).jpg"),
      credit: "Foto: Timmy96 · Wikimedia Commons (CC0)",
    },
    memePhrase: "“Cucu, Cucurella…” — come paella, bebe Estrella. Treme, Haaland!",
    funFact:
      "No título da Euro 2024, ele mesmo pegou o microfone e cantou o próprio hino — come paella, bebe Estrella e faz o Haaland tremer. O cabelo virou patrimônio da internet.",
    audio: {
      label: "O hino do Cucurella 🎵",
      youtubeId: "WLteA7WLa5o",
      videoTitle:
        "Cucurella sings about Haaland in funny celebratory song following Spain’s Euro 2024 success 😂🎶",
    },
  },
  {
    slug: "vinicius-junior",
    name: "Vinícius Júnior",
    country: "Brasil",
    flag: "🇧🇷",
    position: "Atacante",
    shirt: 7,
    rarity: "lendaria",
    photo: {
      src: commons("Vin%C3%ADcius%20J%C3%BAnior%20-%20Real%20Madrid%20CF%20(2024-25).jpg"),
      credit: "Foto: Wikimedia Commons (CC0)",
    },
    memePhrase: "É o Brasil com S — e o Vini com drible.",
    funFact:
      "Nome garantido no “Brasil com S”, o hit do DJ mineiro M4IA que dominou os edits da Copa no TikTok com mais de 1 bilhão de reproduções. Todo drible dele já nasce com trilha sonora.",
    audio: {
      label: "Brasil com S 🇧🇷",
      youtubeId: "yk7yVGbcpHE",
      videoTitle: "M4IA - Brasil Com S (Official Visualizer)",
    },
  },
  {
    slug: "neymar",
    name: "Neymar",
    country: "Brasil",
    flag: "🇧🇷",
    position: "Atacante",
    shirt: 10,
    rarity: "ouro",
    photo: {
      src: commons("Neymar%20Jr.%20with%20Al%20Hilal,%203%20October%202023%20-%2003%20(cropped).jpg"),
      credit: "Foto: مقداد مددی · Wikimedia Commons (CC BY 4.0)",
    },
    memePhrase: "Traz o andador que o pai ainda decide!",
    funFact:
      "Em 2026 o TikTok o “aposentou” com carinho: viraram clássicas as piadas do andador e da cadeira de rodas — mas ele segue citado no “Brasil com S” e segue decidindo.",
    audio: {
      label: "Brasil com S (a dancinha) 💃",
      youtubeId: "zZxMN00izV8",
      videoTitle:
        "Brasil Com S (Música da Seleção) - M4IA - Dan-Sa / Daniel Saboya (Coreografia)",
    },
  },
  {
    slug: "kylian-mbappe",
    name: "Kylian Mbappé",
    country: "França",
    flag: "🇫🇷",
    position: "Atacante",
    shirt: 10,
    rarity: "lendaria",
    photo: {
      src: commons(
        "Kylian%20Mbappe%20at%20Real%20Madrid's%20game%20versus%20Juventus%20Turin%20on%2022%20October%202025.jpeg"
      ),
      credit: "Foto: SdHb · Wikimedia Commons (CC BY-SA 4.0)",
    },
    memePhrase: "“Brasil com S”? A França responde: allez, Mbappé!",
    funFact:
      "Chegou a 18 gols em Copas e também passou Klose nesta edição. Enquanto isso, a torcida francesa respondeu ao hit brasileiro com chanson própria coroando o “Roi de France”.",
    audio: {
      label: "O hino francês do Mbappé 🥖",
      youtubeId: "PTRNgVD0hS4",
      videoTitle: "♫ MBAPPÉ: ROI DE FRANCE | Chanson Coupe du monde 2026 ♫",
    },
  },
  {
    slug: "erling-haaland",
    name: "Erling Haaland",
    country: "Noruega",
    flag: "🇳🇴",
    position: "Atacante",
    shirt: 9,
    rarity: "ouro",
    photo: {
      src: commons("Erling%20Haaland%202023%20(cropped).jpg"),
      credit: "Foto: Jacek Stanislawek · Wikimedia Commons (CC BY-SA 4.0)",
    },
    memePhrase: "Haaland treme? O robô responde com gol.",
    funFact:
      "Virou personagem do hino do Cucurella — na letra, ele “treme” — e responde à zoeira até hoje, chamando o espanhol de engraçado. Nesta Copa, já são 5 gols do ciborgue norueguês.",
    audio: {
      label: "Haaland treme 😱",
      youtubeId: "VMUXj6Rt0g0",
      videoTitle:
        "“Cucurella eats paella, Cucurella drinks Estrella, Haaland trembles that Cucurella is coming” 🎶",
    },
  },
  {
    slug: "lamine-yamal",
    name: "Lamine Yamal",
    country: "Espanha",
    flag: "🇪🇸",
    position: "Atacante",
    shirt: 19,
    rarity: "ouro",
    photo: {
      src: commons("Lamine%20Yamal%20in%202025%20(cropped).jpg"),
      credit: "Foto: Biso · Wikimedia Commons (CC BY 4.0)",
    },
    memePhrase: "A joia que faz a Espanha inteira dar um JUMP.",
    funFact:
      "A joia da Espanha domina os edits em espanhol da Copa e ainda aparece em versão animada no clipe de “JUMP”, o hino da Coca-Cola para o Mundial 2026.",
    audio: {
      label: "JUMP! O hino do Yamal 🥤",
      youtubeId: "NWOALJ0C0I8",
      videoTitle:
        "J Balvin, Amber Mark - JUMP (ft Travis Barker & Steve Vai) | Coca-Cola Anthem for FIFA World Cup 26™",
    },
  },
  {
    slug: "harry-kane",
    name: "Harry Kane",
    country: "Inglaterra",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    position: "Atacante",
    shirt: 9,
    rarity: "prata",
    photo: {
      src: commons("Harry%20Kane%202023%20(cropped).jpg"),
      credit: "Foto: UK Prime Minister · Wikimedia Commons (CC BY 2.0)",
    },
    memePhrase: "It's coming home… um dia. Confia no Kane.",
    funFact:
      "São 5 gols do capitão inglês nesta edição — e a Inglaterra inteira cantando, pela enésima Copa seguida, que dessa vez o caneco volta pra casa.",
    audio: {
      label: "It's coming home? 🦁",
      youtubeId: "OjY6k5aTgik",
      videoTitle:
        "Baddiel, Skinner & Lightning Seeds - Three Lions (Football’s Coming Home) (Official HD Video)",
    },
  },
  {
    slug: "xo-gol",
    name: "Xô Gol",
    country: "Índia (convocado pelo Brasil)",
    flag: "🇮🇳→🇧🇷",
    position: "Lenda da Internet",
    shirt: 99,
    rarity: "lendaria",
    photo: null,
    memePhrase: "CBF, atende: o TikTok já convocou o Xô Gol!",
    funFact:
      "O “Messi indiano” que o TikTok brasileiro vive convocando para a Seleção. Nunca pisou numa Copa, mas já ganhou mais figurinha lendária que muito craque de verdade.",
    audio: {
      label: "Tchê tcherere da convocação 🕺",
      youtubeId: "5NNi4JIwsCo",
      videoTitle:
        "Gusttavo Lima - Balada Boa - [DVD Gusttavo Lima e Você] - (Clipe Oficial)",
    },
  },
  {
    slug: "cristiano-ronaldo",
    name: "Cristiano Ronaldo",
    country: "Portugal",
    flag: "🇵🇹",
    position: "Atacante",
    shirt: 7,
    rarity: "lendaria",
    photo: {
      src: commons("2025%20Cristiano%20Ronaldo%20(cropped).jpg"),
      credit: "Foto: The White House · Wikimedia Commons (domínio público)",
    },
    memePhrase: "“SIUUU!” — o grito que o planeta inteiro imita.",
    funFact:
      "Aos 41 anos, disputa em 2026 a sua 6ª Copa — recorde que divide com Messi — ainda caçando a única taça que falta na prateleira. O “SIUUU!” da comemoração virou o efeito sonoro mais famoso do futebol.",
    audio: {
      label: "SIUUU! 🗣️",
      youtubeId: "0mhqzt0H0OM",
      videoTitle: "Cristiano Ronaldo Celebration Scream (SIIIIIIIIIIIIIIIIII)",
    },
  },
  {
    slug: "jude-bellingham",
    name: "Jude Bellingham",
    country: "Inglaterra",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    position: "Meia",
    shirt: 10,
    rarity: "ouro",
    photo: {
      src: commons("Jude%20Bellingham%20EA%20Sports%202024.jpg"),
      credit: "Foto: MohaESP88 · Wikimedia Commons (CC BY 3.0)",
    },
    memePhrase: "A Inglaterra inteira embala: “na, na, na… Hey Jude!”",
    funFact:
      "A torcida inglesa adaptou o clássico dos Beatles para o camisa 10 — o “Hey Jude” ecoa desde o primeiro gol dele em Copas, contra o Irã em 2022, e virou trilha oficial de todo golaço do Jude.",
    audio: {
      label: "Hey Jude! 🎶",
      youtubeId: "Nk8arKi_rbo",
      videoTitle: "HEY JUDE: England fans celebrate Jude Bellingham goal v Iran",
    },
  },
  {
    slug: "luka-modric",
    name: "Luka Modrić",
    country: "Croácia",
    flag: "🇭🇷",
    position: "Meia",
    shirt: 10,
    rarity: "ouro",
    photo: {
      src: commons("Modric%20in%20LIV%20VS%20RMA%202024%20(cropped).jpg"),
      credit: "Foto: Hainotdeptrai · Wikimedia Commons (CC0)",
    },
    memePhrase: "A última dança do maestro: aos 40, a Copa da despedida.",
    funFact:
      "Aos 40 anos, o maestro croata veio a 2026 para a “última dança” — e se despediu do Mundial em um jogo dramático contra Portugal, decidido por 2 a 1. O mundo do futebol aplaudiu de pé.",
    audio: {
      label: "The Last Dance 🎻",
      youtubeId: "VaFthEJ9EcI",
      videoTitle: "Croatia World Cup Anthem 2026 🇭🇷 THE LAST DANCE OF MODRIĆ ⚽🔥",
    },
  },
  {
    slug: "raphinha",
    name: "Raphinha",
    country: "Brasil",
    flag: "🇧🇷",
    position: "Atacante",
    shirt: 11,
    rarity: "ouro",
    photo: {
      src: commons("Raphinha%20(2025)%20(cropped).png"),
      credit: "Foto: Wikimedia Commons (CC BY 4.0)",
    },
    memePhrase: "Brasil com S, Barça com R: Raphinha em modo lendário.",
    funFact:
      "Depois de uma temporada mágica pelo Barcelona, com mais de 30 gols e futebol de Bola de Ouro, ganhou vaga cativa nos edits do “Brasil com S” que dominam o TikTok da Copa.",
    audio: {
      label: "Brasil com S 🇧🇷",
      youtubeId: "yk7yVGbcpHE",
      videoTitle: "M4IA - Brasil Com S (Official Visualizer)",
    },
  },
  {
    slug: "rodrygo",
    name: "Rodrygo",
    country: "Brasil",
    flag: "🇧🇷",
    position: "Atacante",
    shirt: 10,
    rarity: "prata",
    photo: {
      src: commons("Rodrygo%202023%20(cropped).jpg"),
      credit: "Foto: Junta de Andalucía · Wikimedia Commons (CC BY-SA 2.0)",
    },
    memePhrase: "Cria da Vila: em noite grande, o Rodrygo aparece.",
    funFact:
      "Cria da Vila Belmiro, como Pelé e Neymar, construiu no Real Madrid a fama de homem dos jogos grandes — dele foram os dois gols nos acréscimos contra o City na semifinal da Champions de 2022.",
    audio: null,
  },
  {
    slug: "endrick",
    name: "Endrick",
    country: "Brasil",
    flag: "🇧🇷",
    position: "Atacante",
    shirt: 9,
    rarity: "ouro",
    photo: {
      src: commons("Endrick%20sele%C3%A7%C3%A3o%20vs%20inglaterra.jpg"),
      credit: "Foto: Thiago Arantes · Wikimedia Commons (CC BY-SA 4.0)",
    },
    memePhrase: "“Endrick é demais!” — a joia já chegou com hino próprio.",
    funFact:
      "Convocado por Ancelotti aos 19 anos para a primeira Copa da carreira, estreou no Mundial em 19/06/2026 contra o Haiti. No TikTok, o bordão “Endrick é demais” é aviso de gol chegando.",
    audio: {
      label: "Endrick é demais ⚽",
      youtubeId: "y52rBGT75kU",
      videoTitle:
        "♫ ENDRICK TÁ VOANDO! QUEM VAI SER O 9 DO BRASIL NA COPA? | Paródia Oi, Como Cê Tá? - Vulgo FK",
    },
  },
  {
    slug: "alisson",
    name: "Alisson",
    country: "Brasil",
    flag: "🇧🇷",
    position: "Goleiro",
    shirt: 1,
    rarity: "prata",
    photo: {
      src: commons(
        "Alisson%20Becker%20Brazil%20V%20Morocco%2013%20June%202026-117%20(cropped).jpg"
      ),
      credit: "Foto: Bryan Berlin · Wikimedia Commons (CC BY-SA 4.0)",
    },
    memePhrase: "“Fecha o gol, Alisson!” — pedido feito, milagre entregue.",
    funFact:
      "O paredão do Liverpool e da Seleção: quando a zaga vacila, a internet grita “fecha o gol” — e ele fecha. Em 2026, segue como o pilar de segurança do Brasil na Copa.",
    audio: {
      label: "Alisson brilha! 🧤",
      youtubeId: "rhLJl9KEjO0",
      videoTitle: "ALISSON BRILHA pelo Brasil",
    },
  },
  {
    slug: "mohamed-salah",
    name: "Mohamed Salah",
    country: "Egito",
    flag: "🇪🇬",
    position: "Atacante",
    shirt: 10,
    rarity: "ouro",
    photo: {
      src: commons("Mohamed%20Salah%2006042025%20(1).jpg"),
      credit: "Foto: Timmy96 · Wikimedia Commons (CC0)",
    },
    memePhrase: "“The Egyptian King!” — Anfield coroou, o Egito confia.",
    funFact:
      "O hino do “Egyptian King”, na melodia de “Sit Down” do James, coroou o faraó em Anfield — e ele retribuiu levando o Egito de volta à Copa do Mundo.",
    audio: {
      label: "The Egyptian King 👑",
      youtubeId: "angfhBLxcvw",
      videoTitle: "Mo Salah, The Egyptian King! | Learn LFC Songs",
    },
  },
  {
    slug: "heung-min-son",
    name: "Heung-min Son",
    country: "Coreia do Sul",
    flag: "🇰🇷",
    position: "Atacante",
    shirt: 7,
    rarity: "prata",
    photo: {
      src: commons("BFA%202023%20-2%20Heung-Min%20Son%20(cropped).jpg"),
      credit: "Foto: Ujishadow · Wikimedia Commons (CC BY-SA 4.0)",
    },
    memePhrase: "“Nice one, Sonny!” — o sorriso mais letal da Ásia.",
    funFact:
      "O “Nice one, Sonny!” recicla um clássico dos anos 70 do Tottenham (“Nice one, Cyril”). Capitão da Coreia do Sul e hoje estrela do LAFC, o Son disputa esta Copa jogando “em casa”, nos EUA.",
    audio: {
      label: "Nice one, Sonny! 🎶",
      youtubeId: "fXsGoMhEeMI",
      videoTitle: "HEUNG MIN SON CHANT - NICE ONE SONNY",
    },
  },
  {
    slug: "lautaro-martinez",
    name: "Lautaro Martínez",
    country: "Argentina",
    flag: "🇦🇷",
    position: "Atacante",
    shirt: 22,
    rarity: "prata",
    photo: {
      src: commons("Lautaro%20Martinez%202025.jpg"),
      credit: "Foto: Andrea Papaccio · Wikimedia Commons (CC0)",
    },
    memePhrase: "O Toro que puxa o bonde dos Muchachos.",
    funFact:
      "Campeão do mundo em 2022, o Toro é o centroavante da Argentina de Messi — aquela embalada pelo “Muchachos”, o hino que a torcida não parou de cantar desde o Catar.",
    audio: {
      label: "Muchachos! 🇦🇷",
      youtubeId: "TqGo-t0JXRs",
      videoTitle: "“Muchachos” - Argentina’s FIFA World Cup Qatar 2022 Anthem",
    },
  },
];
