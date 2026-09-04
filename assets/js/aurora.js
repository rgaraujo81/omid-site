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
    /* campo azul da marca: teal → ciano → índigo, em ciclo sem emenda */
    'vec3 paleta(float t){',
    ' t=fract(t);',
    ' vec3 c0=vec3(.251,.678,.718);', /* 40ADB7 teal */
    ' vec3 c1=vec3(.176,.576,.733);', /* 2D93BB ciano */
    ' vec3 c2=vec3(.329,.369,.627);', /* 545EA0 índigo */
    ' if(t<.34)return mix(c0,c1,t/.34);',
    ' if(t<.67)return mix(c1,c2,(t-.34)/.33);',
    ' return mix(c2,c0,(t-.67)/.33);}',
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
    ' float brilho=faixa*smoothstep(.14,.78,f2);',
    /* azul viajando com a seda; o dourado entra como manchas de sol, raras */
    ' vec3 cor=paleta(f2*.7+uv.x*.25+uT*.006);',
    ' float dourado=smoothstep(.55,.76,fbm(p*1.15+vento*.5+vec2(7.3,2.1)));',
    ' cor=mix(cor,vec3(.93,.93,.9),.05);',
    ' cor=mix(cor,vec3(.96,.7,.28),dourado*.7);',
    ' vec3 papel=mix(vec3(.957,.949,.929),vec3(.047,.047,.055),uNoite);',
    ' float forca=mix(.62,.88,uNoite)*uForca;',
    ' vec3 fim=mix(papel,cor,brilho*forca);',
    /* granulação fina: tira o plástico */
    ' fim+=(hash(gl_FragCoord.xy+uT)-.5)*.012;',
    ' gl_FragColor=vec4(fim,1.);}'
  ].join('\n');

  /* O HORIZONTE DE DADOS — a primeira dobra. Um plano infinito de grade
     fluindo para um horizonte no espectro da marca; pulsos de luz correm
     pelas linhas; o mouse inclina a câmera; a rolagem acelera o mundo. */
  var FRAG_H = [
    'precision highp float;',
    'uniform vec2 uRes;',
    'uniform float uT;',
    'uniform vec2 uM;',
    'uniform float uForca;',
    'uniform float uVel;',
    'float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}',
    'float ruido(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.-2.*f);',
    ' return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}',
    'float fbm(vec2 p){float v=0.;float a=.5;',
    ' for(int i=0;i<4;i++){v+=a*ruido(p);p=p*2.03+vec2(1.7,9.2);a*=.52;}return v;}',
    'vec3 espectro(float t){',
    ' t=fract(t);',
    ' vec3 c0=vec3(.251,.678,.718);vec3 c1=vec3(.176,.576,.733);vec3 c2=vec3(.329,.369,.627);',
    ' vec3 c3=vec3(.498,.141,.514);vec3 c4=vec3(.906,.208,.529);vec3 c5=vec3(.933,.455,.306);vec3 c6=vec3(.973,.698,.255);',
    ' if(t<.167)return mix(c0,c1,t/.167);',
    ' if(t<.333)return mix(c1,c2,(t-.167)/.166);',
    ' if(t<.5)return mix(c2,c3,(t-.333)/.167);',
    ' if(t<.667)return mix(c3,c4,(t-.5)/.167);',
    ' if(t<.833)return mix(c4,c5,(t-.667)/.166);',
    ' return mix(c5,c6,(t-.833)/.167);}',
    'void main(){',
    ' vec2 uv=gl_FragCoord.xy/uRes;',
    ' float asp=uRes.x/uRes.y;',
    ' float tx=(uM.x-.5)*.34;',
    ' float hy=.68+(uM.y-.5)*.03;',
    /* céu: tinta profunda subindo para índigo, com estrelas discretas */
    ' vec3 cor=mix(vec3(.035,.037,.052),vec3(.075,.085,.14),pow(max(uv.y-hy,0.)/(1.-hy+.001),1.4));',
    ' vec2 sp=floor(uv*vec2(asp,1.)*110.);',
    ' float st=step(.9965,hash(sp))*smoothstep(hy+.03,1.,uv.y);',
    ' cor+=vec3(.75,.85,1.)*st*(.35+.35*sin(uT*1.6+hash(sp)*6.28));',
    /* névoa fina de aurora acima do horizonte */
    ' float w=fbm(vec2(uv.x*2.6+uT*.02,uv.y*3.2));',
    ' float veu=exp(-pow((uv.y-hy-.1)*7.,2.))*smoothstep(.32,.78,w);',
    ' cor+=mix(vec3(.13,.42,.5),vec3(.26,.22,.5),w)*veu*.5;',
    /* o plano: grade em perspectiva fluindo para o horizonte */
    ' if(uv.y<hy){',
    '  float z=hy-uv.y;',
    '  float t=min(1./max(z,.004),70.);',
    '  float longe=exp(-t*.05);',
    '  float wx=(uv.x-.5)*asp*t*1.25+tx*t*.5;',
    '  float wz=t+uT*(2.4+uVel*7.);',
    '  float gx=abs(fract(wx+.5)-.5);',
    '  float gz=abs(fract(wz+.5)-.5);',
    '  float linhas=max(smoothstep(.028,.0,gx),smoothstep(.028,.0,gz)*.7);',
    '  vec3 corLinha=mix(vec3(.34,.4,.78),vec3(.18,.68,.74),longe);',
    '  cor=vec3(.026,.028,.042);',
    '  cor+=espectro(uv.x*.6+.2)*exp(-z*7.)*.22;',            /* reflexo do horizonte no chão */
    '  cor+=corLinha*linhas*longe*.72;',
    /* pulsos de dados descendo as linhas verticais */
    '  float trilha=smoothstep(.05,.0,gx);',
    '  float id=floor(wx+.5);',
    '  float p1=fract(wz*.22-uT*1.1+hash(vec2(id,1.))*7.);',
    '  cor+=vec3(.45,.9,1.)*smoothstep(.08,.0,p1)*trilha*longe*1.05;',
    '  float p2=fract(wz*.16+uT*.8+hash(vec2(id,5.))*7.);',
    '  cor+=vec3(1.,.72,.28)*smoothstep(.07,.0,p2)*trilha*longe*step(.72,hash(vec2(id,9.)));',
    ' }',
    /* o horizonte: uma lâmina de espectro incandescente */
    ' float d=abs(uv.y-hy);',
    ' vec3 esp=espectro(uv.x*.62+.16+sin(uT*.045)*.06);',
    ' cor+=esp*(exp(-d*110.)*1.25+exp(-d*16.)*.3)*uForca;',
    ' float centro=exp(-pow((uv.x-.5)*2.1,2.)-pow((uv.y-.52)*2.4,2.));',
    ' cor*=1.-centro*.42;',
    ' cor*=mix(.55,1.,uForca);',
    ' cor+=(hash(gl_FragCoord.xy+uT)-.5)*.02;',
    ' gl_FragColor=vec4(cor,1.);}'
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
      gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, cv.dataset.modo === 'horizonte' ? FRAG_H : FRAG));
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
