import React from 'react';
import { Search, Sparkles, CheckCircle2, X } from 'lucide-react';

export default function FilterBar({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  categories,
  featuredOnly,
  setFeaturedOnly,
  stockFilter,
  setStockFilter,
  totalResults,
}) {
  const defaultCategories = ['All', 'Sofas', 'Chairs', 'Tables', 'Beds', 'Storage', 'Decor', 'Outdoor'];
  
  // Combine unique categories from API and defaults
  const categoryNames = Array.from(
    new Set(['All', ...categories.map((c) => c.name), ...defaultCategories.slice(1)])
  );

  const hasActiveFilters =
    search !== '' ||
    selectedCategory !== 'All' ||
    featuredOnly ||
    stockFilter !== 'All';

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setFeaturedOnly(false);
    setStockFilter('All');
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EAE4D9] p-4 sm:p-5 shadow-sm space-y-4">
      {/* Top Row: Search + Secondary Filter Toggles */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8275]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by furniture name, material or category..."
            className="w-full pl-10 pr-10 py-3 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm text-[#191816] placeholder-[#8C8275] focus:bg-white focus:border-[#18412F] transition-all touch-target-lg"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8C8275] hover:text-[#191816]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Badges & Reset */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Featured Toggle */}
          <button
            type="button"
            onClick={() => setFeaturedOnly(!featuredOnly)}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all touch-target-lg active:scale-95 ${
              featuredOnly
                ? 'bg-[#FAF3EA] text-[#9A6735] border-[#E9D9C3] shadow-sm font-bold'
                : 'bg-[#F9F7F2] text-[#4F4B45] border-[#EAE4D9] hover:bg-[#EAE4D9]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B88349]" />
            <span>Featured Only</span>
          </button>

          {/* Stock Filter Dropdown / Pill */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-xs font-semibold text-[#191816] hover:bg-[#EAE4D9] cursor-pointer touch-target-lg"
          >
            <option value="All">All Stock Status</option>
            <option value="In Stock">In Stock Only</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl transition-colors touch-target-lg"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills (Horizontal scrollable on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar -mx-1 px-1">
        <span className="text-xs font-bold text-[#8C8275] uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
          Category:
        </span>
        {categoryNames.map((catName) => {
          const isSelected = selectedCategory.toLowerCase() === catName.toLowerCase();
          return (
            <button
              key={catName}
              type="button"
              onClick={() => setSelectedCategory(catName)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all touch-target-lg active:scale-95 ${
                isSelected
                  ? 'bg-[#18412F] text-white shadow-sm'
                  : 'bg-[#F9F7F2] text-[#4F4B45] hover:bg-[#EAE4D9] border border-[#EAE4D9]'
              }`}
            >
              {catName}
            </button>
          );
        })}
      </div>

      {/* Results Count Line */}
      <div className="flex items-center justify-between text-xs text-[#8C8275] pt-1">
        <span>
          Showing <strong className="text-[#191816]">{totalResults}</strong> furniture item{totalResults === 1 ? '' : 's'}
        </span>
        {selectedCategory !== 'All' && (
          <span className="text-[#18412F] font-semibold">
            Filtered by "{selectedCategory}"
          </span>
        )}
      </div>
    </div>
  );
}
