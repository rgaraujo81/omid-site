/* Gerador estático do site OMID.
   Uso: node build.mjs
   Saída: HTML puro na raiz do projeto (pt), /en e /es. */

import { mkdir, writeFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { LOCALES, meta, routes, url, site, prodMeta } from './src/shared.mjs';
import { page } from './src/layout.mjs';
import pt from './src/i18n/pt.mjs';
import en from './src/i18n/en.mjs';
import es from './src/i18n/es.mjs';

import { home } from './src/pages/home.mjs';
import * as Prod from './src/pages/produtos.mjs';
import * as Inst from './src/pages/institucional.mjs';
import * as Cont from './src/pages/conteudo.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DICT = { pt, en, es };
const strip = (s) => String(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
/* meta description: o Google corta perto de 160 caracteres, então cortamos antes,
   sempre no limite da palavra, para não publicar frase picada. */
const resumo = (s, max = 155) => {
  const t = strip(s);
  if (t.length <= max) return t;
  return t.slice(0, t.lastIndexOf(' ', max - 1)).replace(/[,;:.\u2014-]+$/, '') + '…';
};

/* Uma entrada por página. `key` casa com as rotas em shared.mjs. */
const PAGES = (ctx) => {
  const L = ctx.L;
  const list = [
    { key: 'home',      title: L.site.tagline,   desc: resumo(L.site.desc),          render: home,             prio: '1.0' },
    { key: 'solucoes',  title: strip(L.hub.h),   desc: resumo(L.hub.p),       render: Prod.hub,         prio: '0.9' },
    ...prodMeta.map((m, i) => ({
      key: 'solucoes', sub: m.slug, title: m.nome, desc: resumo(L.produtos[i].lead),
      render: (c) => Prod.produto(c, i), prio: '0.9'
    })),
    { key: 'cloud',       title: strip(L.cloud.h),      desc: resumo(L.cloud.p),      render: Inst.cloudInteligente, prio: '0.8' },
    { key: 'paraQuem',    title: strip(L.paraQuem.h),   desc: resumo(L.paraQuem.p),   render: Inst.paraQuem,        prio: '0.8' },
    { key: 'precos',      title: strip(L.precos.h),     desc: resumo(L.precos.p),     render: Inst.precos,          prio: '0.8' },
    { key: 'sobre',       title: strip(L.sobre.h),      desc: resumo(L.sobre.p),      render: Inst.sobre,           prio: '0.7' },
    { key: 'compliance',  title: L.compliance.eb,       desc: resumo(L.compliance.p), render: Inst.compliance,      prio: '0.5' },
    { key: 'partner',     title: strip(L.partner.h),    desc: resumo(L.partner.p),    render: Inst.partner,         prio: '0.8' },
    { key: 'partnerOk',   title: strip(L.partnerOk.h),  desc: resumo(L.partnerOk.p),  render: Inst.partnerOk,       prio: '0.2' },
    { key: 'docs',        title: strip(L.docs.h),       desc: resumo(L.docs.p),       render: Cont.docs,            prio: '0.6' },
    { key: 'faq',         title: strip(L.faq.h),        desc: resumo(L.faq.p),        render: Inst.faq,             prio: '0.7' },
    { key: 'contato',     title: strip(L.contato.h),    desc: resumo(L.contato.p),    render: Inst.contatoPage,     prio: '0.9' },
    { key: 'privacidade', title: L.privacidade.h,       desc: resumo(L.privacidade.p), render: Inst.privacidade,    prio: '0.3' }
  ];
  return list;
};

async function build() {
  // limpa saídas anteriores sem tocar em assets/ nem src/
  for (const l of ['en', 'es']) await rm(join(ROOT, l), { recursive: true, force: true });
  for (const seg of new Set(Object.values(routes.pt).filter(Boolean))) {
    await rm(join(ROOT, seg), { recursive: true, force: true });
  }
  await rm(join(ROOT, 'index.html'), { force: true });

  const urls = [];
  let count = 0;

  for (const loc of LOCALES) {
    const L = DICT[loc];
    const ctx = { loc, L, u: (key, sub) => url(loc, key, sub) };
    for (const p of PAGES(ctx)) {
      const path = url(loc, p.key, p.sub);
      const html = page({ ...ctx, key: p.key }, {
        title: p.title, desc: p.desc, key: p.key, sub: p.sub,
        body: p.render(ctx)
      });
      const out = join(ROOT, path === '/' ? 'index.html' : path.replace(/^\/|\/$/g, '') + '/index.html');
      await mkdir(dirname(out), { recursive: true });
      await writeFile(out, html, 'utf8');
      urls.push({ path, prio: p.prio, loc, key: p.key, sub: p.sub });
      count++;
    }
  }

  // sitemap com alternates hreflang
  const sm = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map((u) => `  <url>
    <loc>${site.url}${u.path}</loc>
${LOCALES.map((l) => `    <xhtml:link rel="alternate" hreflang="${meta[l].htmlLang}" href="${site.url}${url(l, u.key, u.sub)}"/>`).join('\n')}
    <priority>${u.prio}</priority>
  </url>`).join('\n')}
</urlset>
`;
  await writeFile(join(ROOT, 'sitemap.xml'), sm, 'utf8');
  await writeFile(join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`, 'utf8');

  console.log(`✓ ${count} páginas geradas (${LOCALES.join(', ')}) + sitemap.xml + robots.txt`);
}

build().catch((e) => { console.error(e); process.exit(1); });
