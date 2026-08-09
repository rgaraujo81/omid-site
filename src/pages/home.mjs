import { prodMeta, numeroValores, certDots, enderecos } from '../shared.mjs';
import {
  ver, rotulo, botao, botaoSim, varre, cabeca, item, pilha,
  letreiro, defs, chamada, linhas, lume, regua
} from '../ui.mjs';

const CORES = ['var(--a)', 'var(--t)', 'var(--i)', 'var(--m)', 'var(--r)'];

/* A home depois do corte: seis blocos, uma ideia por bloco.
   Abertura → prova (40% + régua) → camadas → soluções → soberania → chamada.
   Tudo que saiu tem página própria e continua no menu e no rodapé. */
export const home = (ctx) => {
  const { L, u } = ctx;
  const H = L.home;
  const faixa1 = L.numCurto.map((t, i) => ({ t, cor: numeroValores[i].dot }))
    .concat(L.certificacoes.map(([t, d], i) => ({ t: `${t} · ${d}`, cor: certDots[i] })));

  return `
<section class="abertura abertura--ive faixa-p max">
  <canvas class="aurora" aria-hidden="true"></canvas>
  <div class="sereno">
    <h1 class="sereno__h ent" style="--e:0">${H.h1a.replace('<br>', ' ')}<b>${H.h1b}</b>.</h1>
    <p class="sereno__p ent" style="--e:1">${H.lead}</p>
    <div class="sereno__acao ent" style="--e:2">
      ${botaoSim(ctx, L.c.simularAmbiente, true)}
      ${varre(L.c.especialista, u('contato'))}
    </div>
  </div>
  <div class="procedencia ent" style="--e:3">
    <p>${L.c.construida} ${enderecos[0].cidade}, ${enderecos[0].uf} · ${enderecos[0].coord}</p>
    <i aria-hidden="true"></i>
  </div>
</section>

${letreiro(faixa1)}

<!-- A PROVA: o número e a régua que o demonstra -->
<section id="simular" class="bloco dobra dobra--colapso">
  <div class="faixa-p max">
    ${rotulo(H.cmp.eb)}
    <div class="cifra cifra--arco t-16">40<sup>%</sup></div>
    <div class="grade-2 t-32 regra" style="padding-top:26px">
      <p class="lead"${ver()}>${H.cmp.p}</p>
      <p class="mono apaga"${ver(1)}>${H.cmp.nota}</p>
    </div>
    <div class="t-56">${regua(ctx)}</div>
  </div>
</section>

<!-- INTEGRAÇÃO VERTICAL -->
<section class="bloco dobra dobra--fio dobra--corte">
  <div class="faixa-p max">
    ${cabeca({ rot: H.vertical.eb, h: lume(H.vertical.h), p: H.vertical.p })}
    <div class="t-56">
      ${pilha(L.camadas.map((c) => item({ n: c.n, t: c.t, d: c.d, cor: c.dot, etiquetas: c.itens })))}
    </div>
  </div>
</section>

<!-- SOLUÇÕES -->
<section class="bloco dobra dobra--fio dobra--colapso">
  <div class="faixa-p max">
    ${cabeca({ rot: H.solucoes.eb, h: H.solucoes.h, p: H.solucoes.p })}
    <div class="t-56">
      ${pilha(prodMeta.map((p, i) => item({
        n: String(i + 1).padStart(2, '0'), t: p.nome, d: L.produtos[i].resumo,
        cor: CORES[i], href: u('solucoes', p.slug)
      })))}
    </div>
  </div>
</section>

<!-- SOBERANIA: a tinta engole o papel exatamente onde o argumento é jurisdição -->
<section class="bloco inv dobra dobra--inverte">
  <div class="regua regua--inv" aria-hidden="true"></div>
  <div class="faixa-p max" style="position:relative;z-index:1">
    ${cabeca({ rot: L.soberania.eb, h: lume(L.soberania.h), p: L.soberania.p })}
    <div class="t-56">
      ${pilha(L.soberania.promessas.map(([t, d], i) => item({
        n: String(i + 1).padStart(2, '0'), t, d, cor: [certDots[0], certDots[3], certDots[4]][i]
      })))}
    </div>
    <div class="defs t-56" style="max-width:640px"${ver()}>
      ${enderecos.map((e) => `<div><dt>${e.cidade} — ${e.uf}</dt><dd>${e.coord}</dd></div>`).join('')}
      <div><dt>${L.soberania.agora}</dt><dd><span data-relogio>--:--:--</span></dd></div>
    </div>
    <p class="miudo apaga t-16">${L.soberania.nota}</p>
  </div>
</section>

<section class="bloco quieto">
  <div class="faixa-p max"><p>${L.quieto}</p></div>
</section>

${chamada(ctx)}
`;
};
