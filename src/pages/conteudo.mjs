import { certDots, site, contato } from '../shared.mjs';
import { ver, rotulo, botao, cabeca, cartoes, lume, chamada } from '../ui.mjs';
import { chapeu } from '../layout.mjs';

/* ---------- Documentação ---------- */
export const docs = (ctx) => {
  const { L, u } = ctx; const D = L.docs;
  return `
${chapeu(ctx, { trilha: [{ t: D.eb }], rot: D.eb, h: D.h, p: D.p,
  acao: `${botao(D.btnPrincipal, site.app)}${botao(L.c.especialista, u('contato'), 'botao--vazio')}` })}

<section class="bloco dobra dobra--fio">
  <div class="faixa-p max">
    ${cabeca({ rot: D.areasEb, h: D.areasH, p: D.areasP })}
    <div class="t-56">
      ${cartoes(D.links.map(([t, d], i) => ({
        rot: String(i + 1).padStart(2, '0'), t, d, cor: certDots[i],
        href: site.app, externo: true, ir: D.btn
      })))}
    </div>
  </div>
</section>

<section class="bloco dobra dobra--fio dobra--corte">
  <div class="faixa-p max">
    ${cabeca({ rot: D.segEb, h: lume(D.segH) })}
    <div class="t-56">
      ${cartoes([
        { rot: D.seg[0][0], t: D.seg[0][0], d: D.seg[0][1], ir: D.seg[0][2], cor: certDots[3], href: u('faq') },
        { rot: D.seg[1][0], t: D.seg[1][0], d: D.seg[1][1], ir: D.seg[1][2], cor: certDots[1], href: u('precos') },
        { rot: D.seg[2][0], t: D.seg[2][0], d: D.seg[2][1], ir: D.seg[2][2], cor: certDots[4], href: contato.noc.href }
      ])}
    </div>
  </div>
</section>

${chamada(ctx)}
`;
};
