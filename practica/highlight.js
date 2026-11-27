// Subrayado de texto (como engexam.info): seleccioná texto con el mouse → queda resaltado.
// Clic sobre un resaltado → se quita · Ctrl+Z → deshace · Celular: doble toque sobre una palabra.
// Sólo actúa dentro de elementos con class "hl-zone". Si la zona tiene data-hl="clave", se guarda en localStorage.
(() => {
'use strict';

const KEY = 'fce-highlights';
const SKIP = 'input, select, textarea, button, option';
const undo = [];
let store = {};
try { store = JSON.parse(localStorage.getItem(KEY)) || {}; } catch { store = {}; }
const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch {} };

// Nodos de texto de la zona (sin los de selects, inputs, etc.). Los offsets se cuentan sobre ellos.
function texts(zone) {
  const w = document.createTreeWalker(zone, NodeFilter.SHOW_TEXT, {
    acceptNode: t => t.parentElement.closest(SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  const out = []; while (w.nextNode()) out.push(w.currentNode); return out;
}
function offsetOf(zone, node, off) {
  const r = document.createRange(); r.setStart(zone, 0); r.setEnd(node, off);
  let n = 0;
  for (const t of texts(zone)) {
    if (!r.intersectsNode(t)) continue;
    n += t === r.endContainer ? r.endOffset : t.length;
  }
  return n;
}
// Rangos [inicio, fin] de los resaltados actuales, ordenados y fusionados.
function read(zone) {
  let n = 0; const out = [];
  for (const t of texts(zone)) {
    if (t.parentElement.classList.contains('auto-highlight')) out.push([n, n + t.length]);
    n += t.length;
  }
  return merge(out);
}
function merge(list) {
  const s = list.filter(([a, b]) => b > a).sort((x, y) => x[0] - y[0]); const out = [];
  for (const r of s) { const last = out[out.length - 1]; if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]); else out.push([...r]); }
  return out;
}
function clear(zone) {
  zone.querySelectorAll('.auto-highlight').forEach(el => { el.replaceWith(...el.childNodes); });
  zone.normalize();
}
// Dibuja los rangos: un <span> por cada tramo de texto (no parte elementos). El rango que contiene `fresh` se anima.
function paint(zone, ranges, fresh) {
  clear(zone);
  const jobs = []; let n = 0;
  for (const t of texts(zone)) {
    const a = n, b = n + t.length; n = b;
    if (/^\s*$/.test(t.data) && /\n/.test(t.data)) continue; // espacios entre párrafos del HTML
    ranges.forEach(([s, e], i) => { const from = Math.max(s, a), to = Math.min(e, b); if (to > from) jobs.push([t, from - a, to - a, i]); });
  }
  for (let k = jobs.length - 1; k >= 0; k--) { // de atrás para adelante: partir un nodo no corre los offsets de los anteriores
    let [t, from, to, i] = jobs[k];
    if (to < t.length) t.splitText(to);
    if (from > 0) t = t.splitText(from);
    const span = document.createElement('span');
    span.className = 'auto-highlight';
    span.dataset.g = i;
    t.replaceWith(span); span.appendChild(t);
    const [s, e] = ranges[i];
    if (fresh != null && fresh >= s && fresh < e) requestAnimationFrame(() => requestAnimationFrame(() => span.classList.add('active')));
    else span.classList.add('active');
  }
}
function commit(zone, ranges, fresh) {
  undo.push({ zone, before: read(zone) });
  if (undo.length > 100) undo.shift();
  paint(zone, ranges, fresh);
  save(zone);
}
function save(zone) {
  const k = zone.dataset.hl; if (!k) return;
  const r = read(zone);
  if (r.length) store[k] = r; else delete store[k];
  persist();
}

function flashInvalid(range) {
  for (const r of range.getClientRects()) {
    const d = document.createElement('div');
    Object.assign(d.style, { position: 'fixed', left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px',
      background: 'rgba(255,0,0,.25)', pointerEvents: 'none', zIndex: 9999, transition: 'opacity 250ms' });
    document.body.appendChild(d);
    requestAnimationFrame(() => { d.style.opacity = '0'; });
    setTimeout(() => d.remove(), 300);
  }
}
const blockOf = node => (node.nodeType === 1 ? node : node.parentElement).closest('p, li, div, .hl-zone');

function addRange(range) {
  const el = n => n.nodeType === 1 ? n : n.parentElement;
  const zone = el(range.startContainer).closest('.hl-zone');
  if (!zone || el(range.endContainer).closest('.hl-zone') !== zone) return false;
  if (blockOf(range.startContainer) !== blockOf(range.endContainer) || range.cloneContents().querySelector(SKIP)) { flashInvalid(range); return false; }
  const full = texts(zone).map(t => t.data).join('');
  let s = offsetOf(zone, range.startContainer, range.startOffset), e = offsetOf(zone, range.endContainer, range.endOffset);
  while (s < e && /\s/.test(full[s])) s++;
  while (e > s && /\s/.test(full[e - 1])) e--;
  if (e <= s) return false;
  commit(zone, merge([...read(zone), [s, e]]), s);
  return true;
}

const isTouch = window.matchMedia('(pointer: coarse)').matches;

if (!isTouch) {
  document.addEventListener('mouseup', e => {
    if (e.button !== 0 || e.target.closest(SKIP)) return;
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    const start = range.startContainer.nodeType === 1 ? range.startContainer : range.startContainer.parentElement;
    if (!start.closest('.hl-zone')) return; // fuera de las zonas, la selección sigue normal (para copiar)
    addRange(range);
    sel.removeAllRanges();
  });
} else {
  let lastTap = 0, lastX = 0, lastY = 0;
  document.addEventListener('touchend', e => {
    const t = e.changedTouches[0]; if (!t || !e.target.closest('.hl-zone') || e.target.closest(SKIP)) return;
    const now = Date.now(), dbl = now - lastTap < 300 && Math.abs(t.clientX - lastX) < 20 && Math.abs(t.clientY - lastY) < 20;
    lastTap = now; lastX = t.clientX; lastY = t.clientY;
    if (!dbl || e.target.closest('.auto-highlight')) return;
    let r = null;
    if (document.caretRangeFromPoint) r = document.caretRangeFromPoint(t.clientX, t.clientY);
    else if (document.caretPositionFromPoint) { const p = document.caretPositionFromPoint(t.clientX, t.clientY); if (p) { r = document.createRange(); r.setStart(p.offsetNode, p.offset); } }
    if (!r || r.startContainer.nodeType !== 3) return;
    const node = r.startContainer, txt = node.data, word = /[^\s.,!?;:"()]/;
    let a = r.startOffset, b = r.startOffset;
    while (a > 0 && word.test(txt[a - 1])) a--;
    while (b < txt.length && word.test(txt[b])) b++;
    if (b <= a) return;
    const wr = document.createRange(); wr.setStart(node, a); wr.setEnd(node, b);
    if (addRange(wr)) { e.preventDefault(); window.getSelection()?.removeAllRanges(); }
  });
}

// Clic sobre un resaltado → se quita (todos los tramos de ese resaltado).
document.addEventListener('click', e => {
  const el = e.target.closest('.auto-highlight'); if (!el) return;
  if (window.getSelection && !window.getSelection().isCollapsed) return;
  const zone = el.closest('.hl-zone'); if (!zone) return;
  e.preventDefault();
  const before = read(zone);
  const mine = zone.querySelectorAll(`.auto-highlight[data-g="${el.dataset.g}"]`);
  mine.forEach(s => { s.classList.remove('active'); s.classList.add('removing'); });
  setTimeout(() => {
    if (!zone.isConnected) return;
    mine.forEach(s => s.replaceWith(...s.childNodes));
    zone.normalize();
    const left = read(zone);
    undo.push({ zone, before });
    paint(zone, left); save(zone);
  }, 350);
});

// Ctrl+Z deshace (menos cuando estás escribiendo en un campo de texto).
document.addEventListener('keydown', e => {
  if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== 'z' || e.shiftKey) return;
  const a = document.activeElement;
  if (a && (a.matches('input, textarea, select') || a.isContentEditable)) return;
  let u; while ((u = undo.pop()) && !u.zone.isConnected);
  if (!u) return;
  e.preventDefault();
  paint(u.zone, u.before); save(u.zone);
});

window.FCEHighlight = {
  // Repinta los subrayados guardados de las zonas con data-hl dentro de root.
  restore(root = document) { root.querySelectorAll('.hl-zone[data-hl]').forEach(z => { const r = store[z.dataset.hl]; if (r) paint(z, merge(r)); }); },
  clear(zone) { if (!zone || !read(zone).length) return; commit(zone, []); },
};
})();
