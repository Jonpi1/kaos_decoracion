/* ===================================================
   KAOS DECORACIÓN — Editor visual inline (solo admins)
=================================================== */
(function () {
  'use strict';

  /* ── Verificar sesión admin ── */
  let adminSession;
  try {
    adminSession = JSON.parse(localStorage.getItem('kaos_admin_session'));
    if (!adminSession) return;
  } catch (e) { return; }

  const TEXTS_KEY = 'kaos_texts';
  let editMode = false;
  let pendingChanges = {};
  let saveTimer = null;

  /* ── Estilos del editor ── */
  const css = document.createElement('style');
  css.textContent = `
    #kab {
      position: fixed; top: 0; left: 0; right: 0; height: 46px;
      background: #140C05; border-bottom: 2px solid #C9A96E;
      z-index: 99999; display: flex; align-items: center;
      padding: 0 18px; gap: 10px;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 13px; box-shadow: 0 2px 12px rgba(0,0,0,.5);
    }
    .kab-brand { color: #C9A96E; font-weight: 900; font-size: .8rem; letter-spacing:.08em; }
    .kab-sep   { color: rgba(255,255,255,.18); }
    .kab-page  { color: rgba(255,255,255,.45); font-size: .72rem; }
    .kab-user  { color: rgba(255,255,255,.35); font-size: .7rem; }
    .kab-gap   { flex: 1; }
    .kab-unsaved { color: #f59e0b; font-size: .7rem; font-weight: 700; display:none; }
    #kab button {
      padding: 5px 13px; border: none; border-radius: 6px;
      font-size: .74rem; font-weight: 700; cursor: pointer;
      transition: all .15s; white-space: nowrap;
    }
    #kab-edit-btn { background: rgba(201,169,110,.14); color: #C9A96E; border: 1.5px solid rgba(201,169,110,.35) !important; }
    #kab-edit-btn:hover, #kab-edit-btn.on { background: #C9A96E; color: #140C05; border-color: #C9A96E !important; }
    #kab-save-btn { background: #22c55e; color: #fff; display:none; }
    #kab-save-btn:hover { background: #16a34a; }
    #kab-save-btn.pulse { animation: kabPulse .8s ease-in-out infinite; }
    #kab-undo-btn { background: rgba(255,255,255,.07); color: rgba(255,255,255,.55); display:none; }
    #kab-undo-btn:hover { background: rgba(255,255,255,.14); color:#fff; }
    #kab-dash-btn { background: #C9A96E; color: #140C05; }
    #kab-dash-btn:hover { background: #d4b87a; }
    @keyframes kabPulse { 0%,100%{opacity:1}50%{opacity:.55} }

    /* Elementos editables */
    body.kab-editing [data-text-key] {
      cursor: text !important;
      transition: outline .15s, background .15s;
    }
    body.kab-editing [data-text-key]:hover {
      outline: 2px dashed rgba(201,169,110,.65) !important;
      outline-offset: 4px;
      border-radius: 3px;
      background: rgba(201,169,110,.04);
    }
    body.kab-editing [data-text-key]:focus {
      outline: 2px solid #C9A96E !important;
      outline-offset: 4px;
      border-radius: 3px;
      background: rgba(201,169,110,.06);
    }
    /* Label flotante con el key */
    body.kab-editing [data-text-key] {
      position: relative;
    }
    body.kab-editing [data-text-key]::after {
      content: attr(data-text-key);
      position: absolute; top: -18px; left: 0;
      font-size: 9px; font-weight: 700; letter-spacing: .06em;
      color: #C9A96E; background: #140C05;
      padding: 1px 5px; border-radius: 3px;
      font-family: monospace; pointer-events: none;
      white-space: nowrap; display: none; z-index: 1000;
    }
    body.kab-editing [data-text-key]:hover::after { display: block; }

    /* Banner inferior */
    #kab-banner {
      position: fixed; bottom: 0; left: 0; right: 0;
      background: rgba(201,169,110,.96); color: #140C05;
      text-align: center; padding: 7px 16px;
      font-size: .74rem; font-weight: 700; z-index: 99998;
      font-family: system-ui, sans-serif; display: none;
    }
    body.kab-editing #kab-banner { display: block; }

    /* Notificación flotante de guardado */
    .kab-toast {
      position: fixed; bottom: 48px; right: 20px;
      background: #22c55e; color: #fff;
      padding: 8px 18px; border-radius: 8px;
      font-size: .8rem; font-weight: 700;
      z-index: 99999; font-family: system-ui, sans-serif;
      animation: kabFadeIn .2s ease;
    }
    @keyframes kabFadeIn { from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none} }
  `;
  document.head.appendChild(css);

  /* ── Añadir margen al body para la barra ── */
  document.body.style.marginTop = '46px';

  /* ── Crear barra de admin ── */
  const bar = document.createElement('div');
  bar.id = 'kab';
  const pageName = document.title.split('—')[0].replace('Kaos Decoración', '').trim().replace(/[-–]/g, '').trim() || 'Web';
  bar.innerHTML = `
    <span class="kab-brand">⚡ KAOS ADMIN</span>
    <span class="kab-sep">|</span>
    <span class="kab-page">${pageName || 'Inicio'}</span>
    <span class="kab-sep">·</span>
    <span class="kab-user">${adminSession.name || adminSession.username}</span>
    <div class="kab-gap"></div>
    <span class="kab-unsaved" id="kab-unsaved-txt">● Cambios sin guardar</span>
    <button id="kab-save-btn">💾 Guardar</button>
    <button id="kab-undo-btn">↩ Deshacer</button>
    <button id="kab-edit-btn">✏️ Editar contenido</button>
    <button id="kab-dash-btn">⚙ Dashboard</button>
  `;
  document.body.insertBefore(bar, document.body.firstChild);

  /* ── Banner inferior ── */
  const banner = document.createElement('div');
  banner.id = 'kab-banner';
  banner.innerHTML = '✏️ <strong>Modo edición activo</strong> — haz clic en cualquier texto para editarlo · Los cambios se guardan automáticamente al terminar de escribir';
  document.body.appendChild(banner);

  /* ── Botones ── */
  document.getElementById('kab-edit-btn').addEventListener('click', toggleEditMode);
  document.getElementById('kab-save-btn').addEventListener('click', kabSave);
  document.getElementById('kab-undo-btn').addEventListener('click', kabUndo);
  document.getElementById('kab-dash-btn').addEventListener('click', () => { location.href = 'admin.html'; });

  /* ── Toggle modo edición ── */
  function toggleEditMode() {
    editMode = !editMode;
    const btn = document.getElementById('kab-edit-btn');

    if (editMode) {
      document.body.classList.add('kab-editing');
      btn.classList.add('on');
      btn.textContent = '✓ Editando';
      document.querySelectorAll('[data-text-key]').forEach(el => {
        el.contentEditable = 'true';
        el.addEventListener('input', onTextInput);
        el.addEventListener('blur', onTextBlur);
        el.addEventListener('keydown', onKeyDown);
      });
    } else {
      document.body.classList.remove('kab-editing');
      btn.classList.remove('on');
      btn.textContent = '✏️ Editar contenido';
      document.querySelectorAll('[data-text-key]').forEach(el => {
        el.contentEditable = 'false';
        el.removeEventListener('input', onTextInput);
        el.removeEventListener('blur', onTextBlur);
        el.removeEventListener('keydown', onKeyDown);
      });
    }
  }

  /* ── Prevenir Enter en elementos de una sola línea ── */
  function onKeyDown(e) {
    if (e.key === 'Enter') {
      /* Permitir Enter solo en elementos tipo bloque (párrafos) */
      const tag = e.target.tagName.toLowerCase();
      if (!['p', 'div', 'li'].includes(tag)) {
        e.preventDefault();
        e.target.blur(); // finalizar edición
      }
    }
    if (e.key === 'Escape') { e.target.blur(); }
  }

  /* ── Input: marcar como pendiente y auto-guardar con debounce ── */
  function onTextInput(e) {
    const key = e.target.dataset.textKey;
    pendingChanges[key] = e.target.innerHTML.trim();
    markUnsaved();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(kabSave, 1500);
  }

  /* ── Blur: guardar inmediatamente ── */
  function onTextBlur(e) {
    const key = e.target.dataset.textKey;
    if (pendingChanges[key] !== undefined) {
      clearTimeout(saveTimer);
      kabSave();
    }
  }

  /* ── Marcar sin guardar ── */
  function markUnsaved() {
    document.getElementById('kab-unsaved-txt').style.display = '';
    const saveBtn = document.getElementById('kab-save-btn');
    const undoBtn = document.getElementById('kab-undo-btn');
    if (saveBtn) { saveBtn.style.display = ''; saveBtn.classList.add('pulse'); }
    if (undoBtn) undoBtn.style.display = '';
  }

  /* ── Guardar ── */
  function kabSave() {
    clearTimeout(saveTimer);
    if (!Object.keys(pendingChanges).length) return;

    const texts = JSON.parse(localStorage.getItem(TEXTS_KEY) || '{}');
    Object.entries(pendingChanges).forEach(([k, v]) => {
      if (v && v.trim()) texts[k] = v;
      else delete texts[k];
    });
    localStorage.setItem(TEXTS_KEY, JSON.stringify(texts));
    pendingChanges = {};

    /* UI: ocultar indicadores */
    document.getElementById('kab-unsaved-txt').style.display = 'none';
    const saveBtn = document.getElementById('kab-save-btn');
    const undoBtn = document.getElementById('kab-undo-btn');
    if (saveBtn) { saveBtn.classList.remove('pulse'); saveBtn.style.display = 'none'; }
    if (undoBtn) undoBtn.style.display = 'none';

    /* Toast */
    const toast = document.createElement('div');
    toast.className = 'kab-toast';
    toast.textContent = '✓ Guardado';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }

  /* ── Deshacer cambios sin guardar ── */
  function kabUndo() {
    if (!Object.keys(pendingChanges).length) return;
    if (!confirm('¿Deshacer los cambios no guardados? Se recargará la página.')) return;
    pendingChanges = {};
    location.reload();
  }

})();
