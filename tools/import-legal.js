#!/usr/bin/env node
// Convierte los textos legales de una app (.txt en Markdown ligero) a los
// fragmentos HTML que build.js publica.
//
//   node tools/import-legal.js <slug> <directorio-con-los-txt>
//
// Busca privacy_es.txt, privacy_en.txt, terms_es.txt y terms_en.txt, y escribe
// en data/legal/<slug>/ un fichero por documento e idioma:
//
//   privacy.es.html   privacy.en.html   terms.es.html   terms.en.html
//
// build.js publica las dos versiones dentro de una misma página, con anclas
// #es y #en, porque la app enlaza a una URL fija por documento y no puede
// elegir idioma. Los textos se publican literalmente, sin reescribir.

const fs = require('fs');
const path = require('path');

const [, , slug, srcDir] = process.argv;
if (!slug || !srcDir) {
  console.error('Uso: node tools/import-legal.js <slug> <directorio-con-los-txt>');
  process.exit(1);
}

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const inline = s => esc(s)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\b([\w.+-]+@[\w-]+\.[\w.]+)\b/g, '<a href="mailto:$1">$1</a>')
  .replace(/\b(reportaproblem\.apple\.com)\b/g, '<a href="https://$1" rel="noopener">$1</a>')
  .replace(/\b(ec\.europa\.eu\/consumers\/odr)\b/g, '<a href="https://$1" rel="noopener">$1</a>');

// Markdown ligero -> HTML. Soporta #, >, ##, listas con - y **negrita**.
function toHtml(txt) {
  const out = [];
  let inList = false;
  const closeList = () => { if (inList) { out.push('  </ul>'); inList = false; } };

  for (const raw of txt.split('\n')) {
    const line = raw.trim();
    if (!line) continue;

    if (line.startsWith('# ')) {
      closeList();
      out.push(`  <h2 class="doc-title">${inline(line.slice(2))}</h2>`);
    } else if (line.startsWith('> ')) {
      closeList();
      out.push(`  <p class="doc-date">${inline(line.slice(2))}</p>`);
    } else if (line.startsWith('## ')) {
      closeList();
      const m = line.slice(3).match(/^(\d+)\.\s*(.+)$/);
      out.push(m
        ? `  <h3><span class="num">${m[1].padStart(2, '0')}</span>${inline(m[2])}</h3>`
        : `  <h3>${inline(line.slice(3))}</h3>`);
    } else if (line.startsWith('- ')) {
      if (!inList) { out.push('  <ul>'); inList = true; }
      out.push(`    <li>${inline(line.slice(2))}</li>`);
    } else {
      closeList();
      out.push(`  <p>${inline(line)}</p>`);
    }
  }
  closeList();
  return out.join('\n') + '\n';
}

const dstDir = path.join(__dirname, '..', 'data', 'legal', slug);
fs.mkdirSync(dstDir, { recursive: true });

const jobs = [
  ['privacy_es.txt', 'privacy.es.html'],
  ['privacy_en.txt', 'privacy.en.html'],
  ['terms_es.txt', 'terms.es.html'],
  ['terms_en.txt', 'terms.en.html']
];

let written = 0;
for (const [from, to] of jobs) {
  const src = path.join(srcDir, from);
  if (!fs.existsSync(src)) {
    console.warn(`· falta ${from}, se omite`);
    continue;
  }
  const html = toHtml(fs.readFileSync(src, 'utf8'));
  fs.writeFileSync(path.join(dstDir, to), html, 'utf8');
  console.log(`✓ ${to.padEnd(18)} ${String(html.length).padStart(5)} bytes`);
  written++;
}

console.log(`\n${written} documentos escritos en data/legal/${slug}/`);
console.log('Ejecuta ahora: node build.js');
