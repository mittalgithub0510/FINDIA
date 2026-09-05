import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  PRAYAGRAJ_HERO_CAROUSEL,
  PRAYAGRAJ_CATEGORIES,
  PRAYAGRAJ_PLACES,
} from '../../data/prayagrajData';
import { useCity } from '../../config/CityContext';
import {
  MapPin,
  Clock,
  Ticket,
  Navigation,
  Landmark,
  Sparkles,
  ShoppingBag,
  Utensils,
  ChevronLeft,
  ChevronRight,
  Crowd,
  ArrowRight,
} from '../../components/icons';
import { cn } from '../../utils/cn';
import { LiveTelemetrySnapshotCard } from '../../components/common/LiveTelemetrySnapshotCard';

const PRAYAGRAJ_TELEMETRY_ITEMS = [
  {
    title: 'Triveni Sangam (Kila Ghat)',
    status: 'Sunrise boat slots open',
    badgeText: '18% Calm',
    badgeType: 'quiet',
  },
  {
    title: 'Anand Bhavan Museum',
    status: 'Garden spaces & library open',
    badgeText: '28% Open',
    badgeType: 'open',
  },
  {
    title: 'Bade Hanuman Ji Temple',
    status: '35 min queue',
    badgeText: '82% Peak',
    badgeType: 'peak',
  },
];

/**
 * Prayagraj City Destination Page Component.
 * Route: /destination/north/prayagraj or /destinations/prayagraj
 */
export function PrayagrajPage() {
  const { setCity } = useCity();

  // Ensure active city is set to prayagraj
  useEffect(() => {
    if (setCity) {
      setCity('prayagraj');
    }
  }, [setCity]);

  // Carousel State
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const carouselTimerRef = useRef(null);

  // Category Filter State
  const [activeCategory, setActiveCategory] = useState('monuments');

  // Auto slide hero carousel
  useEffect(() => {
    if (isCarouselPaused) return;
    carouselTimerRef.current = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % PRAYAGRAJ_HERO_CAROUSEL.length);
    }, 4500);

    return () => {
      if (carouselTimerRef.current) clearInterval(carouselTimerRef.current);
    };
  }, [isCarouselPaused]);

  // Filtered places
  const filteredPlaces = PRAYAGRAJ_PLACES.filter(
    (place) => place.category === activeCategory
  );

  const activeHeroItem = PRAYAGRAJ_HERO_CAROUSEL[currentHeroIndex];

  return (
    <div className="min-h-screen bg-bg-base text-text-high pb-16">
      {/* 1. HERO SECTION: AUTO-SLIDING PHOTO CAROUSEL */}
      <section
        className="relative w-full h-[68vh] min-h-[520px] max-h-[760px] overflow-hidden group select-none"
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => setIsCarouselPaused(false)}
      >
        {/* Background Image Carousel Slides */}
        {PRAYAGRAJ_HERO_CAROUSEL.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000 ease-in-out',
              index === currentHeroIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            )}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-out group-hover:scale-100"
            />
            {/* Scrim Overlays */}
            <div className="absolute inset-0 scrim-full" />
            <div className="absolute inset-0 scrim-bottom opacity-90" />
          </div>
        ))}

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end w-full">
            {/* Left Column (8 cols): Title, Subtitle, Telemetry Chips */}
            <div className="lg:col-span-8 space-y-3">
              {/* City Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-chip text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider font-mono">
                <MapPin size={13} className="text-amber-400" />
                <span>Prayagraj Live MVP • Uttar Pradesh</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              {/* Slide Title & Subtitle */}
              <h1 className="type-display-xl text-text-high font-display font-extrabold tracking-tight drop-shadow-md">
                {activeHeroItem.title}
              </h1>
              <p className="type-body-lg text-text-mid font-sans max-w-2xl text-shadow-sm">
                {activeHeroItem.subtitle}
              </p>

              {/* Quick telemetry indicators */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-text-mid font-medium pointer-events-auto">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/50 backdrop-blur border border-white/15 text-text-high">
                  <MapPin size={14} className="text-amber-400" />
                  <span>{activeHeroItem.location}</span>
                </span>

                <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/50 backdrop-blur border border-white/15 text-text-high">
                  <Crowd size={14} className="text-emerald-400" />
                  <span>Live Crowd: {activeHeroItem.crowdLevel === 'low' ? 'Peaceful' : 'Moderate'}</span>
                </span>

                <Link
                  to={`/destinations/prayagraj/${activeHeroItem.slug || activeHeroItem.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-bg-base font-bold text-xs transition-colors shadow-lifted"
                >
                  <span>Explore Site</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Column (4 cols): LIVE TELEMETRY SNAPSHOT Card */}
            <div className="hidden lg:block lg:col-span-4 pointer-events-auto">
              <LiveTelemetrySnapshotCard
                cityName="Prayagraj"
                citySlug="prayagraj"
                items={PRAYAGRAJ_TELEMETRY_ITEMS}
                recommendation="Take an authorized sunrise wooden boat to Sangam; visit Lete Hanuman Ji early morning to bypass peak festival rush."
                className="ml-auto"
              />
            </div>
          </div>
        </div>

        {/* Carousel Prev / Next Controls */}
        <button
          type="button"
          aria-label="Previous Slide"
          onClick={() =>
            setCurrentHeroIndex(
              (prev) =>
                (prev - 1 + PRAYAGRAJ_HERO_CAROUSEL.length) %
                PRAYAGRAJ_HERO_CAROUSEL.length
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full glass-heavy text-text-high hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          aria-label="Next Slide"
          onClick={() =>
            setCurrentHeroIndex(
              (prev) => (prev + 1) % PRAYAGRAJ_HERO_CAROUSEL.length
            )
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full glass-heavy text-text-high hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>

        {/* Carousel Indicators / Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full glass-chip border border-white/10">
          {PRAYAGRAJ_HERO_CAROUSEL.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setCurrentHeroIndex(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-base cursor-pointer',
                index === currentHeroIndex
                  ? 'w-6 bg-amber-400'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              )}
            />
          ))}
        </div>
      </section>

      {/* 2. CATEGORY TABS / FILTERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="type-overline text-amber-400 font-mono">
              Prayagraj City Guide • Uttar Pradesh
            </div>
            <h2 className="type-h1 font-display text-text-high mt-1">
              Explore Destinations in Prayagraj
            </h2>
            <p className="text-sm text-text-mid mt-1">
              Sacred confluence ghats, Mughal citadels, colonial monuments, and legendary 1854 street food.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {PRAYAGRAJ_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const isFoodCategory = cat.type === 'food_badge';

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-fast shrink-0 cursor-pointer select-none border',
                    isFoodCategory
                      ? isActive
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-bg-base border-amber-400 shadow-lg shadow-orange-500/25 scale-105 font-bold'
                        : 'bg-orange-500/15 text-orange-300 border-orange-500/40 hover:bg-orange-500/25 hover:border-orange-400'
                      : isActive
                        ? 'bg-amber-500 text-bg-base border-amber-400 font-bold shadow-md'
                        : 'bg-white/5 text-text-mid border-white/10 hover:text-text-high hover:bg-white/10'
                  )}
                >
                  {cat.id === 'monuments' && <Landmark size={15} />}
                  {cat.id === 'adventure' && <Sparkles size={15} />}
                  {cat.id === 'malls' && <ShoppingBag size={15} />}
                  {cat.id === 'food' && <Utensils size={15} className={isActive ? 'text-bg-base' : 'text-orange-400'} />}
                  <span>{cat.label}</span>
                  {isFoodCategory && (
                    <span className={cn(
                      'text-[9px] uppercase px-1.5 py-0.5 rounded font-mono font-bold',
                      isActive ? 'bg-bg-base text-orange-400' : 'bg-orange-500 text-white'
                    )}>
                      ICONIC
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. PLACES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
          {filteredPlaces.map((place) => {
            const isFood = place.category === 'food';

            return (
              <div
                key={place.id}
                className={cn(
                  'group flex flex-col rounded-2xl overflow-hidden glass-panel border transition-all duration-base hover:-translate-y-1 shadow-card',
                  isFood
                    ? 'border-orange-500/30 hover:border-orange-400/60'
                    : 'border-white/10 hover:border-amber-500/50'
                )}
              >
                {/* Place Image + Badges */}
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-slow group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-black/30" />

                  {/* Crowd Level Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={cn(
                        'px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono glass-chip flex items-center gap-1.5 border',
                        place.crowdLevel === 'low' && 'text-emerald-300 border-emerald-500/40 bg-emerald-950/60',
                        place.crowdLevel === 'moderate' && 'text-amber-300 border-amber-500/40 bg-amber-950/60',
                        place.crowdLevel === 'heavy' && 'text-rose-300 border-rose-500/40 bg-rose-950/60'
                      )}
                    >
                      <span
                        className={cn(
                          'w-1.5 h-1.5 rounded-full',
                          place.crowdLevel === 'low' && 'bg-emerald-400',
                          place.crowdLevel === 'moderate' && 'bg-amber-400',
                          place.crowdLevel === 'heavy' && 'bg-rose-400 animate-pulse'
                        )}
                      />
                      <span>{place.crowdLevel} Crowd</span>
                    </span>
                  </div>

                  {/* District Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-text-high bg-black/50 backdrop-blur border border-white/15">
                      {place.district}
                    </span>
                  </div>

                  {/* Food Badge Tag if Food category */}
                  {isFood && (
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-md bg-orange-500 text-bg-base font-bold text-[10px] uppercase font-mono shadow-md">
                        ★ Culinary Landmark
                      </span>
                    </div>
                  )}
                </div>

                {/* Place Details Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="type-h3 font-display text-text-high group-hover:text-amber-300 transition-colors">
                      {place.name}
                    </h3>
                    <p className="text-xs text-text-mid line-clamp-2 leading-relaxed">
                      {place.shortDesc}
                    </p>
                  </div>

                  {/* Metadata Chips */}
                  <div className="space-y-2 text-xs text-text-mid border-t border-white/10 pt-3">
                    <div className="flex items-center gap-2">
                      <Navigation size={14} className="text-amber-400 shrink-0" />
                      <span className="truncate">{place.nearestMetro}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Ticket size={13} className="text-text-low shrink-0" />
                        <span className="text-[11px]">{place.ticketPrice}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-text-low text-[11px]">
                        <Clock size={13} />
                        <span>{place.openingHours.split(' ')[0]}</span>
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={`/destinations/prayagraj/${place.slug}`}
                    className={cn(
                      'w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-xs transition-colors outline-none',
                      isFood
                        ? 'bg-orange-500/20 text-orange-200 border border-orange-500/40 hover:bg-orange-500 hover:text-bg-base'
                        : 'bg-amber-500/20 text-amber-200 border border-amber-500/40 hover:bg-amber-500 hover:text-bg-base'
                    )}
                  >
                    <span>View Place Details</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default PrayagrajPage;
