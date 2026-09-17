import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { isConnectedToMongo } from '../config/db.js';
import { memoryStore } from '../config/memoryStore.js';

// @desc    Get dynamic dashboard statistics from database
// @route   GET /api/dashboard/stats
export const getDashboardStats = async (req, res, next) => {
  try {
    if (isConnectedToMongo) {
      const [
        totalProducts,
        totalCategories,
        featuredProducts,
        viewsAggregation,
        inStockCount,
        lowStockCount,
        outOfStockCount,
        recentProducts,
      ] = await Promise.all([
        Product.countDocuments(),
        Category.countDocuments(),
        Product.countDocuments({ featured: true }),
        Product.aggregate([
          { $group: { _id: null, totalViews: { $sum: '$views' } } },
        ]),
        Product.countDocuments({ stockStatus: 'In Stock' }),
        Product.countDocuments({ stockStatus: 'Low Stock' }),
        Product.countDocuments({ stockStatus: 'Out of Stock' }),
        Product.find().sort({ createdAt: -1 }).limit(4),
      ]);

      const totalViews = viewsAggregation.length > 0 ? viewsAggregation[0].totalViews : 0;

      return res.status(200).json({
        success: true,
        data: {
          totalProducts,
          totalCategories,
          featuredProducts,
          totalViews,
          inStockCount,
          lowStockCount,
          outOfStockCount,
          recentProducts,
          dbStatus: 'Connected (MongoDB)',
        },
      });
    } else {
      // Calculated dynamically from active memory store
      const totalProducts = memoryStore.products.length;
      const totalCategories = memoryStore.categories.length;
      const featuredProducts = memoryStore.products.filter((p) => p.featured === true).length;
      const totalViews = memoryStore.products.reduce((acc, p) => acc + (p.views || 0), 0);
      const inStockCount = memoryStore.products.filter((p) => p.stockStatus === 'In Stock').length;
      const lowStockCount = memoryStore.products.filter((p) => p.stockStatus === 'Low Stock').length;
      const outOfStockCount = memoryStore.products.filter((p) => p.stockStatus === 'Out of Stock').length;
      
      const recentProducts = [...memoryStore.products]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);

      return res.status(200).json({
        success: true,
        data: {
          totalProducts,
          totalCategories,
          featuredProducts,
          totalViews,
          inStockCount,
          lowStockCount,
          outOfStockCount,
          recentProducts,
          dbStatus: 'Active (Local Data Store)',
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
