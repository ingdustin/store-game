#!/usr/bin/env node
// Convierte los textos legales de una app (.txt en Markdown ligero) a los
// fragmentos HTML que build.js inyecta en lugar de las plantillas genéricas.
//
//   node tools/import-legal.js <slug> <directorio-con-los-txt>
//
// Espera encontrar privacy_en.txt, privacy_es.txt, terms_en.txt y terms_es.txt.
// Escribe en data/legal/<slug>/:
//   privacidad.html / terminos.html          -> el idioma que publica el juego
//   privacidad.es.html / terminos.es.html    -> el otro idioma, guardado sin publicar
//
// El idioma que se publica se decide por el campo `lang` del juego en
// data/games.js: 'en' publica los _en, cualquier otro valor publica los _es.

const fs = require('fs');
const path = require('path');

const [, , slug, srcDir] = process.argv;
if (!slug || !srcDir) {
  console.error('Uso: node tools/import-legal.js <slug> <directorio-con-los-txt>');
  process.exit(1);
}

const { GAMES } = require('../data/games.js');
const game = GAMES.find(g => g.slug === slug);
if (!game) {
  console.error(`No existe ningún juego con slug "${slug}" en data/games.js`);
  process.exit(1);
}

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const inline = s => esc(s)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\b([\w.+-]+@[\w-]+\.[\w.]+)\b/g, '<a href="mailto:$1">$1</a>')
  .replace(/\b(reportaproblem\.apple\.com)\b/g, '<a href="https://$1" rel="noopener">$1</a>')
  .replace(/\b(ec\.europa\.eu\/consumers\/odr)\b/g, '<a href="https://$1" rel="noopener">$1</a>');

// Markdown ligero -> <article>. Soporta #, >, ##, listas con - y **negrita**.
function toHtml(txt) {
  const out = ['<article>'];
  let inList = false;
  const closeList = () => { if (inList) { out.push('  </ul>'); inList = false; } };

  for (const raw of txt.split('\n')) {
    const line = raw.trim();
    if (!line) continue;

    if (line.startsWith('# ')) {
      closeList();
      out.push(`  <h1>${inline(line.slice(2))}</h1>`);
    } else if (line.startsWith('> ')) {
      closeList();
      out.push(`  <p><em>${inline(line.slice(2))}</em></p>`);
    } else if (line.startsWith('## ')) {
      closeList();
      const m = line.slice(3).match(/^(\d+)\.\s*(.+)$/);
      out.push(m
        ? `  <h2><span class="num">${m[1].padStart(2, '0')}</span>${inline(m[2])}</h2>`
        : `  <h2>${inline(line.slice(3))}</h2>`);
    } else if (line.startsWith('- ')) {
      if (!inList) { out.push('  <ul>'); inList = true; }
      out.push(`    <li>${inline(line.slice(2))}</li>`);
    } else {
      closeList();
      out.push(`  <p>${inline(line)}</p>`);
    }
  }
  closeList();
  out.push('</article>');
  return out.join('\n') + '\n';
}

const publica = game.lang === 'en' ? 'en' : 'es';
const otro = publica === 'en' ? 'es' : 'en';
const dstDir = path.join(__dirname, '..', 'data', 'legal', slug);
fs.mkdirSync(dstDir, { recursive: true });

const jobs = [
  [`privacy_${publica}.txt`, 'privacidad.html', true],
  [`terms_${publica}.txt`, 'terminos.html', true],
  [`privacy_${otro}.txt`, `privacidad.${otro}.html`, false],
  [`terms_${otro}.txt`, `terminos.${otro}.html`, false]
];

for (const [from, to, publicado] of jobs) {
  const src = path.join(srcDir, from);
  if (!fs.existsSync(src)) {
    console.warn(`· falta ${from}, se omite`);
    continue;
  }
  const html = toHtml(fs.readFileSync(src, 'utf8'));
  fs.writeFileSync(path.join(dstDir, to), html, 'utf8');
  console.log(`${publicado ? '✓' : '·'} ${to.padEnd(20)} ${String(html.length).padStart(5)} bytes${publicado ? '' : '  (guardado, sin publicar)'}`);
}

console.log(`\nIdioma publicado: ${publica.toUpperCase()} (game.lang = ${game.lang || 'es'})`);
console.log('Ejecuta ahora: node build.js');
