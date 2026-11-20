(() => {
'use strict';

// ════════════════════════════ Config ════════════════════════════
const EXAM_DATE = new Date(2026, 11, 12); // 12/12/2026
const PARTS = {
  uoe1: { section: 'uoe', label: 'Part 1', name: 'Multiple-choice cloze', minutes: 10,
    instr: 'Read the text and decide which answer (A, B, C or D) best fits each gap.' },
  uoe2: { section: 'uoe', label: 'Part 2', name: 'Open cloze', minutes: 10,
    instr: 'Think of the word which best fits each gap. Use only ONE word in each gap.' },
  uoe3: { section: 'uoe', label: 'Part 3', name: 'Word formation', minutes: 10,
    instr: 'Use the word given in CAPITALS to form a word that fits in the gap.' },
  uoe4: { section: 'uoe', label: 'Part 4', name: 'Key word transformation', minutes: 12,
    instr: 'Complete the second sentence so that it has a similar meaning to the first sentence, using the word given. Do not change the word given. Use between TWO and FIVE words, including the word given.' },
  rd5: { section: 'reading', label: 'Part 5', name: 'Multiple choice', minutes: 15,
    instr: 'Read the text. For each question, choose the answer (A, B, C or D) which you think fits best according to the text.' },
  rd6: { section: 'reading', label: 'Part 6', name: 'Gapped text', minutes: 15,
    instr: 'Six sentences have been removed from the article. Choose from the sentences A–G the one which fits each gap. There is one extra sentence which you do not need to use.' },
  rd7: { section: 'reading', label: 'Part 7', name: 'Multiple matching', minutes: 15,
    instr: 'Read the texts. For each question, choose from the people (A–D). The people may be chosen more than once.' },
};
const SECTIONS = {
  uoe: { name: 'Use of English', parts: ['uoe1', 'uoe2', 'uoe3', 'uoe4'],
    note: 'En el último mockup: 170 (Grade C) — tu sección más floja junto con Writing. Prioridad máxima.' },
  reading: { name: 'Reading', parts: ['rd5', 'rd6', 'rd7'],
    note: 'En el último mockup: 177 (Grade B). Part 6 fue la más floja (4/6).' },
};
// Prioridad cuando se recomienda qué practicar (puntos débiles primero)
const PRIORITY = ['uoe4', 'uoe2', 'uoe3', 'uoe1', 'rd6', 'rd5', 'rd7'];
const MOCK = [
  ['Reading', 177], ['Use of English', 170], ['Listening', 180], ['Writing', 168], ['Speaking', 173], ['Global', 174],
];
const LETTERS = 'ABCDEFG';

// ════════════════════════════ Estado ════════════════════════════
const KEY = 'fce-practica-v1';
const blank = () => ({ attempts: [], errors: {}, drafts: {} });
let state = load();
function load() {
  try { return Object.assign(blank(), JSON.parse(localStorage.getItem(KEY)) || {}); }
  catch { return blank(); }
}
function save() { localStorage.setItem(KEY, JSON.stringify(state)); }

// ════════════════════════════ Utilidades ════════════════════════════
const $app = document.getElementById('app');
const $ = sel => $app.querySelector(sel);
const $$ = sel => [...$app.querySelectorAll(sel)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const exById = id => FCE.exercises.find(e => e.id === id);
const avg = a => a.reduce((x, y) => x + y, 0) / (a.length || 1);
const pct = a => a.max ? Math.round(100 * a.score / a.max) : 0;
const level = p => p >= 75 ? 'ok' : p >= 60 ? 'warn' : 'bad';
const fmtTime = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
const fmtDate = iso => new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' });
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
function toast(msg) {
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), 3200);
}

// Normalización de respuestas: minúsculas, apóstrofos, contracciones (Cambridge cuenta "don't" = "do not").
function basic(s) {
  s = ' ' + String(s || '').toLowerCase().replace(/[’‘`´]/g, "'").replace(/[.,!?;:"()]/g, ' ') + ' ';
  s = s.replace(/\bwon't\b/g, 'will not').replace(/\bshan't\b/g, 'shall not')
       .replace(/\bcan't\b/g, 'can not').replace(/\bcannot\b/g, 'can not')
       .replace(/n't\b/g, ' not').replace(/'m\b/g, ' am').replace(/'re\b/g, ' are')
       .replace(/'ve\b/g, ' have').replace(/'ll\b/g, ' will');
  return s.replace(/\s+/g, ' ').trim();
}
// 'd y 's son ambiguas (had/would, is/has/posesivo): generamos todas las variantes.
function variants(s) {
  let out = [basic(s)];
  [[/'d\b/g, [' had', ' would']], [/'s\b/g, [' is', ' has']]].forEach(([re, reps]) => {
    out = out.flatMap(v => v.match(re) ? [v, ...reps.map(r => v.replace(re, r))] : [v]);
  });
  return out.map(v => v.replace(/\s+/g, ' ').trim());
}
function matches(given, accepted) {
  if (!String(given || '').trim()) return false;
  const g = variants(given);
  return accepted.some(a => variants(a).some(v => g.includes(v)));
}

// ════════════════════════════ Timer ════════════════════════════
let timerId = null;
function stopTimer() { if (timerId) clearInterval(timerId); timerId = null; }
function startUpTimer(el, minutes) {
  const t0 = Date.now(); stopTimer();
  const tick = () => {
    const s = Math.floor((Date.now() - t0) / 1000);
    el.textContent = `${fmtTime(s)} / ${minutes}:00`;
    el.classList.toggle('over', s > minutes * 60);
    el.dataset.secs = s;
  };
  tick(); timerId = setInterval(tick, 1000);
}

// ════════════════════════════ Estadísticas ════════════════════════════
function partStats(part) {
  const at = state.attempts.filter(a => a.part === part);
  if (!at.length) return null;
  const p = at.map(pct);
  return { n: at.length, avg: Math.round(avg(p)), best: Math.max(...p), last: p[p.length - 1] };
}
function bestFor(id) {
  const at = state.attempts.filter(a => a.id === id);
  return at.length ? Math.max(...at.map(pct)) : null;
}
function badge(p, emptyText = 'sin hacer') {
  return p == null ? `<span class="badge none">${emptyText}</span>` : `<span class="badge ${level(p)}">${p}%</span>`;
}
function bar(p) { return `<div class="bar"><i class="${level(p ?? 0)}" style="width:${p ?? 0}%"></i></div>`; }

function recommend() {
  // La parte prioritaria con peor rendimiento reciente (o sin hacer) → un ejercicio pendiente o el peor.
  let bestPart = null, bestScore = Infinity;
  PRIORITY.forEach((part, rank) => {
    const st = partStats(part);
    const score = (st ? (st.last + st.avg) / 2 : 0) + rank * 3; // leve sesgo hacia las partes más débiles del mockup
    if (score < bestScore) { bestScore = score; bestPart = part; }
  });
  const exs = FCE.exercises.filter(e => e.part === bestPart);
  const pending = exs.find(e => bestFor(e.id) == null);
  const ex = pending || exs.slice().sort((a, b) => bestFor(a.id) - bestFor(b.id))[0];
  return ex;
}

// ════════════════════════════ Router ════════════════════════════
function route() {
  stopTimer();
  const [view = '', arg] = location.hash.replace(/^#\/?/, '').split('/');
  const sectionOf = view === 'ex' && exById(arg) ? PARTS[exById(arg).part].section : view;
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('active', a.dataset.nav === (sectionOf || 'home')));
  ({ '': home, uoe: () => section('uoe'), reading: () => section('reading'), ex: () => exercise(arg),
     drills: () => drills(arg), writing: () => arg ? writingTask(arg) : writingList(), progress })[view]?.() ?? home();
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);

function renderCountdown() {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const days = Math.round((EXAM_DATE - today) / 86400000);
  document.getElementById('countdown').innerHTML =
    days > 0 ? `Examen en <b>${days}</b> día${days === 1 ? '' : 's'} · 12/12` : days === 0 ? '<b>¡Hoy es el examen! Mucha suerte.</b>' : 'Examen rendido';
}

// ════════════════════════════ Inicio ════════════════════════════
function home() {
  const rec = recommend();
  const drillErrors = Object.values(state.errors).filter(e => e.kind === 'drill').length;
  const wlog = FCE.writingLog || [];
  const wTotals = wlog.map(w => w.content + w.communicative + w.organisation + w.language);
  const crit = ['content', 'communicative', 'organisation', 'language'];
  const critNames = { content: 'Content', communicative: 'Com. Achievement', organisation: 'Organisation', language: 'Language' };
  const recent = wlog.slice(-4);
  const critAvg = crit.map(c => [c, recent.length ? avg(recent.map(w => w[c])) : null]);
  const weakest = critAvg.filter(([, v]) => v != null).sort((a, b) => a[1] - b[1])[0];

  $app.innerHTML = `
    <h1>Preparación B2 First</h1>
    <p class="muted">Foco en tus puntos débiles: <b>Use of English</b> y <b>Writing</b>.</p>

    <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(300px,1fr))">
      <a class="card" href="#/ex/${rec.id}">
        <span class="tag">Siguiente recomendado</span>
        <h3 style="margin-top:.3rem">${esc(PARTS[rec.part].label)} · ${esc(PARTS[rec.part].name)}</h3>
        <div>${esc(rec.title)} ${badge(bestFor(rec.id))}</div>
        <div class="small muted" style="margin-top:.4rem">${SECTIONS[PARTS[rec.part].section].name} · ~${PARTS[rec.part].minutes} min</div>
      </a>
      <a class="card" href="#/drills/${drillErrors ? 'errores' : ''}">
        <span class="tag">Gramática rápida</span>
        <h3 style="margin-top:.3rem">${drillErrors ? `Repasar mis errores (${drillErrors})` : 'Ronda de 10 preguntas'}</h3>
        <div class="small muted">Modals, conditionals, wish, passive, causative, relatives, phrasal verbs, prepositions…</div>
      </a>
      <a class="card" href="#/writing">
        <span class="tag">Writing</span>
        <h3 style="margin-top:.3rem">${wlog.length ? `Último: ${wTotals[wTotals.length - 1]}/20` : 'Sin correcciones aún'}</h3>
        <div class="small muted">${weakest ? `Criterio más flojo (últimos ${recent.length}): <b>${critNames[weakest[0]]}</b> (${weakest[1].toFixed(1)}/5)` : ''}</div>
        <div class="small muted">Escribí en la web y corregí con <code>/writing</code> en Claude Code.</div>
      </a>
    </div>

    <h2>Tu progreso por parte</h2>
    <div class="grid">
      ${PRIORITY.slice().sort().map(part => {
        const st = partStats(part);
        return `<a class="card" href="#/${PARTS[part].section}">
          <span class="tag">${SECTIONS[PARTS[part].section].name} · ${PARTS[part].label}</span>
          <div style="display:flex;justify-content:space-between;align-items:baseline">
            <span>${PARTS[part].name}</span><span class="stat">${st ? st.avg + '%' : '—'}</span></div>
          ${bar(st?.avg)}
          <div class="small muted" style="margin-top:.3rem">${st ? `${st.n} intento${st.n > 1 ? 's' : ''} · mejor ${st.best}% · último ${st.last}%` : 'Sin intentos'}</div>
        </a>`;
      }).join('')}
    </div>
    <p class="small muted">Referencia: aprobar B2 ≈ 60% · Grade A / C1 ≈ 80%.</p>

    <h2>Último mockup (punto de partida)</h2>
    <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(150px,1fr))">
      ${MOCK.map(([n, s]) => `<div class="card"><span class="tag">${n}</span>
        <div class="stat">${s}</div>
        <span class="badge ${s >= 180 ? 'ok' : s >= 173 ? 'warn' : 'bad'}">${s >= 180 ? 'C1 · A' : s >= 173 ? 'B2 · B' : 'B2 · C'}</span></div>`).join('')}
    </div>

    <h2>Plan diario sugerido (≈ 60–75 min)</h2>
    <div class="card">
      <ul class="check">
        <li><b>1 ejercicio de Use of English</b> (alterná Parts 2, 3 y 4, son las que más pesan en tu nota).</li>
        <li><b>1 ronda de Gramática</b> (10 preguntas) y, si tenés, repasá tus errores.</li>
        <li><b>Writing día por medio:</b> 40 min cronometrados en la pestaña Writing → corrección con <code>/writing</code>.</li>
        <li><b>Reading 2–3 veces por semana</b>, priorizando Part 6.</li>
        <li>La última semana (5–11/12): un simulacro completo por día, cronometrado.</li>
      </ul>
    </div>`;
}

// ════════════════════════════ Sección (UoE / Reading) ════════════════════════════
function section(key) {
  const S = SECTIONS[key];
  $app.innerHTML = `
    <h1>${S.name}</h1>
    <p class="muted">${S.note}</p>
    ${S.parts.map(part => {
      const P = PARTS[part], st = partStats(part);
      const exs = FCE.exercises.filter(e => e.part === part);
      return `<h2>${P.label} · ${P.name} <span class="small muted">— ~${P.minutes} min ${st ? `· promedio ${st.avg}%` : ''}</span></h2>
        <div class="grid">${exs.map(e => `<a class="card" href="#/ex/${e.id}">
          <span class="tag">${P.label}</span><h3 style="margin-top:.2rem">${esc(e.title)}</h3>${badge(bestFor(e.id))}</a>`).join('')}
        </div>`;
    }).join('')}
    <p class="small muted" style="margin-top:2rem">¿Querés más ejercicios? Pedile a Claude Code: <i>"generá 3 ejercicios nuevos de Part 4 sobre passive y conditionals"</i>.</p>`;
}

// ════════════════════════════ Ejercicio ════════════════════════════
function contextOf(text, n) {
  const sentences = text.replace(/\n+/g, ' ').split(/(?<=[.!?"])\s+/);
  const s = sentences.find(x => x.includes(`[${n}]`)) || '';
  return s.replace(`[${n}]`, '[ ___ ]').replace(/\[\d+\]/g, '___');
}
function paragraphs(text, gap) {
  return text.split(/\n\s*\n/).map(p => `<p>${esc(p).replace(/\[(\d+)\]/g, (_, n) => gap(+n - 1))}</p>`).join('');
}

function exercise(id) {
  const ex = exById(id);
  if (!ex) { $app.innerHTML = '<p>Ejercicio no encontrado.</p>'; return; }
  const P = PARTS[ex.part];
  let body = '';

  if (ex.part === 'uoe1') {
    body = `<div class="card text">${paragraphs(ex.text, i => `<span class="gapnum">${i + 1}</span><select class="gap" data-i="${i}"><option value="">—</option>${
      ex.items[i].options.map((o, k) => `<option value="${k}">${LETTERS[k]} ${esc(o)}</option>`).join('')}</select>`)}</div>`;
  } else if (ex.part === 'uoe2') {
    body = `<div class="card text">${paragraphs(ex.text, i => `<span class="gapnum">${i + 1}</span><input class="gap" data-i="${i}" autocomplete="off" spellcheck="false">`)}</div>`;
  } else if (ex.part === 'uoe3') {
    body = `<div class="card text">${paragraphs(ex.text, i => `<span class="gapnum">${i + 1}</span><input class="gap" data-i="${i}" autocomplete="off" spellcheck="false"><span class="keyword">${esc(ex.items[i].word)}</span>`)}</div>`;
  } else if (ex.part === 'uoe4') {
    body = `<div class="card">${ex.items.map((it, i) => `<div class="q">
      <div><span class="gapnum">${i + 1}</span>${esc(it.s1)}</div>
      <div class="keyword" style="margin:.35rem 0">${esc(it.key)}</div>
      <div>${esc(it.before)} <input class="gap" data-i="${i}" style="min-width:16rem" autocomplete="off" spellcheck="false"> ${esc(it.after)}</div>
      <div class="warnline" data-warn="${i}"></div></div>`).join('')}</div>`;
  } else if (ex.part === 'rd5') {
    body = `<div class="split">
      <div class="card text sticky">${paragraphs(ex.text, () => '')}</div>
      <div class="card">${ex.questions.map((q, i) => `<div class="q"><b>${i + 1}.</b> ${esc(q.q)}
        ${q.options.map((o, k) => `<label class="opt" data-q="${i}" data-k="${k}"><input type="radio" name="q${i}" value="${k}"> <b>${LETTERS[k]}</b> ${esc(o)}</label>`).join('')}</div>`).join('')}</div></div>`;
  } else if (ex.part === 'rd6') {
    const keys = Object.keys(ex.sentences);
    body = `<div class="split">
      <div class="card text">${paragraphs(ex.text, i => `<span class="gapnum">${i + 1}</span><select class="gap" data-i="${i}" style="min-width:4rem"><option value="">—</option>${keys.map(k => `<option>${k}</option>`).join('')}</select>`)}</div>
      <div class="card sticky"><h3>Sentences</h3>${keys.map(k => `<div class="sent" data-s="${k}"><b>${k}</b>${esc(ex.sentences[k])}</div>`).join('')}</div></div>`;
  } else if (ex.part === 'rd7') {
    const keys = Object.keys(ex.sections);
    body = `<div class="split">
      <div class="card"><h3>Which person…</h3>${ex.questions.map((q, i) => `<div class="q" style="display:flex;gap:.6rem;align-items:center">
        <select class="gap" data-i="${i}" style="min-width:4rem"><option value="">—</option>${keys.map(k => `<option>${k}</option>`).join('')}</select>
        <span><b>${i + 1}.</b> ${esc(q.q)}</span></div>`).join('')}</div>
      <div class="card sticky">${keys.map(k => `<div class="q"><h3>${k} · ${esc(ex.sections[k].title)}</h3><div class="small">${esc(ex.sections[k].text)}</div></div>`).join('')}</div></div>`;
  }

  $app.innerHTML = `
    <a href="#/${P.section}" class="small">← ${SECTIONS[P.section].name}</a>
    <div class="ex-head"><div><span class="tag">${SECTIONS[P.section].name} · ${P.label} — ${P.name}</span><h1>${esc(ex.title)}</h1></div>
      <div class="timer" id="timer"></div></div>
    <div class="instr">${P.instr}</div>
    ${body}
    <div class="actions"><button class="primary" id="check">Corregir</button><button id="reset">Reiniciar</button>
      <span class="small muted">Mejor resultado: ${badge(bestFor(ex.id))}</span></div>
    <div id="result" class="result"></div>`;

  startUpTimer($('#timer'), P.minutes);
  $('#reset').onclick = () => exercise(id);
  $('#check').onclick = () => checkExercise(ex);

  if (ex.part === 'uoe4') {
    $$('input.gap').forEach(inp => inp.addEventListener('input', () => {
      const it = ex.items[+inp.dataset.i], v = inp.value.trim();
      const n = v ? basic(v).split(' ').length : 0;
      const us = t => t.replace(/iz/g, 'is'); // apologized = apologised
      const hasKey = variants(v).some(x => us(` ${x} `).includes(us(` ${basic(it.key)} `)));
      const w = [];
      if (v && (n < 2 || n > 5)) w.push(`Tenés ${n} palabra${n === 1 ? '' : 's'} (las contracciones cuentan como 2): tienen que ser entre 2 y 5.`);
      if (v && !hasKey) w.push(`Falta la palabra clave ${it.key}.`);
      $(`[data-warn="${inp.dataset.i}"]`).textContent = w.join(' ');
    }));
  }
  if (ex.part === 'rd6') {
    $$('select.gap').forEach(s => s.addEventListener('change', () => {
      const used = $$('select.gap').map(x => x.value);
      $$('.sent').forEach(d => d.classList.toggle('used', used.includes(d.dataset.s)));
    }));
  }
}

function checkExercise(ex) {
  stopTimer();
  const secs = +($('#timer').dataset.secs || 0);
  const val = i => ($(`[data-i="${i}"]`)?.value ?? '').trim();
  const res = [];

  if (ex.part === 'uoe1') ex.items.forEach((it, i) => {
    const v = val(i);
    res.push({ ok: v !== '' && +v === it.answer, given: v === '' ? '—' : `${LETTERS[+v]} ${it.options[+v]}`,
      correct: `${LETTERS[it.answer]} ${it.options[it.answer]}`, explain: it.explain, label: contextOf(ex.text, i + 1) });
  });
  if (ex.part === 'uoe2' || ex.part === 'uoe3') ex.items.forEach((it, i) => {
    const v = val(i);
    res.push({ ok: matches(v, it.answers), given: v || '—', correct: it.answers.join(' / '), explain: it.explain,
      label: (it.word ? `(${it.word}) ` : '') + contextOf(ex.text, i + 1) });
  });
  if (ex.part === 'uoe4') ex.items.forEach((it, i) => {
    const v = val(i);
    res.push({ ok: matches(v, it.answers), given: v || '—', correct: it.answers[0] + (it.answers.length > 1 ? `  (también: ${it.answers.slice(1).join(' / ')})` : ''),
      explain: it.explain, label: `${it.s1} → ${it.before} ___ ${it.after} (${it.key})`, overridable: !!v });
  });
  if (ex.part === 'rd5') ex.questions.forEach((q, i) => {
    const sel = $(`input[name="q${i}"]:checked`); const v = sel ? +sel.value : null;
    res.push({ ok: v === q.answer, given: v == null ? '—' : `${LETTERS[v]} ${q.options[v]}`, correct: `${LETTERS[q.answer]} ${q.options[q.answer]}`, explain: q.explain, label: q.q });
    $$(`label.opt[data-q="${i}"]`).forEach(l => {
      const k = +l.dataset.k;
      l.classList.toggle('ok', k === q.answer); l.classList.toggle('bad', k === v && v !== q.answer);
    });
  });
  if (ex.part === 'rd6') ex.answers.forEach((a, i) => {
    const v = val(i);
    res.push({ ok: v === a, given: v || '—', correct: `${a} — ${ex.sentences[a]}`, explain: ex.explains[i], label: `Gap ${i + 1}: ${ex.title}` });
  });
  if (ex.part === 'rd7') ex.questions.forEach((q, i) => {
    const v = val(i);
    res.push({ ok: v === q.answer, given: v || '—', correct: `${q.answer} (${ex.sections[q.answer].title})`, explain: q.explain, label: `Which person ${q.q}` });
  });

  // marcar huecos
  res.forEach((r, i) => { const el = $(`[data-i="${i}"]`); if (el) { el.classList.remove('ok', 'bad'); el.classList.add(r.ok ? 'ok' : 'bad'); } });

  const attempt = { id: ex.id, part: ex.part, score: res.filter(r => r.ok).length, max: res.length, secs, date: new Date().toISOString() };
  state.attempts.push(attempt);
  res.forEach((r, i) => updateError(`${ex.id}#${i}`, r, { kind: 'item', exId: ex.id, part: ex.part }));
  save();
  renderResult(ex, res, attempt);
}

function updateError(key, r, meta) {
  if (r.ok) { delete state.errors[key]; return; }
  const prev = state.errors[key];
  state.errors[key] = { ...meta, label: r.label, given: r.given, correct: r.correct, explain: r.explain,
    count: (prev?.count || 0) + 1, last: new Date().toISOString() };
}

function renderResult(ex, res, attempt) {
  const p = pct(attempt), P = PARTS[ex.part];
  $('#result').innerHTML = `
    <div class="card">
      <div style="display:flex;gap:1rem;align-items:baseline;flex-wrap:wrap">
        <span class="score-big">${attempt.score}/${attempt.max}</span> <span class="badge ${level(p)}">${p}%</span>
        <span class="muted small">Tiempo: ${fmtTime(attempt.secs)} (sugerido ${P.minutes}:00)</span></div>
      ${ex.part === 'uoe4' ? '<p class="small muted">En el examen real Part 4 vale 2 puntos por ítem (se puede sacar 1 de 2). Si tu respuesta es otra forma correcta, marcala como válida.</p>' : ''}
      <div style="margin-top:.8rem">${res.map((r, i) => `
        <div class="fb ${r.ok ? 'ok' : 'bad'}"><b>${i + 1}.</b> ${r.ok ? '✔' : '✘'}
          ${r.ok ? `<span class="ans">${esc(r.given)}</span>` : `Tu respuesta: <span class="ans">${esc(r.given)}</span> · Correcta: <span class="ans">${esc(r.correct)}</span>`}
          <div class="small">${esc(r.explain)}</div>
          ${!r.ok && r.overridable ? `<button class="link" data-override="${i}">Mi respuesta también es válida</button>` : ''}
        </div>`).join('')}</div>
    </div>`;
  $$('[data-override]').forEach(b => b.onclick = () => {
    const i = +b.dataset.override;
    res[i].ok = true; attempt.score++;
    delete state.errors[`${ex.id}#${i}`];
    // el intento guardado es el mismo objeto que está en state.attempts
    save(); renderResult(ex, res, attempt);
    $(`[data-i="${i}"]`)?.classList.replace('bad', 'ok');
  });
}

// ════════════════════════════ Gramática (drills) ════════════════════════════
let drillSession = [];
function drills(topic = '') {
  const T = FCE.drillTopics;
  const errIds = Object.values(state.errors).filter(e => e.kind === 'drill').map(e => e.drillId);
  let pool;
  if (topic === 'errores') pool = FCE.drills.filter(d => errIds.includes(d.id));
  else if (topic && T[topic]) pool = FCE.drills.filter(d => d.topic === topic);
  else { topic = ''; pool = FCE.drills; }
  drillSession = shuffle(pool).slice(0, topic === 'errores' ? 15 : 10);

  const chip = (t, label) => `<a class="chip ${topic === t ? 'active' : ''}" href="#/drills/${t}" style="text-decoration:none">${label}</a>`;
  $app.innerHTML = `
    <h1>Gramática</h1>
    <p class="muted">Rondas cortas con los temas de tus clases y tus errores frecuentes. Lo que falles va a <b>Mis errores</b> hasta que lo aciertes.</p>
    <div class="chips" style="margin:1rem 0">
      ${chip('', 'Mezcla')}
      ${chip('errores', `Mis errores (${errIds.length})`)}
      ${Object.entries(T).map(([k, v]) => chip(k, `${v} (${FCE.drills.filter(d => d.topic === k).length})`)).join('')}
    </div>
    ${drillSession.length ? `<div class="card">${drillSession.map((d, i) => `
      <div class="q"><span class="gapnum">${i + 1}</span>
        <span class="tag" style="margin-right:.4rem">${esc(T[d.topic])}</span><br>
        ${esc(d.q).replace('___', `<input class="gap" data-i="${i}" autocomplete="off" spellcheck="false">`)}
        ${d.hint ? `<span class="muted small">(${esc(d.hint)})</span>` : ''}
      </div>`).join('')}</div>
    <div class="actions"><button class="primary" id="check">Corregir</button><button id="again">Otra ronda</button></div>
    <div id="result" class="result"></div>` : `<div class="card">¡No tenés errores pendientes! 🎉</div>`}`;

  if (!drillSession.length) return;
  $('#again').onclick = () => drills(topic);
  $('#check').onclick = () => {
    const res = drillSession.map((d, i) => {
      const v = ($(`[data-i="${i}"]`).value || '').trim();
      return { ok: matches(v, d.answers), given: v || '—', correct: d.answers.join(' / '), explain: d.explain,
        label: d.q + (d.hint ? ` (${d.hint})` : '') };
    });
    res.forEach((r, i) => {
      $(`[data-i="${i}"]`).classList.add(r.ok ? 'ok' : 'bad');
      updateError(`drill#${drillSession[i].id}`, r, { kind: 'drill', drillId: drillSession[i].id, topic: drillSession[i].topic });
    });
    const attempt = { id: `drills-${topic || 'mix'}`, part: 'drill', topic: topic || 'mix', score: res.filter(r => r.ok).length, max: res.length, secs: 0, date: new Date().toISOString() };
    state.attempts.push(attempt); save();
    const p = pct(attempt);
    $('#result').innerHTML = `<div class="card"><span class="score-big">${attempt.score}/${attempt.max}</span> <span class="badge ${level(p)}">${p}%</span>
      <div style="margin-top:.8rem">${res.map((r, i) => `<div class="fb ${r.ok ? 'ok' : 'bad'}"><b>${i + 1}.</b> ${r.ok ? '✔' : '✘'}
        ${r.ok ? `<span class="ans">${esc(r.given)}</span>` : `Tu respuesta: <span class="ans">${esc(r.given)}</span> · Correcta: <span class="ans">${esc(r.correct)}</span>`}
        <div class="small">${esc(r.explain)}</div></div>`).join('')}</div></div>`;
    $('#check').disabled = true;
  };
}

// ════════════════════════════ Writing ════════════════════════════
const W_TYPES = { essay: 'Essay', article: 'Article', review: 'Review', email: 'Email', letter: 'Letter', report: 'Report' };
const FORMAL = ['essay', 'letter', 'report'];
const CHECKLIST = {
  essay: ['Título siempre.', 'Intro (presentá el tema, SIN dar tu opinión) + 3 párrafos (las 2 notas + tu idea propia) + conclusión con tu opinión. ¡No te saltees ningún párrafo!',
    'Mínimo 3 oraciones por párrafo.', 'Linkers: First of all, Furthermore, Moreover, However, On the other hand, Finally, In conclusion…',
    'Registro formal: sin contracciones (don\'t → do not), sin phrasal verbs informales ni idioms.', 'No pongas subtítulos a los párrafos.', 'Menos comas, más puntos.'],
  article: ['Título llamativo.', 'Hablale al lector: preguntas retóricas ("Have you ever…?"), tono cercano.', 'Respondé TODAS las preguntas del enunciado, una idea por párrafo (máx. 5 párrafos).',
    'Se permiten contracciones y lenguaje más informal.', 'Cerrá con una opinión o recomendación.'],
  review: ['Título.', 'Presentá qué es (serie, lugar, libro…).', 'Describí y opiná: lo que te gustó y lo que no.', 'Vocabulario variado de opinión (gripping, overrated, worth watching…).',
    'Recomendación final clara: ¿a quién se lo recomendarías?'],
  email: ['Saludo (Hi Sam,) y despedida (Best wishes, / Take care,) + tu nombre.', 'Primera línea amistosa (Great to hear from you!).', 'Respondé cada pregunta del email, una por párrafo.',
    'Tono informal: contracciones, phrasal verbs, OK.'],
  letter: ['Dear Ms Carter, … Yours sincerely, (si sabés el nombre) / Dear Sir or Madam, … Yours faithfully,', 'Párrafo 1: motivo de la carta.', 'Experiencia y por qué sos adecuado, con ejemplos.',
    'Registro formal: sin contracciones.', 'Cierre: I look forward to hearing from you.'],
  report: ['Título + encabezados por sección (Introduction, …, Recommendation).', 'Intro: propósito del informe ("The aim of this report is to…").', 'Lenguaje impersonal y formal, sin contracciones.',
    'Recomendación final concreta y justificada.'],
};
// Errores personales detectados en tus correcciones (heurística, no reemplaza la corrección).
const PERSONAL = [
  [/\bi\s*'?\s*a?m agree/i, '"I\'m agree" → I agree'],
  [/\bdepend(s|ed|ing)? in\b/i, '"depend in" → depend ON'],
  [/(^|[\s.!?(])i\b/m, '"i" en minúscula → I'],
  [/\bu\b/i, '"u" → you'],
  [/\bpeople (is|was|has)\b/i, '"people" es plural → are/were/have'],
  [/\b(responsability|enviroment|comunicat\w*|mantain\w*|mantaing|recomend\w*|unfortunaly|dolars?)\b/i, 'Ortografía: responsibility, environment, communicate, maintain, recommend, unfortunately, dollar'],
  [/\b(every one|some one)\b/i, '"every one/some one" → everyone/someone'],
  [/(?<!\b(be|is|am|are|was|were|get|got|getting|been|'m|'re|'s) )used to \w+ing\b/i, '"used to + -ing" → used to + infinitivo (salvo "be used to + -ing")'],
];
const LINKERS = ['however', 'furthermore', 'moreover', 'in addition', 'on the one hand', 'on the other hand', 'first of all', 'firstly', 'secondly', 'finally', 'in conclusion',
  'to sum up', 'to conclude', 'although', 'even though', 'whereas', 'while', 'nevertheless', 'therefore', 'as a result', 'for instance', 'for example', 'despite', 'in spite of', 'what is more', 'consequently'];

function writingList() {
  const card = w => {
    const d = state.drafts[w.id]; const n = d?.text ? countWords(d.text) : 0;
    const done = (FCE.writingLog || []).filter(l => l.taskId === w.id);
    return `<a class="card" href="#/writing/${w.id}"><span class="tag">Part ${w.part} · ${W_TYPES[w.type]}</span>
      <h3 style="margin-top:.2rem">${esc(w.title)}</h3>
      ${done.length ? `<span class="badge ok">corregido: ${done.map(l => l.content + l.communicative + l.organisation + l.language).join(', ')}/20</span> ` : ''}
      ${n ? `<span class="badge warn">borrador: ${n} palabras</span>` : ''}</a>`;
  };
  const wlog = FCE.writingLog || [];
  $app.innerHTML = `
    <h1>Writing</h1>
    <p class="muted">80 minutos para 2 textos de 140–190 palabras. Part 1 es siempre un <b>essay</b>; en Part 2 elegís entre article, review, email/letter o report.</p>
    <div class="instr">Cómo practicar: elegí una tarea → escribí con el timer de 40 min → <b>Copiar para corregir</b> → en Claude Code escribí <code>/writing</code> y pegá el texto. La corrección queda guardada en <code>writing/historial/</code> y el puntaje aparece acá.</div>
    ${wlog.length ? `<h2>Historial de puntajes</h2><div class="card"><table><tr><th>Fecha</th><th>Tarea</th><th class="num">Content</th><th class="num">Com. Ach.</th><th class="num">Organis.</th><th class="num">Language</th><th class="num">Total</th></tr>
      ${wlog.slice().reverse().map(l => { const t = l.content + l.communicative + l.organisation + l.language;
        return `<tr><td>${esc(l.date)}</td><td>${esc(l.task)} <span class="muted small">${esc(l.source || '')}</span></td><td class="num">${l.content}</td><td class="num">${l.communicative}</td><td class="num">${l.organisation}</td><td class="num">${l.language}</td>
        <td class="num"><span class="badge ${level(t * 5)}">${t}/20</span></td></tr>`; }).join('')}</table>
      <p class="small muted">Aprobar ≈ 12/20 por texto · Grade A / C1 ≈ 16/20.</p></div>` : ''}
    <h2>Part 1 · Essay</h2><div class="grid">${FCE.writing.filter(w => w.part === 1).map(card).join('')}</div>
    <h2>Part 2 · Elegí uno</h2><div class="grid">${FCE.writing.filter(w => w.part === 2).map(card).join('')}</div>`;
}

function countWords(t) { return (t.match(/[A-Za-zÀ-ÿ0-9]+(?:['’-][A-Za-zÀ-ÿ0-9]+)*/g) || []).length; }

function analyse(text, type) {
  const notes = [];
  const n = countWords(text);
  const paras = text.split(/\n\s*\n|\n/).map(p => p.trim()).filter(Boolean);
  const isGreeting = p => /^(dear|hi|hello|hey)\b/i.test(p) || /^(best|kind|yours|love|take care|all the best|see you|regards|cheers)/i.test(p) || countWords(p) <= 3;
  const body = paras.filter(p => !isGreeting(p) && countWords(p) > 8);
  const sentences = p => p.split(/(?<=[.!?])\s+/).filter(s => countWords(s) > 1);
  if (type === 'essay' && body.length < 5) notes.push(['bad', `Tenés ${body.length} párrafos de desarrollo: un essay necesita 5 (intro + 3 ideas + conclusión).`]);
  if (['essay', 'article'].includes(type)) body.forEach((p, i) => {
    const k = sentences(p).length;
    if (k < 3) notes.push(['warn', `Párrafo ${i + 1}: ${k} oración${k === 1 ? '' : 'es'} (tu profe pide mínimo 3).`]);
  });
  const allSent = body.flatMap(sentences);
  allSent.forEach(s => {
    const w = countWords(s), c = (s.match(/,/g) || []).length;
    if (w > 35 || c > 3) notes.push(['warn', `Oración larga (${w} palabras, ${c} comas): "${s.slice(0, 60)}…" → partila con un punto.`]);
  });
  if (FORMAL.includes(type)) {
    const con = text.match(/\b\w+(n't|'re|'ve|'ll|'m|'d)\b|\b(it|that|there|what|he|she)'s\b/gi);
    if (con) notes.push(['bad', `Contracciones en registro formal: ${[...new Set(con)].slice(0, 6).join(', ')} → escribilas completas.`]);
  }
  const low = ' ' + text.toLowerCase().replace(/\s+/g, ' ') + ' ';
  const linkers = LINKERS.filter(l => low.includes(` ${l} `) || low.includes(` ${l},`));
  if (linkers.length < 4 && n > 60) notes.push(['warn', `Pocos linkers (${linkers.length}). Probá con: However, Furthermore, On the other hand, As a result…`]);
  PERSONAL.forEach(([re, msg]) => { if (re.test(text)) notes.push(['bad', msg]); });
  return { n, paras: body.length, linkers, notes };
}

function writingTask(id) {
  const w = FCE.writing.find(x => x.id === id);
  if (!w) { $app.innerHTML = '<p>Tarea no encontrada.</p>'; return; }
  const draft = state.drafts[id]?.text || '';
  $app.innerHTML = `
    <a href="#/writing" class="small">← Writing</a>
    <div class="ex-head"><div><span class="tag">Part ${w.part} · ${W_TYPES[w.type]}</span><h1>${esc(w.title)}</h1></div>
      <div style="display:flex;gap:.5rem;align-items:center"><span class="timer" id="wtimer">40:00</span><button id="wstart">Empezar timer</button></div></div>
    <div class="split" style="margin-top:1rem">
      <div>
        <textarea class="writing" id="wtext" placeholder="Escribí acá (140–190 palabras). Se guarda solo en este navegador.">${esc(draft)}</textarea>
        <div class="actions">
          <button class="primary" id="wcopy">Copiar para corregir con /writing</button>
          <button id="wclear">Borrar borrador</button>
          <span id="wcount" class="wc"></span>
        </div>
      </div>
      <div class="sticky">
        <div class="prompt">${esc(w.prompt)}</div>
        <div class="card" style="margin-top:1rem"><h3>Chequeo automático</h3><div id="wnotes" class="small"></div>
          <p class="small muted" style="margin-bottom:0">Es una heurística rápida; la corrección real es con <code>/writing</code>.</p></div>
        <div class="card" style="margin-top:1rem"><h3>Checklist · ${W_TYPES[w.type]}</h3><ul class="check">${CHECKLIST[w.type].map(c => `<li>${esc(c)}</li>`).join('')}</ul></div>
      </div>
    </div>`;

  const ta = $('#wtext');
  let saveT;
  const refresh = () => {
    const a = analyse(ta.value, w.type);
    const cls = a.n === 0 ? '' : a.n < 140 ? 'bad' : a.n > 190 ? 'warn' : 'ok';
    $('#wcount').className = `wc ${cls}`;
    $('#wcount').textContent = `${a.n} palabras · ${a.paras} párrafos`;
    $('#wnotes').innerHTML = ta.value.trim() ? (a.notes.length ? a.notes.map(([c, m]) => `<div class="fb ${c === 'bad' ? 'bad' : ''}" style="${c === 'warn' ? 'background:var(--warn-soft)' : ''}">${esc(m)}</div>`).join('') : '<div class="fb ok">Sin alertas. ¡Bien!</div>')
      + (a.linkers.length ? `<div class="muted" style="margin-top:.4rem">Linkers: ${esc(a.linkers.join(', '))}</div>` : '') : '<span class="muted">Empezá a escribir…</span>';
  };
  ta.addEventListener('input', () => {
    refresh(); clearTimeout(saveT);
    saveT = setTimeout(() => { state.drafts[id] = { text: ta.value, updated: new Date().toISOString() }; save(); }, 400);
  });
  refresh();

  $('#wstart').onclick = () => {
    const end = Date.now() + 40 * 60000; stopTimer();
    const el = $('#wtimer');
    const tick = () => { const s = Math.max(0, Math.round((end - Date.now()) / 1000)); el.textContent = s ? fmtTime(s) : '¡Tiempo!'; el.classList.toggle('over', s < 300); if (!s) stopTimer(); };
    tick(); timerId = setInterval(tick, 1000); $('#wstart').textContent = 'Reiniciar timer';
  };
  $('#wclear').onclick = () => { if (confirm('¿Borrar el borrador?')) { delete state.drafts[id]; save(); writingTask(id); } };
  $('#wcopy').onclick = async () => {
    const payload = `Tarea: ${w.id} (Part ${w.part} · ${w.type}) — ${w.title}\n\n${w.prompt}\n\n--- MI TEXTO ---\n${ta.value.trim()}\n`;
    try { await navigator.clipboard.writeText(payload); }
    catch { const t = document.createElement('textarea'); t.value = payload; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); }
    toast('Copiado. En Claude Code escribí /writing y pegá el texto.');
  };
}

// ════════════════════════════ Progreso ════════════════════════════
function progress() {
  const titleOf = a => a.part === 'drill' ? `Gramática · ${FCE.drillTopics[a.topic] || 'Mezcla'}` : (exById(a.id)?.title || a.id);
  const partName = a => a.part === 'drill' ? 'Gramática' : `${SECTIONS[PARTS[a.part].section].name} ${PARTS[a.part].label}`;
  const errs = Object.entries(state.errors).sort((a, b) => b[1].count - a[1].count);
  const allParts = [...SECTIONS.uoe.parts, ...SECTIONS.reading.parts, 'drill'];

  $app.innerHTML = `
    <h1>Progreso</h1>
    <h2>Resumen</h2>
    <div class="card"><table>
      <tr><th>Parte</th><th class="num">Intentos</th><th class="num">Promedio</th><th class="num">Mejor</th><th class="num">Último</th></tr>
      ${allParts.map(p => { const st = partStats(p);
        return `<tr><td>${p === 'drill' ? 'Gramática' : `${SECTIONS[PARTS[p].section].name} ${PARTS[p].label} · ${PARTS[p].name}`}</td>
          <td class="num">${st?.n ?? 0}</td><td class="num">${st ? badge(st.avg) : '—'}</td><td class="num">${st ? st.best + '%' : '—'}</td><td class="num">${st ? st.last + '%' : '—'}</td></tr>`; }).join('')}
    </table></div>

    <h2>Cuaderno de errores (${errs.length})</h2>
    ${errs.length ? `<div class="card">
      ${Object.values(state.errors).some(e => e.kind === 'drill') ? `<p><a class="btn primary" href="#/drills/errores">Repasar errores de gramática</a></p>` : ''}
      ${errs.map(([k, e]) => `<div class="fb bad">
        <div class="small muted">${e.kind === 'drill' ? 'Gramática · ' + esc(FCE.drillTopics[e.topic] || '') : esc(partName(e)) + ' · <a href="#/ex/' + esc(e.exId) + '">' + esc(exById(e.exId)?.title || '') + '</a>'}
          ${e.count > 1 ? ` · <b>fallado ${e.count} veces</b>` : ''}</div>
        <div>${esc(e.label)}</div>
        <div>Pusiste: <span class="ans">${esc(e.given)}</span> · Correcta: <span class="ans">${esc(e.correct)}</span></div>
        <div class="small">${esc(e.explain)}</div>
        <button class="link" data-del="${esc(k)}">Quitar</button></div>`).join('')}</div>` : '<div class="card muted">Todavía no hay errores registrados.</div>'}

    <h2>Historial</h2>
    ${state.attempts.length ? `<div class="card"><table>
      <tr><th>Fecha</th><th>Parte</th><th>Ejercicio</th><th class="num">Puntaje</th><th class="num">Tiempo</th></tr>
      ${state.attempts.slice(-40).reverse().map(a => `<tr><td>${fmtDate(a.date)}</td><td>${esc(partName(a))}</td><td>${esc(titleOf(a))}</td>
        <td class="num">${a.score}/${a.max} ${badge(pct(a))}</td><td class="num">${a.secs ? fmtTime(a.secs) : '—'}</td></tr>`).join('')}
    </table></div>` : '<div class="card muted">Sin intentos todavía.</div>'}

    <h2>Copia de seguridad</h2>
    <div class="card">
      <p class="small muted" style="margin-top:0">El progreso se guarda en este navegador. Exportalo de vez en cuando (por ejemplo a <code>practica/backup/</code>).</p>
      <div class="actions" style="margin-top:0">
        <button id="exp">Exportar progreso</button>
        <label class="btn">Importar… <input type="file" id="imp" accept=".json" hidden></label>
        <button id="rst">Borrar todo</button>
      </div>
    </div>`;

  $$('[data-del]').forEach(b => b.onclick = () => { delete state.errors[b.dataset.del]; save(); progress(); });
  $('#exp').onclick = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `fce-progreso-${new Date().toISOString().slice(0, 10)}.json`; a.click(); URL.revokeObjectURL(a.href);
  };
  $('#imp').onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      if (!Array.isArray(data.attempts)) throw new Error('formato');
      if (confirm('Esto reemplaza el progreso actual por el del archivo. ¿Continuar?')) { state = Object.assign(blank(), data); save(); progress(); toast('Progreso importado.'); }
    } catch { toast('El archivo no es un backup válido.'); }
  };
  $('#rst').onclick = () => { if (confirm('¿Borrar TODO el progreso? (exportalo antes si querés conservarlo)')) { state = blank(); save(); progress(); } };
}

// ════════════════════════════ Inicio ════════════════════════════
renderCountdown();
route();
})();
