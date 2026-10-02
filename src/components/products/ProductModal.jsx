import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Image as ImageIcon, Sparkles, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { apiService } from '../../api/apiService';
import { getProductImageUrl } from '../../utils/imageUtils';

export default function ProductModal({
  isOpen,
  onClose,
  onSave,
  product = null, // null for Add, object for Edit
  categories = [],
  isLoading = false,
}) {
  const isEdit = Boolean(product);

  const ROOM_OPTIONS = [
    'Living Room',
    'Bedroom',
    'Dining Room',
    'Home Office',
    'Outdoor',
    'Accessories',
  ];

  const CATEGORY_OPTIONS = [
    'Sofas',
    'Chairs',
    'Tables',
    'Beds',
    'Storage',
    'Lighting',
    'Home Office',
    'Office Furniture',
  ];

  const COLLECTION_OPTIONS = [
    'Teak Collection',
    'Modern Collection',
    'Traditional Collection',
    'Milano Collection',
    'Royal Heritage Collection',
    'Minimalist Studio',
  ];

  const BADGE_OPTIONS = [
    '',
    'Showroom Hero',
    'Masterpiece',
    'Bestseller',
    'New Arrival',
    'Handcrafted',
    'Editorial Pick',
  ];

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Sofas',
    room: 'Living Room',
    collectionName: 'Teak Collection',
    price: '',
    compareAtPrice: '',
    stock: 15,
    material: 'Solid Indian Teak Wood',
    badge: 'Bestseller',
    featured: true,
    bestseller: false,
    description: '',
    shortDescription: '',
    careInstructions: 'Wipe clean with a soft dry cloth. Avoid direct harsh sunlight and chemicals.',
    dimensionWidth: '200',
    dimensionHeight: '76',
    dimensionDepth: '100',
    dimensionUnit: 'cm',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    secondaryImageUrl: '',
    colorsText: 'Walnut Brown, Natural Wood',
    rating: '4.8',
    reviewCount: '0',
    featuresText: 'Handcrafted solid timber joinery\nNatural hand-rubbed oil finish\nErgonomic design with lumbar support',
    tagsText: 'Solid Teak, Handcrafted, Luxury, Living Room',
  });

  const [errors, setErrors] = useState({});
  const [activeTabSection, setActiveTabSection] = useState('essential'); // 'essential' | 'specs' | 'media'

  // Image management state — source of truth for Product.images[]
  const [productImages, setProductImages] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        slug: product.slug || '',
        category: product.category || 'Sofas',
        room: product.room || 'Living Room',
        collectionName: product.collectionName || 'Teak Collection',
        price: product.price || '',
        compareAtPrice: product.compareAtPrice || '',
        stock: product.stock !== undefined ? product.stock : 15,
        material: product.material || 'Solid Indian Teak Wood',
        badge: product.badge || '',
        featured: Boolean(product.featured),
        bestseller: Boolean(product.bestseller),
        description: product.description || '',
        shortDescription: product.shortDescription || '',
        careInstructions: product.careInstructions || 'Wipe clean with a soft dry cloth.',
        dimensionWidth: product.dimensions?.width?.toString() || '200',
        dimensionHeight: product.dimensions?.height?.toString() || '76',
        dimensionDepth: product.dimensions?.depth?.toString() || '100',
        dimensionUnit: product.dimensions?.unit || 'cm',
        imageUrl: (Array.isArray(product.images) && product.images[0]) || product.image || '',
        secondaryImageUrl: product.secondaryImage || '',
        colorsText: Array.isArray(product.colors) ? product.colors.join(', ') : '',
        rating: product.rating?.toString() || '4.8',
        reviewCount: product.reviewCount?.toString() || '0',
        featuresText: Array.isArray(product.features) ? product.features.join('\n') : '',
        tagsText: Array.isArray(product.tags) ? product.tags.join(', ') : '',
      });
      // Populate image manager from existing product images
      setProductImages(
        Array.isArray(product.images)
          ? product.images.map(getProductImageUrl).filter(Boolean)
          : product.image ? [getProductImageUrl(product.image)] : []
      );
    } else {
      setFormData({
        name: '',
        slug: '',
        category: 'Sofas',
        room: 'Living Room',
        collectionName: 'Teak Collection',
        price: '',
        compareAtPrice: '',
        stock: 15,
        material: 'Solid Indian Teak Wood',
        badge: 'Bestseller',
        featured: true,
        bestseller: false,
        description: '',
        shortDescription: '',
        careInstructions: 'Wipe clean with a soft dry cloth. Avoid direct sunlight and harsh chemicals.',
        dimensionWidth: '200',
        dimensionHeight: '76',
        dimensionDepth: '100',
        dimensionUnit: 'cm',
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
        secondaryImageUrl: '',
        colorsText: 'Walnut Brown, Natural Wood',
        rating: '4.8',
        reviewCount: '0',
        featuresText: 'Handcrafted solid timber joinery\nNatural hand-rubbed oil polish\nTested for heavy load bearing',
        tagsText: 'Solid Teak, Handcrafted, Luxury',
      });
      setProductImages([]); // Reset for new product
    }
    setErrors({});
  }, [product, isOpen]);

  if (!isOpen) return null;

  // Image manager handlers
  const handleRemoveImage = (idx) => {
    setProductImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddImageUrl = () => {
    const url = newImageUrl.trim();
    if (!url) return;
    if (!productImages.includes(url)) {
      setProductImages((prev) => [...prev, url]);
    }
    setNewImageUrl('');
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // For new (unsaved) products, just add a local object URL as a preview
    // The actual upload happens on save if product has an ID
    if (!isEdit || !(product?._id || product?.id)) {
      const localUrl = URL.createObjectURL(file);
      setProductImages((prev) => [...prev, localUrl]);
      // Store the File object to upload on create (simplified: treat as URL for now)
      setUploadStatus(`Selected: ${file.name}`);
      return;
    }

    // For existing products — upload immediately to Supabase Storage
    const productId = product._id || product.id;
    setIsUploadingImage(true);
    setUploadStatus(`Uploading ${file.name}…`);
    try {
      const result = await apiService.uploadProductImage(productId, file, product.images || []);
      setProductImages(result.images.map(getProductImageUrl));
      setUploadStatus(`✓ Uploaded: ${file.name}`);
      // Trigger refresh
      window.dispatchEvent(new Event('catalogUpdated'));
    } catch (err) {
      setUploadStatus('');
      alert(`Upload failed: ${err.message}`);
    } finally {
      setIsUploadingImage(false);
      e.target.value = '';
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter product name';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.room) newErrors.room = 'Please select a room';
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price in ₹ (greater than 0)';
    }
    if (productImages.length === 0) {
      newErrors.images = 'Please add at least one product image';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const features = formData.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const tags = formData.tagsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const colors = formData.colorsText
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const dimensions = {
      width: Number(formData.dimensionWidth) || 0,
      height: Number(formData.dimensionHeight) || 0,
      depth: Number(formData.dimensionDepth) || 0,
      unit: formData.dimensionUnit || 'cm',
    };

    // Use productImages array as the canonical images list
    // Filter out blob: URLs (local previews for new products — keep as-is for now)
    const images = productImages.filter(Boolean);

    // Generate slug from name if not provided
    const slug = formData.slug.trim() || formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Generate ID for new products
    const id = isEdit ? (product._id || product.id) : `prod_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

    const payload = {
      id,
      name: formData.name.trim(),
      slug,
      category: formData.category,
      room: formData.room,
      collectionName: formData.collectionName,
      price: Number(formData.price),
      compareAtPrice: formData.compareAtPrice ? Number(formData.compareAtPrice) : null,
      stock: Number(formData.stock) || 0,
      material: formData.material,
      badge: formData.badge || null,
      featured: formData.featured,
      bestseller: formData.bestseller,
      description: formData.description,
      shortDescription: formData.shortDescription || `${formData.material} · Handcrafted`,
      careInstructions: formData.careInstructions,
      dimensions,
      images,
      secondaryImage: formData.secondaryImageUrl || null,
      colors,
      rating: Number(formData.rating) || 0,
      reviewCount: Number(formData.reviewCount) || 0,
      features,
      tags,
    };

    onSave(payload, isEdit ? (product._id || product.id) : null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-3xl w-full my-6 shadow-2xl border border-[#EAE4D9] overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#EAE4D9] bg-[#F9F7F2]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-bold text-[#8C7355]">
                Ansari Furniture Web Catalog
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#18412F]/10 text-[#18412F] text-[10px] font-semibold">
                PostgreSQL Schema Aligned
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#191816] mt-0.5">
              {isEdit ? `Edit: ${product?.name}` : 'Add New Furniture Product'}
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 rounded-xl text-[#8C8275] hover:text-[#191816] hover:bg-white transition-colors flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab navigation inside modal */}
        <div className="flex border-b border-[#EAE4D9] bg-[#FDFBF7] px-6 text-sm font-medium">
          <button
            type="button"
            onClick={() => setActiveTabSection('essential')}
            className={`py-3 px-4 border-b-2 transition-all ${
              activeTabSection === 'essential'
                ? 'border-[#18412F] text-[#18412F] font-bold'
                : 'border-transparent text-[#8C8275] hover:text-[#191816]'
            }`}
          >
            1. Core Details & Pricing
          </button>
          <button
            type="button"
            onClick={() => setActiveTabSection('specs')}
            className={`py-3 px-4 border-b-2 transition-all ${
              activeTabSection === 'specs'
                ? 'border-[#18412F] text-[#18412F] font-bold'
                : 'border-transparent text-[#8C8275] hover:text-[#191816]'
            }`}
          >
            2. Specs, Dimensions & Room
          </button>
          <button
            type="button"
            onClick={() => setActiveTabSection('media')}
            className={`py-3 px-4 border-b-2 transition-all ${
              activeTabSection === 'media'
                ? 'border-[#18412F] text-[#18412F] font-bold'
                : 'border-transparent text-[#8C8275] hover:text-[#191816]'
            }`}
          >
            3. Photography & Descriptions
          </button>
        </div>

        {/* Modal Body / Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {activeTabSection === 'essential' && (
            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-bold text-[#191816] mb-1.5">
                  Product Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Royal Teak Oval Dining Set, Heritage Ring-Arm Bench"
                  className={`w-full px-4 py-3 bg-[#F9F7F2] border rounded-xl text-base text-[#191816] focus:bg-white focus:border-[#18412F] transition-all ${
                    errors.name ? 'border-red-500 bg-red-50/20' : 'border-[#EAE4D9]'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-bold text-[#191816] mb-1.5">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. royal-teak-oval-dining-set"
                  className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm text-[#191816] focus:bg-white focus:border-[#18412F]"
                />
                <span className="text-[11px] text-[#8C8275]">Auto-generated from name if left blank</span>
              </div>

              {/* Category & Collection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#191816] mb-1.5">
                    Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm font-medium text-[#191816] focus:bg-white focus:border-[#18412F]"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#191816] mb-1.5">
                    Curated Collection
                  </label>
                  <select
                    value={formData.collectionName}
                    onChange={(e) => setFormData({ ...formData, collectionName: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm font-medium text-[#191816] focus:bg-white focus:border-[#18412F]"
                  >
                    {COLLECTION_OPTIONS.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price, Compare Price, Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#191816] mb-1.5">
                    Selling Price (₹) <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#8C8275]">
                      ₹
                    </span>
                    <input
                      type="number"
                      min="1"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="68999"
                      className="w-full pl-8 pr-4 py-3 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-base text-[#191816] focus:bg-white focus:border-[#18412F]"
                    />
                  </div>
                  {errors.price && <p className="text-xs text-red-600 mt-1">{errors.price}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#191816] mb-1.5">
                    MRP / Compare Price (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#8C8275]">
                      ₹
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={formData.compareAtPrice}
                      onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
                      placeholder="84999"
                      className="w-full pl-8 pr-4 py-3 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-base text-[#191816] focus:bg-white focus:border-[#18412F]"
                    />
                  </div>
                  <span className="text-[11px] text-[#8C8275]">Shows crossed out MRP</span>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#191816] mb-1.5">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="15"
                    className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-base text-[#191816] focus:bg-white focus:border-[#18412F]"
                  />
                  <span className="text-[11px] text-[#8C8275]">Low stock trigger &le; 5</span>
                </div>
              </div>

              {/* Badges & Highlighting */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 bg-[#F9F7F2] p-4 rounded-xl border border-[#EAE4D9]">
                <div>
                  <label className="block text-xs font-bold text-[#191816] mb-1">
                    Storefront Badge
                  </label>
                  <select
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#EAE4D9] rounded-lg text-xs font-medium text-[#191816]"
                  >
                    {BADGE_OPTIONS.map((b) => (
                      <option key={b} value={b}>
                        {b || 'No Badge'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-5">
                  <input
                    type="checkbox"
                    id="featured-check"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 accent-[#18412F] rounded cursor-pointer"
                  />
                  <label htmlFor="featured-check" className="text-xs font-bold text-[#191816] cursor-pointer">
                    Featured Item
                  </label>
                </div>

                <div className="flex items-center gap-3 pt-5">
                  <input
                    type="checkbox"
                    id="bestseller-check"
                    checked={formData.bestseller}
                    onChange={(e) => setFormData({ ...formData, bestseller: e.target.checked })}
                    className="w-4 h-4 accent-[#18412F] rounded cursor-pointer"
                  />
                  <label htmlFor="bestseller-check" className="text-xs font-bold text-[#191816] cursor-pointer">
                    Bestseller Flag
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTabSection === 'specs' && (
            <div className="space-y-4">
              {/* Room & Material */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#191816] mb-1.5">
                    Room Assignment <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm font-medium text-[#191816] focus:bg-white focus:border-[#18412F]"
                  >
                    {ROOM_OPTIONS.map((room) => (
                      <option key={room} value={room}>
                        {room}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#191816] mb-1.5">
                    Material / Hardwood
                  </label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    placeholder="e.g. Solid Teak Wood & Beveled Tempered Glass"
                    className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm text-[#191816] focus:bg-white focus:border-[#18412F]"
                  />
                </div>
              </div>

              {/* Dimensions: width, height, depth, unit */}
              <div className="bg-[#F9F7F2] p-4 rounded-xl border border-[#EAE4D9]">
                <label className="block text-xs font-bold text-[#191816] mb-2 uppercase tracking-wider">
                  Product Dimensions (Prisma JSON)
                </label>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <span className="text-[11px] text-[#8C8275] block mb-1">Width</span>
                    <input
                      type="number"
                      value={formData.dimensionWidth}
                      onChange={(e) => setFormData({ ...formData, dimensionWidth: e.target.value })}
                      placeholder="210"
                      className="w-full p-2.5 bg-white border border-[#EAE4D9] rounded-lg text-sm text-[#191816]"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8C8275] block mb-1">Height</span>
                    <input
                      type="number"
                      value={formData.dimensionHeight}
                      onChange={(e) => setFormData({ ...formData, dimensionHeight: e.target.value })}
                      placeholder="76"
                      className="w-full p-2.5 bg-white border border-[#EAE4D9] rounded-lg text-sm text-[#191816]"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8C8275] block mb-1">Depth</span>
                    <input
                      type="number"
                      value={formData.dimensionDepth}
                      onChange={(e) => setFormData({ ...formData, dimensionDepth: e.target.value })}
                      placeholder="110"
                      className="w-full p-2.5 bg-white border border-[#EAE4D9] rounded-lg text-sm text-[#191816]"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8C8275] block mb-1">Unit</span>
                    <select
                      value={formData.dimensionUnit}
                      onChange={(e) => setFormData({ ...formData, dimensionUnit: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#EAE4D9] rounded-lg text-sm text-[#191816]"
                    >
                      <option value="cm">cm</option>
                      <option value="inches">inches</option>
                      <option value="mm">mm</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Craftsmanship Features (newline separated) */}
              <div>
                <label className="block text-sm font-bold text-[#191816] mb-1">
                  Craftsmanship Bullet Features (One per line)
                </label>
                <textarea
                  rows="3"
                  value={formData.featuresText}
                  onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                  placeholder="Hand-carved solid teak fluted pedestal&#10;12mm toughened beveled glass top&#10;Termite treated with natural neem oil"
                  className="w-full p-3.5 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm text-[#191816] focus:bg-white focus:border-[#18412F]"
                />
              </div>

              {/* Tags (comma separated) */}
              <div>
                <label className="block text-sm font-bold text-[#191816] mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tagsText}
                  onChange={(e) => setFormData({ ...formData, tagsText: e.target.value })}
                  placeholder="Solid Teak, Dining Set, Glass Top, 6 Seater"
                  className="w-full px-4 py-2.5 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm text-[#191816] focus:bg-white focus:border-[#18412F]"
                />
              </div>

              {/* Colors (comma separated) */}
              <div>
                <label className="block text-sm font-bold text-[#191816] mb-1">
                  Available Colors (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.colorsText}
                  onChange={(e) => setFormData({ ...formData, colorsText: e.target.value })}
                  placeholder="Walnut Brown, Natural Wood, Ebony Black"
                  className="w-full px-4 py-2.5 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm text-[#191816] focus:bg-white focus:border-[#18412F]"
                />
              </div>

              {/* Rating & Review Count */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#191816] mb-1">
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    placeholder="4.8"
                    className="w-full px-4 py-2.5 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm text-[#191816] focus:bg-white focus:border-[#18412F]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#191816] mb-1">
                    Review Count
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.reviewCount}
                    onChange={(e) => setFormData({ ...formData, reviewCount: e.target.value })}
                    placeholder="0"
                    className="w-full px-4 py-2.5 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm text-[#191816] focus:bg-white focus:border-[#18412F]"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTabSection === 'media' && (
            <div className="space-y-5">
              {/* Current Images List */}
              {productImages.length > 0 && (
                <div>
                  <span className="text-sm font-bold text-[#191816] block mb-2">
                    Product Images ({productImages.length})
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {productImages.map((imgSrc, idx) => (
                      <div key={idx} className="relative group rounded-xl overflow-hidden border border-[#EAE4D9] bg-[#F9F7F2] aspect-square">
                        <img
                          src={imgSrc}
                          alt={`Product image ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.onerror = null; e.target.src = '/images/showroom/hero_showroom.jpg'; }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                            title="Remove image"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {idx === 0 && (
                          <span className="absolute top-2 left-2 text-[10px] bg-[#18412F] text-white px-1.5 py-0.5 rounded font-semibold">
                            Primary
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload file OR enter URL */}
              <div className="bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl p-4 space-y-4">
                <span className="text-sm font-bold text-[#191816] block">Add Image</span>

                {/* File Upload */}
                <div>
                  <label className="block text-xs font-semibold text-[#8C7355] mb-1.5 uppercase tracking-wider">
                    Upload File {isEdit ? '(saved to Supabase Storage)' : ''}
                  </label>
                  <label className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-dashed border-[#C8BFB4] hover:border-[#18412F] rounded-xl cursor-pointer transition-colors group">
                    <Upload className="w-5 h-5 text-[#8C7355] group-hover:text-[#18412F]" />
                    <span className="text-sm text-[#8C8275] group-hover:text-[#191816]">
                      {uploadStatus || 'Choose JPG, PNG or WEBP…'}
                    </span>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      className="hidden"
                      onChange={handleFileSelect}
                      disabled={isUploadingImage}
                    />
                  </label>
                  {isUploadingImage && (
                    <p className="text-xs text-[#18412F] mt-1 font-medium animate-pulse">
                      ⏳ Uploading to Supabase Storage…
                    </p>
                  )}
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 text-xs text-[#C8BFB4]">
                  <div className="flex-1 h-px bg-[#EAE4D9]" />
                  <span>or enter URL</span>
                  <div className="flex-1 h-px bg-[#EAE4D9]" />
                </div>

                {/* URL Entry */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8275]" />
                    <input
                      type="url"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="https://… or /images/showroom/…"
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#EAE4D9] rounded-xl text-sm text-[#191816] focus:border-[#18412F] outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    disabled={!newImageUrl.trim()}
                    className="px-4 py-2.5 bg-[#18412F] text-white text-sm font-semibold rounded-xl hover:bg-[#123324] disabled:opacity-40 transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>

                {/* Quick showroom presets */}
                <div>
                  <span className="text-xs font-semibold text-[#8C8275] block mb-2">Quick Showroom Presets:</span>
                  <div className="grid grid-cols-3 gap-2 text-[11px]">
                    {[
                      { label: 'Slatted Sofa', val: '/images/showroom/slatted_sofa_set.jpg' },
                      { label: 'Oval Dining', val: '/images/showroom/teak_oval_dining.jpg' },
                      { label: 'Carved Bench', val: '/images/showroom/circular_motif_bench.jpg' },
                      { label: 'X-Trestle', val: '/images/showroom/cross_leg_dining.jpg' },
                      { label: 'Wardrobe Hero', val: '/images/showroom/hero_showroom.jpg' },
                      { label: 'Craftsmanship', val: '/images/showroom/craftsmanship_macro.jpg' },
                    ].map(({ label, val }) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => {
                          if (!productImages.includes(val)) {
                            setProductImages((prev) => [...prev, val]);
                          }
                        }}
                        className="p-2 rounded-lg bg-white border border-[#EAE4D9] hover:border-[#18412F] text-left truncate transition-colors"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {errors.images && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.images}
                </p>
              )}

              {/* Secondary Image URL */}
              <div>
                <label className="block text-sm font-bold text-[#191816] mb-1">
                  Secondary Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.secondaryImageUrl}
                  onChange={(e) => setFormData({ ...formData, secondaryImageUrl: e.target.value })}
                  placeholder="https://example.com/secondary-image.jpg"
                  className="w-full px-4 py-2.5 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm text-[#191816] focus:bg-white focus:border-[#18412F]"
                />
                <span className="text-[11px] text-[#8C8275]">For hover or alternative view</span>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-bold text-[#191816] mb-1">
                  Short Tagline
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Solid Teak Wood · 6 Seater · Beveled Glass Top"
                  className="w-full px-4 py-2.5 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm text-[#191816] focus:bg-white focus:border-[#18412F]"
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-sm font-bold text-[#191816] mb-1">
                  Full Editorial Description
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Mastercrafted suite carved from seasoned Indian teakwood and crowned with a 12mm beveled crystal glass top..."
                  className="w-full p-3.5 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm text-[#191816] focus:bg-white focus:border-[#18412F]"
                />
              </div>

              {/* Care Instructions */}
              <div>
                <label className="block text-sm font-bold text-[#191816] mb-1">
                  Care Instructions
                </label>
                <input
                  type="text"
                  value={formData.careInstructions}
                  onChange={(e) => setFormData({ ...formData, careInstructions: e.target.value })}
                  placeholder="Clean glass with microfiber cloth. Polish wood twice a year with natural beeswax."
                  className="w-full px-4 py-2.5 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm text-[#191816] focus:bg-white focus:border-[#18412F]"
                />
              </div>
            </div>
          )}
        </form>

        {/* Modal Footer / Save & Cancel */}
        <div className="p-4 sm:p-5 border-t border-[#EAE4D9] bg-white flex flex-col sm:flex-row-reverse gap-3 justify-between items-center">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              disabled={isLoading}
              onClick={handleSubmit}
              className="w-full sm:w-auto px-8 py-3 bg-[#18412F] hover:bg-[#123324] text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isLoading ? 'Syncing with Backend...' : isEdit ? 'Update Product' : 'Create Product'}
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 bg-[#F9F7F2] hover:bg-[#EAE4D9] text-[#191816] font-semibold text-sm rounded-xl border border-[#EAE4D9] transition-colors text-center"
            >
              Cancel
            </button>
          </div>

          <div className="text-xs text-[#8C8275] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Target: PostgreSQL Product Table Schema</span>
          </div>
        </div>
      </div>
    </div>
  );
}
