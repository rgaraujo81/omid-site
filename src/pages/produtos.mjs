import { prodMeta, certDots, site } from '../shared.mjs';
import { ver, rotulo, botao, botaoSim, cabeca, item, pilha, quadro, checa, letreiro, defs, tela, chamada, lume } from '../ui.mjs';
import { chapeu } from '../layout.mjs';

const CORES = ['var(--a)', 'var(--t)', 'var(--i)', 'var(--m)', 'var(--r)'];

/* ---------- Hub de soluções ---------- */
export const hub = (ctx) => {
  const { L, u } = ctx;
  const certs = L.certificacoes.map(([t, d], i) => ({ t: `${t} · ${d}`, cor: certDots[i] }));
  return `
${chapeu(ctx, {
  trilha: [{ t: L.nav.solucoes }], rot: L.hub.eb, h: L.hub.h, p: L.hub.p,
  acao: `${botaoSim(ctx, L.c.simularPreco, true)}${botao(L.c.especialista, u('contato'), 'botao--vazio botao--g')}`
})}

${letreiro(certs)}

<section class="bloco">
  <div class="faixa-p max">
    ${pilha(prodMeta.map((p, i) => item({
      n: String(i + 1).padStart(2, '0'), t: p.nome, d: L.produtos[i].resumo,
      cor: CORES[i], href: u('solucoes', p.slug),
      etiquetas: L.produtos[i].bullets.slice(0, 3)
    })))}
  </div>
</section>

<section class="bloco inv">
  <div class="regua regua--inv" aria-hidden="true"></div>
  <div class="faixa-p max" style="position:relative;z-index:1">
    ${cabeca({ rot: L.hub.escolhaEb, h: L.hub.escolhaH })}
    <div class="t-56">
      ${pilha(L.hub.escolha.map(([q, idx], i) => item({
        n: String(i + 1).padStart(2, '0'), t: q, d: prodMeta[idx].nome,
        cor: CORES[idx], href: u('solucoes', prodMeta[idx].slug)
      })))}
    </div>
  </div>
</section>

${chamada(ctx)}
`;
};

/* ---------- Página de produto ---------- */
export const produto = (ctx, i) => {
  const { L, u } = ctx;
  const m = prodMeta[i], p = L.produtos[i], U = L.prodUI;
  const cor = CORES[i];
  const outros = prodMeta.map((o, j) => ({ ...o, i: j })).filter((o) => o.i !== i);
  return `
${chapeu(ctx, {
  trilha: [{ t: L.nav.solucoes, href: u('solucoes') }, { t: m.curto }],
  rot: `${m.nome} · ${p.tag}`, h: p.titulo, p: p.lead,
  acao: `${botaoSim(ctx, L.c.simularPreco, true)}${botao(L.c.especialista, u('contato'), 'botao--vazio botao--g')}`
})}

<section class="bloco bloco--curto regra">
  <div class="faixa-p max">
    <div class="duo duo--alto">
      <div${ver()}>
        ${rotulo(U.porque)}
        <h2 class="grita t-16">${U.porqueH} ${m.curto}.</h2>
      </div>
      <div${ver(1)}>${checa(p.bullets, cor)}</div>
    </div>
  </div>
</section>

<section class="bloco">
  <div class="faixa-p max">
    ${cabeca({ rot: U.incluso, h: `${U.inclusoH}<br>${m.nome}` })}
    <div class="t-56">
      ${pilha(p.blocos.map(([t, d], j) => item({ n: String(j + 1).padStart(2, '0'), t, d, cor })))}
    </div>
  </div>
</section>

<section class="bloco inv">
  <div class="regua regua--inv" aria-hidden="true"></div>
  <div class="faixa-p max" style="position:relative;z-index:1">
    <div class="duo duo--alto">
      <div>
        ${rotulo(U.aplic)}
        <h2 class="berro t-16 respira">${U.aplicH} ${m.curto}<br>${U.aplicH2}.</h2>
        <p class="lead apaga t-24">${U.aplicP}</p>
        <div class="linha-botoes t-32">${botao(U.aplicBtn, u('contato'))}</div>
      </div>
      <div${ver(1)}>${defs(p.aplicacoes.map((a, j) => [String(j + 1).padStart(2, '0'), a]))}</div>
    </div>
  </div>
</section>

${m.slug === 'omid-smart-colocation' ? `
<section class="bloco">
  <div class="faixa-p max">
    ${cabeca({ rot: L.video.eb, h: L.video.h, p: L.video.p })}
    <div class="t-32">${tela({ id: L.video.id, titulo: L.video.titulo, meta: L.video.meta })}</div>
  </div>
</section>` : ''}

<section class="bloco regra">
  <div class="faixa-p max">
    ${cabeca({ rot: U.combina, h: U.combinaH })}
    <div class="quadros t-32">
      ${outros.map((o, j) => quadro({
        t: o.curto, d: L.produtos[o.i].resumo, cor: CORES[o.i], href: u('solucoes', o.slug), i: j
      })).join('')}
    </div>
  </div>
</section>

${chamada(ctx, { h: `${U.ctaH}<br>${m.curto}.`, p: U.ctaP })}
`;
};
