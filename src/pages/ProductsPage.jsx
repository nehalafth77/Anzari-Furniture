import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Sparkles, RefreshCw } from 'lucide-react';
import FilterBar from '../components/products/FilterBar';
import ProductGrid from '../components/products/ProductGrid';
import ConfirmModal from '../components/common/ConfirmModal';
import { apiService } from '../api/apiService';
import { useApp } from '../context/AppContext';

export default function ProductsPage() {
  const {
    globalSearch,
    setGlobalSearch,
    categories,
    showToast,
    refreshStats,
    setIsAddProductOpen,
    editingProduct,
    setEditingProduct,
    setViewingProduct,
  } = useApp();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [stockFilter, setStockFilter] = useState('All');

  // Deletion modal state
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Sync global search if set from Header
  useEffect(() => {
    if (globalSearch) {
      // search is handled in filter
    }
  }, [globalSearch]);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await apiService.getProducts({
        search: globalSearch,
        category: selectedCategory,
        featured: featuredOnly,
        stockStatus: stockFilter,
      });

      if (res.success) {
        setProducts(res.data);
      }
    } catch (err) {
      showToast(err.message || 'Failed to fetch products', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [globalSearch, selectedCategory, featuredOnly, stockFilter, showToast]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // View handler
  const handleView = (product) => {
    setViewingProduct(product);
  };

  // Edit handler
  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsAddProductOpen(true);
  };

  // Delete flow
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    try {
      const res = await apiService.deleteProduct(productToDelete._id);
      if (res.success) {
        setProducts((prev) => prev.filter((p) => p._id !== productToDelete._id));
        showToast(`"${productToDelete.name}" deleted successfully!`, 'success');
        refreshStats();
      }
    } catch (err) {
      showToast(err.message || 'Failed to delete product', 'error');
    } finally {
      setIsDeleting(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#191816]">
            Furniture Products
          </h2>
          <p className="text-xs sm:text-sm text-[#4F4B45] mt-1">
            Browse, manage, and update furniture inventory and pricing.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingProduct(null);
            setIsAddProductOpen(true);
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#18412F] hover:bg-[#123324] text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all touch-target-lg active:scale-95"
        >
          <Plus className="w-5 h-5 text-white" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter Bar */}
      <FilterBar
        search={globalSearch}
        setSearch={setGlobalSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        featuredOnly={featuredOnly}
        setFeaturedOnly={setFeaturedOnly}
        stockFilter={stockFilter}
        setStockFilter={setStockFilter}
        totalResults={products.length}
      />

      {/* Product Grid */}
      <ProductGrid
        products={products}
        isLoading={isLoading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onAddNew={() => {
          setEditingProduct(null);
          setIsAddProductOpen(true);
        }}
        onResetFilters={() => {
          setGlobalSearch('');
          setSelectedCategory('All');
          setFeaturedOnly(false);
          setStockFilter('All');
        }}
      />

      {/* Confirmation Dialog for Deletion */}
      <ConfirmModal
        isOpen={Boolean(productToDelete)}
        title="Are you sure you want to delete this product?"
        message={
          productToDelete
            ? `You are about to delete "${productToDelete.name}". This action will remove the item from the catalog permanently.`
            : ''
        }
        confirmText="Delete Product"
        cancelText="Cancel"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setProductToDelete(null)}
      />
    </div>
  );
}
