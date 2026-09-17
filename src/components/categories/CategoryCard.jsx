import React from 'react';
import { FolderTree, Edit3, Trash2, Package } from 'lucide-react';

export default function CategoryCard({
  category,
  onEdit,
  onDelete,
  onFilterProducts,
}) {
  const productCount = category.productCount || 0;
  const hasProducts = productCount > 0;

  return (
    <div className="bg-white rounded-2xl border border-[#EAE4D9] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#EDF5F0] text-[#18412F] flex items-center justify-center shrink-0">
            <FolderTree className="w-6 h-6 stroke-[1.75]" />
          </div>

          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
              hasProducts
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-neutral-100 text-[#8C8275] border-neutral-200'
            }`}
          >
            {productCount} product{productCount === 1 ? '' : 's'}
          </span>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold text-[#191816] tracking-tight">
            {category.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#4F4B45] mt-1 line-clamp-2 leading-relaxed">
            {category.description || 'Collection of premium furniture items.'}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#EAE4D9] flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onFilterProducts(category.name)}
          className="text-xs font-semibold text-[#18412F] hover:underline flex items-center gap-1 touch-target-lg"
        >
          <Package className="w-3.5 h-3.5" />
          <span>View Items</span>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onEdit(category)}
            className="p-2 rounded-xl text-[#18412F] hover:bg-[#EDF5F0] border border-[#D0E3D9] transition-colors touch-target-lg flex items-center justify-center"
            title="Rename Category"
            aria-label={`Rename ${category.name}`}
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(category)}
            className="p-2 rounded-xl text-red-600 hover:bg-red-50 border border-red-200 transition-colors touch-target-lg flex items-center justify-center"
            title={hasProducts ? 'Cannot delete category with active products' : 'Delete Category'}
            aria-label={`Delete ${category.name}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
