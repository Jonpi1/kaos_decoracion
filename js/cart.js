/* ===================================================
   KAOS DECORACIÓN — Carrito de Compra
=================================================== */

const Cart = {
  _key: 'kaos_cart',
  _discountKey: 'kaos_discount',

  get() {
    try {
      return JSON.parse(localStorage.getItem(this._key)) || [];
    } catch { return []; }
  },

  save(items) {
    localStorage.setItem(this._key, JSON.stringify(items));
    this.updateBadge();
    document.dispatchEvent(new CustomEvent('cartUpdated', { detail: this.get() }));
  },

  add(productId, qty = 1, options = {}) {
    const product = getProductById(productId);
    if (!product) return;
    const items = this.get();
    const key = `${productId}_${JSON.stringify(options)}`;
    const existing = items.find(i => i.key === key);
    if (existing) {
      existing.qty = Math.min(existing.qty + qty, product.stock);
    } else {
      items.push({ key, productId, qty: Math.min(qty, product.stock), options });
    }
    this.save(items);
    showToast(`"${product.name}" añadido al carrito`, 'success');
  },

  remove(key) {
    const items = this.get().filter(i => i.key !== key);
    this.save(items);
    showToast('Producto eliminado del carrito', 'info');
  },

  updateQty(key, qty) {
    const items = this.get();
    const item = items.find(i => i.key === key);
    if (!item) return;
    const product = getProductById(item.productId);
    if (qty < 1) { this.remove(key); return; }
    item.qty = Math.min(qty, product ? product.stock : qty);
    this.save(items);
  },

  clear() {
    localStorage.removeItem(this._key);
    localStorage.removeItem(this._discountKey);
    this.updateBadge();
    document.dispatchEvent(new CustomEvent('cartUpdated', { detail: [] }));
  },

  count() {
    return this.get().reduce((sum, i) => sum + i.qty, 0);
  },

  getWithProducts() {
    return this.get().map(item => ({
      ...item,
      product: getProductById(item.productId)
    })).filter(i => i.product);
  },

  subtotal() {
    return this.getWithProducts().reduce((sum, i) => sum + i.product.price * i.qty, 0);
  },

  applyDiscount(code) {
    const upper = code.toUpperCase().trim();
    const discount = DISCOUNT_CODES[upper];
    if (!discount) return null;
    localStorage.setItem(this._discountKey, JSON.stringify({ code: upper, ...discount }));
    return discount;
  },

  getDiscount() {
    try {
      return JSON.parse(localStorage.getItem(this._discountKey));
    } catch { return null; }
  },

  removeDiscount() {
    localStorage.removeItem(this._discountKey);
  },

  discountAmount(subtotal) {
    const d = this.getDiscount();
    if (!d) return 0;
    if (d.type === 'percent') return subtotal * d.value / 100;
    return 0;
  },

  shippingCost(optionId = 'standard', subtotal = 0) {
    if (subtotal >= 80) return 0;
    const opt = SHIPPING_OPTIONS.find(o => o.id === optionId);
    return opt ? opt.price : 5.95;
  },

  total(shippingId = 'standard') {
    const sub = this.subtotal();
    const disc = this.discountAmount(sub);
    const ship = this.shippingCost(shippingId, sub);
    return Math.max(0, sub - disc + ship);
  },

  updateBadge() {
    const count = this.count();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.classList.toggle('show', count > 0);
    });
  }
};

/* ─── Render Cart Page ─── */
function renderCartPage() {
  const cartList = document.getElementById('cart-list');
  const cartEmpty = document.getElementById('cart-empty');
  const cartContent = document.getElementById('cart-content');
  if (!cartList) return;

  const items = Cart.getWithProducts();

  if (items.length === 0) {
    if (cartContent) cartContent.style.display = 'none';
    if (cartEmpty) cartEmpty.style.display = 'block';
    return;
  }

  if (cartContent) cartContent.style.display = '';
  if (cartEmpty) cartEmpty.style.display = 'none';

  cartList.innerHTML = items.map(({ key, product, qty }) => `
    <div class="cart-row" data-key="${key}">
      <div class="cart-product">
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        <div>
          <div class="cart-product-name">${product.name}</div>
          <div class="cart-product-meta">${product.categoryLabel}</div>
        </div>
      </div>
      <div class="cart-price">${formatPrice(product.price)}</div>
      <div class="cart-qty">
        <button class="cart-qty-btn" onclick="Cart.updateQty('${key}', ${qty - 1}); renderCartPage()">−</button>
        <span class="cart-qty-num">${qty}</span>
        <button class="cart-qty-btn" onclick="Cart.updateQty('${key}', ${qty + 1}); renderCartPage()">+</button>
      </div>
      <div class="cart-subtotal"><strong>${formatPrice(product.price * qty)}</strong></div>
      <button class="cart-remove" onclick="Cart.remove('${key}'); renderCartPage()" title="Eliminar">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `).join('');

  updateCartSummary();
}

function updateCartSummary() {
  const subtotal = Cart.subtotal();
  const discount = Cart.getDiscount();
  const discAmt = Cart.discountAmount(subtotal);
  const shipping = Cart.shippingCost('standard', subtotal);
  const total = Cart.total('standard');

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('cart-subtotal', formatPrice(subtotal));
  set('cart-discount', discAmt > 0 ? `−${formatPrice(discAmt)}` : '—');
  set('cart-shipping', shipping === 0 ? 'Gratis' : formatPrice(shipping));
  set('cart-total', formatPrice(total));
  set('cart-free-shipping-msg', subtotal >= 80 ? '¡Envío gratuito aplicado!' : `Añade ${formatPrice(80 - subtotal)} más para envío gratuito`);

  const discRow = document.getElementById('discount-row');
  if (discRow) discRow.style.display = discount ? '' : 'none';
  const discCode = document.getElementById('applied-code');
  if (discCode && discount) discCode.textContent = discount.code;
}

/* ─── Coupon ─── */
function applyCoupon() {
  const input = document.getElementById('coupon-input');
  if (!input) return;
  const result = Cart.applyDiscount(input.value);
  if (result) {
    showToast(`Cupón "${input.value.toUpperCase()}" aplicado: ${result.label}`, 'success');
    updateCartSummary();
    input.value = '';
  } else {
    showToast('Código de descuento no válido', 'error');
  }
}
