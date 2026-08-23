// Datos de los 13 juegos del catálogo.
// Contenido de fichas, benchmarks, pros/contras y veredictos extraídos del
// espacio de reseñas de cada juego. Editar aquí y relanzar `node build.js`.

const SITE = {
  name: 'Store Gaming Tech',
  brand: 'Cuatro Señales',
  owner: 'Ing. Dustin Díaz',
  // Titular del copyright que aparece en el pie de todas las páginas.
  copyright: 'Orange Agencia',
  email: 'info@ddagencia.com',
  site: 'ingdustindiaz.com',
  updated: '17 de agosto de 2026',
  updatedEn: '17 August 2026'
};

const GAMES = [
  {
    slug: 'hades-netflix-edition',
    title: 'Hades · Netflix Edition',
    studio: 'Supergiant Games',
    cat: 'Acción',
    plats: ['iPhone', 'iPad'],
    rating: 9.9, reviews: 4500,
    desc: 'El galardonado roguelike de acción rápida en tu iPhone.',
    fps: 60, tech: 'Metal 3',
    old: 24.99, price: 0, today: true,
    bench: {
      cpu: 'A15 Bionic o superior',
      gfx: 'Metal 3',
      rt: 'No',
      battery: '9.2 / 10',
      gamepad: 'Excelente en táctil y mando físico',
      storage: '3.8 GB'
    },
    pros: [
      'Controles táctiles totalmente personalizables con respuesta háptica del Haptic Engine',
      'Sincronización instantánea de partidas en iCloud',
      '60 FPS ultra estables con bajo consumo térmico'
    ],
    cons: [
      'Exclusivo para suscriptores de Netflix Games',
      'No disponible actualmente para macOS'
    ],
    verdict: [
      'El príncipe del inframundo desafía a los dioses de la mitología griega en un combate frenético a 60 FPS fijos con controles táctiles personalizables.',
      'Supergiant Games logró una adaptación impecable para pantallas táctiles con retroalimentación háptica precisa. La versión para iOS se ejecuta a 60 imágenes por segundo constantes incluso con docenas de enemigos y efectos de magia en pantalla.'
    ]
  },
  {
    slug: 'sneaky-sasquatch',
    title: 'Sneaky Sasquatch',
    studio: 'RAC7 Games',
    cat: 'Aventura',
    plats: ['iPhone', 'iPad', 'Mac', 'Apple Arcade'],
    rating: 9.9, reviews: 15400,
    desc: 'La vida cotidiana de un Bigfoot en el ecosistema Apple.',
    fps: 120, tech: 'Metal 2',
    old: 4.99, price: 0, arcade: true, exclusive: true,
    bench: {
      cpu: 'Cualquier dispositivo Apple reciente',
      gfx: 'Metal 2',
      rt: 'No',
      battery: '9.9 / 10',
      gamepad: 'Mandos, teclado, mando de Apple TV y táctil',
      storage: '1.2 GB'
    },
    pros: [
      'Infinitas horas de diversión con física sandbox',
      'Sincronización instantánea entre iPhone, iPad, Mac, Apple TV y Vision Pro',
      'Cero anuncios y cero pagos dentro del juego'
    ],
    cons: [
      'Estilo gráfico simplificado pensado para accesibilidad universal'
    ],
    verdict: [
      'Vive como un Sasquatch: sigilo en campamentos, conduce coches, sé médico, alcalde o piloto de carreras en este fascinante sandbox familiar.',
      'Sneaky Sasquatch es el juego insignia de Apple Arcade. Con actualizaciones gratuitas constantes, ofrece sincronización en la nube impecable que te permite empezar a jugar en el Apple TV de la sala y continuar exactamente donde te quedaste en tu iPhone.'
    ]
  },
  {
    slug: 'resident-evil-4-remake',
    title: 'Resident Evil 4 Remake',
    studio: 'Capcom',
    cat: 'Acción',
    plats: ['iPhone', 'iPad', 'Mac'],
    rating: 9.8, reviews: 2890,
    desc: 'Terror de supervivencia con trazado de rayos nativo.',
    fps: 58, tech: 'Metal 3 + Hardware Ray Tracing',
    old: 59.99, price: 29.99,
    promo: 'RE4-APPSTORE-VIP',
    bench: {
      cpu: 'A17 Pro / M1 o superior',
      gfx: 'Metal 3 + Hardware Ray Tracing',
      rt: 'Sí (hardware)',
      battery: '8 / 10',
      gamepad: 'DualSense, Xbox Series X, Backbone One',
      storage: '62 GB'
    },
    pros: [
      'Trazado de rayos por hardware en A18 Pro y M3/M4',
      'Prueba inicial gratuita antes de desbloquear el juego completo',
      'Audio 3D espacial optimizado para AirPods Pro y Max'
    ],
    cons: [
      'Se recomienda mando de juego para la mejor precisión',
      'Calentamiento moderado en partidas prolongadas sin disipación'
    ],
    verdict: [
      'La obra maestra de Capcom adaptada con maestría a iPhone 15 Pro, 16 Pro y Macs M1/M2/M3/M4, con Ray Tracing por hardware en chips A18 Pro y M3/M4.',
      'El motor RE Engine brilla con fuerza en Apple Silicon. Capcom logró trasladar la experiencia completa de consola con iluminación global por Ray Tracing, texturas de alta resolución y soporte para controles con vibración háptica avanzada.'
    ]
  },
  {
    slug: 'lies-of-p',
    title: 'Lies of P',
    studio: 'NEOWIZ / Round8 Studio',
    cat: 'RPG',
    plats: ['Mac', 'Vision Pro'],
    rating: 9.8, reviews: 3400,
    desc: 'El aclamado Soulslike victoriano optimizado para Mac M3/M4.',
    fps: 110, tech: 'Metal 3 + Fast Geometry Pipeline',
    old: 59.99, price: 39.99,
    bench: {
      cpu: 'Apple M1 Pro / M2 / M3 / M4',
      gfx: 'Metal 3 + Fast Geometry Pipeline',
      rt: 'Sí (hardware)',
      battery: '8.8 / 10',
      gamepad: 'DualSense Edge, Xbox Elite 2',
      storage: '48 GB'
    },
    pros: [
      'Optimización magistral: 120 FPS fijos a resolución 4K con MetalFX',
      'Tiempos de carga casi instantáneos gracias al SSD unificado de Apple Silicon',
      'Modo cine de realidad inmersiva para Apple Vision Pro'
    ],
    cons: [
      'Solo disponible para Mac con Apple Silicon y Vision Pro',
      'Especialmente exigente en reflejos de alta resolución'
    ],
    verdict: [
      'Una retorcida versión de la historia de Pinocho en la ciudad de Krat, con rendimiento sobresaliente a 120 FPS en pantallas ProMotion de Mac.',
      'Lies of P está considerado uno de los ports a macOS más pulidos jamás lanzados en la Mac App Store. Con soporte nativo para monitores ultrapanorámicos, trazado de rayos y MetalFX, ofrece un tiempo de respuesta de mando impecable, crucial para los bloqueos perfectos.'
    ]
  },
  {
    slug: 'death-stranding-directors-cut',
    title: "Death Stranding Director's Cut",
    studio: '505 Games / Kojima Productions',
    cat: 'Aventura',
    plats: ['iPhone', 'iPad', 'Mac'],
    rating: 9.7, reviews: 1420,
    desc: 'El viaje definitivo de Kojima en Apple Silicon.',
    fps: 60, tech: 'Metal 3 + MetalFX Temporal',
    old: 39.99, price: 19.99,
    promo: 'CUATROSENALES-DS50',
    bench: {
      cpu: 'A17 Pro / A18 Pro / Apple M1 o superior',
      gfx: 'Metal 3 + MetalFX Temporal',
      rt: 'Sí (hardware)',
      battery: '7.8 / 10',
      gamepad: 'DualSense, Xbox Wireless, táctil en pantalla',
      storage: '54.2 GB'
    },
    pros: [
      'Renderizado nativo a 60 FPS mediante MetalFX Spatial y Temporal',
      'Compatibilidad total con mandos DualSense con respuesta háptica en Mac',
      'Sincronización de partidas en la nube mediante Universal Purchase'
    ],
    cons: [
      'Requiere más de 50 GB de almacenamiento libre',
      'Consumo elevado de batería en partidas de más de 2 horas en iPhone'
    ],
    verdict: [
      'Port directo de consola a iOS y macOS utilizando la potencia de Metal 3 y MetalFX Upscaling, con rendimiento nativo de 60 FPS en chips M-series y A17/A18 Pro.',
      "Death Stranding Director's Cut demuestra el verdadero potencial de Apple Silicon para los juegos AAA. La optimización mediante MetalFX Upscaling, tanto espacial como temporal, permite renderizar paisajes desolados con una claridad asombrosa sin sacrificar la duración de la batería en iPhone 16 Pro o MacBook Pro M3."
    ]
  },
  {
    slug: 'fantasian-neo-dimension',
    title: 'Fantasian Neo Dimension',
    studio: 'Mistwalker / Square Enix',
    cat: 'RPG',
    plats: ['iPhone', 'iPad', 'Mac', 'Apple Arcade'],
    rating: 9.5, reviews: 3120,
    desc: 'El JRPG hecho a mano por el creador de Final Fantasy.',
    fps: 120, tech: 'Metal 2.4',
    old: 19.99, price: 0, arcade: true,
    bench: {
      cpu: 'A14 Bionic / M1 o superior',
      gfx: 'Metal 2.4',
      rt: 'No',
      battery: '9.5 / 10',
      gamepad: 'Táctil, DualSense, Xbox, MFi',
      storage: '8.5 GB'
    },
    pros: [
      'Escenarios construidos con dioramas reales escaneados en 3D',
      'Banda sonora original completa compuesta por Nobuo Uematsu',
      'Incluido en Apple Arcade sin micropagos ni anuncios'
    ],
    cons: [
      'Curva de dificultad elevada en la segunda mitad del juego',
      'Combate por turnos tradicional que puede no gustar a todos'
    ],
    verdict: [
      'Dioramas reales fotografiados en 3D con música de Nobuo Uematsu, disponible en Apple Arcade sin compras dentro de la app.',
      'Hironobu Sakaguchi creó más de 150 dioramas hechos a mano para construir los escenarios de Fantasian. Corriendo a 120 FPS fluidos en pantallas ProMotion de iPad Pro e iPhone Pro, es una de las joyas visuales más exclusivas de la tienda.'
    ]
  },
  {
    slug: 'grid-legends-deluxe-edition',
    title: 'GRID Legends Deluxe Edition',
    studio: 'Feral Interactive / Codemasters',
    cat: 'Simulación',
    plats: ['Mac', 'iPad'],
    rating: 9.4, reviews: 880,
    desc: 'Carreras automovilísticas a alta velocidad con MetalFX.',
    fps: 90, tech: 'Metal 3',
    old: 39.99, price: 14.99,
    promo: 'GRID-50-CUATRO',
    bench: {
      cpu: 'M1 / M2 / M3 / M4 o iPad Pro M-series',
      gfx: 'Metal 3',
      rt: 'No',
      battery: '8.4 / 10',
      gamepad: 'Volantes con force feedback, mandos inalámbricos, táctil',
      storage: '32.4 GB'
    },
    pros: [
      'Soporte completo para volantes Logitech y Thrustmaster en Mac',
      'Multijugador multiplataforma de baja latencia',
      'Opciones gráficas detalladas en iPad Pro (Calidad vs Rendimiento 120 FPS)'
    ],
    cons: [
      'Requiere almacenamiento SSD veloz para evitar tirones de carga de texturas'
    ],
    verdict: [
      'Compite en circuitos urbanos e icónicos de todo el mundo con física realista, clima dinámico y modo historia con actores reales.',
      'Feral Interactive volvió a superar las expectativas adaptando GRID Legends con tecnología MetalFX. El rendimiento en iPad Pro M2/M4 alcanza los 120 Hz con reflejos en tiempo real y una sensación de velocidad máxima.'
    ]
  },
  {
    slug: 'assassins-creed-mirage',
    title: "Assassin's Creed Mirage",
    studio: 'Ubisoft',
    cat: 'Aventura',
    plats: ['iPhone', 'iPad', 'Mac'],
    rating: 9.3, reviews: 1100,
    desc: 'Sigilo clásico en Bagdad del siglo IX para iOS y Mac.',
    fps: 45, tech: 'Metal 3 + MetalFX Spatial',
    old: 49.99, price: 24.99,
    promo: 'MIRAGE-APPLE2026',
    bench: {
      cpu: 'A17 Pro / A18 Pro / M1 o superior',
      gfx: 'Metal 3 + MetalFX Spatial',
      rt: 'Sí (hardware)',
      battery: '7.5 / 10',
      gamepad: 'DualSense, Xbox, Razer Kishi',
      storage: '38.5 GB'
    },
    pros: [
      'Experiencia completa de consola en iPhone 15/16 Pro y Mac M-series',
      'Mapas detallados con cientos de PNJ simultáneos en pantalla',
      'Compra universal: una sola adquisición para iPhone, iPad y Mac'
    ],
    cons: [
      'La pantalla táctil resulta incómoda para parkour complejo; requiere mando',
      'Ocupa cerca de 40 GB'
    ],
    verdict: [
      'Acompaña a Basim en un homenaje a los orígenes del sigilo, con un port completo ejecutable en el bolsillo y gráficos de nivel consola.',
      'Ubisoft aprovecha las capacidades de MetalFX Upscaling para renderizar la vibrante ciudad de Bagdad. El juego destaca por su densidad de multitudes y sus sombras dinámicas sin caídas pronunciadas de fotogramas.'
    ]
  },
  {
    slug: 'deducta-sudoku',
    title: 'Deducta Sudoku',
    studio: 'Ing. Dustin Díaz · Cuatro Señales',
    cat: 'Estrategia',
    // Solo iPhone, según la documentación verificada contra la app.
    plats: ['iPhone'],
    // Sin valoraciones todavía en la App Store.
    rating: 0, reviews: 0,
    desc: 'Un sudoku de deducción pura: cada tablero se resuelve sin adivinar.',
    fps: 120, tech: 'Metal 3 Nativo',
    old: 0, price: 0,
    own: true,
    appId: '1550244179',
    appStore: 'https://apps.apple.com/us/app/sudoku-classic-number-puzzle/id1550244179',
    bench: {
      cpu: 'iPhone con iOS 15.0 o posterior',
      gfx: 'Metal 3 Nativo',
      rt: 'No',
      battery: 'Sin conexión salvo publicidad; las suscripciones la retiran',
      gamepad: 'Táctil',
      storage: '31,3 MB'
    },
    pros: [
      'Cada tablero tiene solución única verificada y se puede resolver sin adivinar',
      'Escalera de explicaciones y árbol de habilidades que enseñan la técnica, con informe al terminar',
      'Sin cuentas ni registro: no pide datos personales y no hay servidores de por medio',
      'Los anuncios son siempre no personalizados y nunca aparecen sobre el tablero'
    ],
    cons: [
      'Disponible solo para iPhone',
      'El progreso vive únicamente en el dispositivo: desinstalar la app lo borra',
      'Las bandas Difícil y Experto y la biblioteca de técnicas requieren la suscripción VIP'
    ],
    verdict: [
      'Un sudoku que se toma en serio la deducción: cada tablero se verifica antes de servirlo para garantizar solución única y que baste la lógica, sin conjeturas. La escalera de explicaciones enseña la técnica en lugar de limitarse a dar el número.',
      'Funciona íntegramente en el dispositivo, sin cuentas, sin servidores y sin copia en la nube. El nivel gratuito muestra anuncios no personalizados de AdMob; las suscripciones VIP y Sin anuncios los retiran, y VIP añade las bandas Difícil y Experto, la biblioteca de técnicas, los tableros de práctica dirigida, el histórico de informes y las pistas sin límite.'
    ]
  },
  {
    slug: 'monument-valley-2',
    title: 'Monument Valley 2',
    studio: 'ustwo games',
    cat: 'Estrategia',
    plats: ['iPhone', 'iPad', 'Apple Arcade'],
    rating: 4.9, reviews: 48900,
    desc: 'Una deslumbrante aventura de rompecabezas de geometría imposible.',
    fps: 120, tech: 'Metal 2',
    old: 4.99, price: 1.99, arcade: true,
    promo: 'USTWO-OFFER-2026',
    bench: {
      cpu: 'Cualquier iPhone o iPad moderno',
      gfx: 'Metal 2',
      rt: 'No',
      battery: '9.8 / 10',
      gamepad: 'Táctil y ratón',
      storage: '0.8 GB'
    },
    pros: [
      'Ganador del Apple Design Award con dirección artística impecable',
      'Audio inmersivo diseñado especialmente para AirPods',
      'Experiencia accesible para todas las edades y sin anuncios'
    ],
    cons: [
      'Duración relativamente corta: entre 2 y 3 horas de juego'
    ],
    verdict: [
      'Guía a una madre y a su hija en un viaje a través de arquitecturas ilógicas, descubriendo caminos ilusionistas y rompecabezas poéticos.',
      'Ganador de múltiples Apple Design Awards, Monument Valley 2 destaca por su estética minimalista inspirada en M. C. Escher, su audio espacial reflexivo y un arte limpio que se ve radiante en las pantallas Liquid Retina XDR de iPad Pro y MacBook.'
    ]
  },
  {
    slug: 'asly-tic-tac-toe-xo-gomoku',
    title: 'Asly: Tic Tac Toe XO Gomoku',
    studio: 'Asly Studio',
    cat: 'Estrategia',
    plats: ['iPhone', 'iPad'],
    rating: 4.9, reviews: 500,
    desc: 'Cinco formas de jugar al tres en raya en un tablero que por fin se siente bien bajo el pulgar.',
    fps: 60, tech: 'Metal 2',
    old: 0, price: 0, today: true,
    own: true,
    appId: '6788191425',
    appStore: 'https://apps.apple.com/us/app/id6788191425',
    bench: {
      cpu: 'Cualquier dispositivo Apple reciente',
      gfx: 'Metal 2',
      rt: 'No',
      battery: '9.5 / 10',
      gamepad: 'Táctil',
      storage: '0.2 GB'
    },
    pros: [
      'Cinco modos de juego distintos: Ultimate, Gomoku, Misère y Blitz',
      'Tableros flexibles de 3×3 hasta 5×5',
      'IA sólida con tres niveles de dificultad'
    ],
    cons: [
      'Se centra en un género clásico; puede no atraer a quien busca acción o RPG'
    ],
    verdict: [
      'Asly toma el juego que todo el mundo conoce y le da cuatro vidas más — Ultimate, Gomoku, Misère y Blitz — con tableros que crecen de 3×3 a 5×5 y una IA que deja de ponértelo fácil.',
      'Asly reinterpreta el clásico tres en raya con modos y tamaños de tablero variados, ofreciendo tanto partidas rápidas casuales como profundidad estratégica. Su tablero limpio y sin distracciones lo hace perfecto para jugar sobre la marcha.'
    ]
  },
  {
    slug: 'solitaire-klondike-spider',
    title: 'Solitaire · Klondike & Spider',
    studio: 'Solitaire Studio',
    cat: 'Estrategia',
    plats: ['iPhone', 'iPad', 'Mac'],
    rating: 4.8, reviews: 18900,
    desc: 'El clásico juego de cartas definitivo optimizado a 120 Hz ProMotion.',
    fps: 120, tech: 'Metal 2.0',
    old: 4.99, price: 0, today: true,
    own: true,
    appId: '1579977123',
    appStore: 'https://apps.apple.com/us/app/id1579977123',
    promo: 'SOLITAIRE-VIP-2026',
    bench: {
      cpu: 'Todos los iPhone e iPad con iOS 14.0 o posterior',
      gfx: 'Metal 2.0',
      rt: 'No',
      battery: '10 / 10',
      gamepad: 'Táctil, ratón, trackpad y teclado',
      storage: '0.15 GB'
    },
    pros: [
      'Animaciones de reparto y triunfo hiperfluidas a 120 Hz en pantallas ProMotion',
      'Modos Klondike (1 o 3 cartas) y Spider (1, 2 o 4 palos) con pistas ilimitadas',
      'Bajo consumo de batería y modo oscuro integrado adaptado a iOS'
    ],
    cons: [
      'Enfocado en partidas casuales, sin modo multijugador en tiempo real'
    ],
    verdict: [
      'Una experiencia pulida y relajante de los solitarios Klondike y Spider, con animaciones ultrafluidas a 120 Hz, temas personalizables y cero distracciones.',
      'Esta versión aprovecha la renderización eficiente de Metal 2 en iOS y macOS para ofrecer respuesta táctil instantánea, animaciones de cartas a 120 FPS fijos y consumo mínimo de energía. Incluye desafíos diarios y soporte para ratón y trackpad en iPadOS y macOS.'
    ]
  },
  {
    slug: 'genshin-impact',
    title: 'Genshin Impact',
    studio: 'HoYoverse',
    cat: 'RPG',
    plats: ['iPhone', 'iPad', 'Mac'],
    rating: 4.7, reviews: 325000,
    desc: 'Aventura de mundo abierto a 120 FPS en iPad Pro y iPhone 16 Pro.',
    fps: 115, tech: 'Metal 3 + MetalFX Spatial',
    old: 0, price: 0, today: true,
    promo: 'GENSHIN-APPLE-GIFT',
    bench: {
      cpu: 'A17 Pro / A18 Pro / M1 o superior',
      gfx: 'Metal 3 + MetalFX Spatial',
      rt: 'No',
      battery: '7.9 / 10',
      gamepad: 'DualSense, Xbox Series X, táctil',
      storage: '31.8 GB'
    },
    pros: [
      'Modo gráfico a 120 FPS único en la App Store para dispositivos Apple Pro',
      'Sincronización de progreso multiplataforma mediante HoYoverse Pass',
      'Soporte completo para mandos DualSense y Xbox Wireless Controller'
    ],
    cons: [
      'Requiere más de 30 GB tras descargar todos los datos',
      'Consumo térmico elevado en sesiones largas a máxima tasa de refresco'
    ],
    verdict: [
      'Explora el vasto mundo de Teyvat en este RPG de acción con gráficos anime de vanguardia y soporte exclusivo de 120 FPS en dispositivos con Apple Silicon.',
      'HoYoverse trabajó junto a ingenieros de Apple para desbloquear el modo exclusivo de 120 FPS en iPad Pro M2/M4 e iPhone 15/16 Pro. Las sombras de alta definición y la distancia de dibujado compiten directamente con consolas de última generación.'
    ]
  }
];

GAMES.push({
  slug: 'go-game-baduk-weiqi-board',
  title: 'Go Game · Baduk Weiqi Board',
  studio: 'Ing. Dustin Díaz · Cuatro Señales',
  cat: 'Estrategia',
  plats: ['iPhone', 'iPad'],
  // Sin reseñas todavía: la app aún no está publicada en la App Store.
  rating: 0, reviews: 0, soon: true,
  desc: 'El milenario juego de estrategia chino: rodea y controla más territorio que tu rival.',
  fps: 120, tech: 'Metal 2',
  old: 0, price: 0,
  own: true,
  appId: '6794784391',
  appStore: 'https://apps.apple.com/us/app/go-game-baduk-weiqi-board/id6794784391',
  intro: 'El Go —conocido como weiqi en chino o baduk en coreano— es un milenario juego de mesa y estrategia para dos personas originario de China, con más de 2500 años de historia. Se juega sobre una cuadrícula con fichas llamadas piedras, negras y blancas, y el objetivo principal es rodear y controlar la mayor cantidad de territorio posible en el tablero.',
  bench: {
    cpu: 'Por confirmar en el lanzamiento',
    gfx: 'Metal 2',
    rt: 'No',
    battery: 'Por confirmar en el lanzamiento',
    gamepad: 'Táctil',
    storage: 'Por confirmar en el lanzamiento'
  },
  howto: [
    ['El tablero', 'Una cuadrícula de 19×19 líneas. Las piedras se colocan sobre las intersecciones, no dentro de las casillas. Los tableros de 9×9 y 13×13 se usan para partidas más cortas y para aprender.'],
    ['Los turnos', 'Las negras abren la partida y después se alterna. En tu turno colocas una piedra en cualquier intersección libre, o pasas. Las piedras no se mueven una vez colocadas.'],
    ['Las capturas', 'Las intersecciones vacías que tocan a un grupo son sus libertades. Cuando un grupo se queda sin ninguna, queda rodeado y se retira del tablero.'],
    ['El final', 'La partida termina cuando ambos jugadores pasan seguidos. Gana quien haya rodeado más territorio, sumando las piedras capturadas al rival.']
  ],
  pros: [
    'Inteligencia artificial que se ejecuta en el propio dispositivo, sin necesidad de conexión',
    'Reto diario, torneos contra la IA y clasificación de jugadores',
    'Tamaño de tablero, reglas, sonido, vibración y accesibilidad configurables',
    'Tableros, fondos, marcos y títulos desbloqueables con monedas del juego'
  ],
  cons: [
    'La curva de aprendizaje del Go es exigente para quien empieza desde cero',
    'La clasificación y la copia del progreso requieren conexión'
  ],
  verdict: [
    'Un Go completo para iPhone y iPad: partidas contra una IA local, reto diario, torneos y clasificación, con la profundidad de un juego con más de 2500 años de historia.',
    'La versión gratuita se financia con anuncios no personalizados y ofrece una suscripción anual que los elimina y añade funciones VIP, entre ellas la revisión de tus partidas. El juego funciona sin conexión: solo la clasificación y la copia del progreso necesitan internet.'
  ]
});

GAMES.push({
  slug: 'block-puzzle-blockmix-trio',
  title: 'Block Puzzle: Blockmix Trio',
  studio: 'Ing. Dustin Díaz · Cuatro Señales',
  cat: 'Estrategia',
  plats: ['iPhone', 'iPad'],
  // Sin reseñas todavía: la app aún no está publicada en la App Store.
  rating: 0, reviews: 0, soon: true,
  desc: 'Tres piezas por ronda: encájalas en la cuadrícula y despeja líneas antes de quedarte sin hueco.',
  fps: 60, tech: 'Metal 2',
  old: 0, price: 0,
  own: true,
  lang: 'en',
  appId: '6801892843',
  appStore: 'https://apps.apple.com/us/app/blockmix-puzzle-trio/id6801892843',
  intro: 'Blockmix Trio es un rompecabezas de bloques: en cada ronda recibes tres piezas y debes encajarlas en la cuadrícula. Cada fila o columna que completas se despeja y te devuelve espacio. No hay reloj ni cuenta atrás: la partida termina cuando ninguna de las tres piezas cabe en el tablero, así que cada colocación es una decisión sobre el hueco que dejas para la siguiente.',
  // Versión en inglés: este juego publica todas sus páginas en ese idioma.
  catEn: 'Puzzle',
  descEn: 'Three pieces per round: fit them into the grid and clear lines before you run out of room.',
  introEn: 'Blockmix Trio is a block puzzle: every round hands you three pieces to fit into the grid. Each row or column you complete clears out and gives the space back. There is no clock and no countdown — the game ends when none of the three pieces fits any more, so every placement is really a decision about the gap you leave for the next one.',
  benchEn: {
    cpu: 'To be confirmed at launch',
    battery: 'To be confirmed at launch',
    storage: 'To be confirmed at launch',
    gamepad: 'Touch'
  },
  prosEn: [
    'Short games you can pick up and drop at any moment, with no timer and no pressure',
    'Rules you grasp in ten seconds and a hard decision on every turn',
    'Plays one-handed, in portrait, and works offline'
  ],
  consEn: [
    'The genre rewards planning: placing on impulse ends the game quickly',
    'No verified performance figures until the app is published'
  ],
  verdictEn: [
    'A classic block puzzle that knows exactly what it is: three pieces a round, a grid that keeps filling up, and the tension of working out whether what comes next will still fit.',
    'The appeal of the genre is foresight rather than dexterity, which is why it works so well in odd spare moments. With no clock running, a game lasts exactly as long as your planning holds up.'
  ],
  howtoEn: [
    ['The grid', 'Pieces are placed on an empty grid. They cannot be rotated, and once placed they stay where they are.'],
    ['Three at a time', 'Each round gives you three pieces. You may place them in any order, and a new set arrives only once all three are down.'],
    ['Clearing lines', 'Complete a full row or column and it clears, freeing the space back up for what comes next.'],
    ['The end', 'The game is over when none of the pieces you are holding fits anywhere on the grid.']
  ],
  bench: {
    cpu: 'Por confirmar en el lanzamiento',
    gfx: 'Metal 2',
    rt: 'No',
    battery: 'Por confirmar en el lanzamiento',
    gamepad: 'Táctil',
    storage: 'Por confirmar en el lanzamiento'
  },
  pros: [
    'Partidas cortas que se retoman en cualquier momento, sin temporizador ni presión',
    'Reglas que se entienden en diez segundos y una decisión difícil en cada turno',
    'Se juega con una sola mano, en vertical y sin conexión'
  ],
  cons: [
    'El género recompensa la planificación: colocar por impulso acaba pronto la partida',
    'Sin datos de rendimiento verificados hasta que la app esté publicada'
  ],
  verdict: [
    'Un block puzzle clásico y bien entendido: tres piezas por ronda, una cuadrícula que se llena y la tensión de calcular si lo que te den después va a caber.',
    'La gracia del género no está en la destreza sino en la previsión, y por eso funciona tan bien en ratos sueltos. Al no haber reloj, la partida dura exactamente lo que dure tu planificación.'
  ]
});

const DEVICES = [
  { name: 'iPhone 16 Pro Max', os: 'iOS 18.2', game: "Death Stranding Director's Cut", when: 'Hace 5 minutos' },
  { name: 'MacBook Pro 16" (M4 Max)', os: 'macOS Sequoia 15.1', game: 'Lies of P', when: 'Hace 1 hora' },
  { name: 'iPad Pro 13" (M4 ProMotion)', os: 'iPadOS 18.2', game: 'Fantasian Neo Dimension', when: 'Ayer' }
];

module.exports = { SITE, GAMES, DEVICES };
