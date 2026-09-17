import Product from '../models/Product.js';
import { isConnectedToMongo } from '../config/db.js';
import { memoryStore } from '../config/memoryStore.js';

// @desc    Get all products with filters & search
// @route   GET /api/products
export const getProducts = async (req, res, next) => {
  try {
    const { search, category, featured, stockStatus } = req.query;

    if (isConnectedToMongo) {
      let query = {};

      if (search && search.trim()) {
        query.$or = [
          { name: { $regex: search.trim(), $options: 'i' } },
          { category: { $regex: search.trim(), $options: 'i' } },
          { description: { $regex: search.trim(), $options: 'i' } },
        ];
      }

      if (category && category !== 'All') {
        query.category = { $regex: new RegExp(`^${category}$`, 'i') };
      }

      if (featured === 'true') {
        query.featured = true;
      }

      if (stockStatus && stockStatus !== 'All') {
        query.stockStatus = stockStatus;
      }

      const products = await Product.find(query).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: products.length, data: products });
    } else {
      // Memory store fallback
      let result = [...memoryStore.products];

      if (search && search.trim()) {
        const s = search.trim().toLowerCase();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(s) ||
            p.category.toLowerCase().includes(s) ||
            (p.description && p.description.toLowerCase().includes(s))
        );
      }

      if (category && category !== 'All') {
        result = result.filter((p) => p.category.toLowerCase() === category.toLowerCase());
      }

      if (featured === 'true') {
        result = result.filter((p) => p.featured === true);
      }

      if (stockStatus && stockStatus !== 'All') {
        result = result.filter((p) => p.stockStatus === stockStatus);
      }

      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.status(200).json({ success: true, count: result.length, data: result });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isConnectedToMongo) {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      return res.status(200).json({ success: true, data: product });
    } else {
      const product = memoryStore.products.find((p) => String(p._id) === String(id));
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      return res.status(200).json({ success: true, data: product });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create new product
// @route   POST /api/products
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      category,
      price,
      description,
      stockStatus,
      featured,
      brand,
      material,
      dimensions,
      color,
    } = req.body;

    if (!name || !category || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Product name, category, and price are required.',
      });
    }

    // Determine image source: uploaded file or URL string
    let image = req.body.image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }
    if (!image) {
      image = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';
    }

    const productPayload = {
      name: name.trim(),
      category: category.trim(),
      price: Number(price),
      description: description ? description.trim() : '',
      image,
      stockStatus: stockStatus || 'In Stock',
      featured: featured === 'true' || featured === true,
      views: 0,
      brand: brand ? brand.trim() : 'Artisan Woodcraft',
      material: material ? material.trim() : 'Solid Wood',
      dimensions: dimensions ? dimensions.trim() : '',
      color: color ? color.trim() : 'Natural',
    };

    if (isConnectedToMongo) {
      const newProduct = await Product.create(productPayload);
      return res.status(201).json({
        success: true,
        message: 'Product added successfully!',
        data: newProduct,
      });
    } else {
      const newProduct = {
        _id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        ...productPayload,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryStore.products.unshift(newProduct);
      return res.status(201).json({
        success: true,
        message: 'Product added successfully!',
        data: newProduct,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update existing product
// @route   PUT /api/products/:id
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    if (updateData.price !== undefined) {
      updateData.price = Number(updateData.price);
    }
    if (updateData.featured !== undefined) {
      updateData.featured = updateData.featured === 'true' || updateData.featured === true;
    }

    if (isConnectedToMongo) {
      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!updatedProduct) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      return res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: updatedProduct,
      });
    } else {
      const idx = memoryStore.products.findIndex((p) => String(p._id) === String(id));
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      memoryStore.products[idx] = {
        ...memoryStore.products[idx],
        ...updateData,
        updatedAt: new Date(),
      };
      return res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: memoryStore.products[idx],
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isConnectedToMongo) {
      const deleted = await Product.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      return res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: { id },
      });
    } else {
      const idx = memoryStore.products.findIndex((p) => String(p._id) === String(id));
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      memoryStore.products.splice(idx, 1);
      return res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: { id },
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Increment product view count
// @route   PUT /api/products/:id/view
export const incrementProductViews = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isConnectedToMongo) {
      const product = await Product.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
      );
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      return res.status(200).json({
        success: true,
        data: { id: product._id, views: product.views },
      });
    } else {
      const product = memoryStore.products.find((p) => String(p._id) === String(id));
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      product.views = (product.views || 0) + 1;
      return res.status(200).json({
        success: true,
        data: { id: product._id, views: product.views },
      });
    }
  } catch (error) {
    next(error);
  }
};
