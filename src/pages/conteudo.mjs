import { certDots, site } from '../shared.mjs';
import { ver, rotulo, botao, cabeca, item, pilha, chamada } from '../ui.mjs';
import { chapeu } from '../layout.mjs';

/* ---------- Documentação ---------- */
export const docs = (ctx) => {
  const { L, u } = ctx; const D = L.docs;
  return `
${chapeu(ctx, { trilha: [{ t: D.eb }], rot: D.eb, h: D.h, p: D.p,
  acao: `${botao(D.btn, site.app)}${botao(L.c.especialista, u('contato'), 'botao--vazio')}` })}

<section class="bloco">
  <div class="faixa-p max">
    ${pilha(D.links.map(([t, d], i) => item({
      n: String(i + 1).padStart(2, '0'), t, d, cor: certDots[i], href: site.app
    })))}
  </div>
</section>

${chamada(ctx)}
`;
};
