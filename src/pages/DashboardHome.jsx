import React from 'react';
import {
  Package,
  FolderTree,
  Sparkles,
  Eye,
  Plus,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import GreetingSection from '../components/dashboard/GreetingSection';
import StatCard from '../components/dashboard/StatCard';
import ProductCard from '../components/products/ProductCard';
import { StatSkeleton, ProductSkeleton } from '../components/common/LoadingSkeleton';
import { useApp } from '../context/AppContext';

export default function DashboardHome() {
  const {
    stats,
    loadingStats,
    setActiveTab,
    setIsAddProductOpen,
    setEditingProduct,
    setViewingProduct,
  } = useApp();

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsAddProductOpen(true);
  };

  const handleView = (product) => {
    setViewingProduct(product);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsAddProductOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Greeting Section */}
      <GreetingSection />

      {/* 2. Statistics Cards Grid */}
      <section aria-label="Store Statistics">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {loadingStats || !stats ? (
            <>
              <StatSkeleton />
              <StatSkeleton />
              <StatSkeleton />
              <StatSkeleton />
            </>
          ) : (
            <>
              {/* Total Products */}
              <StatCard
                title="Total Products"
                value={stats.totalProducts}
                subtitle={`${stats.inStockCount || 0} currently in stock`}
                icon={Package}
                iconBg="bg-[#EDF5F0]"
                iconColor="text-[#18412F]"
                onClick={() => setActiveTab('products')}
              />

              {/* Categories */}
              <StatCard
                title="Categories"
                value={stats.totalCategories}
                subtitle="Active furniture departments"
                icon={FolderTree}
                iconBg="bg-[#FAF3EA]"
                iconColor="text-[#9A6735]"
                onClick={() => setActiveTab('categories')}
              />

              {/* Featured Products */}
              <StatCard
                title="Featured Products"
                value={stats.featuredProducts}
                subtitle="Highlighted on store front"
                icon={Sparkles}
                iconBg="bg-[#F4EFFB]"
                iconColor="text-[#683FA0]"
                onClick={() => setActiveTab('products')}
              />

              {/* Total Product Views */}
              <StatCard
                title="Total Product Views"
                value={stats.totalViews}
                subtitle="Catalog engagement count"
                icon={Eye}
                iconBg="bg-[#EBF3FB]"
                iconColor="text-[#1D63A8]"
              />
            </>
          )}
        </div>
      </section>

      {/* 3. Quick Action & Inventory Overview Bar */}
      <div className="bg-white rounded-2xl border border-[#EAE4D9] p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Inventory Status Breakdown */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-[#8C8275] uppercase tracking-wider">
            Inventory Health:
          </span>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{stats?.inStockCount || 0} In Stock</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>{stats?.lowStockCount || 0} Low Stock</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-800 text-xs font-semibold border border-red-200">
            <XCircle className="w-3.5 h-3.5 text-red-600" />
            <span>{stats?.outOfStockCount || 0} Out of Stock</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleOpenAdd}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#18412F] hover:bg-[#123324] text-white font-bold text-sm shadow-md transition-all touch-target-lg active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Product</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F9F7F2] hover:bg-[#EAE4D9] text-[#191816] font-semibold text-sm border border-[#EAE4D9] transition-colors touch-target-lg"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 text-[#8C8275]" />
          </button>
        </div>
      </div>

      {/* 4. Recent Products Section */}
      <section aria-label="Recent Furniture Products" className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-serif font-bold text-[#191816]">
              Recently Added Furniture
            </h3>
            <p className="text-xs sm:text-sm text-[#4F4B45]">
              Latest additions to your showroom catalog
            </p>
          </div>

          <button
            onClick={() => setActiveTab('products')}
            className="text-xs sm:text-sm font-bold text-[#18412F] hover:underline flex items-center gap-1"
          >
            <span>Go to Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {loadingStats || !stats ? (
            <>
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </>
          ) : stats.recentProducts && stats.recentProducts.length > 0 ? (
            stats.recentProducts.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={() => {
                  setActiveTab('products');
                }}
              />
            ))
          ) : (
            <div className="col-span-full p-8 text-center bg-white rounded-2xl border border-[#EAE4D9]">
              <p className="text-sm text-[#4F4B45]">No recent products found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
