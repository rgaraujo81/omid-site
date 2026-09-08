/* Dados que não mudam entre idiomas: contatos, endereços, cores, slugs, valores. */

export const LOCALES = ['pt', 'en', 'es'];

export const meta = {
  pt: { htmlLang: 'pt-BR', ogLocale: 'pt_BR', label: 'Português', short: 'PT', base: '' },
  en: { htmlLang: 'en',    ogLocale: 'en_US', label: 'English',    short: 'EN', base: '/en' },
  es: { htmlLang: 'es',    ogLocale: 'es_ES', label: 'Español',    short: 'ES', base: '/es' }
};

export const site = {
  name: 'OMID',
  full: 'OMID Solutions',
  url: 'https://omid.com.br',
  app: 'https://app.omid.com.br',
  simulador: 'https://smart-oc2.omid.com.br/simulador'
};

/* ---------------------------------------------------------------------
   Envio dos formulários.
   Deixe `endpoint` vazio para o modo demonstração (nada sai do navegador).
   Para ligar de verdade, ponha aqui a URL que recebe o POST — o seu backend,
   o webhook do CRM, um Formspree/Web3Forms da vida. O corpo vai como JSON
   com os campos do formulário + `_assunto`, `_pagina` e `_idioma`.
   --------------------------------------------------------------------- */
export const form = {
  endpoint: '',
  metodo: 'POST',
  // e-mail de fallback mostrado se o envio falhar
  fallbackMail: 'comercial@omid.com.br'
};

/* Segmentos de URL por idioma. As chaves são estáveis; os valores viram a URL. */
export const routes = {
  pt: {
    home: '', solucoes: 'produtos-e-solucoes', paraQuem: 'para-quem-e', precos: 'tabela-de-precos',
    partner: 'partner-program', partnerOk: 'partner-program-agradecimento', conteudo: 'conteudo',
    blog: 'blog', cases: 'cases', videos: 'videos-e-podcasts', docs: 'documentacao',
    faq: 'faq', sobre: 'sobre-a-omid', compliance: 'integridade-e-compliance',
    contato: 'contato', cloud: 'cloud-inteligente', privacidade: 'politica-de-privacidade'
  },
  en: {
    home: '', solucoes: 'solutions', paraQuem: 'who-its-for', precos: 'pricing',
    partner: 'partner-program', partnerOk: 'partner-program-thank-you', conteudo: 'resources',
    blog: 'blog', cases: 'case-studies', videos: 'videos-and-podcasts', docs: 'documentation',
    faq: 'faq', sobre: 'about', compliance: 'integrity-and-compliance',
    contato: 'contact', cloud: 'intelligent-cloud', privacidade: 'privacy-policy'
  },
  es: {
    home: '', solucoes: 'productos-y-soluciones', paraQuem: 'para-quien-es', precos: 'tabla-de-precios',
    partner: 'partner-program', partnerOk: 'partner-program-gracias', conteudo: 'contenido',
    blog: 'blog', cases: 'casos', videos: 'videos-y-podcasts', docs: 'documentacion',
    faq: 'faq', sobre: 'sobre-omid', compliance: 'integridad-y-cumplimiento',
    contato: 'contacto', cloud: 'cloud-inteligente', privacidade: 'politica-de-privacidad'
  }
};

/* Constrói uma URL para um idioma. url('en','solucoes') -> /en/solutions/ */
export const url = (loc, key = 'home', sub = '') => {
  const seg = routes[loc][key];
  const j = [meta[loc].base, seg, sub].filter(Boolean).join('/');
  if (!j) return '/';
  return (j.startsWith('/') ? j : '/' + j) + '/';
};

export const contato = {
  comercial: { tel: '11 99587-9982', href: 'tel:+5511995879982', mail: 'comercial@omid.com.br', wa: 'https://wa.me/5511995879982' },
  noc:       { tel: '0800 878 1250', href: 'tel:08008781250', alt: '11 4410-4300', altHref: 'tel:+551144104300', wa: 'https://wa.me/5511999562354', waTel: '11 99956-2354', mail: 'monitoramento@omid.com.br' },
  parceiros: { tel: '11 94299-9501', href: 'tel:+5511942999501', mail: 'parceiros@omid.com.br', wa: 'https://wa.me/5511942999501' },
  imprensa:  { tel: '11 98625-2202', href: 'tel:+5511986252202', mail: 'omid@bursonglobal.com' },
  etica:     { tel: '11 99972-7352', href: 'tel:+5511999727352', mail: 'canaldaetica@omidsolutions.com' }
};

/* Perfis reais, extraídos do rodapé de omid.com.br e da página do vídeo.
   Todos verificados com HTTP 200 em 2026-08-08. */
export const social = {
  li: 'https://www.linkedin.com/company/omid-brazil/',
  ig: 'https://www.instagram.com/omid.smart.cloud/',
  fb: 'https://www.facebook.com/omidsolution',
  yt: 'https://www.youtube.com/@Omidcloud'
};

/* papel: 'dc' entra na lista de data centers da home; 'escritorio' só em contato e rodapé.
   Coordenadas em minutos (a do Rio é o centroide do CEP 22780-085 — mesma precisão das outras). */
export const enderecos = [
  { uf: 'SP', cidade: 'Barueri', linha: 'Av. Aruanã, 452 — Tamboré', cep: '06460-010', dot: 'var(--c-teal)', coord: '23°30′S · 46°51′W', papel: 'dc', sede: true },
  { uf: 'RJ', cidade: 'Rio de Janeiro', linha: 'Estrada dos Bandeirantes, 7431 — Jacarepaguá', cep: '22780-085', dot: 'var(--c-magenta)', coord: '22°58′S · 43°25′W', papel: 'dc' },
  { uf: 'RJ', cidade: 'Rio de Janeiro', linha: 'Av. Presidente Vargas, 3131 — Cidade Nova', cep: '20210-030', dot: 'var(--c-amber)', coord: '22°54′S · 43°12′W', papel: 'escritorio' }
];

/* Ordem e identidade dos produtos (nome comercial é marca registrada: não traduz) */
export const prodMeta = [
  { slug: 'omid-smart-cloud',         nome: 'Omid Smart Cloud®',         curto: 'Smart Cloud',         cor: 'var(--c-cyan)' },
  { slug: 'omid-smart-colocation',    nome: 'Omid Smart Colocation®',    curto: 'Smart Colocation',    cor: 'var(--c-teal)' },
  { slug: 'omid-smart-it-services',   nome: 'Omid Smart IT Services®',   curto: 'Smart IT Services',   cor: 'var(--c-blue)' },
  { slug: 'omid-smart-cybersecurity', nome: 'Omid Smart CyberSecurity®', curto: 'Smart CyberSecurity', cor: 'var(--c-magenta)' },
  { slug: 'omid-cloud-cognitiva',     nome: 'Omid Cloud Cognitiva®',     curto: 'Cloud Cognitiva',     cor: 'var(--c-purple)' }
];

export const certDots = ['var(--c-teal)', 'var(--c-cyan)', 'var(--c-blue)', 'var(--c-purple)', 'var(--c-magenta)', 'var(--c-red)', 'var(--c-orange)', 'var(--c-green)', 'var(--c-amber)', 'var(--c-teal)'];

export const numeroValores = [
  { n: '500', suf: '+', dot: 'var(--c-teal)' },
  { n: '100', suf: '%', dot: 'var(--c-cyan)' },
  { n: '40',  suf: '%', dot: 'var(--c-magenta)' },
  { n: '2',   suf: '',  dot: 'var(--c-amber)' }
];

export const tiers = [
  ['Certified Partner', 'R$ 1.000.000'],
  ['Silver',   'R$ 1.000.001 — R$ 5.000.000'],
  ['Gold',     'R$ 5.000.001 — R$ 10.000.000'],
  ['Platinum', 'R$ 10.000.001 — R$ 20.000.000'],
  ['Diamond',  'R$ 20.000.001 +']
];

export const modalidadeDots = ['var(--c-teal)', 'var(--c-cyan)', 'var(--c-blue)', 'var(--c-magenta)', 'var(--c-orange)'];

/* Unidades da régua interativa da home — os mesmos valores da tabela pública
   (CPU Eco por vCPU, memória padrão por GiB, SSD por GB). */
export const precoUnit = {
  vcpu: 32.42,      // CPU Eco, por vCPU/mês
  vcpuUmax: 356.56, // CPU UMax, por vCPU/mês (tipo selecionável na calculadora)
  ram: 11.60,       // memória padrão, por GiB/mês
  ssd: 0.72,        // SSD, por GB/mês
  backup: 0.09,     // BKaaS, por GB/mês
  egress: 0.016,    // tráfego de saída, por GB
  winPar: 98.26     // Windows Server, por par de vCPU/mês
};

/* Tabela de preços: os valores em R$ são iguais em qualquer idioma. */
export const precoValores = [
  { linhas: [['Windows Server', 'R$ 98,26'], ['SQL Server', 'R$ 223,97 — R$ 1.492,48'], ['Linux enterprise', 'R$ 308,00 — R$ 951,08']] },
  { linhas: [['CPU Eco', 'R$ 32,42'], ['CPU UMax', 'R$ 356,56'], ['RAM', 'R$ 11,60'], ['RAM Kubernetes', 'R$ 29,00']] },
  { linhas: [['NL-SAS', 'R$ 0,12'], ['SSD', 'R$ 0,72'], ['BKaaS', 'R$ 0,09']] },
  { linhas: [['VPC', 'R$ 49,90 — R$ 999,90'], ['Egress', 'R$ 0,016'], ['Ingress', 'R$ 0,10'], ['IP', 'R$ 25,00']] },
  { linhas: [['DBaaS A', 'R$ 4.084,05'], ['DBaaS C', 'R$ 12.184,22'], ['Monitoring', 'R$ 89,90'], ['Microsoft AD', 'R$ 1.090,00'], ['SOC agent', 'R$ 400,00 — R$ 500,00']] }
];
