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
   recebe o espectro sólido (a aurora e a cifra 40% são as exceções aprovadas).
3. **Paleta**: hex extraídos do `LogoOMID.svg` oficial (teal #40ADB7 … âmbar #F8B241). Não aproximar.
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
10. **O duelo é honesto nos dois sentidos.** Na configuração-padrão em Linux a Oracle sai ~31% MAIS BARATA que
    a OMID (E4.Flex a US$ 0,025/OCPU·h e saída grátis até 10 TB) — e o bloco diz isso, em verde, sem
    esconder. Com Windows a OMID vence os quatro. Quem pedir para "sumir" com a Oracle está pedindo para
    quebrar a regra 9.

## Armadilhas conhecidas

- `url()` em `shared.mjs` DEVE emitir caminhos absolutos com `/` inicial (bug histórico: pt saía
  relativo e quebrava canonicals — já corrigido; a auditoria em tools cobre isso).
- Classe `abre` é ESTADO de widgets (idioma/sanfona/troca) — nunca usar como nome de seção.
- Classe `prova` é a GRADE DO SIMULADOR (`ui.mjs → regua`). O bloco do 40% se chama `cmp`; já colidiu uma
  vez e o comparativo herdou o layout do simulador sem ninguém perceber.
- `translate:` (propriedade) + `transform: translate()` no keyframe SOMAM — o elemento anda o dobro. Aconteceu
  três vezes nesta base. Use um ou outro.
- `filter: blur()` dentro de `preserve-3d` é rasterizado à parte e o borrão escapa do elemento. Use `box-shadow`.
- **Como o duelo é "ao vivo" sem servidor:** a página lê `assets/dados/precos-nuvem.json` (snapshot diário do
  GitHub Actions) e, no navegador, refina o que libera CORS — câmbio (BCB) e Oracle. AWS (arquivo de 290 MB),
  Azure (sem CORS) e Google (páginas) só pelo robô. Se o JSON não carregar, o bloco fica escondido.
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
- Vigência da tabela de preços pública.
- Fundir a branch `aberturas-e-ajustes` (8 modelos de abertura em `/aberturas/`, nenhum aplicado à home).
- Suporte nos hyperscalers no duelo (AWS Business, Azure Standard…) — a OMID inclui NOC; os outros cobram à
  parte. Só entra com preço oficial sourceado, como o resto.

## Publicação

Estático puro: qualquer host serve (`/pasta/` → `/pasta/index.html`). `omid-site.zip` pronto
para Netlify Drop/Vercel. Prévia de link único: `tools/gerar-previa.py`.
