import React from 'react';
import {
  Menu,
  Search,
  Bell,
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
  Calendar
} from 'lucide-react';

export default function TopNavbar({
  activeTab,
  onToggleSidebar,
  unreadNotifsCount,
  onOpenNotifications,
  onOpenStorePreview,
  searchQuery,
  setSearchQuery
}) {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Store Overview';
      case 'orders':
        return 'Orders Management';
      case 'products':
        return 'Furniture Catalogue';
      case 'categories':
        return 'Categories & Departments';
      case 'collections':
        return 'Curated Collections';
      case 'customers':
        return 'Patrons & Clients';
      case 'inventory':
        return 'Stock & Warehouses';
      case 'reviews':
        return 'Client Testimonials & Ratings';
      case 'coupons':
        return 'Promotions & Privilege Codes';
      case 'homepage':
        return 'Storefront Visual CMS';
      case 'content':
        return 'The Journal & Editorial';
      case 'analytics':
        return 'Revenue & Business Intelligence';
      case 'staff':
        return 'Staff & Governance Roles';
      case 'settings':
        return 'Enterprise Store Settings';
      default:
        return 'Console';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2D9] px-4 sm:px-8 flex items-center justify-between transition-all">
      {/* Left: Mobile toggle & Breadcrumb */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-[#524C44] hover:text-[#171715] hover:bg-[#EDE8E0] rounded-md transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2 text-xs text-[#6F685E]">
          <span className="font-serif-luxury text-sm font-medium tracking-wide text-[#8C7355] hidden sm:inline">
            Anzari Furniture
          </span>
          <ChevronRight size={13} className="text-[#A89F93] hidden sm:inline" />
          <h1 className="text-sm font-semibold text-[#171715] tracking-tight">
            {getTabTitle()}
          </h1>
        </div>
      </div>

      {/* Center: Global Search */}
      <div className="hidden md:flex items-center relative max-w-md w-full mx-6">
        <Search size={15} className="absolute left-3.5 text-[#9E978E]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products, orders, patrons, SKUs... (Press ⌘K)"
          className="w-full pl-10 pr-12 py-1.5 bg-[#F4F0EA] border border-[#E4DDD2] rounded-md text-xs text-[#171715] placeholder-[#9E978E] focus:outline-none focus:border-[#8C7355] focus:bg-[#FFFFFF] transition-all"
        />
        <span className="absolute right-3 text-[10px] font-mono uppercase bg-[#EAE3D6] text-[#6F685E] px-1.5 py-0.5 rounded border border-[#DDD4C6]">
          ⌘K
        </span>
      </div>

      {/* Right: Actions, Notifications, Storefront Preview & Avatar */}
      <div className="flex items-center gap-3">
        {/* Live Storefront Preview Button */}
        <button
          onClick={onOpenStorePreview}
          className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#171715] bg-[#EDE7DE] hover:bg-[#E4DCCE] border border-[#DDD5C7] rounded-md transition-all shadow-xs"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          <span>Store Preview</span>
          <ExternalLink size={12} className="text-[#6F685E]" />
        </button>

        {/* Notifications Button */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-[#524C44] hover:text-[#171715] hover:bg-[#EDE8E0] rounded-md transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
          {unreadNotifsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#A85D36] rounded-full ring-2 ring-[#FAF8F5]" />
          )}
        </button>

        <div className="h-5 w-[1px] bg-[#E8E2D9] mx-1" />

        {/* Admin Profile Chip */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Azjad Ansari"
              className="w-8 h-8 rounded-full object-cover border border-[#DDD5C7]"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-600 rounded-full ring-1 ring-white" />
          </div>
          <div className="hidden xl:block text-left">
            <span className="text-xs font-semibold text-[#171715] block leading-tight">
              Azjad Ansari
            </span>
            <span className="text-[10px] text-[#8C7355] font-medium tracking-wide">
              Principal Studio
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
