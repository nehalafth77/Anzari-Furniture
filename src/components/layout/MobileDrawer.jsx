import React from 'react';
import {
  X,
  LayoutDashboard,
  Armchair,
  FolderTree,
  Settings,
  PlusCircle,
  Database,
  LogOut
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
    currentUser,
    logout,
  } = useApp();

  if (!isMobileMenuOpen) return null;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, desc: 'Overview & Store Statistics' },
    { id: 'products', label: 'Products', icon: Armchair, desc: 'Manage Catalog & Stock' },
    { id: 'categories', label: 'Categories', icon: FolderTree, desc: 'Furniture Collections' },
    { id: 'settings', label: 'Settings', icon: Settings, desc: 'Store Info & System Tools' },
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
                <img src="https://res.cloudinary.com/zqgmlaym/image/upload/v1789666032/ChatGPT_Image_Sep_14_2026_07_40_37_PM.png" alt="ANZARI" className="w-6 h-6 stroke-[1.75]" />
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
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors touch-target-lg flex items-center justify-center"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Action */}
          <button
            onClick={handleOpenAdd}
            className="w-full mt-6 mb-6 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white text-[#123324] font-bold text-base shadow-lg transition-transform active:scale-95 touch-target-lg"
          >
            <PlusCircle className="w-5 h-5 text-[#123324]" />
            <span>+ Add New Product</span>
          </button>

          {/* Navigation Links */}
          <nav className="space-y-3" aria-label="Mobile Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all touch-target-lg ${isActive
                    ? 'bg-[#22563F] text-white font-bold border border-white/20 shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-white/90'
                    }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isActive ? 'bg-white text-[#123324]' : 'bg-white/10 text-[#A7C7B7]'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-base font-semibold">{item.label}</div>
                    <div className="text-xs text-white/60">{item.desc}</div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Drawer Footer */}
        <div className="pt-6 border-t border-white/10 mt-6">
          <div className="flex items-center gap-2 text-xs text-[#A7C7B7]">
            <Database className="w-4 h-4" />
            <span>Database:</span>
            <span className="font-semibold text-white">
              {stats?.dbStatus || 'Connected'}
            </span>
          </div>
          {currentUser && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#22563F] text-white flex items-center justify-center font-bold text-sm">
                    {currentUser.name?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-white">{currentUser.name}</p>
                    <p className="text-[11px] text-white/50">{currentUser.role}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white/70 hover:text-white hover:bg-red-600/30 border border-white/10 transition-all touch-target-lg"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
          <p className="text-xs text-white/40 mt-3">
            Optimized for Easy Mobile Store Management
          </p>
        </div>
      </div>
    </div>
  );
}
