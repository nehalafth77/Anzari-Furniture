import React from 'react';
import {
  X,
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
  LogOut,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function MobileDrawer() {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    activeTab,
    setActiveTab,
    setIsAddProductOpen,
    setEditingProduct,
    stats,
    orders,
    users,
    currentUser,
    logout,
  } = useApp();

  if (!isMobileMenuOpen) return null;

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

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsAddProductOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Slide-out Drawer */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#123324] text-white flex flex-col justify-between shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-left duration-300">
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#22563F] flex items-center justify-center text-white">
                <img
                  src="https://res.cloudinary.com/zqgmlaym/image/upload/v1789666032/ChatGPT_Image_Sep_14_2026_07_40_37_PM.png"
                  alt="ANZARI"
                  className="w-6 h-6 stroke-[1.75]"
                />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold tracking-wide text-white">
                  ANZARI
                </h2>
                <p className="text-xs text-[#A7C7B7]">Admin Menu</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Action */}
          <button
            onClick={handleOpenAdd}
            className="w-full mt-5 mb-5 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-[#123324] font-bold text-sm shadow-lg transition-transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-[#123324]" />
            <span>+ Add New Product</span>
          </button>

          {/* Navigation Links */}
          <nav className="space-y-1.5" aria-label="Mobile Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-[#22563F] text-white font-bold border border-white/20 shadow-md'
                      : 'bg-white/5 hover:bg-white/10 text-white/90'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-[#A7C7B7]'}`} />
                  <span className="text-sm font-medium">{item.label}</span>
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

        {/* User Info & Logout */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#22563F] flex items-center justify-center font-bold text-xs">
                {currentUser?.name ? currentUser.name[0] : 'A'}
              </div>
              <div className="text-xs">
                <p className="font-bold text-white truncate max-w-[130px]">
                  {currentUser?.name || 'Administrator'}
                </p>
                <p className="text-[#A7C7B7] text-[11px]">Online</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-2 rounded-xl bg-white/10 hover:bg-red-500/20 text-white/80 hover:text-red-300 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
