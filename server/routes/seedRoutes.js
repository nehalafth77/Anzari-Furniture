import express from 'express';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { isConnectedToMongo } from '../config/db.js';
import { memoryStore } from '../config/memoryStore.js';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '../data/sampleData.js';

const router = express.Router();

router.post('/reset', async (req, res, next) => {
  try {
    if (isConnectedToMongo) {
      await Category.deleteMany({});
      await Product.deleteMany({});

      const categories = await Category.insertMany(INITIAL_CATEGORIES);
      const products = await Product.insertMany(INITIAL_PRODUCTS);

      return res.status(200).json({
        success: true,
        message: 'Database seeded with sample furniture products and categories!',
        data: {
          categoriesCount: categories.length,
          productsCount: products.length,
        },
      });
    } else {
      memoryStore.reset();
      return res.status(200).json({
        success: true,
        message: 'Local store reset to default sample furniture products!',
        data: {
          categoriesCount: memoryStore.categories.length,
          productsCount: memoryStore.products.length,
        },
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
