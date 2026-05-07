/* ===================================================
   KAOS DECORACIÓN — Sistema de textos personalizables
=================================================== */
(function applyKaosTexts() {
  try {
    const texts = JSON.parse(localStorage.getItem('kaos_texts') || '{}');
    if (!Object.keys(texts).length) return;
    document.querySelectorAll('[data-text-key]').forEach(el => {
      const key = el.dataset.textKey;
      if (texts[key] !== undefined && texts[key] !== '') {
        el.innerHTML = texts[key];
      }
    });
  } catch(e) {}
})();
