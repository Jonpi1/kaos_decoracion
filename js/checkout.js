/* ===================================================
   KAOS DECORACIÓN — Checkout & Pago
=================================================== */

/* ─── Render order summary in checkout ─── */
function renderCheckoutSummary() {
  const container = document.getElementById('checkout-items');
  const items = Cart.getWithProducts();

  if (container) {
    container.innerHTML = items.map(({ product, qty }) => `
      <div class="order-item">
        <div class="order-item-img">
          <img src="${product.images[0]}" alt="${product.name}">
          <span class="order-item-qty">${qty}</span>
        </div>
        <div class="order-item-info">
          <span>${product.name}</span>
          <small>${product.categoryLabel}</small>
        </div>
        <div class="order-item-price">${formatPrice(product.price * qty)}</div>
      </div>
    `).join('');
  }

  const selectedShipping = document.querySelector('input[name="shipping"]:checked')?.value || 'standard';
  const subtotal = Cart.subtotal();
  const discount = Cart.discountAmount(subtotal);
  const shipping = Cart.shippingCost(selectedShipping, subtotal);
  const total = Math.max(0, subtotal - discount + shipping);

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('co-subtotal', formatPrice(subtotal));
  set('co-discount', discount > 0 ? `−${formatPrice(discount)}` : '—');
  set('co-shipping', shipping === 0 ? 'Gratis' : formatPrice(shipping));
  set('co-total', formatPrice(total));

  const discRow = document.getElementById('co-discount-row');
  if (discRow) discRow.style.display = discount > 0 ? '' : 'none';
}

/* ─── Payment method toggle ─── */
function initPaymentMethods() {
  document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', function() {
      document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
      this.classList.add('selected');
      const radio = this.querySelector('input[type=radio]');
      if (radio) radio.checked = true;

      const stripeForm = document.getElementById('stripe-form');
      const paypalInfo = document.getElementById('paypal-info');
      const tfno = document.getElementById('bizum-info');
      if (stripeForm) stripeForm.style.display = radio?.value === 'card' ? '' : 'none';
      if (paypalInfo) paypalInfo.style.display = radio?.value === 'paypal' ? '' : 'none';
      if (tfno) tfno.style.display = radio?.value === 'bizum' ? '' : 'none';
    });
  });
}

/* ─── Stripe simulation ─── */
function initStripe() {
  const cardNumber = document.getElementById('card-number');
  const cardExpiry = document.getElementById('card-expiry');
  const cardCvc = document.getElementById('card-cvc');

  if (cardNumber) {
    cardNumber.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    });
  }
  if (cardExpiry) {
    cardExpiry.addEventListener('input', function() {
      let v = this.value.replace(/\D/g, '');
      if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
      this.value = v;
    });
  }
  if (cardCvc) {
    cardCvc.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '').slice(0, 4);
    });
  }
}

/* ─── Checkout form submit ─── */
function initCheckoutForm() {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const items = Cart.getWithProducts();
    if (!items.length) { showToast('Tu carrito está vacío', 'error'); return; }

    const method = document.querySelector('input[name="payment"]:checked')?.value || 'card';
    if (method === 'card') {
      const num = document.getElementById('card-number')?.value.replace(/\s/g, '');
      const exp = document.getElementById('card-expiry')?.value;
      const cvc = document.getElementById('card-cvc')?.value;
      if (!num || num.length < 16) { showToast('Número de tarjeta inválido', 'error'); return; }
      if (!exp || exp.length < 5) { showToast('Fecha de expiración inválida', 'error'); return; }
      if (!cvc || cvc.length < 3) { showToast('CVC inválido', 'error'); return; }
    }

    const btn = form.querySelector('button[type=submit]');
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando pago...'; }

    const shipping = document.querySelector('input[name="shipping"]:checked')?.value || 'standard';
    const subtotal = Cart.subtotal();
    const discAmt = Cart.discountAmount(subtotal);
    const shipCost = Cart.shippingCost(shipping, subtotal);

    const shippingData = {
      name: form.querySelector('[name=fullname]')?.value || '',
      email: form.querySelector('[name=email]')?.value || '',
      phone: form.querySelector('[name=phone]')?.value || '',
      address: form.querySelector('[name=address]')?.value || '',
      city: form.querySelector('[name=city]')?.value || '',
      postal: form.querySelector('[name=postal]')?.value || '',
      notes: form.querySelector('[name=notes]')?.value || ''
    };

    const totals = {
      subtotal,
      discount: discAmt,
      shipping: shipCost,
      total: Math.max(0, subtotal - discAmt + shipCost)
    };

    /* Simulate payment processing (1.5–2s) */
    setTimeout(() => {
      const order = Auth.createOrder(
        items.map(i => ({ productId: i.productId, qty: i.qty, price: i.product.price, name: i.product.name })),
        shippingData, method, totals
      );
      Cart.clear();

      /* Simulate email confirmation */
      console.log(`📧 Confirmación de pedido enviada a: ${shippingData.email}`);
      console.log(`📦 Pedido: ${order.id} | Total: ${formatPrice(totals.total)}`);

      /* Store last order for confirmation page */
      sessionStorage.setItem('kaos_last_order', JSON.stringify(order));
      window.location.href = `confirmacion.html?order=${order.id}`;
    }, 1800);
  });
}

/* ─── Prefill checkout if logged in ─── */
function prefillCheckout() {
  const user = Auth.current();
  if (!user) return;
  const setVal = (name, val) => {
    const el = document.querySelector(`[name=${name}]`);
    if (el && !el.value) el.value = val;
  };
  setVal('fullname', user.name);
  setVal('email', user.email);
}

/* ─── Confirmation page ─── */
function initConfirmationPage() {
  const container = document.getElementById('confirmation-content');
  if (!container) return;

  const order = JSON.parse(sessionStorage.getItem('kaos_last_order') || 'null');
  if (!order) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-receipt"></i>
        <h3>No se encontró información del pedido</h3>
        <p>Es posible que el pedido haya sido registrado correctamente. Revisa tu email de confirmación.</p>
        <a href="index.html" class="btn btn--primary">Volver al inicio</a>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div style="text-align:center; padding: 60px 0 40px">
      <div style="width:90px;height:90px;border-radius:50%;background:var(--c-success);color:#fff;font-size:2.5rem;display:flex;align-items:center;justify-content:center;margin:0 auto 28px">
        <i class="fas fa-check"></i>
      </div>
      <h1 style="font-size:2.2rem;margin-bottom:12px">¡Pedido confirmado!</h1>
      <p class="lead">Tu pedido <strong>${order.id}</strong> ha sido recibido y está siendo procesado.</p>
      <p style="color:var(--c-gray)">Hemos enviado un email de confirmación a <strong>${order.customerEmail}</strong></p>
    </div>

    <div style="background:var(--c-light-gray);border-radius:var(--radius-lg);padding:32px;margin-bottom:28px;max-width:680px;margin-left:auto;margin-right:auto">
      <h3 style="margin-bottom:20px">Resumen del pedido</h3>
      ${(order.items || []).map(i => `
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--c-border);font-size:.92rem">
          <span>${i.name} × ${i.qty}</span>
          <strong>${formatPrice(i.price * i.qty)}</strong>
        </div>
      `).join('')}
      <div style="display:flex;justify-content:space-between;padding:16px 0 0;font-size:1.1rem;font-family:var(--ff-heading)">
        <strong>Total</strong>
        <strong style="color:var(--c-gold)">${formatPrice(order.totals?.total || 0)}</strong>
      </div>
    </div>

    <div style="background:var(--c-white);border:1px solid var(--c-border);border-radius:var(--radius-lg);padding:28px;margin-bottom:40px;max-width:680px;margin-left:auto;margin-right:auto">
      <h3 style="margin-bottom:16px">Datos de entrega</h3>
      <p style="color:var(--c-gray);font-size:.9rem;line-height:2">
        <strong>${order.shipping?.name}</strong><br>
        ${order.shipping?.address}<br>
        ${order.shipping?.postal} ${order.shipping?.city}<br>
        Entrega estimada: <strong>${order.estimatedDelivery}</strong>
      </p>
    </div>

    <div style="text-align:center">
      <a href="cuenta.html" class="btn btn--outline" style="margin-right:12px">Ver mis pedidos</a>
      <a href="tienda.html" class="btn btn--primary">Seguir comprando</a>
    </div>
  `;
}

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('checkout-form')) {
    renderCheckoutSummary();
    initPaymentMethods();
    initStripe();
    initCheckoutForm();
    prefillCheckout();
    document.querySelectorAll('input[name="shipping"]').forEach(r => {
      r.addEventListener('change', renderCheckoutSummary);
    });
  }
  initConfirmationPage();
});
