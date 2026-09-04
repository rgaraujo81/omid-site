/* Servidor estático mínimo para desenvolvimento, com rebuild automático.
   Sem dependências.
   Uso: node serve.mjs [porta]   →   http://localhost:4321

   Vigia src/ e refaz as 54 páginas a cada alteração, com 150ms de espera
   para não disparar duas vezes quando o editor salva. assets/ não precisa
   de build: o CSS e o JS são servidos direto do disco. */

import { createServer } from 'node:http';
import { readFile, stat, watch } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const ROOT = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.argv[2]) || 4321;

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.json': 'application/json'
};

createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = join(ROOT, normalize(p).replace(/^(\.\.[/\\])+/, ''));
    try {
      if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    } catch {
      if (!extname(file)) file = join(file, 'index.html');
    }
    const body = await readFile(file);
    res.writeHead(200, {
      'content-type': TYPES[extname(file)] || 'application/octet-stream',
      'cache-control': 'no-store'
    });
    res.end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    res.end('<h1>404</h1><p><a href="/">Voltar para o início</a></p>');
  }
}).listen(PORT, () => {
  console.log(`OMID em http://localhost:${PORT}`);
  console.log('vigiando src/ — salve e recarregue a página');
});

/* ---------- rebuild ao salvar ---------- */
let pendente = null, rodando = false, naFila = false;

function refaz() {
  // salvar durante um build não pode ser perdido: marca e refaz ao terminar
  if (rodando) { naFila = true; return; }
  rodando = true;
  // processo filho, e não import(): o cache de módulos do Node guardaria
  // src/i18n/*.mjs da primeira execução, e a alteração não apareceria.
  // Cache-bust por query só invalida o build.mjs, não o que ele importa.
  const filho = spawn(process.execPath, [join(ROOT, 'build.mjs')], { cwd: ROOT });
  let erro = '';
  filho.stderr.on('data', (d) => { erro += d; });
  filho.on('close', (code) => {
    rodando = false;
    if (code === 0) console.log(`↻ ${new Date().toLocaleTimeString('pt-BR')} — páginas refeitas`);
    else console.error('✗ build falhou:\n' + erro.trim());
    if (naFila) { naFila = false; refaz(); }
  });
}

try {
  const olho = watch(join(ROOT, 'src'), { recursive: true });
  for await (const _ of olho) {
    clearTimeout(pendente);
    pendente = setTimeout(refaz, 150);
  }
} catch (e) {
  console.warn('sem vigia de src/ (' + e.message + ') — rode `node build.mjs` à mão');
}
