import React from 'react';
import { Eye, Edit3, Trash2, Tag, Layers, Sparkles } from 'lucide-react';
import { StockBadge, FeaturedBadge } from '../common/Badge';
import { getProductPrimaryImage } from '../../utils/imageUtils';

export default function ProductCard({
  product,
  onView,
  onEdit,
  onDelete,
}) {
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

  const stockCount = product.stock !== undefined ? product.stock : 10;
  const isLowStock = stockCount <= 5;

  return (
    <div className="bg-white rounded-2xl border border-[#EAE4D9] overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      {/* Top: Image and Badges */}
      <div>
        <div className="relative w-full h-52 sm:h-48 overflow-hidden bg-[#F9F7F2]">
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/showroom/hero_showroom.jpg';
            }}
          />

          {/* Badges Container */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              {product.badge && (
                <span className="px-2 py-0.5 rounded-full bg-[#18412F] text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
                  {product.badge}
                </span>
              )}
              {product.bestseller && (
                <span className="px-2 py-0.5 rounded-full bg-[#8C7355] text-white text-[10px] font-bold shadow-xs flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5" /> Best
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs ${
                  stockCount === 0
                    ? 'bg-red-500 text-white'
                    : isLowStock
                    ? 'bg-amber-500 text-white animate-pulse'
                    : 'bg-emerald-600 text-white'
                }`}
              >
                {stockCount} in stock
              </span>
            </div>
          </div>

          {/* Room / Collection overlay */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
            {product.collectionName && (
              <span className="px-2 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium truncate max-w-[150px]">
                {product.collectionName}
              </span>
            )}
            {product.room && (
              <span className="ml-auto px-2 py-1 rounded-md bg-[#18412F]/80 backdrop-blur-xs text-[#FAF7F2] text-[10px] font-medium">
                {product.room}
              </span>
            )}
          </div>
        </div>

        {/* Product Details Content */}
        <div className="p-4 sm:p-5">
          {/* Category Tag */}
          <div className="flex items-center justify-between text-xs font-semibold text-[#8C8275] uppercase tracking-wider mb-1.5">
            <div className="flex items-center gap-1">
              <Tag className="w-3 h-3 text-[#18412F]" />
              <span>{product.category}</span>
            </div>
            {product.material && (
              <span className="text-[10px] text-[#8C8275] truncate max-w-[130px] font-normal normal-case">
                {product.material}
              </span>
            )}
          </div>

          {/* Name */}
          <h3 className="text-base sm:text-lg font-bold text-[#191816] line-clamp-1 leading-snug">
            {product.name}
          </h3>

          {/* Short description or description */}
          <p className="text-xs text-[#4F4B45] line-clamp-2 mt-1 min-h-[32px] leading-relaxed">
            {product.shortDescription || product.description || 'Mastercrafted teak furniture with authentic Indian joinery.'}
          </p>

          {/* Price */}
          <div className="mt-3 pt-3 border-t border-[#EAE4D9]/70 flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <div className="text-lg sm:text-xl font-extrabold text-[#18412F] tracking-tight">
                {formattedPrice}
              </div>
              {formattedComparePrice && (
                <div className="text-xs text-[#8C8275] line-through">
                  {formattedComparePrice}
                </div>
              )}
            </div>

            {product.rating && (
              <span className="text-[11px] text-[#A37B3D] font-bold">
                ★ {product.rating} ({product.reviewCount || 0})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom: Action Buttons */}
      <div className="p-4 pt-0">
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#EAE4D9]">
          {/* View Button */}
          <button
            type="button"
            onClick={() => onView(product)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#F9F7F2] hover:bg-[#EAE4D9] text-[#191816] text-xs font-semibold border border-[#EAE4D9] transition-colors active:scale-95"
            aria-label={`View details of ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5 text-[#18412F]" />
            <span>View</span>
          </button>

          {/* Edit Button */}
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#EDF5F0] hover:bg-[#D0E3D9] text-[#18412F] text-xs font-bold border border-[#D0E3D9] transition-colors active:scale-95"
            aria-label={`Edit ${product.name}`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => onDelete(product)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold border border-red-200 transition-colors active:scale-95"
            aria-label={`Delete ${product.name}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
