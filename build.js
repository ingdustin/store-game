#!/usr/bin/env node
// Genera el sitio estático completo:
//   index.html                        catálogo
//   juegos/<slug>/index.html          ficha con benchmarks y veredicto
//   juegos/<slug>/privacidad.html     política de privacidad (plantilla genérica)
//   juegos/<slug>/terminos.html       términos de uso y EULA (plantilla genérica)
//   juegos/<slug>/marketing.html      página de marketing / App Store
//   juegos/<slug>/contacto.html       soporte, FAQ y contacto
//
// Uso: node build.js

const fs = require('fs');
const path = require('path');
const { SITE, GAMES, DEVICES } = require('./data/games.js');

const ROOT = __dirname;

const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const money = n => '$' + n.toFixed(2);
const discountOf = g => g.old > 0 ? Math.round((1 - g.price / g.old) * 100) : 0;
const priceLabel = g => g.price === 0 ? 'Gratis' : money(g.price);

// ---------------------------------------------------------------- layout

function head({ title, desc, root }) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="stylesheet" href="${root}assets/styles.css">
</head>
<body>
<div class="spectrum"></div>`;
}

function header({ root, active = '' }) {
  const link = (href, label, key, badge = '') =>
    `<a class="nav-link${active === key ? ' active' : ''}" href="${href}">${label}${badge}</a>`;
  return `
<header>
  <div class="wrap">
    <div class="topbar">
      <a class="brand" href="${root}index.html">
        <div class="logo">S</div>
        <div>
          <div class="brand-name">Store Gaming <span class="brand-tag">TECH</span></div>
          <div class="brand-sub">Sistema ${esc(SITE.brand)} · ${esc(SITE.owner)}</div>
        </div>
      </a>
      <div class="search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
        </svg>
        <input id="search" type="search" placeholder="Buscar juegos, M-series, Ray Tracing…" aria-label="Buscar juegos">
      </div>
      <div class="header-right">
        <div class="continuity"><span class="dot"></span> Continuidad: iPhone 16 Pro Max</div>
        <button class="bell" aria-label="Notificaciones">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/>
          </svg>
          <span>2</span>
        </button>
        <div class="profile">
          <div class="avatar">DG</div>
          <span class="profile-name">Dustin Gamer</span>
          <span class="level">Nivel 4</span>
        </div>
      </div>
    </div>
  </div>
  <nav>
    <div class="wrap">
      <div class="nav-inner">
        ${link(root + 'index.html', '🎮 Espacio Juegos', 'catalogo')}
        ${link(root + 'index.html#catalogo', '🏷️ Ofertas Exclusivas', 'ofertas', ' <span class="nav-badge">HOY</span>')}
        ${link(root + 'index.html#catalogo', '📰 Lanzamientos &amp; News', 'news')}
        ${link(root + 'index.html#catalogo', '💬 Foro Comunidad', 'foro')}
        ${link(root + 'index.html#sync', '✨ Mi Perfil &amp; Logros', 'perfil')}
        ${link(root + 'index.html#catalogo', '📊 Marketing App Store', 'marketing')}
        ${link(root + 'index.html#legal', '📄 Legal', 'legal')}
      </div>
    </div>
  </nav>
</header>`;
}

function footer({ root, game }) {
  const base = game ? `${root}juegos/${game.slug}/` : '';
  const legal = game ? `
      <div>
        <h4>${esc(game.title)}</h4>
        <ul>
          <li><a href="${base}index.html">Ficha técnica y benchmarks</a></li>
          <li><a href="${base}privacidad.html">Política de privacidad</a></li>
          <li><a href="${base}terminos.html">Términos de uso y EULA</a></li>
          <li><a href="${base}marketing.html">Página de marketing</a></li>
          <li><a href="${base}contacto.html">Soporte y contacto</a></li>
        </ul>
      </div>` : `
      <div>
        <h4>Legal por aplicación</h4>
        <ul>
          <li><a href="${root}index.html#catalogo">Cada juego incluye su propia URL</a></li>
          <li><a href="${root}juegos/deducta-sudoku/privacidad.html">Ejemplo: privacidad de Deducta Sudoku</a></li>
          <li><a href="${root}juegos/deducta-sudoku/terminos.html">Ejemplo: términos de Deducta Sudoku</a></li>
          <li><a href="${root}juegos/deducta-sudoku/contacto.html">Ejemplo: soporte de Deducta Sudoku</a></li>
        </ul>
      </div>`;

  return `
<footer id="legal">
  <div class="wrap">
    <div class="footer-cols">
      <div>
        <h4>${esc(SITE.name)}</h4>
        <p>Espacio tecnológico de reseñas, rendimiento en Apple Silicon, lanzamientos y ofertas de la App Store.</p>
      </div>
      <div>
        <h4>Sistema de identidad ${esc(SITE.brand)}</h4>
        <ul>
          <li><a href="https://${SITE.site}" rel="noopener">${esc(SITE.site)}</a></li>
          <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        </ul>
      </div>
      ${legal}
    </div>
    <div class="footer-bottom">
      <p>© 2026 ${esc(SITE.owner)}. Sitio independiente de reseñas técnicas, no afiliado ni asociado con Apple Inc. Apple, iPhone, iPad, Mac, App Store, MetalFX y Apple Arcade son marcas registradas de Apple Inc. Los nombres de juegos y estudios pertenecen a sus respectivos propietarios. Precios, descuentos y códigos con fines demostrativos.</p>
      <span class="status"><span class="dot"></span> Estado del servidor: activo</span>
    </div>
  </div>
</footer>`;
}

// Cierra el documento, con los scripts de página dentro de <body>.
function close(script = '') {
  return `${script ? '\n' + script : ''}
</body>
</html>`;
}

// Navegación entre las páginas internas de un juego.
function docNav(g, current) {
  const items = [
    ['index.html', 'Ficha técnica'],
    ['privacidad.html', 'Privacidad'],
    ['terminos.html', 'Términos y EULA'],
    ['marketing.html', 'Marketing'],
    ['contacto.html', 'Soporte y contacto']
  ];
  return `<div class="doc-nav">${items
    .filter(([f]) => f !== current)
    .map(([f, label]) => `<a class="cta-ghost" href="${f}">${label}</a>`)
    .join('\n    ')}</div>`;
}

function crumbs(g, current) {
  return `<div class="crumbs">
    <a href="../../index.html">Espacio Juegos</a><span>/</span>
    ${current ? `<a href="index.html">${esc(g.title)}</a><span>/</span><span>${esc(current)}</span>`
              : `<span>${esc(g.title)}</span>`}
  </div>`;
}

// ---------------------------------------------------------------- catálogo

function pageIndex() {
  const data = GAMES.map(g => ({
    slug: g.slug, title: g.title, studio: g.studio, cat: g.cat, plats: g.plats,
    rating: g.rating, reviews: g.reviews, desc: g.desc, fps: g.fps, tech: g.tech,
    old: g.old, price: g.price, arcade: !!g.arcade, exclusive: !!g.exclusive,
    today: !!g.today, own: !!g.own, soon: !!g.soon
  }));

  return `${head({
    title: `${SITE.name} · ${SITE.brand}`,
    desc: 'Reseñas técnicas, benchmarks de FPS en chips M-series y A18 Pro, y ofertas de juegos para iOS, iPadOS y macOS.',
    root: ''
  })}
${header({ root: '', active: 'catalogo' })}

<main class="wrap">
  <section class="hero">
    <div class="eyebrow">✳ Espacio tecnológico especializado · App Store</div>
    <h1>Descubre los mejores juegos promocionados con <span class="grad">Rendimiento Técnico Pro</span></h1>
    <p>Consulta reseñas exhaustivas, tasas de cuadros por segundo (FPS) en chips M-series y A18 Pro, ofertas exclusivas con códigos promo y comunidad activa en iOS, iPadOS y macOS.</p>
    <div class="chips">
      <span class="chip">🔷 Metal 3 &amp; MetalFX</span>
      <span class="chip">🟢 Universal Purchase</span>
      <span class="chip">🔴 Sincronización Cloud Continuidad</span>
    </div>
  </section>

  <section id="catalogo">
    <div class="filters">
      <div class="filter-group" id="cat-filters"><span class="filter-label">Categoría:</span></div>
      <div class="sort-wrap">
        <span class="filter-label">Ordenar por:</span>
        <select id="sort" aria-label="Ordenar por">
          <option value="rating">⭐ Mejor Valorados</option>
          <option value="discount">🔥 Mayor Descuento</option>
          <option value="fps">⚡ Rendimiento FPS</option>
          <option value="price">💲 Menor Precio</option>
        </select>
      </div>
      <div class="filter-group" id="plat-filters" style="flex-basis:100%"><span class="filter-label">Plataforma:</span></div>
    </div>
    <p class="result-count" id="count"></p>
    <div class="grid" id="grid"></div>
  </section>

  <section class="sync" id="sync">
    <div class="sync-head">
      <div>
        <div class="eyebrow">☁ Ecosistema · Universal Purchase &amp; Cloud Sync</div>
        <h2>Sincronización Multiplataforma Continuidad</h2>
        <p>Inicia tu partida en el iPhone durante tu trayecto y continúala sin interrupciones en tu Mac o iPad.</p>
      </div>
      <button class="sync-btn" id="sync-btn">Forzar Sincronización Cloud</button>
    </div>
    <div class="devices">
      ${DEVICES.map(d => `<div class="device">
        <span class="device-status"><span class="dot"></span> Sincronizado</span>
        <h4>${esc(d.name)}</h4>
        <p class="os">${esc(d.os)}</p>
        <p class="label">Último juego en sesión</p>
        <p class="last-game">${esc(d.game)}</p>
        <p class="when">Última actividad: ${esc(d.when)}</p>
      </div>`).join('\n      ')}
    </div>
  </section>
</main>
${footer({ root: '' })}
${close(`<script>
const GAMES = ${JSON.stringify(data)};
const CATEGORIES = ["Todos","Acción","RPG","Estrategia","Arcade","Simulación","Aventura","Exclusivo Apple"];
const PLATFORMS  = ["Todas","iPhone","iPad","Mac","Vision Pro","Apple Arcade"];
const state = { cat: "Todos", plat: "Todas", sort: "rating", q: "" };

const discountOf = g => g.old > 0 ? Math.round((1 - g.price / g.old) * 100) : 0;
const money = n => "$" + n.toFixed(2);
const fmt = n => n.toLocaleString("es-ES");

function buildPills(id, values, key) {
  const box = document.getElementById(id);
  values.forEach(v => {
    const b = document.createElement("button");
    b.className = "pill";
    b.textContent = v;
    b.setAttribute("aria-pressed", state[key] === v);
    b.addEventListener("click", () => {
      state[key] = v;
      box.querySelectorAll(".pill").forEach(p => p.setAttribute("aria-pressed", p.textContent === v));
      render();
    });
    box.appendChild(b);
  });
}

function matches(g) {
  const catOk = state.cat === "Todos" ||
    (state.cat === "Arcade" ? g.arcade :
     state.cat === "Exclusivo Apple" ? g.exclusive : g.cat === state.cat);
  const platOk = state.plat === "Todas" || g.plats.includes(state.plat);
  const q = state.q.trim().toLowerCase();
  const textOk = !q || [g.title, g.studio, g.tech, g.desc, g.cat].join(" ").toLowerCase().includes(q);
  return catOk && platOk && textOk;
}

const SORTERS = {
  rating:   (a, b) => b.rating - a.rating || b.reviews - a.reviews,
  discount: (a, b) => discountOf(b) - discountOf(a),
  fps:      (a, b) => b.fps - a.fps,
  price:    (a, b) => a.price - b.price
};

function cardHTML(g) {
  const off = discountOf(g), badges = [];
  if (off > 0) badges.push('<span class="badge badge-discount">-' + off + '% dto</span>');
  if (g.today) badges.push('<span class="badge badge-free">¡Gratis hoy!</span>');
  if (g.arcade) badges.push('<span class="badge badge-arcade">Apple Arcade</span>');
  if (g.exclusive) badges.push('<span class="badge badge-arcade">Exclusivo Apple</span>');
  if (g.own) badges.push('<span class="badge badge-own">App propia</span>');
  if (g.soon) badges.push('<span class="badge badge-soon">Próximamente</span>');
  badges.push('<span class="badge badge-cat">' + g.cat + '</span>');
  const oldP = g.old > g.price ? '<span class="price-old">' + money(g.old) + '</span>' : '';
  const newP = g.price === 0
    ? '<span class="price-new free">GRATIS</span>'
    : '<span class="price-new">' + money(g.price) + '</span>';
  const rating = g.reviews === 0
    ? '<span class="rating"><span class="count">Sin reseñas aún</span></span>'
    : '<span class="rating"><span class="score">' + g.rating.toFixed(1) + '</span>' +
      '<span class="count">(' + fmt(g.reviews) + ')</span></span>';
  return '<article class="card">' +
    '<div class="card-top">' + badges.join('') + '</div>' +
    '<div class="studio-row"><span class="studio">' + g.studio + '</span>' +
    rating + '</div>' +
    '<h3>' + g.title + '</h3><p class="desc">' + g.desc + '</p>' +
    '<div class="tech-row"><span class="tech fps">' + g.fps + ' FPS</span>' +
    '<span class="tech">' + g.tech + '</span></div>' +
    '<div class="price-row">' + oldP + newP + '</div>' +
    '<a class="cta" href="juegos/' + g.slug + '/index.html">Ver Reseña &amp; Benchmarks</a></article>';
}

function render() {
  const list = GAMES.filter(matches).sort(SORTERS[state.sort]);
  document.getElementById("grid").innerHTML = list.length
    ? list.map(cardHTML).join("")
    : '<div class="empty">Sin resultados para los filtros aplicados.</div>';
  document.getElementById("count").innerHTML =
    'Mostrando <b>' + list.length + '</b> de ' + GAMES.length + ' juegos destacados de la App Store';
}

buildPills("cat-filters", CATEGORIES, "cat");
buildPills("plat-filters", PLATFORMS, "plat");
render();

document.getElementById("sort").addEventListener("change", e => { state.sort = e.target.value; render(); });
document.getElementById("search").addEventListener("input", e => { state.q = e.target.value; render(); });
document.getElementById("sync-btn").addEventListener("click", e => {
  const btn = e.currentTarget, original = btn.textContent;
  btn.disabled = true; btn.textContent = "Sincronizando…";
  setTimeout(() => {
    btn.textContent = "✓ Todo al día";
    setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 1800);
  }, 900);
});
</script>`)}`;
}

// ---------------------------------------------------------------- ficha

function pageGame(g) {
  const off = discountOf(g);
  const badges = [];
  if (off > 0) badges.push(`<span class="badge badge-discount">-${off}% dto activo</span>`);
  if (g.today) badges.push('<span class="badge badge-free">¡Gratis hoy!</span>');
  if (g.arcade) badges.push('<span class="badge badge-arcade">Apple Arcade</span>');
  if (g.exclusive) badges.push('<span class="badge badge-arcade">Exclusivo Apple</span>');
  if (g.own) badges.push('<span class="badge badge-own">App propia</span>');
  if (g.soon) badges.push('<span class="badge badge-soon">Próximamente en la App Store</span>');
  badges.push(`<span class="badge badge-cat">${esc(g.cat)}</span>`);

  const promo = g.promo ? `
  <div class="promo">
    <span class="promo-label">Código promocional ${esc(SITE.brand)}</span>
    <code class="promo-code" id="promo">${esc(g.promo)}</code>
    <button class="copy-btn" id="copy">Copiar</button>
    <p>Canjea este código en el menú del juego para desbloquear recompensas e ítems exclusivos.</p>
  </div>` : '';

  const store = g.appStore
    ? `<a class="cta" href="${esc(g.appStore)}" rel="noopener">Ver ficha en la App Store</a>`
    : '';

  return `${head({
    title: `${g.title} · Reseña y benchmarks · ${SITE.name}`,
    desc: g.desc,
    root: '../../'
  })}
${header({ root: '../../', active: 'catalogo' })}

<main class="wrap">
  ${crumbs(g, null)}

  <section class="game-head">
    <div class="card-top">${badges.join('')}</div>
    <h1>${esc(g.title)}</h1>
    <p class="lede">${esc(g.desc)} Desarrollado por ${esc(g.studio)}.</p>
    ${g.intro ? `<p class="lede">${esc(g.intro)}</p>` : ''}
    <div class="head-meta">
      ${g.reviews === 0
        ? '<span class="rating"><span class="count">Sin reseñas aún</span></span>'
        : `<span class="rating"><span class="score">${g.rating.toFixed(1)}</span>
        <span class="count">(${g.reviews.toLocaleString('es-ES')} reseñas)</span></span>`}
      <div class="price-row" style="border:none;padding:0">
        ${g.old > g.price ? `<span class="price-old">${money(g.old)}</span>` : ''}
        <span class="price-new${g.price === 0 ? ' free' : ''}">${g.price === 0 ? 'GRATIS' : money(g.price)}</span>
      </div>
      <div class="head-actions">
        ${store}
        <a class="cta-ghost" href="contacto.html">Soporte</a>
      </div>
    </div>
  </section>
${promo}
  <section class="section">
    <h2>⚡ Análisis de rendimiento en Apple Silicon</h2>
    <div class="bench-grid">
      <div class="bench-cell"><p class="k">FPS promedio</p><p class="v hl">${g.fps} FPS</p></div>
      <div class="bench-cell"><p class="k">Procesador recomendado</p><p class="v">${esc(g.bench.cpu)}</p></div>
      <div class="bench-cell"><p class="k">Librería gráfica</p><p class="v">${esc(g.bench.gfx)}</p></div>
      <div class="bench-cell"><p class="k">Ray tracing</p><p class="v">${esc(g.bench.rt)}</p></div>
      <div class="bench-cell"><p class="k">Eficiencia de batería</p><p class="v">${esc(g.bench.battery)}</p></div>
      <div class="bench-cell"><p class="k">Almacenamiento</p><p class="v">${esc(g.bench.storage)}</p></div>
      <div class="bench-cell"><p class="k">Soporte de mandos</p><p class="v">${esc(g.bench.gamepad)}</p></div>
      <div class="bench-cell"><p class="k">Plataformas</p><p class="v">${esc(g.plats.join(' · '))}</p></div>
    </div>
  </section>

  <section class="section">
    <div class="prosandcons">
      <div class="pc-box pros">
        <h3>✓ Puntos fuertes</h3>
        <ul>${g.pros.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
      </div>
      <div class="pc-box cons">
        <h3>! Aspectos a considerar</h3>
        <ul>${g.cons.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
      </div>
    </div>
  </section>

  <section class="section">
    <h2>🏆 Veredicto editorial de ${esc(SITE.brand)}</h2>
    <div class="verdict">${g.verdict.map(p => `<p>${esc(p)}</p>`).join('\n      ')}</div>
  </section>

  <section class="section">
    <h2>📄 Documentación legal y App Store</h2>
    <p style="color:var(--text-dim);max-width:70ch">Esta aplicación cuenta con URLs propias e independientes para cada documento requerido por las directrices de revisión de Apple:</p>
    ${docNav(g, 'index.html')}
  </section>
</main>
${footer({ root: '../../', game: g })}
${close(g.promo ? `<script>
document.getElementById('copy').addEventListener('click', e => {
  const btn = e.currentTarget, code = document.getElementById('promo').textContent;
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = '✓ Copiado';
    setTimeout(() => { btn.textContent = 'Copiar'; }, 1800);
  }).catch(() => { btn.textContent = 'Copia manual'; });
});
</script>` : '')}`;
}

// ---------------------------------------------------------------- privacidad

function pagePrivacy(g) {
  const n = esc(g.title);
  return `${head({
    title: `Política de privacidad — ${g.title}`,
    desc: `Política de privacidad de ${g.title}: qué datos maneja la aplicación, para qué los usa y qué puedes hacer con ellos.`,
    root: '../../'
  })}
${header({ root: '../../', active: 'legal' })}

<main class="wrap wrap-narrow doc">
  ${crumbs(g, 'Privacidad')}

  <div class="doc-head">
    <div class="eyebrow">🔒 Cumplimiento App Store &amp; RGPD</div>
    <h1>Política de privacidad</h1>
    <p>Aplicación: <strong>${n}</strong> · Última actualización: ${esc(SITE.updated)}</p>
  </div>

  <p>Esta política cuenta, sin rodeos, qué datos maneja <strong>${n}</strong>, para qué los usa y qué puedes hacer con ellos. Está escrita para leerse entera: si algo no se entiende, es un fallo nuestro.</p>

  <h2><span class="num">01</span> Lo esencial</h2>
  <p>No te pedimos ningún dato personal para jugar. No hay registro con correo, teléfono ni redes sociales. No pedimos tu nombre real, tu ubicación, tus contactos, tu cámara ni tu micrófono. La aplicación no necesita ningún permiso del sistema para funcionar, salvo el de notificaciones si tú activas los recordatorios.</p>
  <p>El responsable del tratamiento es <strong>${esc(SITE.owner)}</strong>, titular de la aplicación, con dirección de contacto en <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>

  <h2><span class="num">02</span> Lo que se queda en tu dispositivo</h2>
  <p>La mayor parte de tu información no sale del dispositivo: los ajustes (opciones de juego, sonido, vibración, accesibilidad), tu progreso (partidas, victorias, rachas, logros, monedas del juego y objetos desbloqueados) y las partidas guardadas.</p>
  <p>La aplicación guarda además un <strong>identificador de instalación</strong>: un número aleatorio generado en tu propio dispositivo y almacenado en el llavero del sistema. No es tu Apple Account, no viaja a iCloud y no está vinculado a tu identidad. Sirve para dos cosas: reconocer tu copia de progreso en el servidor y evitar que una prueba gratuita se repita indefinidamente reinstalando la aplicación.</p>
  <p>En iOS ese identificador sobrevive a la desinstalación, porque el llavero no se borra al eliminar una aplicación. Puedes pedir su borrado escribiendo a la dirección de contacto.</p>

  <h2><span class="num">03</span> Lo que se envía a un servidor</h2>
  <p>La aplicación puede usar servicios en la nube para dos funciones concretas: la clasificación pública y la copia de seguridad de tu progreso. La sesión es <strong>anónima</strong>: no se crea ninguna cuenta con datos personales, ni se guarda tu correo ni tu teléfono.</p>
  <p>Esto es todo lo que sube, y nada más:</p>
  <ul>
    <li>El identificador de instalación, para distinguir tu progreso del de otros jugadores.</li>
    <li>El apodo que tú escribas. Lo eliges tú y puedes cambiarlo cuando quieras. Si escribes tu nombre real, será visible para el resto de jugadores en la clasificación.</li>
    <li>Tus victorias y tu mejor racha, para ordenar la clasificación.</li>
    <li>Tu progreso: monedas, logros, récords, reto diario, cosméticos desbloqueados y si ya has usado una prueba gratuita.</li>
  </ul>

  <h2><span class="num">04</span> Publicidad</h2>
  <p>La versión gratuita puede mostrar anuncios servidos por terceros. Los anuncios son <strong>no personalizados</strong>: la aplicación no solicita permiso de seguimiento y, por tanto, tu identificador publicitario no se usa para perfilarte ni para seguirte por otras aplicaciones.</p>
  <p>El proveedor de publicidad puede recoger datos técnicos del dispositivo para servir los anuncios, medirlos y prevenir el fraude. Ese tratamiento se rige por las políticas de dicho proveedor, no por esta.</p>
  <p>La suscripción de pago elimina todos los anuncios.</p>

  <h2><span class="num">05</span> Compras</h2>
  <p>Todas las compras las liquida <strong>Apple</strong> a través de tu cuenta de App Store. La aplicación no ve ni almacena tu método de pago, tu nombre ni tu dirección: solo recibe de la tienda si una compra se ha completado y si la suscripción sigue activa.</p>

  <h2><span class="num">06</span> Notificaciones</h2>
  <p>Los recordatorios se generan <strong>en tu propio dispositivo</strong>, no desde un servidor, y solo si tú los activas. Puedes apagarlos desde los ajustes de la aplicación o del sistema; al apagarlos se cancelan también los avisos ya programados.</p>

  <h2><span class="num">07</span> Menores</h2>
  <p>${n} no está dirigida específicamente a menores de 13 años y no recoge conscientemente datos de ellos. Como no se solicita ningún dato personal, no hay información identificativa que un menor pueda facilitar a través de la aplicación.</p>

  <h2><span class="num">08</span> Tus derechos</h2>
  <p>Puedes borrar todos los datos locales desinstalando la aplicación, y reiniciar tu progreso desde los ajustes de datos de la propia aplicación.</p>
  <p>Para eliminar tu entrada de la clasificación, la copia de tu progreso y el identificador de instalación, escribe a <a href="mailto:${SITE.email}">${SITE.email}</a> indicando el apodo que usabas. Se eliminarán. También puedes pedir una copia de lo que hay guardado sobre ti, que será exactamente lo que aparece en la lista del apartado 03.</p>

  <div class="callout">
    <p>Como usuario residente en la Unión Europea puedes ejercer los derechos de acceso, rectificación, portabilidad, limitación y supresión reconocidos por el RGPD escribiendo a <a href="mailto:${SITE.email}">${SITE.email}</a>. Las solicitudes se atienden en un plazo máximo de 30 días.</p>
  </div>

  <h2><span class="num">09</span> Cambios y contacto</h2>
  <p>Si esta política cambia, se actualizará esta misma página junto con su fecha, y el texto equivalente dentro de la aplicación.</p>
  <p>Para cualquier duda: <a href="mailto:${SITE.email}">${SITE.email}</a></p>

  ${docNav(g, 'privacidad.html')}
</main>
${footer({ root: '../../', game: g })}
${close()}`;
}

// ---------------------------------------------------------------- términos

function pageTerms(g) {
  const n = esc(g.title);
  return `${head({
    title: `Términos de uso y EULA — ${g.title}`,
    desc: `Términos de uso, condiciones y acuerdo de licencia de usuario final (EULA) de ${g.title}.`,
    root: '../../'
  })}
${header({ root: '../../', active: 'legal' })}

<main class="wrap wrap-narrow doc">
  ${crumbs(g, 'Términos y EULA')}

  <div class="doc-head">
    <div class="eyebrow">📄 Términos, condiciones y EULA</div>
    <h1>Términos de uso</h1>
    <p>Aplicación: <strong>${n}</strong> · Última actualización: ${esc(SITE.updated)}</p>
  </div>

  <p>Al descargar y usar <strong>${n}</strong> aceptas estas condiciones. Si no estás de acuerdo con ellas, no uses la aplicación. El titular de la aplicación es <strong>${esc(SITE.owner)}</strong> (<a href="mailto:${SITE.email}">${SITE.email}</a>).</p>

  <h2><span class="num">01</span> Qué es ${n}</h2>
  <p>${esc(g.desc)} La aplicación está desarrollada por ${esc(g.studio)} y distribuida a través de la App Store para ${esc(g.plats.join(', '))}.</p>

  <h2><span class="num">02</span> Licencia de uso</h2>
  <p>Se te concede una licencia personal, no exclusiva, revocable e intransferible para usar la aplicación en los dispositivos que te pertenezcan. No puedes revenderla, alquilarla, descompilarla ni redistribuirla.</p>

  <h2><span class="num">03</span> Monedas y objetos del juego</h2>
  <p>Las monedas, los tableros, los fondos, los marcos, los títulos y demás objetos desbloqueables <strong>no tienen valor monetario real</strong>, no son canjeables por dinero, no se pueden transferir a otro jugador y no salen de la aplicación. Son contenido del juego y pueden reequilibrarse o modificarse en versiones futuras.</p>
  <p>Las monedas compradas no caducan. Si desinstalas la aplicación y no había copia en la nube, tu progreso y tus objetos no son recuperables.</p>
  <p>La entrada y los premios de los torneos son monedas del juego. No hay apuestas ni premios en dinero.</p>

  <h2><span class="num">04</span> Suscripción de pago</h2>
  <p>La aplicación puede ofrecer una suscripción que elimina los anuncios y da acceso a funciones adicionales. Se aplican estas condiciones:</p>
  <ul>
    <li>El cobro lo gestiona Apple a través de tu cuenta de App Store. El importe se carga al confirmar la compra.</li>
    <li>La suscripción <strong>se renueva automáticamente</strong> al precio vigente, salvo que la canceles al menos 24 horas antes del final del periodo en curso. La renovación se cobra en las 24 horas previas al final del periodo.</li>
    <li>Puedes gestionarla o cancelarla en cualquier momento desde los ajustes de tu cuenta de App Store. Cancelar detiene la próxima renovación, pero no interrumpe el periodo ya pagado.</li>
    <li>Cualquier prueba gratuita ofrecida dentro del juego es un <strong>regalo del desarrollador</strong>, no una oferta de la App Store: es gratuita, no se convierte en suscripción y no se cobra nada al terminar.</li>
    <li>Las devoluciones se rigen por la política de Apple. El desarrollador no procesa reembolsos directamente; puedes solicitarlos en <a href="https://reportaproblem.apple.com" rel="noopener">reportaproblem.apple.com</a>.</li>
  </ul>

  <h2><span class="num">05</span> Publicidad</h2>
  <p>La versión gratuita puede mostrar anuncios servidos por terceros. El desarrollador no controla el contenido concreto de cada anuncio ni respalda los productos anunciados.</p>

  <h2><span class="num">06</span> Conducta</h2>
  <p>El apodo que elijas es visible para el resto de jugadores en la clasificación. No uses apodos ofensivos, que suplanten a otra persona o que infrinjan derechos de terceros: pueden eliminarse de la clasificación sin aviso.</p>
  <p>Tampoco está permitido manipular la aplicación para alterar puntuaciones, monedas o clasificaciones.</p>

  <h2><span class="num">07</span> Disponibilidad</h2>
  <p>El juego funciona sin conexión en sus modos principales. Las funciones en línea —clasificación y copia del progreso— dependen de servicios de terceros y pueden interrumpirse, cambiar o desaparecer.</p>

  <h2><span class="num">08</span> Garantías y responsabilidad</h2>
  <p>La aplicación se ofrece «tal cual», sin garantía de estar libre de errores ni de funcionar de forma ininterrumpida. En la medida en que lo permita la ley aplicable, el desarrollador no será responsable de pérdidas de progreso, de datos ni de daños indirectos derivados del uso de la aplicación.</p>
  <p>Nada de lo anterior limita los derechos que te reconozca la legislación de consumo de tu país.</p>

  <h2><span class="num">09</span> Ley aplicable y consumidores de la UE</h2>
  <p>Si usas la aplicación como consumidor, estos términos se rigen por la legislación de tu país de residencia habitual, y puedes plantear cualquier reclamación ante los tribunales de tu domicilio. No se te impone ninguna jurisdicción distinta de la tuya.</p>
  <div class="callout">
    <p><strong>Derecho de desistimiento (Directiva 2011/83/UE).</strong> Para las compras de contenido digital realizadas a través de la App Store, el consumidor de la Unión Europea dispone de 14 días de desistimiento, gestionados mediante los mecanismos oficiales de reembolso de Apple.</p>
    <p><strong>Resolución de litigios en línea.</strong> Conforme al Reglamento (UE) 524/2013, la Comisión Europea facilita una plataforma de resolución de litigios en <a href="https://ec.europa.eu/consumers/odr/" rel="noopener">ec.europa.eu/consumers/odr</a>.</p>
  </div>

  <h2><span class="num">10</span> Cambios y contacto</h2>
  <p>Estos términos pueden actualizarse; la versión vigente será siempre la publicada en la aplicación y en esta página, con su fecha.</p>
  <p>Para cualquier duda: <a href="mailto:${SITE.email}">${SITE.email}</a></p>

  ${docNav(g, 'terminos.html')}
</main>
${footer({ root: '../../', game: g })}
${close()}`;
}

// ---------------------------------------------------------------- marketing

function pageMarketing(g) {
  const store = g.appStore
    ? `<a class="cta" href="${esc(g.appStore)}" rel="noopener">Ver en la App Store</a>`
    : '<a class="cta" href="index.html">Ver ficha técnica</a>';

  return `${head({
    title: `${g.title} — Página oficial`,
    desc: g.desc,
    root: '../../'
  })}
${header({ root: '../../', active: 'marketing' })}

<main class="wrap">
  ${crumbs(g, 'Marketing')}

  <section class="hero">
    <div class="eyebrow">📊 Página de marketing · App Store</div>
    <h1>${esc(g.title)}</h1>
    <p>${esc(g.desc)}</p>
    <div class="chips">
      <span class="chip">⚡ ${g.fps} FPS</span>
      <span class="chip">🔷 ${esc(g.tech)}</span>
      <span class="chip">💲 ${esc(priceLabel(g))}</span>
      ${g.appId ? `<span class="chip">🆔 App ID ${esc(g.appId)}</span>` : ''}
    </div>
    <div class="head-actions" style="margin-top:26px">
      ${store}
      <a class="cta-ghost" href="contacto.html">Soporte y FAQ</a>
    </div>
  </section>

  <section class="section">
    <h2>Por qué destaca</h2>
    <div class="grid">
      ${g.pros.map((p, i) => `<article class="card">
        <div class="card-top"><span class="badge badge-own">0${i + 1}</span></div>
        <p class="desc" style="font-size:14.5px;color:var(--text)">${esc(p)}</p>
      </article>`).join('\n      ')}
    </div>
  </section>

  <section class="section">
    <h2>Compatibilidad y requisitos</h2>
    <div class="table-scroll">
      <table class="spec-table">
        <tr><th>Plataformas</th><td>${esc(g.plats.join(' · '))}</td></tr>
        <tr><th>Procesador recomendado</th><td>${esc(g.bench.cpu)}</td></tr>
        <tr><th>Librería gráfica</th><td>${esc(g.bench.gfx)}</td></tr>
        <tr><th>Ray tracing</th><td>${esc(g.bench.rt)}</td></tr>
        <tr><th>Rendimiento medido</th><td>${g.fps} FPS · eficiencia de batería ${esc(g.bench.battery)}</td></tr>
        <tr><th>Almacenamiento</th><td>${esc(g.bench.storage)}</td></tr>
        <tr><th>Controles</th><td>${esc(g.bench.gamepad)}</td></tr>
        <tr><th>Desarrollador</th><td>${esc(g.studio)}</td></tr>
        ${g.appId ? `<tr><th>App Store ID</th><td>${esc(g.appId)}</td></tr>` : ''}
      </table>
    </div>
  </section>

  <section class="section">
    <h2>Qué dice nuestra reseña</h2>
    <div class="verdict"><p>${esc(g.verdict[0])}</p></div>
  </section>

  <section class="section">
    <h2>Enlaces oficiales</h2>
    <p style="color:var(--text-dim)">URLs públicas e independientes requeridas por App Store Connect para esta aplicación:</p>
    ${docNav(g, 'marketing.html')}
  </section>
</main>
${footer({ root: '../../', game: g })}
${close()}`;
}

// ---------------------------------------------------------------- contacto

function pageContact(g) {
  const n = esc(g.title);
  const faq = [
    ['¿Puedo jugar sin conexión a internet?',
     'Sí. Los modos principales funcionan completamente sin conexión. Solo el emparejamiento en línea y las clasificaciones necesitan conexión.'],
    ['¿Cómo consigo monedas?',
     'Ganando partidas, manteniendo rachas de victorias, completando logros y jugando el reto diario. También puedes conseguirlas en la tienda dentro de la aplicación.'],
    ['¿Cómo restauro una compra en un dispositivo nuevo?',
     'Abre la tienda dentro de la aplicación y pulsa «Restaurar compras», con la misma Apple Account usada en la compra original.'],
    ['¿Cómo cancelo una suscripción?',
     'Las suscripciones las gestiona Apple, no nosotros. En tu dispositivo abre Ajustes → tu nombre → Suscripciones y selecciona la aplicación. Cancela al menos 24 horas antes de que acabe el periodo para evitar la siguiente renovación.'],
    ['Me han cobrado pero no recibí el artículo',
     'Prueba primero «Restaurar compras». Si sigue sin aparecer, escríbenos con la fecha de la compra y lo resolvemos. Los reembolsos los gestiona Apple en reportaproblem.apple.com.'],
    ['¿Cómo borro mi cuenta y mis datos?',
     `Escribe a ${SITE.email} desde la dirección vinculada a tu cuenta y la eliminaremos junto con los datos asociados. Encontrarás el detalle en la política de privacidad.`],
    ['He perdido mi progreso o mis monedas',
     'El progreso está ligado a la cuenta con la que iniciaste sesión. Inicia sesión con la misma cuenta y, si sigue sin aparecer, escríbenos indicando aproximadamente cuándo jugaste por última vez e intentaremos recuperarlo.'],
    ['Un anuncio recompensado no me dio la recompensa',
     'Las recompensas se conceden cuando el anuncio termina de reproducirse. Si un anuncio se cierra antes de tiempo o no carga, espera un momento e inténtalo de nuevo. Si sigue fallando, escríbenos indicando el modelo de tu dispositivo.']
  ];

  return `${head({
    title: `Soporte y contacto — ${g.title}`,
    desc: `Soporte, preguntas frecuentes y contacto de ${g.title}. Escríbenos a ${SITE.email}.`,
    root: '../../'
  })}
${header({ root: '../../', active: 'legal' })}

<main class="wrap wrap-narrow doc">
  ${crumbs(g, 'Soporte y contacto')}

  <div class="doc-head">
    <div class="eyebrow">💬 Soporte y preguntas frecuentes</div>
    <h1>Soporte de ${n}</h1>
    <p>¿Necesitas ayuda, has encontrado un fallo o tienes una sugerencia? Escríbenos. Solemos responder en un plazo de 2 días laborables. Indicarnos el modelo de tu dispositivo y tu versión de iOS nos ayuda a ayudarte más rápido.</p>
  </div>

  <p style="text-align:center;margin:8px 0 30px">
    <a class="mailto-big" href="mailto:${SITE.email}?subject=${encodeURIComponent('Soporte — ' + g.title)}">✉ ${SITE.email}</a>
  </p>

  <div class="contact-grid">
    <div class="contact-card">
      <h3>Soporte técnico</h3>
      <p>Fallos, errores de carga, problemas de rendimiento o compras que no aparecen.</p>
      <a href="mailto:${SITE.email}?subject=${encodeURIComponent('Soporte técnico — ' + g.title)}">${SITE.email}</a>
    </div>
    <div class="contact-card">
      <h3>Privacidad y datos</h3>
      <p>Solicitudes de acceso, portabilidad o borrado de datos y de tu identificador de instalación.</p>
      <a href="mailto:${SITE.email}?subject=${encodeURIComponent('Privacidad — ' + g.title)}">${SITE.email}</a>
    </div>
    <div class="contact-card">
      <h3>Prensa y colaboraciones</h3>
      <p>Códigos de promoción, material gráfico y propuestas de colaboración.</p>
      <a href="mailto:${SITE.email}?subject=${encodeURIComponent('Prensa — ' + g.title)}">${SITE.email}</a>
    </div>
  </div>

  <h2><span class="num">?</span> Preguntas frecuentes</h2>
  ${faq.map(([q, a]) => `<h3>${esc(q)}</h3>\n  <p>${esc(a)}</p>`).join('\n  ')}

  <div class="callout">
    <p><strong>Reembolsos.</strong> Todas las compras las gestiona Apple. Para solicitar un reembolso usa <a href="https://reportaproblem.apple.com" rel="noopener">reportaproblem.apple.com</a>; el desarrollador no puede procesarlos directamente.</p>
  </div>

  <h2><span class="num">i</span> Datos del responsable</h2>
  <div class="table-scroll">
    <table class="spec-table">
      <tr><th>Aplicación</th><td>${n}</td></tr>
      <tr><th>Desarrollador</th><td>${esc(g.studio)}</td></tr>
      <tr><th>Titular y responsable</th><td>${esc(SITE.owner)} · Sistema de identidad ${esc(SITE.brand)}</td></tr>
      <tr><th>Correo de contacto</th><td><a href="mailto:${SITE.email}">${SITE.email}</a></td></tr>
      <tr><th>Sitio web</th><td><a href="https://${SITE.site}" rel="noopener">${esc(SITE.site)}</a></td></tr>
      ${g.appId ? `<tr><th>App Store ID</th><td>${esc(g.appId)}</td></tr>` : ''}
    </table>
  </div>

  ${docNav(g, 'contacto.html')}
</main>
${footer({ root: '../../', game: g })}
${close()}`;
}

// ---------------------------------------------------------------- escritura

function write(file, content) {
  const full = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
  return file;
}

const written = [];
written.push(write('index.html', pageIndex()));

for (const g of GAMES) {
  const dir = `juegos/${g.slug}`;
  written.push(write(`${dir}/index.html`, pageGame(g)));
  written.push(write(`${dir}/privacidad.html`, pagePrivacy(g)));
  written.push(write(`${dir}/terminos.html`, pageTerms(g)));
  written.push(write(`${dir}/marketing.html`, pageMarketing(g)));
  written.push(write(`${dir}/contacto.html`, pageContact(g)));
}

console.log(`✓ ${written.length} páginas generadas para ${GAMES.length} juegos`);
console.log(`  catálogo: index.html`);
console.log(`  fichas:   juegos/<slug>/{index,privacidad,terminos,marketing,contacto}.html`);
