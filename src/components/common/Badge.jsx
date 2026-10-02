import React from 'react';
import { Sparkles, Check, AlertCircle, XCircle } from 'lucide-react';

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  const variantClasses = {
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    gold: 'bg-amber-50 text-amber-900 border-amber-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    processing: 'bg-blue-50 text-blue-800 border-blue-200',
    taupe: 'bg-[#FAF3EA] text-[#8C7355] border-[#EAE4D9]',
    danger: 'bg-red-50 text-red-800 border-red-200',
    default: 'bg-[#F9F7F2] text-[#4F4B45] border-[#EAE4D9]',
  };

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full border ${
        variantClasses[variant] || variantClasses.default
      } ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      {children}
    </span>
  );
}

export function StockBadge({ status }) {
  if (status === 'In Stock') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
        In Stock
      </span>
    );
  }

  if (status === 'Low Stock') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
        <AlertCircle className="w-3 h-3 text-amber-600" />
        Low Stock
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-800 border border-red-200">
      <XCircle className="w-3 h-3 text-red-600" />
      Out of Stock
    </span>
  );
}

export function FeaturedBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FAF3EA] text-[#9A6735] border border-[#E9D9C3]">
      <Sparkles className="w-3 h-3 fill-[#9A6735]" />
      Featured
    </span>
  );
}
