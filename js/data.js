/* ===================================================
   KAOS DECORACIÓN — Catálogo de Productos
   Añade productos desde el panel de administración
=================================================== */

const PRODUCTS = [];

const CATEGORIES = [
  {
    id: "pantallas",
    label: "Pantallas",
    description: "Iluminación artesanal única para cada rincón",
    image: "",
    count: 0
  },
  {
    id: "bolsos",
    label: "Bolsos",
    description: "Accesorios únicos hechos con amor y precisión",
    image: "",
    count: 0
  },
  {
    id: "cojines",
    label: "Cojines",
    description: "Piezas artísticas para transformar tu hogar",
    image: "",
    count: 0
  },
  {
    id: "personalizados",
    label: "Personalizados",
    description: "Creaciones únicas con tu nombre y estilo",
    image: "",
    count: 0
  }
];

const DISCOUNT_CODES = {
  "KAOS10": { type: "percent", value: 10, label: "10% descuento" },
  "BIENVENIDO": { type: "percent", value: 15, label: "15% descuento bienvenida" },
  "ENVIOGRATIS": { type: "shipping", value: 0, label: "Envío gratuito" }
};

const SHIPPING_OPTIONS = [
  { id: "standard", label: "Envío estándar (3-5 días)", price: 5.95 },
  { id: "express", label: "Envío express (1-2 días)", price: 12.95 },
  { id: "free", label: "Recogida en taller (Madrid)", price: 0.00 }
];

function getCategoryImg(catId) {
  try {
    const custom = JSON.parse(localStorage.getItem('kaos_category_images') || '{}');
    const cat = CATEGORIES.find(c => c.id === catId);
    return custom[catId] || (cat ? cat.image : '');
  } catch {
    const cat = CATEGORIES.find(c => c.id === catId);
    return cat ? cat.image : '';
  }
}

function getAllProducts() {
  try {
    const deleted = JSON.parse(localStorage.getItem('kaos_deleted_ids') || '[]');
    const extras = JSON.parse(localStorage.getItem('kaos_extra_products') || '[]');
    const extraIds = extras.map(p => p.id);
    const base = PRODUCTS.filter(p => !deleted.includes(p.id) && !extraIds.includes(p.id));
    return [...base, ...extras];
  } catch { return [...PRODUCTS]; }
}

function getProductById(id) {
  return getAllProducts().find(p => p.id === parseInt(id));
}

function getProductBySlug(slug) {
  return getAllProducts().find(p => p.slug === slug);
}

function getProductsByCategory(cat) {
  const all = getAllProducts();
  if (!cat || cat === "all") return all;
  return all.filter(p => p.category === cat);
}

function getFeaturedProducts() {
  return getAllProducts().filter(p => p.isFeatured);
}

function getNewProducts() {
  return getAllProducts().filter(p => p.isNew);
}

function getSaleProducts() {
  return getAllProducts().filter(p => p.isOnSale);
}

function renderStars(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) html += '<i class="fas fa-star star-filled"></i>';
    else if (rating >= i - 0.5) html += '<i class="fas fa-star-half-alt star-half"></i>';
    else html += '<i class="far fa-star star-empty"></i>';
  }
  return html;
}

function formatPrice(price) {
  return price.toFixed(2).replace('.', ',') + ' €';
}

function getDiscountPercent(price, oldPrice) {
  if (!oldPrice) return 0;
  return Math.round((1 - price / oldPrice) * 100);
}
