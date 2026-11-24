/* ==========================================================================
   MAIN.TS — ORQUESTADOR PRINCIPAL TYPESCRIPT (NAVEGACIÓN, ATAJOS & MÓDULOS)
   ========================================================================== */

import { initGridStudio, loadGridPreset } from './modules/gridStudio.js';
import { initMockupBuilder } from './modules/mockupBuilder.js';
import { initSyllabusAndEvaluation, renderTimeline } from './modules/syllabusEval.js';
import { initClassLesson } from './modules/classLesson.js';
import { initTheorySandbox } from './modules/theorySandbox.js';
import { initXrayLab, loadXrayCase } from './modules/xrayLab.js';
import { initBlockBuilder } from './modules/blockBuilder.js';
import { initCssBlockBuilder } from './modules/cssBlockBuilder.js';
import type { ModuleId } from './types/course.js';
import {
  initCommandPalette,
  openCommandPalette,
  showToast
} from './utils/dom.js';

const pageMeta: Record<ModuleId, { title: string; subtitle: string }> = {
  clase: {
    title: 'Tu clase de hoy',
    subtitle: 'Una idea nueva por clase. Teoría, práctica, entregable y a la siguiente.'
  },
  rayosx: {
    title: 'Contar filas y columnas',
    subtitle: 'Antes de escribir CSS, miramos cómo está armada una página.'
  },
  grid: {
    title: 'Armar retículas',
    subtitle: 'Pinta celdas y mira cómo se escribe el CSS que las coloca.'
  },
  mockup: {
    title: 'Etiquetas con sentido',
    subtitle: 'Cada bloque de tu página lleva una etiqueta que describe lo que es.'
  },
  teoria: {
    title: 'La caja y el código',
    subtitle: 'Mueve los controles, escribe código y observa qué pasa.'
  },
  ruta: {
    title: 'Plan de las 8 clases',
    subtitle: 'Un archivo nuevo por clase. Así se arma el curso.'
  },
  galeria: {
    title: 'Galería de la clase',
    subtitle: 'Los trabajos del grupo, publicados con su enlace.'
  },
  bloques: {
    title: 'Construye con bloques',
    subtitle: 'Arma tu página encajando bloques HTML como piezas.'
  },
  bloquescss: {
    title: 'Estilos con bloques',
    subtitle: 'Pinta tu página agregando bloques de apariencia CSS.'
  }
};

export function activateModule(moduleId: ModuleId): void {
  document.querySelectorAll<HTMLElement>('.module-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `mod-${moduleId}`);
  });

  document.querySelectorAll<HTMLButtonElement>('.nav-item').forEach(btn => {
    const isActive = btn.dataset.module === moduleId;
    btn.classList.toggle('active', isActive);
    if (isActive) btn.setAttribute('aria-current', 'page');
    else btn.removeAttribute('aria-current');
  });

  const meta = pageMeta[moduleId];
  const title = document.getElementById('page-title');
  const subtitle = document.getElementById('page-subtitle');
  if (title) title.textContent = meta.title;
  if (subtitle) subtitle.textContent = meta.subtitle;

  updateSlidingNavPill();
}

function updateSlidingNavPill(): void {
  const activeBtn = document.querySelector<HTMLButtonElement>('.nav-item.active');
  const pill = document.getElementById('nav-pill');
  if (!activeBtn || !pill) return;

  pill.style.width = `${activeBtn.offsetWidth}px`;
  pill.style.height = `${activeBtn.offsetHeight}px`;
  pill.style.transform = `translate3d(${activeBtn.offsetLeft}px, ${activeBtn.offsetTop}px, 0)`;
}

function toggleTheme(): void {
  const root = document.documentElement;
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  showToast(next === 'dark' ? 'Tema oscuro cálido' : 'Tema aula clara');
}

window.addEventListener('DOMContentLoaded', () => {
  // Navegación principal
  document.querySelectorAll<HTMLButtonElement>('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const mod = btn.dataset.module as ModuleId | undefined;
      if (mod) activateModule(mod);
    });
  });

  document.getElementById('brand-home-link')?.addEventListener('click', e => {
    e.preventDefault();
    activateModule('clase');
  });

  document.getElementById('btn-theme-toggle')?.addEventListener('click', toggleTheme);
  document.getElementById('btn-open-cmdk')?.addEventListener('click', openCommandPalette);
  document.getElementById('btn-gallery-upload')?.addEventListener('click', () => {
    showToast('Cuando publiques tu proyecto, pega aquí el enlace de GitHub Pages');
  });

  window.addEventListener('resize', updateSlidingNavPill);

  // Inicialización de los 5 laboratorios tipados
  initXrayLab(activateModule, loadGridPreset);
  initGridStudio();
  initMockupBuilder();
  initBlockBuilder();
  initCssBlockBuilder();
  initTheorySandbox();
  initClassLesson(activateModule, (lab) => { activateModule(lab); }, () => renderTimeline());
  initSyllabusAndEvaluation();

  // Command Palette (Ctrl+K) estilo Raycast / Emil Kowalski
  initCommandPalette([
    { id: 'm0', category: 'CLASE', label: 'Ir a tu clase de hoy', shortcut: '0', run: () => activateModule('clase') },
    { id: 'm1', category: 'LABORATORIO 01', label: 'Contar filas y columnas', shortcut: '1', run: () => activateModule('rayosx') },
    { id: 'm2', category: 'LABORATORIO 02', label: 'Armar retículas', shortcut: '2', run: () => activateModule('grid') },
    { id: 'm3', category: 'LABORATORIO 03', label: 'Etiquetas con sentido', shortcut: '3', run: () => activateModule('mockup') },
    { id: 'm4', category: 'LABORATORIO 04', label: 'La caja y el código', shortcut: '4', run: () => activateModule('teoria') },
    { id: 'm5', category: 'CURSO', label: 'Plan de las 8 clases', shortcut: '5', run: () => activateModule('ruta') },
    { id: 'm6', category: 'CURSO', label: 'Galería de la clase', shortcut: '6', run: () => activateModule('galeria') },
    { id: 'm7', category: 'LABORATORIO 05', label: 'Construye con bloques', shortcut: '7', run: () => activateModule('bloques') },
    { id: 'm8', category: 'LABORATORIO 06', label: 'Estilos con bloques', shortcut: '8', run: () => activateModule('bloquescss') },
    { id: 'p1', category: 'RETÍCULAS', label: 'Cargar ejemplo: página con barra lateral', shortcut: 'G H', run: () => { activateModule('grid'); loadGridPreset('holygrail'); } },
    { id: 'p2', category: 'RETÍCULAS', label: 'Cargar ejemplo: tarjetas', shortcut: 'G B', run: () => { activateModule('grid'); loadGridPreset('bento'); } },
    { id: 'x1', category: 'FILAS Y COLUMNAS', label: 'Analizar el caso 2', shortcut: 'X 2', run: () => { activateModule('rayosx'); loadXrayCase(1); } },
    { id: 'th', category: 'SISTEMA', label: 'Cambiar entre tema claro y oscuro', shortcut: 'T', run: toggleTheme }
  ]);

  activateModule('clase');

  updateSlidingNavPill();
});
