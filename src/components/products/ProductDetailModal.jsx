import React, { useEffect } from 'react';
import { X, Eye, Tag, Layers, Edit3, Trash2, CheckCircle, Sparkles, MapPin, Wrench } from 'lucide-react';
import { apiService } from '../../api/apiService';
import { useApp } from '../../context/AppContext';
import { getProductPrimaryImage, getProductAllImages } from '../../utils/imageUtils';

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) {
  const { refreshStats } = useApp();

  useEffect(() => {
    if (isOpen && (product?._id || product?.id)) {
      apiService.incrementViews(product._id || product.id).catch(() => {});
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price);

  const formattedComparePrice = product.compareAtPrice
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(product.compareAtPrice)
    : null;

  const displayImage = getProductPrimaryImage(product);
  const allImages = getProductAllImages(product);

  const stockCount = product.stock !== undefined ? product.stock : 10;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-3xl w-full my-6 shadow-2xl border border-[#EAE4D9] overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#EAE4D9] bg-[#F9F7F2]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#18412F] uppercase tracking-wider">
              {product.collectionName || 'Milano Collection'}
            </span>
            <span className="text-xs text-[#8C8275]">• Room: {product.room || 'Living Room'}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8C8275] hover:text-[#191816] hover:bg-white transition-colors flex items-center justify-center"
            aria-label="Close details"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content / Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Hero Large Image */}
          <div className="relative rounded-2xl overflow-hidden bg-[#F9F7F2] border border-[#EAE4D9]">
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-64 sm:h-80 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';
              }}
            />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="flex gap-2">
                {product.badge && (
                  <span className="px-3 py-1 rounded-full bg-[#18412F] text-white text-xs font-bold shadow-md uppercase">
                    {product.badge}
                  </span>
                )}
                {product.bestseller && (
                  <span className="px-3 py-1 rounded-full bg-[#8C7355] text-white text-xs font-bold shadow-md">
                    ★ Bestseller
                  </span>
                )}
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold shadow-md text-white ${
                  stockCount <= 5 ? 'bg-amber-600' : 'bg-emerald-700'
                }`}
              >
                {stockCount} in stock
              </span>
            </div>
          </div>

          {/* Title, Category & Pricing */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C7355] uppercase tracking-wider mb-1">
              <span>{product.category}</span>
              <span>•</span>
              <span>{product.room}</span>
              <span>•</span>
              <span>{product.collectionName}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#191816]">
              {product.name}
            </h1>

            {product.shortDescription && (
              <p className="text-sm text-[#8C7355] mt-1 font-medium">
                {product.shortDescription}
              </p>
            )}

            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-3xl font-extrabold text-[#18412F]">
                {formattedPrice}
              </span>
              {formattedComparePrice && (
                <span className="text-lg text-[#8C8275] line-through">
                  {formattedComparePrice}
                </span>
              )}
              {product.rating && (
                <span className="ml-auto text-sm font-bold text-[#A37B3D] px-2.5 py-1 bg-amber-50 rounded-lg border border-amber-200">
                  ★ {product.rating} / 5.0 ({product.reviewCount || 0} reviews)
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EAE4D9]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7355] mb-2">
              Editorial Description
            </h4>
            <p className="text-sm text-[#4F4B45] leading-relaxed">
              {product.description || 'Mastercrafted solid timber furniture built for luxury and durability.'}
            </p>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-[#EAE4D9]">
              <span className="text-xs font-bold text-[#8C8275] uppercase block mb-1">
                Primary Material
              </span>
              <p className="text-sm font-semibold text-[#191816]">
                {product.material || 'Solid Teak Wood'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#EAE4D9]">
              <span className="text-xs font-bold text-[#8C8275] uppercase block mb-1">
                Dimensions
              </span>
              <p className="text-sm font-semibold text-[#191816]">
                {product.dimensions
                  ? `${product.dimensions.width || 0}W x ${product.dimensions.height || 0}H x ${product.dimensions.depth || 0}D ${product.dimensions.unit || 'cm'}`
                  : 'Custom Dimensions'}
              </p>
            </div>

            {Array.isArray(product.colors) && product.colors.length > 0 && (
              <div className="p-4 rounded-xl bg-white border border-[#EAE4D9]">
                <span className="text-xs font-bold text-[#8C8275] uppercase block mb-1">
                  Available Colors
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {product.colors.map((color, idx) => (
                    <span key={idx} className="px-2 py-1 bg-[#F9F7F2] border border-[#EAE4D9] rounded-md text-xs text-[#191816]">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.slug && (
              <div className="p-4 rounded-xl bg-white border border-[#EAE4D9]">
                <span className="text-xs font-bold text-[#8C8275] uppercase block mb-1">
                  URL Slug
                </span>
                <p className="text-sm font-semibold text-[#191816] break-all">
                  {product.slug}
                </p>
              </div>
            )}
          </div>

          {/* Features Checklist */}
          {Array.isArray(product.features) && product.features.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7355] mb-2.5">
                Craftsmanship Highlights
              </h4>
              <ul className="space-y-2">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#4F4B45]">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Care instructions */}
          {product.careInstructions && (
            <div className="p-4 rounded-xl bg-[#EDF5F0]/60 border border-[#D0E3D9] text-xs text-[#18412F]">
              <span className="font-bold block mb-1">Care & Maintenance:</span>
              <span>{product.careInstructions}</span>
            </div>
          )}

          {/* Tags */}
          {Array.isArray(product.tags) && product.tags.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7355] mb-2.5">
                Product Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-[#F9F7F2] border border-[#EAE4D9] rounded-lg text-xs text-[#4F4B45]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer / Actions */}
        <div className="p-4 sm:p-5 border-t border-[#EAE4D9] bg-[#F9F7F2] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(product)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#18412F] text-white text-xs sm:text-sm font-bold shadow-xs hover:bg-[#123324] transition-all"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Product</span>
            </button>
            <button
              onClick={() => onDelete(product)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-xs sm:text-sm font-semibold border border-red-200 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white border border-[#EAE4D9] text-xs sm:text-sm font-semibold text-[#191816] hover:bg-[#EAE4D9] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
