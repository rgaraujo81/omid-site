/* OMID — CONCRETO. Interações sem dependência.
   O grosso do movimento é CSS guiado por rolagem; aqui fica só o que
   o CSS não alcança: estado, teclado, valores ao vivo e inércia. */
(function () {
  'use strict';

  var reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  var raiz = document.documentElement;

  /* O movimento é por classe + transição: universal. `sdt` só entra com JS
     vivo — sem ele, nada fica escondido. */

  /* ---------- revelação: elementos e dobras ---------- */
  function revelar() {
    var alvos = $$('[data-ver], .linhas, section.dobra, .lume, .ent');
    if (!alvos.length) return;
    if (reduz || !('IntersectionObserver' in window)) {
      alvos.forEach(function (e) { e.classList.add('viu'); });
      return;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('viu');
        io.unobserve(e.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px -4% 0px' });
    alvos.forEach(function (e) { io.observe(e); });
    /* A primeira tela nunca espera o observer: se algo dela ainda não foi
       marcado em 350ms, marca na mão. A entrada acontece, sempre. */
    setTimeout(function () {
      alvos.forEach(function (e) {
        if (!e.classList.contains('viu') && e.getBoundingClientRect().top < innerHeight) {
          e.classList.add('viu');
        }
      });
    }, 350);
  }

  /* ---------- trilho de leitura ---------- */
  function trilho() {
    var t = $('.trilho');
    if (!t || t.dataset.ok) return;
    t.dataset.ok = '1';
    function pinta() {
      var max = document.documentElement.scrollHeight - innerHeight;
      t.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0).toFixed(4) + ')';
    }
    pinta();
    addEventListener('scroll', pinta, { passive: true });
    addEventListener('resize', pinta, { passive: true });
  }


  /* ---------- menu móvel ---------- */
  function gaveta() {
    var h = $('.hamb'), g = $('.gaveta');
    if (!h || !g) return;
    function estado(abre) {
      document.body.classList.toggle('aberto', abre);
      h.setAttribute('aria-expanded', String(abre));
      g.setAttribute('aria-hidden', String(!abre));
    }
    h.addEventListener('click', function () { estado(!document.body.classList.contains('aberto')); });
    $$('a', g).forEach(function (a) { a.addEventListener('click', function () { estado(false); }); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape') estado(false); });
    addEventListener('resize', function () { if (innerWidth > 1080) estado(false); });
    estado(false);
  }

  /* ---------- idioma ---------- */
  function idioma() {
    var cx = $('.idioma');
    if (!cx) return;
    var b = $('.idioma__b', cx);
    function estado(abre) { cx.classList.toggle('abre', abre); b.setAttribute('aria-expanded', String(abre)); }
    b.addEventListener('click', function (e) { e.stopPropagation(); estado(!cx.classList.contains('abre')); });
    document.addEventListener('click', function (e) { if (!cx.contains(e.target)) estado(false); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape') estado(false); });
    cx.addEventListener('focusout', function (e) { if (!cx.contains(e.relatedTarget)) estado(false); });
  }

  /* ---------- mega painel: teclado (o hover é CSS) ---------- */
  function mega() {
    $$('.mega-caixa').forEach(function (cx) {
      var gat = $('.menu__a', cx);
      if (!gat) return;
      gat.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') { e.preventDefault(); var p = $('.mega__a', cx); if (p) p.focus(); }
      });
    });
  }

  /* ---------- contadores ---------- */
  function contar() {
    var els = $$('[data-conta]');
    if (!els.length) return;
    if (reduz || !('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.textContent = e.dataset.conta; });
      return;
    }
    var fmt = new Intl.NumberFormat('pt-BR');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target; io.unobserve(el);
        var alvo = parseFloat(el.dataset.conta), t0 = null, dur = 1500;
        (function anda(t) {
          if (!t0) t0 = t;
          var p = Math.min((t - t0) / dur, 1);
          el.textContent = fmt.format(Math.round(alvo * (1 - Math.pow(1 - p, 4))));
          if (p < 1) requestAnimationFrame(anda);
        })(performance.now());
      });
    }, { threshold: .5 });
    els.forEach(function (e) { e.textContent = '0'; io.observe(e); });
  }

  /* ---------- sanfona ---------- */
  function sanfona() {
    $$('.sanfona').forEach(function (s) {
      $$('.sanfona__b', s).forEach(function (b) {
        b.addEventListener('click', function () {
          var i = b.closest('.sanfona__i'), ab = i.classList.contains('abre');
          $$('.sanfona__i', s).forEach(function (o) { o.classList.remove('abre'); $('.sanfona__b', o).setAttribute('aria-expanded', 'false'); });
          i.classList.toggle('abre', !ab);
          b.setAttribute('aria-expanded', String(!ab));
        });
      });
    });
  }

  /* ---------- vídeo sob demanda ---------- */
  function telas() {
    $$('.tela[data-yt]').forEach(function (t) {
      t.addEventListener('click', function () {
        if (t.classList.contains('viva')) return;
        var f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + t.dataset.yt + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
        f.title = t.dataset.titulo || 'OMID';
        f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        f.referrerPolicy = 'strict-origin-when-cross-origin';
        f.allowFullscreen = true;
        t.appendChild(f); t.classList.add('viva');
      });
    });
  }

  /* ---------- formulários ---------- */
  function formularios() {
    $$('form[data-form]').forEach(function (f) {
      var endpoint = f.dataset.endpoint || '';
      var bt = $('button[type="submit"]', f);
      var saida = $('[data-recado]', f);
      var rotulo = bt ? bt.querySelector('span').textContent.trim() : '';

      function recado(txt, ruim) {
        if (!saida) return;
        saida.hidden = false; saida.innerHTML = txt;
        saida.className = 'cheio recado ' + (ruim ? 'recado--erro' : 'recado--ok');
        saida.setAttribute('role', ruim ? 'alert' : 'status');
      }
      function ocupado(s) { if (bt) { bt.disabled = s; bt.querySelector('span').textContent = s ? f.dataset.enviando : rotulo; } }

      f.addEventListener('invalid', function (e) {
        e.preventDefault();
        var c = e.target; c.setAttribute('aria-invalid', 'true');
        var g = c.closest('.campo') || c.closest('.marca-cx'); if (g) g.classList.add('erro');
        if (!$('[aria-invalid="true"]', f) || $('[aria-invalid="true"]', f) === c) c.focus();
        recado(f.dataset.erroCampos, true);
      }, true);

      f.addEventListener('input', function (e) {
        if (e.target.checkValidity && e.target.checkValidity()) {
          e.target.removeAttribute('aria-invalid');
          var g = e.target.closest('.campo') || e.target.closest('.marca-cx'); if (g) g.classList.remove('erro');
        }
      });

      f.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!f.checkValidity()) { f.reportValidity(); return; }
        var fd = new FormData(f);
        if (fd.get('_nada')) { recado(f.dataset.ok); f.reset(); return; }   // robô
        fd.delete('_nada');
        var d = {}; fd.forEach(function (v, k) { d[k] = v; });
        d._assunto = f.dataset.assunto || 'Contato pelo site';
        d._pagina = location.pathname; d._idioma = raiz.lang;
        ocupado(true);
        if (!endpoint) {
          setTimeout(function () { recado(f.dataset.ok); f.reset(); ocupado(false); }, 550);
          return;
        }
        fetch(endpoint, { method: f.dataset.metodo || 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(d) })
          .then(function (r) { if (!r.ok) throw 0; recado(f.dataset.ok); f.reset(); })
          .catch(function () { recado(f.dataset.erroEnvio, true); })
          .then(function () { ocupado(false); });
      });
    });
  }

  /* ---------- relógio de Brasília ---------- */
  var relogioH = null;
  function relogio() {
    var alvos = $$('[data-relogio]');
    if (relogioH) { clearInterval(relogioH); relogioH = null; }
    if (!alvos.length) return;
    var fmt;
    try { fmt = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }); }
    catch (e) { return; }
    function anda() { var t = fmt.format(new Date()); alvos.forEach(function (e) { e.textContent = t; }); }
    anda(); relogioH = setInterval(anda, 1000);
  }

  function ano() { $$('[data-ano]').forEach(function (e) { e.textContent = new Date().getFullYear(); }); }

  /* ---------- o portal: a chegada encenada, uma vez por sessão ---------- */
  function portal(depois) {
    if (!raiz.classList.contains('portal-vivo')) { depois(); return; }
    var espera = reduz ? 0 : 1400;
    setTimeout(function () {
      document.body.classList.add('portal-sobe');
      setTimeout(function () {
        raiz.classList.remove('portal-vivo');
        raiz.classList.add('sem-portal');
        try { sessionStorage.omidV = '1'; } catch (e) {}
        depois();
      }, reduz ? 0 : 840);
    }, espera);
  }

  /* ---------- a manchete em letras ---------- */
  function estilhar() {
    var h = $('.sereno__h');
    if (!h || h.dataset.ok) return;
    h.dataset.ok = '1';
    var k = 0;
    (function anda(no) {
      [].slice.call(no.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (peca) {
            if (!peca) return;
            if (/^\s+$/.test(peca)) { frag.appendChild(document.createTextNode(peca)); return; }
            var palavra = document.createElement('cw');   // a palavra é indivisível
            peca.split('').forEach(function (ch) {
              var c = document.createElement('c');
              c.textContent = ch;
              c.style.setProperty('--k', k++);
              palavra.appendChild(c);
            });
            frag.appendChild(palavra);
          });
          no.replaceChild(frag, n);
        } else if (n.nodeType === 1) anda(n);
      });
    })(h);
    /* pontuação nunca fica órfã: junta-se à palavra anterior */
    [].slice.call(h.querySelectorAll('cw')).forEach(function (w) {
      if (/^[.,;:!?…»)]+$/.test(w.textContent) && w.previousElementSibling && w.previousElementSibling.tagName === w.tagName || (w.previousSibling && w.previousSibling.nodeType === 1 && /^[.,;:!?…»)]+$/.test(w.textContent))) {
        var ant = w.previousElementSibling || w.previousSibling;
        if (ant && ant.tagName) {
          var alvo = ant.tagName === 'B' ? ant.querySelector('cw:last-child') || ant : ant;
          while (w.firstChild) alvo.appendChild(w.firstChild);
          w.remove();
        }
      }
    });
  }

  /* ---------- o halo: o cursor vira personagem ---------- */
  function halo() {
    if (reduz || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (document.querySelector('.halo')) return;
    var a = document.createElement('div'); a.className = 'halo';
    var pt = document.createElement('div'); pt.className = 'halo-p';
    document.body.appendChild(a); document.body.appendChild(pt);
    var x = innerWidth / 2, y = innerHeight / 2, hx = x, hy = y, raf = null;
    function anda() {
      hx += (x - hx) * .16; hy += (y - hy) * .16;
      a.style.left = hx + 'px'; a.style.top = hy + 'px';
      pt.style.left = x + 'px'; pt.style.top = y + 'px';
      if (Math.abs(x - hx) + Math.abs(y - hy) > .3) raf = requestAnimationFrame(anda);
      else raf = null;
    }
    addEventListener('pointermove', function (e) {
      x = e.clientX; y = e.clientY;
      raiz.classList.add('com-halo');
      if (!raf) raf = requestAnimationFrame(anda);
    }, { passive: true });
    document.addEventListener('pointerover', function (e) {
      if (e.target.closest && e.target.closest('a, button, input[type="range"], .troca__b')) a.classList.add('cresce');
    });
    document.addEventListener('pointerout', function (e) {
      if (e.target.closest && e.target.closest('a, button, input[type="range"], .troca__b')) a.classList.remove('cresce');
    });
    document.documentElement.addEventListener('pointerleave', function () { raiz.classList.remove('com-halo'); });
  }

  /* ---------- ímã discreto nos CTAs principais ---------- */
  function ima() {
    if (reduz || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    $$('.botao--arco, .botao--g').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        var dx = ((e.clientX - r.left) / r.width - .5) * 8;
        var dy = ((e.clientY - r.top) / r.height - .5) * 8;
        b.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px)';
      });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });
  }

  /* ---------- profundidade: o hero recua enquanto a página avança ---------- */
  /* o cabeçalho veste a noite enquanto a primeira dobra está em cena */
  var noiteLigada = false;
  function topoNoite() {
    var hero = $('.abertura--noite');
    if (!hero) { raiz.classList.remove('topo-noite'); noiteLigada = false; return; }
    function avalia() {
      var r = hero.getBoundingClientRect();
      raiz.classList.toggle('topo-noite', r.bottom > 64);
    }
    avalia();
    if (noiteLigada) return;
    noiteLigada = true;
    addEventListener('scroll', avalia, { passive: true });
    addEventListener('resize', avalia, { passive: true });
  }

  var paralaxeOk = false;
  function paralaxe() {
    if (reduz || paralaxeOk) return;
    paralaxeOk = true;
    var raf = null;
    function anda() {
      raf = null;
      var alvo = $('.sereno'), pr = $('.procedencia');
      if (!alvo) return;
      var y = scrollY;
      if (y > innerHeight * 1.2) return;
      alvo.style.transform = 'translateY(' + (y * .16).toFixed(1) + 'px)';
      if (pr) pr.style.opacity = Math.max(0, 1 - y / 260).toFixed(2);
    }
    addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(anda); }, { passive: true });
  }

  /* ---------- a régua: simulador da casa ----------
     Fatura discriminada, recalculada no mesmo quadro do arrasto. Sem rede:
     os valores unitários da tabela pública estão no próprio HTML. */
  function reguaPreco() {
    var cx = $('[data-regua]');
    if (!cx) return;
    var out = $('[data-preco-out]', cx);
    var unit = { vcpu: +cx.dataset.vcpu, ram: +cx.dataset.ram, ssd: +cx.dataset.ssd,
                 backup: +cx.dataset.backup, egress: +cx.dataset.egress, win: +cx.dataset.win };
    var fmt0 = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });
    var fmt2 = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    var so = 0;
    function parte(k, v) { var el = $('[data-parte="' + k + '"]', cx); if (el) el.textContent = fmt2.format(v); }
    function calc() {
      var g = {};
      $$('input[data-rg]', cx).forEach(function (i) {
        g[i.dataset.rg] = +i.value;
        var alvo = $('[data-val="' + i.dataset.rg + '"]', cx);
        if (alvo) alvo.textContent = fmt0.format(+i.value) + ' ' + i.dataset.un;
      });
      var compute = g.vcpu * unit.vcpu + g.ram * unit.ram;
      var disco = g.ssd * unit.ssd;
      var bk = g.backup * unit.backup;
      var tr = g.egress * unit.egress;
      var lic = so ? Math.ceil(g.vcpu / 2) * unit.win : 0;
      parte('compute', compute); parte('disco', disco); parte('backup', bk);
      parte('trafego', tr); parte('licenca', lic);
      var totalOmid = compute + disco + bk + tr + lic;
      if (out) out.textContent = fmt0.format(Math.round(totalOmid));
      duelo(totalOmid, g, so);
    }

    /* ---------- o duelo ----------
       Mesma configuração, cotada nos preços públicos on-demand dos quatro
       hyperscalers (São Paulo) e convertida pelo câmbio do dia. Os preços
       vêm do snapshot diário em /assets/dados/precos-nuvem.json; câmbio
       (BCB) e Oracle liberam CORS, então esses dois são refinados ao vivo.
       Nada disto é inventado: cada número tem fonte listada no próprio bloco. */
    var D = null, duel = $('[data-duelo]'), ult = null, vivo = { cambio: false, oci: false };
    var ORDEM = ['omid', 'aws', 'azure', 'gcp', 'oci'];

    /* faixas cumulativas: [teto, preço], depois da franquia grátis */
    function faixas(gb, e) {
      var base = e.gratisGb || 0, custo = 0, i, teto, fatia;
      if (gb <= base) return 0;
      for (i = 0; i < e.faixas.length; i++) {
        teto = e.faixas[i][0] == null ? Infinity : e.faixas[i][0];
        fatia = Math.max(0, Math.min(gb, teto) - base);
        custo += fatia * e.faixas[i][1];
        base = teto;
        if (gb <= teto) break;
      }
      return custo;
    }
    function calcProv(p, g, so) {
      var H = D.horasMes, compute, lic = 0, n;
      if (p.modo === 'porInstancia') {
        /* instância de referência com proporção fixa vCPU:GiB — cobra-se
           o que for maior, como quem precisa de máquinas suficientes */
        n = Math.max(g.vcpu / p.unidade.vcpu, g.ram / p.unidade.ram);
        compute = n * p.usdHora.linux * H;
        if (so) lic = n * (p.usdHora.windows - p.usdHora.linux) * H;
      } else {
        compute = (g.vcpu * p.usdHora.vcpu + g.ram * p.usdHora.gb) * H;
        if (so) lic = g.vcpu * p.windowsVcpuHora * H;
      }
      var disco = g.ssd * p.disco.usdGbMes;
      var bk = Math.max(0, g.backup - (p.backup.gratisGb || 0)) * p.backup.usdGbMes + (g.backup > 0 ? (p.backup.usdFixoMes || 0) : 0);
      var tr = faixas(g.egress, p.egress);
      return (compute + lic + disco + bk + tr) * D.cambio.usdBrl;
    }
    function duelo(totalOmid, g, so) {
      ult = { t: totalOmid, g: g, so: so };
      if (!D || !duel) return;
      var ds = duel.dataset, tot = { omid: totalOmid }, k, i;
      for (i = 1; i < ORDEM.length; i++) tot[ORDEM[i]] = calcProv(D.provedores[ORDEM[i]], g, so);
      var max = 0; for (k in tot) if (tot[k] > max) max = tot[k];
      ORDEM.forEach(function (k) {
        var li = $('[data-prov="' + k + '"]', duel); if (!li) return;
        $('[data-duelo-valor]', li).textContent = fmt0.format(Math.round(tot[k]));
        $('[data-duelo-barra]', li).style.width = (tot[k] / max * 100).toFixed(1) + '%';
        var inst = $('[data-duelo-inst]', li);
        if (inst) inst.textContent = k === 'omid' ? ds.inclui : (D.provedores[k].instancia + ' · ' + D.provedores[k].regiao);
        var d = $('[data-duelo-delta]', li), r = tot[k] / totalOmid;
        if (k === 'omid') { d.textContent = ds.referencia; d.className = 'ref'; }
        else if (r >= 1.5) { d.textContent = r.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ds.vezes; d.className = ''; }
        else if (r >= 1) { d.textContent = '+' + Math.round((r - 1) * 100) + '% ' + ds.maisCaro; d.className = ''; }
        else { d.textContent = '−' + Math.round((1 - r) * 100) + '% ' + ds.maisBarato; d.className = 'menor'; }
      });
    }
    function pinta() {
      if (!D || !duel) return;
      var ds = duel.dataset, base = $('[data-duelo-base]', duel), pill = $('[data-duelo-vivo]', duel), ul = $('[data-duelo-fontes]', duel);
      if (base) base.textContent = ds.consultado + ' ' + D.consultadoEm + ' · ' + ds.cambio + ' R$ ' +
        D.cambio.usdBrl.toLocaleString('pt-BR', { minimumFractionDigits: 4, maximumFractionDigits: 4 }) + ' (' + D.cambio.data + ')';
      if (pill) { pill.hidden = !(vivo.cambio || vivo.oci); pill.textContent = ' · ' + ds.aoVivo; }
      if (ul && !ul.childNodes.length) {
        var urls = [D.cambio.fonte], k, j;
        for (k in D.provedores) for (j = 0; j < D.provedores[k].fontes.length; j++) if (urls.indexOf(D.provedores[k].fontes[j]) < 0) urls.push(D.provedores[k].fontes[j]);
        urls.forEach(function (u) { var li = document.createElement('li'), a = document.createElement('a'); a.href = u; a.rel = 'noopener'; a.target = '_blank'; a.textContent = u.replace(/^https?:\/\//, '').slice(0, 96); li.appendChild(a); ul.appendChild(li); });
      }
    }
    function aoVivo() {
      var f = function (d) { return ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2) + '-' + d.getFullYear(); };
      var fim = new Date(), ini = new Date(Date.now() - 10 * 864e5);
      var u = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='" + f(ini) + "'&@dataFinalCotacao='" + f(fim) + "'&$top=1&$orderby=dataHoraCotacao%20desc&$format=json";
      fetch(u).then(function (r) { return r.json(); }).then(function (j) {
        var v = j.value && j.value[0];
        if (v && v.cotacaoVenda > 0) { D.cambio.usdBrl = v.cotacaoVenda; D.cambio.data = v.dataHoraCotacao.slice(0, 10); vivo.cambio = true; pinta(); if (ult) duelo(ult.t, ult.g, ult.so); }
      }).catch(function () {});
      fetch('https://apexapps.oracle.com/pls/apex/cetools/api/v1/products/?currencyCode=USD').then(function (r) { return r.json(); }).then(function (j) {
        var oc = D.provedores.oci, P = oc.partes, it = j.items || [];
        var precos = function (pn) { var x = it.filter(function (i) { return i.partNumber === pn; })[0]; if (!x) throw 0; var l = x.currencyCodeLocalizations.filter(function (c) { return c.currencyCode === 'USD'; })[0]; return (l && l.prices) || []; };
        var ocpu = precos(P.ocpu)[0].value, mem = precos(P.memoria)[0].value, win = precos(P.windows)[0].value;
        var blo = precos(P.bloco[0])[0].value + precos(P.bloco[1])[0].value * 10, obj = precos(P.objeto), sai = precos(P.saida);
        oc.usdHora = { vcpu: ocpu / 2, gb: mem }; oc.windowsVcpuHora = win / 2; oc.disco.usdGbMes = blo;
        oc.backup.usdGbMes = obj[obj.length - 1].value; oc.backup.gratisGb = obj[0].value === 0 ? obj[0].rangeMax : 0;
        oc.egress.faixas = [[null, sai[sai.length - 1].value]]; oc.egress.gratisGb = sai[0].value === 0 ? sai[0].rangeMax : 0;
        vivo.oci = true; pinta(); if (ult) duelo(ult.t, ult.g, ult.so);
      }).catch(function () {});
    }
    if (duel && window.fetch) {
      fetch('/assets/dados/precos-nuvem.json', { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (j) {
        D = j; duel.hidden = false; pinta(); if (ult) duelo(ult.t, ult.g, ult.so); aoVivo();
      }).catch(function () {});
    }
    $$('input[data-rg]', cx).forEach(function (i) { i.addEventListener('input', calc, { passive: true }); });
    $$('.troca__b', cx).forEach(function (b) {
      b.addEventListener('click', function () {
        so = +b.dataset.so;
        $$('.troca__b', cx).forEach(function (o) {
          var on = o === b;
          o.classList.toggle('abre', on);
          o.setAttribute('aria-pressed', String(on));
        });
        calc();
      });
    });
    calc();
  }

  /* ---------- dobras automáticas ----------
     Páginas internas ganham a mesma coreografia da home sem marcação manual:
     cada seção sem dobra recebe um corte, e nunca o mesmo da seção anterior. */
  function dobras() {
    var claras = ['dobra--corte', 'dobra--colapso'];
    var ultimo = '';
    $$('main > section.bloco').forEach(function (sec, idx) {
      if (sec.classList.contains('quieto')) { ultimo = ''; return; }
      if (sec.className.indexOf('dobra--') !== -1) {
        ultimo = (sec.className.match(/dobra--[a-z]+/) || [''])[0];
        return;
      }
      var escolha;
      if (sec.classList.contains('inv')) {
        escolha = 'dobra--inverte';
      } else {
        // determinístico pela posição, pulando o corte anterior
        var i = idx % claras.length;
        if (claras[i].indexOf(ultimo) === 0 && ultimo) i = (i + 1) % claras.length;
        escolha = claras[i];
      }
      sec.classList.add('dobra');
      if (idx > 0 && !sec.classList.contains('inv')) sec.classList.add('dobra--fio');
      escolha.split(' ').forEach(function (c) { sec.classList.add(c); });
      sec.classList.remove('regra');           // o fio da dobra substitui a regra estática
      ultimo = (escolha.match(/dobra--[a-z]+/) || [''])[0];
    });
  }

  function iniciar() {
    raiz.classList.add('js');
    if (!reduz) raiz.classList.add('sdt');
    estilhar();
    dobras(); reguaPreco(); trilho(); gaveta(); idioma(); mega();
    contar(); sanfona(); telas(); formularios(); relogio(); ano();
    /* a revelação e os gestos esperam a cortina subir */
    topoNoite();
    portal(function () { revelar(); halo(); ima(); paralaxe(); });

    /* ganchos de re-inicialização: o miolo trocou (roteador da prévia) */
    window.__omidPagina = function () {
      estilhar(); topoNoite(); dobras(); reguaPreco(); contar(); sanfona();
      telas(); formularios(); relogio(); revelar(); ima(); paralaxe();
    };
    window.__omidChrome = function () { gaveta(); idioma(); mega(); trilho(); ano(); halo(); };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
