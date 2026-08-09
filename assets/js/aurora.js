/* OMID — aurora do espectro.
   Um campo de luz nas cores exatas do logo, em WebGL puro. Seda, não plasma:
   movimento lento, resposta suave ao cursor. Pausa fora de cena, um quadro
   só em prefers-reduced-motion, e some com elegância onde não há WebGL. */
(function () {
  'use strict';

  var reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;

  var VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';

  var FRAG = [
    'precision highp float;',
    'uniform vec2 uRes;',
    'uniform float uT;',
    'uniform vec2 uM;',
    'uniform float uNoite;',
    'uniform float uForca;',
    'uniform float uVel;',
    /* ruído clássico de valor + fbm */
    'float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}',
    'float ruido(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.-2.*f);',
    ' return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}',
    'float fbm(vec2 p){float v=0.;float a=.5;',
    ' for(int i=0;i<5;i++){v+=a*ruido(p);p=p*2.03+vec2(1.7,9.2);a*=.52;}return v;}',
    /* o espectro oficial do LogoOMID.svg, como rampa contínua */
    'vec3 paleta(float t){',
    ' t=clamp(t,0.,1.);',
    ' vec3 c0=vec3(.251,.678,.718);', /* 40ADB7 */
    ' vec3 c1=vec3(.176,.576,.733);', /* 2D93BB */
    ' vec3 c2=vec3(.329,.369,.627);', /* 545EA0 */
    ' vec3 c3=vec3(.498,.141,.514);', /* 7F2483 */
    ' vec3 c4=vec3(.906,.208,.529);', /* E73587 */
    ' vec3 c5=vec3(.933,.455,.306);', /* EE744E */
    ' vec3 c6=vec3(.973,.698,.255);', /* F8B241 */
    ' if(t<.1667)return mix(c0,c1,t/.1667);',
    ' if(t<.3333)return mix(c1,c2,(t-.1667)/.1666);',
    ' if(t<.5)   return mix(c2,c3,(t-.3333)/.1667);',
    ' if(t<.6667)return mix(c3,c4,(t-.5)/.1667);',
    ' if(t<.8333)return mix(c4,c5,(t-.6667)/.1666);',
    ' return mix(c5,c6,(t-.8333)/.1667);}',
    'void main(){',
    ' vec2 uv=gl_FragCoord.xy/uRes;',
    ' vec2 p=uv;p.x*=uRes.x/uRes.y;',
    /* fluxo: dois fbm aninhados, deriva lenta, cursor empurra de leve */
    ' vec2 vento=vec2(uT*.016,-uT*.009)+(uM-.5)*.22;',
    ' float f1=fbm(p*1.35+vento);',
    ' float f2=fbm(p*1.35+f1*(1.9+uVel*2.2)+vento*.6);',
    /* faixa de seda: gaussiana vertical com o centro ondulado pelo ruído */
    ' float centro=.60+ (f1-.5)*.34;',
    ' float faixa=exp(-pow((uv.y-centro)*2.6,2.));',
    ' float brilho=faixa*smoothstep(.18,.85,f2);',
    /* cor ao longo do fluxo, não do eixo: a rampa viaja com a seda */
    ' vec3 cor=paleta(fract(f2*.85+uv.x*.35+uT*.008));',
    ' vec3 papel=mix(vec3(.957,.949,.929),vec3(.047,.047,.055),uNoite);',
    ' float forca=mix(.52,.92,uNoite)*uForca;',
    ' vec3 fim=mix(papel,cor,brilho*forca);',
    /* granulação fina: tira o plástico */
    ' fim+=(hash(gl_FragCoord.xy+uT)-.5)*.012;',
    ' gl_FragColor=vec4(fim,1.);}'
  ].join('\n');

  function montar(cv) {
    if (cv.dataset.montado) return;
    cv.dataset.montado = '1';
    var gl = cv.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
          || cv.getContext('experimental-webgl');
    if (!gl) { cv.remove(); return; }

    function shader(tipo, src) {
      var s = gl.createShader(tipo);
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { throw gl.getShaderInfoLog(s); }
      return s;
    }
    var prog;
    try {
      prog = gl.createProgram();
      gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw 0;
    } catch (e) { cv.remove(); return; }
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    var uRes = gl.getUniformLocation(prog, 'uRes');
    var uT = gl.getUniformLocation(prog, 'uT');
    var uM = gl.getUniformLocation(prog, 'uM');
    var uNoite = gl.getUniformLocation(prog, 'uNoite');
    var uForca = gl.getUniformLocation(prog, 'uForca');
    var uVel = gl.getUniformLocation(prog, 'uVel');
    var noite = cv.dataset.noite === '1';
    gl.uniform1f(uNoite, noite ? 1 : 0);

    /* coreografia: o hero cede espaço ao conteúdo; a rolagem dá energia */
    var forca = 1, forcaAlvo = 1, vel = 0, velAlvo = 0, ultimoY = scrollY;
    addEventListener('scroll', function () {
      var d = Math.abs(scrollY - ultimoY); ultimoY = scrollY;
      velAlvo = Math.min(velAlvo + d / 90, 1.3);
      if (!noite) forcaAlvo = Math.max(.3, 1 - scrollY / (innerHeight * .9));
      acordar();
    }, { passive: true });

    var mx = .5, my = .5, mxA = .5, myA = .5;
    var pai = cv.parentElement;
    pai.addEventListener('pointermove', function (e) {
      var r = pai.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width;
      my = 1 - (e.clientY - r.top) / r.height;
    }, { passive: true });

    function medir() {
      var dpr = Math.min(devicePixelRatio || 1, 1.5);
      var w = Math.round(cv.clientWidth * dpr), h = Math.round(cv.clientHeight * dpr);
      if (cv.width !== w || cv.height !== h) {
        cv.width = w; cv.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uRes, w, h);
      }
    }

    var vivo = true, dentro = true, raf = null, t0 = performance.now();
    function quadro(t) {
      raf = null;
      if (!vivo || !dentro || document.hidden) return;
      medir();
      mxA += (mx - mxA) * .04; myA += (my - myA) * .04;   // o cursor convence, não arrasta
      forca += (forcaAlvo - forca) * .07;
      vel += (velAlvo - vel) * .08; velAlvo *= .92;
      gl.uniform1f(uT, (t - t0) / 1000);
      gl.uniform2f(uM, mxA, myA);
      gl.uniform1f(uForca, forca);
      gl.uniform1f(uVel, vel);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduz) raf = requestAnimationFrame(quadro);
    }
    function acordar() { if (!raf && vivo) raf = requestAnimationFrame(quadro); }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { dentro = e.isIntersecting; if (dentro) acordar(); });
      }, { threshold: .01 }).observe(cv);
    }
    document.addEventListener('visibilitychange', function () { if (!document.hidden) acordar(); });
    addEventListener('resize', function () { medir(); acordar(); }, { passive: true });

    /* primeiro quadro síncrono: nunca existe um canvas preto, nem por um instante */
    medir();
    gl.uniform1f(uT, 0);
    gl.uniform2f(uM, .5, .5);
    gl.uniform1f(uForca, 1);
    gl.uniform1f(uVel, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    acordar();          // reduz-motion: fica neste quadro — a seda vira pintura
  }

  function iniciar() {
    var cvs = document.querySelectorAll('canvas.aurora');
    for (var i = 0; i < cvs.length; i++) montar(cvs[i]);
  }
  window.__omidAurora = iniciar;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
