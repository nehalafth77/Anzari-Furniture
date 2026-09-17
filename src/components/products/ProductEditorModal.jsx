import React, { useState } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Check,
  Plus,
  Trash2,
  HelpCircle,
  Video,
  Sparkles
} from 'lucide-react';
import { FURNITURE_IMAGES } from '../../data/mockData';

export default function ProductEditorModal({
  isOpen,
  onClose,
  product = null,
  onSave
}) {
  if (!isOpen) return null;

  const isEditing = Boolean(product && product.id);

  const [formData, setFormData] = useState({
    name: product?.name || '',
    sku: product?.sku || 'ANS-NEW-001',
    category: product?.category || 'Living Room',
    collection: product?.collection || 'The Living Edit',
    price: product?.price || '',
    salePrice: product?.salePrice || '',
    costPrice: product?.costPrice || '',
    taxRate: 18,
    stock: product?.stock !== undefined ? product.stock : 10,
    lowStockThreshold: product?.lowStockThreshold || 5,
    warehouse: product?.warehouse || 'Mumbai Central Warehouse',
    description: product?.description || '',
    shortDescription: product?.shortDescription || '',
    status: product?.status || 'Draft',
    image: product?.image || FURNITURE_IMAGES.novaSofa,
    galleryImages: [
      product?.image || FURNITURE_IMAGES.novaSofa,
      FURNITURE_IMAGES.kansoCoffeeTable,
      FURNITURE_IMAGES.auroraLamp
    ],
    videoUrl: 'https://youtube.com/watch?v=ansari-craft-demonstration',
    tags: ['Bouclé', 'Handmade', 'Minimalist', 'Living'],
    newTag: '',
    variants: {
      sizes: product?.variants?.sizes || ['Standard', 'Large'],
      materials: product?.variants?.materials || ['Belgian Bouclé', 'Oak Hardwood'],
      finishes: ['Natural Matte Wax', 'Smoked Oil']
    },
    seo: {
      metaTitle: product?.name ? `${product.name} | Ansari Furniture Atelier` : '',
      metaDescription: product?.shortDescription || '',
      urlSlug: product?.name ? product.name.toLowerCase().replace(/\s+/g, '-') : ''
    }
  });

  const categories = [
    'Living Room',
    'Bedroom',
    'Dining',
    'Home Office',
    'Outdoor',
    'Accessories'
  ];

  const collections = [
    'The Milano Collection',
    'The Modern Woodcraft',
    'The Living Edit',
    'Bedroom Essentials',
    'Outdoor Living'
  ];

  const warehouses = [
    'Mumbai Central Warehouse',
    'Bengaluru Fulfillment Hub',
    'Delhi North Depot'
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSeoChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      seo: { ...prev.seo, [field]: value }
    }));
  };

  const handleAddTag = () => {
    if (!formData.newTag.trim()) return;
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, prev.newTag.trim()],
      newTag: ''
    }));
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove)
    }));
  };

  const handleSubmit = (targetStatus) => {
    if (!formData.name.trim() || !formData.price) {
      alert('Please provide at least a Product Name and Regular Price.');
      return;
    }

    const payload = {
      ...product,
      id: product?.id || `PROD-${Date.now().toString().slice(-4)}`,
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      collection: formData.collection,
      price: Number(formData.price),
      salePrice: formData.salePrice ? Number(formData.salePrice) : null,
      costPrice: formData.costPrice ? Number(formData.costPrice) : 0,
      stock: Number(formData.stock),
      lowStockThreshold: Number(formData.lowStockThreshold),
      warehouse: formData.warehouse,
      description: formData.description,
      shortDescription: formData.shortDescription,
      status: targetStatus || formData.status,
      image: formData.image,
      variants: formData.variants,
      unitsSold: product?.unitsSold || 0,
      revenue: product?.revenue || 0,
      rating: product?.rating || 5.0,
      reviewsCount: product?.reviewsCount || 0,
      updatedAt: 'Just now'
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#171715]/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#171715] text-[#FAF8F5] flex items-center justify-between border-b border-[#2A2826] shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-serif-luxury text-xl font-medium tracking-wide text-[#EFECE6]">
              {isEditing ? `Edit: ${formData.name}` : 'New Architectural Furniture Piece'}
            </span>
            <span className="text-[11px] font-sans-modern bg-[#2A2826] text-[#A89F93] px-2 py-0.5 rounded border border-[#3D3A37]">
              Ansari Catalogue Studio
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSubmit('Draft')}
              className="px-3.5 py-1.5 bg-[#2A2826] hover:bg-[#383532] text-[#DDD5C7] rounded text-xs font-medium transition-colors border border-[#3D3A37]"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSubmit('Published')}
              className="px-4 py-1.5 bg-[#8C7355] hover:bg-[#786146] text-white rounded text-xs font-medium transition-colors shadow-xs"
            >
              Publish Product
            </button>
            <button
              onClick={onClose}
              className="p-1 text-[#A89F93] hover:text-white rounded transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Two-Column Editor Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#F6F3EE]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column (7 cols): Information, Pricing, Inventory, Variants, SEO */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Product Information */}
              <div className="p-5 rounded-md bg-white border border-[#E8E2D9]">
                <h3 className="font-serif-luxury text-lg font-semibold text-[#171715] mb-4 pb-2 border-b border-[#F0ECE4]">
                  General Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#524C44] uppercase tracking-wider mb-1.5">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="e.g. Nova Fabric Sofa"
                      className="w-full text-sm px-3.5 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-md text-[#171715] focus:outline-none focus:border-[#8C7355] focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#524C44] uppercase tracking-wider mb-1.5">
                        SKU Reference
                      </label>
                      <input
                        type="text"
                        value={formData.sku}
                        onChange={(e) => handleInputChange('sku', e.target.value)}
                        className="w-full text-xs font-mono px-3.5 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-md text-[#171715] focus:outline-none focus:border-[#8C7355]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#524C44] uppercase tracking-wider mb-1.5">
                        Short Summary
                      </label>
                      <input
                        type="text"
                        value={formData.shortDescription}
                        onChange={(e) =>
                          handleInputChange('shortDescription', e.target.value)
                        }
                        placeholder="e.g. Sculpted 3-seater sofa in warm bouclé"
                        className="w-full text-xs px-3.5 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-md text-[#171715] focus:outline-none focus:border-[#8C7355]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#524C44] uppercase tracking-wider mb-1.5">
                      Editorial Story & Craftsmanship Details
                    </label>
                    <textarea
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe the silhouette, hardwood joinery, upholstery weave, and inspiration..."
                      className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-md text-[#171715] focus:outline-none focus:border-[#8C7355] focus:bg-white leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Pricing & Cost */}
              <div className="p-5 rounded-md bg-white border border-[#E8E2D9]">
                <h3 className="font-serif-luxury text-lg font-semibold text-[#171715] mb-4 pb-2 border-b border-[#F0ECE4]">
                  Pricing & Margins (INR ₹)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#524C44] uppercase tracking-wider mb-1.5">
                      Regular Price (₹) *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="64999"
                      className="w-full text-sm font-semibold px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-md text-[#171715] focus:outline-none focus:border-[#8C7355]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#524C44] uppercase tracking-wider mb-1.5">
                      Sale Price (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.salePrice}
                      onChange={(e) => handleInputChange('salePrice', e.target.value)}
                      placeholder="Optional discount"
                      className="w-full text-sm px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-md text-[#171715] focus:outline-none focus:border-[#8C7355]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#524C44] uppercase tracking-wider mb-1.5">
                      Cost of Production (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.costPrice}
                      onChange={(e) => handleInputChange('costPrice', e.target.value)}
                      placeholder="Artisan & Timber"
                      className="w-full text-sm px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-md text-[#171715] focus:outline-none focus:border-[#8C7355]"
                    />
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#F0ECE4] flex items-center justify-between text-xs text-[#6F685E]">
                  <span>Standard Luxury Furniture GST: <strong>18% Integrated</strong></span>
                  {formData.price && formData.costPrice && (
                    <span className="text-[#24482B] font-medium">
                      Estimated Gross Margin: {Math.round(((formData.price - formData.costPrice) / formData.price) * 100)}%
                    </span>
                  )}
                </div>
              </div>

              {/* 3. Inventory & Warehousing */}
              <div className="p-5 rounded-md bg-white border border-[#E8E2D9]">
                <h3 className="font-serif-luxury text-lg font-semibold text-[#171715] mb-4 pb-2 border-b border-[#F0ECE4]">
                  Inventory & Warehouse Allocation
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#524C44] uppercase tracking-wider mb-1.5">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => handleInputChange('stock', e.target.value)}
                      className="w-full text-xs font-semibold px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-md text-[#171715] focus:outline-none focus:border-[#8C7355]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#524C44] uppercase tracking-wider mb-1.5">
                      Low Stock Threshold
                    </label>
                    <input
                      type="number"
                      value={formData.lowStockThreshold}
                      onChange={(e) =>
                        handleInputChange('lowStockThreshold', e.target.value)
                      }
                      className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-md text-[#171715] focus:outline-none focus:border-[#8C7355]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#524C44] uppercase tracking-wider mb-1.5">
                      Primary Depot
                    </label>
                    <select
                      value={formData.warehouse}
                      onChange={(e) => handleInputChange('warehouse', e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-md text-[#171715] focus:outline-none focus:border-[#8C7355]"
                    >
                      {warehouses.map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 4. SEO & Search Presence */}
              <div className="p-5 rounded-md bg-white border border-[#E8E2D9]">
                <h3 className="font-serif-luxury text-lg font-semibold text-[#171715] mb-4 pb-2 border-b border-[#F0ECE4]">
                  SEO & Search Metadata
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#524C44] uppercase tracking-wider mb-1">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={formData.seo.metaTitle}
                      onChange={(e) => handleSeoChange('metaTitle', e.target.value)}
                      className="w-full text-xs px-3 py-1.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded text-[#171715]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#524C44] uppercase tracking-wider mb-1">
                      Meta Description
                    </label>
                    <textarea
                      rows={2}
                      value={formData.seo.metaDescription}
                      onChange={(e) => handleSeoChange('metaDescription', e.target.value)}
                      className="w-full text-xs px-3 py-1.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded text-[#171715]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Media, Organization, Tags, Variants */}
            <div className="lg:col-span-5 space-y-6">
              {/* Product Media */}
              <div className="p-5 rounded-md bg-white border border-[#E8E2D9]">
                <h3 className="font-serif-luxury text-lg font-semibold text-[#171715] mb-4 pb-2 border-b border-[#F0ECE4]">
                  Product Media & Photography
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-[#524C44] uppercase tracking-wider mb-1.5">
                    Main Hero Showcase Image
                  </label>
                  <div className="aspect-[4/3] rounded bg-[#FAF8F5] border border-[#DDD5C7] overflow-hidden relative group mb-3">
                    <img
                      src={formData.image}
                      alt="Product Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#171715]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          const url = prompt('Enter image URL:', formData.image);
                          if (url) handleInputChange('image', url);
                        }}
                        className="px-3 py-1.5 bg-white text-xs text-[#171715] font-medium rounded shadow"
                      >
                        Change Image
                      </button>
                    </div>
                  </div>

                  {/* Preset Quick Selectors */}
                  <div className="text-[11px] text-[#6F685E] mb-2 font-medium">
                    Quick Select Sample Furniture Asset:
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {Object.entries(FURNITURE_IMAGES).slice(0, 4).map(([key, url]) => (
                      <img
                        key={key}
                        src={url}
                        alt={key}
                        onClick={() => handleInputChange('image', url)}
                        className={`w-full aspect-square object-cover rounded cursor-pointer border-2 transition-all ${
                          formData.image === url
                            ? 'border-[#8C7355] scale-95'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Product Video Link */}
                  <div>
                    <label className="block text-xs font-semibold text-[#524C44] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Video size={13} />
                      <span>Artisan Workshop Reel / Video URL</span>
                    </label>
                    <input
                      type="text"
                      value={formData.videoUrl}
                      onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                      className="w-full text-xs px-3 py-1.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded text-[#171715]"
                    />
                  </div>
                </div>
              </div>

              {/* Organization: Category & Collection */}
              <div className="p-5 rounded-md bg-white border border-[#E8E2D9]">
                <h3 className="font-serif-luxury text-lg font-semibold text-[#171715] mb-4 pb-2 border-b border-[#F0ECE4]">
                  Taxonomy & Collections
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#524C44] uppercase tracking-wider mb-1.5">
                      Furniture Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full text-xs px-3.5 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-md text-[#171715] focus:outline-none focus:border-[#8C7355]"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#524C44] uppercase tracking-wider mb-1.5">
                      Curated Collection
                    </label>
                    <select
                      value={formData.collection}
                      onChange={(e) => handleInputChange('collection', e.target.value)}
                      className="w-full text-xs px-3.5 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-md text-[#171715] focus:outline-none focus:border-[#8C7355]"
                    >
                      {collections.map((col) => (
                        <option key={col} value={col}>
                          {col}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#524C44] uppercase tracking-wider mb-1.5">
                      Tags & Material Badges
                    </label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {formData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 text-[11px] bg-[#EFECE6] text-[#4A453E] px-2 py-0.5 rounded border border-[#DCD6CA]"
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-red-700"
                          >
                            <X size={11} />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.newTag}
                        onChange={(e) => handleInputChange('newTag', e.target.value)}
                        placeholder="Add tag (e.g. Linen)"
                        className="flex-1 text-xs px-3 py-1.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddTag();
                        }}
                      />
                      <button
                        onClick={handleAddTag}
                        className="px-2.5 py-1.5 bg-[#171715] text-white rounded text-xs"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
