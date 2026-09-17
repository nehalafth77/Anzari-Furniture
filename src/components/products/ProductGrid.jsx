import React from 'react';
import ProductCard from './ProductCard';
import { ProductSkeleton } from '../common/LoadingSkeleton';
import EmptyState from '../common/EmptyState';

export default function ProductGrid({
  products,
  isLoading,
  onView,
  onEdit,
  onDelete,
  onAddNew,
  onResetFilters,
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <ProductSkeleton key={n} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description="We couldn't find any furniture items matching your current filters or search query."
        actionLabel="Add Product"
        onAction={onAddNew}
        secondaryActionLabel="Clear Filters"
        onSecondaryAction={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
