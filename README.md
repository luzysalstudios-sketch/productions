# Luz y Sal Productions · sitio web

Página de una sola pantalla de **Luz y Sal Productions**, la unidad de producción propia de Luz y Sal: contenido audiovisual original para comunicar a Cristo. Es HTML, CSS y JavaScript sin frameworks ni paso de build, pensado para GitHub Pages como sitio de proyecto.

- URL prevista: https://luzysalstudios-sketch.github.io/productions/
- Repositorio previsto: `luzysalstudios-sketch/productions`

## Estructura

```
index.html            Página principal
404.html              Página de error (misma estética)
.nojekyll             Evita que GitHub Pages procese el sitio con Jekyll
.gitignore            Excluye el kit (zip) y el prompt de trabajo
assets/css/styles.css Estilos; los colores son tokens en :root
assets/js/main.js     Menú móvil, año del footer y fade-in al hacer scroll
assets/logo/          SVG oficiales del logo (no modificar)
assets/img/           Favicons, icon-512 y og-image
```

## Verlo en local

Desde esta carpeta:

```bash
python -m http.server 8000
```

Luego abre http://localhost:8000/. También funciona abriendo `index.html` directamente.

## Editar

- **Textos:** están en `index.html`, ordenados por sección con un comentario arriba de cada una (`<!-- Hero -->`, `<!-- Propósito -->`, etc.). Cambia solo el texto entre etiquetas.
- **Colores:** solo en `:root`, al inicio de `assets/css/styles.css`. No agregues colores fuera de los tokens.
- **Enlaces:** Instagram aparece en cuatro lugares de `index.html` (hero, primera serie, tarjeta de Síguenos y footer) y en `sameAs` del JSON-LD. Busca `instagram.com` para encontrarlos.
- **Todas las rutas son relativas** (`assets/...`). No uses rutas que empiecen con `/`: el sitio vive en la subcarpeta `/productions/`.

## Placeholders pendientes

Números de línea obtenidos con `grep -n` sobre la versión actual de `index.html`.

| Dato | Archivo:línea | Estado actual |
|---|---|---|
| YouTube · botón del hero | `index.html:81-82` | Botón atenuado «YouTube · Próximamente» |
| YouTube · tarjeta de Síguenos | `index.html:282-283` | Tarjeta atenuada, sin enlace |
| YouTube · footer | `index.html:312-313` | Texto atenuado, sin enlace |
| YouTube · JSON-LD `sameAs` | `index.html:43` | Solo incluye Instagram |
| Fecha de estreno | `index.html:187` | Muestra «PRÓXIMAMENTE EN YOUTUBE» |
| Video del primer episodio | `index.html:192-196` | Bloque 16:9 comentado (`ID_DEL_VIDEO`) |
| Correo · línea de contacto | `index.html:290-291` | Oculta y comentada (`CORREO_CONTACTO`) |
| Correo · footer | `index.html:314` | Oculto y comentado |
| Enlace a Luz y Sal Commercial | `index.html:299` | Sin enlace; solo comentario |

Para volver a ubicarlos:

```bash
grep -n "PENDIENTE\|ESTRENO\|VIDEO: reemplazar" index.html
```

## Activar los datos cuando lleguen

### YouTube

1. En cada uno de los tres lugares marcados `YOUTUBE PENDIENTE`, reemplaza el elemento atenuado (`<span ...aria-disabled="true">` o `<div class="follow__card follow__card--disabled" ...>`) por el enlace que aparece en el comentario, y cambia `YOUTUBE_URL` por la URL real del canal.
2. En la tarjeta de Síguenos, el `<div>` pasa a ser `<a>`: cierra con `</a>` y quita la clase `follow__card--disabled`.
3. En el JSON-LD agrega la URL a `sameAs`:
   ```json
   "sameAs": [
     "https://www.instagram.com/luzysal_productions/",
     "https://www.youtube.com/@..."
   ]
   ```
   No pongas comentarios dentro del bloque JSON-LD: lo invalidan.

### Correo

1. En `#siguenos`, quita `<!-- CORREO PENDIENTE: ...` y el `-->` que rodean la línea de contacto.
2. En el footer, saca el `<li>` del comentario `CORREO PENDIENTE`.
3. Cambia `CORREO_CONTACTO` por el correo real en los dos lugares (en la línea de contacto aparece dos veces: en el `href` y en el texto visible).

### Fecha de estreno

En `#primera-serie`, cambia el texto de `<p class="status">` por `PRIMER VIDEO · LUNES 30 DE NOVIEMBRE DE 2026 · YOUTUBE` (se escribe en minúsculas o mayúsculas; el CSS lo pone en mayúsculas).

### Video del primer episodio

1. En `#primera-serie`, busca `<!-- VIDEO: reemplazar al publicar`.
2. Borra la línea del comentario de apertura, la instrucción que le sigue y el `-->` final, dejando solo el `<div class="video reveal">` con su `<iframe>`.
3. Cambia `ID_DEL_VIDEO` por el identificador del video (lo que va después de `v=` en la URL de YouTube). El dominio `youtube-nocookie.com` se mantiene.
4. Cuando el video esté publicado, conviene cambiar también la línea de estado por algo como «Ya disponible en YouTube» y activar YouTube (ver arriba).

### Luz y Sal Commercial

Cuando exista la página, en la banda «Parte de Luz y Sal» convierte «Luz y Sal Commercial» en un enlace (`<a href="...">Luz y Sal Commercial</a>`).

## Publicación en GitHub Pages

> No tocar el repositorio `enviados-costarica` ni crear un repositorio `luzysalstudios-sketch.github.io`.

1. En GitHub, crea el repositorio público `productions` en la cuenta `luzysalstudios-sketch`, sin README ni .gitignore.
2. Desde esta carpeta:
   ```bash
   git init -b main
   git add .
   git commit -m "Sitio inicial de Luz y Sal Productions"
   git remote add origin https://github.com/luzysalstudios-sketch/productions.git
   git push -u origin main
   ```
3. En el repositorio: **Settings → Pages → Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guarda.
4. Espera a que https://luzysalstudios-sketch.github.io/productions/ responda (uno o dos minutos).

## Notas técnicas

- `404.html` calcula la raíz del sitio con un pequeño script para que las rutas relativas funcionen aunque GitHub Pages la sirva en una ruta anidada (`/productions/a/b`). En local usa `./`.
- El fade-in solo se activa si carga el JavaScript (clase `js` en `<html>`) y se desactiva con `prefers-reduced-motion`.
- Breakpoints: 720 px (cuadrículas a dos columnas), 900 px (navegación en línea y hero a dos columnas) y 1024 px (márgenes de 64 px, pilares a cuatro columnas y método a cinco).
