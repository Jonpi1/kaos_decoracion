/* ===================================================
   KAOS DECORACIÓN — Autenticación y Usuarios
=================================================== */

/* ─── Admin / Propietarios ─── */
const Admin = {
  _sessionKey: 'kaos_admin_session',
  _extraKey:   'kaos_admin_extra', // contraseñas personalizadas guardadas

  /* Cuentas de propietario — dos accesos fijos */
  _ACCOUNTS: [
    {
      username:     'jon.pinedo',
      passwordHash: btoa('kaos_jonpi'),
      name:         'Jon Pinedo',
      avatar:       'JP',
      role:         'Propietario'
    },
    {
      username:     'violeta.sanz',
      passwordHash: btoa('kaos_viole'),
      name:         'Violeta Sanz',
      avatar:       'VS',
      role:         'Propietaria'
    },
    {
      username:     'alejandra.hidalgo',
      passwordHash: btoa('kaos_ale'),
      name:         'Alejandra Hidalgo',
      avatar:       'AH',
      role:         'Administradora'
    }
  ],

  /* Devuelve las cuentas fusionando las contraseñas personalizadas guardadas */
  _accounts() {
    const extra = JSON.parse(localStorage.getItem(this._extraKey) || '{}');
    return this._ACCOUNTS.map(a => ({
      ...a,
      passwordHash: extra[a.username] || a.passwordHash
    }));
  },

  login(username, password) {
    const account = this._accounts().find(
      a => a.username.toLowerCase() === username.trim().toLowerCase()
        && a.passwordHash === btoa(password)
    );
    if (!account) return { ok: false, error: 'Usuario o contraseña incorrectos.' };
    const { passwordHash, ...safe } = account;
    localStorage.setItem(this._sessionKey, JSON.stringify({
      ...safe, loginAt: new Date().toISOString()
    }));
    return { ok: true, account: safe };
  },

  logout() {
    localStorage.removeItem(this._sessionKey);
  },

  isLoggedIn() {
    return !!localStorage.getItem(this._sessionKey);
  },

  current() {
    try { return JSON.parse(localStorage.getItem(this._sessionKey)); }
    catch { return null; }
  },

  /* Cambiar solo la contraseña del usuario en sesión */
  changePassword(currentPassword, newPassword) {
    const session = this.current();
    if (!session) return { ok: false, error: 'No hay sesión activa.' };
    const account = this._accounts().find(a => a.username === session.username);
    if (!account || account.passwordHash !== btoa(currentPassword)) {
      return { ok: false, error: 'Contraseña actual incorrecta.' };
    }
    const extra = JSON.parse(localStorage.getItem(this._extraKey) || '{}');
    extra[session.username] = btoa(newPassword);
    localStorage.setItem(this._extraKey, JSON.stringify(extra));
    return { ok: true };
  },

  requireAuth() {
    if (!this.isLoggedIn()) {
      sessionStorage.setItem('admin_redirect', location.href);
      location.href = 'admin.html';
      return false;
    }
    return true;
  }
};

const Auth = {
  _usersKey: 'kaos_users',
  _sessionKey: 'kaos_session',
  _ordersKey: 'kaos_orders',

  getUsers() {
    try { return JSON.parse(localStorage.getItem(this._usersKey)) || []; }
    catch { return []; }
  },

  saveUsers(users) {
    localStorage.setItem(this._usersKey, JSON.stringify(users));
  },

  register(firstname, lastname, username, email, password) {
    const users = this.getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'Ya existe una cuenta con este gmail.' };
    }
    if (users.find(u => u.username && u.username.toLowerCase() === username.toLowerCase())) {
      return { ok: false, error: 'Ese username ya está en uso.' };
    }
    const name = `${firstname} ${lastname}`.trim();
    const user = {
      id: Date.now().toString(),
      name, firstname, lastname, username, email,
      passwordHash: btoa(password),
      createdAt: new Date().toISOString(),
      avatar: firstname.charAt(0).toUpperCase()
    };
    users.push(user);
    this.saveUsers(users);
    this._setSession(user);
    return { ok: true, user };
  },

  login(email, password) {
    const users = this.getUsers();
    const user = users.find(u =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.passwordHash === btoa(password)
    );
    if (!user) return { ok: false, error: 'Email o contraseña incorrectos.' };
    this._setSession(user);
    return { ok: true, user };
  },

  logout() {
    localStorage.removeItem(this._sessionKey);
    document.dispatchEvent(new CustomEvent('authChanged', { detail: null }));
    updateHeaderAuth();
  },

  _setSession(user) {
    const { passwordHash, ...safe } = user;
    localStorage.setItem(this._sessionKey, JSON.stringify({ ...safe, loginAt: new Date().toISOString() }));
    document.dispatchEvent(new CustomEvent('authChanged', { detail: safe }));
    updateHeaderAuth();
  },

  current() {
    try { return JSON.parse(localStorage.getItem(this._sessionKey)); }
    catch { return null; }
  },

  isLoggedIn() {
    return !!this.current();
  },

  updateProfile(updates) {
    const session = this.current();
    if (!session) return { ok: false, error: 'No autenticado.' };
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === session.id);
    if (idx === -1) return { ok: false, error: 'Usuario no encontrado.' };
    Object.assign(users[idx], updates);
    this.saveUsers(users);
    this._setSession(users[idx]);
    return { ok: true };
  },

  /* Orders */
  getOrders(userId = null) {
    try {
      const all = JSON.parse(localStorage.getItem(this._ordersKey)) || [];
      const uid = userId || this.current()?.id;
      return uid ? all.filter(o => o.userId === uid) : all;
    } catch { return []; }
  },

  saveOrder(order) {
    try {
      const all = JSON.parse(localStorage.getItem(this._ordersKey)) || [];
      all.unshift(order);
      localStorage.setItem(this._ordersKey, JSON.stringify(all));
    } catch {}
  },

  createOrder(cartItems, shippingData, paymentMethod, totals) {
    const user = this.current();
    const order = {
      id: 'KAO-' + Date.now().toString(36).toUpperCase(),
      userId: user ? user.id : 'guest',
      customerName: shippingData.name,
      customerEmail: shippingData.email,
      items: cartItems,
      shipping: shippingData,
      paymentMethod,
      totals,
      status: 'procesando',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 3600 * 1000).toLocaleDateString('es-ES')
    };
    this.saveOrder(order);
    return order;
  }
};

/* ─── Header Auth Update ─── */
function updateHeaderAuth() {
  const user = Auth.current();
  const loginBtn = document.getElementById('btn-login');
  const userBtn = document.getElementById('btn-user');
  const userMenuName = document.getElementById('user-name-display');

  if (loginBtn) loginBtn.style.display = user ? 'none' : '';
  if (userBtn) userBtn.style.display = user ? '' : 'none';
  if (userMenuName && user) userMenuName.textContent = user.name.split(' ')[0];
}

/* ─── Auth Forms ─── */
function initAuthForms() {
  const loginForm = document.getElementById('form-login');
  const registerForm = document.getElementById('form-register');

  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailOrUser = this.querySelector('[name=email]').value.trim();
      const password = this.querySelector('[name=password]').value;

      /* Intento admin: si no contiene @ puede ser un usuario propietario */
      if (!emailOrUser.includes('@')) {
        const adminResult = Admin.login(emailOrUser, password);
        if (adminResult.ok) {
          showToast(`¡Bienvenido/a al panel, ${adminResult.account.name}!`, 'success');
          setTimeout(() => { window.location.href = 'admin.html'; }, 800);
          return;
        }
      }

      /* Login normal de cliente */
      const result = Auth.login(emailOrUser, password);
      if (result.ok) {
        showToast(`¡Bienvenido/a de nuevo, ${result.user.name}!`, 'success');
        setTimeout(() => {
          const redirect = new URLSearchParams(window.location.search).get('redirect') || 'cuenta.html';
          window.location.href = redirect;
        }, 800);
      } else {
        showToast(result.error, 'error');
        const errEl = document.getElementById('login-error');
        if (errEl) errEl.textContent = result.error;
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const firstname = this.querySelector('[name=firstname]').value.trim();
      const lastname  = this.querySelector('[name=lastname]').value.trim();
      const username  = this.querySelector('[name=username]').value.trim();
      const email     = this.querySelector('[name=email]').value.trim();
      const password  = this.querySelector('[name=password]').value;
      const confirm   = this.querySelector('[name=confirm]').value;
      if (!firstname || !lastname) {
        showToast('Introduce tu nombre y apellido', 'error');
        return;
      }
      if (!username) {
        showToast('Elige un username', 'error');
        return;
      }
      if (password !== confirm) {
        showToast('Las contraseñas no coinciden', 'error');
        return;
      }
      if (password.length < 6) {
        showToast('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
      }
      const result = Auth.register(firstname, lastname, username, email, password);
      if (result.ok) {
        showToast(`¡Bienvenido/a a Kaos, ${result.user.name}!`, 'success');
        setTimeout(() => { window.location.href = 'cuenta.html'; }, 800);
      } else {
        showToast(result.error, 'error');
      }
    });
  }
}

/* ─── Account Panel Switching ─── */
function initAccountPanels() {
  const menuItems = document.querySelectorAll('.account-menu-item[data-panel]');
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      const panelId = this.dataset.panel;
      if (panelId === 'logout') { Auth.logout(); window.location.href = 'index.html'; return; }
      menuItems.forEach(m => m.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll('.account-panel').forEach(p => p.classList.remove('active'));
      const panel = document.getElementById('panel-' + panelId);
      if (panel) panel.classList.add('active');
    });
  });
}

/* ─── Render Orders ─── */
function renderOrders() {
  const tbody = document.getElementById('orders-tbody');
  if (!tbody) return;
  const orders = Auth.getOrders();
  if (!orders.length) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:40px;color:var(--c-gray)">
      No has realizado ningún pedido todavía.
      <br><a href="tienda.html" style="color:var(--c-gold);font-weight:700;margin-top:10px;display:inline-block">¡Empieza a explorar!</a>
    </td></tr>`;
    return;
  }
  tbody.innerHTML = orders.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>${new Date(o.createdAt).toLocaleDateString('es-ES')}</td>
      <td><span class="order-status ${o.status}">${o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span></td>
      <td>${o.items?.length || 0} artículo(s)</td>
      <td><strong>${formatPrice(o.totals?.total || 0)}</strong></td>
    </tr>
  `).join('');
}

/* ─── Demo account seeding ─── */
(function seedDemoData() {
  const users = Auth.getUsers();
  if (!users.length) {
    const demo = {
      id: 'demo001',
      name: 'María García',
      email: 'demo@kaosdecoración.es',
      passwordHash: btoa('kaos2024'),
      createdAt: new Date().toISOString(),
      avatar: 'M'
    };
    users.push(demo);
    localStorage.setItem(Auth._usersKey, JSON.stringify(users));

    const sampleOrders = [
      {
        id: 'KAO-DEMO01',
        userId: 'demo001',
        customerName: 'María García',
        customerEmail: 'demo@kaosdecoración.es',
        items: [{ productId: 1, qty: 1 }],
        totals: { subtotal: 89, total: 89 },
        status: 'entregado',
        createdAt: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString()
      },
      {
        id: 'KAO-DEMO02',
        userId: 'demo001',
        customerName: 'María García',
        customerEmail: 'demo@kaosdecoración.es',
        items: [{ productId: 7, qty: 1 }, { productId: 12, qty: 2 }],
        totals: { subtotal: 291, total: 291 },
        status: 'enviado',
        createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString()
      }
    ];
    localStorage.setItem(Auth._ordersKey, JSON.stringify(sampleOrders));
  }
})();
