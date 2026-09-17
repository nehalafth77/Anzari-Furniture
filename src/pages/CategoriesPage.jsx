import React, { useState } from 'react';
import { Plus, FolderTree, AlertCircle } from 'lucide-react';
import CategoryCard from '../components/categories/CategoryCard';
import CategoryModal from '../components/categories/CategoryModal';
import ConfirmModal from '../components/common/ConfirmModal';
import { apiService } from '../api/apiService';
import { useApp } from '../context/AppContext';

export default function CategoriesPage() {
  const {
    categories,
    refreshCategories,
    loadingCategories,
    showToast,
    refreshStats,
    setActiveTab,
    setGlobalSearch,
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Deletion modal state
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleSaveCategory = async (data, id) => {
    setIsSaving(true);
    try {
      if (id) {
        const res = await apiService.updateCategory(id, data);
        if (res.success) {
          showToast(`Category updated to "${data.name}"!`, 'success');
        }
      } else {
        const res = await apiService.createCategory(data);
        if (res.success) {
          showToast(`Category "${data.name}" added successfully!`, 'success');
        }
      }
      setIsModalOpen(false);
      refreshCategories();
      refreshStats();
    } catch (err) {
      showToast(err.message || 'Failed to save category', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = (category) => {
    if (category.productCount > 0) {
      setWarningMessage(
        `Cannot delete "${category.name}" because it still has ${category.productCount} product(s) assigned to it. Please reassign or delete those products first before removing this category.`
      );
      setCategoryToDelete(null);
    } else {
      setWarningMessage('');
      setCategoryToDelete(category);
    }
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;
    setIsDeleting(true);
    try {
      const res = await apiService.deleteCategory(categoryToDelete._id);
      if (res.success) {
        showToast(`Category "${categoryToDelete.name}" deleted successfully!`, 'success');
        refreshCategories();
        refreshStats();
      }
    } catch (err) {
      showToast(err.message || 'Failed to delete category', 'error');
    } finally {
      setIsDeleting(false);
      setCategoryToDelete(null);
    }
  };

  const handleFilterProducts = (categoryName) => {
    setActiveTab('products');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#191816]">
            Furniture Categories
          </h2>
          <p className="text-xs sm:text-sm text-[#4F4B45] mt-1">
            Organize products into intuitive collections for easy browsing.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#18412F] hover:bg-[#123324] text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all touch-target-lg active:scale-95"
        >
          <Plus className="w-5 h-5 text-white" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Warning Alert if User Tried to Delete Category with Products */}
      {warningMessage && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start justify-between gap-3 animate-in fade-in">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-amber-900 leading-relaxed">
              {warningMessage}
            </p>
          </div>
          <button
            onClick={() => setWarningMessage('')}
            className="text-amber-700 hover:text-amber-900 text-xs font-bold px-2 py-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {loadingCategories ? (
          [1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="bg-white rounded-2xl border border-[#EAE4D9] p-6 animate-pulse space-y-4"
            >
              <div className="w-12 h-12 bg-[#EAE4D9]/60 rounded-xl" />
              <div className="h-5 bg-[#EAE4D9] rounded w-1/2" />
              <div className="h-4 bg-[#EAE4D9]/70 rounded w-3/4" />
            </div>
          ))
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              onEdit={handleOpenEdit}
              onDelete={handleDeleteClick}
              onFilterProducts={handleFilterProducts}
            />
          ))
        ) : (
          <div className="col-span-full p-12 text-center bg-white rounded-2xl border border-[#EAE4D9]">
            <FolderTree className="w-12 h-12 text-[#18412F] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-[#191816]">No Categories Found</h3>
            <p className="text-sm text-[#4F4B45] mt-1">
              Click the button above to add your first furniture category.
            </p>
          </div>
        )}
      </div>

      {/* Category Add/Edit Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        category={editingCategory}
        isLoading={isSaving}
        onSave={handleSaveCategory}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Confirmation Dialog for Safe Deletion */}
      <ConfirmModal
        isOpen={Boolean(categoryToDelete)}
        title="Are you sure you want to delete this category?"
        message={
          categoryToDelete
            ? `Are you sure you want to remove "${categoryToDelete.name}"? This category currently has 0 products assigned.`
            : ''
        }
        confirmText="Delete Category"
        cancelText="Cancel"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setCategoryToDelete(null)}
      />
    </div>
  );
}
