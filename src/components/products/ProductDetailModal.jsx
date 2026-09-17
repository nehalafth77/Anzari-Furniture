import React, { useEffect, useState } from 'react';
import { X, Eye, Tag, Calendar, Edit3, Trash2, CheckCircle, Sparkles } from 'lucide-react';
import { StockBadge, FeaturedBadge } from '../common/Badge';
import { apiService } from '../../api/apiService';
import { useApp } from '../../context/AppContext';

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) {
  const { refreshStats } = useApp();
  const [currentViews, setCurrentViews] = useState(product?.views || 0);

  useEffect(() => {
    if (isOpen && product?._id) {
      setCurrentViews(product.views || 0);
      
      // Increment view count in backend as per requirement #19
      apiService
        .incrementViews(product._id)
        .then((res) => {
          if (res.success && res.data?.views) {
            setCurrentViews(res.data.views);
            refreshStats(); // Update dashboard total views dynamically
          }
        })
        .catch((err) => {
          console.error('Failed to increment views:', err);
        });
    }
  }, [isOpen, product?._id, refreshStats]);

  if (!isOpen || !product) return null;

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(dateStr));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full my-6 shadow-2xl border border-[#EAE4D9] overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#EAE4D9] bg-[#F9F7F2]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#18412F] uppercase tracking-wider">
              Furniture Details
            </span>
            <span className="text-xs text-[#8C8275]">• ID: {product._id?.slice(-6) || 'Item'}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8C8275] hover:text-[#191816] hover:bg-white transition-colors touch-target-lg flex items-center justify-center"
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
              src={product.image}
              alt={product.name}
              className="w-full h-64 sm:h-80 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';
              }}
            />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <StockBadge status={product.stockStatus} />
              {product.featured && <FeaturedBadge />}
            </div>

            {/* Live View Counter Badge */}
            <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg">
              <Eye className="w-4 h-4 text-emerald-300" />
              <span>{currentViews} Total Views</span>
            </div>
          </div>

          {/* Title & Price Header */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#8C8275] uppercase tracking-wider mb-1">
              <Tag className="w-3.5 h-3.5 text-[#18412F]" />
              <span>{product.category}</span>
              {product.brand && <span>• {product.brand}</span>}
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#191816] leading-snug">
              {product.name}
            </h2>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#18412F] mt-2">
              {formattedPrice}
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#F9F7F2] p-4 sm:p-5 rounded-2xl border border-[#EAE4D9]">
            <h4 className="text-xs font-bold text-[#8C8275] uppercase tracking-wider mb-2">
              Product Overview
            </h4>
            <p className="text-sm sm:text-base text-[#191816] leading-relaxed">
              {product.description || 'No description provided for this furniture piece.'}
            </p>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#F9F7F2] rounded-xl border border-[#EAE4D9]">
              <span className="text-[11px] font-bold text-[#8C8275] uppercase block">Material</span>
              <span className="text-xs sm:text-sm font-semibold text-[#191816] mt-0.5 block">
                {product.material || 'Solid Wood'}
              </span>
            </div>
            <div className="p-3 bg-[#F9F7F2] rounded-xl border border-[#EAE4D9]">
              <span className="text-[11px] font-bold text-[#8C8275] uppercase block">Color</span>
              <span className="text-xs sm:text-sm font-semibold text-[#191816] mt-0.5 block">
                {product.color || 'Natural'}
              </span>
            </div>
            <div className="p-3 bg-[#F9F7F2] rounded-xl border border-[#EAE4D9]">
              <span className="text-[11px] font-bold text-[#8C8275] uppercase block">Dimensions</span>
              <span className="text-xs sm:text-sm font-semibold text-[#191816] mt-0.5 block truncate">
                {product.dimensions || 'Standard'}
              </span>
            </div>
            <div className="p-3 bg-[#F9F7F2] rounded-xl border border-[#EAE4D9]">
              <span className="text-[11px] font-bold text-[#8C8275] uppercase block">Status</span>
              <span className="text-xs sm:text-sm font-semibold text-[#18412F] mt-0.5 block">
                {product.stockStatus}
              </span>
            </div>
          </div>

          {/* Metadata Dates */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#8C8275] pt-2 border-t border-[#EAE4D9]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Added: {formatDate(product.createdAt)}</span>
            </div>
            {product.updatedAt && (
              <div className="flex items-center gap-1.5">
                <span>Updated: {formatDate(product.updatedAt)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer / Actions */}
        <div className="p-4 sm:p-5 border-t border-[#EAE4D9] bg-white flex flex-col sm:flex-row justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onDelete(product);
            }}
            className="px-5 py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-sm border border-red-200 transition-colors flex items-center justify-center gap-2 touch-target-lg"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Product</span>
          </button>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-[#F9F7F2] hover:bg-[#EAE4D9] text-[#191816] font-semibold text-sm border border-[#EAE4D9] transition-colors touch-target-lg text-center"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(product);
              }}
              className="px-6 py-3 rounded-xl bg-[#18412F] hover:bg-[#123324] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 touch-target-lg active:scale-95"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Product</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
