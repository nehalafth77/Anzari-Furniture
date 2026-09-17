import React from 'react';
import { Menu, Plus, Armchair } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function MobileHeader() {
  const {
    setIsMobileMenuOpen,
    setIsAddProductOpen,
    setEditingProduct,
  } = useApp();

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsAddProductOpen(true);
  };

  return (
    <header className="lg:hidden sticky top-0 z-40 bg-[#123324] text-white border-b border-[#18412F] shadow-md px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex items-center gap-2 p-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all touch-target-lg"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-6 h-6 text-white" />
          <span className="text-xs font-semibold tracking-wide uppercase">Menu</span>
        </button>

        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#22563F] flex items-center justify-center text-white">
            <img src="https://res.cloudinary.com/zqgmlaym/image/upload/v1789666032/ChatGPT_Image_Sep_14_2026_07_40_37_PM.png" alt="ANZARI" className="w-4 h-4" />
          </div>
          <span className="font-serif font-bold text-lg tracking-wide text-[#FAF7F2]">
            ANZARI
          </span>
        </div>


      </div>
    </header>
  );
}
