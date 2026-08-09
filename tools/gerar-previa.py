#!/usr/bin/env python3
"""Empacota o site inteiro (54 páginas × 3 idiomas) num único HTML navegável,
com roteador por hash — para publicar como prévia num host de página única.
Uso:  python3 tools/gerar-previa.py [saida.html]
Pré-requisito: fontes-inline.css no scratchpad (gerado uma vez a partir do Google Fonts).
"""
import io, os, re, json, sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRATCH = '/private/tmp/claude-501/-Users-ricardo-araujo-Documents-SiteNovo/a0ab8d97-8669-4639-b1af-01a5aba547ea/scratchpad'
SAIDA = sys.argv[1] if len(sys.argv) > 1 else os.path.join(SCRATCH, 'omid-site-completo.html')

os.chdir(RAIZ)

# ---------- páginas ----------
paginas = {}
for dp, dn, fn in os.walk('.'):
    if any(x in dp for x in ('/src', '/.claude', '/tools', '/assets', '/conceitos')):
        continue
    if 'index.html' not in fn:
        continue
    rel = os.path.relpath(dp, '.').replace('\\', '/')
    path = '/' if rel == '.' else f'/{rel}/'
    s = io.open(os.path.join(dp, 'index.html'), encoding='utf-8').read()
    lang = re.search(r'<html lang="([^"]+)"', s).group(1)
    loc = 'pt' if lang.startswith('pt') else ('en' if lang == 'en' else 'es')
    titulo = re.search(r'<title>(.*?)</title>', s, re.S).group(1)
    main = re.search(r'<main id="conteudo">(.*)</main>', s, re.S).group(1)
    alt = {}
    for m in re.finditer(r'<link rel="alternate" hreflang="([^"]+)" href="https://omid\.com\.br([^"]*)"', s):
        hl, ap = m.group(1), m.group(2) or '/'
        chave = 'pt' if hl.startswith('pt') else ('en' if hl == 'en' else ('es' if hl == 'es' else None))
        if chave:
            alt[chave] = ap
    paginas[path] = {'loc': loc, 'lang': lang, 'title': titulo, 'alt': alt, 'main': main}

# ---------- chrome por idioma + peças globais ----------
chrome = {}
globais = None
for loc, home in (('pt', 'index.html'), ('en', 'en/index.html'), ('es', 'es/index.html')):
    s = io.open(home, encoding='utf-8').read()
    corpo = s[s.index('<body>') + 6: s.rindex('</body>')]
    peca = lambda rx: re.search(rx, corpo, re.S).group(1)
    chrome[loc] = {
        'pula': peca(r'(<a class="pula".*?</a>)'),
        'topo': peca(r'(<header class="topo">.*?</header>)'),
        'gaveta': peca(r'(<div class="gaveta".*?</nav>\s*</div>)'),
        'rodape': peca(r'(<footer class="rodape">.*?</footer>)'),
        'doca': peca(r'(<div class="doca">.*?</div>)'),
    }
    if loc == 'pt':
        globais = (peca(r'(<svg width="0".*?</svg>)')
                   + peca(r'(<div class="portal".*?</div></div>)')
                   + '<div class="trilho" aria-hidden="true"></div>')

css = io.open('assets/css/omid.css', encoding='utf-8').read()
js1 = io.open('assets/js/omid.js', encoding='utf-8').read()
js2 = io.open('assets/js/aurora.js', encoding='utf-8').read()
fontes = io.open(os.path.join(SCRATCH, 'fontes-inline.css'), encoding='utf-8').read()
dados = json.dumps({'paginas': paginas, 'chrome': chrome}, ensure_ascii=False).replace('</script', r'<\/script')

roteador = r"""
(function () {
  'use strict';
  var D = window.__OMID;
  var elMain, locAtual = null;

  function render(path, ancora) {
    var p = D.paginas[path];
    if (!p) { p = D.paginas['/']; path = '/'; }
    document.documentElement.lang = p.lang;
    document.title = p.title;
    if (p.loc !== locAtual) {
      locAtual = p.loc;
      var c = D.chrome[p.loc];
      document.getElementById('c-topo').innerHTML = c.pula + c.topo + c.gaveta;
      document.getElementById('c-pe').innerHTML = c.rodape + c.doca;
      if (window.__omidChrome) window.__omidChrome();
    }
    elMain.innerHTML = p.main;
    [].forEach.call(document.querySelectorAll('.idioma__l a, .gaveta__idi a'), function (a) {
      var hl = a.getAttribute('hreflang') || '';
      var k = hl.indexOf('pt') === 0 ? 'pt' : (hl.indexOf('en') === 0 ? 'en' : 'es');
      if (p.alt[k]) a.setAttribute('href', p.alt[k]);
    });
    if (window.__omidPagina) window.__omidPagina();
    if (window.__omidAurora) window.__omidAurora();
    document.body.classList.remove('aberto');
    if (ancora) {
      var e = document.getElementById(ancora);
      if (e) { e.scrollIntoView(); return; }
    }
    scrollTo(0, 0);
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var h = a.getAttribute('href');
    if (!h || h.charAt(0) !== '/') return;
    e.preventDefault();
    var partes = h.split('#');
    var path = partes[0] || '/';
    if (!D.paginas[path]) path = '/';
    try { history.pushState(null, '', '#' + path); } catch (err) {}
    render(path, partes[1] || null);
  });

  addEventListener('popstate', function () {
    var p = (location.hash || '').replace(/^#/, '') || '/';
    if (D.paginas[p]) render(p);
  });

  function boot() {
    elMain = document.getElementById('conteudo');
    var p = (location.hash || '').replace(/^#/, '') || '/';
    render(D.paginas[p] ? p : '/');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
"""

html = f"""<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>OMID — site completo (prévia)</title>
<script>try{{if(sessionStorage.omidV)document.documentElement.classList.add('sem-portal');else document.documentElement.classList.add('portal-vivo')}}catch(e){{document.documentElement.classList.add('sem-portal')}}</script>
<style>
{fontes}
{css}
</style>
</head>
<body>
{globais}
<div id="c-topo"></div>
<main id="conteudo"></main>
<div id="c-pe"></div>
<script>
{js1}
</script>
<script>
{js2}
</script>
<script>window.__OMID = {dados};</script>
<script>
{roteador}
</script>
</body>
</html>"""

io.open(SAIDA, 'w', encoding='utf-8').write(html)
print(f'{len(paginas)} páginas → {SAIDA} ({len(html) / 1024:.0f} KB)')
