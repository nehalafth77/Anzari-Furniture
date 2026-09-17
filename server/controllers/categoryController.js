import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { isConnectedToMongo } from '../config/db.js';
import { memoryStore } from '../config/memoryStore.js';

// @desc    Get all categories with product count
// @route   GET /api/categories
export const getCategories = async (req, res, next) => {
  try {
    if (isConnectedToMongo) {
      const categories = await Category.find().sort({ name: 1 });

      // Calculate product counts per category
      const categoriesWithCount = await Promise.all(
        categories.map(async (cat) => {
          const count = await Product.countDocuments({
            category: { $regex: new RegExp(`^${cat.name}$`, 'i') },
          });
          return {
            _id: cat._id,
            name: cat.name,
            description: cat.description || '',
            createdAt: cat.createdAt,
            productCount: count,
          };
        })
      );

      return res.status(200).json({
        success: true,
        count: categoriesWithCount.length,
        data: categoriesWithCount,
      });
    } else {
      const categoriesWithCount = memoryStore.categories.map((cat) => {
        const count = memoryStore.products.filter(
          (p) => p.category.toLowerCase() === cat.name.toLowerCase()
        ).length;
        return {
          _id: cat._id,
          name: cat.name,
          description: cat.description || '',
          createdAt: cat.createdAt,
          productCount: count,
        };
      });

      return res.status(200).json({
        success: true,
        count: categoriesWithCount.length,
        data: categoriesWithCount,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create new category
// @route   POST /api/categories
export const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required.',
      });
    }

    const trimmedName = name.trim();

    if (isConnectedToMongo) {
      const existing = await Category.findOne({
        name: { $regex: new RegExp(`^${trimmedName}$`, 'i') },
      });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: `Category "${trimmedName}" already exists.`,
        });
      }

      const newCategory = await Category.create({
        name: trimmedName,
        description: description ? description.trim() : '',
      });

      return res.status(201).json({
        success: true,
        message: 'Category created successfully!',
        data: { ...newCategory.toObject(), productCount: 0 },
      });
    } else {
      const existing = memoryStore.categories.find(
        (c) => c.name.toLowerCase() === trimmedName.toLowerCase()
      );
      if (existing) {
        return res.status(400).json({
          success: false,
          message: `Category "${trimmedName}" already exists.`,
        });
      }

      const newCategory = {
        _id: `cat_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        name: trimmedName,
        description: description ? description.trim() : '',
        createdAt: new Date(),
        productCount: 0,
      };
      memoryStore.categories.push(newCategory);

      return res.status(201).json({
        success: true,
        message: 'Category created successfully!',
        data: newCategory,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update / Rename category
// @route   PUT /api/categories/:id
export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required.',
      });
    }

    const trimmedName = name.trim();

    if (isConnectedToMongo) {
      const oldCategory = await Category.findById(id);
      if (!oldCategory) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }

      // If name changed, check duplicate & update products
      if (oldCategory.name.toLowerCase() !== trimmedName.toLowerCase()) {
        const duplicate = await Category.findOne({
          name: { $regex: new RegExp(`^${trimmedName}$`, 'i') },
        });
        if (duplicate) {
          return res.status(400).json({
            success: false,
            message: `Category "${trimmedName}" already exists.`,
          });
        }

        // Update assigned products to the new category name
        await Product.updateMany(
          { category: oldCategory.name },
          { category: trimmedName }
        );
      }

      oldCategory.name = trimmedName;
      if (description !== undefined) oldCategory.description = description.trim();
      await oldCategory.save();

      const count = await Product.countDocuments({
        category: { $regex: new RegExp(`^${trimmedName}$`, 'i') },
      });

      return res.status(200).json({
        success: true,
        message: 'Category updated successfully!',
        data: { ...oldCategory.toObject(), productCount: count },
      });
    } else {
      const cat = memoryStore.categories.find((c) => String(c._id) === String(id));
      if (!cat) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }

      const oldName = cat.name;
      if (oldName.toLowerCase() !== trimmedName.toLowerCase()) {
        const duplicate = memoryStore.categories.find(
          (c) => c.name.toLowerCase() === trimmedName.toLowerCase()
        );
        if (duplicate) {
          return res.status(400).json({
            success: false,
            message: `Category "${trimmedName}" already exists.`,
          });
        }

        // Update products in memory
        memoryStore.products.forEach((p) => {
          if (p.category.toLowerCase() === oldName.toLowerCase()) {
            p.category = trimmedName;
          }
        });
      }

      cat.name = trimmedName;
      if (description !== undefined) cat.description = description.trim();

      const count = memoryStore.products.filter(
        (p) => p.category.toLowerCase() === trimmedName.toLowerCase()
      ).length;

      return res.status(200).json({
        success: true,
        message: 'Category updated successfully!',
        data: { ...cat, productCount: count },
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category (Safe delete check)
// @route   DELETE /api/categories/:id
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isConnectedToMongo) {
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }

      // Check if products still use this category
      const assignedCount = await Product.countDocuments({
        category: { $regex: new RegExp(`^${category.name}$`, 'i') },
      });

      if (assignedCount > 0) {
        return res.status(400).json({
          success: false,
          message: `Cannot delete "${category.name}" because it still has ${assignedCount} product${assignedCount > 1 ? 's' : ''} assigned to it. Please reassign or delete those products first.`,
        });
      }

      await Category.findByIdAndDelete(id);
      return res.status(200).json({
        success: true,
        message: `Category "${category.name}" was deleted successfully!`,
        data: { id },
      });
    } else {
      const idx = memoryStore.categories.findIndex((c) => String(c._id) === String(id));
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }

      const catName = memoryStore.categories[idx].name;
      const assignedCount = memoryStore.products.filter(
        (p) => p.category.toLowerCase() === catName.toLowerCase()
      ).length;

      if (assignedCount > 0) {
        return res.status(400).json({
          success: false,
          message: `Cannot delete "${catName}" because it still has ${assignedCount} product${assignedCount > 1 ? 's' : ''} assigned to it. Please reassign or delete those products first.`,
        });
      }

      memoryStore.categories.splice(idx, 1);
      return res.status(200).json({
        success: true,
        message: `Category "${catName}" was deleted successfully!`,
        data: { id },
      });
    }
  } catch (error) {
    next(error);
  }
};
