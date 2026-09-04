import React from 'react';
import { Search, Filter, Sparkles } from '../../components/icons';

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
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 border ${
                isActive
                  ? 'bg-amber-500 text-bg-base border-amber-400 shadow-lifted'
                  : 'bg-black/40 text-text-mid border-white/10 hover:border-white/25 hover:text-text-high'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive ? 'bg-bg-base/20 text-bg-base' : 'bg-white/10 text-text-low'
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
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-low" />
          <input
            type="text"
            placeholder="Search hotel name, area, or attraction (e.g. Humayun's Tomb, CP, Aerocity)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-text-high placeholder:text-text-low focus:outline-none focus:border-amber-400/60 transition-all"
          />
        </div>

        {/* Tourist Zone Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-text-high focus:outline-none focus:border-amber-400/60 transition-all"
          >
            <option value="all">All Tourist Zones</option>
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
            className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-text-high focus:outline-none focus:border-amber-400/60 transition-all"
          >
            <option value="rating">Sort: Top Rated</option>
            <option value="priceAsc">Sort: Price (Low to High)</option>
            <option value="priceDesc">Sort: Price (High to Low)</option>
            <option value="valueScore">Sort: FINDIA Value Score</option>
          </select>
        </div>
      </div>

      {/* Results Counter */}
      <div className="flex items-center justify-between text-xs text-text-mid pt-1">
        <span>Showing <strong className="text-amber-300 font-mono">{totalResults}</strong> verified Delhi hotels</span>
        <span className="text-[10px] font-mono text-text-low">Updated SIH 2026 Telemetry Dataset</span>
      </div>
    </div>
  );
}

export default HotelFilterBar;
