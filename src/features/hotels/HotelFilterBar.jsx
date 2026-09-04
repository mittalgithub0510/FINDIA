import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from '../../components/icons';

function CustomDropdown({ value, options, onChange, icon: Icon }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3.5 py-2 rounded-xl bg-[#1B1613] border border-[#322A22] hover:border-[#C9A24B]/50 text-xs text-[#F3EBDC] flex items-center justify-between transition-all cursor-pointer font-medium"
      >
        <span className="truncate flex items-center gap-2">
          {Icon && <Icon size={14} className="text-[#9C9186]" />}
          <span>{selectedOption ? selectedOption.label : ''}</span>
        </span>
        <ChevronDown
          size={14}
          className={`text-[#9C9186] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#C9A24B]' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 z-40 bg-[#1B1613] border border-[#322A22] rounded-xl shadow-2xl py-1.5 max-h-60 overflow-y-auto scrollbar-none">
          {options.map((opt) => {
            const isSelected = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3.5 py-2 text-left text-xs transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#C9A24B]/15 text-[#C9A24B] font-semibold'
                    : 'text-[#F3EBDC] hover:bg-[#241E1A]'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check size={12} className="text-[#C9A24B]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

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
  const zoneOptions = [
    { value: 'all', label: 'All tourist zones' },
    ...zones.map((z) => ({ value: z, label: z }))
  ];

  const sortOptions = [
    { value: 'rating', label: 'Sort: Top rated' },
    { value: 'priceAsc', label: 'Sort: Price (low to high)' },
    { value: 'priceDesc', label: 'Sort: Price (high to low)' },
    { value: 'valueScore', label: 'Sort: Value score' }
  ];

  return (
    <div className="space-y-2.5">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 flex items-center gap-1.5 border cursor-pointer ${
                isActive
                  ? 'bg-[#C9A24B] text-[#0F0D0B] border-[#C9A24B] font-semibold shadow-sm'
                  : 'bg-[#1B1613] text-[#9C9186] border-[#322A22] hover:border-[#C9A24B]/40 hover:text-[#F3EBDC]'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive ? 'bg-[#0F0D0B]/20 text-[#0F0D0B]' : 'bg-[#241E1A] text-[#9C9186]'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Secondary Custom Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 relative z-20">
        {/* Search Bar */}
        <div className="sm:col-span-6 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9C9186]" />
          <input
            type="text"
            placeholder="Search hotel name, area, or attraction..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#1B1613] border border-[#322A22] text-xs text-[#F3EBDC] placeholder:text-[#9C9186] focus:outline-none focus:border-[#C9A24B]/60 transition-all"
          />
        </div>

        {/* Tourist Zone Custom Dropdown */}
        <div className="sm:col-span-3">
          <CustomDropdown
            value={selectedZone}
            options={zoneOptions}
            onChange={setSelectedZone}
          />
        </div>

        {/* Sort By Custom Dropdown */}
        <div className="sm:col-span-3">
          <CustomDropdown
            value={sortBy}
            options={sortOptions}
            onChange={setSortBy}
          />
        </div>
      </div>

      {/* Results Counter (Clean without SIH label) */}
      <div className="flex items-center justify-between text-xs text-[#9C9186] px-0.5 pt-0.5">
        <span>Showing <strong className="text-[#F3EBDC] font-semibold">{totalResults}</strong> verified hotels</span>
        <span className="text-[11px] text-[#5FA97C] font-medium">Verified directory</span>
      </div>
    </div>
  );
}

export default HotelFilterBar;
