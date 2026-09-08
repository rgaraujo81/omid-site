# OMID — site novo · guia de continuidade

Site institucional da OMID Solutions (cloud pública soberana brasileira). HTML/CSS/JS puros,
zero dependências, 54 páginas geradas (18 × pt/en/es) por um gerador estático em Node.

## Comandos

```bash
node serve.mjs      # roda em http://localhost:4321 e REFAZ as páginas sozinho a cada save em src/
node build.mjs      # regenera as 54 páginas + sitemap + robots (só é preciso à mão se o serve não estiver rodando)
node --max-old-space-size=6144 tools/precos-nuvem.mjs   # atualiza os preços dos hyperscalers (o Actions roda isto todo dia)
python3 tools/gerar-previa.py   # empacota o site inteiro num único HTML navegável (prévia compartilhável)
bash tools/gerar-video.sh       # regenera os loops de vídeo da marca (não usados na geração atual)
```

**Nunca edite os `index.html` gerados** — são sobrescritos pelo build. Edite `src/` e rode o build.

## Onde mexer

| Mudar | Arquivo |
|---|---|
| Texto pt / en / es | `src/i18n/{pt,en,es}.mjs` (311 chaves espelhadas — mantenha os 3 em paridade) |
| Contatos, endereços, redes, preços unitários, rotas | `src/shared.mjs` |
| Design system inteiro | `assets/css/omid.css` |
| Interações (portal, halo, simulador, revelações) | `assets/js/omid.js` |
| Shader da aurora | `assets/js/aurora.js` |
| Estrutura das páginas | `src/pages/*.mjs` · layout/nav/rodapé em `src/layout.mjs` · componentes em `src/ui.mjs` |
| Logo | `src/logo.mjs` (gerado do LogoOMID.svg oficial; wordmark usa currentColor) |
| Comparativo de preços (o "duelo") | marcação em `src/ui.mjs` (`duelo`), cálculo em `assets/js/omid.js` (dentro de `reguaPreco`), dados em `assets/dados/precos-nuvem.json`, robô em `tools/precos-nuvem.mjs` + `.github/workflows/precos-nuvem.yml` |

## Regras de design (decididas com o dono — não reverter sem ele)

1. **Geração atual: "SERENO"** — papel quente #F4F2ED, caixa de sentença, curvas contínuas,
   sombras suaves, calma com um drama por página. As gerações anteriores (minimal clara e
   CONCRETO gritado) foram **rejeitadas**; os 3 conceitos que originaram a direção estão em
   `/conceitos/` como referência histórica.
2. **O gradiente cheio da marca é EXCLUSIVO do botão do simulador.** Nenhum outro elemento
   recebe o espectro sólido (a aurora e a cifra 40% são as exceções aprovadas). As barras do duelo
   usam as cores da marca ISOLADAS, uma por item — nunca o espectro.
3. **Paleta**: hex extraídos do `LogoOMID.svg` oficial (teal #40ADB7 … âmbar #F8B241). Não aproximar.
3b. **Tipografia é escala fechada.** Duas famílias (Archivo para texto, IBM Plex Mono para rótulo), **três
   pesos** (400/500/600 — o 700 saiu) e **dez degraus** `--t-*` no `:root`: mono, xs, s, m, l, t4, t3, t2,
   t1, cifra. **Nenhum `font-size` solto no CSS nem em `style=""`** — se faltar um tamanho, use o degrau
   vizinho. Auditado nas 13 páginas pt em 2026-09-08: 2 famílias, 3 pesos, 10 degraus. As únicas exceções
   são quatro expoentes em `em` relativos ao pai (`.26em` da cifra, `.38em` do placar, `.32em` do `R$`,
   `.17em` do `/mês`) e o `11px` do rótulo dentro do SVG das camadas.
   Histórico: o dono pediu "padrão no tipo e no tamanho" (havia 48 tamanhos e 14 pesos), depois **"ainda
   acho que temos muitas fontes e tamanhos diferentes"** — nessa segunda rodada caíram três pares quase
   idênticos (corpo 17 vs 15,4 · manchete 73,6 vs número 67,2 · mono 11,2 vs 9,9) e os últimos `font-size`
   inline, que viviam no rodapé (endereços) e em `institucional.mjs` (pílulas e tabelas).
   **O IBM Plex Mono tem DOIS papéis e mais nenhum** (dono, 2026-09-08: "quero passar a noção de seriedade
   e sobriedade"): (1) o rótulo curto em caixa alta com tracking largo (`.mono`), e (2) identificador técnico
   de máquina (`t3.2xlarge · sa-east-1`), em caixa baixa e sem tracking. Não é mono: valor em dinheiro,
   sufixo (`/mês`), nota de rodapé, frase explicativa nem texto de botão — tudo isso é Archivo. O comparativo
   chegou a usar mono em sete papéis e doze espaçamentos de letra diferentes; hoje são dois papéis. Número em
   dinheiro leva `font-variant-numeric: tabular-nums`, não a família mono.
   Há um **reset `h1..h6 { font-size: inherit; font-weight: inherit }`**: sem ele um título sem regra entra
   com o padrão do navegador (1.17em) e cria um degrau fantasma — aconteceu com o `h3` da sanfona; o
   `th` do `thead` entrava em 700 pelo mesmo motivo.
   **Sobriedade, profissionalismo e minimalismo** são o filtro de qualquer decisão visual: na dúvida, tirar.
3c. **A abertura é céu e nuvem — SEM o logo.** `nuvens()` em `ui.mjs`, CSS 5b: aurora roxa ao fundo e dois
   planos de nuvem (as de trás largas e lentas, as da frente densas e mais borradas), com o texto na frente.
   Nada de 3D aqui, então `filter: blur()` é seguro.
   **Histórico, para ninguém repetir:** o dono pediu o símbolo gigante voando entre as nuvens e depois
   **cancelou** — "deixe apenas as nuvens já que você não conseguiu fazer" (2026-09-08). Quatro tentativas
   foram rejeitadas: placas genéricas em CSS que não eram o logo ("o que você usou não é o logo da OMID"),
   o símbolo inteiro cortado nas bordas virando rabisco, o mesmo com emendas duras nas laterais, e a
   superestrutura só com um pedaço à mostra ("horrível"). Não reabrir sem pedido explícito dele.
   **Duas armadilhas que este bloco resolveu e valem para qualquer fundo:**
   - `mask-image` PINTA mas não CORTA. Fundo maior que a tela precisa de `overflow: clip` de verdade, senão
     a página ganha rolagem lateral (chegou a 7.500px numa das tentativas).
   - Fundo preso a `inset: 0` para na largura da SEÇÃO (1440) enquanto a aurora vai até a borda da tela — o
     encontro dos dois desenha um retângulo mais claro no meio, que o dono viu na hora. Fundo de abertura é
     sangria total (`left: 50%; width: 100vw; transform: translateX(-50%)`), e o preço disso é rolagem
     lateral, porque `100vw` conta a barra — daí o `body { overflow-x: clip }` (`clip`, não `hidden`:
     `hidden` cria contexto de rolagem e quebra `position: sticky`).
   - A aurora ficou ROXA (`paleta()` em `aurora.js`: índigo → roxo → magenta). Razão do dono: "azul é o
     padrão visual da Microsoft". Teal e ciano seguem na paleta do site, só não lideram mais o céu.
4. **Movimento é classe `.viu` + transição via IntersectionObserver.** NUNCA usar
   `animation-timeline`/scroll-timelines para estados de entrada — travou no Safari do dono
   deixando conteúdo invisível (lição cara). Nada pode ficar oculto sem a classe `.sdt`
   (só o JS vivo a adiciona) e a 1ª tela tem fallback de 350ms.
5. **A aurora** (`aurora.js`) é WebGL puro com a paleta exata do logo; reage a cursor e
   velocidade de rolagem; 1º quadro é síncrono (nunca canvas preto); pausa fora de cena;
   um quadro só em reduced-motion. Se pedirem "mais wow", evoluir a aurora — não trocar a fundação.
6. **Simulador é a peça central** (`/#simular`): fatura discriminada calculada no navegador com
   `precoUnit` (valores da tabela pública). Todos os CTAs "Simular preço" apontam para a âncora;
   o portal externo (`smart-oc2.omid.com.br`) só abre em "Contratar este desenho".
7. Blog/Cases/Vídeos/hub de Conteúdo foram **cortados do lançamento** (estavam vazios).
   Recriar = restaurar as entradas em `build.mjs` + rotas em `shared.mjs` (o conteúdo i18n ainda existe).
8. Nomes de produto (`Omid Smart Cloud®`…) e valores em R$ **não se traduzem**.
9. **Preço de concorrente nunca é inventado.** O duelo (abaixo do simulador) só mostra números que vieram de
   fonte oficial com data: AWS Price List, Azure Retail Prices API, catálogo público da Oracle, páginas de
   preço do Google e PTAX do BCB. Base: on-demand, sem compromisso, região São Paulo, câmbio PTAX venda.
   Cada número tem a URL de origem listada no próprio bloco ("Fontes e método"). Isto é publicidade
   comparativa — se um dia não der para provar, o bloco sai, não se ajusta.
10. **O duelo compara com AWS, Azure e Google — a Oracle foi retirada por decisão do dono em 2026-09-08.**
    Isso é escolha de escopo, não maquiagem: o bloco diz com quem compara e cada número continua sourceado.
    Para registro, a Oracle sai ~31% mais barata que a OMID em Linux (E4.Flex a US$ 0,025/OCPU·h e saída
    grátis até 10 TB) e +45% mais cara com Windows. O robô continua coletando os preços dela no JSON
    (`provedores.oci`); reincluir é acrescentar `'oci'` a `ORDEM` em `ui.mjs` e `omid.js`.

## Armadilhas conhecidas

- `url()` em `shared.mjs` DEVE emitir caminhos absolutos com `/` inicial (bug histórico: pt saía
  relativo e quebrava canonicals — já corrigido; a auditoria em tools cobre isso).
- Classe `abre` é ESTADO de widgets (idioma/sanfona/troca) — nunca usar como nome de seção.
- Classe `prova` é a GRADE DO SIMULADOR (`ui.mjs → regua`). O bloco do 40% se chama `cmp`; já colidiu uma
  vez e o comparativo herdou o layout do simulador sem ninguém perceber.
- `translate:` (propriedade) + `transform: translate()` no keyframe SOMAM — o elemento anda o dobro. Aconteceu
  três vezes nesta base. Use um ou outro.
- `filter: blur()` dentro de `preserve-3d` é rasterizado à parte e o borrão escapa do elemento. Use `box-shadow`.
- **Tipo de máquina no simulador:** quatro degraus da tabela pública, cada um com o SEU preço de vCPU E de
  memória (`tiposMaquina` em `shared.mjs`): Eco 32,42 + 11,60 · Pro 73,00 + 26,11 · XPro 110,00 + 29,00 ·
  UMax 356,56 + 29,00. Pro-G2 custa igual ao Pro e o Kubernetes segue a mesma tabela por degrau — por isso
  não são opções à parte. Tabela lida em 2026-09-08, vigência publicada até 27/11/2027.
- **De/para de famílias no duelo** (pedido do dono em 2026-09-08): cada degrau puxa a família equivalente
  em `provedores.<x>.familias.<degrau>` do JSON, com `modo`/`unidade`/`usdHora` próprios; o robô coleta todas.
  Mapa (a OMID não publica o que os degraus são tecnicamente; Eco/Pro/XPro por convenção de mercado, UMax
  por regra do dono em 2026-09-08 — "a máquina mais forte deles"):
  Eco ↔ burstable (t3.2xlarge, B8s v2, e2-standard-8) · Pro ↔ uso geral (m6i.2xlarge, D8s v5, N2) ·
  XPro ↔ otimizada para computação (c6i.2xlarge 8/16, F8s v2 8/16, c2-standard-8) · UMax ↔ a família PREMIUM
  MAIS CARA de 8 vCPU de cada provedor em São Paulo, fora GPU, storage-optimized, bare metal e host dedicado,
  com a memória que ela traz: m5zn.2xlarge (4,5 GHz, 8/32), E8bds v5 (8/64), c3-highmem-8 (8/64). É escolha
  de escopo declarada no método e no nome da instância em cada linha — como a saída da Oracle (regra 10) —
  e cada preço continua vindo da fonte oficial. Levantamento que embasou a escolha: entre as 8 vCPU de até
  64 GiB, a mais cara da AWS fora GPU/storage é a r4 (geração antiga, excluída) e depois a m5zn; na Azure,
  L8s v3 (storage, excluída) e depois Ebdsv5; no Google, C3 highmem (a C4, mais nova, é mais barata — não
  foi escolhida porque o critério é preço da família premium, não geração). Trocar o de/para = editar
  `familias` no JSON e o SKU/instância no robô; o JS não sabe de família nenhuma. Sem preço na família, o JS
  cai na família-padrão do provedor (uso geral) e `semEquivalente: true` põe o aviso na linha.
- **A seção "Integração vertical" da home é a figura isométrica das camadas** (`camadas()` em `ui.mjs`,
  CSS 10b, JS `lajes()`): quatro lajes em SVG (topo + duas faces, tingidas na cor da camada, grão de concreto
  na base) à esquerda, fixas na rolagem, e uma linha por camada à direita. Cada laje sobe 48px por `--k` via
  `transform`; a laje ativa levanta via `translate` (os dois canais somam de propósito). Passar o mouse numa
  linha ativa a laje; sem ninguém, o JS percorre as camadas a cada 2,6s, só com a seção em cena e nunca em
  reduced-motion. Refeita a pedido do dono em 2026-09-08 ("deixe lindo" → "mais bonito"): a versão de cartões
  empilhados foi rejeitada. **A distribuição é de duas colunas que terminam juntas** (dono: "que espaço
  gigante em branco, melhore a distribuição"): o cabeçalho da seção mora DENTRO da coluna esquerda, acima da
  figura — antes ele era full-width por cima da grade e deixava o canto superior direito vazio. A coluna
  esquerda é `grid-template-rows: auto 1fr` com a figura centrada na sobra, e `align-items: stretch` na
  grade, então as duas colunas têm exatamente a mesma altura em qualquer conteúdo. Não voltar a pôr o
  `cabeca()` fora de `camadas()`. `item`/`pilha` seguem sendo o componente das listas de produtos e
  soberania — não misturar.
- **O respiro vertical é escala fechada, como a tipografia.** Três degraus no `:root` e **nenhum
  `padding-block` solto em seção**. Histórico, porque o dono mudou de ideia vendo renderizado: pediu "mais
  espaço" (fui a 171px/lado, 342px entre dobras), depois "padronize", depois **"diminui isso para 1/3 e igual
  todas as outras"** — valor atual e final: `--dobra` = 57px de cada lado, **116px entre duas dobras**, igual
  em todo o site. `--dobra-c` (41px) no chapéu das páginas internas e no topo do `.bloco--curto`; `--dobra-i`
  (36px) no salto dentro de uma dobra (`.t-dobra`, o 40% → configurador) e na base do chapéu; o rodapé usa
  `--dobra`. No celular caem juntos (82px entre dobras). Únicas exceções: `.abertura`, que é `min-height:
  100svh` centrada (padding é folga interna da 1ª tela, não separação).
- **Vão percebido ≠ padding.** Quando o dono reclamar de "espaço gigante" entre duas seções, MEÇA da última
  coisa pintada até a próxima, não o padding: três coisas inflam o vão sem aparecer no CSS da seção —
  (a) moldura vazia dentro de um SVG (a figura das camadas tinha 40px de margem no viewBox; hoje `M = 14`),
  (b) `align-items: stretch` numa grade de duas colunas, que estica a coluna curta e deixa a última linha
  dela flutuando bem acima da borda (foi o caso: a lista terminava 133px antes da figura — resolvido
  equilibrando o tamanho da figura com o respiro das linhas, hoje 9px de diferença), e (c) seções com fundo
  (`.inv`), cuja borda visual é a do padding e não a do conteúdo.
- **O duelo é um painel institucional numa dobra só** (pedidos do dono em 2026-09-08: "tudo visível de uma
  vez", "um fundo lindo e moderno", e depois "não quero preto, tom de empresa séria e grande" — a versão
  escura foi REJEITADA). Painel claro levantado como folha de relatório: gradiente de papel, fio de 3px em
  índigo no alto como assinatura, malha de planta baixa (48px) só nas bordas e dois véus de índigo/teal nos
  cantos, tudo em pseudo-elementos; o cartão da conta é uma folha branca sobre ele. Duas colunas — esquerda
  com título, cartão da conta e régua do dólar; direita com legenda, as quatro barras, linha de base e
  fontes. Em 1440×900 o painel mede ~680px. Abaixo de 1000px vira uma coluna.
- **Os três grupos de botões do simulador (cenário, tipo de máquina, sistema) são UMA trilha só**, `.troca`,
  com todos os botões da mesma largura (`--chip`, 116px; 104px até 1180px) — decisão do dono em 2026-09-08,
  "use o mesmo botão e tamanho para todos, padrão o da CPU". Quando a trilha não cabe na coluna ela rola de
  lado sem barra e o JS acende `.troca--rola` (esmaecido na borda) até o fim da rolagem. No celular os grupos
  curtos dividem a largura em partes iguais e o de cenários rola. Não voltar aos chips contornados.
- **O simulador tem três alavancas além das réguas:** cenários de um clique (`CENARIOS` em `ui.mjs`;
  os números têm que cair nos passos das réguas), a régua do câmbio (move os concorrentes, a OMID não)
  e o link compartilhável — a configuração inteira vive em `#simular?vcpu=…&so=…&fx=…`, lida no
  load e no `hashchange`.
- **O cartão da economia é uma conta de subtrair, POR MÊS, exposta em três linhas** (nuvem global mais
  barata − OMID = diferença, com o percentual) — sempre contra a MAIS BARATA de AWS/Azure/Google, nunca a
  média. O dono rejeitou a versão anualizada (×12) e a frase "{item} explica X% da diferença" em 2026-09-08
  ("a lógica está errada, algo fácil de entender"). As linhas usam totais já arredondados para fecharem
  sempre; só o percentual sai dos valores exatos.
- **Como o duelo é "ao vivo" sem servidor:** a página lê `assets/dados/precos-nuvem.json` (snapshot diário do
  GitHub Actions) e, no navegador, refina o que libera CORS — o câmbio (BCB). AWS (arquivo de 290 MB), Azure (sem CORS) e
  Google (páginas) só pelo robô. Se o JSON não carregar, o bloco fica escondido.
- O robô lê as páginas do Google por parse do HTML (elas embutem todas as regiões). É a parte mais frágil:
  se o Google mudar a página, o Google para de atualizar e o valor anterior fica, com o erro em `avisos`.
  O caminho robusto é a Cloud Billing Catalog API com chave gratuita (`GCP_API_KEY`) — ainda não implementado.
- O total do simulador é arredondado para inteiro enquanto as parcelas têm centavos (1.051,56 vs 1.052).
- O ponto final da manchete funde-se à palavra anterior no split de letras (não "consertar").
- Portal roda 1×/sessão via `sessionStorage.omidV` — para rever, aba anônima.

## Pendências que dependem do dono

- `form.endpoint` em `src/shared.mjs` (formulários em modo demonstração até lá).
- Revisão jurídica da Política de Privacidade (marcada como minuta nas 3 línguas).
- Cases reais (`casesData.itens` nos i18n) e revisão nativa de EN/ES.
- Fundir a branch `aberturas-e-ajustes` (8 modelos de abertura em `/aberturas/`, nenhum aplicado à home).
- Suporte nos hyperscalers no duelo (AWS Business, Azure Standard…) — a OMID inclui NOC; os outros cobram à
  parte. Só entra com preço oficial sourceado, como o resto.

## Publicação

Estático puro: qualquer host serve (`/pasta/` → `/pasta/index.html`). `omid-site.zip` pronto
para Netlify Drop/Vercel. Prévia de link único: `tools/gerar-previa.py`.
