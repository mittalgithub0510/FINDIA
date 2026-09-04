import React, { useState, useMemo } from 'react';
import {
  delhiPlaces,
  heroCarouselPlaces,
  delhiCategories,
} from '../../data/delhi';
import { DelhiHeroCarousel } from './components/DelhiHeroCarousel';
import { PlaceCard } from './components/PlaceCard';
import { Landmark, Sparkles } from '../../components/icons';
import { cn } from '../../utils/cn';

/**
 * Delhi City Destination Hub Page Component (Section 5).
 * Routes:
 * - /destinations/delhi
 * - /destination/north/delhi
 */
export function DelhiPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter places based on activeCategory
  const filteredPlaces = useMemo(() => {
    if (activeCategory === 'all') {
      return delhiPlaces;
    }
    return delhiPlaces.filter((place) => {
      if (Array.isArray(place.category)) {
        return place.category.includes(activeCategory);
      }
      return place.category === activeCategory;
    });
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-bg-base text-text-high pb-20">
      {/* 1. HERO CAROUSEL (5 Places: Red Fort, Qutub Minar, Humayun's Tomb, India Gate, Lotus Temple) */}
      <DelhiHeroCarousel places={heroCarouselPlaces} />

      {/* 2. EXPLORE DIRECTORY & CATEGORY FILTERS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="type-overline text-amber-400 font-mono flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>Delhi Destination Directory</span>
            </div>
            <h2 className="type-h1 font-display text-text-high mt-1">
              Explore Destinations in Delhi
            </h2>
            <p className="text-sm text-text-mid mt-1">
              Audited telemetry, verified entry schedules, and crowd telemetry across Delhi’s iconic monuments.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none max-w-full">
            {delhiCategories.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-fast shrink-0 cursor-pointer select-none border',
                    isActive
                      ? 'bg-amber-500 text-bg-base border-amber-400 font-bold shadow-md'
                      : 'bg-white/5 text-text-mid border-white/10 hover:text-text-high hover:bg-white/10'
                  )}
                >
                  {cat.id === 'Heritage' && <Landmark size={13} />}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. PLACES GRID */}
        {filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredPlaces.map((place) => (
              <PlaceCard key={place.id || place.slug} place={place} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl glass-panel border border-white/10 space-y-3">
            <p className="text-text-mid text-sm font-sans">
              No places found under the category "{activeCategory}".
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className="px-4 py-2 rounded-xl bg-amber-500 text-bg-base font-bold text-xs hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Show All Delhi Places
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default DelhiPage;
