// Selector de estilos (sólo para la preview de la rama "estilos").
(function () {
  const THEMES = [
    ['actual', 'Neo brutalismo (actual)', 'styles.css'],
    ['brutal-puro', 'Brutalismo puro'],
    ['memphis', 'Memphis'],
    ['y2k', 'Y2K'],
    ['retro70s', 'Retro 70s'],
    ['pixel', 'Pixel art / retro gaming'],
    ['glass', 'Glassmorphism'],
    ['neumorphism', 'Neumorphism'],
    ['clay', 'Claymorphism'],
    ['bento', 'Bento grid'],
    ['suizo', 'Minimalismo suizo'],
    ['cyberpunk', 'Cyberpunk / Neón'],
    ['dark-premium', 'Dark premium (Linear / Vercel)'],
    ['aurora', 'Aurora / Mesh gradients'],
    ['cuaderno', 'Skeuomorfismo (cuaderno)'],
    ['editorial', 'Editorial / Revista'],
    ['doodle', 'Hand-drawn / Doodle'],
    ['duolingo', 'Gamificado (estilo Duolingo)'],
  ];
  const KEY = 'fce-tema-preview';
  const link = document.getElementById('theme');
  const fromUrl = new URLSearchParams(location.search).get('tema');
  let i = Math.max(0, THEMES.findIndex(t => t[0] === (fromUrl || localStorage.getItem(KEY))));

  const box = document.createElement('div');
  box.id = 'tema-picker';
  box.innerHTML = `<button data-d="-1" aria-label="Anterior">◀</button>
    <select aria-label="Estilo">${THEMES.map((t, k) => `<option value="${k}">${k + 1}. ${t[1]}</option>`).join('')}</select>
    <button data-d="1" aria-label="Siguiente">▶</button>`;
  const css = document.createElement('style');
  css.textContent = `#tema-picker{position:fixed;z-index:9999;left:50%;bottom:14px;transform:translateX(-50%);display:flex;gap:6px;align-items:center;
    background:#111;padding:6px;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.45);font:600 14px/1 system-ui,sans-serif;max-width:calc(100vw - 20px)}
    #tema-picker button,#tema-picker select{all:unset;box-sizing:border-box;background:#2a2a2a;color:#fff;border-radius:9px;padding:9px 12px;cursor:pointer;font:600 14px/1 system-ui,sans-serif}
    #tema-picker select{min-width:0;flex:1;max-width:260px;text-overflow:ellipsis}
    #tema-picker button:hover,#tema-picker select:hover{background:#3a3a3a}
    #tema-picker option{background:#222;color:#fff}`;
  document.head.appendChild(css);
  document.body.appendChild(box);
  const sel = box.querySelector('select');

  function apply() {
    const t = THEMES[i];
    link.href = t[2] || `themes/${t[0]}.css`;
    sel.value = String(i);
    localStorage.setItem(KEY, t[0]);
    document.documentElement.dataset.tema = t[0];
  }
  sel.addEventListener('change', () => { i = +sel.value; apply(); });
  box.querySelectorAll('button').forEach(b => b.addEventListener('click', () => { i = (i + +b.dataset.d + THEMES.length) % THEMES.length; apply(); }));
  apply();
})();
