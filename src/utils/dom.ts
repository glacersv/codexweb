/* ==========================================================================
   DOM.TS — UTILIDADES TIPADAS: SONNER TOAST, ARCHIVOS, PORTAPAPELES & CTRL+K
   ========================================================================== */

import type { CommandPaletteAction } from '../types/course.js';

export function showToast(message: string, dotColor: string = 'var(--accent)'): void {
  const container = document.getElementById('sonner-toaster');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'sonner-toast';
  toast.innerHTML = `
    <span style="width:7px; height:7px; border-radius:50%; background:${dotColor}; flex-shrink:0;"></span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });

  window.setTimeout(() => {
    toast.classList.remove('visible');
    window.setTimeout(() => toast.remove(), 290);
  }, 2800);
}

export function copyToClipboard(text: string, successMessage: string = 'Código copiado al portapapeles'): void {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage, 'var(--signal-ok)');
    }).catch(() => {
      fallbackCopy(text, successMessage);
    });
  } else {
    fallbackCopy(text, successMessage);
  }
}

function fallbackCopy(text: string, successMessage: string): void {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  ta.remove();
  showToast(successMessage, 'var(--signal-ok)');
}

export function downloadTextFile(filename: string, content: string, mimeType: string = 'text/html;charset=utf-8'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  showToast(`Archivo "${filename}" descargado`, 'var(--signal-ok)');
}

/* Controlador de Command Palette (Ctrl+K / Cmd+K) */
let registeredCommands: CommandPaletteAction[] = [];

export function initCommandPalette(actions: CommandPaletteAction[]): void {
  registeredCommands = actions;

  const backdrop = document.getElementById('cmdk-backdrop');
  const input = document.getElementById('cmdk-input') as HTMLInputElement | null;

  if (!backdrop || !input) return;

  backdrop.addEventListener('click', (e: MouseEvent) => {
    if (e.target === backdrop) closeCommandPalette();
  });

  input.addEventListener('input', () => {
    renderCommandList(input.value);
  });

  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      toggleCommandPalette();
    } else if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeCommandPalette();
    }
  });

  renderCommandList('');
}

export function toggleCommandPalette(): void {
  const backdrop = document.getElementById('cmdk-backdrop');
  if (!backdrop) return;
  if (backdrop.classList.contains('open')) {
    closeCommandPalette();
  } else {
    openCommandPalette();
  }
}

export function openCommandPalette(): void {
  const backdrop = document.getElementById('cmdk-backdrop');
  const input = document.getElementById('cmdk-input') as HTMLInputElement | null;
  if (!backdrop || !input) return;

  backdrop.classList.add('open');
  input.value = '';
  renderCommandList('');
  window.setTimeout(() => input.focus(), 40);
}

export function closeCommandPalette(): void {
  const backdrop = document.getElementById('cmdk-backdrop');
  if (backdrop) backdrop.classList.remove('open');
}

function renderCommandList(query: string): void {
  const listEl = document.getElementById('cmdk-list');
  if (!listEl) return;

  const normalized = query.trim().toLowerCase();
  const filtered = registeredCommands.filter(
    cmd =>
      cmd.label.toLowerCase().includes(normalized) ||
      cmd.category.toLowerCase().includes(normalized)
  );

  if (filtered.length === 0) {
    listEl.innerHTML = `<div style="padding:18px; text-align:center; color:var(--text-muted); font-family:var(--font-mono); font-size:12px;">Sin comandos coincidentes</div>`;
    return;
  }

  listEl.innerHTML = filtered
    .map(
      (cmd, idx) => `
      <button class="cmdk-item" data-cmd-idx="${idx}" type="button">
        <span>
          <span class="mono-tag" style="margin-right:8px; color:var(--accent);">${cmd.category}</span>
          <span>${cmd.label}</span>
        </span>
        <kbd>${cmd.shortcut}</kbd>
      </button>
    `
    )
    .join('');

  listEl.querySelectorAll<HTMLButtonElement>('.cmdk-item').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      const action = filtered[idx];
      closeCommandPalette();
      if (action) action.run();
    });
  });
}
