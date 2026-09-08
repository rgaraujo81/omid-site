import { site, meta, LOCALES, url, contato, enderecos, social, prodMeta } from './shared.mjs';
import { seta, calc, redes, rotulo, botaoSim, linhas, ver } from './ui.mjs';
import { LOGO_SYMBOL, logoSvg } from './logo.mjs';

const CORES = ['var(--a)', 'var(--t)', 'var(--i)', 'var(--m)', 'var(--r)'];

export const marca = (ctx, cls = '') =>
  `<a class="marca ${cls}" href="${ctx.u('home')}" aria-label="${ctx.L.nav.inicial}">${logoSvg()}</a>`;

const navItens = (ctx) => [
  { t: ctx.L.nav.solucoes, k: 'solucoes', mega: true },
  { t: ctx.L.nav.paraQuem, k: 'paraQuem' },
  { t: ctx.L.nav.precos, k: 'precos' },
  { t: ctx.L.nav.partner, k: 'partner' },
  { t: ctx.L.docs.eb, k: 'docs' },
  { t: ctx.L.nav.sobre, k: 'sobre' }
];

const mega = (ctx) => `
<div class="mega">
  ${prodMeta.map((p, i) => `
  <a class="mega__a" href="${ctx.u('solucoes', p.slug)}" style="--pt:${CORES[i]}">
    <i></i>
    <span class="fala">${p.nome}</span>
    <p>${ctx.L.produtos[i].resumo}</p>
  </a>`).join('')}
  <a class="mega__a" href="${ctx.u('cloud')}" style="--pt:var(--am)">
    <i></i><span class="fala">${ctx.L.footer.cloud}</span><p>${ctx.L.megaSide.p}</p>
  </a>
</div>`;

const idioma = (ctx, alt) => `
<div class="idioma">
  <button class="idioma__b" type="button" aria-expanded="false" aria-label="${ctx.L.nav.idioma}">
    ${meta[ctx.loc].short}
    <svg width="9" height="7" viewBox="0 0 12 8" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m1.5 2 4.5 4 4.5-4"/></svg>
  </button>
  <div class="idioma__l">
    ${LOCALES.map((l) => `<a href="${alt[l]}" hreflang="${meta[l].htmlLang}" lang="${meta[l].htmlLang}"${l === ctx.loc ? ' aria-current="true"' : ''}><span>${meta[l].label}</span><span>${meta[l].short}</span></a>`).join('')}
  </div>
</div>`;

const topo = (ctx, alt) => `
<header class="topo">
  ${marca(ctx)}
  <nav class="menu" aria-label="${ctx.L.nav.principal}">
    ${navItens(ctx).map((n) => n.mega ? `
    <div class="mega-caixa">
      <a class="menu__a" href="${ctx.u(n.k)}"${ctx.key === n.k ? ' aria-current="page"' : ''}><span>${n.t}</span></a>
      ${mega(ctx)}
    </div>` : `
    <a class="menu__a" href="${ctx.u(n.k)}"${ctx.key === n.k ? ' aria-current="page"' : ''}><span>${n.t}</span></a>`).join('')}
  </nav>
  <div class="topo__acao" style="display:flex;gap:8px;align-items:center">
    ${idioma(ctx, alt)}
    ${botaoSim(ctx, ctx.L.c.simularPreco)}
  </div>
  <button class="hamb" type="button" aria-label="${ctx.L.nav.abrirMenu}" aria-expanded="false" aria-controls="gaveta"><span></span></button>
</header>

<div class="gaveta" id="gaveta" aria-hidden="true">
  <nav aria-label="${ctx.L.nav.movel}">
    <p class="gaveta__a" style="--i:0;border-bottom:0;padding-bottom:6px">${ctx.L.nav.solucoes}</p>
    <div class="gaveta__sub">
      ${prodMeta.map((p, i) => `<a href="${ctx.u('solucoes', p.slug)}" style="--pt:${CORES[i]}"><i></i>${p.nome}</a>`).join('')}
      <a href="${ctx.u('cloud')}" style="--pt:var(--am)"><i></i>${ctx.L.footer.cloud}</a>
    </div>
    ${navItens(ctx).filter((n) => !n.mega).map((n, i) => `<a class="gaveta__a" href="${ctx.u(n.k)}" style="--i:${i + 1}">${n.t}${seta}</a>`).join('')}
    <a class="gaveta__a" href="${ctx.u('faq')}" style="--i:6">${ctx.L.nav.faq}${seta}</a>
    <a class="gaveta__a" href="${ctx.u('contato')}" style="--i:7">${ctx.L.nav.contato}${seta}</a>
    <div class="gaveta__pe">
      ${botaoSim(ctx, ctx.L.c.simularAmbiente, true)}
      <a class="botao botao--vazio" href="${ctx.u('contato')}"><span>${ctx.L.nav.cta}</span>${seta}</a>
      <a class="botao botao--vazio" href="${site.app}"><span>${ctx.L.nav.login}</span></a>
    </div>
    <div class="gaveta__idi">
      ${LOCALES.map((l) => `<a href="${alt[l]}" hreflang="${meta[l].htmlLang}"${l === ctx.loc ? ' aria-current="true"' : ''}>${meta[l].short}</a>`).join('')}
    </div>
  </nav>
</div>`;

const rodape = (ctx) => `
<footer class="rodape">
  <div class="regua regua--inv" aria-hidden="true"></div>
  <div class="faixa-p max" style="position:relative;z-index:1">
    <p class="rodape__g">${linhas(ctx.L.footer.grito)}</p>
    <div class="linha-botoes t-32">
      ${botaoSim(ctx, ctx.L.c.simularAmbiente, true)}
      <a class="botao botao--vazio botao--g" href="${ctx.u('contato')}" style="--fg:var(--tinta);border-color:var(--linha)"><span>${ctx.L.nav.cta}</span>${seta}</a>
    </div>

    <div class="rodape__cols">
      <div>
        <h5>${ctx.L.footer.solucoes}</h5>
        <div class="rodape__nav">
          ${prodMeta.map((p) => `<a href="${ctx.u('solucoes', p.slug)}">${p.curto}</a>`).join('')}
          <a href="${ctx.u('cloud')}">${ctx.L.footer.cloud}</a>
          <a href="${ctx.u('precos')}">${ctx.L.footer.precos}</a>
        </div>
      </div>
      <div>
        <h5>${ctx.L.footer.empresa}</h5>
        <div class="rodape__nav">
          <a href="${ctx.u('sobre')}">${ctx.L.nav.sobre}</a>
          <a href="${ctx.u('paraQuem')}">${ctx.L.nav.paraQuem}</a>
          <a href="${ctx.u('partner')}">${ctx.L.nav.partner}</a>
          <a href="${ctx.u('compliance')}">${ctx.L.compliance.eb}</a>
          <a href="${ctx.u('faq')}">${ctx.L.nav.faq}</a>
          <a href="${ctx.u('contato')}">${ctx.L.nav.contato}</a>
        </div>
      </div>
      <div>
        <h5>${ctx.L.footer.fale}</h5>
        <div class="rodape__nav">
          <a href="${contato.noc.href}">NOC ${contato.noc.tel}</a>
          <a href="mailto:${contato.comercial.mail}">${contato.comercial.mail}</a>
          <a href="${site.app}">${ctx.L.footer.cliente}</a>
          <a href="${site.simulador}">${ctx.L.footer.simulador}</a>
        </div>
        <div class="social">
          <a href="${social.li}" aria-label="LinkedIn" rel="noopener">${redes.li}</a>
          <a href="${social.ig}" aria-label="Instagram" rel="noopener">${redes.ig}</a>
          <a href="${social.fb}" aria-label="Facebook" rel="noopener">${redes.fb}</a>
          <a href="${social.yt}" aria-label="YouTube" rel="noopener">${redes.yt}</a>
        </div>
      </div>
      <div>
        <h5>${ctx.L.contato.endEb}</h5>
        <div class="rodape__nav rodape__end apaga">
          ${enderecos.map((e) => `<p><b>${e.cidade} — ${e.uf}</b> <span class="rodape__papel">· ${e.papel === 'dc' ? ctx.L.c.dc : ctx.L.c.escritorio}</span><br>${e.linha}<br>${e.coord}</p>`).join('')}
        </div>
      </div>
    </div>

    <div class="rodape__pe">
      <span>© <span data-ano>2026</span> ${site.full}</span>
      <a href="${ctx.u('compliance')}">${ctx.L.footer.etica}</a>
      <a href="${ctx.u('privacidade')}">${ctx.L.footer.privacidade}</a>
      <span>${ctx.L.footer.direitos}</span>
    </div>
  </div>
</footer>`;

export function page(ctx, { title, desc, body, key = 'home', sub = '' }) {
  const path = url(ctx.loc, key, sub);
  const alt = Object.fromEntries(LOCALES.map((l) => [l, url(l, key, sub)]));
  const full = key === 'home' ? `${site.name} — ${ctx.L.site.tagline}` : `${title} | ${site.name}`;
  const m = meta[ctx.loc];
  return `<!doctype html>
<html lang="${m.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${full}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${site.url}${path}">
${LOCALES.map((l) => `<link rel="alternate" hreflang="${meta[l].htmlLang}" href="${site.url}${alt[l]}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${site.url}${alt.pt}">
<script>try{if(sessionStorage.omidV)document.documentElement.classList.add('sem-portal');else document.documentElement.classList.add('portal-vivo')}catch(e){document.documentElement.classList.add('sem-portal')}</script>
<meta name="theme-color" content="#F2F0EB">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.full}">
<meta property="og:locale" content="${m.ogLocale}">
<meta property="og:title" content="${full}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${site.url}${path}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..125,400..900&family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="/assets/css/omid.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"${site.full}","url":"${site.url}","logo":"${site.url}/assets/img/logo-oficial.svg","description":"${ctx.L.site.desc}","address":[${enderecos.map((e) => `{"@type":"PostalAddress","streetAddress":"${e.linha}","addressLocality":"${e.cidade}","addressRegion":"${e.uf}","postalCode":"${e.cep}","addressCountry":"BR"}`).join(',')}],"contactPoint":[{"@type":"ContactPoint","telephone":"+5511995879982","contactType":"sales","areaServed":"BR","availableLanguage":["Portuguese","English","Spanish"]},{"@type":"ContactPoint","telephone":"08008781250","contactType":"technical support","areaServed":"BR"}],"sameAs":["${social.li}","${social.ig}","${social.fb}","${social.yt}"]}</script>
</head>
<body>
${LOGO_SYMBOL}
<div class="portal" aria-hidden="true"><div class="portal__in">${logoSvg()}<i class="portal__fio"></i></div></div>
<div class="trilho" aria-hidden="true"></div>
<div class="regua" aria-hidden="true"></div>
<a class="pula" href="#conteudo">${ctx.L.nav.pular}</a>
${topo({ ...ctx, key }, alt)}
<main id="conteudo">
${body}
</main>
${rodape(ctx)}
<div class="doca">
  ${botaoSim(ctx, ctx.L.c.simularPreco)}
  <a class="botao botao--vazio" href="${ctx.u('contato')}" style="flex:0 0 auto;padding-inline:20px"><span>${ctx.L.nav.contato}</span></a>
</div>
<script src="/assets/js/omid.js" defer></script>
<script src="/assets/js/aurora.js" defer></script>
</body>
</html>`;
}

/* topo de página interna */
export const chapeu = (ctx, { trilha = [], rot, h, p, acao }) => `
<section class="chapeu faixa-p max">
  ${trilha.length ? `<nav class="trilha mono apaga" aria-label="${ctx.L.nav.trilha}"><a href="${ctx.u('home')}">${ctx.L.c.inicio}</a>${trilha.map((c) => ` / ${c.href ? `<a href="${c.href}">${c.t}</a>` : `<span style="color:var(--tinta)">${c.t}</span>`}`).join('')}</nav>` : ''}
  ${rot ? rotulo(rot) : ''}
  <h1 class="berro t-16 respira">${linhas(h)}</h1>
  ${p ? `<p class="lead apaga t-24">${p}</p>` : ''}
  ${acao ? `<div class="linha-botoes t-32"${ver(1)}>${acao}</div>` : ''}
</section>`;
