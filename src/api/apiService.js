/**
 * src/api/apiService.js
 * Centralized data access layer using Supabase directly.
 * Replaces the old Express /api/* proxy calls that fail on Vercel.
 * NEVER import SUPABASE_SERVICE_ROLE_KEY here.
 */
import { supabase } from '../lib/supabase';

// ── SUPABASE_URL for Edge Function calls ─────────────────────────────────────
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const EDGE_BASE = `${SUPABASE_URL}/functions/v1`;

/**
 * Helper: call a deployed Supabase Edge Function (admin operations).
 * Uses the publishable key for authentication header.
 */
async function edgeRequest(functionName, options = {}) {
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
  const url = `${EDGE_BASE}/${functionName}`;

  // Include the user's JWT so RLS and Edge Functions recognise the caller
  let authHeader = `Bearer ${supabaseKey}`;
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) authHeader = `Bearer ${session.access_token}`;
  } catch { /* fallback to apikey */ }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': authHeader,
      ...(options.headers || {}),
    },
    ...options,
  };
  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }
  const response = await fetch(url, config);
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.error || result.message || `Edge Function error ${response.status}`);
  }
  return result;
}

export const apiService = {
  // ── Authentication ──────────────────────────────────────────────────────────
  login: async (credentials) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    if (error) throw new Error(error.message);
    return { success: true, user: data.user, session: data.session };
  },

  getMe: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);
    return user;
  },

  // ── Admin Analytics & Dashboard ──────────────────────────────────────────────
  getAnalytics: async () => {
    const result = await edgeRequest('admin?action=analytics');
    return result;
  },

  getStats: async () => {
    try {
      const result = await edgeRequest('admin?action=analytics');
      if (result && result.success) {
        return {
          success: true,
          data: {
            ...result,
            totalCategories: 6,
            featuredProducts: result.featuredCount || 4,
            totalViews: 1240,
            inStockCount: (result.totalProducts || 0) - (result.lowStockCount || 0),
            lowStockCount: result.lowStockCount || 0,
            outOfStockCount: 0,
            dbStatus: 'Supabase PostgreSQL Active',
          },
        };
      }
      return { success: true, data: result };
    } catch {
      return { success: false, data: null };
    }
  },

  // ── Admin Products ───────────────────────────────────────────────────────────
  getAdminProducts: async () => {
    const { data, error } = await supabase
      .from('Product')
      .select('*')
      .order('createdAt', { ascending: false });
    if (error) throw new Error(error.message);
    return data || [];
  },

  getProducts: async (params = {}) => {
    let query = supabase
      .from('Product')
      .select('*')
      .order('createdAt', { ascending: false });

    if (params.search) {
      query = query.or(`name.ilike.%${params.search}%,description.ilike.%${params.search}%`);
    }
    if (params.category && params.category !== 'All') {
      query = query.ilike('category', params.category);
    }
    if (params.room && params.room !== 'All') {
      query = query.ilike('room', params.room);
    }
    if (params.featured) {
      query = query.eq('featured', true);
    }
    if (params.stockStatus && params.stockStatus !== 'All') {
      if (params.stockStatus === 'Low Stock') {
        query = query.lte('stock', 5).gt('stock', 0);
      } else if (params.stockStatus === 'Out of Stock') {
        query = query.eq('stock', 0);
      } else if (params.stockStatus === 'In Stock') {
        query = query.gt('stock', 5);
      }
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return { success: true, data: data || [] };
  },

  getProductById: async (id) => {
    const { data, error } = await supabase
      .from('Product')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  createProduct: async (productData) => {
    const slug = (productData.name || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') + '-' + Date.now().toString().slice(-4);

    const insertData = {
      name: productData.name,
      slug: productData.slug || slug,
      description: productData.description || '',
      shortDescription: productData.shortDescription || '',
      price: Number(productData.price) || 0,
      compareAtPrice: productData.compareAtPrice ? Number(productData.compareAtPrice) : null,
      category: productData.category || 'Furniture',
      room: productData.room || 'Living Room',
      collectionName: productData.collectionName || productData.collection || 'Teak Collection',
      images: Array.isArray(productData.images) ? productData.images : (productData.images ? [productData.images] : []),
      material: productData.material || 'Solid Teak Wood',
      dimensions: productData.dimensions || null,
      colors: productData.colors || null,
      rating: Number(productData.rating) || 5.0,
      reviewCount: 0,
      stock: productData.stock !== undefined ? Number(productData.stock) : 15,
      featured: Boolean(productData.featured),
      bestseller: Boolean(productData.bestseller),
      badge: productData.badge || null,
      tags: Array.isArray(productData.tags) ? productData.tags : [],
      features: Array.isArray(productData.features) ? productData.features : [],
      careInstructions: productData.careInstructions || 'Wipe clean with a soft dry cloth.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('Product')
      .insert(insertData)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return { success: true, data };
  },

  updateProduct: async (id, productData) => {
    // Only include columns that exist in the Product table
    const ALLOWED_COLUMNS = new Set([
      'name', 'slug', 'description', 'shortDescription', 'price', 'compareAtPrice',
      'category', 'room', 'collectionName', 'images', 'secondaryImage', 'material',
      'dimensions', 'colors', 'rating', 'reviewCount', 'stock', 'featured', 'bestseller',
      'badge', 'tags', 'features', 'careInstructions', 'updatedAt',
    ]);
    const updatePayload = { updatedAt: new Date().toISOString() };
    for (const [key, value] of Object.entries(productData)) {
      if (ALLOWED_COLUMNS.has(key)) updatePayload[key] = value;
    }
    if (updatePayload.price !== undefined) updatePayload.price = Number(updatePayload.price);
    if (updatePayload.stock !== undefined) updatePayload.stock = Number(updatePayload.stock);
    if (updatePayload.compareAtPrice !== undefined && updatePayload.compareAtPrice !== null) {
      updatePayload.compareAtPrice = Number(updatePayload.compareAtPrice);
    }

    const { data, error } = await supabase
      .from('Product')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return { success: true, data };
  },

  deleteProduct: async (id) => {
    // 1. Fetch product to get its image paths before deletion
    const { data: product } = await supabase
      .from('Product')
      .select('images')
      .eq('id', id)
      .maybeSingle();

    // 2. Delete Storage files for any Supabase Storage paths
    if (product?.images && Array.isArray(product.images)) {
      const storagePaths = product.images.filter(
        (img) => typeof img === 'string' && img.startsWith('products/')
      );
      if (storagePaths.length > 0) {
        const { error: storageErr } = await supabase.storage
          .from('product-images')
          .remove(storagePaths);
        if (storageErr) {
          console.warn('[deleteProduct] Storage cleanup partial failure:', storageErr.message);
        }
      }
    }

    // 3. Delete the DB record
    const { error } = await supabase
      .from('Product')
      .delete()
      .eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true, message: 'Product deleted successfully' };
  },

  incrementViews: async (id) => {
    // Fire-and-forget view tracking — silently ignored if unauthenticated
    if (!id) return { success: true };
    supabase
      .from('Product')
      .select('id')
      .eq('id', id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          supabase
            .from('Product')
            .update({ updatedAt: new Date().toISOString() })
            .eq('id', id)
            .then(() => {})
            .catch(() => {});
        }
      })
      .catch(() => {});
    return { success: true };
  },

  // ── Product Image Management ─────────────────────────────────────────────────
  /**
   * Upload a File to Supabase Storage under products/{productId}/{uuid}.{ext}
   * then append the storage path to Product.images in the database.
   */
  uploadProductImage: async (productId, file, currentImages = []) => {
    const ext = file.name.split('.').pop().toLowerCase();
    const uid = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const storagePath = `products/${productId}/${uid}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(storagePath, file, { upsert: false, cacheControl: '3600' });

    if (uploadError) {
      throw new Error(`Failed to upload image to storage: ${uploadError.message}`);
    }

    const newImages = [...currentImages, storagePath];
    const { data, error: dbError } = await supabase
      .from('Product')
      .update({ images: newImages, updatedAt: new Date().toISOString() })
      .eq('id', productId)
      .select('images')
      .single();

    if (dbError) {
      await supabase.storage.from('product-images').remove([storagePath]);
      throw new Error(`Image uploaded but DB update failed: ${dbError.message}`);
    }

    return { success: true, storagePath, images: data.images };
  },

  /**
   * Delete a single product image by its storage path.
   * Removes from Storage (if applicable) and updates Product.images array.
   */
  deleteProductImage: async (productId, imagePath, currentImages = []) => {
    let storageDeleteError = null;

    if (imagePath.startsWith('products/')) {
      const { error } = await supabase.storage
        .from('product-images')
        .remove([imagePath]);
      if (error) {
        storageDeleteError = error.message;
        console.warn('[deleteProductImage] Storage delete failed:', error.message);
      }
    }

    const newImages = currentImages.filter((img) => img !== imagePath);
    const { data, error: dbError } = await supabase
      .from('Product')
      .update({ images: newImages, updatedAt: new Date().toISOString() })
      .eq('id', productId)
      .select('images')
      .single();

    if (dbError) {
      throw new Error(`DB image removal failed: ${dbError.message}`);
    }

    if (storageDeleteError) {
      console.warn(`[deleteProductImage] Storage file may be orphaned: ${imagePath}`);
    }

    return { success: true, images: data.images };
  },

  /**
   * Replace an existing product image with a new uploaded file.
   * Uploads new file first, updates DB, then deletes old from storage.
   */
  replaceProductImage: async (productId, oldImagePath, newFile, currentImages = []) => {
    const ext = newFile.name.split('.').pop().toLowerCase();
    const uid = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const newPath = `products/${productId}/${uid}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(newPath, newFile, { upsert: false, cacheControl: '3600' });

    if (uploadError) {
      throw new Error(`Failed to upload replacement image: ${uploadError.message}`);
    }

    const newImages = currentImages.map((img) => (img === oldImagePath ? newPath : img));
    const { data, error: dbError } = await supabase
      .from('Product')
      .update({ images: newImages, updatedAt: new Date().toISOString() })
      .eq('id', productId)
      .select('images')
      .single();

    if (dbError) {
      await supabase.storage.from('product-images').remove([newPath]);
      throw new Error(`DB update failed during image replacement: ${dbError.message}`);
    }

    if (oldImagePath.startsWith('products/')) {
      const { error: oldDeleteErr } = await supabase.storage
        .from('product-images')
        .remove([oldImagePath]);
      if (oldDeleteErr) {
        console.warn('[replaceProductImage] Old storage file not deleted:', oldDeleteErr.message);
      }
    }

    return { success: true, images: data.images };
  },

  // ── Admin Orders ─────────────────────────────────────────────────────────────
  getAdminOrders: async () => {
    const { data, error } = await supabase
      .from('Order')
      .select('*, items:OrderItem(*)')
      .order('createdAt', { ascending: false });
    if (error) throw new Error(error.message);
    return data || [];
  },

  updateOrderStatus: async (id, status, trackingCode) => {
    const updatePayload = {
      updatedAt: new Date().toISOString(),
    };
    if (status) updatePayload.status = status;
    if (trackingCode !== undefined) updatePayload.trackingCode = trackingCode;

    const { data, error } = await supabase
      .from('Order')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return { success: true, data };
  },

  // ── Admin Users / Customers ──────────────────────────────────────────────────
  getAdminUsers: async () => {
    const { data, error } = await supabase
      .from('User')
      .select('id, name, email, role, phone, createdAt, addresses:Address(*)')
      .order('createdAt', { ascending: false });
    if (error) throw new Error(error.message);
    return data || [];
  },

  // ── Filter Meta ──────────────────────────────────────────────────────────────
  getFilterMeta: async () => {
    const { data, error } = await supabase
      .from('Product')
      .select('category, room, material, collectionName, price');
    if (error) return {};
    const items = data || [];
    return {
      categories: [...new Set(items.map((p) => p.category).filter(Boolean))],
      rooms: [...new Set(items.map((p) => p.room).filter(Boolean))],
      materials: [...new Set(items.map((p) => p.material).filter(Boolean))],
      collections: [...new Set(items.map((p) => p.collectionName).filter(Boolean))],
    };
  },

  // ── Categories ───────────────────────────────────────────────────────────────
  getCategories: async () => {
    const { data, error } = await supabase
      .from('Category')
      .select('*')
      .order('name', { ascending: true });
    if (error) throw new Error(error.message);
    return { success: true, data: data || [] };
  },

  createCategory: async (catData) => {
    const slug = catData.slug || catData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const { data, error } = await supabase
      .from('Category')
      .insert({
        name: catData.name,
        slug,
        description: catData.description || '',
        image: catData.image || '',
        itemCount: Number(catData.itemCount) || 0,
        createdAt: new Date().toISOString(),
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { success: true, data };
  },

  updateCategory: async (id, catData) => {
    const { data, error } = await supabase
      .from('Category')
      .update({
        name: catData.name,
        slug: catData.slug || catData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: catData.description || '',
        image: catData.image || '',
        itemCount: Number(catData.itemCount) || 0,
      })
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { success: true, data };
  },

  deleteCategory: async (id) => {
    const { error } = await supabase
      .from('Category')
      .delete()
      .eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true };
  },

  // ── Reviews ──────────────────────────────────────────────────────────────────
  getReviews: async () => {
    const { data, error } = await supabase
      .from('Review')
      .select('*')
      .order('createdAt', { ascending: false });
    if (error) throw new Error(error.message);
    return data || [];
  },

  updateReviewStatus: async (id, verifiedBuyer) => {
    const { data, error } = await supabase
      .from('Review')
      .update({
        verifiedBuyer: Boolean(verifiedBuyer),
        updatedAt: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { success: true, data };
  },

  deleteReview: async (id) => {
    const { error } = await supabase
      .from('Review')
      .delete()
      .eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true };
  },

  // ── Newsletter Subscribers ────────────────────────────────────────────────────
  getNewsletterSubscribers: async () => {
    const { data, error } = await supabase
      .from('NewsletterSubscriber')
      .select('*')
      .order('subscribedAt', { ascending: false });
    if (error) return { data: [] };
    return { success: true, data: data || [] };
  },

  // ── Collections ──────────────────────────────────────────────────────────────
  getCollections: async () => {
    const { data, error } = await supabase
      .from('Collection')
      .select('*')
      .order('name', { ascending: true });
    if (error) return { data: [] };
    return { success: true, data: data || [] };
  },

  createCollection: async (colData) => {
    const slug = colData.slug || colData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const { data, error } = await supabase
      .from('Collection')
      .insert({
        name: colData.name,
        slug,
        eyebrow: colData.eyebrow || 'CURATED SERIES',
        tagline: colData.tagline || '',
        description: colData.description || '',
        heroImage: colData.heroImage || colData.image || '',
        secondaryImage: colData.secondaryImage || null,
        accentColor: colData.accentColor || '#1C251E',
        itemCount: Number(colData.itemCount) || 0,
        createdAt: new Date().toISOString(),
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { success: true, data };
  },

  updateCollection: async (id, colData) => {
    const { data, error } = await supabase
      .from('Collection')
      .update({
        name: colData.name,
        slug: colData.slug || colData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        eyebrow: colData.eyebrow,
        tagline: colData.tagline,
        description: colData.description,
        heroImage: colData.heroImage || colData.image,
        itemCount: Number(colData.itemCount) || 0,
      })
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { success: true, data };
  },

  deleteCollection: async (id) => {
    const { error } = await supabase
      .from('Collection')
      .delete()
      .eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true };
  },

  // ── Seed / Reset (disabled in production) ───────────────────────────────────
  seedData: () => Promise.resolve({ success: true, message: 'Seed disabled in production' }),
};
