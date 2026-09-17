import React from 'react';
import { Search, Bell, LogOut, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Header() {
  const { globalSearch, setGlobalSearch, setActiveTab, currentUser, logout } = useApp();

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      setActiveTab('products');
    }
  };

  const initials = currentUser?.name
    ? currentUser.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'AD';

  return (
    <header className="hidden lg:block sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[#EAE4D9] px-8 py-4">
      <div className="flex items-center justify-between gap-6">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8275]" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search furniture products, categories..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm text-[#191816] placeholder-[#8C8275] focus:bg-white focus:border-[#18412F] transition-all"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDF5F0] border border-[#D0E3D9] text-xs font-semibold text-[#18412F]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Store Live</span>
          </div>

          <button
            className="relative p-2.5 rounded-xl border border-[#EAE4D9] hover:bg-[#F9F7F2] text-[#4F4B45] transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-600" />
          </button>

          {/* Admin Profile */}
          <div className="flex items-center gap-3 pl-3 border-l border-[#EAE4D9]">
            <div className="w-10 h-10 rounded-xl bg-[#123324] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              {initials}
            </div>
            <div className="text-left leading-tight">
              <div className="text-sm font-bold text-[#191816]">
                {currentUser?.name || 'Store Admin'}
              </div>
              <div className="text-xs text-[#8C8275]">Anzari Furniture</div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#4F4B45] hover:text-red-600 hover:bg-red-50 border border-[#EAE4D9] hover:border-red-200 transition-all"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
