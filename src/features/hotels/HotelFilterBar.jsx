import React from 'react';
import { Search } from '../../components/icons';

export function HotelFilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedZone,
  setSelectedZone,
  sortBy,
  setSortBy,
  categories,
  zones,
  totalResults
}) {
  return (
    <div className="space-y-4">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all shrink-0 flex items-center gap-2 border ${
                isActive
                  ? 'bg-[#C9A24B] text-[#0F0D0B] border-[#C9A24B] font-semibold shadow-sm'
                  : 'bg-[#1B1613] text-[#9C9186] border-[#322A22] hover:border-[#C9A24B]/40 hover:text-[#F3EBDC]'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  isActive ? 'bg-[#0F0D0B]/20 text-[#0F0D0B]' : 'bg-[#241E1A] text-[#9C9186]'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Secondary Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Search Bar */}
        <div className="sm:col-span-6 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9C9186]" />
          <input
            type="text"
            placeholder="Search hotel name, area, or attraction (e.g. Humayun's Tomb, CP, Aerocity)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1B1613] border border-[#322A22] text-xs text-[#F3EBDC] placeholder:text-[#9C9186] focus:outline-none focus:border-[#C9A24B]/60 transition-all"
          />
        </div>

        {/* Tourist Zone Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-[#1B1613] border border-[#322A22] text-xs text-[#F3EBDC] focus:outline-none focus:border-[#C9A24B]/60 transition-all"
          >
            <option value="all">All tourist zones</option>
            {zones.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="sm:col-span-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-[#1B1613] border border-[#322A22] text-xs text-[#F3EBDC] focus:outline-none focus:border-[#C9A24B]/60 transition-all"
          >
            <option value="rating">Sort: Top rated</option>
            <option value="priceAsc">Sort: Price (low to high)</option>
            <option value="priceDesc">Sort: Price (high to low)</option>
            <option value="valueScore">Sort: Value score</option>
          </select>
        </div>
      </div>

      {/* Results Counter */}
      <div className="flex items-center justify-between text-xs text-[#9C9186] pt-1">
        <span>Showing <strong className="text-[#F3EBDC] font-semibold">{totalResults}</strong> verified Delhi hotels</span>
        <span className="text-[10px] font-mono text-[#9C9186]">Updated SIH 2026 dataset</span>
      </div>
    </div>
  );
}

export default HotelFilterBar;
