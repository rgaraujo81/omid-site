# OMID — site novo

Site institucional da OMID Solutions em **HTML, CSS e JavaScript puros**, em três idiomas
(**pt-BR, EN, ES**), sem framework, sem dependências e sem etapa de build para rodar.

O HTML final já está commitado na raiz. Um gerador em Node monta essas páginas a partir de um
conteúdo centralizado — assim, mudar um texto em um lugar atualiza as 66 páginas.

---

## Rodar localmente

```bash
node serve.mjs
```

Abre em `http://localhost:4321`. O servidor é um arquivo só, sem dependências.

> As páginas usam caminhos absolutos (`/assets/...`), então precisam ser servidas por HTTP —
> abrir o `index.html` direto pelo Finder não carrega o CSS.

## Regerar o site depois de editar conteúdo

```bash
node build.mjs
```

Gera as 66 páginas (22 × 3 idiomas), o `sitemap.xml` com `hreflang` e o `robots.txt`.

---

## Onde mexer

| Quero mudar | Arquivo |
|---|---|
| Um texto em português | `src/i18n/pt.mjs` |
| Um texto em inglês | `src/i18n/en.mjs` |
| Um texto em espanhol | `src/i18n/es.mjs` |
| Telefone, e-mail, endereço, redes sociais | `src/shared.mjs` |
| Valores da tabela de preços | `src/shared.mjs` → `precoValores` |
| URL de uma página (por idioma) | `src/shared.mjs` → `routes` |
| Cores, tipografia, espaçamento | `assets/css/omid.css` (seção 1, *Tokens*) |
| Ilustrações SVG | `src/art.mjs` |
| Cabeçalho, menu, rodapé | `src/layout.mjs` |
| Estrutura de uma página | `src/pages/*.mjs` |

Depois de qualquer edição em `src/`, rode `node build.mjs`.

---

## Estrutura

```
index.html                    home pt-BR
en/  es/                      mesmas páginas nos outros idiomas
produtos-e-solucoes/…         5 produtos + hub
tabela-de-precos/  faq/  contato/  sobre-a-omid/  partner-program/ …
assets/css/omid.css           todo o design system
assets/js/omid.js             interações (sem dependências)
assets/img/                   marca e favicon
src/                          fonte do gerador
build.mjs                     gera o site
serve.mjs                     servidor local
```

### As 22 páginas (× 3 idiomas)

Home · Soluções (hub) · Smart Cloud · Smart Colocation · Smart IT Services · Smart CyberSecurity ·
Cloud Cognitiva · Cloud inteligente · Para quem é · Preços · Sobre a OMID · Integridade e Compliance ·
Partner Program · Partner Program (agradecimento) · Conteúdo · Blog · Cases · Vídeos e podcasts ·
Documentação · FAQ · Contato · Política de Privacidade

---

## Design — CONCRETO

Concretismo brasileiro aplicado a infraestrutura: papel de jornal (`#F2F0EB`), tinta cheia,
Archivo variável (eixo de largura 75–125) como matéria-prima, IBM Plex Mono nos rótulos técnicos.
**Sem cards, sem sombras, sem cantos arredondados.** O hover inverte o bloco em tinta; seções
alternam positivo e negativo. Três conceitos navegáveis que originaram a direção continuam em
`/conceitos/` (Concreto · Operação · Território).

**As dobras** — cada fronteira entre seções tem um corte próprio, guiado pela rolagem
(`animation-timeline`, nativo, zero biblioteca), e nunca o mesmo em vizinhas:
`CORTE` (sobe revelada por clip) · `INVERTE` (a tinta engole o papel, com desaceleração no fim) ·
`COLAPSO` (o tipo comprime de 62% e abre até 118% do eixo de largura). Um fio dispara da esquerda
anunciando cada dobra. Nas páginas internas a coreografia é atribuída automaticamente (`dobras()`).

**O simulador da casa** — na home, logo sob o 40%: sistema operacional (Linux/Windows), vCPU,
memória, SSD, backup e tráfego de saída, com **fatura discriminada** recalculada no mesmo quadro
do arrasto, usando os valores públicos da tabela (`precoUnit` em `src/shared.mjs`). Todos os
botões "Simular preço" do site levam a `/#simular`; o portal externo só abre no momento de
**contratar**. É o único elemento do site com o espectro cheio da marca.

**O bloco quieto** — entre a soberania e a chamada final, a única frase em caixa baixa do site,
sem nenhum movimento. O silêncio que faz os gritos valerem.

**Cortes de lançamento** — Blog, Cases, Vídeos e o hub de Conteúdo saíram (eram vitrines "em
preparação"); voltam quando houver conteúdo real, recriando as entradas em `build.mjs` e as
rotas em `shared.mjs`. O site lança com 18 páginas × 3 idiomas = 54.


## Multi-idioma

- **URLs traduzidas** por idioma: `/produtos-e-solucoes/`, `/en/solutions/`, `/es/productos-y-soluciones/`.
- `hreflang` recíproco em todas as páginas e no sitemap, com `x-default` apontando para pt-BR.
- Seletor de idioma no menu (desktop) e no painel (mobile), preservando a página atual.
- Nomes de produto (`Omid Smart Cloud®` etc.) e valores em R$ não são traduzidos.

---

## Acessibilidade e SEO

- HTML semântico, um `<h1>` por página, hierarquia de títulos correta.
- Landmarks, `aria-expanded` nos menus, foco visível, link "pular para o conteúdo".
- Todo SVG informativo tem `role="img"` e `aria-label`; os decorativos, `aria-hidden`.
- Alvos de toque de 44px no mobile.
- Canonical, Open Graph, JSON-LD `Organization`, sitemap e robots gerados no build.

---

## Antes de publicar

O que **já está resolvido**:

1. **Logo** — usa o `LogoOMID.svg` oficial, baixado do site atual. A única alteração foi trocar o
   `fill="#fff"` do wordmark por `currentColor`, para a mesma arte servir ao topo claro e ao rodapé
   escuro. Gerado em `src/logo.mjs`; o original fica em `assets/img/logo-oficial.svg`.
2. **Redes sociais** — as URLs que eu havia inferido estavam **erradas** (dois 404). Foram
   substituídas pelas reais, extraídas do rodapé de omid.com.br e da página do vídeo, todas
   verificadas com HTTP 200:
   `linkedin.com/company/omid-brazil` · `instagram.com/omid.smart.cloud` ·
   `facebook.com/omidsolution` · `youtube.com/@Omidcloud`
3. **Formulários** — funcionam de verdade: validação com foco e mensagem no idioma da página,
   armadilha anti-spam, estado de envio, mensagem de sucesso e caminho alternativo por e-mail em
   caso de falha. Para ligar ao seu backend, preencha `endpoint` em `src/shared.mjs` → `form`.
   Vazio, roda em modo demonstração e nada sai do navegador.
4. **Política de Privacidade** — 12 seções estruturadas segundo a LGPD, nos três idiomas, com aviso
   visível de que é minuta e depende de revisão jurídica. Em `src/i18n/*.mjs` → `privacidade`.
5. **Cases** — a página é orientada a dados. Hoje `casesData.itens` está vazio e ela mostra o estado
   honesto de "em preparação" mais um convite para o cliente virar case. Basta preencher o array
   com `{setor, titulo, desafio, solucao, resultado}` que a grade aparece sozinha.
6. **Acessibilidade e SEO** — auditoria automática nas 66 páginas: um `<h1>` por página, hierarquia
   de títulos sem salto, todo SVG rotulado, todo campo com label, `description` entre 60 e 155
   caracteres, canonical e `hreflang` recíproco com `x-default`. Zero pendências.

O que **ainda depende de você**:

- **Endpoint dos formulários** — uma linha em `src/shared.mjs`.
- **Revisão jurídica da política** e confirmação dos prazos de retenção.
- **Cases reais** — nada foi inventado; a estrutura espera o conteúdo.
- **Revisão nativa das traduções** — pt/en/es estão com as 311 chaves alinhadas e sem vazamento de
  idioma (verificado por script), mas texto comercial merece um par de olhos humano.
- **Preços** — confirmar a vigência da tabela publicada em `omid.com.br/tabela-de-precos`.
- **Comparativo com nuvens globais** — compara modelos de contratação, não provedores, e traz nota
  de rodapé. Vale uma leitura do jurídico/marketing.


## Publicar

É um site estático: sobe em qualquer lugar (Vercel, Netlify, Cloudflare Pages, S3 + CloudFront,
ou o seu próprio Nginx). Basta servir a raiz do projeto e garantir que `/pasta/` resolva para
`/pasta/index.html`.
