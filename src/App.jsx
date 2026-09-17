import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MobileHeader from './components/layout/MobileHeader';
import MobileDrawer from './components/layout/MobileDrawer';
import Toast from './components/common/Toast';
import ProductModal from './components/products/ProductModal';
import ProductDetailModal from './components/products/ProductDetailModal';
import ConfirmModal from './components/common/ConfirmModal';

// Pages
import DashboardHome from './pages/DashboardHome';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import { apiService } from './api/apiService';

function MainLayout() {
  const {
    activeTab,
    isAddProductOpen,
    setIsAddProductOpen,
    editingProduct,
    setEditingProduct,
    viewingProduct,
    setViewingProduct,
    categories,
    showToast,
    refreshStats,
    refreshCategories,
  } = useApp();

  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [productToDeleteFromDetail, setProductToDeleteFromDetail] = useState(null);

  // Save (Create or Update) Product Handler
  const handleSaveProduct = async (productData, id) => {
    setIsSavingProduct(true);
    try {
      if (id) {
        const res = await apiService.updateProduct(id, productData);
        if (res.success) {
          showToast('Product updated successfully!', 'success');
        }
      } else {
        const res = await apiService.createProduct(productData);
        if (res.success) {
          showToast('New furniture product added to catalog!', 'success');
        }
      }
      setIsAddProductOpen(false);
      setEditingProduct(null);
      refreshStats();
      refreshCategories();

      // Trigger a soft refresh by toggling activeTab briefly or firing event if needed
      window.dispatchEvent(new Event('catalogUpdated'));
    } catch (err) {
      showToast(err.message || 'Failed to save product', 'error');
    } finally {
      setIsSavingProduct(false);
    }
  };

  // Delete product initiated from ProductDetailModal
  const handleConfirmDeleteFromDetail = async () => {
    if (!productToDeleteFromDetail) return;
    try {
      const res = await apiService.deleteProduct(productToDeleteFromDetail._id);
      if (res.success) {
        showToast(`"${productToDeleteFromDetail.name}" deleted successfully!`, 'success');
        setViewingProduct(null);
        refreshStats();
        refreshCategories();
        window.dispatchEvent(new Event('catalogUpdated'));
      }
    } catch (err) {
      showToast(err.message || 'Failed to delete product', 'error');
    } finally {
      setProductToDeleteFromDetail(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#191816] flex flex-col lg:flex-row antialiased">
      {/* 1. Desktop Left Sidebar */}
      <Sidebar />

      {/* 2. Mobile Sticky Header & Drawer */}
      <MobileHeader />
      <MobileDrawer />

      {/* 3. Main Dashboard Content Container */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        {/* Desktop Top Header */}
        <Header />

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && <DashboardHome />}
          {activeTab === 'products' && <ProductsPage />}
          {activeTab === 'categories' && <CategoriesPage />}
          {activeTab === 'settings' && <SettingsPage />}
        </main>
      </div>

      {/* 4. Global Modals & Notifications */}
      <ProductModal
        isOpen={isAddProductOpen}
        onClose={() => {
          setIsAddProductOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        product={editingProduct}
        categories={categories}
        isLoading={isSavingProduct}
      />

      <ProductDetailModal
        isOpen={Boolean(viewingProduct)}
        product={viewingProduct}
        onClose={() => setViewingProduct(null)}
        onEdit={(p) => {
          setViewingProduct(null);
          setEditingProduct(p);
          setIsAddProductOpen(true);
        }}
        onDelete={(p) => {
          setProductToDeleteFromDetail(p);
        }}
      />

      <ConfirmModal
        isOpen={Boolean(productToDeleteFromDetail)}
        title="Are you sure you want to delete this product?"
        message={
          productToDeleteFromDetail
            ? `You are about to delete "${productToDeleteFromDetail.name}". This action cannot be undone.`
            : ''
        }
        confirmText="Delete Product"
        cancelText="Cancel"
        onConfirm={handleConfirmDeleteFromDetail}
        onCancel={() => setProductToDeleteFromDetail(null)}
      />

      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRoot />
    </AppProvider>
  );
}

function AppRoot() {
  const { isAuthenticated, login } = useApp();

  if (!isAuthenticated) {
    return <LoginPage onLogin={login} />;
  }

  return <MainLayout />;
}
