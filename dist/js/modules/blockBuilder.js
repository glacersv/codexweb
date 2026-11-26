/* ==========================================================================
   BLOCKBUILDER.TS — MÓDULO 05: CONSTRUCTOR VISUAL POR BLOQUES HTML
   ========================================================================== */
import { copyToClipboard, downloadTextFile, showToast } from '../utils/dom.js';
const BLOCKS = [
    { id: 'html', label: 'HTML', tag: 'html', color: '#FF5500', soft: 'rgba(255,85,0,0.14)', description: 'La caja más grande. Toda tu página va adentro.', defaultContent: 'lang="es"', template: (c) => `<html ${c}>\n  <!-- Aquí van head y body -->\n</html>`, canNest: true },
    { id: 'head', label: 'HEAD', tag: 'head', color: '#F59E0B', soft: 'rgba(245,158,11,0.14)', description: 'Información invisible: título, idioma, estilos.', defaultContent: '', template: () => `<head>\n  <meta charset="UTF-8">\n  <title>Mi página</title>\n</head>`, canNest: false },
    { id: 'body', label: 'BODY', tag: 'body', color: '#10B981', soft: 'rgba(16,185,129,0.14)', description: 'Todo lo que se ve en la página va aquí.', defaultContent: '', template: () => `<body>\n  <!-- Tu contenido visible -->\n</body>`, canNest: true },
    { id: 'header', label: 'HEADER', tag: 'header', color: '#38BDF8', soft: 'rgba(56,189,248,0.14)', description: 'Cabecera: logo, nombre del sitio, menú.', defaultContent: 'Mi sitio web', template: (c) => `<header>\n  <h1>${esc(c)}</h1>\n</header>`, canNest: true },
    { id: 'nav', label: 'NAV', tag: 'nav', color: '#6366F1', soft: 'rgba(99,102,241,0.14)', description: 'Menú de navegación con enlaces.', defaultContent: 'Inicio|Productos|Contacto', template: (c) => { const links = c.split('|').map(s => s.trim()).filter(Boolean); const items = links.map(l => `    <a href="#">${esc(l)}</a>`).join('\n'); return `<nav>\n${items || '    <a href="#">Inicio</a>'}\n</nav>`; }, canNest: false },
    { id: 'main', label: 'MAIN', tag: 'main', color: '#A855F7', soft: 'rgba(168,85,247,0.14)', description: 'Contenido principal de la página.', defaultContent: '', template: () => `<main>\n  <!-- Contenido principal -->\n</main>`, canNest: true },
    { id: 'section', label: 'SECTION', tag: 'section', color: '#EC4899', soft: 'rgba(236,72,153,0.14)', description: 'Una sección o bloque de contenido.', defaultContent: 'Mi sección', template: (c) => `<section>\n  <h2>${esc(c)}</h2>\n  <p>Escribe aquí tu contenido.</p>\n</section>`, canNest: true },
    { id: 'grid', label: 'GRID', tag: 'div', color: '#D946EF', soft: 'rgba(217,70,239,0.14)', description: 'Contenedor de columnas. Selecciónalo y agrega bloques COLUMNA dentro.', defaultContent: '3', template: (c) => `<div class="bloque-grid" style="display:grid;grid-template-columns:repeat(${c},1fr);gap:12px;">\n  <!-- Agrega columnas aquí -->\n</div>`, canNest: true },
    { id: 'columna', label: 'COLUMNA', tag: 'article', color: '#0EA5E9', soft: 'rgba(14,165,233,0.14)', description: 'Una columna dentro de GRID. Mete título, texto, imagen o botón.', defaultContent: 'Columna 1', template: (c) => `<article class="bloque-columna">\n  <h3>${esc(c)}</h3>\n  <!-- Contenido de la columna -->\n</article>`, canNest: true },
    { id: 'h1', label: 'TÍTULO', tag: 'h1', color: '#EF4444', soft: 'rgba(239,68,68,0.14)', description: 'Título grande para tu página.', defaultContent: 'Hola, este es mi título', template: (c) => `<h1>${esc(c)}</h1>`, canNest: false },
    { id: 'p', label: 'TEXTO', tag: 'p', color: '#78716C', soft: 'rgba(120,113,108,0.14)', description: 'Un párrafo de texto.', defaultContent: 'Este es un párrafo de ejemplo. Cámbialo por tu texto.', template: (c) => `<p>${esc(c)}</p>`, canNest: false },
    { id: 'img', label: 'IMAGEN', tag: 'img', color: '#14B8A6', soft: 'rgba(20,184,166,0.14)', description: 'Muestra una imagen. Pon la URL o nombre del archivo.', defaultContent: 'https://via.placeholder.com/400x200?text=Mi+Imagen', template: (c) => `<img src="${esc(c)}" alt="Mi imagen" style="max-width:100%;border-radius:8px;">`, canNest: false },
    { id: 'button', label: 'BOTÓN', tag: 'button', color: '#F97316', soft: 'rgba(249,115,22,0.14)', description: 'Un botón en el que se puede hacer clic.', defaultContent: 'Haz clic aquí', template: (c) => `<button>${esc(c)}</button>`, canNest: false },
    { id: 'footer', label: 'FOOTER', tag: 'footer', color: '#64748B', soft: 'rgba(100,116,139,0.14)', description: 'Pie de página: autor, año, enlaces finales.', defaultContent: 'Hecho por mí · 2026', template: (c) => `<footer>\n  <small>${esc(c)}</small>\n</footer>`, canNest: false }
];
let nodes = [];
let selectedUid = null;
let uidCounter = 1;
function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function getDef(type) { return BLOCKS.find(b => b.id === type); }
function makeNode(type) { const def = getDef(type); return { uid: `blk_${uidCounter++}`, type, content: def?.defaultContent ?? '', children: [] }; }
function findNode(list, uid) { for (const n of list) { if (n.uid === uid) return n; const inChild = findNode(n.children, uid); if (inChild) return inChild; } return null; }
function removeNode(list, uid) { const idx = list.findIndex(n => n.uid === uid); if (idx >= 0) { list.splice(idx, 1); return true; } for (const n of list) { if (removeNode(n.children, uid)) return true; } return false; }
function moveNode(list, uid, dir) {
    const idx = list.findIndex(n => n.uid === uid);
    if (idx >= 0) { const target = idx + dir; if (target < 0 || target >= list.length) return false;[list[idx], list[target]] = [list[target], list[idx]]; return true; }
    for (const n of list) { if (moveNode(n.children, uid, dir)) return true; }
    return false;
}
function nodeToHtml(node, indent) {
    const def = getDef(node.type);
    if (!def) return '';
    const pad = '  '.repeat(indent);
    if (def.canNest) {
        const inner = node.children.length ? '\n' + node.children.map(c => nodeToHtml(c, indent + 1)).join('\n') + '\n' + pad : '\n' + pad + '  <!-- Agrega bloques aquí -->\n' + pad;
        if (node.type === 'html') return `${pad}<html lang="es">${inner}</html>`;
        if (node.type === 'body') return `${pad}<body>${inner}</body>`;
        if (node.type === 'main') return `${pad}<main>${inner}</main>`;
        if (node.type === 'header') { const titleLine = `\n${pad}  <h1>${esc(node.content)}</h1>`; const kids = node.children.length ? '\n' + node.children.map(c => nodeToHtml(c, indent + 1)).join('\n') : ''; return `${pad}<header>${titleLine}${kids}\n${pad}</header>`; }
        if (node.type === 'section') { const titleLine = `\n${pad}  <h2>${esc(node.content)}</h2>`; const kids = node.children.length ? '\n' + node.children.map(c => nodeToHtml(c, indent + 1)).join('\n') : `\n${pad}  <p>Contenido de la sección.</p>`; return `${pad}<section>${titleLine}${kids}\n${pad}</section>`; }
        if (node.type === 'grid') { const cols = Math.max(1, parseInt(node.content, 10) || 3); return `${pad}<div class="bloque-grid" style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:12px;">${inner}</div>`; }
        if (node.type === 'columna') { const titleLine = `\n${pad}  <h3>${esc(node.content)}</h3>`; const kids = node.children.length ? '\n' + node.children.map(c => nodeToHtml(c, indent + 1)).join('\n') : `\n${pad}  <!-- Mete aquí título, texto o botones -->`; return `${pad}<article class="bloque-columna" style="background:#fff;border:2px solid #d4a574;border-radius:8px;padding:14px;">${titleLine}${kids}\n${pad}</article>`; }
        return `${pad}<${def.tag}>${inner}</${def.tag}>`;
    }
    return pad + def.template(node.content);
}
function buildFullHtml() {
    const hasHtml = nodes.some(n => n.type === 'html');
    const body = nodes.map(n => nodeToHtml(n, hasHtml ? 0 : 1)).join('\n\n');
    if (hasHtml) return `<!DOCTYPE html>\n${body}`;
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi página con bloques</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 20px; background: #fdf6e3; color: #3d312c; }
    header, footer { background: #d4a574; color: white; padding: 16px; border-radius: 8px; margin-bottom: 12px; }
    nav { display: flex; gap: 12px; margin: 12px 0; flex-wrap: wrap; }
    nav a { background: #fff3e0; padding: 8px 14px; border-radius: 6px; text-decoration: none; color: #3d312c; font-weight: 600; border: 2px solid #d4a574; }
    main, section { background: white; border: 3px solid #d4a574; border-radius: 8px; padding: 16px; margin-bottom: 12px; }
    button { background: #c49a6a; color: white; border: none; padding: 10px 18px; border-radius: 6px; font-size: 16px; cursor: pointer; }
    img { max-width: 100%; border-radius: 8px; }
  </style>
</head>
<body>
${body || '  <!-- Arrastra bloques para empezar -->'}
</body>
</html>`;
}
export function initBlockBuilder() {
    renderPalette(); renderCanvas(); renderCode(); renderProps();
    document.getElementById('btn-blocks-clear')?.addEventListener('click', () => { nodes = []; selectedUid = null; renderCanvas(); renderCode(); renderProps(); showToast('Lienzo limpio'); });
    document.getElementById('btn-blocks-copy')?.addEventListener('click', () => { copyToClipboard(buildFullHtml(), 'Código HTML copiado'); });
    document.getElementById('btn-blocks-download')?.addEventListener('click', () => { downloadTextFile('mi-pagina-bloques.html', buildFullHtml()); });
    document.getElementById('btn-blocks-demo')?.addEventListener('click', loadDemo);
}
function renderPalette() {
    const pal = document.getElementById('blocks-palette');
    if (!pal) return;
    pal.innerHTML = BLOCKS.map(b => `
    <button type="button" class="block-palette-item" data-block-type="${b.id}" title="${esc(b.description)}" style="--blk-c:${b.color};--blk-s:${b.soft}">
      <span class="block-palette-tag">&lt;${b.tag}&gt;</span>
      <span class="block-palette-label">${b.label}</span>
      <span class="block-palette-desc">${esc(b.description)}</span>
    </button>`).join('');
    pal.querySelectorAll('.block-palette-item').forEach(btn => {
        btn.addEventListener('click', () => { const type = btn.dataset.blockType; if (type) addBlock(type); });
    });
}
function addBlock(type) {
    const node = makeNode(type);
    const def = getDef(type);
    if (selectedUid) {
        const parent = findNode(nodes, selectedUid);
        const parentDef = parent ? getDef(parent.type) : null;
        if (parent && parentDef?.canNest) {
            parent.children.push(node); selectedUid = node.uid;
            renderCanvas(); renderCode(); renderProps();
            showToast(`Bloque <${def?.tag}> agregado dentro de <${parentDef?.tag}>`);
            return;
        }
    }
    nodes.push(node); selectedUid = node.uid;
    renderCanvas(); renderCode(); renderProps();
    showToast(`Bloque <${def?.tag}> agregado`);
}
function renderCanvas() {
    const canvas = document.getElementById('blocks-canvas');
    const count = document.getElementById('blocks-count');
    if (count) count.textContent = `${countNodes(nodes)} bloques`;
    if (!canvas) return;
    if (nodes.length === 0) {
        canvas.innerHTML = `<div class="blocks-empty"><div class="blocks-empty-icon">&lt;/&gt;</div><p><strong>Tu página está vacía</strong></p><p>Haz clic en un bloque de la izquierda para empezar.<br>Prueba con <b>HEADER</b>, luego <b>SECTION</b>, luego <b>FOOTER</b>.</p></div>`;
        return;
    }
    canvas.innerHTML = nodes.map(n => renderNode(n, 0)).join('');
    bindCanvasEvents(canvas);
}
function countNodes(list) { let c = 0; for (const n of list) { c += 1 + countNodes(n.children); } return c; }
function renderNode(node, depth) {
    const def = getDef(node.type);
    if (!def) return '';
    const sel = node.uid === selectedUid ? 'is-selected' : '';
    const kids = node.children.length
        ? `<div class="block-children">${node.children.map(c => renderNode(c, depth + 1)).join('')}</div>`
        : (def.canNest ? `<div class="block-children block-children-empty">Suelta bloques aquí (selecciona este bloque y haz clic en otro)</div>` : '');
    const preview = !def.canNest ? `<span class="block-node-preview">${esc(node.content.slice(0, 40))}${node.content.length > 40 ? '…' : ''}</span>` : '';
    return `
    <div class="block-node ${sel}" data-uid="${node.uid}" style="--blk-c:${def.color};--blk-s:${def.soft}">
      <div class="block-node-head">
        <span class="block-node-tag">&lt;${def.tag}&gt;</span>
        <span class="block-node-name">${def.label}</span>
        ${preview}
        <div class="block-node-actions">
          <button type="button" class="blk-act" data-act="up" data-uid="${node.uid}" title="Subir">↑</button>
          <button type="button" class="blk-act" data-act="down" data-uid="${node.uid}" title="Bajar">↓</button>
          <button type="button" class="blk-act blk-act-del" data-act="del" data-uid="${node.uid}" title="Borrar">×</button>
        </div>
      </div>
      ${kids}
    </div>`;
}
function bindCanvasEvents(canvas) {
    canvas.querySelectorAll('.block-node').forEach(el => {
        el.addEventListener('click', (e) => {
            const target = e.target;
            if (target.closest('.blk-act')) return;
            e.stopPropagation();
            selectedUid = el.dataset.uid || null;
            renderCanvas(); renderProps();
        });
    });
    canvas.querySelectorAll('.blk-act').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const uid = btn.dataset.uid; const act = btn.dataset.act;
            if (!uid) return;
            if (act === 'del') { removeNode(nodes, uid); if (selectedUid === uid) selectedUid = null; showToast('Bloque eliminado'); }
            else if (act === 'up') { moveNode(nodes, uid, -1); }
            else if (act === 'down') { moveNode(nodes, uid, 1); }
            renderCanvas(); renderCode(); renderProps();
        });
    });
}
function renderProps() {
    const panel = document.getElementById('blocks-props');
    if (!panel) return;
    if (!selectedUid) { panel.innerHTML = `<p class="hint">Selecciona un bloque del lienzo para editar su contenido.</p>`; return; }
    const node = findNode(nodes, selectedUid);
    if (!node) { panel.innerHTML = ''; return; }
    const def = getDef(node.type);
    if (!def) return;
    const canEdit = !def.canNest || node.type === 'header' || node.type === 'section' || node.type === 'grid' || node.type === 'columna';
    panel.innerHTML = `
    <div class="block-props-head" style="--blk-c:${def.color}">
      <span class="mono-tag">&lt;${def.tag}&gt;</span>
      <strong>${def.label}</strong>
    </div>
    <p class="hint" style="margin:8px 0 12px;">${esc(def.description)}</p>
    ${canEdit ? `
      <label class="field-label" for="block-content-input">Contenido del bloque</label>
      <textarea id="block-content-input" class="code-area" rows="3" style="min-height:72px;">${esc(node.content)}</textarea>
      <p class="hint" style="margin-top:8px;">${node.type === 'nav' ? 'Separa los enlaces con | (ej: Inicio|Juegos|Contacto)' : node.type === 'grid' ? 'Escribe cuántas columnas quieres (ej: 2 o 3). Luego mete bloques COLUMNA dentro.' : node.type === 'columna' ? 'Escribe el título de la columna. Mete títulos, textos o botones dentro.' : 'Cambia el texto y mira el código actualizarse.'}</p>
    ` : `<p class="mini-note">Este bloque es un contenedor. Selecciónalo y haz clic en otros bloques para meterlos dentro.</p>`}
  `;
    const input = document.getElementById('block-content-input');
    input?.addEventListener('input', () => { node.content = input.value; renderCanvas(); renderCode(); });
}
function renderCode() {
    const out = document.getElementById('blocks-code-output');
    if (out) out.textContent = buildFullHtml();
    const frame = document.getElementById('blocks-preview');
    if (frame) frame.srcdoc = buildFullHtml();
}
function loadDemo() {
    uidCounter = 1;
    nodes = [
        { uid: `blk_${uidCounter++}`, type: 'header', content: 'Mi Tienda de Perfumes', children: [] },
        { uid: `blk_${uidCounter++}`, type: 'nav', content: 'Inicio|Perfumes|Carrito|Contacto', children: [] },
        { uid: `blk_${uidCounter++}`, type: 'main', content: '', children: [
            { uid: `blk_${uidCounter++}`, type: 'h1', content: 'Bienvenido a mi tienda', children: [] },
            { uid: `blk_${uidCounter++}`, type: 'p', content: 'Aquí encuentras las mejores fragancias para cada momento.', children: [] },
            { uid: `blk_${uidCounter++}`, type: 'section', content: 'Perfumes destacados', children: [
                { uid: `blk_${uidCounter++}`, type: 'p', content: 'Perfume Clásico - $50.00', children: [] },
                { uid: `blk_${uidCounter++}`, type: 'button', content: 'Agregar al carrito', children: [] },
            ]},
        ]},
        { uid: `blk_${uidCounter++}`, type: 'footer', content: 'Hecho por mí · Clase de desarrollo web', children: [] }
    ];
    selectedUid = nodes[0].uid;
    renderCanvas(); renderCode(); renderProps();
    showToast('Ejemplo cargado: tienda de perfumes');
}
