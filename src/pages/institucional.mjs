import { certDots, numeroValores, tiers, modalidadeDots, precoValores, enderecos, contato, site } from '../shared.mjs';
import {
  ver, seta, rotulo, botao, botaoSim, varre, cabeca, item, pilha, quadro, checa,
  placar, letreiro, sanfona, defs, tela, chamada, aviso, formAbre, formFecha, linhas, lume
} from '../ui.mjs';
import { chapeu } from '../layout.mjs';

/* ---------- Para quem é ---------- */
export const paraQuem = (ctx) => {
  const { L, u } = ctx; const P = L.paraQuem;
  return `
${chapeu(ctx, { trilha: [{ t: L.nav.paraQuem }], rot: P.eb, h: P.h, p: P.p,
  acao: `${botaoSim(ctx, L.c.simularPreco, true)}${botao(L.c.especialista, u('contato'), 'botao--vazio botao--g')}` })}

<section class="bloco">
  <div class="faixa-p max">
    <div class="quadros">
      ${L.segmentos.map((s, i) => quadro({
        t: s.t, d: s.d, cor: s.dot, i, tag: 'h2',
        pe: `<ul class="etiquetas" style="margin:0">${s.pts.map((p) => `<li>${p}</li>`).join('')}</ul>`
      })).join('')}
    </div>
  </div>
</section>

<section class="bloco inv">
  <div class="regua regua--inv" aria-hidden="true"></div>
  <div class="faixa-p max" style="position:relative;z-index:1">
    ${cabeca({ rot: P.usoEb, h: P.usoH })}
    <div class="t-56">
      ${pilha(P.usos.map(([t, d], i) => item({ n: String(i + 1).padStart(2, '0'), t, d, cor: certDots[i] })))}
    </div>
  </div>
</section>

<section class="bloco">
  <div class="faixa-p max">
    ${cabeca({ rot: P.setorEb, h: P.setorH })}
    <ul class="etiquetas t-32" style="gap:8px"${ver()}>
      ${P.setores.map((s) => `<li class="etiquetas--g">${s}</li>`).join('')}
    </ul>
  </div>
</section>

${chamada(ctx)}
`;
};

/* ---------- Cloud inteligente ---------- */
export const cloudInteligente = (ctx) => {
  const { L, u } = ctx; const C = L.cloud;
  return `
${chapeu(ctx, { trilha: [{ t: C.eb }], rot: C.eb, h: C.h, p: C.p,
  acao: `${botaoSim(ctx, C.btn, true)}${botao(C.btn2, u('precos'), 'botao--vazio botao--g')}` })}

<section class="bloco regra">
  <div class="faixa-p max">
    ${cabeca({ rot: C.dorEb, h: C.dorH })}
    <div class="t-56">
      ${pilha(C.dores.map(([t, d], i) => item({ n: String(i + 1).padStart(2, '0'), t, d, cor: [certDots[6], certDots[5], certDots[4], certDots[8]][i] })))}
    </div>
  </div>
</section>

<section class="bloco inv">
  <div class="regua regua--inv" aria-hidden="true"></div>
  <div class="faixa-p max" style="position:relative;z-index:1">
    <div class="duo duo--alto">
      <div>
        ${rotulo(C.solEb)}
        <h2 class="berro t-16 respira">${linhas(C.solH)}</h2>
        <div class="linha-botoes t-32">${botaoSim(ctx, C.btn, true)}</div>
      </div>
      <div${ver(1)}>${defs(C.passos.map(([t, d], i) => [String(i + 1).padStart(2, '0') + ' · ' + t, d]))}</div>
    </div>
  </div>
</section>

<section class="bloco">
  <div class="faixa-p max">
    ${cabeca({ rot: C.provaEb, h: L.home.numeros.h })}
    <div class="t-32">${placar(C.provas.map(([n, l], i) => ({ n, suf: '', l, cor: numeroValores[i].dot })))}</div>
  </div>
</section>

${chamada(ctx)}
`;
};

/* ---------- Preços ---------- */
export const precos = (ctx) => {
  const { L, u } = ctx; const P = L.precos;
  return `
${chapeu(ctx, { trilha: [{ t: P.eb }], rot: P.eb, h: P.h, p: P.p,
  acao: `${botaoSim(ctx, P.btn, true)}${botao(P.btn2, u('contato'), 'botao--vazio botao--g')}` })}

<section class="bloco">
  <div class="faixa-p max">
    ${P.cats.map(([cat, unidade], i) => `
    <div class="${i ? 't-56' : ''}"${ver(Math.min(i, 4))}>
      <div style="display:flex;flex-wrap:wrap;gap:8px 20px;align-items:baseline;justify-content:space-between">
        <h2 class="grita">${cat}</h2><p class="mono apaga">${unidade}</p>
      </div>
      <div class="tabela t-16">
        <table>
          <thead><tr><th scope="col">${P.colItem}</th><th scope="col" class="dir">${P.colValor}</th></tr></thead>
          <tbody>${precoValores[i].linhas.map(([item, valor]) => `<tr><th scope="row" style="font-weight:400">${item}</th><td class="dir destaca valor-mono">${valor}</td></tr>`).join('')}</tbody>
        </table>
      </div>
    </div>`).join('')}
    <div class="t-56"${ver()}>${aviso(P.nota)}</div>
  </div>
</section>

<section class="bloco">
  <div class="faixa-p max">
    ${cabeca({ rot: L.home.cmp.eb, h: L.home.cmp.h })}
    <div class="tabela t-32"${ver()}>
      <table>
        <thead><tr>${L.comparativo.cols.map((c) => `<th scope="col">${c || `<span class="sr">${L.c.criterio}</span>`}</th>`).join('')}</tr></thead>
        <tbody>${L.comparativo.rows.map((r) => `<tr><th scope="row">${r[0]}</th><td class="destaca">${r[1]}</td><td class="fraca">${r[2]}</td></tr>`).join('')}</tbody>
      </table>
    </div>
    <p class="miudo apaga t-16">${L.home.cmp.nota}</p>
  </div>
</section>

<section class="bloco inv">
  <div class="regua regua--inv" aria-hidden="true"></div>
  <div class="faixa-p max" style="position:relative;z-index:1;max-width:960px">
    ${cabeca({ rot: P.faqEb, h: P.faqH })}
    <div class="t-32">${sanfona(P.faq)}</div>
  </div>
</section>

${chamada(ctx)}
`;
};

/* ---------- Sobre ---------- */
export const sobre = (ctx) => {
  const { L, u } = ctx; const S = L.sobre;
  const certs = L.certificacoes.map(([t, d], i) => ({ t: `${t} · ${d}`, cor: certDots[i] }));
  const nums = numeroValores.map((v, i) => ({ ...v, cor: v.dot, l: L.numeros[i] }));
  return `
${chapeu(ctx, { trilha: [{ t: L.nav.sobre }], rot: S.eb, h: S.h, p: S.p,
  acao: `${botao(L.c.especialista, u('contato'))}${botao(L.c.solucoes, u('solucoes'), 'botao--vazio')}` })}

<section class="bloco bloco--curto">
  <div class="faixa-p max">${placar(nums)}</div>
</section>

<section class="bloco regra">
  <div class="faixa-p max">
    ${cabeca({ rot: L.video.eb, h: L.video.h, p: L.video.p })}
    <div class="t-32">${tela({ id: L.video.id, titulo: L.video.titulo, meta: L.video.meta })}</div>
  </div>
</section>

<section class="bloco inv">
  <div class="regua regua--inv" aria-hidden="true"></div>
  <div class="faixa-p max" style="position:relative;z-index:1">
    ${cabeca({ rot: S.linhaEb, h: S.h })}
    <div class="t-56">
      ${pilha(S.linha.map(([ano, t, d], i) => item({ n: ano, t, d, cor: certDots[i] })))}
    </div>
  </div>
</section>

<section class="bloco">
  <div class="faixa-p max">
    ${cabeca({ rot: S.mvvEb, h: S.difH })}
    <div class="quadros t-32">
      ${[S.missao, S.visao, S.valores].map(([t, d], i) => quadro({ t, d, cor: [certDots[0], certDots[3], certDots[4]][i], i })).join('')}
    </div>
    <div class="t-56">
      ${pilha(S.dif.map(([t, d], i) => item({ n: String(i + 1).padStart(2, '0'), t, d, cor: certDots[i] })))}
    </div>
  </div>
</section>

${letreiro(certs)}

<section class="bloco">
  <div class="faixa-p max">
    ${cabeca({ rot: S.certEb, h: S.certH, p: S.certP })}
    <ul class="etiquetas t-32" style="gap:8px"${ver()}>
      ${L.certificacoes.map(([t]) => `<li class="etiquetas--g">${t}</li>`).join('')}
    </ul>
  </div>
</section>

${chamada(ctx)}
`;
};

/* ---------- Compliance ---------- */
export const compliance = (ctx) => {
  const { L, u } = ctx; const C = L.compliance;
  return `
${chapeu(ctx, { trilha: [{ t: C.eb }], rot: C.eb, h: C.h, p: C.p })}

<section class="bloco regra">
  <div class="faixa-p max">
    ${cabeca({ rot: C.docsEb, h: C.docsH })}
    <div class="quadros t-32">
      ${C.docs.map(([t, d], i) => quadro({
        t, d, cor: [certDots[3], certDots[4]][i], i,
        pe: `<span class="varre"><span>${C.docBtn}</span>${seta}</span>`, href: `mailto:${contato.etica.mail}`
      })).join('')}
    </div>
  </div>
</section>

<section class="bloco inv">
  <div class="regua regua--inv" aria-hidden="true"></div>
  <div class="faixa-p max" style="position:relative;z-index:1">
    <div class="duo duo--alto">
      <div>
        ${rotulo(C.irregEb)}
        <h2 class="berro t-16 respira">${linhas(C.irregH)}</h2>
        <p class="lead apaga t-24">${C.irregP}</p>
      </div>
      <div${ver(1)}>${checa(C.garantias, 'var(--am)')}</div>
    </div>
  </div>
</section>

<section class="bloco">
  <div class="faixa-p max">
    ${cabeca({ rot: C.canalEb, h: C.canalH })}
    <div class="t-32">
      ${pilha([
        item({ n: '01', t: contato.etica.tel, d: C.canalTel[1], cor: 'var(--t)', href: contato.etica.href }),
        item({ n: '02', t: contato.etica.mail, d: C.canalMail[1], cor: 'var(--m)', href: `mailto:${contato.etica.mail}` })
      ])}
    </div>
  </div>
</section>
`;
};

/* ---------- Partner Program ---------- */
export const partner = (ctx) => {
  const { L, u } = ctx; const P = L.partner;
  return `
${chapeu(ctx, { trilha: [{ t: L.nav.partner }], rot: P.eb, h: P.h, p: P.p,
  acao: `<a class="botao botao--g" href="#inscricao"><span>${P.btn}</span>${seta}</a>${botao(P.btn2, u('contato'), 'botao--vazio botao--g')}` })}

<section class="bloco regra">
  <div class="faixa-p max">
    ${cabeca({ rot: P.modEb, h: P.modH, p: P.modP })}
    <div class="t-56">
      ${pilha(P.mods.map(([t, d, com], i) => item({
        n: String(i + 1).padStart(2, '0'), t, d: `${d}<br><b>${P.comissao}: ${com}</b>`, cor: modalidadeDots[i]
      })))}
    </div>
  </div>
</section>

<section class="bloco inv">
  <div class="regua regua--inv" aria-hidden="true"></div>
  <div class="faixa-p max" style="position:relative;z-index:1">
    ${cabeca({ rot: P.tierEb, h: P.tierH, p: P.tierP })}
    <div class="tabela t-32"${ver()}>
      <table>
        <thead><tr><th scope="col">${P.tierCol[0]}</th><th scope="col" class="dir">${P.tierCol[1]}</th></tr></thead>
        <tbody>${tiers.map(([t, v], i) => `<tr><th scope="row"><span style="display:inline-flex;align-items:center;gap:12px"><i style="width:18px;height:5px;background:${modalidadeDots[i]};display:block"></i>${t}</span></th><td class="dir valor-mono">${v}</td></tr>`).join('')}</tbody>
      </table>
    </div>
  </div>
</section>

<section class="bloco">
  <div class="faixa-p max">
    <div class="duo duo--alto">
      <div>
        ${rotulo(P.benEb)}
        <h2 class="berro t-16 respira">${linhas(P.benH)}</h2>
        <div class="t-32">${checa(P.bens, 'var(--t)')}</div>
      </div>
      <div${ver(1)}>
        ${rotulo(P.clienteEb)}
        <h3 class="grita t-16">${P.clienteH}</h3>
        <div class="t-24">${checa(P.clientes, 'var(--m)')}</div>
      </div>
    </div>
  </div>
</section>

<section class="bloco inv" id="inscricao">
  <div class="regua regua--inv" aria-hidden="true"></div>
  <div class="faixa-p max" style="position:relative;z-index:1">
    <div class="duo duo--alto">
      <div>
        ${rotulo(P.formEb)}
        <h2 class="berro t-16 respira">${linhas(P.formH)}</h2>
        <p class="lead apaga t-24">${P.formP}</p>
      </div>
      ${formAbre(ctx, { assunto: 'Partner Program' })}
        <div class="grade-form">
          <div class="campo"><label for="pn">${L.contato.campos.nome}</label><input id="pn" name="nome" required></div>
          <div class="campo"><label for="pe">${L.contato.campos.email}</label><input id="pe" name="email" type="email" required></div>
          <div class="campo"><label for="pc">${L.contato.campos.empresa}</label><input id="pc" name="empresa" required></div>
          <div class="campo"><label for="pt">${L.contato.campos.tel}</label><input id="pt" name="telefone" type="tel"></div>
          <div class="campo cheio"><label for="pm">${P.modEb}</label><select id="pm" name="modalidade">${P.mods.map(([t]) => `<option>${t}</option>`).join('')}</select></div>
          <div class="campo cheio"><label for="pmsg">${L.contato.campos.msg}</label><textarea id="pmsg" name="mensagem" placeholder="${L.contato.campos.msgPh}"></textarea></div>
          <label class="marca-cx cheio"><input type="checkbox" name="lgpd" required><span>${L.contato.lgpd}</span></label>
          ${formFecha(P.btn)}
        </div>
    </div>
  </div>
</section>
`;
};

/* ---------- Partner: agradecimento ---------- */
export const partnerOk = (ctx) => {
  const { L, u } = ctx; const P = L.partnerOk;
  return `
${chapeu(ctx, { trilha: [{ t: L.nav.partner, href: u('partner') }, { t: P.eb }], rot: P.eb, h: P.h, p: P.p,
  acao: botao(P.volta, u('home'), 'botao--vazio botao--g') })}

<section class="bloco regra">
  <div class="faixa-p max">
    ${cabeca({ rot: P.proxEb, h: L.hub.escolhaH })}
    <div class="quadros t-32">
      ${P.prox.map(([t, d, key], i) => quadro({ t, d, href: u(key), cor: certDots[i], i, tag: 'h2' })).join('')}
    </div>
  </div>
</section>
`;
};

/* ---------- Contato ---------- */
export const contatoPage = (ctx) => {
  const { L, u } = ctx; const C = L.contato;
  const canais = [
    { i: 0, cor: 'var(--a)', tel: contato.comercial.tel, href: contato.comercial.href, mail: contato.comercial.mail, wa: contato.comercial.wa },
    { i: 1, cor: 'var(--t)', tel: contato.noc.tel, href: contato.noc.href, mail: contato.noc.mail, wa: contato.noc.wa, alt: contato.noc.alt },
    { i: 2, cor: 'var(--r)', tel: contato.parceiros.tel, href: contato.parceiros.href, mail: contato.parceiros.mail, wa: contato.parceiros.wa },
    { i: 3, cor: 'var(--m)', tel: contato.imprensa.tel, href: contato.imprensa.href, mail: contato.imprensa.mail }
  ];
  return `
${chapeu(ctx, { trilha: [{ t: L.nav.contato }], rot: C.eb, h: C.h, p: C.p })}

<section class="bloco bloco--curto">
  <div class="faixa-p max">
    ${pilha(canais.map((c) => item({
      n: String(c.i + 1).padStart(2, '0'),
      t: C.canais[c.i][0],
      d: `${C.canais[c.i][1]}<br><b>${c.tel}</b>${c.alt ? ` · ${c.alt}` : ''}<br>${c.mail}`,
      cor: c.cor, href: `mailto:${c.mail}`
    })))}
  </div>
</section>

<section class="bloco inv">
  <div class="regua regua--inv" aria-hidden="true"></div>
  <div class="faixa-p max" style="position:relative;z-index:1">
    <div class="duo duo--alto">
      <div>
        ${rotulo(C.formEb)}
        <h2 class="berro t-16 respira">${linhas(C.formH)}</h2>
        <p class="lead apaga t-24">${C.formP}</p>
        <div class="t-32">${defs(enderecos.map((e) => [`${e.cidade} — ${e.uf} · ${e.papel === 'dc' ? ctx.L.c.dc : ctx.L.c.escritorio}`, `${e.linha}<br>${e.coord}`]))}</div>
      </div>
      ${formAbre(ctx, { assunto: 'Contato' })}
        <div class="grade-form">
          <div class="campo"><label for="cn">${C.campos.nome}</label><input id="cn" name="nome" required></div>
          <div class="campo"><label for="ce">${C.campos.email}</label><input id="ce" name="email" type="email" required></div>
          <div class="campo"><label for="cc">${C.campos.empresa}</label><input id="cc" name="empresa"></div>
          <div class="campo"><label for="ct">${C.campos.tel}</label><input id="ct" name="telefone" type="tel"></div>
          <div class="campo cheio"><label for="cs">${C.campos.assunto}</label><select id="cs" name="assunto">${C.assuntos.map((a) => `<option>${a}</option>`).join('')}</select></div>
          <div class="campo cheio"><label for="cm">${C.campos.msg}</label><textarea id="cm" name="mensagem" placeholder="${C.campos.msgPh}" required></textarea></div>
          <label class="marca-cx cheio"><input type="checkbox" name="lgpd" required><span>${C.lgpd}</span></label>
          ${formFecha(L.c.enviar)}
        </div>
    </div>
  </div>
</section>
`;
};

/* ---------- FAQ ---------- */
export const faq = (ctx) => {
  const { L } = ctx; const F = L.faq;
  return `
${chapeu(ctx, { trilha: [{ t: L.nav.faq }], rot: F.eb, h: F.h, p: F.p })}

<section class="bloco">
  <div class="faixa-p max" style="max-width:1020px">
    ${F.grupos.map(([titulo, itens], i) => `
    <div class="${i ? 't-56' : ''}">
      <h2 class="grita" style="display:flex;align-items:center;gap:14px"${ver()}><i style="width:22px;height:6px;background:${certDots[i]};display:block"></i>${titulo}</h2>
      <div class="t-16">${sanfona(itens)}</div>
    </div>`).join('')}
  </div>
</section>

${chamada(ctx, { h: F.aindaH, p: F.aindaP })}
`;
};

/* ---------- Política de Privacidade ---------- */
export const privacidade = (ctx) => {
  const { L, u } = ctx; const P = L.privacidade;
  return `
${chapeu(ctx, { trilha: [{ t: P.eb }], rot: P.eb, h: P.h, p: P.p })}

<section class="bloco">
  <div class="faixa-p max" style="max-width:1020px">
    <div${ver()}>${aviso(P.aviso)}</div>
    <p class="mono apaga t-24"${ver(1)}>${P.atualizado}: 08/2026</p>
    <div class="t-56">
    ${P.secoes.map(([t, d], i) => `
    <div class="${i ? 't-32' : ''}"${ver(Math.min(i, 6))}>
      <h2 class="fala"><span class="mono apaga">${String(i + 1).padStart(2, '0')}</span> &nbsp;${t}</h2>
      <p class="apaga t-8" style="max-width:70ch">${d}</p>
    </div>`).join('')}
    </div>
    <div class="t-56"${ver()}>
      ${rotulo(P.contatoTitulo)}
      <p class="apaga t-8">${P.contatoP}</p>
      <div class="t-16" style="display:grid;gap:8px;justify-items:start">
        ${varre(contato.etica.mail, `mailto:${contato.etica.mail}`)}
        ${varre(L.compliance.canalEb, u('compliance'))}
      </div>
    </div>
  </div>
</section>
`;
};
