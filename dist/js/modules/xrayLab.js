/* ==========================================================================
   XRAYLAB.TS — MÓDULO 01: RAYOS X (CONTADOR DE FILAS Y COLUMNAS)
   ========================================================================== */

import { XRAY_CASES } from '../data/curriculum.js';
                                                                 
import { showToast } from '../utils/dom.js';

                        
                  
                   
                   
 

const state               = {
  caseIdx: 0,
  userCols: 2,
  userRows: 2
};

export function initXrayLab(
  onNavigate                         ,
  onLoadPreset                                
)       {
  // Botones de selección de casos
  XRAY_CASES.forEach((_, idx) => {
    const btn = document.getElementById(`xray-case-btn-${idx}`);
    btn?.addEventListener('click', () => loadXrayCase(idx));
  });

  // Steppers de columnas y filas
  document.getElementById('xray-col-dec')?.addEventListener('click', () => adjustCount('cols', -1));
  document.getElementById('xray-col-inc')?.addEventListener('click', () => adjustCount('cols', 1));
  document.getElementById('xray-row-dec')?.addEventListener('click', () => adjustCount('rows', -1));
  document.getElementById('xray-row-inc')?.addEventListener('click', () => adjustCount('rows', 1));

  // Checkboxes de capas
  document.getElementById('xray-toggle-guides')?.addEventListener('change', () => renderXrayGuides());
  document.getElementById('xray-toggle-tags')?.addEventListener('change', () => renderXrayMarkup());

  // Verificar conteo y enviar al estudio Grid
  document.getElementById('xray-verify-btn')?.addEventListener('click', () => verifyCount());
  document.getElementById('xray-send-grid-btn')?.addEventListener('click', () => {
    const current = XRAY_CASES[state.caseIdx];
    if (!current) return;
    onNavigate('grid');
    onLoadPreset(current.presetToLoad);
  });

  loadXrayCase(0);
}

export function loadXrayCase(idx        )       {
  const spec = XRAY_CASES[idx];
  if (!spec) return;

  state.caseIdx = idx;
  const tagEl = document.getElementById('xray-case-tag');
  if (tagEl) tagEl.textContent = spec.shortTag;

  renderXrayMarkup();
  renderXrayGuides();

  const fb = document.getElementById('xray-feedback');
  if (fb) {
    fb.style.borderColor = 'var(--border-hairline)';
    fb.style.background = 'var(--bg-elevated)';
    fb.innerHTML = `Caso activo: <strong>${spec.id}</strong>. Ajusta los contadores hasta alinear las guías con los bloques.`;
  }
}

function adjustCount(axis                 , delta        )       {
  if (axis === 'cols') {
    state.userCols = Math.min(8, Math.max(1, state.userCols + delta));
    const el = document.getElementById('xray-cols-val');
    if (el) el.textContent = String(state.userCols);
  } else {
    state.userRows = Math.min(8, Math.max(1, state.userRows + delta));
    const el = document.getElementById('xray-rows-val');
    if (el) el.textContent = String(state.userRows);
  }
  renderXrayGuides();
}

function renderXrayMarkup()       {
  const spec = XRAY_CASES[state.caseIdx];
  const container = document.getElementById('xray-mockup-content');
  const toggleTags = document.getElementById('xray-toggle-tags')                           ;
  if (!spec || !container) return;

  container.innerHTML = spec.renderMarkup(Boolean(toggleTags?.checked));
}

function renderXrayGuides()       {
  const layer = document.getElementById('xray-guides-layer');
  const toggleGuides = document.getElementById('xray-toggle-guides')                           ;
  if (!layer) return;

  if (toggleGuides && !toggleGuides.checked) {
    layer.innerHTML = '';
    return;
  }

  const { userCols, userRows } = state;
  let html = '';

  for (let c = 0; c < userCols; c++) {
    const leftPct = (c / userCols) * 100;
    const widthPct = (1 / userCols) * 100;
    html += `
      <div class="xray-guide-col" style="left:${leftPct}%; width:${widthPct}%;">
        <span class="guide-badge col">COL ${c + 1}</span>
      </div>
    `;
  }

  for (let r = 0; r < userRows; r++) {
    const topPct = (r / userRows) * 100;
    const heightPct = (1 / userRows) * 100;
    html += `
      <div class="xray-guide-row" style="top:${topPct}%; height:${heightPct}%;">
        <span class="guide-badge row">FILA ${r + 1}</span>
      </div>
    `;
  }

  layer.innerHTML = html;
}

function verifyCount()       {
  const spec = XRAY_CASES[state.caseIdx];
  const fb = document.getElementById('xray-feedback');
  if (!spec || !fb) return;

  if (state.userCols === spec.targetCols && state.userRows === spec.targetRows) {
    fb.style.borderColor = 'var(--signal-ok)';
    fb.style.background = 'var(--signal-ok-soft)';
    fb.innerHTML = `<strong style="color:var(--signal-ok);">✓ ¡Conteo Exacto (${spec.targetCols} Columnas × ${spec.targetRows} Filas)!</strong><br>${spec.explanation}`;
    showToast('¡Retícula identificada con precisión!', 'var(--signal-ok)');
  } else {
    fb.style.borderColor = 'var(--signal-warn)';
    fb.style.background = 'var(--signal-warn-soft)';
    fb.innerHTML = `<strong style="color:var(--signal-warn);">Revisa la matriz:</strong> Marcaste ${state.userCols} cols × ${state.userRows} filas. Observa la fila con mayor cantidad de tarjetas pequeñas para hallar las columnas reales.`;
  }
}
