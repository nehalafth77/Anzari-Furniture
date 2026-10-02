import express from 'express';

const router = express.Router();

// In-memory persistent fallback store seeded with ansari_furniture_web_backend initial items
let demoProducts = [
  {
    id: 'prod-001',
    _id: 'prod-001',
    name: 'Royal Teak Oval Dining Set',
    slug: 'royal-teak-oval-dining-set',
    description: 'Mastercrafted oval dining suite carved from seasoned Indian teakwood and crowned with a 12mm beveled crystal glass top.',
    shortDescription: 'Solid Teak Wood · 6 Seater · Beveled Glass Top',
    price: 68999,
    compareAtPrice: 84999,
    category: 'Tables',
    room: 'Dining Room',
    collectionName: 'Teak Collection',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    ],
    material: 'Solid Teak Wood & Beveled Tempered Glass',
    dimensions: { width: 210, height: 76, depth: 110, unit: 'cm' },
    colors: [{ name: 'Warm Honey Teak', hex: '#A66A3A' }],
    rating: 5.0,
    reviewCount: 46,
    stock: 8,
    featured: true,
    bestseller: true,
    badge: 'Showroom Hero',
    tags: ['Solid Teak', 'Dining Set', 'Glass Top'],
    features: ['12mm beveled glass top', '6 ergonomic carved chairs', 'Termite treated with neem oil'],
    careInstructions: 'Clean glass with a microfiber cloth. Polish wood twice a year with natural beeswax.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod-002',
    _id: 'prod-002',
    name: 'Contemporary X-Trestle Glass Dining Suite',
    slug: 'contemporary-x-trestle-glass-dining-suite',
    description: 'An architectural union of geometric craftsmanship and contemporary warmth with bold crisscross X-trestles.',
    shortDescription: 'Solid Teak Wood · Modern X-Base · 6 High-Back Chairs',
    price: 58999,
    compareAtPrice: 72000,
    category: 'Tables',
    room: 'Dining Room',
    collectionName: 'Modern Collection',
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80',
    ],
    material: 'Kiln-Dried Solid Teak & Clear Glass',
    dimensions: { width: 200, height: 76, depth: 100, unit: 'cm' },
    colors: [{ name: 'Golden Teak Finish', hex: '#C48A49' }],
    rating: 4.9,
    reviewCount: 38,
    stock: 12,
    featured: true,
    bestseller: true,
    badge: 'Bestseller',
    tags: ['Contemporary', 'X-Trestle', 'Dining'],
    features: ['Heavy-gauge interlocking X-trestle joinery', '10mm tempered crystal glass'],
    careInstructions: 'Wipe glass surface with glass cleaner. Dust wood with soft dry cloth.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod-003',
    _id: 'prod-003',
    name: 'Heritage Ring-Arm Solid Teak Bench',
    slug: 'heritage-ring-arm-solid-teak-bench',
    description: 'A traditional Indian heritage showpiece featuring distinctive hand-carved circular ring motifs along the curved armrests.',
    shortDescription: 'Traditional Solid Teak · Carved Circular Armrests',
    price: 34999,
    compareAtPrice: 42000,
    category: 'Chairs',
    room: 'Living Room',
    collectionName: 'Traditional Collection',
    images: [
      'https://images.unsplash.com/photo-1580481077195-c328ad4f3e69?w=800&q=80',
    ],
    material: '100% Solid Indian Teak Wood',
    dimensions: { width: 180, height: 95, depth: 65, unit: 'cm' },
    colors: [{ name: 'Gloss Honey Teak', hex: '#D68936' }],
    rating: 4.9,
    reviewCount: 29,
    stock: 4, // Low stock trigger
    featured: true,
    bestseller: true,
    badge: 'Handcrafted',
    tags: ['Traditional', 'Bench', 'Ring Motif'],
    features: ['Concentric carved ring motif from solid wood', 'Turned baluster legs'],
    careInstructions: 'Protect from direct harsh moisture. Wipe with dry flannel cloth.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod-004',
    _id: 'prod-004',
    name: 'Nawab Curved Slatted Sofa Ensemble',
    slug: 'nawab-curved-slatted-sofa-ensemble',
    description: 'Grand 5-seater showroom ensemble comprising a 3-seater curved slatted sofa, two matching armchairs, and an oval slatted coffee table.',
    shortDescription: 'Solid Teak Wood · 3+1+1 Suite & Oval Glass Table',
    price: 89999,
    compareAtPrice: 105000,
    category: 'Sofas',
    room: 'Living Room',
    collectionName: 'Teak Collection',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    ],
    material: 'Solid Teakwood & Rich Wine Chenille',
    dimensions: { width: 220, height: 85, depth: 90, unit: 'cm' },
    colors: [{ name: 'Royal Wine Maroon', hex: '#631B2A' }],
    rating: 5.0,
    reviewCount: 31,
    stock: 3, // Low stock trigger
    featured: true,
    bestseller: true,
    badge: 'Masterpiece',
    tags: ['Sofa Set', 'Slatted', 'Living Room'],
    features: ['Steam-bent curved teakwood frame', 'High-density 40D foam wrapped in chenille'],
    careInstructions: 'Vacuum cushions regularly. Polish teak frame with beeswax.',
    createdAt: new Date().toISOString(),
  },
];

let demoOrders = [
  {
    id: 'ord-001',
    _id: 'ord-001',
    orderNumber: 'ANS-2026-908231',
    customerDetails: {
      fullName: 'Aanya Sharma',
      email: 'aanya@example.com',
      phone: '+91 98123 45678',
    },
    shippingAddress: {
      street: '14 Lotus Enclave, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
    },
    deliveryMethod: 'Standard White Glove',
    paymentMethod: 'Card / UPI',
    paymentStatus: 'Completed',
    subtotal: 68999,
    discount: 0,
    shippingFee: 0,
    tax: 0,
    total: 68999,
    status: 'Delivered',
    trackingCode: 'ANS-IND-908231',
    items: [
      {
        id: 'item-001',
        productId: 'prod-001',
        name: 'Royal Teak Oval Dining Set',
        price: 68999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
        color: 'Warm Honey Teak',
      },
    ],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'ord-002',
    _id: 'ord-002',
    orderNumber: 'ANS-2026-908232',
    customerDetails: {
      fullName: 'Vikramaditya Roy',
      email: 'vikram.roy@designstudio.in',
      phone: '+91 98234 56789',
    },
    shippingAddress: {
      street: '42 Malabar Hill Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400006',
    },
    deliveryMethod: 'Standard White Glove',
    paymentMethod: 'Card / UPI',
    paymentStatus: 'Completed',
    subtotal: 89999,
    discount: 0,
    shippingFee: 0,
    tax: 0,
    total: 89999,
    status: 'Shipped',
    trackingCode: 'DELHIVERY-BOM-88219',
    items: [
      {
        id: 'item-002',
        productId: 'prod-004',
        name: 'Nawab Curved Slatted Sofa Ensemble',
        price: 89999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
        color: 'Royal Wine Maroon',
      },
    ],
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'ord-003',
    _id: 'ord-003',
    orderNumber: 'ANS-2026-908233',
    customerDetails: {
      fullName: 'Dr. Priya Nambiar',
      email: 'priya.nambiar@gmail.com',
      phone: '+91 94471 23456',
    },
    shippingAddress: {
      street: '7 Panampilly Nagar',
      city: 'Kochi',
      state: 'Kerala',
      pincode: '682036',
    },
    deliveryMethod: 'Standard White Glove',
    paymentMethod: 'Card / UPI',
    paymentStatus: 'Completed',
    subtotal: 34999,
    discount: 0,
    shippingFee: 0,
    tax: 0,
    total: 34999,
    status: 'Processing',
    trackingCode: 'ANS-KOC-00912',
    items: [
      {
        id: 'item-003',
        productId: 'prod-003',
        name: 'Heritage Ring-Arm Solid Teak Bench',
        price: 34999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1580481077195-c328ad4f3e69?w=800&q=80',
        color: 'Gloss Honey Teak',
      },
    ],
    createdAt: new Date().toISOString(),
  },
];

let demoUsers = [
  {
    id: 'user-001',
    _id: 'user-001',
    name: 'Ansari Administrator',
    email: 'admin@ansarifurniture.com',
    role: 'admin',
    phone: '+91 98765 43210',
    createdAt: new Date('2026-01-01').toISOString(),
    addresses: [
      {
        fullName: 'Ansari Showroom Headquarters',
        phone: '+91 98765 43210',
        street: '42 Heritage Timber Lane, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050',
        isDefault: true,
      },
    ],
  },
  {
    id: 'user-002',
    _id: 'user-002',
    name: 'Aanya Sharma',
    email: 'aanya@example.com',
    role: 'customer',
    phone: '+91 98123 45678',
    createdAt: new Date('2026-02-15').toISOString(),
    addresses: [
      {
        fullName: 'Aanya Sharma',
        phone: '+91 98123 45678',
        street: '14 Lotus Enclave, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
        isDefault: true,
      },
    ],
  },
  {
    id: 'user-003',
    _id: 'user-003',
    name: 'Vikramaditya Roy',
    email: 'vikram.roy@designstudio.in',
    role: 'customer',
    phone: '+91 98234 56789',
    createdAt: new Date('2026-03-01').toISOString(),
    addresses: [
      {
        fullName: 'Vikramaditya Roy',
        phone: '+91 98234 56789',
        street: '42 Malabar Hill Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400006',
        isDefault: true,
      },
    ],
  },
];

// GET /api/admin/analytics - Identical signature to ansari_furniture_web_backend
router.get('/analytics', (req, res) => {
  const totalSales = demoOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const lowStockProducts = demoProducts.filter((p) => p.stock <= 5);

  const statusCountsMap = {};
  for (const ord of demoOrders) {
    statusCountsMap[ord.status] = (statusCountsMap[ord.status] || 0) + 1;
  }
  const statusCounts = Object.entries(statusCountsMap).map(([_id, count]) => ({ _id, count }));

  res.json({
    totalSales,
    totalOrders: demoOrders.length,
    totalProducts: demoProducts.length,
    totalUsers: demoUsers.filter((u) => u.role === 'customer').length,
    lowStockCount: lowStockProducts.length,
    lowStockProducts: lowStockProducts.map((p) => ({ ...p, _id: p.id })),
    recentOrders: demoOrders.slice(0, 6).map((o) => ({ ...o, _id: o.id })),
    statusCounts,
  });
});

// GET /api/admin/products
router.get('/products', (req, res) => {
  res.json(demoProducts);
});

// POST /api/admin/products
router.post('/products', (req, res) => {
  const { name, price, description, category, room, collectionName, images, stock, material, compareAtPrice, dimensions, colors, features, tags, badge } = req.body;
  if (!name || !price || !category || !room) {
    return res.status(400).json({ message: 'Name, price, category, and room are required' });
  }

  const id = `prod-${Date.now().toString().slice(-4)}`;
  const newProduct = {
    id,
    _id: id,
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    price: Number(price),
    compareAtPrice: compareAtPrice ? Number(compareAtPrice) : null,
    category,
    room,
    collectionName: collectionName || 'Teak Collection',
    images: images && images.length ? images : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'],
    stock: stock !== undefined ? Number(stock) : 15,
    material: material || 'Solid Teak Wood',
    dimensions: dimensions || null,
    colors: colors || null,
    features: features || [],
    tags: tags || [],
    badge: badge || null,
    description: description || '',
    shortDescription: req.body.shortDescription || `${material || 'Solid Teak Wood'} · Handcrafted`,
    careInstructions: req.body.careInstructions || 'Wipe with a soft dry cloth.',
    rating: 5.0,
    reviewCount: 0,
    createdAt: new Date().toISOString(),
  };

  demoProducts.unshift(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/admin/products/:id
router.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const index = demoProducts.findIndex((p) => p.id === id || p._id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  demoProducts[index] = {
    ...demoProducts[index],
    ...req.body,
    price: req.body.price ? Number(req.body.price) : demoProducts[index].price,
    stock: req.body.stock !== undefined ? Number(req.body.stock) : demoProducts[index].stock,
    updatedAt: new Date().toISOString(),
  };

  res.json(demoProducts[index]);
});

// DELETE /api/admin/products/:id
router.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  demoProducts = demoProducts.filter((p) => p.id !== id && p._id !== id);
  res.json({ message: 'Product successfully removed' });
});

// GET /api/admin/orders
router.get('/orders', (req, res) => {
  res.json(demoOrders);
});

// PUT /api/admin/orders/:id/status
router.put('/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, trackingCode } = req.body;
  const order = demoOrders.find((o) => o.id === id || o._id === id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  if (status) order.status = status;
  if (trackingCode !== undefined) order.trackingCode = trackingCode;
  order.updatedAt = new Date().toISOString();

  res.json(order);
});

// GET /api/admin/users
router.get('/users', (req, res) => {
  res.json(demoUsers);
});

export default router;
