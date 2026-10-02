import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '../data/sampleData.js';

class MemoryStore {
  constructor() {
    this.categories = INITIAL_CATEGORIES.map((c, idx) => ({
      _id: `cat_${Date.now()}_${idx}`,
      name: c.name,
      description: c.description || '',
      createdAt: new Date(Date.now() - (7 - idx) * 86400000),
    }));

    this.products = INITIAL_PRODUCTS.map((p, idx) => ({
      id: `prod_${Date.now()}_${idx}`,
      _id: `prod_${Date.now()}_${idx}`,
      name: p.name,
      slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: p.category,
      room: 'Living Room',
      collectionName: 'Milano Collection',
      price: p.price,
      compareAtPrice: null,
      description: p.description,
      shortDescription: `${p.material} · ${p.category}`,
      images: [p.image],
      secondaryImage: null,
      material: p.material || 'Solid Wood & Belgian Fabric',
      dimensions: {
        unit: 'inches',
        width: 0,
        height: 0,
        depth: 0,
      },
      colors: [p.color || 'Natural'],
      rating: 4.5 + Math.random() * 0.5,
      reviewCount: Math.floor(Math.random() * 50) + 5,
      stock: 10 + Math.floor(Math.random() * 20),
      stockStatus: p.stockStatus || 'In Stock',
      featured: Boolean(p.featured),
      bestseller: false,
      badge: p.featured ? 'Bestseller' : '',
      tags: [p.category, p.material, p.brand || 'Artisan Woodcraft'],
      features: ['Handcrafted quality', 'Premium materials', 'Modern design'],
      careInstructions: 'Clean with a soft dry or damp cloth. Avoid abrasive cleaners.',
      views: p.views || 0,
      brand: p.brand || 'Artisan Woodcraft',
      color: p.color || 'Natural',
      createdAt: new Date(Date.now() - (8 - idx) * 86400000),
      updatedAt: new Date(),
    }));
  }

  reset() {
    this.constructor();
  }
}

export const memoryStore = new MemoryStore();
