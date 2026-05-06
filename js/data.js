/* ===================================================
   KAOS DECORACIÓN — Catálogo de Productos
=================================================== */

const PRODUCTS = [
  // ── LÁMPARAS ──────────────────────────────────────
  {
    id: 1,
    name: "Lámpara Industrial Hierro Forjado",
    slug: "lampara-industrial-hierro-forjado",
    category: "lamparas",
    categoryLabel: "Lámparas",
    price: 89.00,
    oldPrice: 115.00,
    description: "Lámpara de mesa artesanal en hierro negro mate con base de madera maciza reciclada. Casquillo E27, incluye bombilla vintage Edison.",
    longDescription: "Creada a mano en nuestro taller de Madrid, esta lámpara combina el encanto del estilo industrial con la calidez de la madera natural reciclada. Cada pieza es única, con pequeñas variaciones propias del trabajo artesanal. La base de madera maciza procedente de demoliciones garantiza que ningún árbol fue talado para su fabricación. Perfecta para estudios, salones modernos o espacios de trabajo.",
    images: [
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a35a9c0de?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 8,
    rating: 4.8,
    reviewCount: 24,
    tags: ["industrial", "hierro", "madera", "vintage"],
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    isCustomizable: false,
    dimensions: "30 cm altura × 18 cm base",
    weight: "1.8 kg",
    material: "Hierro forjado + Madera reciclada",
    sku: "KAO-LAM-001"
  },
  {
    id: 2,
    name: "Lámpara Colgante Macramé Boho",
    slug: "lampara-colgante-macrame-boho",
    category: "lamparas",
    categoryLabel: "Lámparas",
    price: 75.00,
    oldPrice: null,
    description: "Lámpara de techo tejida a mano en algodón natural. Estilo bohemio con flecos y nudos artesanales. Cable de tela de 150 cm.",
    longDescription: "Tejida completamente a mano con cordón de algodón natural sin teñir, esta lámpara de techo aporta calidez y textura a cualquier rincón. El proceso de tejido lleva entre 6 y 8 horas de trabajo artesanal. Incluye cable de tela trenzada de 150 cm, portalámparas E27 y soporte de techo de madera. Compatible con bombillas de hasta 40W o LED equivalente.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578898887932-dce23a595ad4?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 12,
    rating: 4.9,
    reviewCount: 31,
    tags: ["boho", "macramé", "algodón", "colgante"],
    isNew: true,
    isFeatured: true,
    isOnSale: false,
    isCustomizable: false,
    dimensions: "45 cm diámetro × 60 cm altura",
    weight: "0.9 kg",
    material: "Cordón de algodón natural, cable textil",
    sku: "KAO-LAM-002"
  },
  {
    id: 3,
    name: "Lámpara de Resina Geométrica Ámbar",
    slug: "lampara-resina-geometrica-ambar",
    category: "lamparas",
    categoryLabel: "Lámparas",
    price: 145.00,
    oldPrice: null,
    description: "Exclusiva lámpara de sobremesa con pantalla en resina epoxi translúcida en tono ámbar. Base de madera roble. Efecto vitral único.",
    longDescription: "Cada lámpara de resina es una obra de arte única. La pantalla se fabrica vertiendo resina epoxi en moldes geométricos con inclusiones de hojas doradas y pigmentos naturales. Cuando se ilumina, proyecta patrones cálidos y orgánicos en las paredes. La base, torneada en madera de roble macizo, aporta equilibrio visual y estabilidad. Proceso de fabricación: 5 días por pieza.",
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a35a9c0de?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 4,
    rating: 5.0,
    reviewCount: 9,
    tags: ["resina", "geométrica", "ámbar", "exclusiva"],
    isNew: true,
    isFeatured: false,
    isOnSale: false,
    isCustomizable: true,
    dimensions: "42 cm altura × 25 cm diámetro",
    weight: "2.4 kg",
    material: "Resina epoxi, madera de roble",
    sku: "KAO-LAM-003"
  },
  {
    id: 4,
    name: "Lámpara de Pie Bambú Natural",
    slug: "lampara-pie-bambu-natural",
    category: "lamparas",
    categoryLabel: "Lámparas",
    price: 128.00,
    oldPrice: 165.00,
    description: "Lámpara de pie artesanal con estructura en bambú natural tratado y pantalla de papel de arroz japonés. Eco-friendly y sostenible.",
    longDescription: "El bambú utilizado para esta lámpara proviene de cultivos sostenibles y se trata con aceites naturales para garantizar su durabilidad. La pantalla de papel de arroz japonés washi difumina la luz creando un ambiente íntimo y sereno. Perfecta para zonas de meditación, dormitorios o salones con decoración zen o minimalista. Cable de 180 cm con interruptor de pie.",
    images: [
      "https://images.unsplash.com/photo-1565526978882-9d8c10e3c7ca?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a35a9c0de?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 6,
    rating: 4.6,
    reviewCount: 18,
    tags: ["bambú", "eco-friendly", "papel arroz", "zen"],
    isNew: false,
    isFeatured: false,
    isOnSale: true,
    isCustomizable: false,
    dimensions: "160 cm altura × 40 cm base",
    weight: "3.2 kg",
    material: "Bambú natural, papel de arroz washi",
    sku: "KAO-LAM-004"
  },
  {
    id: 5,
    name: "Aplique de Pared Metal Dorado Industrial",
    slug: "aplique-pared-metal-dorado",
    category: "lamparas",
    categoryLabel: "Lámparas",
    price: 67.00,
    oldPrice: null,
    description: "Aplique artesanal de pared en tubo de acero acabado dorado envejecido. Bombilla de filamento Edison incluida. Instalación sencilla.",
    longDescription: "Fabricado en nuestro taller con tubería de acero estándar y accesorios industriales, cada aplique se desoxida, imprime y laquer a mano en tono dorado envejecido. El resultado es un accesorio iluminación con carácter propio para dormitorios, pasillos o espacios de lectura. Incluye bombilla de filamento Edison 4W LED. Instalación mediante 2 tornillos (plantilla incluida).",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a35a9c0de?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 15,
    rating: 4.7,
    reviewCount: 42,
    tags: ["aplique", "dorado", "industrial", "pared"],
    isNew: false,
    isFeatured: true,
    isOnSale: false,
    isCustomizable: false,
    dimensions: "28 cm brazo × 12 cm altura",
    weight: "0.7 kg",
    material: "Acero laquado, acabado dorado envejecido",
    sku: "KAO-LAM-005"
  },
  {
    id: 6,
    name: "Lámpara Colgante Ramas de Madera",
    slug: "lampara-colgante-ramas-madera",
    category: "lamparas",
    categoryLabel: "Lámparas",
    price: 195.00,
    oldPrice: null,
    description: "Espectacular lámpara colgante escultura con ramas de madera natural entrelazadas a mano. Pieza única de alto impacto decorativo.",
    longDescription: "Esta lámpara es una verdadera escultura lumínica. Las ramas seleccionadas del bosque (caídas naturalmente) se limpian, lijan y tratan con aceite de nuez antes de ensamblarse a mano. Cada lámpara incorpora de 12 a 15 focos LED GU10 distribuidos entre las ramas. El resultado es una pieza que, incluso apagada, actúa como elemento decorativo de alto impacto. Tardamos 3 días en fabricar cada unidad.",
    images: [
      "https://images.unsplash.com/photo-1578898887932-dce23a595ad4?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565526978882-9d8c10e3c7ca?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 2,
    rating: 5.0,
    reviewCount: 7,
    tags: ["ramas", "escultura", "exclusiva", "colgante"],
    isNew: true,
    isFeatured: true,
    isOnSale: false,
    isCustomizable: true,
    dimensions: "80-120 cm diámetro (variable natural)",
    weight: "4.5 kg aprox.",
    material: "Ramas de madera natural, focos LED GU10",
    sku: "KAO-LAM-006"
  },

  // ── BOLSOS ─────────────────────────────────────────
  {
    id: 7,
    name: "Bolso Tote Cuero Genuino Madrid",
    slug: "bolso-tote-cuero-genuino-madrid",
    category: "bolsos",
    categoryLabel: "Bolsos",
    price: 195.00,
    oldPrice: 240.00,
    description: "Bolso tote grande en cuero genuino full-grain cosido a mano. Interior forrado en lino natural con 3 bolsillos. Asas de cuero trenzado.",
    longDescription: "Confeccionado en cuero full-grain de primera calidad procedente de tenerías españolas certificadas. Cada bolso se corta, pega y cose enteramente a mano en nuestro taller de Madrid. La capa de protección superficial es de cera de abeja natural. El interior de lino ecológico incluye un bolsillo con cremallera y dos bolsillos abiertos. Con el uso, el cuero adquiere una pátina única que hace cada bolso absolutamente personal.",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4466?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80"
    ],
    colors: ["#2C1A0E", "#C9A96E", "#1A1A1A"],
    colorNames: ["Marrón natural", "Camel", "Negro"],
    stock: 5,
    rating: 4.9,
    reviewCount: 38,
    tags: ["cuero", "artesanal", "tote", "full-grain"],
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    isCustomizable: true,
    dimensions: "40 × 35 × 12 cm",
    weight: "0.85 kg",
    material: "Cuero full-grain, forro de lino",
    sku: "KAO-BOL-001"
  },
  {
    id: 8,
    name: "Bolso Crochet Boho Verano",
    slug: "bolso-crochet-boho-verano",
    category: "bolsos",
    categoryLabel: "Bolsos",
    price: 85.00,
    oldPrice: null,
    description: "Bolso crochet tejido a mano con algodón natural. Forro interior de algodón. Cierre de madera. Perfecta para verano y festivales.",
    longDescription: "Cada punto de este bolso ha sido tejido a mano con hilo de algodón peinado natural de 100%. El patrón de calado hace que sea ligero y ventilado, perfecto para los días de verano. El forro interior de tela de algodón evita que los objetos pequeños se escapen. El cierre es un botón de madera de olivo tallado a mano. Cada bolso requiere aproximadamente 12 horas de tejido.",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4466?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80"
    ],
    colors: ["#F5F0E8", "#E8C9A0", "#C9A96E"],
    colorNames: ["Crudo", "Arena", "Camel"],
    stock: 10,
    rating: 4.8,
    reviewCount: 27,
    tags: ["crochet", "boho", "algodón", "verano"],
    isNew: true,
    isFeatured: true,
    isOnSale: false,
    isCustomizable: false,
    dimensions: "30 × 28 × 10 cm",
    weight: "0.3 kg",
    material: "Algodón natural 100%, forro algodón",
    sku: "KAO-BOL-002"
  },
  {
    id: 9,
    name: "Clutch Cuero Artesanal con Cierre",
    slug: "clutch-cuero-artesanal",
    category: "bolsos",
    categoryLabel: "Bolsos",
    price: 75.00,
    oldPrice: null,
    description: "Pequeño clutch elegante en cuero suave cosido a mano. Cierre de barra de madera. Interior con organizador. Ideal para eventos.",
    longDescription: "Este clutch minimalista está confeccionado en cuero napa suave en tono cognac. El cierre de barra de madera de bambú añade un toque artesanal y orgánico. El interior, forrado en tela de seda, incluye un bolsillo para el teléfono y varios compartimentos para tarjetas. Un accesorio versátil que combina igual de bien con un look casual que con un outfit de noche.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4466?w=600&auto=format&fit=crop&q=80"
    ],
    colors: ["#C9A96E", "#2C1A0E", "#8B4513"],
    colorNames: ["Cognac", "Chocolate", "Canela"],
    stock: 8,
    rating: 4.7,
    reviewCount: 19,
    tags: ["clutch", "cuero", "eventos", "elegante"],
    isNew: false,
    isFeatured: false,
    isOnSale: false,
    isCustomizable: true,
    dimensions: "25 × 15 × 3 cm",
    weight: "0.2 kg",
    material: "Cuero napa, forro de seda",
    sku: "KAO-BOL-003"
  },
  {
    id: 10,
    name: "Mochila Lona Estampada Artesanal",
    slug: "mochila-lona-estampada-artesanal",
    category: "bolsos",
    categoryLabel: "Bolsos",
    price: 115.00,
    oldPrice: 145.00,
    description: "Mochila en lona de algodón gruesa con estampado geométrico exclusivo pintado a mano. Cremalleras metálicas, tiras acolchadas. Unisex.",
    longDescription: "Esta mochila combina funcionalidad y arte. La lona de algodón gruesa (canvas de 12 oz) se estampa a mano con tintas textiles ecológicas usando bloques de madera tallados artesanalmente. Cada unidad tiene variaciones únicas en el estampado. Equipada con cremalleras YKK de latón, tiras de espalda acolchadas, asa superior de cuero y compartimento interior con portaordenador (hasta 15 pulgadas).",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4466?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 7,
    rating: 4.6,
    reviewCount: 22,
    tags: ["mochila", "lona", "estampado", "unisex"],
    isNew: false,
    isFeatured: false,
    isOnSale: true,
    isCustomizable: false,
    dimensions: "40 × 30 × 15 cm",
    weight: "0.65 kg",
    material: "Lona canvas 12oz, asa cuero, cremalleras YKK",
    sku: "KAO-BOL-004"
  },

  // ── DECORACIÓN ─────────────────────────────────────
  {
    id: 11,
    name: "Cuadro Abstracto Óleo sobre Lino",
    slug: "cuadro-abstracto-oleo-lino",
    category: "decoracion",
    categoryLabel: "Decoración",
    price: 185.00,
    oldPrice: null,
    description: "Pintura original sobre lino en técnica mixta (óleo y pigmentos naturales). Tonos tierra, beige y ocre. Marco de madera de pino.",
    longDescription: "Esta serie de cuadros abstractos está inspirada en la geología de la Meseta Ibérica. Pintados sobre lino de alta calidad con óleos artesanales mezclados con pigmentos naturales (tierra siena, ocre, carbón), cada obra refleja la paleta de colores de los paisajes castellanos. El lienzo va tensado sobre bastidor de madera de pino macizo y viene listo para colgar. Cada obra incluye certificado de autenticidad firmado.",
    images: [
      "https://images.unsplash.com/photo-1578926288207-a90a5366e14e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579783483458-83d02161294e?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 3,
    rating: 5.0,
    reviewCount: 12,
    tags: ["cuadro", "óleo", "abstracto", "original"],
    isNew: false,
    isFeatured: true,
    isOnSale: false,
    isCustomizable: true,
    dimensions: "60 × 80 cm (otras medidas disponibles)",
    weight: "2.1 kg",
    material: "Lino, óleo, pigmentos naturales, bastidor de pino",
    sku: "KAO-DEC-001"
  },
  {
    id: 12,
    name: "Maceta Cerámica Estilo Japandi",
    slug: "maceta-ceramica-japandi",
    category: "decoracion",
    categoryLabel: "Decoración",
    price: 48.00,
    oldPrice: null,
    description: "Maceta de cerámica torneada a mano con esmalte mate en tonos neutros. Agujero de drenaje. Estilo minimalista japonés.",
    longDescription: "Cada una de estas macetas se torna a mano en nuestro estudio cerámico de Madrid. El barro chamotado proporciona resistencia a los cambios de temperatura. El esmalte mate se aplica y cuece a 1260°C para obtener una superficie sedosa, ligeramente irregular — rasgo característico del trabajo artesanal. Disponible en blanco mate, gris ceniza y verde musgo. Incluye plato a juego.",
    images: [
      "https://images.unsplash.com/photo-1565526978882-9d8c10e3c7ca?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578926288207-a90a5366e14e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=600&auto=format&fit=crop&q=80"
    ],
    colors: ["#F5F0E8", "#B0B0B0", "#6B7C6B"],
    colorNames: ["Blanco mate", "Gris ceniza", "Verde musgo"],
    stock: 20,
    rating: 4.8,
    reviewCount: 55,
    tags: ["cerámica", "maceta", "japandi", "minimalista"],
    isNew: false,
    isFeatured: true,
    isOnSale: false,
    isCustomizable: false,
    dimensions: "18 cm altura × 16 cm diámetro",
    weight: "0.75 kg",
    material: "Barro chamotado, esmalte mate",
    sku: "KAO-DEC-002"
  },
  {
    id: 13,
    name: "Espejo Redondo Marco Ratán Boho",
    slug: "espejo-redondo-marco-ratan-boho",
    category: "decoracion",
    categoryLabel: "Decoración",
    price: 125.00,
    oldPrice: 155.00,
    description: "Espejo circular de 60 cm con marco decorativo tejido a mano en ratán natural. Ideal para entradas, dormitorios y salones bohemios.",
    longDescription: "El marco de este espejo se teje a mano con tiras de ratán natural procedente de cultivos sostenibles de Indonesia. El proceso de tejido crea un patrón geométrico que aporta profundidad visual. El espejo de cristal de 60 cm de diámetro es de alta calidad con bordes biselados. Viene listo para colgar con cuerda de cáñamo incluida. La combinación de espejo y ratán crea un punto focal cálido y artístico en cualquier pared.",
    images: [
      "https://images.unsplash.com/photo-1579783483458-83d02161294e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578926288207-a90a5366e14e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565526978882-9d8c10e3c7ca?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 9,
    rating: 4.9,
    reviewCount: 33,
    tags: ["espejo", "ratán", "boho", "pared"],
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    isCustomizable: false,
    dimensions: "80 cm diámetro total, espejo 60 cm",
    weight: "1.9 kg",
    material: "Ratán natural, cristal biselado",
    sku: "KAO-DEC-003"
  },
  {
    id: 14,
    name: "Portavelas Conjunto Metal Dorado",
    slug: "portavelas-conjunto-metal-dorado",
    category: "decoracion",
    categoryLabel: "Decoración",
    price: 38.00,
    oldPrice: null,
    description: "Set de 3 portavelas artesanales en metal dorado mate con patrones calados a mano. Diferentes alturas para efecto escalonado.",
    longDescription: "Este conjunto de tres portavelas está fabricado en chapa de acero que se corta, dobla y suelda a mano antes de aplicar el acabado dorado mate. Los patrones calados (geométricos, florales y orgánicos) se realizan con taladro y troqueles artesanales, creando juegos de luz y sombra cuando se colocan velas en su interior. Compatibles con velas de té o velas de columna pequeñas. Las diferentes alturas (12, 18 y 24 cm) permiten una composición dinámica.",
    images: [
      "https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578926288207-a90a5366e14e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565526978882-9d8c10e3c7ca?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 18,
    rating: 4.7,
    reviewCount: 41,
    tags: ["portavelas", "metal", "dorado", "set"],
    isNew: false,
    isFeatured: false,
    isOnSale: false,
    isCustomizable: false,
    dimensions: "Set: 12 cm, 18 cm, 24 cm altura",
    weight: "0.9 kg (set completo)",
    material: "Chapa de acero, acabado dorado mate",
    sku: "KAO-DEC-004"
  },
  {
    id: 15,
    name: "Figura Cerámica Busto Mujer Abstracto",
    slug: "figura-ceramica-busto-mujer",
    category: "decoracion",
    categoryLabel: "Decoración",
    price: 95.00,
    oldPrice: null,
    description: "Figura decorativa de cerámica artesanal que representa un busto femenino abstracto. Acabado biscuit mate en blanco roto. Arte y hogar.",
    longDescription: "Esculpida a mano a partir de un bloque de arcilla refractaria, cada figura tiene variaciones únicas propias del proceso de modelado manual. Tras el secado (48 horas), se cuece a 1080°C y se pule con papel de lija de grano fino para lograr un acabado terso y sedoso. El diseño abstracto del busto, con rasgos simplificados e idealizados, hace referencia al arte mediterráneo antiguo reinterpretado con mirada contemporánea.",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579783483458-83d02161294e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578926288207-a90a5366e14e?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 6,
    rating: 4.9,
    reviewCount: 16,
    tags: ["cerámica", "busto", "escultura", "figura"],
    isNew: true,
    isFeatured: false,
    isOnSale: false,
    isCustomizable: false,
    dimensions: "28 cm altura × 14 cm base",
    weight: "1.4 kg",
    material: "Arcilla refractaria, acabado biscuit",
    sku: "KAO-DEC-005"
  },

  // ── PERSONALIZADOS ─────────────────────────────────
  {
    id: 16,
    name: "Cartel Nombre en Madera Personalizado",
    slug: "cartel-nombre-madera-personalizado",
    category: "personalizados",
    categoryLabel: "Personalizados",
    price: 68.00,
    oldPrice: null,
    description: "Cartel artesanal con nombre o frase grabado en madera de haya maciza. Acabado natural o pintado. Perfecto como regalo o decoración.",
    longDescription: "Especifica el nombre o frase que deseas (hasta 20 caracteres) y lo grabaremos con láser de precisión en madera de haya maciza de 20mm de grosor. Disponible en acabado natural con aceite de nuez, pintado en blanco o pintado en negro. Las letras pueden ser en mayúscula, minúscula o cursiva. Incluye sistema de cuelgue oculto. El tiempo de producción es de 3-5 días laborables tras confirmación del pedido. Ideal para habitaciones infantiles, bodas, aniversarios.",
    images: [
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578898887932-dce23a595ad4?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565526978882-9d8c10e3c7ca?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 99,
    rating: 5.0,
    reviewCount: 87,
    tags: ["personalizado", "madera", "nombre", "regalo"],
    isNew: false,
    isFeatured: true,
    isOnSale: false,
    isCustomizable: true,
    dimensions: "Variable según texto (aprox. 30-60 cm ancho)",
    weight: "0.4-0.8 kg",
    material: "Haya maciza 20mm, aceite de nuez/pintura",
    sku: "KAO-PER-001"
  },
  {
    id: 17,
    name: "Bandeja de Resina Epoxi Personalizada",
    slug: "bandeja-resina-epoxi-personalizada",
    category: "personalizados",
    categoryLabel: "Personalizados",
    price: 95.00,
    oldPrice: null,
    description: "Bandeja artesanal de resina epoxi con flores secas, pigmentos y pan de oro. Cada pieza es única. Personalizable en colores y tamaño.",
    longDescription: "El proceso de fabricación de estas bandejas comienza seleccionando y secando flores naturales de nuestro jardín. Se disponen en un molde junto con pigmentos líquidos y laminillas de pan de oro antes de verter la resina epoxi. Tras 48 horas de curado, la bandeja se desmolda, se lija con diferentes granos y se pule hasta obtener un acabado cristalino. El borde se protege con cinta de madera de haya. Indícanos tus colores preferidos y haremos la combinación perfecta para ti.",
    images: [
      "https://images.unsplash.com/photo-1579783483458-83d02161294e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578926288207-a90a5366e14e?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 99,
    rating: 4.9,
    reviewCount: 44,
    tags: ["resina", "bandeja", "flores", "personalizada"],
    isNew: true,
    isFeatured: true,
    isOnSale: false,
    isCustomizable: true,
    dimensions: "30 × 20 cm (otros tamaños disponibles)",
    weight: "0.6 kg",
    material: "Resina epoxi, flores secas, pan de oro, madera",
    sku: "KAO-PER-002"
  },
  {
    id: 18,
    name: "Cojín Bordado a Mano Premium",
    slug: "cojin-bordado-mano-premium",
    category: "personalizados",
    categoryLabel: "Personalizados",
    price: 72.00,
    oldPrice: null,
    description: "Cojín de lino natural bordado a mano con diseños florales o geométricos. Relleno de algodón orgánico. Funda extraíble con cremallera oculta.",
    longDescription: "La funda de lino lavado 100% natural se borda completamente a mano con hilo de algodón peinado en varios colores neutros y dorados. Cada cojín requiere entre 8 y 15 horas de bordado según el diseño elegido. El relleno está fabricado con copos de algodón orgánico certificado, que proporciona una firmeza media-alta ideal para sofás. La cremallera oculta permite lavar la funda a máquina a 30°C. Disponemos de 12 diseños estándar y aceptamos diseños personalizados.",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565526978882-9d8c10e3c7ca?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578898887932-dce23a595ad4?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 15,
    rating: 4.8,
    reviewCount: 29,
    tags: ["cojín", "bordado", "lino", "personalizable"],
    isNew: false,
    isFeatured: false,
    isOnSale: false,
    isCustomizable: true,
    dimensions: "45 × 45 cm",
    weight: "0.5 kg",
    material: "Lino lavado, hilo algodón peinado, relleno algodón orgánico",
    sku: "KAO-PER-003"
  },
  {
    id: 19,
    name: "Joyero Madera y Vidrio Artesanal",
    slug: "joyero-madera-vidrio-artesanal",
    category: "personalizados",
    categoryLabel: "Personalizados",
    price: 55.00,
    oldPrice: 70.00,
    description: "Joyero con tapa de vidrio y cuerpo en madera de olivo. Interior forrado en terciopelo. Grabado personalizable. Un regalo único.",
    longDescription: "La madera de olivo utilizada para estos joyeros proviene de árboles centenarios de Castilla-La Mancha. Cada bloque se trabaja en el torno, se lija a mano con 5 granos diferentes y se encera con cera de carnauba. La tapa de vidrio biselado permite ver el contenido. El interior, forrado en terciopelo borgoña o verde botella, está dividido en compartimentos para anillos, pendientes y cadenas. En la base podemos grabar un nombre o fecha especial.",
    images: [
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578898887932-dce23a595ad4?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 11,
    rating: 4.9,
    reviewCount: 36,
    tags: ["joyero", "madera olivo", "regalo", "personalizable"],
    isNew: false,
    isFeatured: false,
    isOnSale: true,
    isCustomizable: true,
    dimensions: "20 × 15 × 8 cm",
    weight: "0.55 kg",
    material: "Madera de olivo, vidrio biselado, terciopelo",
    sku: "KAO-PER-004"
  },
  {
    id: 20,
    name: "Macramé Pared Arte Tejido Grande",
    slug: "macrame-pared-arte-tejido-grande",
    category: "decoracion",
    categoryLabel: "Decoración",
    price: 165.00,
    oldPrice: null,
    description: "Gran tapiz de macramé tejido a mano con cordón de algodón. Con ramas naturales de chopo. Dimensiones: 80 × 120 cm. Pieza única.",
    longDescription: "Este gran tejido de macramé es una pieza de arte textil que transforma cualquier pared. Tejido durante 20 horas con cordón de algodón natural de 5mm, incorpora técnicas tradicionales de nudos (nudo cuadrado, nudo espiral, nudo lark's head) combinadas con flecos libres. La rama de chopo natural que sirve de soporte está recogida en el Parque del Retiro de Madrid. Cada pieza incluye fotografía del proceso de fabricación y certificado de autenticidad.",
    images: [
      "https://images.unsplash.com/photo-1578898887932-dce23a595ad4?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565526978882-9d8c10e3c7ca?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 3,
    rating: 5.0,
    reviewCount: 21,
    tags: ["macramé", "pared", "tapiz", "gran formato"],
    isNew: true,
    isFeatured: true,
    isOnSale: false,
    isCustomizable: true,
    dimensions: "80 cm ancho × 120 cm largo (aprox.)",
    weight: "1.2 kg",
    material: "Cordón algodón 5mm, rama chopo natural",
    sku: "KAO-DEC-006"
  }
];

const CATEGORIES = [
  {
    id: "lamparas",
    label: "Lámparas",
    description: "Iluminación artesanal única para cada rincón",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&auto=format&fit=crop&q=80",
    count: PRODUCTS.filter(p => p.category === "lamparas").length
  },
  {
    id: "bolsos",
    label: "Bolsos",
    description: "Accesorios únicos hechos con amor y precisión",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80",
    count: PRODUCTS.filter(p => p.category === "bolsos").length
  },
  {
    id: "decoracion",
    label: "Decoración",
    description: "Piezas artísticas para transformar tu hogar",
    image: "https://images.unsplash.com/photo-1565526978882-9d8c10e3c7ca?w=600&auto=format&fit=crop&q=80",
    count: PRODUCTS.filter(p => p.category === "decoracion").length
  },
  {
    id: "personalizados",
    label: "Personalizados",
    description: "Creaciones únicas con tu nombre y estilo",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&auto=format&fit=crop&q=80",
    count: PRODUCTS.filter(p => p.category === "personalizados").length
  }
];

const DISCOUNT_CODES = {
  "KAOS10": { type: "percent", value: 10, label: "10% descuento" },
  "BIENVENIDO": { type: "percent", value: 15, label: "15% descuento bienvenida" },
  "ENVIOGRATIS": { type: "shipping", value: 0, label: "Envío gratuito" },
  "VERANO20": { type: "percent", value: 20, label: "20% descuento verano" }
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
