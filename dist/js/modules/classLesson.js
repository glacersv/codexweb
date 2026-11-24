/* ==========================================================================
   CLASSLESSON.TS — MÓDULO "CLASE DE HOY": LECCIÓN POR CLASE
   Cada clase muestra: la idea nueva, la teoría, la práctica con su laboratorio,
   el entregable y el botón "marcar como completada" que avanza a la siguiente.
   ========================================================================== */
import { COURSE_SESSIONS } from '../data/curriculum.js';
const STORAGE_COMPLETED = 'gridlab-completed-sessions';
const STORAGE_CURRENT = 'gridlab-current-session';
let activateModuleFn = null;
let openLabFn = null;
let currentClassId = 1;
function esc(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function loadCompleted() {
    try {
        const raw = localStorage.getItem(STORAGE_COMPLETED);
        if (!raw)
            return new Set();
        return new Set(JSON.parse(raw));
    }
    catch {
        return new Set();
    }
}
function saveCompleted(set) {
    try {
        localStorage.setItem(STORAGE_COMPLETED, JSON.stringify([...set]));
    }
    catch {
        /* ignore */
    }
}
function syncStatus() {
    const completed = loadCompleted();
    let current = Number(localStorage.getItem(STORAGE_CURRENT));
    if (!current || current < 1 || current > 8) {
        current = COURSE_SESSIONS.find(s => !completed.has(s.id))?.id ?? 8;
        localStorage.setItem(STORAGE_CURRENT, String(current));
    }
    currentClassId = current;
    COURSE_SESSIONS.forEach(s => {
        if (completed.has(s.id))
            s.status = 'done';
        else if (s.id === current)
            s.status = 'current';
        else
            s.status = 'upcoming';
    });
}
function labName(lab) {
    switch (lab) {
        case 'rayosx': return 'Contar filas y columnas';
        case 'grid': return 'Armar retículas';
        case 'mockup': return 'Etiquetas con sentido';
        case 'teoria': return 'La caja y el código';
        case 'galeria': return 'Galería de la clase';
        default: return 'Laboratorio de esta clase';
    }
}
function labIcon(lab) {
    return lab ? 'Abrir laboratorio' : 'Practicar aquí';
}
function renderInlineDemo(sessionId) {
    if (sessionId === 6) {
        return `
      <div class="lesson-demo">
        <p class="hint" style="margin-bottom:8px;">Prueba: haz clic en el botón y mira cómo cambia el título.</p>
        <button type="button" class="btn btn-primary" id="demo-btn-6">Cambiar el texto</button>
        <h3 id="demo-title-6" style="margin-top:10px; font-size:var(--text-lg);">Hola, soy yo</h3>
      </div>
    `;
    }
    if (sessionId === 7) {
        return `
      <div class="lesson-demo">
        <p class="hint" style="margin-bottom:8px;">Prueba: cambia el tema y recarga la página. El tema se queda.</p>
        <button type="button" class="btn btn-primary" id="demo-btn-7">Cambiar tema</button>
        <p id="demo-status-7" style="margin-top:10px; font-family:var(--font-mono); font-size:var(--text-sm); color:var(--text-muted);">tema actual: claro</p>
      </div>
    `;
    }
    return '';
}
function wireInlineDemo(sessionId) {
    if (sessionId === 6) {
        const btn = document.getElementById('demo-btn-6');
        const title = document.getElementById('demo-title-6');
        btn?.addEventListener('click', () => {
            if (title)
                title.textContent = title.textContent === 'Hola, soy yo' ? '¡Hola desde JavaScript!' : 'Hola, soy yo';
        });
    }
    if (sessionId === 7) {
        const btn = document.getElementById('demo-btn-7');
        const status = document.getElementById('demo-status-7');
        btn?.addEventListener('click', () => {
            const root = document.documentElement;
            const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            if (status)
                status.textContent = `tema actual: ${next === 'dark' ? 'oscuro' : 'claro'}`;
            try {
                localStorage.setItem('gridlab-demo-theme', next);
            }
            catch { /* ignore */ }
        });
        try {
            const saved = localStorage.getItem('gridlab-demo-theme');
            if (saved) {
                document.documentElement.setAttribute('data-theme', saved);
                if (status)
                    status.textContent = `tema actual: ${saved === 'dark' ? 'oscuro' : 'claro'}`;
            }
        }
        catch { /* ignore */ }
    }
}
export function getCurrentClassId() {
    return currentClassId;
}
export function openClass(id) {
    if (id < 1 || id > 8)
        return;
    currentClassId = id;
    try {
        localStorage.setItem(STORAGE_CURRENT, String(id));
    }
    catch { /* ignore */ }
    renderClass();
}
let refreshProgressFn = null;
export function initClassLesson(activateModule, openLab, refreshProgress) {
    activateModuleFn = activateModule;
    openLabFn = openLab;
    refreshProgressFn = refreshProgress;
    syncStatus();
    const container = document.getElementById('class-lesson');
    if (!container)
        return;
    // delegate clicks
    container.addEventListener('click', e => {
        const target = e.target;
        if (!target)
            return;
        const action = target.getAttribute('data-action');
        if (action === 'prev') {
            openClass(currentClassId - 1);
        }
        else if (action === 'next') {
            openClass(currentClassId + 1);
        }
        else if (action === 'open-lab') {
            const lab = target.getAttribute('data-lab');
            if (lab && openLabFn)
                openLabFn(lab);
        }
        else if (action === 'mark-done') {
            const completed = loadCompleted();
            completed.add(currentClassId);
            saveCompleted(completed);
            const next = COURSE_SESSIONS.find(s => !completed.has(s.id))?.id ?? 8;
            try {
                localStorage.setItem(STORAGE_CURRENT, String(next));
            }
            catch { /* ignore */ }
            syncStatus();
            renderClass();
            if (activateModuleFn)
                activateModuleFn('clase');
            if (refreshProgressFn)
                refreshProgressFn();
        }
        else if (action === 'goto') {
            const id = Number(target.getAttribute('data-id'));
            if (id)
                openClass(id);
        }
    });
    renderClass();
}
function renderClass() {
    const container = document.getElementById('class-lesson');
    if (!container)
        return;
    syncStatus();
    const session = COURSE_SESSIONS.find(s => s.id === currentClassId);
    if (!session)
        return;
    const completed = loadCompleted();
    const isDone = completed.has(session.id);
    const prev = session.id > 1 ? session.id - 1 : null;
    const next = session.id < 8 ? session.id + 1 : null;
    const lab = session.lab ?? null;
    const newIdea = session.newIdea ?? session.detail;
    const file = session.file ?? '';
    const statusText = session.status === 'done' ? 'Completada' :
        session.status === 'current' ? 'Clase de hoy' : 'Próxima';
    const statusCls = session.status === 'done' ? 'done' :
        session.status === 'current' ? 'current' : 'upcoming';
    container.innerHTML = `
    <section class="class-hero">
      <div class="class-hero-top">
        <span class="class-num">CLASE ${String(session.id).padStart(2, '0')} / 08</span>
        <span class="status-pill ${statusCls}">${statusText}</span>
      </div>
      <h2 class="class-title">${esc(session.title)}</h2>
      <p class="class-idea"><b>La idea nueva de hoy:</b> ${esc(newIdea)}</p>
      <div class="class-meta">
        <span class="meta-chip"><b>${esc(session.week)}</b></span>
        <span class="meta-chip">${esc(session.day)}</span>
        ${file ? `<span class="meta-chip">Entregable: <b>${esc(file)}</b></span>` : ''}
      </div>
    </section>

    <div class="class-grid">
      <article class="panel class-block">
        <div class="panel-header">
          <span class="panel-title">Teoría · 08:00–08:25</span>
          <span class="mono-tag">Idea nueva</span>
        </div>
        <div class="pad">
          <p class="hint">${esc(session.blocks.teoria)}</p>
        </div>
      </article>

      <article class="panel class-block">
        <div class="panel-header">
          <span class="panel-title">Práctica · 08:25–09:10</span>
          <span class="mono-tag">Manos a la obra</span>
        </div>
        <div class="pad">
          <p class="hint">${esc(session.blocks.practica)}</p>
          ${lab ? `
            <div class="class-lab">
              <div>
                <b style="display:block; margin-bottom:4px;">Laboratorio de esta clase</b>
                <span class="hint">${esc(labName(lab))}</span>
              </div>
              <button type="button" class="btn btn-primary btn-sm" data-action="open-lab" data-lab="${lab}">${labIcon(lab)}</button>
            </div>
          ` : `
            <div class="class-lab">
              <div>
                <b style="display:block; margin-bottom:4px;">Practica aquí mismo</b>
                <span class="hint">No necesitas otro laboratorio: el ejercicio está abajo.</span>
              </div>
            </div>
          `}
          ${renderInlineDemo(session.id)}
        </div>
      </article>

      <article class="panel class-block">
        <div class="panel-header">
          <span class="panel-title">Entregable · 09:10–09:30</span>
          <span class="mono-tag">Comprobable</span>
        </div>
        <div class="pad">
          <p class="hint">${esc(session.blocks.entregable)}</p>
          <div class="class-checklist">
            <label class="check-row"><input type="checkbox" ${isDone ? 'checked' : ''} disabled /> Archivo <b>${esc(file)}</b> abierto en el navegador</label>
            <label class="check-row"><input type="checkbox" ${isDone ? 'checked' : ''} disabled /> Puedo explicar la idea nueva con mis palabras</label>
          </div>
        </div>
      </article>
    </div>

    <div class="class-nav">
      ${prev ? `<button type="button" class="btn" data-action="prev">← Clase ${String(prev).padStart(2, '0')}</button>` : '<span></span>'}
      <div class="class-nav-center">
        ${isDone
        ? `<span class="status-pill done">Completada</span>`
        : `<button type="button" class="btn btn-primary" data-action="mark-done">Marcar como completada y seguir →</button>`}
      </div>
      ${next ? `<button type="button" class="btn" data-action="next">Clase ${String(next).padStart(2, '0')} →</button>` : '<span></span>'}
    </div>

    <div class="class-jump">
      <span class="hint">Ir a otra clase:</span>
      ${COURSE_SESSIONS.map(s => `
        <button type="button" class="session-jump-btn ${s.id === session.id ? 'is-active' : ''}" data-action="goto" data-id="${s.id}">${String(s.id).padStart(2, '0')}</button>
      `).join('')}
    </div>
  `;
    wireInlineDemo(session.id);
}
