import Product from '../models/Product.js';
import { isConnectedToMongo } from '../config/db.js';
import { memoryStore } from '../config/memoryStore.js';

// @desc    Get all products with filters & search
// @route   GET /api/products
export const getProducts = async (req, res, next) => {
  try {
    const { search, category, featured, stockStatus, room, collectionName } = req.query;

    if (isConnectedToMongo) {
      let query = {};

      if (search && search.trim()) {
        query.$or = [
          { name: { $regex: search.trim(), $options: 'i' } },
          { category: { $regex: search.trim(), $options: 'i' } },
          { description: { $regex: search.trim(), $options: 'i' } },
          { shortDescription: { $regex: search.trim(), $options: 'i' } },
          { tags: { $in: [new RegExp(search.trim(), 'i')] } },
        ];
      }

      if (category && category !== 'All') {
        query.category = { $regex: new RegExp(`^${category}$`, 'i') };
      }

      if (room && room !== 'All') {
        query.room = { $regex: new RegExp(`^${room}$`, 'i') };
      }

      if (collectionName && collectionName !== 'All') {
        query.collectionName = { $regex: new RegExp(`^${collectionName}$`, 'i') };
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
            (p.description && p.description.toLowerCase().includes(s)) ||
            (p.shortDescription && p.shortDescription.toLowerCase().includes(s)) ||
            (p.tags && p.tags.some(t => t.toLowerCase().includes(s)))
        );
      }

      if (category && category !== 'All') {
        result = result.filter((p) => p.category.toLowerCase() === category.toLowerCase());
      }

      if (room && room !== 'All') {
        result = result.filter((p) => p.room && p.room.toLowerCase() === room.toLowerCase());
      }

      if (collectionName && collectionName !== 'All') {
        result = result.filter((p) => p.collectionName && p.collectionName.toLowerCase() === collectionName.toLowerCase());
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
      const product = await Product.findOne({ $or: [{ _id: id }, { id: id }] });
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      return res.status(200).json({ success: true, data: product });
    } else {
      const product = memoryStore.products.find((p) => String(p._id) === String(id) || String(p.id) === String(id));
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
      id,
      name,
      slug,
      category,
      room,
      collectionName,
      price,
      compareAtPrice,
      description,
      shortDescription,
      material,
      dimensions,
      colors,
      rating,
      reviewCount,
      stock,
      featured,
      bestseller,
      badge,
      tags,
      features,
      careInstructions,
      images,
      secondaryImage,
      // Legacy fields
      stockStatus,
      brand,
      color,
    } = req.body;

    if (!name || !category || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Product name, category, and price are required.',
      });
    }

    // Generate ID if not provided
    const productId = id || `prod_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

    // Generate slug from name if not provided
    const productSlug = slug || name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Determine image source: uploaded file or URL string
    let image = req.body.image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }
    if (!image) {
      image = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';
    }

    const productPayload = {
      id: productId,
      name: name.trim(),
      slug: productSlug,
      category: category.trim(),
      room: room || 'Living Room',
      collectionName: collectionName || '',
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : null,
      description: description ? description.trim() : '',
      shortDescription: shortDescription ? shortDescription.trim() : '',
      material: material ? material.trim() : 'Solid Wood & Premium Veneer',
      dimensions: dimensions || { unit: 'cm', width: 0, depth: 0, height: 0 },
      colors: Array.isArray(colors) ? colors : [],
      rating: rating || 0,
      reviewCount: reviewCount || 0,
      stock: stock !== undefined ? Number(stock) : 0,
      featured: featured === 'true' || featured === true,
      bestseller: bestseller === 'true' || bestseller === true,
      badge: badge || '',
      tags: Array.isArray(tags) ? tags : [],
      features: Array.isArray(features) ? features : [],
      careInstructions: careInstructions ? careInstructions.trim() : '',
      images: Array.isArray(images) ? images : (image ? [image] : []),
      secondaryImage: secondaryImage || null,
      // Legacy fields for backward compatibility
      image,
      stockStatus: stockStatus || 'In Stock',
      views: 0,
      brand: brand ? brand.trim() : 'Artisan Woodcraft',
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
        _id: productId,
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

    // Handle number conversions
    if (updateData.price !== undefined) {
      updateData.price = Number(updateData.price);
    }
    if (updateData.compareAtPrice !== undefined) {
      updateData.compareAtPrice = updateData.compareAtPrice ? Number(updateData.compareAtPrice) : null;
    }
    if (updateData.stock !== undefined) {
      updateData.stock = Number(updateData.stock);
    }
    if (updateData.rating !== undefined) {
      updateData.rating = Number(updateData.rating);
    }
    if (updateData.reviewCount !== undefined) {
      updateData.reviewCount = Number(updateData.reviewCount);
    }

    // Handle boolean conversions
    if (updateData.featured !== undefined) {
      updateData.featured = updateData.featured === 'true' || updateData.featured === true;
    }
    if (updateData.bestseller !== undefined) {
      updateData.bestseller = updateData.bestseller === 'true' || updateData.bestseller === true;
    }

    // Handle array conversions
    if (typeof updateData.colors === 'string') {
      try {
        updateData.colors = JSON.parse(updateData.colors);
      } catch (e) {
        updateData.colors = updateData.colors.split(',').map(c => c.trim()).filter(Boolean);
      }
    }
    if (typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map(t => t.trim()).filter(Boolean);
    }
    if (typeof updateData.features === 'string') {
      updateData.features = updateData.features.split('\n').map(f => f.trim()).filter(Boolean);
    }
    if (typeof updateData.images === 'string') {
      try {
        updateData.images = JSON.parse(updateData.images);
      } catch (e) {
        updateData.images = updateData.images.split(',').map(i => i.trim()).filter(Boolean);
      }
    }

    // Handle dimensions JSON
    if (typeof updateData.dimensions === 'string') {
      try {
        updateData.dimensions = JSON.parse(updateData.dimensions);
      } catch (e) {
        // Keep as string if parsing fails
      }
    }

    // Generate slug if name changed but slug not provided
    if (updateData.name && !updateData.slug) {
      updateData.slug = updateData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
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
      const idx = memoryStore.products.findIndex((p) => String(p._id) === String(id) || String(p.id) === String(id));
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
      const deleted = await Product.findOneAndDelete({ $or: [{ _id: id }, { id: id }] });
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      return res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: { id },
      });
    } else {
      const idx = memoryStore.products.findIndex((p) => String(p._id) === String(id) || String(p.id) === String(id));
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
      const product = await Product.findOneAndUpdate(
        { $or: [{ _id: id }, { id: id }] },
        { $inc: { views: 1 } },
        { new: true }
      );
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      return res.status(200).json({
        success: true,
        data: { id: product._id || product.id, views: product.views },
      });
    } else {
      const product = memoryStore.products.find((p) => String(p._id) === String(id) || String(p.id) === String(id));
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      product.views = (product.views || 0) + 1;
      return res.status(200).json({
        success: true,
        data: { id: product._id || product.id, views: product.views },
      });
    }
  } catch (error) {
    next(error);
  }
};
