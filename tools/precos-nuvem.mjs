#!/usr/bin/env node
/* Atualiza assets/dados/precos-nuvem.json com os preços PÚBLICOS on-demand
   de AWS, Azure, Google Cloud e Oracle para a região de São Paulo, mais o
   câmbio PTAX. Fontes oficiais, sem chave, sem dependência.

   Uso:  node --max-old-space-size=6144 tools/precos-nuvem.mjs
   (o arquivo de preços da AWS para sa-east-1 tem ~290 MB — daí o heap)

   Regra de ouro: um provedor que falhar NÃO derruba os outros. O valor
   anterior fica, e a falha vai para "avisos" dentro do JSON. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const ARQ = path.join(RAIZ, 'assets', 'dados', 'precos-nuvem.json');
const atual = JSON.parse(fs.readFileSync(ARQ, 'utf8'));
const novo = structuredClone(atual);
const avisos = [];
const UA = { 'user-agent': 'Mozilla/5.0 (compatible; OMID-precos/1.0)' };

const json = async (u, o) => { const r = await fetch(u, { headers: UA, ...o }); if (!r.ok) throw new Error(`${r.status} ${u}`); return r.json(); };
const texto = async (u) => { const r = await fetch(u, { headers: UA }); if (!r.ok) throw new Error(`${r.status} ${u}`); return r.text(); };
const r6 = (n) => Math.round(n * 1e6) / 1e6;
async function tenta(nome, fn) {
  try { await fn(); console.log('✓', nome); }
  catch (e) { avisos.push(`${nome}: ${e.message}`); console.warn('✗', nome, e.message); }
}

/* ---------- câmbio: PTAX venda, última cotação disponível ---------- */
await tenta('câmbio (BCB PTAX)', async () => {
  const f = (d) => `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}-${d.getFullYear()}`;
  const fim = new Date(), ini = new Date(Date.now() - 10 * 864e5);
  const u = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='${f(ini)}'&@dataFinalCotacao='${f(fim)}'&$top=1&$orderby=dataHoraCotacao%20desc&$format=json`;
  const v = (await json(u)).value[0];
  if (!v || !(v.cotacaoVenda > 0)) throw new Error('sem cotação');
  novo.cambio = { ...novo.cambio, usdBrl: v.cotacaoVenda, data: v.dataHoraCotacao.slice(0, 10), fonte: u };
});

/* ---------- Azure: Retail Prices API (pública) ---------- */
await tenta('Azure (Retail Prices API)', async () => {
  const q = async (filtro) => (await json('https://prices.azure.com/api/retail/prices?$filter=' + encodeURIComponent(filtro))).Items || [];
  const az = novo.provedores.azure;
  // uma consulta para todas as famílias do de/para (cada degrau tem seu SKU)
  const skus = [...new Set(Object.values(az.familias).map((f) => f.sku))];
  const vm = await q(`armRegionName eq 'brazilsouth' and priceType eq 'Consumption' and (${skus.map((s) => `armSkuName eq '${s}'`).join(' or ')})`);
  // só "Virtual Machines …" (fora HDInsight, Cloud Services, bancos), sem Spot/Low Priority
  const preco = (sku, win) => { const i = vm.find((x) => x.armSkuName === sku && /^Virtual Machines /.test(x.productName) && /Windows/.test(x.productName) === win && !/Low Priority|Spot/.test(x.skuName)); return i ? i.unitPrice : null; };
  for (const f of Object.values(az.familias)) {
    const lin = preco(f.sku, false), win = preco(f.sku, true);
    if (!(lin > 0) || !(win > 0)) throw new Error(`${f.sku} não encontrado`);
    f.usdHora = { linux: lin, windows: win };
  }
  az.usdHora = { ...az.familias.pro.usdHora };
  const ssd = (await q("armRegionName eq 'brazilsouth' and serviceName eq 'Storage' and contains(productName,'Premium SSD v2')"))
    .find((i) => i.meterName === 'Premium LRS Provisioned Capacity');
  if (ssd) az.disco.usdGbMes = r6(ssd.unitPrice * novo.horasMes);
  const bk = await q("armRegionName eq 'brazilsouth' and serviceName eq 'Backup' and priceType eq 'Consumption'");
  const bkGb = bk.find((i) => i.productName === 'Backup' && i.meterName === 'Standard LRS Data Stored');
  const bkVm = bk.find((i) => i.meterName === 'Azure VM Protected Instance');
  if (bkGb) az.backup.usdGbMes = bkGb.unitPrice;
  if (bkVm) az.backup.usdFixoMes = bkVm.unitPrice;
  const band = (await q("armRegionName eq 'brazilsouth' and serviceName eq 'Bandwidth'"))
    .filter((i) => i.productName === 'Bandwidth - Routing Preference: Internet' && i.meterName === 'Standard Data Transfer Out')
    .sort((a, b) => a.tierMinimumUnits - b.tierMinimumUnits);
  if (band.length >= 2) {
    // a API devolve a mesma faixa em mais de um medidor: fica um por mínimo,
    // com o menor preço (o cenário mais favorável ao concorrente)
    const porMin = new Map();
    band.filter((i) => i.unitPrice > 0).forEach((i) => { const m = i.tierMinimumUnits; if (!porMin.has(m) || i.unitPrice < porMin.get(m)) porMin.set(m, i.unitPrice); });
    const pagas = [...porMin.entries()].sort((a, b) => a[0] - b[0]);
    az.egress.gratisGb = pagas[0][0];
    az.egress.faixas = pagas.map((e, k) => [pagas[k + 1] ? pagas[k + 1][0] : null, e[1]]);
  }
});

/* ---------- OCI: catálogo público (preço global) ---------- */
await tenta('Oracle Cloud (catálogo)', async () => {
  const oc = novo.provedores.oci;
  const itens = (await json('https://apexapps.oracle.com/pls/apex/cetools/api/v1/products/?currencyCode=USD')).items;
  const por = (pn) => itens.find((i) => i.partNumber === pn);
  const precos = (pn) => (por(pn).currencyCodeLocalizations.find((c) => c.currencyCode === 'USD') || {}).prices || [];
  const p = oc.partes;
  oc.usdHora = { vcpu: r6(precos(p.ocpu)[0].value / 2), gb: precos(p.memoria)[0].value };
  oc.windowsVcpuHora = r6(precos(p.windows)[0].value / 2);
  oc.disco.usdGbMes = r6(precos(p.bloco[0])[0].value + precos(p.bloco[1])[0].value * 10);
  const obj = precos(p.objeto), sai = precos(p.saida);
  oc.backup = { ...oc.backup, gratisGb: obj[0].value === 0 ? obj[0].rangeMax : 0, usdGbMes: obj[obj.length - 1].value };
  oc.egress = { ...oc.egress, gratisGb: sai[0].value === 0 ? sai[0].rangeMax : 0, faixas: [[null, sai[sai.length - 1].value]] };
});

/* ---------- AWS: Price List sa-east-1 (arquivo grande) ---------- */
await tenta('AWS (Price List sa-east-1)', async () => {
  const aw = novo.provedores.aws;
  const REG = 'South America (Sao Paulo)';
  // PRECOS_AWS_ARQ = arquivo já baixado, para rodar de novo sem esperar os 290 MB
  const ec2 = process.env.PRECOS_AWS_ARQ ? JSON.parse(fs.readFileSync(process.env.PRECOS_AWS_ARQ, 'utf8')) : await json(aw.fontes[0]);
  const fams = Object.values(aw.familias);
  const od = ec2.terms.OnDemand;
  const dims = (sku) => { const t = od[sku]; if (!t) return []; return Object.values(Object.values(t)[0].priceDimensions).map((d) => ({ de: +d.beginRange, ate: d.endRange === 'Inf' ? null : +d.endRange, usd: +d.pricePerUnit.USD })).sort((a, b) => a.de - b.de); };
  for (const [sku, p] of Object.entries(ec2.products)) {
    const a = p.attributes || {}; if (a.location !== REG) continue;
    if (p.productFamily === 'Compute Instance' && a.preInstalledSw === 'NA' && a.capacitystatus === 'Used' && a.licenseModel === 'No License required') {
      for (const f of fams) {
        if (a.instanceType !== f.instancia || a.tenancy !== (f.tenancy || 'Shared')) continue;
        const d = dims(sku)[0]; if (!d) continue;
        if (a.operatingSystem === 'Linux') f.usdHora.linux = d.usd;
        if (a.operatingSystem === 'Windows') f.usdHora.windows = d.usd;
      }
    }
    if (p.productFamily === 'Storage' && a.volumeApiName === 'gp3') { const d = dims(sku)[0]; if (d) aw.disco.usdGbMes = d.usd; }
    if (p.productFamily === 'Storage Snapshot' && a.usagetype === 'SAE1-EBS:SnapshotUsage') { const d = dims(sku)[0]; if (d) aw.backup.usdGbMes = d.usd; }
    if (p.productFamily === 'Data Transfer' && a.fromLocation === REG && a.toLocation === 'External' && a.transferType === 'AWS Outbound') {
      const ds = dims(sku); const pagas = ds.filter((d) => d.usd > 0);
      if (pagas.length) { aw.egress.gratisGb = pagas[0].de; aw.egress.faixas = pagas.map((d) => [d.ate, d.usd]); }
    }
  }
  for (const [k, f] of Object.entries(aw.familias)) if (!(f.usdHora.linux > 0) || !(f.usdHora.windows > 0)) throw new Error(`${k}: ${f.instancia} sem preço`);
  aw.usdHora = { ...aw.familias.pro.usdHora };
});

/* ---------- Google Cloud: as páginas públicas embutem todas as regiões ---------- */
await tenta('Google Cloud (páginas de preço)', async () => {
  const g = novo.provedores.gcp;
  const limpa = (t) => t.replace(/\\u003c/g, '<').replace(/\\u003e/g, '>').replace(/<[^>]+>/g, ' ').replace(/[\[\]"]|null|,1,|1,1,/g, ' ').replace(/\s+/g, ' ');
  const SP = /Sao Paulo \(southamerica-east1\)",\[(\d)\]\]/g;

  const gp = await texto(g.fontes[0]);
  let m, achou = null;
  while ((m = SP.exec(gp))) {
    const antes = gp.slice(Math.max(0, m.index - 400000), m.index);
    const ids = [...antes.matchAll(/"([a-z0-9]+(?:-[a-z0-9]+)*-(?:vcpus-and-memory|machine-types))"\],\[\[/g)];
    const id = ids.length ? ids[ids.length - 1][1] : '';
    if (!/^n2-(?!d)/.test(id)) continue;
    const t = limpa(gp.slice(m.index, m.index + 1400));
    const v = (t.match(/Custom vCPUs?e?[\s,]*\$([0-9.]+) \/ 1 hour/) || [])[1];
    const mem = (t.match(/Custom Memory[\s,]*\$([0-9.]+) \/ 1 gibibyte hour/) || [])[1];
    if (v && mem) { achou = { v: +v, mem: +mem }; break; }
  }
  if (!achou) throw new Error('tabela N2 de São Paulo não encontrada');
  // personalizado = predefinido × 1,05 (documentado pelo Google); guardamos o predefinido
  g.usdHora = { vcpu: r6(achou.v / 1.05), gb: r6(achou.mem / 1.05) };
  const oito = 8 * g.usdHora.vcpu + 32 * g.usdHora.gb;
  if (oito < 0.3 || oito > 1.2) throw new Error(`N2 8v/32g fora de faixa: ${oito}`);
  g.familias.pro.usdHora = { ...g.usdHora };

  // famílias por instância (E2 e C2): a linha "<tipo> , 8 , 32 GiB , $x / 1 hour"
  // dentro de um bloco horário ([2]) de São Paulo; a primeira coluna é a on-demand
  const hora = (html, tipo, gib) => {
    const re = new RegExp(tipo + '[\\s,]*8[\\s,]*' + gib + ' GiB[\\s,]*\\$([0-9.]+) \\/ 1 hour'), SP2 = /Sao Paulo \(southamerica-east1\)",\[2\]\]/g;
    let mm, v = null;
    while ((mm = SP2.exec(html))) { const x = limpa(html.slice(mm.index, mm.index + 2600)).match(re); if (x) { v = +x[1]; break; } }
    if (!(v > 0.1 && v < 2)) throw new Error(`${tipo} de São Paulo não encontrado`);
    return v;
  };
  g.familias.eco.usdHora = { linux: hora(gp, 'e2-standard-8', 32) };
  g.familias.umax.usdHora = { linux: hora(gp, 'c3-highmem-8', 64) };
  g.familias.xpro.usdHora = { linux: hora(await texto(g.fontes[3]), 'c2-standard-8', 32) };

  const dk = await texto(g.fontes[1]);
  // só os blocos mensais ([3]); janela curta, senão ela invade a tabela vizinha
  const SP3 = /Sao Paulo \(southamerica-east1\)",\[3\]\]/g;
  while ((m = SP3.exec(dk))) {
    const t = limpa(dk.slice(m.index, m.index + 1800));
    const b = t.match(/Balanced provisioned space[\s,]*\$([0-9.]+) \/ 1 gibibyte month/); if (b) g.disco.usdGbMes = +b[1];
    const s = t.match(/Standard snapshot storage[\s,]*\$([0-9.]+) \/ 1 gibibyte month/);
    if (s) {
      // é a tabela REGIONAL de snapshots? (o título mais próximo antes do bloco)
      const antes = limpa(dk.slice(Math.max(0, m.index - 60000), m.index));
      const tit = [...antes.matchAll(/((?:Multi-r|R)egional standard snapshots pricing|Standard snapshot pricing)/g)].pop();
      if (tit && /^Regional/.test(tit[1])) g.backup.usdGbMes = +s[1];
    }
  }
  const w = limpa(dk).match(/All other machine types: \$([0-9.]+) USD\/hour per visible vCPU/); if (w) g.windowsVcpuHora = +w[1];

  const nt = limpa(await texto(g.fontes[2]));
  const i = nt.indexOf('South America, Saudi Arabia (per GiB in USD)');
  if (i > 0) {
    const fimTab = nt.indexOf('(per GiB in USD)', i + 40);            // cabeçalho da tabela seguinte
    const trecho = nt.slice(i, fimTab > 0 ? fimTab : i + 900);
    const fx = [...trecho.matchAll(/([\d,]+) gibibyte (?:to ([\d,]+) gibibyte|and above)[^$]*\$([0-9.]+)/g)]
      .map((x) => [x[2] ? +x[2].replace(/,/g, '') : null, +x[3]]);
    if (fx.length) g.egress.faixas = fx;
  }
});

novo.consultadoEm = new Date().toISOString().slice(0, 10);
novo.avisos = avisos;
fs.writeFileSync(ARQ, JSON.stringify(novo, null, 2) + '\n');
console.log(`\n${ARQ} — ${avisos.length ? avisos.length + ' aviso(s)' : 'tudo atualizado'} (${novo.consultadoEm})`);
