# store-game

Sitio estático de **Store Gaming Tech** — catálogo de reseñas técnicas de juegos de la
App Store, con una URL propia por juego y las páginas legales que exige App Store Connect.

## Estructura

```
index.html                        catálogo con filtros, orden y búsqueda
assets/styles.css                 hoja de estilos compartida
data/games.js                     fuente de datos (13 juegos)
build.js                          generador estático
juegos/<slug>/index.html          ficha: benchmarks, pros/contras, veredicto
juegos/<slug>/privacidad.html     política de privacidad
juegos/<slug>/terminos.html       términos de uso y EULA
juegos/<slug>/marketing.html      página de marketing
juegos/<slug>/contacto.html       soporte, FAQ y contacto
```

## Regenerar el sitio

```bash
node build.js
```

Genera 66 páginas (1 catálogo + 13 juegos × 5 páginas). No necesita dependencias.

## Añadir o editar un juego

Todo el contenido vive en [`data/games.js`](data/games.js). Añade una entrada al array
`GAMES` y relanza `node build.js`: el catálogo, la ficha y las cuatro páginas legales se
crean solas.

Los campos `bench`, `pros`, `cons` y `verdict` alimentan la ficha técnica. `own: true`
marca las apps propias, y `appStore` / `appId` enlazan con su ficha real en la tienda.

## Plantillas legales

Las páginas de privacidad, términos, marketing y soporte son **genéricas y reutilizables**
para cualquier aplicación publicada en la App Store: hablan de identificador de instalación,
sesión anónima, publicidad no personalizada, compras liquidadas por Apple, renovación
automática de suscripciones, derecho de desistimiento de la UE y derechos RGPD.

El correo de contacto de todas ellas es `info@ddagencia.com` y se cambia en un solo sitio:
la constante `SITE` de `data/games.js`.

## Publicar

Al ser HTML estático sin build step, funciona en GitHub Pages tal cual: Settings → Pages →
rama `main`, carpeta `/root`.
