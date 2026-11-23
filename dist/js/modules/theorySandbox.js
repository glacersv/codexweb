/* ==========================================================================
   THEORYSANDBOX.TS — MÓDULO 04: BOX MODEL DE PRECISIÓN, SIMULADOR & SANDBOX
   ========================================================================== */
const DEFAULT_SANDBOX_SNIPPET = `<style>
  body {
    margin: 0;
    padding: 16px;
    background: #0c0c0f;
    color: #f4f4f6;
    font-family: system-ui, sans-serif;
  }
  .reticula {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .caja {
    background: #18181d;
    border: 1px solid #2e2e38;
    border-radius: 8px;
    padding: 18px;
  }
  .destacado {
    grid-column: 1 / 3;
    border-color: #ff5500;
  }
</style>

<div class="reticula">
  <div class="caja destacado">
    <strong>Bloque Span 2 Columnas</strong>
    <p>Cambia "1 / 3" por "1 / 4" arriba para ocupar toda la fila.</p>
  </div>
  <div class="caja">Columna 3</div>
  <div class="caja">Fila 2 · A</div>
  <div class="caja">Fila 2 · B</div>
  <div class="caja">Fila 2 · C</div>
</div>`;
export function initTheorySandbox() {
    // Sliders Box Model
    document.getElementById('bm-m-slider')?.addEventListener('input', updatePrecisionBoxModel);
    document.getElementById('bm-b-slider')?.addEventListener('input', updatePrecisionBoxModel);
    document.getElementById('bm-p-slider')?.addEventListener('input', updatePrecisionBoxModel);
    // Botones Simulador 1D vs 2D
    document.getElementById('sim-btn-flex')?.addEventListener('click', () => setLayoutSim('flex-between'));
    document.getElementById('sim-btn-grid3')?.addEventListener('click', () => setLayoutSim('grid-3'));
    document.getElementById('sim-btn-bento')?.addEventListener('click', () => setLayoutSim('grid-bento'));
    // Sandbox en vivo
    const editor = document.getElementById('live-sandbox-editor');
    editor?.addEventListener('input', updateLiveSandbox);
    document.getElementById('btn-reset-sandbox')?.addEventListener('click', resetLiveSandbox);
    updatePrecisionBoxModel();
    resetLiveSandbox();
}
function updatePrecisionBoxModel() {
    const mSlider = document.getElementById('bm-m-slider');
    const bSlider = document.getElementById('bm-b-slider');
    const pSlider = document.getElementById('bm-p-slider');
    const m = parseInt(mSlider?.value || '20', 10);
    const b = parseInt(bSlider?.value || '2', 10);
    const p = parseInt(pSlider?.value || '20', 10);
    const mLabel = document.getElementById('bm-m-label');
    const bLabel = document.getElementById('bm-b-label');
    const pLabel = document.getElementById('bm-p-label');
    if (mLabel)
        mLabel.textContent = `${m}px`;
    if (bLabel)
        bLabel.textContent = `${b}px`;
    if (pLabel)
        pLabel.textContent = `${p}px`;
    const outer = document.getElementById('bm-outer-margin');
    const mid = document.getElementById('bm-mid-padding');
    if (outer)
        outer.style.padding = `${m}px`;
    if (mid) {
        mid.style.borderWidth = `${b}px`;
        mid.style.padding = `${p}px`;
    }
    const totalExtra = (m + b + p) * 2;
    const summary = document.getElementById('bm-computed-total');
    if (summary) {
        summary.textContent = `Espacio total alrededor: +${totalExtra}px (${m}m + ${b}b + ${p}p por lado)`;
    }
}
function setLayoutSim(mode) {
    const stage = document.getElementById('sim-stage');
    const rule = document.getElementById('sim-css-rule');
    if (!stage || !rule)
        return;
    const items = stage.querySelectorAll('.sim-item');
    items.forEach(el => {
        el.style.gridColumn = '';
    });
    if (mode === 'flex-between') {
        stage.style.display = 'flex';
        stage.style.justifyContent = 'space-between';
        stage.style.alignItems = 'center';
        rule.textContent = 'display: flex; justify-content: space-between; align-items: center; (1D)';
    }
    else if (mode === 'grid-3') {
        stage.style.display = 'grid';
        stage.style.gridTemplateColumns = 'repeat(3, 1fr)';
        rule.textContent = 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; (2D)';
    }
    else if (mode === 'grid-bento') {
        stage.style.display = 'grid';
        stage.style.gridTemplateColumns = 'repeat(3, 1fr)';
        if (items[0])
            items[0].style.gridColumn = '1 / 3';
        if (items[3])
            items[3].style.gridColumn = '2 / 4';
        rule.textContent = 'display: grid; + .nodo-1 { grid-column: 1 / 3; } (Fusión 2D)';
    }
}
function resetLiveSandbox() {
    const editor = document.getElementById('live-sandbox-editor');
    if (editor) {
        editor.value = DEFAULT_SANDBOX_SNIPPET;
        updateLiveSandbox();
    }
}
function updateLiveSandbox() {
    const editor = document.getElementById('live-sandbox-editor');
    const iframe = document.getElementById('live-sandbox-preview');
    if (editor && iframe) {
        iframe.srcdoc = editor.value;
    }
}
