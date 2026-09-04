import React, { useState, useMemo } from 'react';
import { Sparkles, Search } from '../../components/icons';
import { DELHI_HOTELS_DATA } from '../../data/delhi/hotels.js';
import { useCity } from '../../config/CityContext';
import HotelCard from './HotelCard';
import HotelFilterBar from './HotelFilterBar';
import HotelDetailModal from './HotelDetailModal';

export function HotelsView() {
  const { city } = useCity();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedZone, setSelectedZone] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedHotel, setSelectedHotel] = useState(null);

  const cityName = city?.name || 'Delhi';

  // Extract unique tourist zones
  const availableZones = useMemo(() => {
    const set = new Set();
    DELHI_HOTELS_DATA.forEach((h) => {
      if (h.nearbyTouristZones) {
        h.nearbyTouristZones.forEach((z) => set.add(z));
      }
    });
    return Array.from(set);
  }, []);

  // Compute category counts (sentence case)
  const categoryCounts = useMemo(() => {
    return [
      { id: 'all', label: 'All hotels', count: DELHI_HOTELS_DATA.length },
      { id: 'budget', label: 'Budget friendly (₹800–₹2.5k)', count: DELHI_HOTELS_DATA.filter((h) => h.category === 'budget').length },
      { id: 'moderate', label: 'Mid-range (₹2.5k–₹6k)', count: DELHI_HOTELS_DATA.filter((h) => h.category === 'moderate').length },
      { id: 'premium', label: 'Premium luxury (₹6k+)', count: DELHI_HOTELS_DATA.filter((h) => h.category === 'premium').length }
    ];
  }, []);

  // Filter and sort dataset
  const filteredHotels = useMemo(() => {
    return DELHI_HOTELS_DATA.filter((h) => {
      // Category filter
      if (selectedCategory !== 'all' && h.category !== selectedCategory) return false;

      // Zone filter
      if (selectedZone !== 'all' && (!h.nearbyTouristZones || !h.nearbyTouristZones.includes(selectedZone))) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = h.name.toLowerCase().includes(q);
        const matchArea = h.area.toLowerCase().includes(q);
        const matchAttraction = h.nearestAttractions && h.nearestAttractions.some((a) => a.name.toLowerCase().includes(q));
        if (!matchName && !matchArea && !matchAttraction) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceAsc') return a.priceMin - b.priceMin;
      if (sortBy === 'priceDesc') return b.priceMin - a.priceMin;
      if (sortBy === 'valueScore') return (b.valueScore || 0) - (a.valueScore || 0);
      return (b.rating || 0) - (a.rating || 0);
    });
  }, [searchQuery, selectedCategory, selectedZone, sortBy]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Feature Header Banner */}
      <div className="p-5 sm:p-7 rounded-[14px] bg-[#1B1613] border border-[#2E271F] relative overflow-hidden">
        <div className="relative z-10 space-y-2.5 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#C9A24B]/[0.07] text-[#C9A24B] text-xs font-medium border border-[#8A7238]">
            <Sparkles size={13} />
            <span>FINDIA location smart directory</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-medium font-['Fraunces',serif] text-[#F3EBDC] leading-tight">
            {cityName} hotels & heritage stays
          </h1>

          <p className="text-xs sm:text-sm text-[#9C9186] leading-relaxed">
            Discover verified accommodations strategically situated near key location tourist attractions, transit hubs, and metro lines. Filtered for budget, transit, and luxury travelers.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#9C9186] pt-1">
            <div className="flex items-center gap-1.5 font-medium text-[#F3EBDC]">
              <span className="w-2 h-2 rounded-full bg-[#5FA97C] animate-pulse" />
              <span>48 verified properties</span>
            </div>
            <span>•</span>
            <span>Exact transit walking distances</span>
            <span>•</span>
            <span>Contextual AI suitability</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <HotelFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categoryCounts}
        zones={availableZones}
        totalResults={filteredHotels.length}
      />

      {/* Hotel Cards Grid */}
      {filteredHotels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} onSelect={setSelectedHotel} />
          ))}
        </div>
      ) : (
        <div className="p-10 text-center space-y-4 rounded-[14px] bg-[#1B1613] border border-[#2E271F]">
          <div className="w-12 h-12 rounded-full bg-[#17130F] border border-[#2E271F] flex items-center justify-center mx-auto text-[#9C9186]">
            <Search size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-medium text-[#F3EBDC]">No hotels match your filters</h3>
            <p className="text-xs text-[#9C9186] max-w-sm mx-auto">
              Try adjusting your search query, selecting "All hotels" or clearing the tourist zone filter.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedZone('all');
            }}
            className="px-4 py-2 rounded-full bg-[#C9A24B] text-[#1B1613] font-semibold text-xs hover:brightness-110 transition-all cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedHotel && (
        <HotelDetailModal hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />
      )}
    </div>
  );
}

export default HotelsView;
