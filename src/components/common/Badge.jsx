import React from 'react';
import { Sparkles, Check, AlertCircle, XCircle } from 'lucide-react';

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
