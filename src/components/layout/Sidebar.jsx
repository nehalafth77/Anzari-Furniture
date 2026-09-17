import React from 'react';
import {
  LayoutDashboard,
  Armchair,
  FolderTree,
  Settings,
  PlusCircle,
  Database,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar() {
  const {
    activeTab,
    setActiveTab,
    setIsAddProductOpen,
    setEditingProduct,
    stats
  } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Armchair },
    { id: 'categories', label: 'Categories', icon: FolderTree },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setIsAddProductOpen(true);
  };

  return (
    <aside className="hidden lg:flex fixed top-0 left-0 z-30 h-screen w-64 bg-[#123324] text-white flex-col justify-between border-r border-[#18412F] shadow-xl">
      {/* Top Section */}
      <div className="p-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-[#22563F] flex items-center justify-center text-white shadow-inner">
            <img src="https://res.cloudinary.com/zqgmlaym/image/upload/v1789666032/ChatGPT_Image_Sep_14_2026_07_40_37_PM.png" alt="ANZARI" className="w-6 h-6 stroke-[1.75]" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold tracking-wide text-[#FAF7F2]">
              ANZARI
            </h1>
            <p className="text-[11px] uppercase tracking-wider text-[#A7C7B7] font-medium">
              Furniture Admin
            </p>
          </div>
        </div>

        {/* Quick Add Product Button */}
        <div className="mt-6 mb-4">
          <button
            onClick={handleOpenAddProduct}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white text-[#123324] hover:bg-[#FAF7F2] font-semibold text-sm shadow-md transition-all active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4 text-[#123324]" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="mt-4 space-y-1.5" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                  ? 'bg-[#22563F] text-white shadow-sm font-semibold'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#A7C7B7]'}`} />
                <span>{item.label}</span>
                {item.id === 'products' && stats && (
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-black/20 text-[#D0E3D9]">
                    {stats.totalProducts}
                  </span>
                )}
                {item.id === 'categories' && stats && (
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-black/20 text-[#D0E3D9]">
                    {stats.totalCategories}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Database Status & Store Info */}
      <div className="p-6 border-t border-white/10 bg-black/10">
        <div className="flex items-center gap-2 text-xs text-[#A7C7B7] mb-2">
          <Database className="w-3.5 h-3.5" />
          <span>System Status:</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-white">
            {stats?.dbStatus || 'Connected'}
          </span>
        </div>
        <p className="text-[11px] text-white/50 mt-3">
          Furniture Admin v1.0 •
        </p>
      </div>
    </aside>
  );
}
