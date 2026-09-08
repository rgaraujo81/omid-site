import { prodMeta, numeroValores, certDots, enderecos } from '../shared.mjs';
import { logoMarca } from '../logo.mjs';
import {
  ver, rotulo, botao, botaoSim, varre, cabeca, camadas, item, pilha, nuvens, solucoes,
  letreiro, credenciais, defs, chamada, linhas, lume, regua
} from '../ui.mjs';

const CORES = ['var(--a)', 'var(--t)', 'var(--i)', 'var(--m)', 'var(--r)'];

/* A home depois do corte: seis blocos, uma ideia por bloco.
   Abertura → prova (40% + régua) → camadas → soluções → soberania → chamada.
   Tudo que saiu tem página própria e continua no menu e no rodapé. */
export const home = (ctx) => {
  const { L, u } = ctx;
  const H = L.home;
  const faixa1 = {
    numeros: L.numCurto.map((t, i) => ({ t, cor: numeroValores[i].dot })),
    certs: L.certificacoes.map(([t, d], i) => ({ t, d, cor: certDots[i] }))
  };

  return `
<section class="abertura abertura--ive abertura--nuvens faixa-p max">
  <canvas class="aurora" aria-hidden="true"></canvas>
  ${nuvens()}
  <div class="sereno">
    <div class="sereno__marca ent" style="--e:0">${logoMarca()}</div>
    <h1 class="sereno__h ent" style="--e:1">${H.h1a.replace('<br>', ' ')}<b>${H.h1b}</b>.</h1>
    <p class="sereno__p ent" style="--e:2">${H.lead}</p>
    <div class="sereno__acao ent" style="--e:3">
      ${botaoSim(ctx, L.c.simularAmbiente, true)}
      ${varre(L.c.especialista, u('contato'))}
    </div>
  </div>
  <div class="procedencia ent" style="--e:4">
    <div class="procedencia__dcs">
      <span class="procedencia__rot">${L.c.datacenters}</span>
      ${enderecos.filter((e) => e.papel === 'dc').sort((a, b) => (a.uf === 'RJ' ? -1 : 1) - (b.uf === 'RJ' ? -1 : 1))
        .map((e) => `<span class="procedencia__dc" style="--pt:${e.dot}">${e.cidade}, ${e.uf}<i class="procedencia__co"> · ${e.coord}</i></span>`).join('')}
    </div>
    <i aria-hidden="true"></i>
  </div>
</section>

${credenciais(ctx, faixa1)}

<!-- A PROVA: o número e a régua que o demonstra -->
<section id="simular" class="bloco dobra dobra--colapso">
  <div class="faixa-p max">
    <div class="cmp">
      <div class="cmp__n">
        ${rotulo(H.cmp.eb)}
        <div class="cifra cifra--arco t-8">40<sup>%</sup></div>
      </div>
      <div class="cmp__t"${ver()}>
        <h2 class="berro respira">${lume(H.cmp.h)}</h2>
        <p class="lead apaga t-16">${H.cmp.p}</p>
      </div>
    </div>
    <!-- os três argumentos do lead, como estrutura e não como frase -->
    <ul class="cmp__pilares"${ver(1)}>
      ${H.cmp.pilares.map((pi, i) => `<li style="--pt:${CORES[i]}"><b>${pi[0]}</b><span>${pi[1]}</span></li>`).join('')}
    </ul>
    <!-- o 40% ligado ao número real do duelo: preenchido pelo JS, escondido sem dado -->
    <p class="mono apaga cmp__vivo" data-cmp-vivo data-molde="${H.cmp.vivo}" hidden></p>
    <div class="t-dobra">${regua(ctx)}</div>
  </div>
</section>

<!-- INTEGRAÇÃO VERTICAL -->
<section class="bloco dobra dobra--fio dobra--corte">
  <div class="faixa-p max">
    ${camadas(L.camadas, cabeca({ rot: H.vertical.eb, h: lume(H.vertical.h), p: H.vertical.p }))}
  </div>
</section>

<!-- SOLUÇÕES -->
<section class="bloco dobra dobra--fio dobra--colapso">
  <div class="faixa-p max">
    ${cabeca({ rot: H.solucoes.eb, h: H.solucoes.h, p: H.solucoes.p })}
    <div class="t-56">${solucoes(ctx, prodMeta)}</div>
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
    <!-- marco legal: qual lei alcança o dado, com o número da lei -->
    <div class="t-56"${ver(1)}>
      ${rotulo(L.soberania.legalEb)}
      <div class="marco t-16">
        ${L.soberania.legal.map(([t, lei, d], i) => `
        <div class="marco__i" style="--pt:${[certDots[0], certDots[3], certDots[4]][i]}">
          <p class="marco__t">${t}</p>
          <p class="marco__l mono">${lei}</p>
          <p class="marco__d">${d}</p>
        </div>`).join('')}
      </div>
    </div>
    <!-- e o que sustenta a promessa, auditado por terceiro -->
    <div class="t-56"${ver(2)}>
      ${rotulo(L.soberania.certEb)}
      <ul class="etiquetas t-16">
        ${[0, 1, 2, 5, 6, 8, 9].map((i) => `<li>${L.certificacoes[i][0]}</li>`).join('')}
      </ul>
    </div>
    <!-- onde o dado mora, com a ficha tecnica de cada site -->
    <div class="t-56"${ver(3)}>
      ${rotulo(L.soberania.coordEb)}
      <div class="sites t-16">
        ${enderecos.filter((e) => e.papel === 'dc').map((e, i) => `
        <div class="sites__i" style="--pt:${e.dot}">
          <p class="sites__r mono">${H.infra.rotulos[i]}</p>
          <p class="sites__c">${e.cidade} — ${e.uf}</p>
          <p class="sites__co mono">${e.coord}</p>
          <ul class="sites__f">${(H.infra.dc[i] || []).map((f) => `<li>${f}</li>`).join('')}</ul>
        </div>`).join('')}
      </div>
      <p class="sites__hora mono t-16">${L.soberania.agora} <span data-relogio>--:--:--</span></p>
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
