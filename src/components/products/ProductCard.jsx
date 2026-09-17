import React from 'react';
import { Eye, Edit3, Trash2, Tag } from 'lucide-react';
import { StockBadge, FeaturedBadge } from '../common/Badge';

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

  return (
    <div className="bg-white rounded-2xl border border-[#EAE4D9] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      {/* Top: Image and Badges */}
      <div>
        <div className="relative w-full h-52 sm:h-48 overflow-hidden bg-[#F9F7F2]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';
            }}
          />

          {/* Badges Container */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <StockBadge status={product.stockStatus} />
            {product.featured && <FeaturedBadge />}
          </div>

          {/* View counter overlay */}
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1">
            <Eye className="w-3 h-3 text-white/80" />
            <span>{product.views || 0} views</span>
          </div>
        </div>

        {/* Product Details Content */}
        <div className="p-4 sm:p-5">
          {/* Category Tag */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8C8275] uppercase tracking-wider mb-1.5">
            <Tag className="w-3 h-3 text-[#18412F]" />
            <span>{product.category}</span>
          </div>

          {/* Name */}
          <h3 className="text-base sm:text-lg font-bold text-[#191816] line-clamp-1 leading-snug">
            {product.name}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-[#4F4B45] line-clamp-2 mt-1 min-h-[32px] leading-relaxed">
            {product.description || 'Handcrafted furniture with premium finish and durable construction.'}
          </p>

          {/* Price */}
          <div className="mt-3 pt-3 border-t border-[#EAE4D9]/70 flex items-baseline justify-between">
            <div className="text-lg sm:text-xl font-extrabold text-[#18412F] tracking-tight">
              {formattedPrice}
            </div>
            {product.brand && (
              <span className="text-[11px] text-[#8C8275] font-medium truncate max-w-[120px]">
                {product.brand}
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
            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#F9F7F2] hover:bg-[#EAE4D9] text-[#191816] text-xs font-semibold border border-[#EAE4D9] transition-colors touch-target-lg active:scale-95"
            aria-label={`View details of ${product.name}`}
          >
            <Eye className="w-4 h-4 text-[#18412F]" />
            <span>View</span>
          </button>

          {/* Edit Button */}
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#EDF5F0] hover:bg-[#D0E3D9] text-[#18412F] text-xs font-bold border border-[#D0E3D9] transition-colors touch-target-lg active:scale-95"
            aria-label={`Edit ${product.name}`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </button>

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => onDelete(product)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold border border-red-200 transition-colors touch-target-lg active:scale-95"
            aria-label={`Delete ${product.name}`}
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
