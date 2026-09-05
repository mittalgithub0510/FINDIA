import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { resolveDelhiImage } from '../../../data/delhi/images';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  ArrowRight,
  Star,
  Clock,
} from '../../../components/icons';
import { cn } from '../../../utils/cn';

/**
 * Delhi Destination Hero Carousel.
 * Features:
 * - 5 Phase-1 places (Red Fort, Qutub Minar, Humayun's Tomb, India Gate, Lotus Temple)
 * - Autoplay with pause-on-hover
 * - Manual prev/next navigation
 * - Touch swipe support for mobile
 * - Whole-card clickability with double-fire prevention
 *
 * @param {Object} props
 * @param {Object[]} props.places - 5 Hero places from heroCarouselPlaces
 */
export function DelhiHeroCarousel({ places = [] }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const total = places.length;
  const currentPlace = places[currentIndex] || places[0];

  // Auto-slide effect
  useEffect(() => {
    if (isPaused || total <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, total]);

  // Handle slide transition
  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    const threshold = 50; // minimum swipe distance
    if (diff > threshold) {
      handleNext();
    } else if (diff < -threshold) {
      handlePrev();
    }
  };

  // Whole-card click navigation
  const handleNavigateToPlace = (slug) => {
    navigate(`/destinations/delhi/${slug}`);
  };

  if (!currentPlace) return null;

  return (
    <section
      className="relative w-full h-[65vh] min-h-[480px] max-h-[700px] overflow-hidden group select-none cursor-pointer"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={() => handleNavigateToPlace(currentPlace.slug)}
      role="region"
      aria-label="Delhi Hero Carousel"
    >
      {/* Background Slides */}
      {places.map((place, index) => {
        const isCurrent = index === currentIndex;
        const imageUrl = resolveDelhiImage(place.heroImage);

        return (
          <div
            key={place.id || place.slug}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000 ease-in-out',
              isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            )}
          >
            <img
              src={imageUrl}
              alt={place.name}
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-out group-hover:scale-100"
            />
            {/* Scrim Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-[#12100E]/50 to-black/25" />
          </div>
        );
      })}

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 pointer-events-none">
        <div className="max-w-3xl space-y-3.5">
          {/* Tags & Badges */}
          <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-mono uppercase tracking-wider bg-black/60 backdrop-blur border border-amber-500/40 text-amber-300">
              <MapPin size={12} className="text-amber-400" />
              <span>{currentPlace.location}</span>
            </span>

            {Array.isArray(currentPlace.category) &&
              currentPlace.category.map((cat) => (
                <span
                  key={cat}
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-white/10 backdrop-blur border border-white/10 text-neutral-200"
                >
                  {cat}
                </span>
              ))}

            {currentPlace.rating && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                <span>{currentPlace.rating}</span>
              </span>
            )}
          </div>

          {/* Slide Title */}
          <h1 className="type-display-xl text-text-high font-display font-black tracking-tight drop-shadow-md">
            {currentPlace.name}
          </h1>

          {/* 1–2 Line Description */}
          <p className="type-body text-neutral-200 text-sm sm:text-base leading-relaxed max-w-2xl font-sans drop-shadow-sm line-clamp-2">
            {currentPlace.description?.short}
          </p>

          {/* Visit duration & Explore Button */}
          <div className="flex items-center gap-4 pt-2 pointer-events-auto">
            {currentPlace.estimatedVisitTime && (
              <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-mono">
                <Clock size={14} className="text-amber-400" />
                <span>Est. Visit: {currentPlace.estimatedVisitTime}</span>
              </div>
            )}

            {/* Explore Button (stopPropagation so no double fire) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigateToPlace(currentPlace.slug);
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-bg-base font-bold text-xs transition-all shadow-lifted cursor-pointer"
            >
              <span>Explore</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Manual Prev / Next Controls */}
      <button
        type="button"
        aria-label="Previous Slide"
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full glass-heavy text-text-high hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer pointer-events-auto"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        type="button"
        aria-label="Next Slide"
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full glass-heavy text-text-high hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer pointer-events-auto"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full glass-chip border border-white/10 pointer-events-auto">
        {places.map((place, index) => (
          <button
            key={place.id || place.slug}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={cn(
              'h-2 rounded-full transition-all duration-base cursor-pointer',
              index === currentIndex
                ? 'w-6 bg-amber-400'
                : 'w-2 bg-white/40 hover:bg-white/70'
            )}
          />
        ))}
      </div>
    </section>
  );
}

export default DelhiHeroCarousel;
