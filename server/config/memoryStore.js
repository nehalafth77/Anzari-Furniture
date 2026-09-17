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
      _id: `prod_${Date.now()}_${idx}`,
      name: p.name,
      category: p.category,
      price: p.price,
      description: p.description,
      image: p.image,
      stockStatus: p.stockStatus || 'In Stock',
      featured: Boolean(p.featured),
      views: p.views || 0,
      brand: p.brand || 'Artisan Woodcraft',
      material: p.material || 'Solid Wood & Belgian Fabric',
      dimensions: p.dimensions || 'Standard',
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
