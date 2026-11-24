/* ==========================================================================
   CSSBLOCKBUILDER.TS — MÓDULO 06: CONSTRUCTOR VISUAL POR BLOQUES CSS
   ========================================================================== */
import { copyToClipboard, downloadTextFile, showToast } from '../utils/dom.js';
const PROPS = [
    { id: 'color', label: 'Color de texto', prop: 'color', color: '#EF4444', soft: 'rgba(239,68,68,.14)', description: 'Cambia el color de las letras.', defaultValue: '#3d312c', kind: 'color' },
    { id: 'bg', label: 'Color de fondo', prop: 'background-color', color: '#F59E0B', soft: 'rgba(245,158,11,.14)', description: 'Pinta el fondo del elemento.', defaultValue: '#fdf6e3', kind: 'color' },
    { id: 'font-size', label: 'Tamaño de letra', prop: 'font-size', color: '#3B82F6', soft: 'rgba(59,130,246,.14)', description: 'Hace el texto más grande o pequeño.', defaultValue: '20', kind: 'number', unit: 'px', min: 10, max: 80, step: 1 },
    { id: 'font-family', label: 'Tipo de letra', prop: 'font-family', color: '#8B5CF6', soft: 'rgba(139,92,246,.14)', description: 'Cambia la fuente del texto.', defaultValue: 'Arial, sans-serif', kind: 'select', options: ['Arial, sans-serif', 'Georgia, serif', '"Courier New", monospace', '"Trebuchet MS", sans-serif', 'Verdana, sans-serif'] },
    { id: 'font-weight', label: 'Grosor de letra', prop: 'font-weight', color: '#6366F1', soft: 'rgba(99,102,241,.14)', description: 'Normal o negrita.', defaultValue: 'bold', kind: 'select', options: ['normal', 'bold', '600', '700'] },
    { id: 'text-align', label: 'Alineación', prop: 'text-align', color: '#14B8A6', soft: 'rgba(20,184,166,.14)', description: 'Alinea el texto a la izquierda, centro o derecha.', defaultValue: 'center', kind: 'select', options: ['left', 'center', 'right', 'justify'] },
    { id: 'padding', label: 'Espacio interno', prop: 'padding', color: '#10B981', soft: 'rgba(16,185,129,.14)', description: 'Aire dentro del bloque.', defaultValue: '16', kind: 'number', unit: 'px', min: 0, max: 80, step: 2 },
    { id: 'margin', label: 'Espacio externo', prop: 'margin', color: '#84CC16', soft: 'rgba(132,204,22,.14)', description: 'Separación fuera del bloque.', defaultValue: '12', kind: 'number', unit: 'px', min: 0, max: 80, step: 2 },
    { id: 'border', label: 'Borde', prop: 'border', color: '#78716C', soft: 'rgba(120,113,108,.14)', description: 'Línea alrededor del bloque.', defaultValue: '3px solid #d4a574', kind: 'text' },
    { id: 'radius', label: 'Bordes redondeados', prop: 'border-radius', color: '#F97316', soft: 'rgba(249,115,22,.14)', description: 'Redondea las esquinas.', defaultValue: '10', kind: 'number', unit: 'px', min: 0, max: 60, step: 2 },
    { id: 'width', label: 'Ancho', prop: 'width', color: '#06B6D4', soft: 'rgba(6,182,212,.14)', description: 'Ancho del elemento (ej. 100%, 300px).', defaultValue: '100%', kind: 'text' },
    { id: 'height', label: 'Alto', prop: 'height', color: '#0EA5E9', soft: 'rgba(14,165,233,.14)', description: 'Alto del elemento (ej. auto, 200px).', defaultValue: 'auto', kind: 'text' },
    { id: 'shadow', label: 'Sombra', prop: 'box-shadow', color: '#64748B', soft: 'rgba(100,116,139,.14)', description: 'Sombra detrás del bloque.', defaultValue: '4px 4px 0 #a07d54', kind: 'text' },
    { id: 'opacity', label: 'Opacidad', prop: 'opacity', color: '#A855F7', soft: 'rgba(168,85,247,.14)', description: 'Transparencia: 1 visible, 0 invisible.', defaultValue: '1', kind: 'number', unit: '', min: 0, max: 1, step: 0.1 },
    { id: 'decoration', label: 'Decoración texto', prop: 'text-decoration', color: '#EC4899', soft: 'rgba(236,72,153,.14)', description: 'Subrayado, tachado o ninguno.', defaultValue: 'none', kind: 'select', options: ['none', 'underline', 'line-through'] },
    { id: 'display', label: 'Tipo de caja', prop: 'display', color: '#2563EB', soft: 'rgba(37,99,235,.14)', description: 'Cómo se comporta la caja.', defaultValue: 'block', kind: 'select', options: ['block', 'inline-block', 'flex', 'grid', 'none'] },
    { id: 'gap', label: 'Separación hijos', prop: 'gap', color: '#059669', soft: 'rgba(5,150,105,.14)', description: 'Espacio entre hijos (flex/grid).', defaultValue: '12', kind: 'number', unit: 'px', min: 0, max: 60, step: 2 },
];
let rules = [];
let selectedRuleUid = null;
let selectedPropUid = null;
let uid = 1;
function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function getDef(id) { return PROPS.find(p => p.id === id); }
function makeProp(type) { const d = getDef(type); return { uid: `cp_${uid++}`, type, value: d?.defaultValue ?? '' }; }
function makeRule(selector) { return { uid: `cr_${uid++}`, selector, props: [] }; }
function findRule(rid) { return rules.find(r => r.uid === rid) || null; }
function findProp(rid, pid) { const r = findRule(rid); return r?.props.find(p => p.uid === pid) || null; }
function cssValue(p) { const d = getDef(p.type); if (!d) return p.value; if (d.kind === 'number' && d.unit) return `${p.value}${d.unit}`; return p.value; }
function buildCss() {
    if (rules.length === 0) return '/* Agrega reglas y bloques de apariencia */';
    return rules.map(r => {
        if (r.props.length === 0) return `${r.selector} {\n  /* agrega propiedades aquí */\n}`;
        const body = r.props.map(p => { const d = getDef(p.type); return `  ${d?.prop || p.type}: ${cssValue(p)};`; }).join('\n');
        return `${r.selector} {\n${body}\n}`;
    }).join('\n\n');
}
function buildPreviewHtml() {
    const css = buildCss();
    return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><style>
body{font-family:system-ui,sans-serif;padding:16px;margin:0;background:#fdf6e3;color:#3d312c;}
.preview-card{background:#fff;border:2px dashed #d4a574;border-radius:8px;padding:16px;margin:12px 0;}
nav.preview-menu, .preview-menu{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0;}
.preview-menu span{background:#fff3e0;border:2px solid #d4a574;padding:6px 12px;border-radius:6px;font-weight:600;}
${css}
</style></head><body>
<header><h1>Mi página increíble</h1></header>
<nav class="menu preview-menu"><span>Inicio</span><span>Fotos</span><span>Contacto</span></nav>
<p>Este es un párrafo de ejemplo. Los estilos que crees se aplican aquí.</p>
<div class="tarjeta preview-card"><h3>Tarjeta de ejemplo</h3><p>Soy una tarjeta con clase .tarjeta</p><button>Botón</button></div>
<footer><small>Pie de página</small></footer>
</body></html>`;
}
export function initCssBlockBuilder() {
    renderAll();
    document.getElementById('btn-css-clear')?.addEventListener('click', () => { rules = []; selectedRuleUid = null; selectedPropUid = null; renderAll(); showToast('Lienzo limpio'); });
    document.getElementById('btn-css-demo')?.addEventListener('click', () => { loadDemo(); renderAll(); showToast('Ejemplo cargado'); });
    document.getElementById('btn-css-copy')?.addEventListener('click', () => copyToClipboard(buildCss(), 'CSS copiado'));
    document.getElementById('btn-css-download')?.addEventListener('click', () => downloadTextFile('mis-estilos.css', buildCss()));
    document.getElementById('btn-css-add-rule')?.addEventListener('click', addRuleFromInput);
    document.getElementById('css-rule-input')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') addRuleFromInput(); });
}
function addRuleFromInput() {
    const inp = document.getElementById('css-rule-input');
    const sel = (inp?.value || '').trim();
    if (!sel) { showToast('Escribe un selector, ej: h1 o .tarjeta'); return; }
    const r = makeRule(sel);
    rules.push(r); selectedRuleUid = r.uid; selectedPropUid = null;
    if (inp) inp.value = '';
    renderAll(); showToast(`Regla ${sel} agregada`);
}
function renderAll() { renderPalette(); renderCanvas(); renderProps(); renderCode(); }
function renderPalette() {
    const pal = document.getElementById('css-palette');
    if (!pal) return;
    pal.innerHTML = PROPS.map(p => `
    <button type="button" class="block-palette-item" data-prop-type="${p.id}" title="${esc(p.description)}" style="--blk-c:${p.color};--blk-s:${p.soft}">
      <span class="block-palette-tag">${esc(p.prop)}</span>
      <span class="block-palette-label">${p.label}</span>
      <span class="block-palette-desc">${esc(p.description)}</span>
    </button>`).join('');
    pal.querySelectorAll('.block-palette-item').forEach(btn => { btn.addEventListener('click', () => { const t = btn.dataset.propType; if (t) addProp(t); }); });
}
function addProp(type) {
    let rule = selectedRuleUid ? findRule(selectedRuleUid) : null;
    if (!rule) { if (rules.length === 0) { rules.push(makeRule('body')); } rule = rules[rules.length - 1]; selectedRuleUid = rule.uid; }
    const p = makeProp(type);
    rule.props.push(p); selectedPropUid = p.uid;
    renderAll();
    const d = getDef(type);
    showToast(`${d?.label || type} agregado a ${rule.selector}`);
}
function renderCanvas() {
    const canvas = document.getElementById('css-canvas');
    const count = document.getElementById('css-count');
    if (count) count.textContent = `${rules.length} reglas · ${rules.reduce((a, r) => a + r.props.length, 0)} propiedades`;
    if (!canvas) return;
    if (rules.length === 0) { canvas.innerHTML = `<div class="blocks-empty"><div class="blocks-empty-icon">{ }</div><p><strong>Sin estilos todavía</strong></p><p>Agrega una regla (ej. <b>body</b> o <b>h1</b>) y luego haz clic en bloques de apariencia.</p></div>`; return; }
    canvas.innerHTML = rules.map(r => renderRule(r)).join('');
    bindCanvasEvents(canvas);
}
function renderRule(r) {
    const sel = r.uid === selectedRuleUid ? 'is-selected' : '';
    const props = r.props.map(p => {
        const d = getDef(p.type); if (!d) return '';
        const psel = p.uid === selectedPropUid ? 'is-prop-selected' : '';
        return `<div class="css-prop-row ${psel}" data-pid="${p.uid}" data-rid="${r.uid}" style="--blk-c:${d.color};--blk-s:${d.soft}">
      <span class="css-prop-name">${d.prop}</span><span class="css-prop-val">${esc(cssValue(p))}</span>
      <button type="button" class="blk-act blk-act-del" data-del-prop="${p.uid}" data-rid="${r.uid}" title="Quitar">×</button>
    </div>`;
    }).join('');
    return `<div class="block-node ${sel}" data-rid="${r.uid}" style="--blk-c:#D97706;--blk-s:rgba(217,119,6,.12)">
    <div class="block-node-head"><span class="block-node-tag">selector</span><span class="block-node-name">${esc(r.selector)}</span>
      <div class="block-node-actions"><button type="button" class="blk-act blk-act-del" data-del-rule="${r.uid}" title="Borrar regla">×</button></div>
    </div>
    <div class="block-children ${r.props.length ? '' : 'block-children-empty'}">${props || 'Haz clic en bloques de apariencia para agregar propiedades'}</div>
  </div>`;
}
function bindCanvasEvents(canvas) {
    canvas.querySelectorAll('.block-node[data-rid]').forEach(el => {
        el.addEventListener('click', (e) => { const t = e.target; if (t.closest('.blk-act') || t.closest('.css-prop-row')) return; selectedRuleUid = el.dataset.rid || null; selectedPropUid = null; renderAll(); });
    });
    canvas.querySelectorAll('.css-prop-row').forEach(el => {
        el.addEventListener('click', (e) => { e.stopPropagation(); selectedRuleUid = el.dataset.rid || null; selectedPropUid = el.dataset.pid || null; renderAll(); });
    });
    canvas.querySelectorAll('[data-del-rule]').forEach(btn => {
        btn.addEventListener('click', (e) => { e.stopPropagation(); const rid = btn.dataset.delRule; rules = rules.filter(r => r.uid !== rid); if (selectedRuleUid === rid) { selectedRuleUid = null; selectedPropUid = null; } renderAll(); showToast('Regla eliminada'); });
    });
    canvas.querySelectorAll('[data-del-prop]').forEach(btn => {
        btn.addEventListener('click', (e) => { e.stopPropagation(); const rid = btn.dataset.rid; const pid = btn.dataset.delProp; const r = findRule(rid); if (!r) return; r.props = r.props.filter(p => p.uid !== pid); if (selectedPropUid === pid) selectedPropUid = null; renderAll(); showToast('Propiedad eliminada'); });
    });
}
function renderProps() {
    const panel = document.getElementById('css-props');
    if (!panel) return;
    if (!selectedRuleUid || !selectedPropUid) { const r = selectedRuleUid ? findRule(selectedRuleUid) : null; panel.innerHTML = r ? `<p class="hint">Regla <b>${esc(r.selector)}</b> seleccionada. Haz clic en una propiedad para editarla, o agrega bloques de apariencia.</p>` : `<p class="hint">Selecciona una regla y una propiedad para editar su valor.</p>`; return; }
    const r = findRule(selectedRuleUid); const p = findProp(selectedRuleUid, selectedPropUid);
    if (!r || !p) { panel.innerHTML = ''; return; }
    const d = getDef(p.type); if (!d) return;
    let inputHtml = '';
    if (d.kind === 'color') inputHtml = `<div style="display:flex;gap:8px;align-items:center;"><input type="color" id="css-prop-input" value="${esc(p.value)}" style="width:56px;height:40px;border:1px solid var(--border-subtle);border-radius:6px;background:transparent;"><input type="text" id="css-prop-text" class="code-area" style="min-height:40px;flex:1;" value="${esc(p.value)}"></div>`;
    else if (d.kind === 'number') inputHtml = `<div style="display:flex;gap:8px;align-items:center;"><input type="range" id="css-prop-range" min="${d.min}" max="${d.max}" step="${d.step}" value="${esc(p.value)}" style="flex:1;"><input type="number" id="css-prop-input" class="code-area" style="min-height:40px;width:100px;" min="${d.min}" max="${d.max}" step="${d.step}" value="${esc(p.value)}"><span class="mono-tag">${d.unit || ''}</span></div>`;
    else if (d.kind === 'select') inputHtml = `<select id="css-prop-input" class="select-input">${(d.options || []).map(o => `<option value="${esc(o)}" ${o === p.value ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>`;
    else inputHtml = `<input type="text" id="css-prop-input" class="code-area" style="min-height:40px;" value="${esc(p.value)}">`;
    panel.innerHTML = `<div class="block-props-head" style="--blk-c:${d.color}"><span class="mono-tag">${esc(d.prop)}</span><strong>${d.label}</strong></div><p class="hint" style="margin:8px 0 12px;">${esc(d.description)}<br><span class="mono-tag">selector: ${esc(r.selector)}</span></p><label class="field-label" for="css-prop-input">Valor</label>${inputHtml}`;
    bindPropInputs(r, p, d);
}
function bindPropInputs(r, p, d) {
    const input = document.getElementById('css-prop-input');
    const text = document.getElementById('css-prop-text');
    const range = document.getElementById('css-prop-range');
    const commit = (val) => { p.value = val; renderCanvas(); renderCode(); };
    input?.addEventListener('input', () => { commit(input.value); if (text) text.value = input.value; if (range) range.value = input.value; });
    text?.addEventListener('input', () => { commit(text.value); if (input && 'value' in input) input.value = text.value; });
    range?.addEventListener('input', () => { commit(range.value); if (input) input.value = range.value; });
}
function renderCode() {
    const out = document.getElementById('css-code-output');
    if (out) out.textContent = buildCss();
    const frame = document.getElementById('css-preview');
    if (frame) frame.srcdoc = buildPreviewHtml();
}
function loadDemo() {
    uid = 1;
    rules = [
        { uid: `cr_${uid++}`, selector: 'body', props: [makeProp('bg'), makeProp('font-family'), makeProp('padding')] },
        { uid: `cr_${uid++}`, selector: 'h1', props: [makeProp('color'), makeProp('font-size'), makeProp('text-align')] },
        { uid: `cr_${uid++}`, selector: '.tarjeta', props: [makeProp('bg'), makeProp('padding'), makeProp('border'), makeProp('radius'), makeProp('shadow')] },
        { uid: `cr_${uid++}`, selector: 'button', props: [makeProp('bg'), makeProp('color'), makeProp('padding'), makeProp('radius'), makeProp('border')] },
    ];
    const set = (sel, prop, val) => { const r = rules.find(x => x.selector === sel); const p = r?.props.find(x => x.type === prop); if (p) p.value = val; };
    set('body', 'bg', '#fdf6e3'); set('body', 'padding', '24');
    set('h1', 'color', '#d4a574'); set('h1', 'font-size', '42');
    set('.tarjeta', 'bg', '#ffffff'); set('.tarjeta', 'border', '3px solid #d4a574'); set('.tarjeta', 'shadow', '4px 4px 0 #a07d54');
    set('button', 'bg', '#c49a6a'); set('button', 'color', '#ffffff'); set('button', 'border', 'none');
    selectedRuleUid = rules[0].uid; selectedPropUid = rules[0].props[0].uid;
}
