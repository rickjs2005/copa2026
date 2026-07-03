import type { Stadium } from "./types";

// As 16 sedes oficiais da Copa de 2026 (fatos públicos; descrições próprias).
// map.x/map.y: posição aproximada num mapa estilizado 0–100 da América do Norte.
export const STADIUMS: Stadium[] = [
  { slug: "metlife", name: "New York New Jersey Stadium", city: "East Rutherford", country: "Estados Unidos", countryFlag: "🇺🇸", capacity: 82500, description: "Palco da grande final em 19 de julho. Casa dos dois times de futebol americano de Nova York, é um colosso de aço a 15 minutos de Manhattan.", map: { x: 82, y: 38 } },
  { slug: "att-dallas", name: "Dallas Stadium", city: "Arlington", country: "Estados Unidos", countryFlag: "🇺🇸", capacity: 92967, description: "O maior estádio desta Copa, com teto retrátil e o icônico telão suspenso de 50 metros. Recebe nove jogos, mais que qualquer outra sede.", map: { x: 48, y: 62 } },
  { slug: "sofi", name: "Los Angeles Stadium", city: "Inglewood", country: "Estados Unidos", countryFlag: "🇺🇸", capacity: 70240, description: "A joia arquitetônica de US$ 5 bilhões da Califórnia, com cobertura translúcida e clima controlado — futebol em condições de estúdio.", map: { x: 10, y: 55 } },
  { slug: "azteca", name: "Estadio Azteca", city: "Cidade do México", country: "México", countryFlag: "🇲🇽", capacity: 83264, description: "O único estádio a receber jogos de abertura de três Copas (1970, 1986 e 2026). A 2.200 m de altitude, viu a 'Mão de Deus' e o 'Gol do Século'.", map: { x: 42, y: 88 } },
  { slug: "bmo-field", name: "Toronto Stadium", city: "Toronto", country: "Canadá", countryFlag: "🇨🇦", capacity: 45736, description: "À beira do lago Ontário, recebeu o primeiro jogo do Canadá como anfitrião em Copas masculinas.", map: { x: 74, y: 28 } },
  { slug: "bc-place", name: "Vancouver Stadium", city: "Vancouver", country: "Canadá", countryFlag: "🇨🇦", capacity: 54500, description: "Entre montanhas e o Pacífico, tem a maior cobertura retrátil suportada por cabos do mundo.", map: { x: 8, y: 18 } },
  { slug: "akron", name: "Estadio Guadalajara", city: "Guadalajara", country: "México", countryFlag: "🇲🇽", capacity: 48071, description: "Um vulcão de concreto que emerge de um gramado inclinado — uma das arquiteturas mais originais do futebol mundial.", map: { x: 36, y: 80 } },
  { slug: "bbva", name: "Estadio Monterrey", city: "Monterrey", country: "México", countryFlag: "🇲🇽", capacity: 53500, description: "Emoldurado pelo Cerro de la Silla, é considerado um dos estádios mais bonitos das Américas.", map: { x: 42, y: 72 } },
  { slug: "mercedes-benz", name: "Atlanta Stadium", city: "Atlanta", country: "Estados Unidos", countryFlag: "🇺🇸", capacity: 71000, description: "Seu teto em pétalas abre como a íris de uma câmera. Recebe uma das semifinais.", map: { x: 66, y: 58 } },
  { slug: "hard-rock", name: "Miami Stadium", city: "Miami Gardens", country: "Estados Unidos", countryFlag: "🇺🇸", capacity: 64767, description: "Sede da disputa de 3º lugar, com cobertura projetada para o calor do sul da Flórida.", map: { x: 72, y: 78 } },
  { slug: "gillette", name: "Boston Stadium", city: "Foxborough", country: "Estados Unidos", countryFlag: "🇺🇸", capacity: 65878, description: "Reformado para 2026, recebe jogos até as quartas de final na Nova Inglaterra.", map: { x: 86, y: 30 } },
  { slug: "lincoln-financial", name: "Philadelphia Stadium", city: "Filadélfia", country: "Estados Unidos", countryFlag: "🇺🇸", capacity: 69328, description: "No coração da cidade da independência americana, palco de oitavas no 4 de Julho.", map: { x: 80, y: 42 } },
  { slug: "levis", name: "San Francisco Bay Area Stadium", city: "Santa Clara", country: "Estados Unidos", countryFlag: "🇺🇸", capacity: 70909, description: "No coração do Vale do Silício, é um dos estádios mais sustentáveis do mundo, com telhado verde e energia solar.", map: { x: 6, y: 44 } },
  { slug: "lumen", name: "Seattle Stadium", city: "Seattle", country: "Estados Unidos", countryFlag: "🇺🇸", capacity: 69000, description: "Famoso pelo barulho ensurdecedor de sua torcida — o recorde de decibéis em estádios foi quebrado aqui duas vezes.", map: { x: 10, y: 22 } },
  { slug: "arrowhead", name: "Kansas City Stadium", city: "Kansas City", country: "Estados Unidos", countryFlag: "🇺🇸", capacity: 76416, description: "Outro recordista mundial de ruído, no coração geográfico dos EUA. Recebe uma das quartas de final.", map: { x: 50, y: 46 } },
  { slug: "nrg", name: "Houston Stadium", city: "Houston", country: "Estados Unidos", countryFlag: "🇺🇸", capacity: 72220, description: "Primeiro estádio da NFL com teto retrátil, adaptado com gramado natural para a Copa.", map: { x: 48, y: 72 } },
];

export const STADIUMS_BY_SLUG = new Map(STADIUMS.map((s) => [s.slug, s]));

export function getStadium(slug: string): Stadium | undefined {
  return STADIUMS_BY_SLUG.get(slug);
}
