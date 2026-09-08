import { tiposMaquina, form as FORM, site, precoUnit } from './shared.mjs';

/* =========================================================================
   Componentes CONCRETO. Bloco, régua, tipo. Nenhum card, nenhum canto redondo.
   ========================================================================= */

export const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const ver = (i = 0) => ` data-ver style="--d:${i}"`;

export const seta = `<svg class="seta" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7"/></svg>`;
export const play = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.14v13.72a1 1 0 0 0 1.52.86l11.14-6.86a1 1 0 0 0 0-1.72L9.52 4.28A1 1 0 0 0 8 5.14z"/></svg>`;
export const calc = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="4.5" y="2.8" width="15" height="18.4"/><rect x="7.8" y="6" width="8.4" height="3.4"/><path d="M8.4 13h.01M12 13h.01M15.6 13h.01M8.4 17h.01M12 17h.01M15.6 17h.01"/></svg>`;

export const redes = {
  li: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5M3 9h4v12H3zM9.5 9h3.8v1.7h.05a4.2 4.2 0 0 1 3.75-2c4 0 4.75 2.6 4.75 6V21h-4v-5.5c0-1.3 0-3-1.85-3s-2.15 1.44-2.15 2.92V21h-4z"/></svg>`,
  ig: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17"/><circle cx="12" cy="12" r="3.7"/><circle cx="17" cy="7" r="1.2" fill="currentColor" stroke="none"/></svg>`,
  fb: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8.5V6.9c0-.8.2-1.2 1.4-1.2h1.5V2.6c-.3 0-1.2-.1-2.3-.1-2.4 0-4 1.4-4 4.1v1.9H8v3.2h2.6V21H14v-9.3h2.5l.4-3.2z"/></svg>`,
  yt: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8M10 15V9l5.2 3z"/></svg>`
};

/* --- tipografia em movimento --- */

/* quebra por <br> e anima linha a linha */
export const linhas = (html) => `<span class="linhas">${
  html.split('<br>').map((l, i) => `<span><i style="--l:${i}">${l}</i></span>`).join('')
}</span>`;

/* quebra por palavra, para a iluminação guiada pela rolagem */
export const lume = (html) => {
  let n = -1;
  const marca = (txt) => txt.split(/(\s+)/).map((t) => (t.trim() ? `<w style="--w:${++n}">${t}</w>` : t)).join('');
  return `<span class="lume">${html.split(/(<[^>]+>)/).map((p) => (p.startsWith('<') ? p : marca(p))).join('')}</span>`;
};

export const rotulo = (t) => `<p class="mono apaga">${t}</p>`;

/* --- botões --- */
export const botao = (txt, href, mod = '', comSeta = true) =>
  `<a class="botao ${mod}" href="${href}"><span>${txt}</span>${comSeta ? seta : ''}</a>`;

/* O botão do simulador leva à régua DESTA casa. O portal externo só entra
   na hora de contratar — a costura fica onde a intenção já existe. */
export const botaoSim = (ctx, txt, g = false, contratar = false) =>
  `<a class="botao botao--arco ${g ? 'botao--g' : ''}" href="${contratar ? site.simulador : ctx.u('home') + '#simular'}"${contratar ? ' rel="noopener"' : ''}>${calc}<span>${txt}</span>${seta}</a>`;

export const varre = (txt, href) => `<a class="varre" href="${href}"><span>${txt}</span>${seta}</a>`;

/* --- cabeça de seção: rótulo + berro + lead --- */
export const cabeca = ({ rot, h, p, tag = 'h2', respira = true, i = 0 }) => `
<div class="cabeca"${ver(i)}>
  ${rot ? rotulo(rot) : ''}
  <${tag} class="berro t-16${respira ? ' respira' : ''}">${h.includes('class="lume"') ? h : lume(h)}</${tag}>
  ${p ? `<p class="lead apaga t-24">${p}</p>` : ''}
</div>`;

/* --- lista-bloco: a unidade de conteúdo do CONCRETO --- */
export const item = ({ n, t, d, href, cor, etiquetas }) => {
  const dentro = `
    ${n ? `<span class="item__n">${n}</span>` : '<span></span>'}
    <span><span class="grita">${t}</span>${etiquetas ? `<ul class="etiquetas">${etiquetas.map((e) => `<li>${e}</li>`).join('')}</ul>` : ''}</span>
    <span class="item__d">${d || ''}</span>`;
  const st = ` style="--pt:${cor || 'var(--tinta)'}"`;
  return href ? `<a class="item" href="${href}"${st}>${dentro}</a>` : `<div class="item item--hov"${st}>${dentro}</div>`;
};

export const pilha = (itens) => `<div class="pilha">${itens.join('')}</div>`;

/* --- quadro --- */
export const quadro = ({ t, d, href, cor, pe, i = 0, tag = 'h3' }) => {
  const dentro = `
    <i></i>
    <${tag} class="grita" style="font-size:clamp(1.2rem,2.4vw,1.7rem)">${t}</${tag}>
    ${d ? `<p>${d}</p>` : ''}
    ${pe ? `<div class="quadro__pe">${pe}</div>` : ''}`;
  const st = ` style="--pt:${cor || 'var(--tinta)'};--d:${i}"`;
  return href ? `<a class="quadro" href="${href}" data-ver${st}>${dentro}</a>` : `<div class="quadro quadro--hov" data-ver${st}>${dentro}</div>`;
};

export const checa = (itens, cor) =>
  `<ul class="checa" style="--pt:${cor || 'var(--tinta)'}">${itens.map((i) => `<li>${i}</li>`).join('')}</ul>`;

/* --- placar de números --- */
export const placar = (lista) => `
<div class="placar">
  ${lista.map((s, i) => `
  <div${ver(i)} style="--pt:${s.cor}">
    <span></span>
    <b><em style="font-style:normal" data-conta="${s.n}">${s.n}</em>${s.suf ? `<sup>${s.suf}</sup>` : ''}</b>
    <p>${s.l}</p>
  </div>`).join('')}
</div>`;

/* --- faixa de confiança: estática; o silêncio também informa --- */
export const letreiro = (itens) => `
<div class="letreiro">
  <div class="letreiro__t">
    ${itens.map((c) => `<span><i style="--pt:${c.cor}"></i>${c.t}</span>`).join('')}
  </div>
</div>`;

/* --- credenciais: números e certificações como grade, não como letreiro ---
   Duas grades com fio entre as células (gap de 1px sobre fundo de fio):
   em cima os quatro números, embaixo as dez certificações. O que era um
   parágrafo centrado e serrilhado vira tabela — mesma coluna, mesmo eixo. */
export const credenciais = (ctx, { numeros, certs }) => {
  /* "Até 40% de economia" → destaque "Até 40%", apoio "de economia":
     parte no primeiro termo com dígito, em qualquer idioma */
  const parte = (t) => { const w = t.split(' '); const i = w.findIndex((x) => /\d/.test(x)); return i < 0 ? [t, ''] : [w.slice(0, i + 1).join(' '), w.slice(i + 1).join(' ')]; };
  const cel = (main, sub, cor) => `<div class="cred__c" style="--pt:${cor}"><i></i><b>${main}</b>${sub ? `<span>${sub}</span>` : ''}</div>`;
  return `
<div class="cred">
  <div class="cred__g cred__nums">
    ${numeros.map(({ t, cor }) => { const [m, sb] = parte(t); return cel(m, sb, cor); }).join('')}
  </div>
  <div class="cred__g cred__certs">
    ${certs.map(({ t, d, cor }) => cel(t, d, cor)).join('')}
  </div>
</div>`;
};

/* --- sanfona --- */
export const sanfona = (itens) => `
<div class="sanfona">
  ${itens.map(([q, a], i) => `
  <div class="sanfona__i"${ver(Math.min(i, 6))}>
    <h3><button class="sanfona__b" type="button" aria-expanded="false">${q}<span class="sanfona__s" aria-hidden="true"></span></button></h3>
    <div class="sanfona__p"><div><div>${a}</div></div></div>
  </div>`).join('')}
</div>`;

/* --- definições --- */
export const defs = (pares) => `
<dl class="defs">${pares.map(([d, v]) => `<div><dt>${d}</dt><dd>${v}</dd></div>`).join('')}</dl>`;

/* --- vídeo, carregado só no clique --- */
export const tela = ({ id, titulo, meta, poster = '/assets/img/dc-video-poster.jpg', i = 0, hTag = 'h3' }) => `
<button class="tela" type="button" data-yt="${id}" data-titulo="${esc(titulo)}" data-ver style="--d:${i}">
  <img src="${poster}" alt="${esc(titulo)}" loading="lazy" decoding="async" width="1280" height="720">
  <span class="tela__play">${play}</span>
  <span class="tela__leg">
    <${hTag} class="grita" style="font-size:clamp(1.1rem,2.2vw,1.7rem);color:inherit">${titulo}</${hTag}>
    ${meta ? `<p>${meta}</p>` : ''}
  </span>
</button>`;

/* --- formulário --- */
export const formAbre = (ctx, { assunto }) => {
  const L = ctx.L;
  return `<form data-form
  data-endpoint="${FORM.endpoint}" data-metodo="${FORM.metodo}" data-assunto="${esc(assunto)}"
  data-ok="${esc(L.contato.ok)}" data-enviando="${esc(L.c.enviando)}"
  data-erro-campos="${esc(L.c.erroCampos)}" data-erro-envio="${esc(L.c.erroEnvio)}"
  novalidate${ver(1)}>
  <p class="ninho" aria-hidden="true"><label>${L.c.naoPreencha}<input type="text" name="_nada" tabindex="-1" autocomplete="off"></label></p>`;
};

export const formFecha = (txt) => `
  <div class="cheio"><button class="botao botao--g" type="submit" style="width:100%;justify-content:center"><span>${txt}</span>${seta}</button></div>
  <p class="cheio" data-recado hidden></p>
</form>`;

/* --- chamada final: bloco invertido de página inteira --- */
export const chamada = (ctx, o = {}) => {
  const L = ctx.L;
  return `
<section class="bloco inv dobra dobra--corte chamada-palco">
  <canvas class="aurora" data-noite="1" aria-hidden="true"></canvas>
  <div class="regua regua--inv" aria-hidden="true"></div>
  <div class="faixa-p max">
    ${rotulo(L.c.proximoPasso)}
    <h2 class="grito t-24 respira">${linhas(o.h || L.cta.h)}</h2>
    <p class="lead apaga t-32">${o.p || L.cta.p}</p>
    <div class="linha-botoes t-32">
      ${botaoSim(ctx, L.c.simularAmbiente, true)}
      <a class="botao botao--vazio botao--g" href="${ctx.u('contato')}"><span>${L.cta.a}</span>${seta}</a>
    </div>
  </div>
</section>`;
};

/* A régua: o simulador da casa. Valores da tabela pública, fatura discriminada,
   cálculo no navegador. O portal externo só abre em "contratar". */
export const regua = (ctx) => {
  const R = ctx.L.regua;
  const ctl = (id, rot, min, max, passo, ini, un) => `
    <div class="ctl">
      <div class="ctl__cab"><label class="mono apaga" for="rg-${id}">${rot}</label><b data-val="${id}">${ini} ${un}</b></div>
      <input id="rg-${id}" type="range" min="${min}" max="${max}" step="${passo}" value="${ini}" data-rg="${id}" data-un="${un}">
    </div>`;
  /* degraus de máquina: a ordem aqui é a ordem dos botões; o preço unitário
     do degrau escolhido aparece ao lado do rótulo, como nas réguas */
  const TIPOS = ['eco', 'pro', 'xpro', 'umax'];
  const brl = (n) => n.toFixed(2).replace('.', ',');
  const unitTipo = (k) => `R$ ${brl(tiposMaquina[k].vcpu)}/vCPU · R$ ${brl(tiposMaquina[k].ram)}/GiB`;
  return `
<div class="prova" data-regua data-tipos='${JSON.stringify(tiposMaquina)}' data-vcpu="${precoUnit.vcpu}" data-ram="${precoUnit.ram}" data-ssd="${precoUnit.ssd}"
     data-backup="${precoUnit.backup}" data-egress="${precoUnit.egress}" data-win="${precoUnit.winPar}">
  <div${ver()}>
    ${rotulo(R.rot)}
    <h2 class="berro t-16">${R.h}</h2>
    <p class="lead apaga t-24">${R.p}</p>
    <div class="regua-c t-32">
      <div class="ctl">
        <div class="ctl__cab"><span class="mono apaga" id="rot-cen">${ctx.L.comparar.cenarios.rot}</span></div>
        <div class="troca" role="group" aria-labelledby="rot-cen">
          ${Object.entries(CENARIOS).map(([k, v]) =>
            `<button type="button" class="troca__b" data-cen='${JSON.stringify(v)}' aria-pressed="false">${ctx.L.comparar.cenarios.itens[k]}</button>`).join('')}
          <button type="button" class="troca__b abre" data-cen="" aria-pressed="true">${ctx.L.comparar.cenarios.custom}</button>
        </div>
      </div>
      <div class="ctl">
        <div class="ctl__cab"><span class="mono apaga" id="rot-tipo">${R.tipo}</span><b class="ctl__unit" data-tipo-val>${unitTipo('eco')}</b></div>
        <div class="troca" role="group" aria-labelledby="rot-tipo">
          ${TIPOS.map((k, i) => `<button type="button" class="troca__b${i ? '' : ' abre'}" data-tipo="${k}" aria-pressed="${i ? 'false' : 'true'}">${R.tipos[k]}</button>`).join('')}
        </div>
      </div>
      <div class="ctl">
        <div class="ctl__cab"><span class="mono apaga" id="rot-so">${R.so}</span></div>
        <div class="troca" role="group" aria-labelledby="rot-so">
          <button type="button" class="troca__b abre" data-so="0" aria-pressed="true">${R.linux}</button>
          <button type="button" class="troca__b" data-so="1" aria-pressed="false">${R.windows}</button>
        </div>
      </div>
      ${ctl('vcpu', R.vcpu, 2, 64, 2, 8, 'vCPU')}
      ${ctl('ram', R.ram, 4, 256, 4, 32, 'GiB')}
      ${ctl('ssd', R.ssd, 50, 4000, 50, 500, 'GB')}
      ${ctl('backup', R.backup, 0, 10000, 250, 500, 'GB')}
      ${ctl('egress', R.egress, 0, 20000, 500, 1000, 'GB')}
    </div>
  </div>
  <aside class="preco nota-f"${ver(1)}>
    <dl class="fatura">
      ${['compute', 'disco', 'backup', 'trafego', 'licenca'].map((k) =>
        `<div><dt>${R.partes[k]}</dt><dd>R$ <span data-parte="${k}">—</span></dd></div>`).join('')}
    </dl>
    <p class="mono apaga t-24">${R.total}</p>
    <p class="preco__n"><small>R$</small><span data-preco-out>—</span><span class="mes">${R.mes}</span></p>
    <p class="miudo apaga">${R.nota}</p>
    <div class="pilha-g t-24">
      ${botaoSim(ctx, R.btn, true, true)}
      <a class="botao botao--vazio" href="${ctx.u('contato')}"><span>${R.btn2}</span>${seta}</a>
    </div>
    <p class="miudo apaga">${R.btnNota}</p>
    <button type="button" class="duelo__copiar mono" data-copiar data-copiado="${ctx.L.comparar.copiado}">${ctx.L.comparar.copiar}</button>
  </div>
</div>
${duelo(ctx)}`;
};

/* cenários de um clique: números nos passos das réguas (backup 250, saída 500) */
const CENARIOS = {
  site:  { vcpu: 4,  ram: 8,   ssd: 100,  backup: 250,  egress: 500,  so: 0, tipo: 'eco' },
  erp:   { vcpu: 8,  ram: 32,  ssd: 500,  backup: 500,  egress: 1000, so: 1, tipo: 'pro' },
  banco: { vcpu: 16, ram: 64,  ssd: 1000, backup: 2000, egress: 500,  so: 0, tipo: 'umax' },
  k8s:   { vcpu: 32, ram: 128, ssd: 1000, backup: 500,  egress: 5000, so: 0, tipo: 'eco' }
};

/* --- o duelo: a mesma máquina cotada nos hyperscalers ---
   Só a marcação vive aqui. Os preços vêm de assets/dados/precos-nuvem.json
   (snapshot diário) e o JS refina ao vivo o que tem CORS: o câmbio.
   Começa escondido e só aparece quando o JSON chega — sem dado, sem duelo.
   Cada barra é EMPILHADA por item (computação, licença, disco, backup,
   saída): é assim que se vê DE ONDE vem a diferença, não só o tamanho dela. */
export const ITENS_DUELO = ['compute', 'licenca', 'disco', 'backup', 'trafego'];
export const COR_ITEM = { compute: '#40ADB7', licenca: '#E73587', disco: '#2D93BB', backup: '#545EA0', trafego: '#7F2483' };
export const duelo = (ctx) => {
  const C = ctx.L.comparar, R = ctx.L.regua;
  const ordem = ['omid', 'aws', 'azure', 'gcp'];   // Oracle retirada por decisão do dono (2026-09-08)
  return `
<div class="duelo" data-duelo hidden
     data-vezes="${C.vezes}" data-mais-caro="${C.maisCaro}" data-mais-barato="${C.maisBarato}"
     data-referencia="${C.referencia}" data-ao-vivo="${C.aoVivo}" data-consultado="${C.consultado}"
     data-cambio="${C.cambio}" data-inclui="${C.omidInclui}"
     data-eco-pos="${C.ecoRot}" data-eco-neg="${C.ecoRotNeg}" data-a-menos="${C.aMenos}" data-a-mais="${C.aMais}">
  <div class="duelo__cab">
    <p class="mono apaga">${C.rot}<span class="duelo__vivo" data-duelo-vivo hidden></span></p>
    <h3 class="berro duelo__h t-16">${C.h}</h3>
    <p class="lead apaga t-16">${C.p}</p>
  </div>

  <div class="duelo__topo t-32">
    <div class="duelo__eco nota-f">
      <p class="mono apaga" data-duelo-eco-rot>${C.ecoRot}</p>
      <p class="preco__n duelo__eco-n"><small>R$</small><span data-duelo-eco>—</span><span class="mes">${R.mes}</span></p>
      <dl class="duelo__conta">
        <div><dt>${C.contaOutro}</dt><dd>R$ <span data-duelo-conta-outro>—</span></dd></div>
        <div><dt>${C.provedores.omid}</dt><dd>R$ <span data-duelo-conta-omid>—</span></dd></div>
        <div class="duelo__conta-dif"><dt>${C.contaDif}</dt><dd>R$ <span data-duelo-conta-dif>—</span><em data-duelo-conta-pct>—</em></dd></div>
      </dl>
    </div>
    <div class="duelo__fx">
      <div class="ctl">
        <div class="ctl__cab"><label class="mono apaga" for="rg-fx">${C.cambioRot}</label><b>R$ <span data-duelo-fx-val>—</span></b></div>
        <input id="rg-fx" type="range" min="400" max="700" step="5" value="500" data-duelo-fx>
      </div>
      <p class="miudo apaga">${C.cambioNota} <button type="button" class="duelo__hoje" data-duelo-fx-hoje hidden>${C.cambioHoje}</button></p>
    </div>
  </div>

  <p class="mono apaga t-32">${C.legenda}</p>
  <ul class="duelo__legenda">
    ${ITENS_DUELO.map((k) => `<li data-item="${k}"><i style="--c:${COR_ITEM[k]}"></i>${R.partes[k]}</li>`).join('')}
  </ul>

  <ol class="duelo__lista">
    ${ordem.map((k) => `
    <li class="duelo__li duelo__li--${k}" data-prov="${k}">
      <div class="duelo__nome"><b>${C.provedores[k]}</b><span class="mono apaga" data-duelo-inst></span></div>
      <div class="duelo__barra">${ITENS_DUELO.map((i) => `<i data-seg="${i}" style="--c:${COR_ITEM[i]}"></i>`).join('')}</div>
      <div class="duelo__preco"><b>R$ <span data-duelo-valor>—</span></b><span class="mono apaga">${R.mes}</span></div>
      <div class="duelo__delta"><span data-duelo-delta></span></div>
    </li>`).join('')}
  </ol>
  <p class="mono apaga duelo__linha" data-duelo-base></p>
  <details class="duelo__fontes">
    <summary class="mono">${C.fontes}</summary>
    <p class="miudo apaga">${C.base}</p>
    <ul data-duelo-fontes></ul>
  </details>
</div>`;
};

export const aviso = (t) => `<div class="recado" style="border-color:var(--linha);color:var(--cinza)">${t}</div>`;
