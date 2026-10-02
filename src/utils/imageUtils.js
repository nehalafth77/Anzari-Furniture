/**
 * src/utils/imageUtils.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source-of-truth for resolving product image URLs across the Admin
 * Dashboard.  Import getProductImageUrl() everywhere instead of duplicating
 * URL-building logic in components.
 *
 * Priority order for a given value:
 *  1. Full HTTP/HTTPS URL  → return as-is
 *  2. Supabase Storage path (starts with "products/")
 *     → construct public URL from env
 *  3. Relative path (starts with "/") → return as-is (served by Vite static)
 *  4. Anything else → return fallback
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const FALLBACK_IMAGE = '/images/showroom/hero_showroom.jpg';

/**
 * Resolve a single image value to a displayable URL.
 * @param {string|null|undefined} value
 * @returns {string}
 */
export function getProductImageUrl(value) {
  if (!value || typeof value !== 'string') return FALLBACK_IMAGE;

  const v = value.trim();
  if (!v) return FALLBACK_IMAGE;

  // Already a full URL (http / https / data)
  if (/^https?:\/\//i.test(v) || v.startsWith('data:')) {
    return v;
  }

  // Supabase Storage path: "products/{id}/filename.jpg"
  // Only construct Supabase URL if SUPABASE_URL is configured
  if (v.startsWith('products/') && SUPABASE_URL) {
    return `${SUPABASE_URL}/storage/v1/object/public/product-images/${v}`;
  }

  // If Supabase path but no SUPABASE_URL configured, use fallback
  if (v.startsWith('products/')) {
    console.warn(`Supabase image path detected but SUPABASE_URL not configured: ${v}`);
    return FALLBACK_IMAGE;
  }

  // Relative path (e.g. /images/showroom/slatted_sofa_set.jpg)
  if (v.startsWith('/')) {
    return v;
  }

  return FALLBACK_IMAGE;
}

/**
 * Get the primary (first) image URL from a product object.
 * @param {object} product
 * @returns {string}
 */
export function getProductPrimaryImage(product) {
  if (!product) return FALLBACK_IMAGE;
  const images = product.images;
  if (Array.isArray(images) && images.length > 0) {
    return getProductImageUrl(images[0]);
  }
  // Legacy fallback field
  if (product.image) return getProductImageUrl(product.image);
  return FALLBACK_IMAGE;
}

/**
 * Get all image URLs from a product.
 * @param {object} product
 * @returns {string[]}
 */
export function getProductAllImages(product) {
  if (!product) return [FALLBACK_IMAGE];
  const images = product.images;
  if (Array.isArray(images) && images.length > 0) {
    return images.map(getProductImageUrl);
  }
  if (product.image) return [getProductImageUrl(product.image)];
  return [FALLBACK_IMAGE];
}
