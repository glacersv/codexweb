/* ==========================================================================
   CURRICULUM.TS — CONTENIDO DEL CURSO
   8 sesiones · martes y jueves · 08:00–09:30
   Punto de partida: los alumnos no saben nada de HTML, CSS ni JavaScript.
   ========================================================================== */

import type {
  MockupComponentSpec,
  QuizQuestion,
  RubricCriterion,
  SemanticBrushKey,
  SemanticBrushMeta,
  SessionPlan,
  XrayCaseSpec
} from '../types/course.js';

export const XRAY_CASES: XrayCaseSpec[] = [
  {
    id: 'CASO 1 · LA PÁGINA DE MI JUEGO',
    shortTag: 'CASO 1',
    targetCols: 3,
    targetRows: 3,
    presetToLoad: 'landing',
    explanation:
      'Mira esta página. Tiene 3 filas: arriba el menú, en medio el título grande y abajo tres tarjetas. Las tres tarjetas están en 3 columnas iguales.',
    renderMarkup: (showTags: boolean): string => `
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); grid-template-rows: 56px 190px 150px; gap:14px;">
        <div style="grid-column: 1 / 4; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:12px 16px; display:flex; align-items:center; justify-content:space-between;">
          <span style="font-family:var(--font-mono); font-weight:600; font-size:12px;">${showTags ? '&lt;header&gt; + &lt;nav&gt;' : 'MI JUEGO'}</span>
          <div style="display:flex; gap:12px; font-size:11px; color:var(--text-secondary);"><span>Inicio</span><span>Personajes</span><span style="color:var(--accent);">Jugar →</span></div>
        </div>
        <div style="grid-column: 1 / 4; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:24px; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;">
          <span class="mono-tag" style="color:var(--accent); margin-bottom:6px;">${showTags ? '&lt;main&gt; (ocupa 3 columnas)' : 'BIENVENIDO A MI MUNDO'}</span>
          <div style="font-size:20px; font-weight:700; letter-spacing:-0.02em;">Este es mi primer sitio web</div>
          <div style="font-size:12px; color:var(--text-secondary); margin-top:4px;">¿Cuántas columnas hay al fondo?</div>
        </div>
        <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:16px;">
          <div class="mono-tag">${showTags ? '&lt;article&gt; F3:C1' : '01 / MI NOMBRE'}</div>
          <div style="font-weight:600; margin-top:8px;">Sobre mí</div>
          <div style="font-size:11.5px; color:var(--text-secondary); margin-top:4px;">Una tarjeta, una columna.</div>
        </div>
        <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:16px;">
          <div class="mono-tag">${showTags ? '&lt;article&gt; F3:C2' : '02 / MIS JUEGOS'}</div>
          <div style="font-weight:600; margin-top:8px;">Lo que me gusta</div>
          <div style="font-size:11.5px; color:var(--text-secondary); margin-top:4px;">Otra tarjeta, otra columna.</div>
        </div>
        <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:16px;">
          <div class="mono-tag">${showTags ? '&lt;article&gt; F3:C3' : '03 / CONTACTO'}</div>
          <div style="font-weight:600; margin-top:8px;">Escríbeme</div>
          <div style="font-size:11.5px; color:var(--text-secondary); margin-top:4px;">Y la tercera.</div>
        </div>
      </div>
    `
  },
  {
    id: 'CASO 2 · MI TABLERO BENTO',
    shortTag: 'CASO 2',
    targetCols: 4,
    targetRows: 3,
    presetToLoad: 'bento',
    explanation:
      'Aquí hay 4 columnas y 3 filas. Fíjate en la caja grande: ocupa 2 columnas y 2 filas a la vez. A eso le decimos "fusionar celdas".',
    renderMarkup: (showTags: boolean): string => `
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); grid-template-rows: repeat(3, 130px); gap:14px;">
        <div style="grid-column: 1 / 3; grid-row: 1 / 3; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:20px; display:flex; flex-direction:column; justify-content:space-between;">
          <span class="mono-tag" style="color:var(--accent);">${showTags ? '&lt;main&gt; (2 columnas × 2 filas)' : 'MI PROYECTO PRINCIPAL'}</span>
          <div style="font-size:18px; font-weight:700;">Mi equipo de fútbol favorito</div>
        </div>
        <div style="grid-column: 3 / 5; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:16px;">
          <span class="mono-tag">${showTags ? '&lt;header&gt; (columnas 3–4)' : 'DATO CURIOSO'}</span>
          <div style="font-size:15px; font-weight:600; margin-top:8px;">Esta caja ocupa 2 columnas</div>
        </div>
        <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:16px;">
          <span class="mono-tag">${showTags ? '&lt;article&gt; (F2:C3)' : 'CAJA A'}</span>
          <div style="font-weight:600; margin-top:8px;">Caja pequeña</div>
        </div>
        <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:16px;">
          <span class="mono-tag">${showTags ? '&lt;aside&gt; (F2:C4)' : 'CAJA B'}</span>
          <div style="font-weight:600; margin-top:8px;">Otra caja</div>
        </div>
        <div style="grid-column: 1 / 5; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:16px; display:flex; align-items:center; justify-content:space-between;">
          <span class="mono-tag">${showTags ? '&lt;footer&gt; (las 4 columnas)' : 'ESTA VA DE LADO A LADO'}</span>
          <span class="mono-tag">4 × 3</span>
        </div>
      </div>
    `
  },
  {
    id: 'CASO 3 · UNA PÁGINA CON MENÚ LATERAL',
    shortTag: 'CASO 3',
    targetCols: 4,
    targetRows: 4,
    presetToLoad: 'dashboard',
    explanation:
      'El menú de la izquierda es una columna que baja las 4 filas. El resto de la página usa las otras 3 columnas. Cuenta primero, escribe después.',
    renderMarkup: (showTags: boolean): string => `
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); grid-template-rows: repeat(4, 96px); gap:12px;">
        <div style="grid-column: 1 / 2; grid-row: 1 / 5; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:14px;">
          <span class="mono-tag" style="color:var(--blueprint);">${showTags ? '&lt;nav&gt; (1 columna × 4 filas)' : 'MENÚ'}</span>
          <div style="margin-top:16px; display:flex; flex-direction:column; gap:8px; font-size:11.5px; color:var(--text-secondary);">
            <span>· Inicio</span><span>· Mis tarjetas</span><span>· Galería</span><span>· Contacto</span>
          </div>
        </div>
        <div style="grid-column: 2 / 5; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:14px; display:flex; align-items:center; justify-content:space-between;">
          <span class="mono-tag">${showTags ? '&lt;header&gt; (3 columnas)' : 'BARRA DE ARRIBA'}</span>
          <span class="badge-cohort">HOLA</span>
        </div>
        <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:12px;"><span class="mono-tag">TARJETA 1</span><div class="tabular" style="font-size:16px; font-weight:700; margin-top:4px;">01</div></div>
        <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:12px;"><span class="mono-tag">TARJETA 2</span><div class="tabular" style="font-size:16px; font-weight:700; margin-top:4px;">02</div></div>
        <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:12px;"><span class="mono-tag">TARJETA 3</span><div class="tabular" style="font-size:16px; font-weight:700; margin-top:4px;">03</div></div>
        <div style="grid-column: 2 / 5; grid-row: 3 / 5; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:16px;">
          <span class="mono-tag">${showTags ? '&lt;main&gt; (3 columnas × 2 filas)' : 'ZONA GRANDE DE CONTENIDO'}</span>
        </div>
      </div>
    `
  }
];

export const SEMANTIC_BRUSHES: Record<SemanticBrushKey, SemanticBrushMeta> = {
  header:  { key: 'header',  tag: 'header',  name: 'Cabecera',        color: '#FF5500', soft: 'rgba(255, 85, 0, 0.16)' },
  nav:     { key: 'nav',     tag: 'nav',     name: 'Menú',            color: '#38BDF8', soft: 'rgba(56, 189, 248, 0.16)' },
  main:    { key: 'main',    tag: 'main',    name: 'Contenido principal', color: '#10B981', soft: 'rgba(16, 185, 129, 0.16)' },
  aside:   { key: 'aside',   tag: 'aside',   name: 'Barra lateral',   color: '#F59E0B', soft: 'rgba(245, 158, 11, 0.16)' },
  article: { key: 'article', tag: 'article', name: 'Tarjeta',        color: '#A855F7', soft: 'rgba(168, 85, 247, 0.16)' },
  footer:  { key: 'footer',  tag: 'footer',  name: 'Pie de página',   color: '#EC4899', soft: 'rgba(236, 72, 153, 0.16)' },
  eraser:  { key: 'eraser',  tag: null,      name: 'Borrar celda',    color: '#71717A', soft: 'transparent' }
};

export const MOCKUP_COMPONENTS: MockupComponentSpec[] = [
  {
    id: 'nav',
    title: 'Cabecera con menú',
    tag: 'header',
    wireframeHtml: `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 12px; background:var(--bg-elevated); border-radius:4px;">
        <div style="width:68px; height:10px; background:var(--accent); border-radius:2px;"></div>
        <div style="display:flex; gap:8px;">
          <div style="width:36px; height:8px; background:var(--border-focus); border-radius:2px;"></div>
          <div style="width:36px; height:8px; background:var(--border-focus); border-radius:2px;"></div>
          <div style="width:48px; height:8px; background:var(--blueprint); border-radius:2px;"></div>
        </div>
      </div>`,
    semanticCode: `<header class="site-header">\n  <nav aria-label="Menú principal">\n    <a href="/" class="logo">MI SITIO</a>\n    <a href="#sobre-mi">Sobre mí</a>\n    <a href="#contacto">Contacto</a>\n  </nav>\n</header>`
  },
  {
    id: 'hero',
    title: 'Título grande con imagen',
    tag: 'section',
    wireframeHtml: `
      <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:12px; padding:12px; background:var(--bg-elevated); border-radius:4px; align-items:center;">
        <div style="display:flex; flex-direction:column; gap:6px;">
          <div style="width:85%; height:12px; background:var(--text-primary); border-radius:2px;"></div>
          <div style="width:65%; height:8px; background:var(--text-muted); border-radius:2px;"></div>
          <div style="width:72px; height:18px; background:var(--accent); border-radius:3px; margin-top:4px;"></div>
        </div>
        <div style="height:64px; background:var(--bg-interactive); border:1px dashed var(--border-focus); border-radius:4px; display:flex; align-items:center; justify-content:center; font-family:var(--font-mono); font-size:9px; color:var(--text-muted);">MI FOTO</div>
      </div>`,
    semanticCode: `<section class="hero">\n  <div>\n    <h1>Hola, soy [tu nombre]</h1>\n    <p>Esta es mi primera página web.</p>\n    <a href="#proyectos" class="btn">Ver mis proyectos</a>\n  </div>\n  <img src="mi-foto.jpg" alt="Foto de [tu nombre]" />\n</section>`
  },
  {
    id: 'bento3',
    title: 'Tres tarjetas en fila',
    tag: 'section',
    wireframeHtml: `
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px;">
        <div style="padding:10px; background:var(--bg-elevated); border-radius:4px;"><div style="width:18px; height:18px; background:var(--accent-soft); border:1px solid var(--accent); border-radius:3px; margin-bottom:6px;"></div><div style="width:80%; height:7px; background:var(--text-secondary); border-radius:2px;"></div></div>
        <div style="padding:10px; background:var(--bg-elevated); border-radius:4px;"><div style="width:18px; height:18px; background:var(--accent-soft); border:1px solid var(--accent); border-radius:3px; margin-bottom:6px;"></div><div style="width:80%; height:7px; background:var(--text-secondary); border-radius:2px;"></div></div>
        <div style="padding:10px; background:var(--bg-elevated); border-radius:4px;"><div style="width:18px; height:18px; background:var(--accent-soft); border:1px solid var(--accent); border-radius:3px; margin-bottom:6px;"></div><div style="width:80%; height:7px; background:var(--text-secondary); border-radius:2px;"></div></div>
      </div>`,
    semanticCode: `<section class="tarjetas">\n  <article class="card"><h3>Mi nombre</h3><p>Tengo [edad] años.</p></article>\n  <article class="card"><h3>Mi juego</h3><p>Me gusta jugar al fútbol.</p></article>\n  <article class="card"><h3>Mi comida</h3><p>La pizza con piña.</p></article>\n</section>`
  },
  {
    id: 'cta',
    title: 'Formulario sencillo',
    tag: 'section',
    wireframeHtml: `
      <div style="padding:12px; background:var(--bg-elevated); border-radius:4px; display:flex; justify-content:space-between; align-items:center; gap:10px;">
        <div style="width:45%; height:10px; background:var(--text-secondary); border-radius:2px;"></div>
        <div style="display:flex; gap:6px; flex:1;">
          <div style="flex:1; height:20px; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:3px;"></div>
          <div style="width:54px; height:20px; background:var(--blueprint); border-radius:3px;"></div>
        </div>
      </div>`,
    semanticCode: `<section id="contacto">\n  <h2>Escríbeme</h2>\n  <form>\n    <label for="correo">Tu correo</label>\n    <input id="correo" type="email" placeholder="nombre@correo.com" required />\n    <button type="submit">Enviar</button>\n  </form>\n</section>`
  },
  {
    id: 'footer',
    title: 'Pie de página',
    tag: 'footer',
    wireframeHtml: `
      <div style="display:flex; justify-content:space-between; padding:10px 12px; background:var(--bg-elevated); border-radius:4px;">
        <div style="width:90px; height:7px; background:var(--text-muted); border-radius:2px;"></div>
        <div style="width:60px; height:7px; background:var(--text-muted); border-radius:2px;"></div>
      </div>`,
    semanticCode: `<footer class="site-footer">\n  <small>Hecho por [tu nombre] · Clase de martes y jueves</small>\n</footer>`
  }
];

export const COURSE_SESSIONS: SessionPlan[] = [
  {
    id: 1,
    week: 'SESIÓN 01 · SEMANA 01',
    day: 'Martes · 08:00–09:30',
    title: 'Mi primera página web',
    status: 'done',
    detail: 'Un archivo de texto que el navegador sabe leer. Hoy escribimos el esqueleto que lleva toda página web.',
      newIdea: 'Un archivo .html es texto que el navegador sabe leer: tiene una estructura fija con DOCTYPE, html, head y body.',
      lab: 'mockup',
      file: 'mi-perfil.html',
    blocks: {
      teoria: '08:00–08:25 · Qué es un archivo .html. <!DOCTYPE html>, <html lang="es">, <head>, <title> y <body>.',
      practica: '08:25–09:10 · Escribimos mi-perfil.html: tu nombre, tu edad y tres cosas que te gustan.',
      entregable: '09:10–09:30 · Abrimos el archivo en el navegador y vemos el título en la pestaña.'
    }
  },
  {
    id: 2,
    week: 'SESIÓN 02 · SEMANA 01',
    day: 'Jueves · 08:00–09:30',
    title: 'Etiquetas que tienen significado',
    status: 'done',
    detail: 'No es lo mismo una caja cualquiera que <main>. Aprendemos a contarle al navegador qué es cada parte.',
      newIdea: 'Las etiquetas le dicen al navegador qué es cada parte de la página: header, nav, main, section, footer.',
      lab: 'mockup',
      file: 'mi-perfil-v2.html',
    blocks: {
      teoria: '08:00–08:25 · <header>, <nav>, <main>, <section> y <footer>. Atributos: class, href, src y alt.',
      practica: '08:25–09:10 · Convertimos mi-perfil.html en una página con cabecera, sección y pie.',
      entregable: '09:10–09:30 · Explicar con tus palabras por qué <main> es mejor que un <div>.'
    }
  },
  {
    id: 3,
    week: 'SESIÓN 03 · SEMANA 02',
    day: 'Martes · 08:00–09:30',
    title: 'Mi tarjeta de jugador',
    status: 'current',
    detail: 'CSS cambia el aspecto sin tocar el HTML. Hoy nace tu primer archivo de estilos y tu primera tarjeta.',
      newIdea: 'CSS cambia el aspecto sin tocar el HTML; un archivo estilos.css separado con clases.',
      lab: 'teoria',
      file: 'tarjeta.html',
    blocks: {
      teoria: '08:00–08:25 · <link> al archivo CSS, selectores por clase, color, background, padding y border-radius.',
      practica: '08:25–09:10 · Tarjeta con nombre, avatar y tres datos. Le añadimos :hover.',
      entregable: '09:10–09:30 · tarjeta.html + estilos.css abiertos juntos en el navegador.'
    }
  },
  {
    id: 4,
    week: 'SESIÓN 04 · SEMANA 02',
    day: 'Jueves · 08:00–09:30',
    title: 'Tres tarjetas en fila, sin copiar y pegar',
    status: 'upcoming',
    detail: 'El navegador acomoda cajas por filas y columnas. Descubrimos CSS Grid contando primero y escribiendo después.',
      newIdea: 'CSS Grid acomoda cajas por filas y columnas; contamos primero y escribimos el CSS después.',
      lab: 'grid',
      file: 'reticula.html',
    blocks: {
      teoria: '08:00–08:25 · La caja tiene 4 capas: contenido, padding, borde y margin. box-sizing: border-box.',
      practica: '08:25–09:10 · display: grid, grid-template-columns: repeat(3, 1fr) y gap. Una tarjeta ocupa 2 columnas con grid-column.',
      entregable: '09:10–09:30 · reticula.html con tres tarjetas alineadas y una más ancha.'
    }
  },
  {
    id: 5,
    week: 'SESIÓN 05 · SEMANA 03',
    day: 'Martes · 08:00–09:30',
    title: 'Que se vea bien en el celular',
    status: 'upcoming',
    detail: 'La misma página en dos tamaños. Probamos a 375 píxeles y arreglamos lo que se sale.',
      newIdea: 'La misma página se adapta al tamaño de la pantalla con la etiqueta viewport y @media.',
      lab: 'teoria',
      file: 'responsive.html',
    blocks: {
      teoria: '08:00–08:25 · La etiqueta viewport, Flexbox para alinear el menú y @media (max-width: 600px).',
      practica: '08:25–09:10 · De tres columnas a una sola cuando la pantalla es pequeña.',
      entregable: '09:10–09:30 · Tu sitio en dos anchos, sin scroll horizontal.'
    }
  },
  {
    id: 6,
    week: 'SESIÓN 06 · SEMANA 03',
    day: 'Jueves · 08:00–09:30',
    title: 'Un botón que de verdad hace algo',
    status: 'upcoming',
    detail: 'JavaScript entra aquí, con una sola idea: un evento llama a una función y la página cambia.',
      newIdea: 'JavaScript hace que la página reaccione: un evento llama a una función y el texto cambia.',
      lab: null,
      file: 'interaccion.html',
    blocks: {
      teoria: '08:00–08:25 · console.log, variables de texto y document.querySelector("h1").',
      practica: '08:25–09:10 · addEventListener("click", ...) y textContent para cambiar un título.',
      entregable: '09:10–09:30 · interaccion.html con un botón que responde al clic.'
    }
  },
  {
    id: 7,
    week: 'SESIÓN 07 · SEMANA 04',
    day: 'Martes · 08:00–09:30',
    title: 'Que recuerde lo que elegiste',
    status: 'upcoming',
    detail: 'El código puede decidir y guardar un valor. Hacemos un botón de tema claro y oscuro que siga funcionando al recargar.',
      newIdea: 'El código puede guardar un valor y recordarlo al recargar con localStorage.',
      lab: null,
      file: 'tema.html',
    blocks: {
      teoria: '08:00–08:25 · classList.toggle("clase"), if (...) sencillo y localStorage.setItem / getItem.',
      practica: '08:25–09:10 · Botón de tema que enciende y apaga una clase y guarda la elección.',
      entregable: '09:10–09:30 · Recargar la página y comprobar que el tema sigue igual.'
    }
  },
  {
    id: 8,
    week: 'SESIÓN 08 · SEMANA 04',
    day: 'Jueves · 08:00–09:30',
    title: 'Publicar y contar qué hicimos',
    status: 'upcoming',
    detail: 'Tu sitio existe de verdad cuando otra persona puede abrirlo. Hoy lo subimos y lo mostramos.',
      newIdea: 'Tu sitio existe de verdad cuando otra persona puede abrirlo con una URL pública.',
      lab: 'galeria',
      file: 'index.html',
    blocks: {
      teoria: '08:00–08:25 · Qué es un repositorio y qué hace GitHub Pages. Comprobaciones rápidas: título, alt y botones.',
      practica: '08:25–09:10 · Subir los archivos, activar Pages y copiar la URL pública.',
      entregable: '09:10–09:30 · Demo de 3 minutos: qué hice, qué aprendí, qué cambiaría.'
    }
  }
];

export const INITIAL_RUBRIC: RubricCriterion[] = [
  { id: 'r1', label: 'Mi HTML empieza con <!DOCTYPE html>, <html lang="es">, <head> y <body>', pts: 10, done: true },
  { id: 'r2', label: 'Usé 4 etiquetas con significado (header, nav, main, section o footer)', pts: 15, done: true },
  { id: 'r3', label: 'Mi tarjeta usa clases y está en un archivo estilos.css separado', pts: 15, done: true },
  { id: 'r4', label: 'Tengo tres tarjetas en fila con Grid y una ocupa dos columnas', pts: 20, done: false },
  { id: 'r5', label: 'Mi página se ve bien a 375px y no tiene scroll horizontal', pts: 15, done: false },
  { id: 'r6', label: 'Un botón responde al clic y cambio el texto con JavaScript', pts: 15, done: false },
  { id: 'r7', label: 'Mi sitio está publicado y puedo compartir la URL', pts: 10, done: false }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '01. ¿Con qué línea empieza siempre un archivo HTML?',
    options: [
      '<!DOCTYPE html>',
      '<body>',
      '<h1>Hola</h1>'
    ],
    correctIndex: 0
  },
  {
    id: 2,
    question: '02. ¿Dónde pones el título que aparece en la pestaña del navegador?',
    options: ['Dentro de <title> en el <head>', 'Dentro de un <p>', 'En el estilo CSS'],
    correctIndex: 0
  },
  {
    id: 3,
    question: '03. ¿Qué etiqueta uso para el contenido principal de mi página?',
    options: ['<main>', '<b>', '<br>'],
    correctIndex: 0
  },
  {
    id: 4,
    question: '04. ¿Para qué sirve una clase en CSS?',
    options: [
      'Para dar el mismo estilo a varios elementos sin repetir código',
      'Para hacer que la página pese más',
      'Para cambiar el nombre del archivo'
    ],
    correctIndex: 0
  },
  {
    id: 5,
    question: '05. ¿Qué hace repeat(3, 1fr) en CSS Grid?',
    options: ['Crea 3 columnas del mismo ancho', 'Crea 3 filas de 1 píxel', 'Borra 3 cajas'],
    correctIndex: 0
  },
  {
    id: 6,
    question: '06. En el Modelo de Caja, ¿qué propiedad pone aire entre el borde y el texto?',
    options: ['margin', 'padding', 'gap'],
    correctIndex: 1
  },
  {
    id: 7,
    question: '07. ¿Qué pasa cuando haces clic en un botón con addEventListener("click", ...)?',
    options: [
      'Se ejecuta la función que le indicaste',
      'Se cierra el navegador',
      'No pasa nada hasta recargar'
    ],
    correctIndex: 0
  }
];
