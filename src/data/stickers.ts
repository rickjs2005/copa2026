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
];
