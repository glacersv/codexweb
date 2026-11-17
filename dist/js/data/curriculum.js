/* ==========================================================================
   CURRICULUM.TS — DATOS TIPADOS DEL CURSO (4 SEMANAS · MAR & JUE 08:00–09:30)
   ========================================================================== */

             
                      
               
                  
                   
                    
              
              
                            

export const XRAY_CASES                 = [
  {
    id: 'CASO #01 · LANDING GENERADA CON IA',
    shortTag: 'CASO #01',
    targetCols: 3,
    targetRows: 3,
    presetToLoad: 'landing',
    explanation:
      'Esta Landing tiene 3 Filas (1: Barra superior, 2: Hero principal de ancho completo, 3: Tres tarjetas de características) y 3 Columnas iguales (1fr 1fr 1fr).',
    renderMarkup: (showTags         )         => `
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); grid-template-rows: 56px 190px 150px; gap:14px;">
        <div style="grid-column: 1 / 4; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:12px 16px; display:flex; align-items:center; justify-content:space-between;">
          <span style="font-family:var(--font-mono); font-weight:600; font-size:12px;">${showTags ? '&lt;header&gt; + &lt;nav&gt;' : 'AI.STUDIO'}</span>
          <div style="display:flex; gap:12px; font-size:11px; color:var(--text-secondary);"><span>Producto</span><span>Precios</span><span style="color:var(--accent);">Empezar →</span></div>
        </div>
        <div style="grid-column: 1 / 4; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:24px; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;">
          <span class="mono-tag" style="color:var(--accent); margin-bottom:6px;">${showTags ? '&lt;section class="hero"&gt; (grid-column: 1 / 4)' : 'ARQUITECTURA WEB 2.0'}</span>
          <div style="font-size:20px; font-weight:700; letter-spacing:-0.02em;">De Plantillas de IA a Código Profesional</div>
          <div style="font-size:12px; color:var(--text-secondary); margin-top:4px;">Identifica cuántas columnas sostienen esta retícula</div>
        </div>
        <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:16px;">
          <div class="mono-tag">${showTags ? '&lt;article&gt; F3:C1' : '01 / ESTRUCTURA'}</div>
          <div style="font-weight:600; margin-top:8px;">HTML5 Semántico</div>
          <div style="font-size:11.5px; color:var(--text-secondary); margin-top:4px;">Celda independiente en columna 1.</div>
        </div>
        <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:16px;">
          <div class="mono-tag">${showTags ? '&lt;article&gt; F3:C2' : '02 / RETÍCULA'}</div>
          <div style="font-weight:600; margin-top:8px;">CSS Grid 2D</div>
          <div style="font-size:11.5px; color:var(--text-secondary); margin-top:4px;">Celda independiente en columna 2.</div>
        </div>
        <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:16px;">
          <div class="mono-tag">${showTags ? '&lt;article&gt; F3:C3' : '03 / PRODUCCIÓN'}</div>
          <div style="font-weight:600; margin-top:8px;">GitHub Pages</div>
          <div style="font-size:11.5px; color:var(--text-secondary); margin-top:4px;">Celda independiente en columna 3.</div>
        </div>
      </div>
    `
  },
  {
    id: 'CASO #02 · BENTO GRID EDITORIAL',
    shortTag: 'CASO #02',
    targetCols: 4,
    targetRows: 3,
    presetToLoad: 'bento',
    explanation:
      '¡Ojo arquitectónico entrenado! Este Bento Grid se construye sobre una matriz de 4 Columnas y 3 Filas donde el bloque principal se fusiona en 2×2 celdas.',
    renderMarkup: (showTags         )         => `
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); grid-template-rows: repeat(3, 130px); gap:14px;">
        <div style="grid-column: 1 / 3; grid-row: 1 / 3; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:20px; display:flex; flex-direction:column; justify-content:space-between;">
          <span class="mono-tag" style="color:var(--accent);">${showTags ? '&lt;main&gt; (Span 2 Cols × 2 Filas)' : 'PROYECTO PRINCIPAL'}</span>
          <div style="font-size:18px; font-weight:700;">Sistemas de Diseño & Retículas Suizas</div>
        </div>
        <div style="grid-column: 3 / 5; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:16px;">
          <span class="mono-tag">${showTags ? '&lt;header&gt; (Cols 3–4, Fila 1)' : 'RENDIMIENTO'}</span>
          <div style="font-size:15px; font-weight:600; margin-top:8px;">100 / 100 Lighthouse</div>
        </div>
        <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:16px;">
          <span class="mono-tag">${showTags ? '&lt;article&gt; (F2:C3)' : 'MÓDULO A'}</span>
          <div style="font-weight:600; margin-top:8px;">TypeScript</div>
        </div>
        <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:16px;">
          <span class="mono-tag">${showTags ? '&lt;aside&gt; (F2:C4)' : 'MÓDULO B'}</span>
          <div style="font-weight:600; margin-top:8px;">CSS Modular</div>
        </div>
        <div style="grid-column: 1 / 5; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:16px; display:flex; align-items:center; justify-content:space-between;">
          <span class="mono-tag">${showTags ? '&lt;footer&gt; (grid-column: 1 / 5)' : 'PIE DE PÁGINA ANCHO COMPLETO'}</span>
          <span class="mono-tag">MATRIZ 4×3</span>
        </div>
      </div>
    `
  },
  {
    id: 'CASO #03 · DASHBOARD DE APLICACIÓN',
    shortTag: 'CASO #03',
    targetCols: 4,
    targetRows: 4,
    presetToLoad: 'dashboard',
    explanation:
      '¡Exacto! El Dashboard divide la pantalla en 4 Columnas (la 1ra para el Sidebar vertical que abarca las 4 filas) y 4 Filas horizontales.',
    renderMarkup: (showTags         )         => `
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); grid-template-rows: repeat(4, 96px); gap:12px;">
        <div style="grid-column: 1 / 2; grid-row: 1 / 5; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:14px;">
          <span class="mono-tag" style="color:var(--blueprint);">${showTags ? '&lt;aside&gt; (1 Col × 4 Filas)' : 'SIDEBAR NAV'}</span>
          <div style="margin-top:16px; display:flex; flex-direction:column; gap:8px; font-size:11.5px; color:var(--text-secondary);">
            <span>• Resumen</span><span>• Analítica</span><span>• Proyectos</span><span>• Ajustes</span>
          </div>
        </div>
        <div style="grid-column: 2 / 5; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:14px; display:flex; align-items:center; justify-content:space-between;">
          <span class="mono-tag">${showTags ? '&lt;header&gt; (3 Columnas)' : 'BARRA SUPERIOR DE CONTROL'}</span>
          <span class="badge-cohort">ACTIVO</span>
        </div>
        <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:12px;"><span class="mono-tag">KPI 01</span><div class="tabular" style="font-size:16px; font-weight:700; margin-top:4px;">98.4%</div></div>
        <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:12px;"><span class="mono-tag">KPI 02</span><div class="tabular" style="font-size:16px; font-weight:700; margin-top:4px;">1,420</div></div>
        <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:12px;"><span class="mono-tag">KPI 03</span><div class="tabular" style="font-size:16px; font-weight:700; margin-top:4px;">12ms</div></div>
        <div style="grid-column: 2 / 5; grid-row: 3 / 5; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:16px;">
          <span class="mono-tag">${showTags ? '&lt;main&gt; (3 Columnas × 2 Filas)' : 'PANEL PRINCIPAL DE TELEMETRÍA'}</span>
        </div>
      </div>
    `
  }
];

export const SEMANTIC_BRUSHES                                              = {
  header:  { key: 'header',  tag: 'header',  name: 'Encabezado',     color: '#FF5500', soft: 'rgba(255, 85, 0, 0.16)' },
  nav:     { key: 'nav',     tag: 'nav',     name: 'Navegación',     color: '#38BDF8', soft: 'rgba(56, 189, 248, 0.16)' },
  main:    { key: 'main',    tag: 'main',    name: 'Contenido Main', color: '#10B981', soft: 'rgba(16, 185, 129, 0.16)' },
  aside:   { key: 'aside',   tag: 'aside',   name: 'Sidebar Aside',  color: '#F59E0B', soft: 'rgba(245, 158, 11, 0.16)' },
  article: { key: 'article', tag: 'article', name: 'Tarjeta / Item', color: '#A855F7', soft: 'rgba(168, 85, 247, 0.16)' },
  footer:  { key: 'footer',  tag: 'footer',  name: 'Pie de Página',  color: '#EC4899', soft: 'rgba(236, 72, 153, 0.16)' },
  eraser:  { key: 'eraser',  tag: null,      name: 'Borrar Celda',   color: '#71717A', soft: 'transparent' }
};

export const MOCKUP_COMPONENTS                        = [
  {
    id: 'nav',
    title: 'Header + Navegación',
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
    semanticCode: `<header class="site-header">\n  <nav aria-label="Navegación Principal">\n    <a href="/" class="logo">ESTUDIO</a>\n    <ul class="nav-links">\n      <li><a href="#proyectos">Proyectos</a></li>\n      <li><a href="#contacto">Contacto</a></li>\n    </ul>\n  </nav>\n</header>`
  },
  {
    id: 'hero',
    title: 'Hero Split (2 Columnas)',
    tag: 'section',
    wireframeHtml: `
      <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:12px; padding:12px; background:var(--bg-elevated); border-radius:4px; align-items:center;">
        <div style="display:flex; flex-direction:column; gap:6px;">
          <div style="width:85%; height:12px; background:var(--text-primary); border-radius:2px;"></div>
          <div style="width:65%; height:8px; background:var(--text-muted); border-radius:2px;"></div>
          <div style="width:72px; height:18px; background:var(--accent); border-radius:3px; margin-top:4px;"></div>
        </div>
        <div style="height:64px; background:var(--bg-interactive); border:1px dashed var(--border-focus); border-radius:4px; display:flex; align-items:center; justify-content:center; font-family:var(--font-mono); font-size:9px; color:var(--text-muted);">VISUAL 16:9</div>
      </div>`,
    semanticCode: `<section class="hero-grid">\n  <div class="hero-copy">\n    <h1>Arquitectura y Desarrollo Web</h1>\n    <p>Diseño estructurado con CSS Grid y HTML5 semántico.</p>\n    <a href="#empezar" class="btn-primary">Explorar</a>\n  </div>\n  <figure class="hero-media">\n    <img src="preview.webp" alt="Vista del proyecto" />\n  </figure>\n</section>`
  },
  {
    id: 'bento3',
    title: 'Grilla de 3 Tarjetas (Grid)',
    tag: 'section',
    wireframeHtml: `
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px;">
        <div style="padding:10px; background:var(--bg-elevated); border-radius:4px;"><div style="width:18px; height:18px; background:var(--accent-soft); border:1px solid var(--accent); border-radius:3px; margin-bottom:6px;"></div><div style="width:80%; height:7px; background:var(--text-secondary); border-radius:2px;"></div></div>
        <div style="padding:10px; background:var(--bg-elevated); border-radius:4px;"><div style="width:18px; height:18px; background:var(--accent-soft); border:1px solid var(--accent); border-radius:3px; margin-bottom:6px;"></div><div style="width:80%; height:7px; background:var(--text-secondary); border-radius:2px;"></div></div>
        <div style="padding:10px; background:var(--bg-elevated); border-radius:4px;"><div style="width:18px; height:18px; background:var(--accent-soft); border:1px solid var(--accent); border-radius:3px; margin-bottom:6px;"></div><div style="width:80%; height:7px; background:var(--text-secondary); border-radius:2px;"></div></div>
      </div>`,
    semanticCode: `<section class="features-grid">\n  <article class="card"><h3>01. Retícula</h3><p>Columnas proporcionales.</p></article>\n  <article class="card"><h3>02. Semántica</h3><p>Etiquetas con significado.</p></article>\n  <article class="card"><h3>03. Código</h3><p>Estándares modernos.</p></article>\n</section>`
  },
  {
    id: 'cta',
    title: 'Formulario de Contacto',
    tag: 'section',
    wireframeHtml: `
      <div style="padding:12px; background:var(--bg-elevated); border-radius:4px; display:flex; justify-content:space-between; align-items:center; gap:10px;">
        <div style="width:45%; height:10px; background:var(--text-secondary); border-radius:2px;"></div>
        <div style="display:flex; gap:6px; flex:1;">
          <div style="flex:1; height:20px; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:3px;"></div>
          <div style="width:54px; height:20px; background:var(--blueprint); border-radius:3px;"></div>
        </div>
      </div>`,
    semanticCode: `<section class="contact-section" id="contacto">\n  <h2>Contacto Directo</h2>\n  <form class="contact-form">\n    <input type="email" name="email" placeholder="nombre@correo.com" required />\n    <button type="submit">Enviar</button>\n  </form>\n</section>`
  },
  {
    id: 'footer',
    title: 'Pie de Página Semántico',
    tag: 'footer',
    wireframeHtml: `
      <div style="display:flex; justify-content:space-between; padding:10px 12px; background:var(--bg-elevated); border-radius:4px;">
        <div style="width:90px; height:7px; background:var(--text-muted); border-radius:2px;"></div>
        <div style="width:60px; height:7px; background:var(--text-muted); border-radius:2px;"></div>
      </div>`,
    semanticCode: `<footer class="site-footer">\n  <small>&copy; 2026 Proyecto Web. Desplegado en GitHub Pages.</small>\n</footer>`
  }
];

export const COURSE_SESSIONS                = [
  {
    id: 1,
    week: 'SEMANA 01',
    day: 'Martes · 08:00–09:30 AM',
    title: 'Exploración de Plantillas Web y Generación con IA',
    status: 'done',
    detail: 'Análisis crítico de sitios generados con plantillas e IA para distinguir diseño visual de estructura técnica.',
    blocks: {
      teoria: '08:00–08:25 · Anatomía visual de una página web moderna.',
      practica: '08:25–09:10 · Generación de prototipos con IA y modificación de contenido.',
      entregable: '09:10–09:30 · Captura con bloques principales identificados.'
    }
  },
  {
    id: 2,
    week: 'SEMANA 01',
    day: 'Jueves · 08:00–09:30 AM',
    title: 'Ingeniería Inversa: Contando Filas y Columnas',
    status: 'done',
    detail: 'Entrenamiento del ojo arquitectónico trazando líneas verticales y horizontales sobre interfaces reales.',
    blocks: {
      teoria: '08:00–08:25 · Concepto de contenedor padre, fila, columna y celda.',
      practica: '08:25–09:10 · Conteo de filas y columnas en sitios reales (Laboratorio Rayos X).',
      entregable: '09:10–09:30 · Mapa de retícula de 2 sitios web.'
    }
  },
  {
    id: 3,
    week: 'SEMANA 02',
    day: 'Martes · 08:00–09:30 AM',
    title: 'Del Conteo Visual a CSS Grid (1fr, repeat y gap)',
    status: 'current',
    detail: 'Traducción de las filas y columnas contadas en la Clase 2 a declaraciones reales de CSS Grid.',
    blocks: {
      teoria: '08:00–08:25 · display: grid, grid-template-columns, unidad fr y gap.',
      practica: '08:25–09:10 · Construcción de maqueta Holy Grail en el Estudio CSS Grid.',
      entregable: '09:10–09:30 · Archivo maqueta-css-grid.html exportado y probado.'
    }
  },
  {
    id: 4,
    week: 'SEMANA 02',
    day: 'Jueves · 08:00–09:30 AM',
    title: 'Fusión de Áreas 2D (grid-column / grid-row) & Bento Grids',
    status: 'upcoming',
    detail: 'Expansión de bloques a través de múltiples líneas de retícula para lograr layouts editoriales y Bento.',
    blocks: {
      teoria: '08:00–08:25 · Líneas de numeración Grid (1 / 4) y Modelo de Caja.',
      practica: '08:25–09:10 · Creación de un Bento Grid asimétrico en el Estudio.',
      entregable: '09:10–09:30 · Reto práctico superado en el Autocorrector CSS.'
    }
  },
  {
    id: 5,
    week: 'SEMANA 03',
    day: 'Martes · 08:00–09:30 AM',
    title: 'Wireframing y Arquitectura HTML5 Semántica',
    status: 'upcoming',
    detail: 'Planificación estructural con mockups antes de estilizar, reemplazando el abuso de <div> por etiquetas con significado.',
    blocks: {
      teoria: '08:00–08:25 · Árbol DOM semántico (<header>, <nav>, <main>, <section>, <article>, <footer>).',
      practica: '08:25–09:10 · Armado de wireframe completo en el Constructor de Mockups.',
      entregable: '09:10–09:30 · Esqueleto estructura-mockup.html del proyecto personal.'
    }
  },
  {
    id: 6,
    week: 'SEMANA 03',
    day: 'Jueves · 08:00–09:30 AM',
    title: 'Combinación Grid (2D) + Flexbox (1D) y Diseño Móvil',
    status: 'upcoming',
    detail: 'Uso de Grid para la macro-estructura de página y Flexbox para alinear barras de navegación y contenido interno.',
    blocks: {
      teoria: '08:00–08:25 · Cuándo elegir 1D (Flexbox) vs 2D (Grid) y Media Queries.',
      practica: '08:25–09:10 · Adaptación del mockup de Desktop (1280px) a Mobile (375px).',
      entregable: '09:10–09:30 · Layout responsivo sin desbordamiento horizontal.'
    }
  },
  {
    id: 7,
    week: 'SEMANA 04',
    day: 'Martes · 08:00–09:30 AM',
    title: 'Variables CSS, Tipografía y Arquitectura Modular',
    status: 'upcoming',
    detail: 'Separación profesional de responsabilidades: hojas de estilo modulares, tokens CSS (:root) y jerarquía visual.',
    blocks: {
      teoria: '08:00–08:25 · Custom Properties (--tokens), contraste y micro-interacciones.',
      practica: '08:25–09:10 · Refinamiento visual en el Sandbox y validación con la Rúbrica.',
      entregable: '09:10–09:30 · Proyecto al 85% validado en lista de cotejo.'
    }
  },
  {
    id: 8,
    week: 'SEMANA 04',
    day: 'Jueves · 08:00–09:30 AM',
    title: 'Despliegue en GitHub Pages & Demo Day Final',
    status: 'upcoming',
    detail: 'Publicación del código en un repositorio real de GitHub y puesta en producción con GitHub Pages.',
    blocks: {
      teoria: '08:00–08:25 · Estructura de repositorio web y despliegue continuo.',
      practica: '08:25–09:10 · Subida a GitHub, activación de Pages y verificación de URL pública.',
      entregable: '09:10–09:30 · Presentación en vivo del sitio publicado.'
    }
  }
];

export const INITIAL_RUBRIC                    = [
  { id: 'r1', label: 'Conteo y definición de retícula principal con CSS Grid (filas, columnas y gap)', pts: 25, done: true },
  { id: 'r2', label: 'Estructura limpia con etiquetas HTML5 semánticas (<header>, <main>, <footer>)', pts: 20, done: true },
  { id: 'r3', label: 'Uso de Flexbox (1D) para alineación interna de navegación y tarjetas', pts: 20, done: false },
  { id: 'r4', label: 'Adaptación responsiva móvil mediante Media Queries sin scroll horizontal', pts: 20, done: false },
  { id: 'r5', label: 'Repositorio publicado en GitHub Pages con estilos separados y código ordenado', pts: 15, done: false }
];

export const QUIZ_QUESTIONS                 = [
  {
    id: 1,
    question: '01. ¿Por qué contamos filas y columnas antes de escribir código?',
    options: [
      'Para traducir la anatomía visual del diseño en una matriz exacta de CSS Grid',
      'Porque el navegador exige un mínimo de 10 tablas',
      'Solo para cambiar el color de fondo'
    ],
    correctIndex: 0
  },
  {
    id: 2,
    question: '02. ¿Qué unidad de CSS Grid reparte el espacio disponible en fracciones flexibles?',
    options: ['px (píxeles fijos)', 'fr (ej. repeat(3, 1fr))', 'cm (centímetros)'],
    correctIndex: 1
  },
  {
    id: 3,
    question: '03. ¿Qué declaración expande un <header> a lo largo de 3 columnas?',
    options: ['grid-column: 1 / 4; (o span 3)', 'display: inline;', 'padding: 3px;'],
    correctIndex: 0
  },
  {
    id: 4,
    question: '04. En el Modelo de Caja (Box Model), ¿qué propiedad crea aire INTERNO entre el borde y el texto?',
    options: ['margin', 'padding', 'gap'],
    correctIndex: 1
  },
  {
    id: 5,
    question: '05. ¿Cuál es la diferencia arquitectónica entre CSS Grid y Flexbox?',
    options: [
      'Grid controla 2 dimensiones (filas y columnas a la vez) y Flexbox alinea en 1 dimensión',
      'No pueden usarse en el mismo archivo CSS',
      'Flexbox solo sirve para imágenes'
    ],
    correctIndex: 0
  },
  {
    id: 6,
    question: '06. ¿Por qué separamos HTML, CSS modular y TypeScript en un proyecto profesional?',
    options: [
      'Para mantener escalabilidad, tipado seguro y separación entre estructura, diseño y lógica',
      'Porque un archivo HTML no soporta colores',
      'Para que pese más el sitio'
    ],
    correctIndex: 0
  }
];
