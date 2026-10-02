import React from 'react';
import {
  LayoutDashboard,
  Armchair,
  FolderTree,
  Settings,
  PlusCircle,
  Database,
  ShoppingBag,
  Users,
  Layers,
  Star,
  Boxes,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar() {
  const {
    activeTab,
    setActiveTab,
    setIsAddProductOpen,
    setEditingProduct,
    stats,
    orders,
    users,
  } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Armchair, badgeCount: stats?.totalProducts },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badgeCount: orders?.length || stats?.totalOrders },
    { id: 'customers', label: 'Customers', icon: Users, badgeCount: users?.length || stats?.totalUsers },
    { id: 'categories', label: 'Categories', icon: FolderTree },
    { id: 'collections', label: 'Collections', icon: Layers },
    { id: 'inventory', label: 'Inventory', icon: Boxes },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setIsAddProductOpen(true);
  };

  return (
    <aside className="hidden lg:flex fixed top-0 left-0 z-30 h-screen w-64 bg-[#123324] text-white flex-col justify-between border-r border-[#18412F] shadow-xl overflow-y-auto">
      {/* Top Section */}
      <div className="p-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-[#22563F] flex items-center justify-center text-white shadow-inner">
            <img
              src="https://res.cloudinary.com/zqgmlaym/image/upload/v1789666032/ChatGPT_Image_Sep_14_2026_07_40_37_PM.png"
              alt="ANZARI"
              className="w-6 h-6 stroke-[1.75]"
            />
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
        <div className="mt-5 mb-4">
          <button
            onClick={handleOpenAddProduct}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white text-[#123324] hover:bg-[#FAF7F2] font-semibold text-sm shadow-md transition-all active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4 text-[#123324]" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="mt-3 space-y-1" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#22563F] text-white shadow-sm font-semibold'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-white' : 'text-[#A7C7B7]'}`} />
                <span className="truncate">{item.label}</span>
                {item.badgeCount !== undefined && item.badgeCount !== null && (
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-black/20 text-[#D0E3D9]">
                    {item.badgeCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Database Status & Backend Connection */}
      <div className="p-5 border-t border-white/10 bg-black/15">
        <div className="flex items-center justify-between text-xs text-[#A7C7B7] mb-1.5">
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5" />
            <span>Backend Sync:</span>
          </div>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
            Prisma / Pg
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-white truncate">
            {stats?.dbStatus || 'Connected (Port 5000)'}
          </span>
        </div>
        <p className="text-[10px] text-white/50 mt-2 font-mono">
          ansari_furniture_web_backend
        </p>
      </div>
    </aside>
  );
}
