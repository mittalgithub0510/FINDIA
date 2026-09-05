import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DESTINATIONS_CONFIG } from '../../data/destinationsData';
import { GlassPanel } from '../common/GlassPanel';
import { Button } from '../common/Button';
import { Container } from '../layout/Container';
import { Search, MapPin, Sparkle, Compass, CheckCircle2 } from '../icons';
import { cn } from '../../utils/cn';

/**
 * 5 Regional background slides matching user-uploaded images in exact order:
 * 1. Delhi (Red Fort)
 * 2. Himalayas (Mountain Valley & Lake)
 * 3. Varanasi (Ghats & Boats)
 * 4. Kerala (Backwaters Houseboat)
 * 5. Rajasthan (Jaipur Hawa Mahal)
 */
const HERO_BACKGROUND_SLIDES = [
  {
    id: 'delhi',
    name: 'DELHI',
    url: '/images/home/hero/delhi.png',
    title: 'Delhi Red Fort',
    position: 'object-center',
  },
  {
    id: 'himalayas',
    name: 'HIMALAYAS',
    url: '/images/home/hero/himalayas.png',
    title: 'Himalayan Valleys',
    position: 'object-center',
  },
  {
    id: 'varanasi',
    name: 'VARANASI',
    url: '/images/home/hero/varanasi.png',
    title: 'Varanasi Ghats',
    position: 'object-center',
  },
  {
    id: 'kerala',
    name: 'KERALA',
    url: '/images/home/hero/kerala.png',
    title: 'Kerala Backwaters',
    position: 'object-center',
  },
  {
    id: 'rajasthan',
    name: 'RAJASTHAN',
    url: '/images/home/hero/rajasthan.jpg',
    title: 'Rajasthan Forts',
    position: 'object-top sm:object-center',
  },
];

/**
 * Animated Count-Up component for stat numbers on page load/refresh
 */
function AnimatedNumber({ target, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // 1.2s count up
    const steps = 30;
    const increment = target / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

/**
 * FINDIA Homepage Hero Section (Implementation Spec V3 - Simplified & Unified)
 */
export function HeroSection() {
  const navigate = useNavigate();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);

  // Auto-advance slideshow every 5 seconds (5000ms) with crossfade
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_BACKGROUND_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Flatten states list from DESTINATIONS_CONFIG for search suggestions
  const allDestinations = DESTINATIONS_CONFIG.flatMap((region) =>
    region.states.map((state) => ({
      ...state,
      regionName: region.region,
    }))
  );

  const filteredDestinations = searchQuery.trim() === ''
    ? allDestinations
    : allDestinations.filter((d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.regionName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectDestination = (dest) => {
    setIsSearchFocused(false);
    if (dest.isLive) {
      navigate(dest.path || '/destination/north/delhi');
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-32 pb-8 sm:pb-12 select-none bg-bg-base">

      {/* Background Slideshow with 5-Second Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_BACKGROUND_SLIDES.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.url}
            alt={slide.title}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out',
              slide.position || 'object-center',
              index === currentSlideIndex ? 'opacity-80 sm:opacity-75' : 'opacity-0 pointer-events-none'
            )}
          />
        ))}

        {/* Top/Middle Scrim Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-base/75 via-bg-base/30 via-65% to-transparent pointer-events-none" />

        {/* Seamless Bottom Gradient Fade to Next Section */}
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-bg-base via-bg-base/85 to-transparent pointer-events-none" />

        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
      </div>

      {/* Main Hero Container */}
      <Container size="wide" className="relative z-30 w-full pt-2 sm:pt-4 space-y-5 sm:space-y-6 my-auto">

        {/* Top Row: Headline & Value Prop on Left (8 cols), Transparent Telemetry Snapshot on Right (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-end">

          {/* Left Column (8 cols): Expanded space for Large Grand Headline */}
          <div className="lg:col-span-8 space-y-3 sm:space-y-4">

            {/* Top Status Pill: 🟢 DELHI LIVE MVP */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-amber-500/30 text-xs font-mono text-amber-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-emerald-300 uppercase tracking-wider">
                DELHI LIVE MVP
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-[5.2rem] text-text-high tracking-tight leading-[1.03]">
                From guiding tourists <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                  to guiding tourism.
                </span>
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="type-body text-text-mid text-base sm:text-xl max-w-2xl leading-relaxed">
              Discover destinations tailored to your interests, budget, available time, and contextual tourism signals — powered by FINDIA&apos;s AI tourism decision engine.
            </p>
          </div>

          {/* Right Column (4 cols): Fully Transparent Glassmorphic DEMO TELEMETRY SNAPSHOT Card */}
          <div className="lg:col-span-4">
            <div
              className="p-3.5 rounded-2xl border border-white/15 shadow-glass space-y-2 backdrop-blur-md bg-black/10 hover:bg-black/20 transition-all max-w-xs sm:max-w-[340px] mx-auto lg:ml-auto"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-mono text-xs">◉</span>
                  <span className="text-[10px] uppercase font-mono font-bold text-amber-300 tracking-wider">
                    DEMO TELEMETRY SNAPSHOT
                  </span>
                </div>
                <span className="text-[9px] text-text-low font-mono">Illustrative Data</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between p-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs backdrop-blur-sm">
                  <div>
                    <div className="font-bold text-text-high text-xs">Agrasen Ki Baoli</div>
                    <div className="text-[9px] text-emerald-300 font-mono">0 min line</div>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    24% Quiet
                  </span>
                </div>

                <div className="flex items-center justify-between p-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs backdrop-blur-sm">
                  <div>
                    <div className="font-bold text-text-high text-xs">Humayun&apos;s Tomb</div>
                    <div className="text-[9px] text-emerald-300 font-mono">Garden spaces open</div>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    32% Open
                  </span>
                </div>

                <div className="flex items-center justify-between p-1.5 rounded-xl bg-white/[0.04] border border-amber-500/30 text-xs backdrop-blur-sm">
                  <div>
                    <div className="font-bold text-amber-200 text-xs">Qutub Minar</div>
                    <div className="text-[9px] text-amber-400 font-mono">45 min queue</div>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    88% Peak
                  </span>
                </div>
              </div>

              {/* Conceptual Demand Redistribution Recommendation */}
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs space-y-0.5 backdrop-blur-sm">
                <div className="font-bold text-amber-300 font-mono flex items-center gap-1 text-[9px]">
                  <CheckCircle2 size={11} className="text-emerald-400" />
                  <span>FINDIA Recommendation</span>
                </div>
                <div className="text-[9px] text-text-mid leading-tight">
                  A lower-demand heritage alternative may better fit this visitor&apos;s interests and available time.
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Wider Bottom Horizontal Action Bar */}
        <div ref={searchContainerRef} className="relative w-full max-w-6xl mx-auto z-[90] pt-1">
          <GlassPanel
            tier="heavy"
            className={cn(
              'p-2.5 sm:p-3 rounded-2xl border transition-all duration-300 shadow-lifted relative z-[90]',
              isSearchFocused
                ? 'border-amber-400/80 ring-2 ring-amber-400/30 bg-bg-raised/95'
                : 'border-white/20 hover:border-amber-500/40'
            )}
          >
            <div className="flex flex-col md:flex-row items-center gap-2">

              {/* Destination Search Dropdown Trigger Input */}
              <div className="relative flex-1 w-full">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                  <Search size={18} className="text-amber-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onFocus={() => setIsSearchFocused(true)}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchFocused(true);
                    }}
                    placeholder="Search 36 States, UTs, or heritage spots (e.g. Delhi, Jaipur, Kerala)..."
                    className="w-full bg-transparent text-sm text-text-high placeholder:text-text-low focus:outline-none font-sans"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-text-low hover:text-text-high px-1.5 py-0.5 rounded bg-white/10"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Instant Search Suggestions Popover Menu */}
                {isSearchFocused && (
                  <div className="absolute top-full left-0 right-0 mt-2 z-[100] bg-[#17130F] border border-[#2E271F] rounded-2xl shadow-2xl overflow-hidden p-3 space-y-2 animate-in fade-in zoom-in-95 duration-fast max-h-80 overflow-y-auto">
                    <div className="flex items-center justify-between text-[11px] font-mono uppercase text-amber-400 font-bold px-2 pb-1 border-b border-[#2E271F]">
                      <span>Select Destination ({filteredDestinations.length})</span>
                      <span className="text-[10px] text-text-low font-normal">Delhi Live</span>
                    </div>

                    {filteredDestinations.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {filteredDestinations.map((dest) => (
                          <div
                            key={dest.slug}
                            onClick={() => handleSelectDestination(dest)}
                            className={cn(
                              'flex items-center justify-between p-2 rounded-xl text-xs transition-colors cursor-pointer border',
                              dest.isLive
                                ? 'bg-[#C9A24B]/15 border-[#8A7238] text-[#F3EBDC] hover:bg-[#C9A24B]/25'
                                : 'bg-[#1B1613] border-[#2E271F] text-[#9C9186] hover:bg-[#241E1A] hover:text-[#F3EBDC]'
                            )}
                          >
                            <span className="flex items-center gap-2 truncate">
                              <MapPin size={13} className={dest.isLive ? 'text-[#C9A24B]' : 'text-[#9C9186]'} />
                              <span className="font-semibold truncate">{dest.name}</span>
                            </span>
                            {dest.isLive ? (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#5FA97C]/20 text-[#5FA97C] border border-[#5FA97C]/40 shrink-0">
                                LIVE
                              </span>
                            ) : (
                              <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-300 border border-blue-500/40 shrink-0">
                                Soon
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-xs text-text-mid">
                        No destination found for &quot;{searchQuery}&quot;
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/destination/north/delhi')}
                  leftIcon={<Compass size={16} />}
                  className="w-full md:w-auto font-bold shadow-lifted py-2.5 px-5"
                >
                  Explore Delhi Live
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => navigate('/findia-ai')}
                  leftIcon={<Sparkle size={16} className="text-amber-400" />}
                  className="w-full md:w-auto font-semibold py-2.5 px-4"
                >
                  AI Assistant
                </Button>
              </div>

            </div>
          </GlassPanel>
        </div>

        {/* Slideshow Indicator Dots — Placed ABOVE bottom stat border line */}
        <div className="flex items-center justify-center gap-2 py-1">
          {HERO_BACKGROUND_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentSlideIndex(idx)}
              aria-label={`Go to slide ${slide.title}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-base cursor-pointer',
                idx === currentSlideIndex
                  ? 'w-6 bg-amber-400'
                  : 'w-1.5 bg-white/30 hover:bg-white/50'
              )}
            />
          ))}
        </div>

        {/* Clean 4-Stat Big Number Row — Center Aligned with Refresh Count-Up Animation */}
        <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {/* Stat 1: 1 (Live MVP) */}
          <div className="flex flex-col items-center justify-center space-y-0.5">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">
              <AnimatedNumber target={1} />
            </div>
            <div className="text-xs text-text-mid font-medium flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>Live MVP</span>
            </div>
          </div>

          {/* Stat 2: 36 (States & UTs Vision) */}
          <div className="flex flex-col items-center justify-center space-y-0.5">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-text-high">
              <AnimatedNumber target={36} />
            </div>
            <div className="text-xs text-text-mid font-medium">States & UTs Vision</div>
          </div>

          {/* Stat 3: 20+ (Monuments Mapped) */}
          <div className="flex flex-col items-center justify-center space-y-0.5">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#C9A24B]">
              <AnimatedNumber target={20} suffix="+" />
            </div>
            <div className="text-xs text-text-mid font-medium">Monuments Mapped</div>
          </div>

          {/* Stat 4: 24/7 (AI Tourism Guidance) */}
          <div className="flex flex-col items-center justify-center space-y-0.5">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-text-high">
              24/7
            </div>
            <div className="text-xs text-text-mid font-medium">AI Tourism Guidance</div>
          </div>
        </div>

      </Container>
    </section>
  );
}

export default HeroSection;
