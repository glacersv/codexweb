/* ==========================================================================
   GRIDSTUDIO.TS — MÓDULO 02: LABORATORIO INTERACTIVO DE CSS GRID 2D
   ========================================================================== */
import { SEMANTIC_BRUSHES } from '../data/curriculum.js';
import { copyToClipboard, downloadTextFile, showToast } from '../utils/dom.js';
const state = {
    cols: 4,
    rows: 4,
    gap: 12,
    brush: 'header',
    viewMode: 'cells',
    codeTab: 'full',
    isDragging: false,
    cells: Array(16).fill(null)
};
export function initGridStudio() {
    renderBrushSelector();
    // Controles de dimensiones
    document.getElementById('studio-cols')?.addEventListener('change', handleDimensionChange);
    document.getElementById('studio-rows')?.addEventListener('change', handleDimensionChange);
    document.getElementById('studio-gap')?.addEventListener('change', handleDimensionChange);
    document.getElementById('studio-col-template')?.addEventListener('change', () => renderStudioCanvas());
    // Presets rápidos
    document.getElementById('preset-holygrail')?.addEventListener('click', () => loadGridPreset('holygrail'));
    document.getElementById('preset-bento')?.addEventListener('click', () => loadGridPreset('bento'));
    document.getElementById('preset-dashboard')?.addEventListener('click', () => loadGridPreset('dashboard'));
    document.getElementById('preset-landing')?.addEventListener('click', () => loadGridPreset('landing'));
    document.getElementById('preset-clear')?.addEventListener('click', clearGridStudio);
    // Vistas del lienzo y pestañas de código
    document.getElementById('btn-grid-mode-cells')?.addEventListener('click', () => setGridViewMode('cells'));
    document.getElementById('btn-grid-mode-preview')?.addEventListener('click', () => setGridViewMode('preview'));
    document.getElementById('btn-code-htmlcss')?.addEventListener('click', () => setStudioCodeTab('full'));
    document.getElementById('btn-code-css')?.addEventListener('click', () => setStudioCodeTab('css'));
    // Copiar y descargar
    document.getElementById('btn-copy-grid-code')?.addEventListener('click', () => {
        copyToClipboard(buildGeneratedCode(), 'Código CSS Grid copiado');
    });
    document.getElementById('btn-download-grid-html')?.addEventListener('click', () => {
        downloadTextFile('maqueta-css-grid.html', buildGeneratedCode('full'));
    });
    window.addEventListener('mouseup', () => {
        state.isDragging = false;
    });
    loadGridPreset('holygrail');
    setStudioCodeTab('full');
}
function renderBrushSelector() {
    const container = document.getElementById('studio-brush-list');
    if (!container)
        return;
    container.innerHTML = Object.values(SEMANTIC_BRUSHES)
        .map(meta => `
      <button type="button"
              class="brush-card ${state.brush === meta.key ? 'active' : ''}"
              data-brush-key="${meta.key}"
              style="${meta.key === 'eraser' ? 'grid-column: span 2;' : ''}">
        <span class="brush-dot" style="background:${meta.color};"></span>
        <div>
          <div style="font-family:var(--font-mono); font-size:12px; font-weight:600;">
            ${meta.tag ? `&lt;${meta.tag}&gt;` : 'Borrar Celda'}
          </div>
          <div style="font-size:10.5px; color:var(--text-muted);">${meta.name}</div>
        </div>
      </button>
    `)
        .join('');
    container.querySelectorAll('.brush-card').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.brushKey;
            if (key) {
                state.brush = key;
                renderBrushSelector();
            }
        });
    });
}
function handleDimensionChange() {
    const colsInput = document.getElementById('studio-cols');
    const rowsInput = document.getElementById('studio-rows');
    const gapInput = document.getElementById('studio-gap');
    const cols = Math.min(8, Math.max(1, parseInt(colsInput?.value || '4', 10) || 4));
    const rows = Math.min(8, Math.max(1, parseInt(rowsInput?.value || '4', 10) || 4));
    const gap = Math.min(40, Math.max(0, parseInt(gapInput?.value || '12', 10) || 0));
    state.gap = gap;
    if (cols !== state.cols || rows !== state.rows) {
        state.cols = cols;
        state.rows = rows;
        state.cells = Array(rows * cols).fill(null);
    }
    renderStudioCanvas();
}
function getColumnTrackRule() {
    const select = document.getElementById('studio-col-template');
    const mode = select?.value || 'equal';
    const c = state.cols;
    if (mode === 'sidebar-left' && c > 1)
        return `220px repeat(${c - 1}, 1fr)`;
    if (mode === 'asymmetric' && c > 1)
        return `2fr repeat(${c - 1}, 1fr)`;
    return `repeat(${c}, 1fr)`;
}
function paintCellAtIndex(idx, dragContinuation = false) {
    if (state.brush === 'eraser') {
        state.cells[idx] = null;
    }
    else if (dragContinuation) {
        state.cells[idx] = state.brush;
    }
    else {
        state.cells[idx] = state.cells[idx] === state.brush ? null : state.brush;
    }
    renderStudioCanvas();
}
function computeMergedBlocks() {
    const { rows, cols, cells } = state;
    const visited = Array(rows * cols).fill(false);
    const blocks = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const idx = r * cols + c;
            if (visited[idx])
                continue;
            const cellType = cells[idx];
            if (!cellType) {
                visited[idx] = true;
                continue;
            }
            let maxC = c;
            while (maxC + 1 < cols &&
                !visited[r * cols + (maxC + 1)] &&
                cells[r * cols + (maxC + 1)] === cellType) {
                maxC++;
            }
            let maxR = r;
            let canExpand = true;
            while (maxR + 1 < rows && canExpand) {
                for (let cc = c; cc <= maxC; cc++) {
                    const checkIdx = (maxR + 1) * cols + cc;
                    if (visited[checkIdx] || cells[checkIdx] !== cellType) {
                        canExpand = false;
                        break;
                    }
                }
                if (canExpand)
                    maxR++;
            }
            for (let vr = r; vr <= maxR; vr++) {
                for (let vc = c; vc <= maxC; vc++) {
                    visited[vr * cols + vc] = true;
                }
            }
            blocks.push({
                type: cellType,
                rStart: r + 1,
                rEnd: maxR + 2,
                cStart: c + 1,
                cEnd: maxC + 2,
                colSpan: maxC - c + 1,
                rowSpan: maxR - r + 1
            });
        }
    }
    return blocks;
}
function setGridViewMode(mode) {
    state.viewMode = mode;
    document.getElementById('btn-grid-mode-cells')?.classList.toggle('btn-primary', mode === 'cells');
    document.getElementById('btn-grid-mode-preview')?.classList.toggle('btn-primary', mode === 'preview');
    renderStudioCanvas();
}
function setStudioCodeTab(tab) {
    state.codeTab = tab;
    document.getElementById('btn-code-htmlcss')?.classList.toggle('btn-primary', tab === 'full');
    document.getElementById('btn-code-css')?.classList.toggle('btn-primary', tab === 'css');
    updateCodePane();
}
function renderStudioCanvas() {
    const canvas = document.getElementById('studio-grid-canvas');
    if (!canvas)
        return;
    const { rows, cols, gap, cells, viewMode } = state;
    const colTemplate = getColumnTrackRule();
    const liveLabel = document.getElementById('studio-live-declaration');
    if (liveLabel) {
        liveLabel.textContent = `grid-template-columns: ${colTemplate}; gap: ${gap}px;`;
    }
    canvas.style.display = 'grid';
    canvas.style.gridTemplateColumns = colTemplate;
    canvas.style.gridTemplateRows = `repeat(${rows}, minmax(82px, 1fr))`;
    canvas.style.gap = `${gap}px`;
    if (viewMode === 'cells') {
        canvas.innerHTML = cells
            .map((cellType, idx) => {
            const r = Math.floor(idx / cols) + 1;
            const c = (idx % cols) + 1;
            if (!cellType) {
                return `
            <div class="grid-cell" data-cell-idx="${idx}">
              <div class="cell-coord tabular"><span>F${r}:C${c}</span><span>+</span></div>
              <span class="mono-tag" style="opacity:0.45;">Vacío</span>
            </div>
          `;
            }
            const meta = SEMANTIC_BRUSHES[cellType];
            return `
          <div class="grid-cell painted"
               data-cell-idx="${idx}"
               style="background:${meta.soft}; border-color:${meta.color};">
            <div class="cell-coord tabular">
              <span style="color:${meta.color}; font-weight:600;">F${r}:C${c}</span>
              <span style="width:7px; height:7px; border-radius:50%; background:${meta.color};"></span>
            </div>
            <div class="cell-tag-label" style="color:var(--text-primary);">&lt;${meta.tag}&gt;</div>
          </div>
        `;
        })
            .join('');
        canvas.querySelectorAll('.grid-cell').forEach(cellEl => {
            const idx = Number(cellEl.dataset.cellIdx);
            cellEl.addEventListener('mousedown', () => {
                state.isDragging = true;
                paintCellAtIndex(idx, false);
            });
            cellEl.addEventListener('mouseenter', () => {
                if (state.isDragging) {
                    paintCellAtIndex(idx, true);
                }
            });
        });
    }
    else {
        const blocks = computeMergedBlocks();
        if (blocks.length === 0) {
            canvas.innerHTML = `<div style="grid-column: 1 / -1; grid-row: 1 / -1; display:flex; align-items:center; justify-content:center; color:var(--text-muted); font-family:var(--font-mono);">Pinta celdas en la "Vista Celdas" para visualizar las áreas fusionadas</div>`;
        }
        else {
            canvas.innerHTML = blocks
                .map(b => {
                const meta = SEMANTIC_BRUSHES[b.type];
                return `
            <div class="rendered-block"
                 style="grid-column:${b.cStart}/${b.cEnd}; grid-row:${b.rStart}/${b.rEnd}; border-color:${meta.color}; background:${meta.soft};">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-family:var(--font-mono); font-weight:600; font-size:13px; color:${meta.color};">&lt;${meta.tag}&gt;</span>
                <span class="mono-tag tabular">${b.colSpan} col × ${b.rowSpan} fila</span>
              </div>
              <div class="mono-tag tabular" style="color:var(--text-secondary);">
                grid-column: ${b.cStart} / ${b.cEnd}; · grid-row: ${b.rStart} / ${b.rEnd};
              </div>
            </div>
          `;
            })
                .join('');
        }
    }
    updateCodePane();
}
export function loadGridPreset(preset) {
    if (preset === 'holygrail') {
        state.rows = 4;
        state.cols = 4;
        state.gap = 12;
        state.cells = [
            'header', 'header', 'header', 'header',
            'nav', 'main', 'main', 'aside',
            'nav', 'main', 'main', 'aside',
            'footer', 'footer', 'footer', 'footer'
        ];
    }
    else if (preset === 'bento') {
        state.rows = 3;
        state.cols = 4;
        state.gap = 14;
        state.cells = [
            'main', 'main', 'header', 'header',
            'main', 'main', 'article', 'aside',
            'footer', 'footer', 'footer', 'footer'
        ];
    }
    else if (preset === 'dashboard') {
        state.rows = 4;
        state.cols = 4;
        state.gap = 12;
        state.cells = [
            'aside', 'header', 'header', 'header',
            'aside', 'article', 'article', 'article',
            'aside', 'main', 'main', 'main',
            'aside', 'main', 'main', 'main'
        ];
    }
    else if (preset === 'landing') {
        state.rows = 3;
        state.cols = 3;
        state.gap = 14;
        state.cells = [
            'header', 'header', 'header',
            'main', 'main', 'main',
            'article', 'article', 'article'
        ];
    }
    const colsInput = document.getElementById('studio-cols');
    const rowsInput = document.getElementById('studio-rows');
    const gapInput = document.getElementById('studio-gap');
    if (colsInput)
        colsInput.value = String(state.cols);
    if (rowsInput)
        rowsInput.value = String(state.rows);
    if (gapInput)
        gapInput.value = String(state.gap);
    renderStudioCanvas();
    showToast(`Plantilla "${preset.toUpperCase()}" cargada en el Estudio`);
}
function clearGridStudio() {
    state.cells = Array(state.rows * state.cols).fill(null);
    renderStudioCanvas();
    showToast('Cuadrícula limpiada');
}
function buildGeneratedCode(mode = state.codeTab) {
    const blocks = computeMergedBlocks();
    const colTemplate = getColumnTrackRule();
    const { rows, gap } = state;
    const blockRules = blocks
        .map((b, i) => {
        const meta = SEMANTIC_BRUSHES[b.type];
        return `.area-${meta.tag}-${i + 1} {\n  grid-column: ${b.cStart} / ${b.cEnd};\n  grid-row: ${b.rStart} / ${b.rEnd};\n}`;
    })
        .join('\n\n');
    const cssOnly = `.layout-grid {\n  display: grid;\n  grid-template-columns: ${colTemplate};\n  grid-template-rows: repeat(${rows}, minmax(120px, auto));\n  gap: ${gap}px;\n  min-height: 100vh;\n  padding: ${gap}px;\n}\n\n${blockRules}`;
    if (mode === 'css')
        return cssOnly;
    const htmlNodes = blocks
        .map((b, i) => {
        const meta = SEMANTIC_BRUSHES[b.type];
        return `    <${meta.tag} class="bloque area-${meta.tag}-${i + 1}">\n      <span>&lt;${meta.tag}&gt; (${b.colSpan}×${b.rowSpan})</span>\n    </${meta.tag}>`;
    })
        .join('\n');
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Maqueta Arquitectónica CSS Grid</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #09090B; color: #F4F4F6; font-family: system-ui, sans-serif; }
    .bloque {
      background: #141418;
      border: 1px solid rgba(255,255,255,0.14);
      border-radius: 8px;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: monospace;
    }
${cssOnly.split('\n').map(l => '    ' + l).join('\n')}
  </style>
</head>
<body>
  <div class="layout-grid">
${htmlNodes}
  </div>
</body>
</html>`;
}
function updateCodePane() {
    const codeEl = document.getElementById('studio-code-output');
    if (codeEl)
        codeEl.textContent = buildGeneratedCode();
}
