// myorange.agency — datos del sitio.
//
// El sitio es la web de una agencia de desarrollo que muestra su trabajo.
// No es un directorio de juegos: no hay reseñas, ni rankings, ni ofertas,
// ni fichas de productos de terceros.
//
// Editar aquí y relanzar `node build.js`.

const SITE = {
  name: 'Orange Agencia',
  domain: 'myorange.agency',
  tagline: 'Desarrollo de software y aplicaciones móviles',
  taglineEn: 'Software and mobile app development',
  // Persona jurídica responsable: es quien firma las políticas y los EULA.
  owner: 'Ing. Dustin Díaz',
  email: 'info@ddagencia.com',
  copyright: 'Orange Agencia',
  updated: '7 de septiembre de 2026',
  updatedEn: '7 September 2026'
};

const SERVICES = [
  {
    title: 'Aplicaciones móviles',
    titleEn: 'Mobile apps',
    text: 'Desarrollo de apps para iOS con Flutter y Swift, desde la primera pantalla hasta el binario firmado. Arquitectura, estado, rendimiento y pruebas.'
  },
  {
    title: 'Publicación y cumplimiento',
    titleEn: 'Release and compliance',
    text: 'Preparación completa para App Store Connect: privacidad, EULA, compras integradas, suscripciones, consentimiento en la UE y respuesta a revisiones.'
  },
  {
    title: 'Producto y backend',
    titleEn: 'Product and backend',
    text: 'Servicios en la nube, autenticación, sincronización y analítica cuando el producto los necesita, y nada cuando no.'
  },
  {
    title: 'Web y automatización',
    titleEn: 'Web and automation',
    text: 'Sitios estáticos, páginas de producto y automatización de despliegue e integración continua.'
  }
];

const HOW_WE_WORK = [
  ['Alcance cerrado', 'Cada proyecto empieza con un alcance escrito y unos criterios de aceptación verificables.'],
  ['Entregas visibles', 'Se entrega funcionando y en manos del cliente, no en capturas de pantalla.'],
  ['Cumplimiento desde el principio', 'La privacidad y los términos se escriben junto al código, no la víspera del envío.']
];

// Portafolio. `status` decide qué se muestra:
//   'published'   -> enlace a la ficha de la App Store
//   'development' -> sin enlace a tienda y sin valoraciones (T3)
const PROJECTS = [
  {
    slug: 'deducta-sudoku',
    name: 'Deducta Sudoku',
    tagline: 'Sudoku de deducción: cada tablero se resuelve sin adivinar.',
    status: 'published',
    appId: '1550244179',
    appStore: 'https://apps.apple.com/us/app/sudoku-classic-number-puzzle/id1550244179',
    platforms: ['iPhone'],
    tech: ['Flutter', 'Metal', 'StoreKit'],
    year: '2026',
    role: 'Diseño, desarrollo y publicación',
    description: 'Cada tablero se verifica antes de servirlo para garantizar solución única y que baste la lógica. La escalera de explicaciones enseña la técnica en lugar de dar el número.',
    highlights: [
      'Generador con verificación de solución única',
      'Árbol de habilidades e informe al terminar cada partida',
      'Funciona sin conexión, sin cuentas ni servidores'
    ],
    // Documentos propios verificados, en data/legal/<slug>/
    legalLangs: ['es']
  },
  {
    slug: 'solitaire-klondike-spider',
    name: 'Solitaire: Klondike Spider',
    tagline: 'Klondike y Spider con animaciones a 120 Hz y modo oscuro.',
    status: 'published',
    appId: '1579977123',
    appStore: 'https://apps.apple.com/us/app/id1579977123',
    platforms: ['iPhone', 'iPad'],
    tech: ['Flutter', 'StoreKit'],
    year: '2025',
    role: 'Desarrollo y publicación',
    description: 'Los dos solitarios clásicos con reparto y animaciones fluidas en pantallas ProMotion, temas personalizables y desafíos diarios.',
    highlights: [
      'Klondike a una o tres cartas y Spider a uno, dos o cuatro palos',
      'Pistas ilimitadas y deshacer',
      'Bajo consumo de batería'
    ],
    legalLangs: ['es', 'en']
  },
  {
    slug: 'asly-tic-tac-toe-xo-gomoku',
    name: 'Asly: Tic Tac Toe XO Gomoku',
    tagline: 'Cinco modos sobre un mismo tablero, con IA de tres niveles.',
    status: 'published',
    appId: '6788191425',
    appStore: 'https://apps.apple.com/us/app/id6788191425',
    platforms: ['iPhone', 'iPad'],
    tech: ['Flutter', 'StoreKit'],
    year: '2026',
    role: 'Desarrollo y publicación',
    description: 'Cinco formas de jugar sobre un mismo tablero: Clásico, Ultimate, Gomoku, Misère y Blitz, con tableros de 3×3 a 5×5.',
    highlights: [
      'Cinco modos y tableros de tamaño variable',
      'IA con tres niveles de dificultad',
      'Partida local a dos jugadores y juego sin conexión'
    ],
    legalLangs: ['es', 'en']
  },
  {
    slug: 'blockmix',
    name: 'Blockmix Puzzle Trio',
    tagline: 'Tres piezas por ronda sobre tableros de bloques, hexágonos y deslizamiento.',
    status: 'development',
    appId: '6801892843',
    appStore: 'https://apps.apple.com/us/app/blockmix-puzzle-trio/id6801892843',
    platforms: ['iPhone'],
    tech: ['Flutter', 'Firebase', 'AdMob', 'StoreKit'],
    year: '2026',
    role: 'Diseño, desarrollo y publicación',
    description: 'Cada ronda entrega tres piezas para encajar en el tablero. Al completar una línea se despeja y devuelve espacio. Sin reloj: la partida acaba cuando ninguna pieza cabe.',
    highlights: [
      'Tres tipos de tablero: bloques, hexágonos y deslizamiento',
      'Tabla de posiciones anónima sobre Firebase',
      'Todos los modos funcionan sin conexión'
    ],
    legalLangs: ['es', 'en']
  },
  {
    slug: 'go-game-baduk-weiqi-board',
    name: 'Baduk',
    tagline: 'El juego de Go, con motor de inteligencia artificial en el dispositivo.',
    status: 'development',
    appId: '6794784391',
    platforms: ['iPhone', 'iPad'],
    tech: ['Flutter', 'Firebase'],
    year: '2026',
    role: 'Diseño, desarrollo y publicación',
    description: 'El milenario juego de estrategia: rodea y controla más territorio que tu rival. La inteligencia artificial se ejecuta en el propio dispositivo, sin necesidad de conexión.',
    highlights: [
      'Motor de IA local, sin servidor de por medio',
      'Reto diario, torneos y clasificación',
      'Tamaño de tablero y reglas configurables'
    ],
    legalLangs: ['es']
  }
];

module.exports = { SITE, SERVICES, HOW_WE_WORK, PROJECTS };
