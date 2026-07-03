# Auditoria UX/UI — As★Copas (copa2026-alpha.vercel.app)

> Análise sênior de UX/UI, Product Design, Design System, front-end, acessibilidade, SEO, performance, psicologia das cores, design emocional e CRO.
> Data: 03/07/2026, pós-redesign editorial, estádios 3D com arquibancadas, seção da Taça e fatos atualizados da edição.
> Método: inspeção integral do código, do HTML servido em produção e cálculo matemático dos contrastes WCAG.
> **Nenhum arquivo do produto foi alterado. Nenhum commit foi feito.**

---

## 1. Primeira impressão (3 segundos) — **Nota: 8,5/10**

O que se vê ao abrir: "1930 ★ 2026 · 23ª edição em jogo" em dourado tracking largo, e então o soco tipográfico — **AS COPAS** em Anton gigante preenchido, **DO MUNDO** vazado (contorno) logo abaixo, sobre linhas de campo de futebol fantasmas e dois brilhos discretos.

- **Proposta clara?** Sim, instantânea: é sobre as Copas do Mundo, com autoridade editorial.
- **Impacto visual?** Alto. A dupla cheio/vazado em display condensada é linguagem de pôster de colecionador — não existe outro site esportivo brasileiro com essa cara.
- **Moderno?** Sim, mas moderno-editorial (revista), não moderno-genérico (SaaS). Escolha correta.
- **Identidade própria?** É o ponto mais forte do produto (ver §3).
- **O que desconta 1,5 ponto:** (a) o visitante não descobre nos 3 segundos que existe **3D** — o maior diferencial do site só aparece após rolar; um teaser do 3D (ou um chip "estádios em 3D ↓") no próprio hero venderia o peixe imediatamente; (b) hero 100% tipográfico é ótimo para quem aprecia design, mas o público de futebol reage mais rápido a imagem — a foto ultra da taça, que existe lá embaixo, disputa em outra liga de impacto emocional e chega tarde.

## 2. Hero

- **Headline** "As Copas do Mundo": correta e definitiva. A quebra em duas linhas com pesos visuais diferentes cria ritmo raro.
- **Subheadline** "96 anos de finais, gênios e arenas que viraram lendas…": boa, com a promessa dupla (história + 3D) no fecho. Poderia ser mais curta — a força está na primeira metade.
- **CTAs**: "Estádios em 3D →" (bloco verde sólido) e "Linha do tempo" (outline) — hierarquia primário/secundário clara, alvos ≥52px, rótulos concretos. A seta como caractere de texto ("→") é lida por leitores de tela como "seta para a direita" — detalhe menor de a11y.
- **Hierarquia/espaçamento**: eyebrow → título → parágrafo → ações, com respiro generoso. Correta.
- **Tipografia/contraste/legibilidade**: creme #F0EAD9 sobre #0B0D09 = **15,8:1 (AAA folgado)**. O título vazado (stroke 2px) tem contraste efetivo menor por natureza — funciona no tamanho gigante, mas é o elemento mais frágil da composição em telas de baixa qualidade.
- **Imagens/vídeo**: nenhum — decisão deliberada por LCP. Defensável, mas ver §1: o hero é o único lugar do site onde a austeridade cobra um preço emocional.
- **Animações**: entrada em cascata (0 → 0,32s), só transform/opacity, com `useReducedMotion`. Exemplar.
- **Escaneabilidade**: 4 blocos, zero ruído.

**"Nos primeiros 5 segundos, prende a atenção?"** Prende quem tem olho para design e quem ama futebol de raiz. Para o adolescente vindo do TikTok, falta um objeto de desejo visível — a taça dourada ou o estádio 3D girando. O hero informa e impõe respeito; ainda não *hipnotiza*.

## 3. Identidade Visual

- **Paleta**: preto-esverdeado de gramado noturno (#0B0D09) + creme de papel (#F0EAD9) + verde-campo (#4FAE57) + **dourado de taça (#D9A842)**. Psicologia das cores impecável para o domínio: gramado, troféu, ingresso antigo. O dourado como cor de destaque/hover foi a decisão certa — status e conquista, não "tech".
- **Consistência**: alta pós-varredura — cantos retos, `border-border` hairline creme, hover dourado. **Resíduos inconsistentes**: o CTA dentro do teaser 3D e as tags de curiosidades ainda são `rounded-full` (pílulas) num sistema que migrou para retos; o chip do seletor de estádios no 3D também. São 3 elementos falando o idioma antigo.
- **Tipografia**: Anton (display, caixa alta) + Archivo (texto) — combinação com personalidade e zero cara de template.
- **Ícones**: Lucide 1,5px, discretos e coerentes.
- **Ilustrações**: as linhas de campo em SVG e os modelos 3D *são* a ilustração — autorais.
- **Sombras/gradientes/glass**: quase ausentes (grão de impressão + brilhos radiais discretos + blur no header). Contido e certo.
- **Template ou identidade?** Identidade própria, inconfundível. O conjunto Anton + creme + dourado + ticker de campeões + grão + estádios procedurais não existe em template nenhum. É o maior ativo do projeto.

## 4. UX

- **Navegação**: 4 destinos (Início, Estádios em 3D, História, Curiosidades) — arquitetura rasa, zero curva de aprendizado, nada a mais de 1 clique do header. Ótimo.
- **Fluxo**: home conta uma história coerente (hero → ticker → 3D → countdown → taça → campeões → vídeos → curiosidades) — jornada editorial com começo, meio e fim.
- **Atritos identificados**:
  1. **A dica de gravação do Modo cinema diz "Win + Alt + R" também no celular** — instrução de Windows exibida para quem está no Android/iPhone. Quebra de contexto que mina a confiança justamente no recurso feito para gerar vídeos.
  2. No 3D, nada ensina o gesto ("arraste para orbitar" está só no parágrafo acima do canvas, fora do campo de visão de quem já rolou) — primeira interação por tentativa e erro.
  3. As 33 curiosidades chegam numa grade única **sem filtro por tag** — quem quer só "Zebras" precisa varrer tudo.
  4. O countdown da final não tem estado pós-evento: em 20/07 ficará **00:00:00 congelado**, gritando abandono (bomba-relógio de credibilidade).
  5. Não há nenhum mecanismo de compartilhamento — num site cujo objetivo declarado é tráfego social, cada curiosidade e cada estádio deveria ter "copiar link/compartilhar".

## 5. UI

- **Grid**: contêiner max-w-7xl consistente, gutters px-4/sm:px-6 uniformes, grids 2/3/4 colunas bem comportados.
- **Espaçamentos**: escala respeitada (py-16/24 entre seções; p-5/6 nos cards) — ritmo vertical sólido.
- **Alinhamentos**: sem desalinhamentos detectados no código; o único ponto sensível é a seção da Taça no desktop, onde a coluna de fatos pode ficar mais alta que a foto (items-center compensa, mas com 5+ fatos desequilibraria).
- **Consistência entre componentes**: 90% — os 3 resíduos de pílula (§3) e o card de vídeo (rounded? não — reto ✓) são o que sobra.

## 6. Componentes

| Componente | Estado |
|---|---|
| Navbar | Boa: sticky glass, wordmark display, aria-current, menu mobile funcional. Falta fechar com Esc e devolver o foco. |
| Hero | Forte (§2). |
| Cards | Ver §7. |
| Botões | 2 variantes claras (sólido verde / outline). Falta estado :active visível (só hover). |
| Tabelas | Não existem mais (removidas no pivô) — n/a. |
| Estatísticas (fatos da Taça) | Bom padrão: número display dourado + label micro + texto. Escaneável. |
| Timeline (História) | Boa: linha + nós verdes, fotos com legenda/crédito. O nó da linha desalinha levemente do topo quando o card tem foto (o nó fica na altura da imagem, não do ano). |
| Rodapé | Correto e honesto (disclaimer legal), mas anêmico: sem redes sociais, sem "feito por", sem convite a voltar. |
| Inputs / Modais / Breadcrumbs / Accordions | Não existem na UI atual (breadcrumb só como JSON-LD) — n/a. |
| Badges/Tags | Funcionais; pílulas destoando do sistema reto (§3); e as tags de curiosidade parecem clicáveis mas não são — promessa visual não cumprida. |
| **Experiência 3D** | O componente estrela: seletor, painel glass, Modo cinema, torcida. Abaixo do padrão em: dica de gravação não-contextual, ausência de fallback se WebGL falhar (canvas em branco sem mensagem), e o loop de render roda mesmo com a aba/scroll fora da tela (bateria no mobile). |

## 7. Cards (análise detalhada)

**Card de estádio (grid /estadios)**: o melhor card do site — foto real 16:10 com véu de gradiente e bandeira, título display, metadados, fato em texto corrido, capacidade com ícone, crédito da foto. Hierarquia perfeita, escaneável. Melhorias: (a) o crédito em 10px/70% de opacidade fica com contraste ~4:1 — no limite; (b) o card não é clicável — poderia levar ao 3D do próprio estádio (hoje o usuário volta a rolar para cima e procurar o chip).

**Card de curiosidade**: tag pílula verde + título bold + texto muted. Sólido, mas em 33 unidades a monotonia cobra: sem imagem, sem número, sem variação de tamanho — a grade vira "parede de cards". Um destaque a cada N (card maior com foto) quebraria o ritmo.

**Card de campeão (home)**: ano display + troféu + campeão + placar dourado + fato. Bom; o placar em dourado foi acerto de hierarquia.

**Card de vídeo**: thumbnail + play dourado + título real. Correto; o "· YouTube ↗" comunica saída do site — boa prática.

**Fato da Taça**: o número dourado de abertura (6,1 kg / Nº 2 / 1970 / 2038) é a melhor microestrutura de card do site — escaneia como manchete.

## 8. Tipografia

- **Escala**: display 17vw→9.5rem (hero), 6xl/5xl (títulos), base/sm (texto), micro 10–11px (créditos/labels). Salto claro entre níveis — hierarquia forte.
- **Pesos**: Anton só tem 400 — a "força" vem do tamanho/caixa alta, o que mantém disciplina.
- **Linhas**: corpo com leading-relaxed e medidas ≤ ~70ch nos textos longos ✓.
- **Excesso de texto?** Não — os textos de 2–4 frases das curiosidades são o tamanho certo para social.
- **Texto pequeno demais?** Sim, em 3 lugares: créditos de foto (10px/70%), labels "de ouro 18 quilates" (10px) e o "· YouTube ↗" — todos legais porém no limite; créditos poderiam subir a 11px/80%.

## 9. Paleta de cores (contrastes calculados)

| Par | Razão | WCAG |
|---|---|---|
| Creme #F0EAD9 / fundo #0B0D09 | **15,8:1** | AAA |
| Muted #A39C8A / fundo | **7,0:1** | AAA texto normal |
| Dourado #D9A842 / fundo | **8,7:1** | AAA |
| Verde #4FAE57 / fundo | **6,8:1** | AA+ |
| Texto escuro / botão verde | **6,8:1** | AA+ |

Todos os pares principais passam com folga — acima da média do mercado. **Hover/ativo**: hover dourado consistente ✓; estados *ativos* (pressed) não têm tratamento próprio. As cores destacam o que importa: dourado = conquista/ação, verde = campo/CTA primário. Psicologia correta e rara de ver tão coerente.

## 10. Responsividade

- **Desktop/notebook**: max-w-7xl bem aproveitado; a Taça em 2 colunas é a melhor seção widescreen.
- **Tablet**: grids 2 colunas comportados; hero em 8xl equilibrado.
- **Celular**: hero 17vw escala bem; ticker, cards e timeline fluem; o canvas 3D em 68dvh + painel glass + chips na base funciona, mas os chips do seletor rolam horizontalmente **sem indicação de overflow** (fade/gradiente) — usuário pode não descobrir os 8 estádios; o painel de informação cobre boa parte do canvas em telas pequenas (o fato fica `hidden` no mobile — correto).
- **Overflow**: nenhum estouro horizontal detectado; ticker e seletor são os únicos scrolls laterais, ambos intencionais.
- **Salto tipográfico**: entre 639px e 640px o hero salta de 17vw para 8rem — em ~600px o título encolhe bruscamente; um passo intermediário suavizaria.

## 11. Performance percebida

- **Sensação**: páginas estáticas chegam instantâneas; fontes self-hosted sem FOUT; zero terceiros no carregamento (YouTube só sob clique — excelente).
- **3D**: dynamic import com `ssr:false` e loader "Montando o estádio… 🏗️" — o custo do three.js (o maior peso do site) fica confinado a /estadios ✓. **Débitos**: o render loop roda continuamente (autoRotate) mesmo com o canvas fora da viewport ou aba em segundo plano → bateria/aquecimento no celular; sem `frameloop="demand"` ou pausa por IntersectionObserver.
- **Imagens**: containers com aspecto fixo = zero CLS ✓; falta `placeholder` (blur/cor dominante) — o flash vazio até a foto do Commons chegar é o único "buraco" perceptível; falta `preconnect` para o host de imagens.
- **Skeletons**: só no 3D; navegações entre páginas não têm loading.tsx — como tudo é estático e leve, o custo real é baixo, mas em 3G nota-se.

## 12. Acessibilidade (WCAG)

**Alto**
1. **Fotos de /estadios e /historia dentro de wrappers animados com lazy loading** — o mesmo padrão que escondeu a taça no mobile segue nessas páginas; além do risco funcional, conteúdo que não carrega é barreira. (O caso da taça já foi corrigido; estes continuam expostos.)
2. **Canvas 3D sem fallback**: se WebGL falhar/estiver bloqueado, resta um retângulo escuro sem mensagem nem alternativa (as fotos reais existem logo abaixo — bastaria dizer isso).
3. **Menu mobile**: não fecha com Esc, não prende nem devolve o foco — teclado/leitores se perdem.

**Médio**
4. Chips do seletor de estádios: `aria-pressed` ✓, mas o container rolável não tem `role`/instrução, e sem indicação visual de overflow.
5. Créditos de foto em 10px com opacidade — contraste efetivo no limite de 4,5:1.
6. Setas "→" como texto em CTAs (anunciadas literalmente).
7. Estados de foco: o global `:focus-visible` dourado existe ✓, mas sobre fundos dourados (chip ativo) o anel dourado some — falta variação.

**Baixo**
8. Ticker: bem resolvido (aria-hidden + sr-only + reduced-motion) — só falta pausa em hover/foco (WCAG 2.2.2 é atendido pela alternativa sr-only, mas pausa é cortesia).
9. Emoji decorativos majoritariamente com aria-hidden ✓; o 🏟️ gigante do teaser corretamente escondido ✓.
10. `lang="pt-BR"`, landmarks, headings hierárquicos, skip-link — **acima da média** ✓.

## 13. SEO

**Bem resolvido**: metadataBase + canonical por rota, títulos/descrições únicos, OG image gerada, JSON-LD (WebSite + BreadcrumbList), sitemap e robots gerados, URLs limpas em PT, headings corretos, 100% SSG (crawl perfeito).

**Oportunidades reais**:
1. **Long-tail desperdiçada**: "Maracanã história", "estádio da final de 2026", "quem é o maior artilheiro das Copas" — hoje tudo mora em páginas agregadas. **Páginas por estádio** (/estadios/maracana…) e, eventualmente, por edição (/historia/1970) multiplicariam a superfície de busca — é o maior alavancador de tráfego disponível.
2. Curiosidades sem âncoras/IDs — impossível linkar direto para uma (ruim para social e para featured snippets).
3. Sem `FAQPage`/`ItemList` schema nas curiosidades (materia-prima perfeita para rich results).
4. OG image única para todas as rotas — por-rota (a taça para a home, estádio para /estadios) melhoraria CTR social.
5. Freshness: o "Atualizado em 3 de julho" está no corpo, mas não há `dateModified` em schema.

## 14. Microinterações

- Hover: consistente (bordas douradas, translate de setas, zoom sutil nas thumbs) ✓.
- Entradas: Reveal em cascata, uma vez só, com reduced-motion ✓ — ajudam, não distraem.
- **Faltas**: sem transição ao trocar de estádio no 3D (o modelo pisca de um para o outro — um crossfade de 300ms daria polimento de produto premium); sem feedback no chip enquanto o novo modelo monta; tags de curiosidade com cursor padrão mas cara de botão (§6).
- O toast de dica no Modo cinema é a única "notificação" — bem posicionada, mas com o texto errado por plataforma (§4).

## 15. Design System

- **Tokens**: 8 cores semânticas + 2 fontes em CSS vars/@theme — enxuto e real (os componentes usam de fato).
- **Componentes reutilizáveis**: SectionHeading, Reveal, Ticker, VideoCard, cards — reuso genuíno; botões ainda são classes repetidas (3 variações de CTA com paddings próprios) — próxima dívida a extrair.
- **Escalas**: espaçamento e tipo disciplinados.
- **Veredito**: padrão visual sólido e próprio, ~90% consolidado; falta extrair Button e matar as 3 pílulas remanescentes para fechar 100%.

## 16. Comparação com grandes referências

| Critério | As★Copas | FIFA | UEFA | Apple | Nike | ESPN |
|---|---|---|---|---|---|---|
| Identidade visual | **9** | 6 | 6 | 9 | 9 | 4 |
| Limpeza/organização | 8,5 | 6 | 6 | **9,5** | 8 | 3 |
| Experiência interativa | **8 (3D)** | 5 | 5 | 8 | 7 | 4 |
| Profundidade de conteúdo | 5 | **9** | 8 | n/a | n/a | **9** |
| Velocidade percebida | **9** | 5 | 6 | 9 | 7 | 4 |
| Retenção/ecosistema | 3 | 8 | 7 | 8 | 8 | **9** |

Leitura honesta: em **estética, velocidade e originalidade**, o site já joga no nível Apple/Nike e *acima* de FIFA/UEFA/ESPN (que são poluídos e lentos). Onde apanha das referências esportivas é em **profundidade** (páginas dedicadas, estatísticas, busca) e **retenção** (nada chama o usuário de volta: sem push, sem newsletter, sem novidade diária visível).

## 17. Experiência emocional

Transmite: **história, reverência, elegância, credibilidade** — o clima é de museu vivo do futebol, e isso tem valor único. Energia/competição: parcial — a torcida no 3D e o ticker dão pulso, mas não há som, não há "hoje", não há urgência (de propósito, pós-pivô). Frio/genérico: **não** — é dos projetos com mais alma que já auditei; o risco emocional é outro: solenidade demais para o público jovem de social. A seção da Taça é o momento emocional mais forte do site.

## 18. Conversão (CRO)

O "produto" aqui é atenção e compartilhamento. Avaliação dura:
- CTAs de navegação: bons e claros ✓.
- **CTA de compartilhamento: inexistente** — o objetivo declarado (tráfego de Instagram/TikTok/Google) não tem nenhum mecanismo no site: sem botão compartilhar, sem "copiar link" em curiosidade, sem âncoras, sem hashtag sugerida, sem watermark/URL no Modo cinema (o vídeo gravado não carrega a marca — quem assistir ao Reel não sabe de onde veio!).
- Jornada: incentiva navegar (teasers cruzados entre seções ✓), não incentiva **voltar** nem **trazer amigos**.
- Quick win de maior impacto do relatório inteiro: **marca d'água discreta "as-copas ★ copa2026-alpha.vercel.app" no canto do Modo cinema** — cada vídeo gravado vira mídia com atribuição.

## 19. Pontos fortes

1. Identidade visual autoral e coesa (Anton + creme + dourado + grão + ticker) — nível de marca própria.
2. Estádios 3D procedurais com arquibancadas, setores e torcida — diferencial que nenhuma referência tem.
3. Modo cinema pensado para criação de conteúdo.
4. Seção da Taça: foto real ultra + fatos com número-manchete — o melhor bloco editorial.
5. Contrastes AAA calculados em todos os pares principais.
6. 100% estático + mídia de terceiros só sob demanda = velocidade real e percebida altíssimas.
7. Conteúdo verificado: fotos com crédito/licença, vídeos validados, fatos da edição atualizados por pesquisa (queda do recorde do Klose) com selo de atualização.
8. Honestidade legal (disclaimer, modelos autorais) — proteção real de copyright.
9. SEO técnico completo para o tamanho atual.
10. Acessibilidade base acima da média (skip-link, aria-current/pressed, reduced-motion em tudo, sr-only no ticker).

## 20. Pontos fracos (por impacto)

**Crítico**
- C1. Countdown sem estado pós-final — em 17 dias o site exibirá 00:00:00 para sempre (credibilidade).
- C2. Zero mecanismos de compartilhamento/atribuição num produto cujo objetivo é viralizar (incl. vídeo do Modo cinema sem marca).

**Alto**
- A1. Fotos de /estadios e /historia no mesmo padrão lazy+wrapper-animado que escondeu a taça no mobile.
- A2. Dica "Win + Alt + R" exibida em celulares (instrução impossível de seguir).
- A3. Canvas 3D sem fallback de WebGL (tela escura muda em aparelhos antigos/navegadores restritos).
- A4. Render 3D contínuo fora da viewport (bateria/aquecimento — justamente no público mobile).
- A5. Long-tail SEO inexplorada (sem páginas por estádio/edição).

**Médio**
- M1. Curiosidades sem filtro por tag nem âncoras compartilháveis.
- M2. Menu mobile sem Esc/gestão de foco.
- M3. Sem indicação de overflow no seletor de estádios e troca de modelo sem transição.
- M4. Resíduos de linguagem antiga (3 pílulas) + tags com cara de botão.
- M5. Sem placeholder/preconnect nas imagens remotas (flash vazio).
- M6. Créditos de foto em 10px no limite de contraste.

**Baixo**
- B1. Salto tipográfico do hero em 640px.
- B2. Nó da timeline desalinhado quando o card tem foto.
- B3. Rodapé anêmico (sem social/autoria).
- B4. Sem estado :active nos botões; anel de foco invisível sobre dourado.
- B5. OG image única para todas as rotas.

## 21. Roadmap

**Imediatas (horas):**
1. Estado pós-final do countdown (C1) — "🏆 [Campeão] — campeão do mundo de 2026" quando zerar; barato e evita o vexame de 20/07.
2. Dica de gravação contextual por plataforma (A2) — mobile: "grave com a captura de tela do seu celular".
3. Eager/ajuste do padrão de imagem em /estadios e /historia (A1) — mesmo remédio já validado na taça.
4. Marca d'água do Modo cinema (C2-parcial) — canto inferior, tipografia da casa; transforma cada vídeo em aquisição.

**Curto prazo (dias):**
5. Botões compartilhar/copiar-link + âncoras por curiosidade e por estádio (C2, M1-parcial).
6. Fallback WebGL com mensagem + fotos (A3); pausa do render fora da viewport (A4).
7. Filtro por tag nas curiosidades (M1); fade de overflow no seletor (M3).
8. Preconnect + placeholder de cor nas imagens (M5); menu mobile com Esc/foco (M2).

**Médio prazo (1–3 semanas):**
9. **Páginas por estádio** com o 3D correspondente + foto + história (A5) — o multiplicador de SEO; depois páginas por edição.
10. Crossfade na troca de estádio; extração do componente Button; matar as 3 pílulas (M3/M4/§15).
11. OG por rota; schema ItemList/FAQ nas curiosidades (§13).
12. Pós-final: atualizar história com o campeão de 2026, ticker e hero ("23 edições · X campeões").

**Longo prazo:**
13. Domínio próprio (o `.vercel.app` segue cobrando imposto de credibilidade).
14. i18n (EN/ES) — o assunto é global e o custo com 100% SSG é baixo.
15. Camada de retenção leve: "curiosidade do dia" + PWA instalável.

## 22. Notas

| Dimensão | Nota | Justificativa |
|---|---|---|
| UX | 7,5 | Arquitetura rasa e fluxos claros; desconta a dica errada no mobile, curiosidades sem filtro e o countdown-bomba. |
| UI | 8,0 | Grid, espaçamento e alinhamento disciplinados; 3 resíduos de pílula e detalhes de estado (active/foco em dourado). |
| Design Visual | 8,5 | Direção de arte de verdade; hero tipográfico e seção da Taça são portfolio-grade. |
| Identidade | **9,0** | O maior ativo: inconfundível, coerente, com psicologia de cor correta. |
| Performance percebida | 8,0 | Estático + isolamento do 3D; desconta render contínuo e flash das imagens remotas. |
| Acessibilidade | 7,0 | Base forte (AAA de contraste, semântica, reduced-motion), mas lazy+animação nas fotos, WebGL sem fallback e menu sem foco são reais. |
| SEO | 8,0 | Tecnicamente completo; nota não é maior porque a arquitetura atual desperdiça o long-tail. |
| Responsividade | 8,0 | Sem quebras; desconta overflow sem pista no seletor e o salto do hero. |
| Clareza | 8,5 | Propósito e caminhos evidentes; textos editoriais no tamanho certo. |
| Conversão | **5,0** | A nota dura do relatório: para um site cujo sucesso é ser compartilhado, não existe um único mecanismo de compartilhamento ou atribuição. |
| Organização | 8,5 | Home com narrativa, seções com papel claro. |
| Qualidade dos componentes | 7,5 | Cards e fatos excelentes; 3D estrela porém com arestas (fallback, transição); rodapé e botões medianos. |
| Mobile | 7,5 | Leitura ótima; 3D custoso + dica errada + overflow sem pista. |
| Desktop | 8,5 | A Taça e o 3D brilham em tela grande. |
| **Qualidade geral** | **8,0** | Produto com alma e execução acima da média; o que falta é engenharia de crescimento, não design. |

## 23. Conclusão

- **Eu utilizaria diariamente?** Diariamente não — e esse é o diagnóstico mais importante: o site é um *destino* lindo, não um *hábito*. Falta o motivo de retorno (novidade diária visível, resultado da final, curiosidade do dia).
- **Parece premium?** Sim, sem ressalvas — tipografia, paleta, grão, 3D e a Taça compõem percepção de produto caro.
- **Acima ou abaixo da média dos sites esportivos?** Em estética, velocidade e originalidade: **muito acima** (incluindo FIFA e UEFA). Em profundidade e retenção: abaixo dos grandes portais — por escopo, não por defeito.
- **O que impede de ser referência?** Quatro coisas, nesta ordem: (1) crescimento — não há como compartilhar nem atribuir nada; (2) o pós-19/07 — sem plano para o dia seguinte à final, o site nasce com data de validade; (3) profundidade — sem páginas por estádio/edição, o Google não tem onde ranquear o site; (4) domínio próprio.

**As 20 melhorias de maior impacto (ordem recomendada):**
1. Estado pós-final do countdown (e plano do "dia seguinte")
2. Marca d'água do Modo cinema (atribuição em cada vídeo)
3. Botões de compartilhar/copiar link em curiosidades e estádios
4. Dica de gravação contextual por plataforma
5. Corrigir lazy+animação nas fotos de /estadios e /historia
6. Fallback amigável quando WebGL indisponível
7. Pausar o render 3D fora da viewport/aba
8. Páginas dedicadas por estádio (SEO long-tail + link direto p/ cada 3D)
9. Filtro por tag + âncoras nas curiosidades
10. Teaser do 3D visível no hero (ou taça no hero)
11. Crossfade na troca de estádio
12. Fade de overflow + hint de gesto no seletor 3D
13. Menu mobile com Esc e gestão de foco
14. Placeholder de cor + preconnect nas imagens remotas
15. Extração do componente Button + matar as 3 pílulas
16. Atualização pós-final da história/ticker/hero (23º campeão)
17. OG image por rota
18. Schema ItemList/FAQ nas curiosidades
19. Créditos de foto para 11px/80%
20. Domínio próprio

*Fim do relatório. Nenhum arquivo do produto foi alterado; nenhum commit foi realizado.*
