/* ==========================================================================
   SYLLABUSEVAL.TS — MÓDULO 05: RUTA DE 4 SEMANAS & AUTOCORRECTOR DE CÓDIGO
   ========================================================================== */

import {
  COURSE_SESSIONS,
  INITIAL_RUBRIC,
  QUIZ_QUESTIONS
} from '../data/curriculum.js';
                                                        
import { showToast } from '../utils/dom.js';

const quizAnswers                         = {};

export function initSyllabusAndEvaluation()       {
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

function renderTimeline()       {
  const container = document.getElementById('course-timeline-grid');
  if (!container) return;

  const doneCount = COURSE_SESSIONS.filter(s => s.status === 'done').length;
  const pct = Math.round((doneCount / COURSE_SESSIONS.length) * 100);

  const progressBar = document.getElementById('header-progress-bar');
  const sessionLabel = document.getElementById('header-session-label');
  if (progressBar) progressBar.style.width = `${pct}%`;
  if (sessionLabel) sessionLabel.textContent = `SESIÓN 0${Math.min(8, doneCount + 1)}/08`;

  container.innerHTML = COURSE_SESSIONS.map((s, idx) => {
    const badgeStyle =
      s.status === 'done'
        ? 'color:var(--signal-ok); border-color:rgba(16,185,129,0.3); background:var(--signal-ok-soft);'
        : s.status === 'current'
        ? 'color:var(--accent); border-color:var(--accent-border); background:var(--accent-soft);'
        : 'color:var(--text-muted); border-color:var(--border-hairline); background:var(--bg-surface);';

    const statusText =
      s.status === 'done'
        ? 'COMPLETADA'
        : s.status === 'current'
        ? 'EN CURSO (CLASE 3)'
        : 'PROGRAMADA';

    return `
      <div class="session-card ${s.status === 'current' ? 'is-current' : ''}">
        <div class="session-summary" data-session-idx="${idx}">
          <div style="flex:1;">
            <div class="mono-tag tabular">${s.week} · ${s.day}</div>
            <div style="font-weight:600; font-size:13.5px; margin-top:3px;">0${s.id}. ${s.title}</div>
            <p style="font-size:12px; color:var(--text-secondary); margin-top:5px;">${s.detail}</p>
            <div style="margin-top:10px; padding-top:8px; border-top:1px solid var(--border-hairline); display:flex; flex-direction:column; gap:3px; font-family:var(--font-mono); font-size:10.5px; color:var(--text-muted);">
              <span>${s.blocks.teoria}</span>
              <span>${s.blocks.practica}</span>
              <span style="color:var(--accent);">${s.blocks.entregable}</span>
            </div>
          </div>
          <span class="badge-cohort" style="${badgeStyle}; flex-shrink:0;">${statusText}</span>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll             ('[data-session-idx]').forEach(el => {
    el.addEventListener('click', () => {
      const idx = Number(el.dataset.sessionIdx);
      const session = COURSE_SESSIONS[idx];
      if (!session) return;
      const order                  = ['done', 'current', 'upcoming'];
      session.status = order[(order.indexOf(session.status) + 1) % order.length] || 'upcoming';
      renderTimeline();
      showToast(`Sesión 0${session.id} actualizada`);
    });
  });
}

function evaluateStudentCSS()       {
  const input = document.getElementById('eval-code-input')                              ;
  const raw = (input?.value || '').toLowerCase();

  const checks = [
    {
      label: '1. Contenedor display: grid',
      pass: /display\s*:\s*grid/.test(raw)
    },
    {
      label: '2. 3 Columnas + gap: 16px',
      pass:
        /grid-template-columns\s*:\s*(repeat\(\s*3|1fr\s+1fr\s+1fr)/.test(raw) &&
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
      .map(
        c => `
        <div style="padding:10px 12px; border-radius:var(--radius-sm); border:1px solid ${
          c.pass ? 'var(--signal-ok)' : 'var(--border-subtle)'
        }; background:${c.pass ? 'var(--signal-ok-soft)' : 'var(--bg-elevated)'}; font-size:11.5px;">
          <div style="font-family:var(--font-mono); font-weight:600; color:${
            c.pass ? 'var(--signal-ok)' : 'var(--text-muted)'
          };">
            ${c.pass ? '✓ APROBADO' : '○ PENDIENTE'}
          </div>
          <div style="margin-top:3px;">${c.label}</div>
        </div>
      `
      )
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
    } else {
      badge.textContent = 'REVISAR REGLAS FALTANTES';
    }
  }
}

function fillSolutionCSS()       {
  const input = document.getElementById('eval-code-input')                              ;
  if (input) {
    input.value = `.layout {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n\nheader {\n  grid-column: 1 / 4;\n}`;
    evaluateStudentCSS();
  }
}

function renderRubric()       {
  const box = document.getElementById('rubric-checklist');
  const totalBadge = document.getElementById('rubric-total-badge');
  if (!box) return;

  let sum = 0;
  box.innerHTML = INITIAL_RUBRIC.map((item, idx) => {
    if (item.done) sum += item.pts;
    return `
      <label style="display:flex; align-items:center; justify-content:space-between; gap:10px; padding:10px 12px; border-radius:var(--radius-sm); background:var(--bg-elevated); border:1px solid var(--border-hairline); cursor:pointer;">
        <span style="display:flex; align-items:center; gap:9px; font-size:12px;">
          <input type="checkbox" data-rubric-idx="${idx}" ${
            item.done ? 'checked' : ''
          } style="accent-color:var(--accent);" />
          <span>${item.label}</span>
        </span>
        <span class="mono-tag tabular" style="color:var(--accent); font-weight:600;">+${item.pts}</span>
      </label>
    `;
  }).join('');

  box.querySelectorAll                  ('[data-rubric-idx]').forEach(chk => {
    chk.addEventListener('change', () => {
      const idx = Number(chk.dataset.rubricIdx);
      const item = INITIAL_RUBRIC[idx];
      if (item) {
        item.done = !item.done;
        renderRubric();
      }
    });
  });

  if (totalBadge) totalBadge.textContent = `${sum} / 100 PTS`;
}

function renderQuiz()       {
  const container = document.getElementById('course-quiz-grid');
  const label = document.getElementById('quiz-progress-label');
  if (!container) return;

  const answeredCount = Object.keys(quizAnswers).length;
  const correctCount = QUIZ_QUESTIONS.filter(q => quizAnswers[q.id] === q.correctIndex).length;
  if (label) {
    label.textContent = `${answeredCount}/${QUIZ_QUESTIONS.length} respondidas (${correctCount} aciertos)`;
  }

  container.innerHTML = QUIZ_QUESTIONS.map(q => {
    const picked = quizAnswers[q.id];
    return `
      <div style="padding:14px; border-radius:var(--radius-sm); background:var(--bg-elevated); border:1px solid var(--border-hairline);">
        <div style="font-weight:600; font-size:12.5px; margin-bottom:10px;">${q.question}</div>
        <div style="display:flex; flex-direction:column; gap:6px;">
          ${q.options
            .map((opt, oIdx) => {
              let border = 'var(--border-hairline)';
              let bg = 'var(--bg-surface)';
              if (picked !== undefined) {
                if (oIdx === q.correctIndex) {
                  border = 'var(--signal-ok)';
                  bg = 'var(--signal-ok-soft)';
                } else if (oIdx === picked) {
                  border = 'var(--signal-err)';
                }
              }
              return `
                <button type="button"
                        class="btn"
                        data-q-id="${q.id}"
                        data-o-idx="${oIdx}"
                        style="justify-content:space-between; text-align:left; border-color:${border}; background:${bg};">
                  <span>${opt}</span>
                  <span class="mono-tag">${picked !== undefined && oIdx === q.correctIndex ? '✓' : ''}</span>
                </button>
              `;
            })
            .join('')}
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll                   ('[data-q-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const qId = Number(btn.dataset.qId);
      const oIdx = Number(btn.dataset.oIdx);
      quizAnswers[qId] = oIdx;
      renderQuiz();
    });
  });
}
