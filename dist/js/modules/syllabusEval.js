/* ==========================================================================
   SYLLABUSEVAL.TS — MÓDULO 05: RUTA DE 4 SEMANAS & AUTOCORRECTOR DE CÓDIGO
   ========================================================================== */
import { COURSE_SESSIONS, INITIAL_RUBRIC, QUIZ_QUESTIONS } from '../data/curriculum.js';
import { openClass } from './classLesson.js';
import { showToast } from '../utils/dom.js';
/* El contenido puede incluir etiquetas como texto (<title>, <!DOCTYPE html>).
   Las escapamos antes de meterlas en innerHTML para que no se interpreten como HTML. */
function esc(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
const quizAnswers = {};
export function initSyllabusAndEvaluation() {
    document.getElementById('btn-eval-code')?.addEventListener('click', evaluateStudentCSS);
    document.getElementById('btn-fill-solution')?.addEventListener('click', fillSolutionCSS);
    document.getElementById('btn-reset-quiz')?.addEventListener('click', () => {
        Object.keys(quizAnswers).forEach(k => delete quizAnswers[Number(k)]);
        renderQuiz();
        showToast('Cuestionario reiniciado');
    });
    renderTimeline();
    evaluateStudentCSS();
    renderRubric();
    renderQuiz();
}
export function renderTimeline() {
    const container = document.getElementById('course-timeline-grid');
    if (!container)
        return;
    const doneCount = COURSE_SESSIONS.filter(s => s.status === 'done').length;
    const pct = Math.round((doneCount / COURSE_SESSIONS.length) * 100);
    const progressBar = document.getElementById('header-progress-bar');
    const sessionLabel = document.getElementById('header-session-label');
    const progressCount = document.getElementById('header-progress-count');
    if (progressBar)
        progressBar.style.width = `${pct}%`;
    if (sessionLabel)
        sessionLabel.textContent = `SESIÓN 0${Math.min(8, doneCount + 1)}/08`;
    if (progressCount)
        progressCount.textContent = `${doneCount}/8`;
    const ring = document.getElementById('side-progress-ring');
    if (ring) {
        ring.style.setProperty('--course-progress', String(pct));
        const ringNumber = ring.querySelector('b');
        if (ringNumber)
            ringNumber.textContent = `0${Math.min(8, doneCount + 1)}`;
    }
    const sideTitle = document.getElementById('side-progress-title');
    const sideSub = document.getElementById('side-progress-sub');
    if (sideTitle)
        sideTitle.textContent = `${doneCount} de 8 completadas`;
    if (sideSub) {
        const left = COURSE_SESSIONS.length - doneCount;
        sideSub.textContent = left === 1 ? '1 sesión por delante' : `${left} sesiones por delante`;
    }
    const files = [
        'mi-perfil.html',
        'mi-perfil-v2.html',
        'tarjeta.html',
        'reticula.html',
        'responsive.html',
        'interaccion.html',
        'tema.html',
        'index.html'
    ];
    container.innerHTML = COURSE_SESSIONS.map((s, idx) => {
        const statusText = s.status === 'done'
            ? 'Completada'
            : s.status === 'current'
                ? 'En curso'
                : 'Programada';
        return `
      <article class="session-card status-${s.status} ${s.status === 'current' ? 'is-current' : ''}"
               data-session-idx="${idx}">
        <div class="session-head">
          <span class="session-index"><b>${String(s.id).padStart(2, '0')}</b> / 08</span>
          <span class="status-pill ${s.status}">${statusText}</span>
        </div>
        <div class="session-body">
          <span class="session-week">${esc(s.week)} · ${esc(s.day)}</span>
          <h3 class="session-title">${esc(s.title)}</h3>
          <p class="session-detail">${esc(s.detail)}</p>
        </div>
        <div class="session-blocks">
          <div class="session-block"><span>Teoría</span><span>${esc(s.blocks.teoria)}</span></div>
          <div class="session-block"><span>Práctica</span><span>${esc(s.blocks.practica)}</span></div>
          <div class="session-block deliverable"><span>Entrega</span><span>${esc(s.blocks.entregable)}</span></div>
        </div>
        <div class="session-foot">
          <span class="session-file">${files[idx] ?? ''}</span>
          <button type="button" class="session-action">Cambiar estado</button>
        </div>
      </article>
    `;
    }).join('');
    container.innerHTML = COURSE_SESSIONS.map((s, idx) => {
        const statusText = s.status === 'done'
            ? 'Completada'
            : s.status === 'current'
                ? 'En curso'
                : 'Programada';
        return `
      <article class="session-card status-${s.status} ${s.status === 'current' ? 'is-current' : ''}"
               data-session-idx="${idx}" data-session-id="${s.id}">
        <div class="session-head">
          <span class="session-index"><b>${String(s.id).padStart(2, '0')}</b> / 08</span>
          <span class="status-pill ${s.status}">${statusText}</span>
        </div>
        <div class="session-body">
          <span class="session-week">${esc(s.week)} · ${esc(s.day)}</span>
          <h3 class="session-title">${esc(s.title)}</h3>
          <p class="session-detail">${esc(s.detail)}</p>
        </div>
        <div class="session-blocks">
          <div class="session-block"><span>Teoría</span><span>${esc(s.blocks.teoria)}</span></div>
          <div class="session-block"><span>Práctica</span><span>${esc(s.blocks.practica)}</span></div>
          <div class="session-block deliverable"><span>Entrega</span><span>${esc(s.blocks.entregable)}</span></div>
        </div>
        <div class="session-foot">
          <span class="session-file">${files[idx] ?? ''}</span>
          <button type="button" class="session-action" data-action="cycle-status" data-session-idx="${idx}">Cambiar estado</button>
        </div>
      </article>
    `;
    }).join('');
    container.querySelectorAll('[data-session-idx]').forEach(el => {
        el.addEventListener('click', (e) => {
            const target = e.target;
            if (target && target.getAttribute('data-action') === 'cycle-status')
                return;
            const idx = Number(el.dataset.sessionIdx);
            const session = COURSE_SESSIONS[idx];
            if (!session)
                return;
            // open this class
            openClass(session.id);
            // also switch to clase module
            const navBtn = document.querySelector('.nav-item[data-module="clase"]');
            navBtn?.click();
        });
    });
    container.querySelectorAll('[data-action="cycle-status"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = Number(btn.dataset.sessionIdx);
            const session = COURSE_SESSIONS[idx];
            if (!session)
                return;
            const order = ['done', 'current', 'upcoming'];
            session.status = order[(order.indexOf(session.status) + 1) % order.length] || 'upcoming';
            // sync completed set? keep simple: just re-render
            renderTimeline();
            showToast(`Sesión 0${session.id} actualizada`);
        });
    });
}
function evaluateStudentCSS() {
    const input = document.getElementById('eval-code-input');
    const raw = (input?.value || '').toLowerCase();
    const checks = [
        {
            label: '1. Contenedor display: grid',
            pass: /display\s*:\s*grid/.test(raw)
        },
        {
            label: '2. 3 Columnas + gap: 16px',
            pass: /grid-template-columns\s*:\s*(repeat\(\s*3|1fr\s+1fr\s+1fr)/.test(raw) &&
                /gap\s*:\s*16px/.test(raw)
        },
        {
            label: '3. Header expandido (1 / 4 o span 3)',
            pass: /grid-column\s*:\s*(1\s*\/\s*4|1\s*\/\s*-1|span\s+3|1\s*\/\s*span\s+3)/.test(raw)
        }
    ];
    const resContainer = document.getElementById('eval-code-results');
    if (resContainer) {
        resContainer.innerHTML = checks
            .map(c => `
        <div style="padding:10px 12px; border-radius:var(--radius-sm); border:1px solid ${c.pass ? 'var(--signal-ok)' : 'var(--border-subtle)'}; background:${c.pass ? 'var(--signal-ok-soft)' : 'var(--bg-elevated)'}; font-size:11.5px;">
          <div style="font-family:var(--font-mono); font-weight:600; color:${c.pass ? 'var(--signal-ok)' : 'var(--text-muted)'};">
            ${c.pass ? '✓ APROBADO' : '○ PENDIENTE'}
          </div>
          <div style="margin-top:3px;">${c.label}</div>
        </div>
      `)
            .join('');
    }
    const allPassed = checks.every(c => c.pass);
    const badge = document.getElementById('challenge-status-badge');
    if (badge) {
        if (allPassed) {
            badge.textContent = 'COMPETENCIA VALIDADA (100%)';
            badge.style.background = 'var(--signal-ok-soft)';
            badge.style.color = 'var(--signal-ok)';
            badge.style.borderColor = 'var(--signal-ok)';
            showToast('¡Código CSS Grid validado con éxito!', 'var(--signal-ok)');
        }
        else {
            badge.textContent = 'REVISAR REGLAS FALTANTES';
        }
    }
}
function fillSolutionCSS() {
    const input = document.getElementById('eval-code-input');
    if (input) {
        input.value = `.layout {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n\nheader {\n  grid-column: 1 / 4;\n}`;
        evaluateStudentCSS();
    }
}
function renderRubric() {
    const box = document.getElementById('rubric-checklist');
    const totalBadge = document.getElementById('rubric-total-badge');
    if (!box)
        return;
    let sum = 0;
    box.innerHTML = INITIAL_RUBRIC.map((item, idx) => {
        if (item.done)
            sum += item.pts;
        return `
      <label class="rubric-item ${item.done ? 'checked' : ''}">
        <span class="rubric-left">
          <input type="checkbox" data-rubric-idx="${idx}" ${item.done ? 'checked' : ''} />
          <span>${esc(item.label)}</span>
        </span>
        <span class="rubric-pts">+${item.pts}</span>
      </label>
    `;
    }).join('');
    box.querySelectorAll('[data-rubric-idx]').forEach(chk => {
        chk.addEventListener('change', () => {
            const idx = Number(chk.dataset.rubricIdx);
            const item = INITIAL_RUBRIC[idx];
            if (item) {
                item.done = !item.done;
                renderRubric();
            }
        });
    });
    if (totalBadge)
        totalBadge.textContent = `${sum} / 100 PTS`;
}
function renderQuiz() {
    const container = document.getElementById('course-quiz-grid');
    const label = document.getElementById('quiz-progress-label');
    if (!container)
        return;
    const answeredCount = Object.keys(quizAnswers).length;
    const correctCount = QUIZ_QUESTIONS.filter(q => quizAnswers[q.id] === q.correctIndex).length;
    if (label) {
        label.textContent = `${answeredCount}/${QUIZ_QUESTIONS.length} respondidas (${correctCount} aciertos)`;
    }
    container.innerHTML = QUIZ_QUESTIONS.map(q => {
        const picked = quizAnswers[q.id];
        return `
      <div class="quiz-card">
        <div class="quiz-question">${esc(q.question)}</div>
        <div class="quiz-options">
          ${q.options
            .map((opt, oIdx) => {
            const isCorrect = picked !== undefined && oIdx === q.correctIndex;
            const isWrong = picked !== undefined && oIdx === picked && oIdx !== q.correctIndex;
            const cls = isCorrect ? 'is-correct' : isWrong ? 'is-wrong' : '';
            const mark = isCorrect ? '✓' : isWrong ? '✕' : '';
            return `
                <button type="button"
                        class="quiz-option ${cls}"
                        data-q-id="${q.id}"
                        data-o-idx="${oIdx}">
                  <span>${esc(opt)}</span>
                  <span class="quiz-mark">${mark}</span>
                </button>
              `;
        })
            .join('')}
        </div>
      </div>
    `;
    }).join('');
    container.querySelectorAll('[data-q-id]').forEach(btn => {
        btn.addEventListener('click', () => {
            const qId = Number(btn.dataset.qId);
            const oIdx = Number(btn.dataset.oIdx);
            quizAnswers[qId] = oIdx;
            renderQuiz();
        });
    });
}
