/* ===================================================
   KAOS DECORACIÓN — Main JS
=================================================== */

/* ─── Tema personalizado (se aplica inmediatamente) ─── */
(function applyKaosTheme() {
  try {
    const t = JSON.parse(localStorage.getItem('kaos_theme') || '{}');
    if (!Object.keys(t).length) return;
    const r = document.documentElement;
    if (t.colorPrimary) r.style.setProperty('--c-primary', t.colorPrimary);
    if (t.colorGold)    { r.style.setProperty('--c-gold', t.colorGold); r.style.setProperty('--c-secondary', t.colorGold); }
    if (t.colorBg)      r.style.setProperty('--c-bg', t.colorBg);
    if (t.colorText)    r.style.setProperty('--c-text', t.colorText);
    if (t.colorCard)    r.style.setProperty('--c-white', t.colorCard);
    if (t.fontHeading) {
      const l = document.createElement('link'); l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=' + t.fontHeading.replace(/ /g,'+') + ':ital,wght@0,400;0,700;1,400&display=swap';
      document.head.appendChild(l);
      r.style.setProperty('--ff-heading', "'" + t.fontHeading + "', Georgia, serif");
    }
    if (t.fontBody) {
      const l = document.createElement('link'); l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=' + t.fontBody.replace(/ /g,'+') + ':wght@400;700&display=swap';
      document.head.appendChild(l);
      r.style.setProperty('--ff-body', "'" + t.fontBody + "', sans-serif");
    }
    /* Style overrides via injected <style> */
    const btnR   = { square:'2px', rounded:'8px', pill:'50px' }[t.btnShape]   || '8px';
    const cardR  = { square:'4px', rounded:'12px', large:'18px', xlarge:'28px' }[t.cardRadius] || '12px';
    const shadow = { none:'none', sm:'0 2px 8px rgba(0,0,0,.06)', md:'0 4px 20px rgba(0,0,0,.10)', lg:'0 8px 40px rgba(0,0,0,.16)' }[t.cardShadow] || '0 4px 20px rgba(0,0,0,.10)';
    const hoverCSS = { none:'', lift:'transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.15)', scale:'transform:scale(1.03)', glow:`box-shadow:0 0 0 3px ${t.colorGold||'#C9A96E'}55,0 8px 24px rgba(0,0,0,.12)` }[t.cardHover] || '';
    const fScale = { small:'.88rem', normal:'1rem', large:'1.1rem', xlarge:'1.25rem' }[t.fontScale] || '1rem';
    const hSpacing = { tight:'-.03em', normal:'0', wide:'.04em', wider:'.1em' }[t.headingSpacing] || '0';
    const css = [
      `.btn,.btn-add-cart,.btn--primary,.btn--gold{border-radius:${btnR}!important}`,
      `.product-card,.card{border-radius:${cardR}!important;box-shadow:${shadow}!important}`,
      hoverCSS ? `.product-card:hover{${hoverCSS}}` : '',
      `body,p{font-size:${fScale}}`,
      `h1,h2,h3,h4,h5,h6{text-transform:${t.headingTransform||'none'}!important;font-weight:${t.headingWeight||'700'}!important;letter-spacing:${hSpacing}!important}`,
      t.colorFooter ? `.footer{background:${t.colorFooter}!important}` : '',
      t.colorCard   ? `.product-card,.card{background:${t.colorCard}!important}` : '',
      t.customCSS   || '',
      t.headerCSS   ? `#header{${t.headerCSS}}` : ''
    ].filter(Boolean).join('\n');
    if (css.trim()) {
      const s = document.createElement('style'); s.id = 'kaos-theme-overrides'; s.textContent = css;
      document.head.appendChild(s);
    }
  } catch(e) {}
})();

/* ─── Toast Notifications ─── */
function showToast(msg, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: 'check-circle', error: 'exclamation-circle', info: 'info-circle' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas fa-${icons[type] || 'info-circle'}"></i><span>${msg}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => { requestAnimationFrame(() => toast.classList.add('show')); });
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ─── Header scroll behavior ─── */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const toggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    /* ── Build luxury side-panel structure ── */
    // Overlay
    const overlay = document.createElement('div');
    overlay.id = 'mobile-nav-overlay';
    overlay.className = 'mobile-nav-overlay';
    document.body.insertBefore(overlay, mobileNav);

    // Header with logo + close button
    const navHeader = document.createElement('div');
    navHeader.className = 'mobile-nav-header';
    navHeader.innerHTML = `
      <img src="img/logo.png" alt="Kaos Decoración" class="mobile-nav-logo">
      <button class="mobile-nav-close" aria-label="Cerrar menú"><i class="fas fa-times"></i></button>
    `;
    mobileNav.prepend(navHeader);

    // Wrap existing links & add chevrons
    const existingLinks = [...mobileNav.querySelectorAll('a')];
    const linksWrapper = document.createElement('div');
    linksWrapper.className = 'mobile-nav-links';
    existingLinks.forEach(a => {
      a.insertAdjacentHTML('beforeend', '<i class="fas fa-chevron-right nav-arrow"></i>');
      linksWrapper.appendChild(a);
    });
    mobileNav.appendChild(linksWrapper);

    // Footer CTA
    const navFooter = document.createElement('div');
    navFooter.className = 'mobile-nav-footer';
    navFooter.innerHTML = `<a href="carrito.html" class="btn btn--gold" style="width:100%;justify-content:center"><i class="fas fa-shopping-bag"></i> Ver carrito</a>`;
    mobileNav.appendChild(navFooter);

    /* ── Open / Close helpers ── */
    function openNav() {
      toggle.classList.add('open');
      mobileNav.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeNav() {
      toggle.classList.remove('open');
      mobileNav.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => mobileNav.classList.contains('open') ? closeNav() : openNav());
    overlay.addEventListener('click', closeNav);
    mobileNav.querySelector('.mobile-nav-close')?.addEventListener('click', closeNav);
    mobileNav.querySelectorAll('.mobile-nav-links a').forEach(a => a.addEventListener('click', closeNav));

    // Close on Escape key
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
  }

  const searchToggle = document.getElementById('search-toggle');
  const searchBar = document.getElementById('search-bar');
  if (searchToggle && searchBar) {
    searchToggle.addEventListener('click', () => {
      searchBar.classList.toggle('open');
      if (searchBar.classList.contains('open')) searchBar.querySelector('input')?.focus();
    });
  }

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const q = searchInput.value.trim();
        if (q) window.location.href = `tienda.html?q=${encodeURIComponent(q)}`;
      }
    });
  }

  setActiveNav();
}

/* ─── Mark active nav link ─── */
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === page || (page === '' && href === 'index.html'));
  });
}

/* ─── Promo bar ─── */
function initPromoBar() {
  const bar = document.getElementById('promo-bar');
  if (!bar) return;
  if (sessionStorage.getItem('promo_closed')) { bar.remove(); return; }
  const close = bar.querySelector('.close-promo');
  if (close) close.addEventListener('click', () => { bar.remove(); sessionStorage.setItem('promo_closed', '1'); });
}

/* ─── Reveal animations ─── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  els.forEach(el => io.observe(el));
}

/* ─── FAQ Accordion ─── */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-question');
    if (q) q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
  document.querySelectorAll('.faq-nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.faq-nav-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const target = document.getElementById(this.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ─── Newsletter form ─── */
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type=email]');
      if (email && email.value) {
        showToast('¡Gracias! Te has suscrito correctamente.', 'success');
        email.value = '';
      }
    });
  });
}

/* ─── Contact Form ─── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    if (btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }
    setTimeout(() => {
      showToast('¡Mensaje enviado! Te responderemos en 24-48 horas.', 'success');
      form.reset();
      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje'; }
    }, 1200);
  });
}

/* ─── Product Gallery ─── */
function initProductGallery() {
  const thumbs = document.querySelectorAll('.gallery-thumb');
  const main = document.getElementById('gallery-main-img');
  if (!thumbs.length || !main) return;
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', function() {
      thumbs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      main.style.opacity = '0';
      setTimeout(() => {
        main.src = this.querySelector('img').src;
        main.style.opacity = '1';
      }, 200);
    });
  });
  main.style.transition = 'opacity .2s ease';
}

/* ─── Quantity Selector ─── */
function initQtySelector() {
  document.querySelectorAll('.qty-selector').forEach(sel => {
    const input = sel.querySelector('input');
    const plus = sel.querySelector('.qty-plus');
    const minus = sel.querySelector('.qty-minus');
    const max = parseInt(input?.getAttribute('max') || '99');
    if (plus) plus.addEventListener('click', () => {
      if (parseInt(input.value) < max) { input.value = parseInt(input.value) + 1; input.dispatchEvent(new Event('change')); }
    });
    if (minus) minus.addEventListener('click', () => {
      if (parseInt(input.value) > 1) { input.value = parseInt(input.value) - 1; input.dispatchEvent(new Event('change')); }
    });
  });
}

/* ─── Wishlist ─── */
const Wishlist = {
  _key: 'kaos_wishlist',
  get() { try { return JSON.parse(localStorage.getItem(this._key)) || []; } catch { return []; } },
  toggle(id) {
    const list = this.get();
    const idx = list.indexOf(id);
    if (idx > -1) list.splice(idx, 1);
    else list.push(id);
    localStorage.setItem(this._key, JSON.stringify(list));
    return idx === -1;
  },
  has(id) { return this.get().includes(id); }
};

function initWishlistBtn() {
  document.querySelectorAll('.btn-wishlist').forEach(btn => {
    const id = parseInt(btn.dataset.productId);
    if (!id) return;
    btn.classList.toggle('active', Wishlist.has(id));
    btn.addEventListener('click', function() {
      const added = Wishlist.toggle(id);
      this.classList.toggle('active', added);
      showToast(added ? 'Añadido a favoritos' : 'Eliminado de favoritos', added ? 'success' : 'info');
    });
  });
}

/* ─── Smooth page load ─── */
function initPageLoad() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    window.addEventListener('load', () => {
      setTimeout(() => overlay.classList.add('hide'), 400);
    });
  }
}

/* ─── Render Product Cards ─── */
function renderProductCard(product) {
  const discount = getDiscountPercent(product.price, product.oldPrice);
  const inWishlist = Wishlist.has(product.id);
  return `
    <div class="product-card reveal">
      <div class="product-card-image">
        <a href="producto.html?id=${product.id}">
          <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        </a>
        <div class="product-badges">
          ${product.isNew ? '<span class="badge badge--new">Nuevo</span>' : ''}
          ${product.isOnSale ? `<span class="badge badge--sale">-${discount}%</span>` : ''}
          ${product.isCustomizable ? '<span class="badge badge--custom">Personalizable</span>' : ''}
        </div>
        <div class="product-actions-hover">
          <button class="action-btn btn-wishlist ${inWishlist ? 'active' : ''}" data-product-id="${product.id}" title="Lista de deseos">
            <i class="fa${inWishlist ? 's' : 'r'} fa-heart"></i>
          </button>
          <a href="producto.html?id=${product.id}" class="action-btn" title="Vista rápida">
            <i class="fas fa-eye"></i>
          </a>
        </div>
      </div>
      <div class="product-card-body">
        <div class="product-category">${product.categoryLabel}</div>
        <h3><a href="producto.html?id=${product.id}">${product.name}</a></h3>
        <div class="product-rating">
          <div class="stars">${renderStars(product.rating)}</div>
          <span class="rating-count">(${product.reviewCount})</span>
        </div>
        <div class="product-price">
          <span class="price">${formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ''}
          ${discount ? `<span class="price-discount">-${discount}%</span>` : ''}
        </div>
        <button class="btn-add-cart" onclick="Cart.add(${product.id}); initWishlistBtn();">
          <i class="fas fa-shopping-bag"></i> Añadir al carrito
        </button>
      </div>
    </div>
  `;
}

/* ─── Init all ─── */
document.addEventListener('DOMContentLoaded', () => {
  initPageLoad();
  initHeader();
  initPromoBar();
  initReveal();
  initFAQ();
  initNewsletter();
  initContactForm();
  initProductGallery();
  initQtySelector();
  initAuthForms();
  initAccountPanels();
  updateHeaderAuth();
  Cart.updateBadge();
});
