/* ==========================================================================
   MOCKUPBUILDER.TS — MÓDULO 03: CONSTRUCTOR DRAG & DROP + ÁRBOL DOM SEMÁNTICO
   ========================================================================== */

import { MOCKUP_COMPONENTS } from '../data/curriculum.js';
import { copyToClipboard, downloadTextFile } from '../utils/dom.js';

let mockupSequence: string[] = ['nav', 'hero', 'bento3', 'footer'];

export function initMockupBuilder(): void {
  // Botones de Viewport
  document.getElementById('vp-desktop')?.addEventListener('click', () => setViewport('100%', '1280px · Desktop'));
  document.getElementById('vp-tablet')?.addEventListener('click', () => setViewport('520px', '768px · Tablet'));
  document.getElementById('vp-mobile')?.addEventListener('click', () => setViewport('340px', '375px · Mobile'));

  // Vaciar, Copiar y Exportar
  document.getElementById('btn-clear-mockup')?.addEventListener('click', () => {
    mockupSequence = [];
    renderMockupStudio();
  });

  document.getElementById('btn-copy-mockup')?.addEventListener('click', () => {
    const code = document.getElementById('mockup-code-output')?.textContent || '';
    copyToClipboard(code, 'Estructura HTML5 copiada');
  });

  document.getElementById('btn-export-mockup')?.addEventListener('click', () => {
    const code = document.getElementById('mockup-code-output')?.textContent || '';
    downloadTextFile('estructura-mockup.html', code);
  });

  // Zona Drop
  const dropZone = document.getElementById('mockup-canvas-drop');
  if (dropZone) {
    dropZone.addEventListener('dragover', (e: DragEvent) => {
      e.preventDefault();
      dropZone.style.background = 'var(--accent-soft)';
    });
    dropZone.addEventListener('dragleave', () => {
      dropZone.style.background = 'transparent';
    });
    dropZone.addEventListener('drop', (e: DragEvent) => {
      e.preventDefault();
      dropZone.style.background = 'transparent';
      const compId = e.dataTransfer?.getData('text/plain');
      if (compId) {
        mockupSequence.push(compId);
        renderMockupStudio();
      }
    });
  }

  renderMockupStudio();
}

function setViewport(width: string, label: string): void {
  const frame = document.getElementById('mockup-browser-frame');
  const labelEl = document.getElementById('mockup-viewport-label');
  if (frame) frame.style.width = width;
  if (labelEl) labelEl.textContent = label;
}

function renderMockupStudio(): void {
  const lib = document.getElementById('mockup-library');
  if (lib) {
    lib.innerHTML = MOCKUP_COMPONENTS.map(
      comp => `
        <div class="component-pill" draggable="true" data-comp-id="${comp.id}">
          <div>
            <div style="font-size:12.5px; font-weight:600;">${comp.title}</div>
            <div class="mono-tag">&lt;${comp.tag}&gt;</div>
          </div>
          <span class="mono-tag" style="color:var(--accent); font-weight:700;">+ AÑADIR</span>
        </div>
      `
    ).join('');

    lib.querySelectorAll<HTMLElement>('.component-pill').forEach(pill => {
      const id = pill.dataset.compId || '';
      pill.addEventListener('dragstart', (e: DragEvent) => {
        e.dataTransfer?.setData('text/plain', id);
      });
      pill.addEventListener('click', () => {
        mockupSequence.push(id);
        renderMockupStudio();
      });
    });
  }

  const drop = document.getElementById('mockup-canvas-drop');
  const counter = document.getElementById('mockup-block-counter');
  if (counter) counter.textContent = `${mockupSequence.length} nodos`;

  if (drop) {
    if (mockupSequence.length === 0) {
      drop.innerHTML = `
        <div style="margin:auto; text-align:center; padding:48px 20px; color:var(--text-muted); font-family:var(--font-mono); font-size:12px;">
          Arrastra bloques desde la biblioteca izquierda o haz clic en "+ AÑADIR"
        </div>
      `;
    } else {
      drop.innerHTML = mockupSequence
        .map((id, idx) => {
          const item = MOCKUP_COMPONENTS.find(x => x.id === id);
          if (!item) return '';
          return `
            <div class="wireframe-block" data-node-idx="${idx}">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span class="mono-tag tabular" style="color:var(--accent); font-weight:600;">0${idx + 1} · &lt;${item.tag}&gt; ${item.title}</span>
                <div style="display:flex; gap:4px;">
                  <button type="button" class="btn btn-sm" data-move-up="${idx}" style="padding:2px 6px;">↑</button>
                  <button type="button" class="btn btn-sm" data-move-down="${idx}" style="padding:2px 6px;">↓</button>
                  <button type="button" class="btn btn-sm" data-remove="${idx}" style="padding:2px 6px; color:var(--signal-err);">×</button>
                </div>
              </div>
              ${item.wireframeHtml}
            </div>
          `;
        })
        .join('');

      drop.querySelectorAll<HTMLButtonElement>('[data-move-up]').forEach(btn => {
        btn.addEventListener('click', () => moveNode(Number(btn.dataset.moveUp), -1));
      });
      drop.querySelectorAll<HTMLButtonElement>('[data-move-down]').forEach(btn => {
        btn.addEventListener('click', () => moveNode(Number(btn.dataset.moveDown), 1));
      });
      drop.querySelectorAll<HTMLButtonElement>('[data-remove]').forEach(btn => {
        btn.addEventListener('click', () => {
          mockupSequence.splice(Number(btn.dataset.remove), 1);
          renderMockupStudio();
        });
      });
    }
  }

  const bodyBlocks = mockupSequence
    .map(id => {
      const comp = MOCKUP_COMPONENTS.find(x => x.id === id);
      return comp ? comp.semanticCode.split('\n').map(l => '    ' + l).join('\n') : '';
    })
    .filter(Boolean)
    .join('\n\n');

  const fullCode = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mockup Semántico HTML5</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main>
${bodyBlocks || '    <!-- Agrega bloques para construir el árbol DOM -->'}
  </main>
</body>
</html>`;

  const out = document.getElementById('mockup-code-output');
  if (out) out.textContent = fullCode;
}

function moveNode(idx: number, direction: number): void {
  const target = idx + direction;
  if (target < 0 || target >= mockupSequence.length) return;
  const temp = mockupSequence[idx];
  const dest = mockupSequence[target];
  if (temp !== undefined && dest !== undefined) {
    mockupSequence[idx] = dest;
    mockupSequence[target] = temp;
    renderMockupStudio();
  }
}
