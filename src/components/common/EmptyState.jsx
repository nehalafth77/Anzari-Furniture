import React from 'react';
import { PackageOpen, Plus, RefreshCw } from 'lucide-react';

export default function EmptyState({
  title = 'No products found',
  description = 'Try adjusting your search terms or category filters to find what you are looking for.',
  actionLabel = 'Add New Product',
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-2xl border border-[#EAE4D9] shadow-sm">
      <div className="w-16 h-16 rounded-full bg-[#EDF5F0] text-[#18412F] flex items-center justify-center mb-4">
        <PackageOpen className="w-8 h-8 stroke-[1.5]" />
      </div>
      <h3 className="text-xl font-bold text-[#191816]">{title}</h3>
      <p className="text-sm text-[#4F4B45] max-w-sm mt-2 leading-relaxed">
        {description}
      </p>

      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        {onSecondaryAction && (
          <button
            onClick={onSecondaryAction}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#EAE4D9] bg-[#F9F7F2] hover:bg-[#EAE4D9] text-[#191816] text-sm font-semibold transition-colors touch-target-lg"
          >
            <RefreshCw className="w-4 h-4" />
            {secondaryActionLabel || 'Reset Filters'}
          </button>
        )}
        {onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#18412F] hover:bg-[#123324] text-white text-sm font-semibold shadow-sm transition-colors touch-target-lg active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
