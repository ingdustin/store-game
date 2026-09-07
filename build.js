#!/usr/bin/env node
// Genera el sitio estático de myorange.agency.
//
//   index.html                        home de la agencia
//   404.html                          página de error (ErrorDocument del .htaccess)
//   juegos/index.html                 portafolio, y evita cualquier autoindex
//   juegos/<slug>/index.html          página de proyecto
//   juegos/<slug>/privacidad.html     política de privacidad (ES + EN)
//   juegos/<slug>/terminos.html       términos y EULA (ES + EN)
//   juegos/<slug>/contacto.html       soporte y contacto (ES + EN)
//
// Las rutas de las apps ya publicadas están declaradas en App Store Connect
// y dentro de los binarios: no se mueven. La ruta de Blockmix se movió a
// /juegos/blockmix/ y el .htaccess mantiene un 301 desde la antigua.
//
// Uso: node build.js

const fs = require('fs');
const path = require('path');
const { SITE, SERVICES, HOW_WE_WORK, PROJECTS } = require('./data/site.js');

const ROOT = __dirname;

// ---------------------------------------------------------------- URLs congeladas
//
// Estas rutas están declaradas en App Store Connect y dentro de binarios ya
// publicados. No se pueden mover, renombrar ni dejar de generar: una URL legal
// caída es rechazo inmediato por Guideline 5.1.1, y no hay forma de corregirlo
// sin publicar una versión nueva de la app.
//
// El build falla si alguna deja de producirse. No quitar entradas de esta lista.
const FROZEN_URLS = [
  'juegos/deducta-sudoku/index.html',
  'juegos/deducta-sudoku/privacidad.html',
  'juegos/deducta-sudoku/terminos.html',
  'juegos/deducta-sudoku/contacto.html',
  'juegos/deducta-sudoku/marketing.html',
  'juegos/solitaire-klondike-spider/index.html',
  'juegos/solitaire-klondike-spider/privacidad.html',
  'juegos/solitaire-klondike-spider/terminos.html',
  'juegos/solitaire-klondike-spider/contacto.html',
  'juegos/solitaire-klondike-spider/marketing.html',
  'juegos/asly-tic-tac-toe-xo-gomoku/index.html',
  'juegos/asly-tic-tac-toe-xo-gomoku/privacidad.html',
  'juegos/asly-tic-tac-toe-xo-gomoku/terminos.html',
  'juegos/asly-tic-tac-toe-xo-gomoku/contacto.html',
  'juegos/asly-tic-tac-toe-xo-gomoku/marketing.html',
  // Blockmix: la ruta nueva. La antigua vive del 301 del .htaccess y de las
  // páginas de respaldo, porque hay un binario en revisión que la enlaza.
  'juegos/blockmix/privacidad.html',
  'juegos/blockmix/terminos.html',
  'juegos/blockmix/contacto.html'
];

const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

// ---------------------------------------------------------------- layout

function head({ title, desc, root, lang = 'es' }) {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<link rel="stylesheet" href="${root}assets/styles.css">
</head>
<body>`;
}

function header({ root, active = '', lang = 'es' }) {
  const en = lang === 'en';
  const T = en
    ? { work: 'Work', services: 'Services', contact: 'Contact' }
    : { work: 'Proyectos', services: 'Servicios', contact: 'Contacto' };
  const link = (href, label, key) =>
    `<a class="nav-link${active === key ? ' active' : ''}" href="${href}">${label}</a>`;
  return `
<header>
  <div class="wrap topbar">
    <a class="brand" href="${root}index.html">
      <b>${esc(SITE.name)}</b>
      <span>${esc(SITE.domain)}</span>
    </a>
    <nav>
      ${link(root + 'juegos/index.html', T.work, 'work')}
      ${link(root + 'index.html#servicios', T.services, 'services')}
      ${link(root + 'index.html#contacto', T.contact, 'contact')}
    </nav>
  </div>
</header>`;
}

function footer({ root, project = null, lang = 'es' }) {
  const en = lang === 'en';

  // Pie de un documento legal: acredita a quien responde por el documento.
  if (project) {
    return `
<footer>
  <div class="wrap">
    <div class="footer-links" style="margin-bottom:26px">
      <a href="index.html">${en ? 'Project' : 'Proyecto'}</a>
      <a href="privacidad.html">${en ? 'Privacy' : 'Privacidad'}</a>
      <a href="terminos.html">${en ? 'Terms and EULA' : 'Términos y EULA'}</a>
      <a href="contacto.html">${en ? 'Support' : 'Soporte'}</a>
    </div>
    <p class="fine">© 2026 ${esc(SITE.owner)}. ${esc(project.name)} ${en
      ? `is developed and published by ${esc(SITE.owner)} (${esc(SITE.name)}). This is the official page for the document above. Contact: <a href="mailto:${SITE.email}">${SITE.email}</a>`
      : `está desarrollada y publicada por ${esc(SITE.owner)} (${esc(SITE.name)}). Esta es la página oficial del documento anterior. Contacto: <a href="mailto:${SITE.email}">${SITE.email}</a>`}</p>
    <p class="fine">${en
      ? 'Apple, iPhone, iPad and App Store are trademarks of Apple Inc. This app is not affiliated with, sponsored or endorsed by Apple Inc. Prices are set by the App Store in each country\u2019s own currency.'
      : 'Apple, iPhone, iPad y App Store son marcas comerciales de Apple Inc. Esta aplicación no está afiliada a Apple Inc., ni patrocinada ni respaldada por Apple Inc. Los precios los fija App Store en la moneda de cada país.'}</p>
  </div>
</footer>
</body>
</html>`;
  }

  return `
<footer>
  <div class="wrap">
    <div class="footer-top">
      <p><b>${esc(SITE.name)}</b><br>${esc(SITE.tagline)}</p>
      <div class="footer-links">
        <a href="${root}juegos/index.html">Proyectos</a>
        <a href="${root}index.html#servicios">Servicios</a>
        <a href="mailto:${SITE.email}">${SITE.email}</a>
      </div>
    </div>
    <p class="fine">© 2026 ${esc(SITE.copyright)}. Responsable: ${esc(SITE.owner)}.</p>
    <p class="fine">Apple, iPhone, iPad y App Store son marcas comerciales de Apple Inc. Este sitio no está afiliado a Apple Inc., ni patrocinado ni respaldado por Apple Inc.</p>
  </div>
</footer>
</body>
</html>`;
}

// ---------------------------------------------------------------- home

// Ficha de proyecto en lista. Muestra datos comprobables, no adjetivos.
function workItem(p, root) {
  const href = `${root}${p.slug}/index.html`;
  const icono = p.icon
    ? `<img class="work-icon" src="${root}../${p.icon}" alt="Icono de ${esc(p.name)}" width="64" height="64" loading="lazy">`
    : '<span class="work-icon-blank" aria-hidden="true"></span>';
  const meta = p.status === 'published'
    ? `<span class="pill pill-live">En la App Store</span><br>
        Versión <b>${esc(p.version)}</b><br>
        Actualizada en ${esc(p.lastUpdate)}<br>
        ${esc(p.platforms.join(', '))}`
    : `<span class="pill">En desarrollo</span><br>
        ${esc(p.tech.slice(0, 2).join(', '))}<br>
        ${esc(p.platforms.join(', '))}`;

  return `
      <a class="work-item" href="${href}">
        ${icono}
        <div>
          <div class="work-name">${esc(p.name)}</div>
          <p class="work-desc">${esc(p.tagline)}</p>
        </div>
        <div class="work-meta">${meta}</div>
      </a>`;
}

function pageHome() {
  const publicados = PROJECTS.filter(p => p.status === 'published');

  return `${head({
    title: `${SITE.name}, ${SITE.tagline}`,
    desc: `Estudio de desarrollo dirigido por ${SITE.owner}. Apps para iPhone construidas, publicadas y mantenidas en la App Store, con su documentación legal al día.`,
    root: ''
  })}
${header({ root: '', active: '' })}

<main>
  <section class="hero">
    <div class="wrap">
      <div class="hero-grid">
        <div>
          <h1>Construimos y publicamos apps para iPhone.</h1>
          <p>Estudio dirigido por ${esc(SITE.owner)}. Tres apps propias en la App Store, mantenidas y actualizadas.</p>
        </div>
        <div class="hero-aside">
          <b>Nos ocupamos de la parte que atasca los envíos</b>
          Privacidad, EULA, compras integradas, suscripciones de renovación automática y consentimiento en la Unión Europea.
        </div>
      </div>
      <div class="hero-cta">
        <a class="btn" href="#contacto">Escríbenos</a>
        <a class="btn btn-ghost" href="juegos/index.html">Ver los proyectos</a>
      </div>

      <div class="proof">
        <p class="proof-label">Publicadas por el estudio</p>
        <div class="proof-row">
          ${publicados.map(p => `<a class="proof-app" href="${esc(p.appStore)}" rel="noopener">
            <img src="${p.icon}" alt="Icono de ${esc(p.name)}" width="46" height="46" loading="lazy">
            <span>
              <b>${esc(p.storeName)}</b>
              <span>Versión ${esc(p.version)} · ${esc(p.lastUpdate)}</span>
            </span>
          </a>`).join('\n          ')}
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="servicios">
    <div class="wrap">
      <h2>Qué hacemos</h2>
      <p class="section-lede">Trabajamos de principio a fin sobre el mismo producto: el código, la tienda y lo que Apple pide por el camino.</p>
      <div class="services">
        ${SERVICES.map(x => `<div class="service">
          <h3>${esc(x.title)}</h3>
          <p>${esc(x.text)}</p>
        </div>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <h2>Cómo trabajamos</h2>
      <div class="method">
        ${HOW_WE_WORK.map(([t, d]) => `<div>
          <h3>${esc(t)}</h3>
          <p>${esc(d)}</p>
        </div>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section" id="proyectos">
    <div class="wrap">
      <h2>Proyectos</h2>
      <p class="section-lede">Producto propio. Cada uno publica su política de privacidad y sus términos, en español e inglés, tal como exige la App Store.</p>
      <div class="work">
        ${PROJECTS.map(p => workItem(p, 'juegos/')).join('\n')}
      </div>
    </div>
  </section>

  <section class="section" id="contacto">
    <div class="wrap contact">
      <div>
        <h2>Contacto</h2>
        <p>Cuéntanos qué quieres construir o en qué se ha atascado un envío. Respondemos en dos días laborables.</p>
        <a class="btn" href="mailto:${SITE.email}">${SITE.email}</a>
      </div>
      <dl class="facts">
        <div><dt>Responsable</dt><dd>${esc(SITE.owner)}</dd></div>
        <div><dt>Correo</dt><dd>${SITE.email}</dd></div>
        <div><dt>Sitio</dt><dd>${esc(SITE.domain)}</dd></div>
      </dl>
    </div>
  </section>
</main>
${footer({ root: '' })}`;
}

// ---------------------------------------------------------------- portafolio

function pagePortfolio() {
  return `${head({
    title: `Proyectos · ${SITE.name}`,
    desc: `Apps construidas y publicadas por ${SITE.name}, con su documentación legal publicada.`,
    root: '../'
  })}
${header({ root: '../', active: 'work' })}

<main>
  <section class="page-head">
    <div class="wrap">
      <h1>Proyectos</h1>
      <p class="lede">Producto propio del estudio. Tres apps publicadas en la App Store y dos en desarrollo.</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="work">
        ${PROJECTS.map(p => workItem(p, '')).join('\n')}
      </div>
    </div>
  </section>
</main>
${footer({ root: '../' })}`;
}

// ---------------------------------------------------------------- proyecto

function pageProject(p) {
  // Sin enlace a la tienda mientras la app no esté publicada.
  const store = p.status === 'published' && p.appStore
    ? `<a class="btn" href="${esc(p.appStore)}" rel="noopener">Ver en la App Store</a>`
    : '';

  const publicada = p.status === 'published';

  return `${head({
    title: `${p.name} · ${SITE.name}`,
    desc: p.tagline,
    root: '../../'
  })}
${header({ root: '../../', active: 'work' })}

<main>
  <section class="page-head">
    <div class="wrap">
      <p class="crumb"><a href="../index.html">Proyectos</a></p>
      <h1>${esc(p.name)}</h1>
      <p class="lede">${esc(p.tagline)}</p>
      <div class="hero-cta">
        ${store}
        <a class="btn btn-ghost" href="contacto.html">Soporte</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap project-grid">
      <div>
        <h2>Sobre el proyecto</h2>
        <p>${esc(p.description)}</p>
        <ul class="bullets">
          ${p.highlights.map(h => `<li>${esc(h)}</li>`).join('\n          ')}
        </ul>
      </div>
      <dl class="facts">
        <div><dt>Estado</dt><dd>${publicada ? 'Publicada' : 'En desarrollo'}</dd></div>
        ${publicada ? `<div><dt>Versión</dt><dd>${esc(p.version)}</dd></div>
        <div><dt>Actualizada</dt><dd>${esc(p.lastUpdate)}</dd></div>` : ''}
        <div><dt>Plataformas</dt><dd>${esc(p.platforms.join(', '))}</dd></div>
        <div><dt>Tecnología</dt><dd>${esc(p.tech.join(', '))}</dd></div>
        <div><dt>Rol</dt><dd>${esc(p.role)}</dd></div>
        ${p.appId ? `<div><dt>App Store ID</dt><dd>${esc(p.appId)}</dd></div>` : ''}
      </dl>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <h2>Documentación legal</h2>
      <p class="section-lede">Páginas públicas de esta app, en español e inglés dentro del mismo documento.</p>
      <div class="footer-links">
        <a href="privacidad.html">Política de privacidad</a>
        <a href="terminos.html">Términos de uso y EULA</a>
        <a href="contacto.html">Soporte y contacto</a>
      </div>
    </div>
  </section>
</main>
${footer({ root: '../../' })}`;
}

// ---------------------------------------------------------------- legales

// Documento legal de un proyecto en un idioma.
// Si el proyecto tiene su texto verificado en data/legal/<slug>/, se publica
// literalmente. Si no, se usa la plantilla de data/legal/_plantilla/, porque
// estas URLs están declaradas en App Store Connect y no pueden faltar: una
// política de privacidad inaccesible es rechazo directo por Guideline 5.1.1.
const usandoPlantilla = [];

function legalDoc(p, doc, lang) {
  const propio = path.join(ROOT, 'data', 'legal', p.slug, `${doc}.${lang}.html`);
  if (fs.existsSync(propio)) return fs.readFileSync(propio, 'utf8').trim();

  const plantilla = path.join(ROOT, 'data', 'legal', '_plantilla', `${doc}.${lang}.html`);
  if (!fs.existsSync(plantilla)) return null;

  usandoPlantilla.push(`${p.slug} · ${doc}.${lang}`);
  return fs.readFileSync(plantilla, 'utf8').trim()
    .replace(/__APP__/g, esc(p.name))
    .replace(/__TITULAR__/g, esc(SITE.owner))
    .replace(/__CORREO__/g, SITE.email)
    .replace(/__FECHA__/g, esc(SITE.updated))
    .replace(/__FECHA_EN__/g, esc(SITE.updatedEn));
}

// Las dos versiones van en el mismo documento, una tras otra, con anclas
// #es y #en: la app enlaza a una URL fija y no puede elegir idioma (T6).
function pageLegal(p, doc, { titleEs, titleEn, file }) {
  const es = legalDoc(p, doc, 'es');
  const en = legalDoc(p, doc, 'en');
  if (!es && !en) return null;

  const bloque = (id, titulo, cuerpo, otro) => `
  <section class="lang-section" id="${id}" lang="${id}">
    <div class="lang-bar">
      <span class="lang-current">${id === 'es' ? 'Español' : 'English'}</span>
      ${otro ? `<a href="#${otro.id}">${otro.label}</a>` : ''}
    </div>
    ${cuerpo}
  </section>`;

  const indice = es && en
    ? `<nav class="lang-index" aria-label="Idiomas">
      <a href="#es">Español</a>
      <a href="#en">English</a>
    </nav>`
    : '';

  const partes = [];
  if (es) partes.push(bloque('es', titleEs, es, en ? { id: 'en', label: 'Read in English' } : null));
  if (en) partes.push(bloque('en', titleEn, en, es ? { id: 'es', label: 'Leer en español' } : null));

  return `${head({
    title: `${titleEs} · ${p.name}`,
    desc: `${titleEs} de ${p.name}. ${titleEn} for ${p.name}.`,
    root: '../../'
  })}
${header({ root: '../../', active: 'work' })}

<main class="doc">
  <div class="wrap wrap-narrow">
    <p class="eyebrow"><a href="../index.html">Proyectos</a> · <a href="index.html">${esc(p.name)}</a></p>
    ${indice}
    ${partes.join('\n')}
  </div>
</main>
${footer({ root: '../../', project: p })}`;
}

// Soporte: no viene de los adjuntos, se construye con los datos del proyecto.
function pageSupport(p) {
  return `${head({
    title: `Soporte y contacto · ${p.name}`,
    desc: `Soporte de ${p.name}. Escríbenos a ${SITE.email}. Support for ${p.name}.`,
    root: '../../'
  })}
${header({ root: '../../', active: 'work' })}

<main class="doc">
  <div class="wrap wrap-narrow">
    <p class="eyebrow"><a href="../index.html">Proyectos</a> · <a href="index.html">${esc(p.name)}</a></p>
    <nav class="lang-index" aria-label="Idiomas">
      <a href="#es">Español</a>
      <a href="#en">English</a>
    </nav>

    <section class="lang-section" id="es" lang="es">
      <div class="lang-bar"><span class="lang-current">Español</span><a href="#en">Read in English</a></div>
      <h2 class="doc-title">Soporte y contacto</h2>
      <p class="doc-date">${esc(p.name)} · ${esc(SITE.updated)}</p>
      <p>¿Necesitas ayuda, has encontrado un fallo o tienes una sugerencia? Escríbenos a <a href="mailto:${SITE.email}">${SITE.email}</a>. Respondemos en un plazo de dos días laborables. Indicarnos el modelo de tu dispositivo y tu versión de iOS nos ayuda a resolverlo antes.</p>
      <h3>Compras y suscripciones</h3>
      <p>Las compras las gestiona Apple. Para restaurar lo que compraste, usa «Restaurar compras» dentro de la aplicación, con la misma cuenta de Apple. Las suscripciones se gestionan y se cancelan desde Ajustes → tu nombre → Suscripciones. Los reembolsos se solicitan en <a href="https://reportaproblem.apple.com" rel="noopener">reportaproblem.apple.com</a>.</p>
      <h3>Privacidad y datos</h3>
      <p>Para solicitar el acceso o la supresión de tus datos, escribe a <a href="mailto:${SITE.email}">${SITE.email}</a>. El detalle de qué se guarda está en la <a href="privacidad.html">política de privacidad</a>.</p>
      <h3>Responsable</h3>
      <p>${esc(p.name)} está desarrollada y publicada por ${esc(SITE.owner)} (${esc(SITE.name)}).</p>
    </section>

    <section class="lang-section" id="en" lang="en">
      <div class="lang-bar"><span class="lang-current">English</span><a href="#es">Leer en español</a></div>
      <h2 class="doc-title">Support and contact</h2>
      <p class="doc-date">${esc(p.name)} · ${esc(SITE.updatedEn)}</p>
      <p>Need help, found a bug, or have a suggestion? Email us at <a href="mailto:${SITE.email}">${SITE.email}</a>. We reply within two business days. Telling us your device model and iOS version helps us solve it faster.</p>
      <h3>Purchases and subscriptions</h3>
      <p>Purchases are handled by Apple. To restore what you bought, use “Restore purchases” inside the app, signed in with the same Apple Account. Subscriptions are managed and cancelled from Settings → your name → Subscriptions. Refunds are requested at <a href="https://reportaproblem.apple.com" rel="noopener">reportaproblem.apple.com</a>.</p>
      <h3>Privacy and data</h3>
      <p>To request access to or deletion of your data, write to <a href="mailto:${SITE.email}">${SITE.email}</a>. What is stored is set out in the <a href="privacidad.html">privacy policy</a>.</p>
      <h3>Publisher</h3>
      <p>${esc(p.name)} is developed and published by ${esc(SITE.owner)} (${esc(SITE.name)}).</p>
    </section>
  </div>
</main>
${footer({ root: '../../', project: p })}`;
}

// ---------------------------------------------------------------- 404

function page404() {
  return `${head({
    title: `Página no encontrada · ${SITE.name}`,
    desc: 'La página solicitada no existe.',
    root: ''
  })}
${header({ root: '' })}
<main>
  <section class="page-head">
    <div class="wrap">
      <p class="eyebrow">Error 404</p>
      <h1>Esta página no existe</h1>
      <p class="lede">El enlace puede estar antiguo o la página puede haberse retirado.</p>
      <div class="hero-actions">
        <a class="btn" href="/index.html">Ir al inicio</a>
        <a class="btn btn-ghost" href="/juegos/index.html">Ver el portafolio</a>
      </div>
    </div>
  </section>
</main>
${footer({ root: '' })}`;
}

// ---------------------------------------------------------------- escritura

function write(file, content) {
  const full = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
  return file;
}

// Redirección estática, como respaldo de las reglas del .htaccess.
function redirectPage(dest, title) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta http-equiv="refresh" content="0; url=${dest}">
<link rel="canonical" href="${dest}">
<meta name="robots" content="noindex">
<title>${esc(title)}</title>
</head>
<body>
<p>Esta página se ha movido a <a href="${dest}">${dest}</a>.</p>
</body>
</html>
`;
}

const written = [];
written.push(write('index.html', pageHome()));
written.push(write('404.html', page404()));
written.push(write('juegos/index.html', pagePortfolio()));

const sinDoc = [];
for (const p of PROJECTS) {
  const dir = `juegos/${p.slug}`;
  written.push(write(`${dir}/index.html`, pageProject(p)));
  written.push(write(`${dir}/contacto.html`, pageSupport(p)));

  // marketing.html existía antes y puede estar declarada como Marketing URL
  // en App Store Connect: se conserva, apuntando a la página del proyecto.
  written.push(write(`${dir}/marketing.html`, redirectPage('index.html', p.name)));

  const priv = pageLegal(p, 'privacy', {
    titleEs: 'Política de privacidad', titleEn: 'Privacy Policy', file: 'privacidad.html'
  });
  const term = pageLegal(p, 'terms', {
    titleEs: 'Términos de uso y EULA', titleEn: 'Terms of Use and EULA', file: 'terminos.html'
  });

  if (priv) written.push(write(`${dir}/privacidad.html`, priv));
  else sinDoc.push(`${p.slug}: falta privacidad`);

  if (term) written.push(write(`${dir}/terminos.html`, term));
  else sinDoc.push(`${p.slug}: faltan términos`);
}

// Guarda: ninguna URL congelada puede dejar de existir.
const perdidas = FROZEN_URLS.filter(u => !fs.existsSync(path.join(ROOT, u)));
if (perdidas.length) {
  console.error('\n✗ FALTAN URLs QUE NO PUEDEN ROMPERSE');
  console.error('  Están declaradas en App Store Connect y en binarios ya publicados.');
  console.error('  Perderlas es rechazo por Guideline 5.1.1 y no se corrige sin publicar');
  console.error('  una versión nueva de la app.\n');
  perdidas.forEach(u => console.error(`   falta  ${u}`));
  process.exit(1);
}

console.log(`✓ ${written.length} páginas generadas para ${PROJECTS.length} proyectos`);
console.log(`✓ ${FROZEN_URLS.length} URLs congeladas verificadas`);
if (sinDoc.length) {
  console.log('\n⚠ Proyectos sin documento legal (no se publicó página):');
  sinDoc.forEach(s => console.log(`   ${s}`));
}
if (usandoPlantilla.length) {
  console.log('\n⚠ Publicados con la plantilla genérica, pendientes del texto verificado:');
  usandoPlantilla.forEach(s => console.log(`   ${s}`));
}
