/* ==========================================================================
   HTMLCSSSTUDIO.TS — MÓDULO 07: TALLER INTEGRADO HTML + CSS
   ========================================================================== */
import { copyToClipboard, downloadTextFile, showToast } from '../utils/dom.js';

const PROP_DEFS = [
    { id: 'color', prop: 'color', label: 'Color de texto', color: '#EF4444', soft: 'rgba(239,68,68,.14)', kind: 'color', defaultValue: '#3d312c' },
    { id: 'bg', prop: 'background-color', label: 'Color de fondo', color: '#F59E0B', soft: 'rgba(245,158,11,.14)', kind: 'color', defaultValue: '#fff3e0' },
    { id: 'font-size', prop: 'font-size', label: 'Tamaño de letra', color: '#3B82F6', soft: 'rgba(59,130,246,.14)', kind: 'number', defaultValue: '18', unit: 'px', min: 10, max: 72, step: 1 },
    { id: 'font-weight', prop: 'font-weight', label: 'Grosor', color: '#6366F1', soft: 'rgba(99,102,241,.14)', kind: 'select', defaultValue: 'normal', options: ['normal', 'bold', '700'] },
    { id: 'text-align', prop: 'text-align', label: 'Alineación', color: '#14B8A6', soft: 'rgba(20,184,166,.14)', kind: 'select', defaultValue: 'left', options: ['left', 'center', 'right'] },
    { id: 'padding', prop: 'padding', label: 'Espacio interno', color: '#10B981', soft: 'rgba(16,185,129,.14)', kind: 'number', defaultValue: '12', unit: 'px', min: 0, max: 80, step: 2 },
    { id: 'margin', prop: 'margin', label: 'Espacio externo', color: '#84CC16', soft: 'rgba(132,204,22,.14)', kind: 'number', defaultValue: '10', unit: 'px', min: 0, max: 80, step: 2 },
    { id: 'border', prop: 'border', label: 'Borde', color: '#78716C', soft: 'rgba(120,113,108,.14)', kind: 'text', defaultValue: '2px solid #d4a574' },
    { id: 'radius', prop: 'border-radius', label: 'Esquinas redondeadas', color: '#F97316', soft: 'rgba(249,115,22,.14)', kind: 'number', defaultValue: '8', unit: 'px', min: 0, max: 60, step: 2 },
    { id: 'shadow', prop: 'box-shadow', label: 'Sombra', color: '#64748B', soft: 'rgba(100,116,139,.14)', kind: 'text', defaultValue: '3px 3px 0 #a07d54' },
    { id: 'width', prop: 'width', label: 'Ancho', color: '#06B6D4', soft: 'rgba(6,182,212,.14)', kind: 'text', defaultValue: '100%' },
    { id: 'display', prop: 'display', label: 'Tipo de caja', color: '#2563EB', soft: 'rgba(37,99,235,.14)', kind: 'select', defaultValue: 'block', options: ['block', 'flex', 'grid', 'inline-block'] },
    { id: 'columns', prop: 'grid-template-columns', label: 'Columnas Grid', color: '#D946EF', soft: 'rgba(217,70,239,.14)', kind: 'text', defaultValue: 'repeat(3, 1fr)', hint: 'Úsalo junto con display: grid.' },
    { id: 'gap', prop: 'gap', label: 'Separación', color: '#059669', soft: 'rgba(5,150,105,.14)', kind: 'number', defaultValue: '12', unit: 'px', min: 0, max: 60, step: 2, hint: 'Úsalo con flex o grid.' },
];

const BASE_SELECTORS = ['body', 'header', 'nav', 'main', 'h1', 'p', 'button', 'section', 'footer'];
const SNIPPETS = {
    header: '<header>\n  <h1>Mi sitio web</h1>\n</header>',
    nav: '<nav>\n  <a href="#">Inicio</a>\n  <a href="#">Contacto</a>\n</nav>',
    main: '<main>\n  <p>Contenido principal de mi página.</p>\n</main>',
    h1: '<h1>Un título grande</h1>',
    p: '<p>Un párrafo de texto. Cámbialo por lo que quieras.</p>',
    button: '<button>Haz clic aquí</button>',
    tarjeta: '<article class="tarjeta">\n  <h3>Mi tarjeta</h3>\n  <p>Contenido de la tarjeta.</p>\n</article>',
    grid: '<div class="grid">\n  <article class="columna">Columna 1</article>\n  <article class="columna">Columna 2</article>\n  <article class="columna">Columna 3</article>\n</div>',
};

const DEMO_HTML = `<header>
  <h1>Mi página con HTML + CSS</h1>
</header>
<nav class="menu">
  <a href="#inicio">Inicio</a>
  <a href="#contacto">Contacto</a>
</nav>
<main>
  <h2>Tarjetas</h2>
  <div class="grid">
    <article class="tarjeta">
      <h3>Columna 1</h3>
      <p>Esta es una tarjeta con estilos.</p>
    </article>
    <article class="tarjeta">
      <h3>Columna 2</h3>
      <button>Ver más</button>
    </article>
  </div>
</main>`;

const DEMO_RULES = {
    body: [['bg', '#fff8ed'], ['color', '#3d312c'], ['font-size', '18'], ['margin', '0'], ['padding', '20']],
    header: [['bg', '#d4a574'], ['color', '#ffffff'], ['padding', '16'], ['radius', '8']],
    '.menu': [['display', 'flex'], ['gap', '12'], ['margin', '12']],
    '.grid': [['display', 'grid'], ['columns', 'repeat(2, 1fr)'], ['gap', '12']],
    '.tarjeta': [['bg', '#ffffff'], ['border', '2px solid #d4a574'], ['radius', '8'], ['padding', '14'], ['shadow', '3px 3px 0 #a07d54']],
    button: [['bg', '#c49a6a'], ['color', '#ffffff'], ['padding', '10'], ['radius', '6']],
};

let htmlCode = '<!-- Escribe tu HTML aquí. Por ejemplo: <h1>Hola</h1> -->';
let rules = {};
let selectedSelector = 'body';
let extraCss = '';
let uid = 1;

function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function getDef(id) { return PROP_DEFS.find(p => p.id === id); }
function valueOf(p) {
    const d = getDef(p.type);
    return d?.kind === 'number' && d.unit ? `${p.value}${d.unit}` : p.value;
}
function detectClasses(html) {
    const found = new Set();
    const re = /class\s*=\s*["']([^"']+)["']/g;
    let m;
    while ((m = re.exec(html)) !== null) {
        m[1].split(/\s+/).filter(Boolean).forEach(c => found.add(c));
    }
    return Array.from(found);
}
function getSelectors() {
    const set = new Set(BASE_SELECTORS);
    detectClasses(htmlCode).forEach(c => set.add(`.${c}`));
    Object.keys(rules).forEach(s => set.add(s));
    return Array.from(set);
}
function ensureRule(selector) {
    if (!rules[selector]) rules[selector] = [];
    return rules[selector];
}
function buildCss() {
    const parts = Object.entries(rules)
        .filter(([, props]) => props.length > 0)
        .map(([selector, props]) => {
            const body = props.map(p => {
                const d = getDef(p.type);
                return `  ${d?.prop || p.type}: ${valueOf(p)};`;
            }).join('\n');
            return `${selector} {\n${body}\n}`;
        });
    if (extraCss.trim()) parts.push(extraCss.trim());
    return parts.length ? parts.join('\n\n') : '/* Aquí aparecerá tu CSS */';
}
function buildDocument() {
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi página HTML + CSS</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 20px; background: #fdf6e3; color: #3d312c; box-sizing: border-box; }
    a { color: #a07d54; margin-right: 12px; }
${buildCss()}
  </style>
</head>
<body>
${htmlCode || '<!-- Escribe tu HTML aquí -->'}
</body>
</html>`;
}

export function initHtmlCssStudio() {
    const htmlArea = document.getElementById('studio-html-input');
    if (htmlArea) {
        htmlArea.value = htmlCode;
        htmlArea.addEventListener('input', () => {
            htmlCode = htmlArea.value;
            renderSelectors();
            renderPreview();
            renderOutput();
        });
    }
    const extra = document.getElementById('studio-extra-css');
    if (extra) {
        extra.value = extraCss;
        extra.addEventListener('input', () => { extraCss = extra.value; renderPreview(); renderOutput(); });
    }

    document.querySelectorAll('[data-studio-insert]').forEach(btn => {
        btn.addEventListener('click', () => insertSnippet(btn.dataset.studioInsert || ''));
    });

    document.getElementById('btn-studio-create-class')?.addEventListener('click', createClass);
    document.getElementById('studio-class-name')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') createClass();
    });

    document.getElementById('btn-studio-demo')?.addEventListener('click', loadDemo);
    document.getElementById('btn-studio-copy')?.addEventListener('click', () => {
        copyToClipboard(buildDocument(), 'HTML + CSS copiados');
    });
    document.getElementById('btn-studio-download')?.addEventListener('click', () => {
        downloadTextFile('mi-pagina-html-css.html', buildDocument());
    });
    document.getElementById('btn-studio-reset')?.addEventListener('click', () => {
        htmlCode = '<!-- Escribe tu HTML aquí. Por ejemplo: <h1>Hola</h1> -->';
        rules = {}; extraCss = ''; selectedSelector = 'body'; uid = 1;
        if (htmlArea) htmlArea.value = htmlCode;
        if (extra) extra.value = extraCss;
        renderAll();
        showToast('Taller reiniciado');
    });

    renderAll();
}

function renderAll() {
    renderSelectors();
    renderPropPalette();
    renderProps();
    renderPreview();
    renderOutput();
}

function loadDemo() {
    const htmlArea = document.getElementById('studio-html-input');
    const extra = document.getElementById('studio-extra-css');
    htmlCode = DEMO_HTML;
    rules = {};
    Object.entries(DEMO_RULES).forEach(([selector, list]) => {
        rules[selector] = list.map(([type, value]) => ({ uid: `sp_${uid++}`, type, value }));
    });
    extraCss = '';
    selectedSelector = '.tarjeta';
    if (htmlArea) htmlArea.value = htmlCode;
    if (extra) extra.value = extraCss;
    renderAll();
    showToast('Ejemplo cargado: HTML + CSS juntos');
}

function insertSnippet(key) {
    const snippet = SNIPPETS[key] || '';
    if (!snippet) return;
    const area = document.getElementById('studio-html-input');
    if (!area) return;
    const start = area.selectionStart ?? htmlCode.length;
    const end = area.selectionEnd ?? start;
    htmlCode = htmlCode.slice(0, start) + (htmlCode.slice(0, start).endsWith('\n') ? '' : '\n') + snippet + '\n' + htmlCode.slice(end);
    area.value = htmlCode;
    area.focus();
    area.setSelectionRange(htmlCode.length, htmlCode.length);
    renderSelectors(); renderPreview(); renderOutput();
    showToast(`Bloque ${key} insertado`);
}

function createClass() {
    const input = document.getElementById('studio-class-name');
    const raw = (input?.value || '').trim();
    const name = raw.replace(/[^a-zA-Z0-9_-]/g, '');
    if (!name) { showToast('Escribe un nombre de clase, ej: tarjeta'); return; }
    const selector = `.${name}`;
    ensureRule(selector);
    selectedSelector = selector;
    const area = document.getElementById('studio-html-input');
    if (area) {
        const snippet = `<div class="${name}">\n  Contenido de .${name}\n</div>`;
        htmlCode = `${htmlCode.trim()}\n${snippet}`;
        area.value = htmlCode;
    }
    if (input) input.value = '';
    renderAll();
    showToast(`Clase ${selector} creada y aplicada a un elemento`);
}

function renderSelectors() {
    const box = document.getElementById('studio-selectors');
    if (!box) return;
    const selectors = getSelectors();
    if (!selectors.includes(selectedSelector)) selectedSelector = selectors[0] || 'body';
    box.innerHTML = selectors.map(s => `
    <button type="button" class="studio-selector-chip ${s === selectedSelector ? 'is-active' : ''}" data-selector="${esc(s)}">${esc(s)}</button>
  `).join('');
    box.querySelectorAll('[data-selector]').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedSelector = btn.dataset.selector || 'body';
            ensureRule(selectedSelector);
            renderSelectors(); renderProps();
        });
    });
}

function renderPropPalette() {
    const pal = document.getElementById('studio-prop-palette');
    if (!pal) return;
    pal.innerHTML = PROP_DEFS.map(p => `
    <button type="button" class="block-palette-item" data-studio-prop="${p.id}" title="${esc(p.hint || p.label)}" style="--blk-c:${p.color};--blk-s:${p.soft}">
      <span class="block-palette-tag">${esc(p.prop)}</span>
      <span class="block-palette-label">${p.label}</span>
      <span class="block-palette-desc">${esc(p.hint || 'Agregar estilo a la clase seleccionada')}</span>
    </button>
  `).join('');
    pal.querySelectorAll('[data-studio-prop]').forEach(btn => {
        btn.addEventListener('click', () => addProp(btn.dataset.studioProp || ''));
    });
}

function addProp(type) {
    const d = getDef(type);
    if (!d) return;
    const list = ensureRule(selectedSelector);
    const p = { uid: `sp_${uid++}`, type, value: d.defaultValue };
    list.push(p);
    renderProps(); renderPreview(); renderOutput();
    showToast(`${d.label} agregado a ${selectedSelector}`);
}

function renderProps() {
    const box = document.getElementById('studio-props');
    if (!box) return;
    const list = rules[selectedSelector] || [];
    if (list.length === 0) {
        box.innerHTML = `<p class="hint">La clase <b>${esc(selectedSelector)}</b> aún no tiene estilos. Haz clic en bloques de la izquierda para agregarlos.</p>`;
        return;
    }
    box.innerHTML = list.map(p => {
        const d = getDef(p.type);
        if (!d) return '';
        let input = '';
        if (d.kind === 'color') {
            input = `<input type="color" data-studio-value="${p.uid}" value="${esc(p.value)}" style="width:56px;height:34px;border:1px solid var(--border-subtle);border-radius:6px;background:transparent;">`;
        } else if (d.kind === 'select') {
            input = `<select data-studio-value="${p.uid}" class="select-input">${(d.options || []).map(o => `<option value="${esc(o)}" ${o === p.value ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>`;
        } else {
            const t = d.kind === 'number' ? 'number' : 'text';
            const extra = d.kind === 'number' ? `min="${d.min}" max="${d.max}" step="${d.step}"` : '';
            input = `<input type="${t}" data-studio-value="${p.uid}" class="code-area" style="min-height:34px;width:150px;" value="${esc(p.value)}" ${extra}>`;
        }
        return `<div class="studio-prop-row" style="--blk-c:${d.color};--blk-s:${d.soft}">
      <span class="studio-prop-name">${esc(d.prop)}</span>
      ${input}
      <span class="mono-tag">${d.unit || ''}</span>
      <button type="button" class="blk-act blk-act-del" data-studio-del="${p.uid}" title="Quitar">×</button>
    </div>`;
    }).join('');

    box.querySelectorAll('[data-studio-value]').forEach(el => {
        el.addEventListener('input', () => {
            const p = list.find(x => x.uid === el.dataset.studioValue);
            if (!p) return;
            p.value = el.value;
            renderPreview(); renderOutput();
        });
    });
    box.querySelectorAll('[data-studio-del]').forEach(btn => {
        btn.addEventListener('click', () => {
            const pid = btn.dataset.studioDel;
            rules[selectedSelector] = (rules[selectedSelector] || []).filter(p => p.uid !== pid);
            renderProps(); renderPreview(); renderOutput();
            showToast('Estilo eliminado');
        });
    });
}

function renderPreview() {
    const frame = document.getElementById('studio-preview');
    if (frame) frame.srcdoc = buildDocument();
}
function renderOutput() {
    const out = document.getElementById('studio-css-output');
    if (out) out.textContent = buildCss();
    const doc = document.getElementById('studio-doc-output');
    if (doc) doc.textContent = buildDocument();
}
