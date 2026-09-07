# myorange.agency

Sitio estático de **Orange Agencia**, estudio de desarrollo de software y aplicaciones
móviles. Presenta los servicios, el portafolio y aloja la documentación legal que la
App Store exige para cada app publicada.

## Estructura

```
index.html                        home de la agencia
404.html                          página de error (ErrorDocument del .htaccess)
.htaccess                         sin autoindex, 301 de la ruta antigua de Blockmix, HTTPS
assets/styles.css                 hoja de estilos
data/site.js                      datos del sitio: servicios y portafolio
data/legal/<slug>/                textos legales verificados de cada app
data/legal/_plantilla/            respaldo cuando una app no tiene texto propio
tools/import-legal.js             convierte los .txt de una app a HTML
build.js                          generador
juegos/index.html                 portafolio
juegos/<slug>/index.html          página de proyecto
juegos/<slug>/privacidad.html     política de privacidad (ES + EN)
juegos/<slug>/terminos.html       términos y EULA (ES + EN)
juegos/<slug>/contacto.html       soporte y contacto (ES + EN)
```

## Regenerar

```bash
node build.js
```

Sin dependencias. Avisa por consola de qué documentos legales se están publicando con la
plantilla genérica en lugar del texto verificado de la app.

## Reglas que no se pueden romper

**Las rutas legales de las apps ya publicadas están declaradas en App Store Connect y
dentro de los binarios.** Si una cambia o deja de responder 200, Apple rechaza la app por
la Guideline 5.1.1. Afecta a `deducta-sudoku`, `solitaire-klondike-spider` y
`asly-tic-tac-toe-xo-gomoku`.

**La ruta antigua de Blockmix mantiene un 301 indefinido.** Hay un binario en revisión
cuyos enlaces apuntan a `/juegos/block-puzzle-blockmix-trio/`. La regla vive en el
`.htaccess` y hay además páginas de redirección de respaldo en esa carpeta.

**Cada página legal contiene las dos versiones, español e inglés**, en el mismo documento
con anclas `#es` y `#en`. La app enlaza a una URL fija por documento y no puede elegir
idioma.

**Los textos legales se publican literalmente.** La copia web y la copia empotrada en la
app tienen que decir lo mismo.

## Añadir o actualizar los textos legales de una app

```bash
node tools/import-legal.js <slug> <directorio-con-los-txt>
node build.js
```

Busca `privacy_es.txt`, `privacy_en.txt`, `terms_es.txt` y `terms_en.txt`.

## Pendiente

Publicadas con la plantilla genérica, a la espera del texto verificado de cada app:
`solitaire-klondike-spider`, `asly-tic-tac-toe-xo-gomoku`, `go-game-baduk-weiqi-board`, y
la versión en inglés de `deducta-sudoku`.
