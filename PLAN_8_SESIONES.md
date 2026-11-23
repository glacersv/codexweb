# GRID/LAB — Plan de 8 sesiones para alumnos de 12 a 16 años

> Martes y jueves, 08:00–09:30. **Punto de partida: cero conocimiento.**
> Cada sesión introduce pocas ideas nuevas y termina con un archivo que el alumno puede mostrar.

## Reglas del curso

1. Una sesión = una idea principal + dos o tres ideas de apoyo. Nada de "temas avanzados".
2. Explicar con **código roto** que el alumno arregla, antes que con teoría.
3. Cada sesión deja **un archivo real** descargable y, al final, publicable.
4. Vocabulario nuevo siempre en lenguaje de alumno, con un ejemplo visible al lado.
5. Los logros se ganan con comprobaciones reales (archivo creado, etiqueta usada, botón que responde), no con insignias decorativas.

## Estructura de los 90 minutos

| Tiempo | Qué pasa |
|---|---|
| 10 min | Reto corto: "haz que esto funcione" (empiezan desde el código de la clase anterior) |
| 25 min | Explicación con un ejemplo roto, arreglado en pantalla línea por línea |
| 40 min | Construcción guiada: el alumno escribe su propio archivo |
| 15 min | Demo: 3 alumnos muestran su archivo y el grupo dice qué funcionó |

---

## Sesión 1 (martes) — Mi primera página

**Idea nueva:** una página web es un archivo de texto que el navegador lee.

- Qué es un archivo `.html` y cómo abrirlo.
- `<!DOCTYPE html>`, `<html lang="es">`, `<head>`, `<title>`, `<body>`.
- Etiquetas de apertura y cierre: `<h1>Mi nombre</h1>`, `<p>Texto</p>`.
- Reto: escribir tu nombre, tu edad y tres cosas que te gustan.
- **Entregable:** `mi-perfil.html`.
- **Al terminar sabe:** abrir un HTML en el navegador y reconocer dónde empieza y termina una etiqueta.

## Sesión 2 (jueves) — Darle estructura

**Idea nueva:** las etiquetas tienen significado, no solo se ven distinto.

- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- Atributos: `class`, `href` para enlaces, `src` y `alt` para imágenes.
- Reto: convertir `mi-perfil.html` en una página con cabecera, sección y pie.
- **Entregable:** `mi-perfil-v2.html`.
- **Al terminar sabe:** explicar por qué `<main>` es mejor que un `<div>` para el contenido principal.

## Sesión 3 (martes) — Mi tarjeta de jugador

**Idea nueva:** CSS cambia el aspecto sin cambiar el HTML.

- Archivo `estilos.css` y `<link rel="stylesheet">`.
- Selectores por etiqueta y por clase: `h1 { }`, `.tarjeta { }`.
- `color`, `background`, `padding`, `border-radius`, `:hover`.
- Reto: crear una tarjeta con nombre, avatar y tres datos ("stats").
- **Entregable:** `tarjeta.html` + `estilos.css`.
- **Al terminar sabe:** separar estructura (HTML) de diseño (CSS) y usar una clase.

## Sesión 4 (jueves) — Retículas sin dolor

**Idea nueva:** el navegador puede acomodar cajas por filas y columnas.

- `box-sizing: border-box` y las cuatro capas: contenido, padding, borde, margin.
- `display: grid`, `grid-template-columns: repeat(3, 1fr)`, `gap`.
- `grid-column: 1 / 3` para que una caja ocupe dos columnas.
- Reto: poner tres tarjetas en fila y destacar una a lo ancho.
- **Entregable:** `reticula.html`.
- **Al terminar sabe:** contar columnas y escribir una retícula de tres columnas sin copiarla.

## Sesión 5 (martes) — Que funcione en el celular

**Idea nueva:** la misma página debe verse bien en pantallas pequeñas.

- `<meta name="viewport">` (ya vista, ahora explicada).
- `display: flex` para alinear el menú en una fila.
- `@media (max-width: 600px)` para cambiar de 3 columnas a 1.
- Reto: que su sitio no tenga scroll horizontal a 375px.
- **Entregable:** el mismo sitio adaptado.
- **Al terminar sabe:** probar su página en dos anchos y arreglar el desbordamiento.

## Sesión 6 (jueves) — JavaScript paso 1: que responda un botón

**Idea nueva:** JavaScript permite cambiar la página después de cargarla.

- `<script>` y `console.log` para ver mensajes en la consola.
- `let nombre = "..."`, texto entre comillas y números.
- `document.querySelector("h1")` y `.textContent = "..."`.
- `addEventListener("click", ...)` para reaccionar a un clic.
- Reto: un botón que cambie el texto de un `<h1>`.
- **Entregable:** `interaccion.html`.
- **Al terminar sabe:** explicar la frase "un evento llama a una función" con su propio código.

## Sesión 7 (martes) — JavaScript paso 2: recordar la elección

**Idea nueva:** el código puede decidir y guardar un valor.

- `classList.toggle("clase")` para encender/apagar un estilo.
- `if (...) { ... } else { ... }` con una condición sencilla.
- `localStorage.setItem` y `getItem` para recordar el tema elegido.
- Reto: botón de tema claro/oscuro que siga funcionando al recargar.
- **Entregable:** `tema.html`.
- **Al terminar sabe:** leer y escribir un valor guardado y usarlo en un `if`.

## Sesión 8 (jueves) — Publicar y contar qué hicimos

**Idea nueva:** un sitio web existe de verdad cuando alguien más lo puede abrir.

- Crear un repositorio, subir los archivos y activar GitHub Pages.
- Comprobaciones sencillas: título, `alt` en imágenes, botones que funcionan, sin líneas horizontales.
- Presentación de 3 minutos: "esto es lo que hice, esto es lo que aprendí, esto cambiaría".
- Reto: pegar la URL pública en la galería de la clase.
- **Entregable:** URL pública + captura del sitio.
- **Al terminar sabe:** explicar con sus palabras la diferencia entre HTML, CSS y JavaScript.

---

## Mapa con el aplicativo GRID/LAB

| Sesión | Módulo en la app |
|---|---|
| 1–2 | Módulo 01 · Detector de retículas (convertir en "Mi primera página") |
| 3–4 | Módulo 02 · Constructor de retículas |
| 5 | Módulo 03 · Constructor de páginas |
| 6–7 | **Módulo 06 nuevo** · Laboratorio de JavaScript (muy básico) |
| 8 | Módulo 05 · Publicación y galería |

## Decisiones de rediseño

- Quitar frases de "autobombo técnico" y reemplazarlas por voz de docente: nombre, contacto, "martes y jueves 8:00–9:30".
- Cada tarjeta debe empezar con una pregunta que el alumno pueda responder ("¿Por qué se salió tu tarjeta?").
- Botones grandes, una sola acción principal por pantalla y explicaciones cortas.
- Sacar los `style="..."` del HTML a clases CSS: el propio sitio debe enseñar separación de responsabilidades.
- Galería de la clase con URLs guardadas en `localStorage`.
- Sin jerga: "retícula" se explica antes de usarse; "DOM" se llama "los elementos de la página" hasta la sesión 6.

## Alcance del módulo de JavaScript

Incluye: consola, variables, texto, eventos de clic, `classList.toggle`, `if` sencillo, `localStorage`.
No incluye: frameworks, fetch, promesas, async/await, módulos, TypeScript en el editor del alumno, animaciones avanzadas.
