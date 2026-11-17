/* ==========================================================================
   MAIN.TS — ORQUESTADOR PRINCIPAL TYPESCRIPT (NAVEGACIÓN, ATAJOS & MÓDULOS)
   ========================================================================== */

import { initGridStudio, loadGridPreset } from './modules/gridStudio.js';
import { initMockupBuilder } from './modules/mockupBuilder.js';
import { initSyllabusAndEvaluation } from './modules/syllabusEval.js';
import { initTheorySandbox } from './modules/theorySandbox.js';
import { initXrayLab, loadXrayCase } from './modules/xrayLab.js';
import type { ModuleId } from './types/course.js';
import {
  initCommandPalette,
  openCommandPalette,
  showToast
} from './utils/dom.js';

export function activateModule(moduleId: ModuleId): void {
  document.querySelectorAll<HTMLElement>('.module-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `mod-${moduleId}`);
  });

  document.querySelectorAll<HTMLButtonElement>('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.module === moduleId);
  });

  updateSlidingNavPill();
}

function updateSlidingNavPill(): void {
  const activeBtn = document.querySelector<HTMLButtonElement>('.nav-item.active');
  const pill = document.getElementById('nav-pill');
  if (!activeBtn || !pill) return;

  pill.style.width = `${activeBtn.offsetWidth}px`;
  pill.style.transform = `translate3d(${activeBtn.offsetLeft - 3}px, 0, 0)`;
}

function toggleTheme(): void {
  const root = document.documentElement;
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  showToast(
    next === 'dark'
      ? 'Modo Estudio Oscuro (Carbon Obsidian)'
      : 'Modo Papel Técnico (Architectural Light)'
  );
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
    activateModule('rayosx');
  });

  document.getElementById('btn-theme-toggle')?.addEventListener('click', toggleTheme);
  document.getElementById('btn-open-cmdk')?.addEventListener('click', openCommandPalette);

  window.addEventListener('resize', updateSlidingNavPill);

  // Inicialización de los 5 laboratorios tipados
  initXrayLab(activateModule, loadGridPreset);
  initGridStudio();
  initMockupBuilder();
  initTheorySandbox();
  initSyllabusAndEvaluation();

  // Command Palette (Ctrl+K) estilo Raycast / Emil Kowalski
  initCommandPalette([
    { id: 'm1', category: 'MÓDULO 01', label: 'Ir a Rayos X: Inspector de Filas y Columnas', shortcut: '1', run: () => activateModule('rayosx') },
    { id: 'm2', category: 'MÓDULO 02', label: 'Ir a Estudio Interactivo CSS Grid 2D', shortcut: '2', run: () => activateModule('grid') },
    { id: 'm3', category: 'MÓDULO 03', label: 'Ir a Constructor de Mockups & Árbol HTML5', shortcut: '3', run: () => activateModule('mockup') },
    { id: 'm4', category: 'MÓDULO 04', label: 'Ir a Teoría Visual & Sandbox de Código en Vivo', shortcut: '4', run: () => activateModule('teoria') },
    { id: 'm5', category: 'MÓDULO 05', label: 'Ir a Cronograma 4 Semanas & Evaluación CSS', shortcut: '5', run: () => activateModule('ruta') },
    { id: 'p1', category: 'PRESET GRID', label: 'Cargar Plantilla Holy Grail en Estudio Grid', shortcut: 'G H', run: () => { activateModule('grid'); loadGridPreset('holygrail'); } },
    { id: 'p2', category: 'PRESET GRID', label: 'Cargar Plantilla Bento Editorial en Estudio Grid', shortcut: 'G B', run: () => { activateModule('grid'); loadGridPreset('bento'); } },
    { id: 'x1', category: 'RAYOS X', label: 'Analizar Caso #02: Bento Grid Editorial', shortcut: 'X 2', run: () => { activateModule('rayosx'); loadXrayCase(1); } },
    { id: 'th', category: 'SISTEMA', label: 'Alternar Tema Oscuro / Papel Técnico Claro', shortcut: 'T', run: toggleTheme }
  ]);

  updateSlidingNavPill();
});
