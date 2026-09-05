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

  const activeSlide = HERO_BACKGROUND_SLIDES[currentSlideIndex];

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-end pt-28 sm:pt-36 pb-6 select-none bg-bg-base">

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
      <Container size="wide" className="relative z-30 w-full pt-4 sm:pt-8 space-y-4 sm:space-y-5">

        {/* Top Row: Headline & Value Prop on Left (8 cols), Compact Telemetry Snapshot on Right (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-end">

          {/* Left Column (8 cols): Expanded space for Large Grand Headline */}
          <div className="lg:col-span-8 space-y-3 sm:space-y-4">

            {/* Top Status Pill: 🟢 DELHI LIVE MVP */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-heavy border border-amber-500/30 text-xs font-mono text-amber-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-emerald-300 uppercase tracking-wider">
                DELHI LIVE MVP
              </span>
            </div>

            {/* Main Headline with Significantly Larger Font */}
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
              className="p-3 sm:p-3.5 rounded-2xl border border-white/20 shadow-glass space-y-2 backdrop-blur-xl bg-black/25 hover:bg-black/35 transition-all max-w-xs sm:max-w-[340px] mx-auto lg:ml-auto"
            >
              <div className="flex items-center justify-between border-b border-white/15 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-mono text-xs">◉</span>
                  <span className="text-[10px] uppercase font-mono font-bold text-amber-300 tracking-wider">
                    DEMO TELEMETRY SNAPSHOT
                  </span>
                </div>
                <span className="text-[9px] text-text-low font-mono">Illustrative Data</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between p-1.5 rounded-xl bg-white/5 border border-white/15 text-xs backdrop-blur-sm">
                  <div>
                    <div className="font-bold text-text-high text-xs">Agrasen Ki Baoli</div>
                    <div className="text-[9px] text-emerald-300 font-mono">0 min line</div>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    24% Quiet
                  </span>
                </div>

                <div className="flex items-center justify-between p-1.5 rounded-xl bg-white/5 border border-white/15 text-xs backdrop-blur-sm">
                  <div>
                    <div className="font-bold text-text-high text-xs">Humayun&apos;s Tomb</div>
                    <div className="text-[9px] text-emerald-300 font-mono">Garden spaces open</div>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    32% Open
                  </span>
                </div>

                <div className="flex items-center justify-between p-1.5 rounded-xl bg-white/5 border border-amber-500/40 text-xs backdrop-blur-sm">
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
              <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/35 text-xs space-y-0.5 backdrop-blur-sm">
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
              'flex flex-col md:flex-row items-center gap-3 py-2 sm:py-2.5 px-4 rounded-2xl border transition-all shadow-glass bg-bg-raised/90 backdrop-blur-xl outline-none focus:outline-none focus-visible:outline-none focus:ring-0',
              isSearchFocused ? 'border-white/40 shadow-black/40' : 'border-white/20'
            )}
          >
            {/* Search Input Part */}
            <div className="flex items-center gap-3 w-full flex-1 px-1">
              <MapPin size={20} className="text-amber-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                placeholder="Where do you want to explore?"
                aria-label="Where do you want to explore?"
                className="bg-transparent text-base sm:text-lg text-text-high placeholder:text-text-low outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 w-full font-medium"
              />
            </div>

            {/* Combined Horizontal CTAs Group */}
            <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
              <Button
                variant="primary"
                size="md"
                to="/destination/north/delhi"
                icon={<Compass size={16} />}
                className="font-bold shadow-md whitespace-nowrap text-xs sm:text-sm px-4 py-2 w-full md:w-auto"
              >
                Explore India
              </Button>

              <Button
                variant="secondary"
                size="md"
                to="/findia-ai"
                icon={<Sparkle size={16} className="text-amber-400" />}
                className="font-semibold whitespace-nowrap text-xs sm:text-sm px-4 py-2 border-white/20 hover:border-amber-400/50 w-full md:w-auto"
              >
                Plan My Journey
              </Button>
            </div>
          </GlassPanel>

          {/* Search Dropdown using EXISTING DESTINATIONS_CONFIG */}
          {isSearchFocused && (
            <div
              style={{ backgroundColor: '#0f1118', opacity: 1 }}
              className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-[100] overflow-hidden p-3 animate-in fade-in duration-fast"
            >
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 px-2 mb-2 flex items-center justify-between border-b border-white/10 pb-2">
                <span>Destinations ({filteredDestinations.length})</span>
                <span className="text-emerald-400 font-bold">Delhi = Live MVP</span>
              </div>

              {filteredDestinations.length > 0 ? (
                <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                  {filteredDestinations.map((dest) => (
                    <div
                      key={dest.slug}
                      onClick={() => handleSelectDestination(dest)}
                      style={{ backgroundColor: '#181b24', opacity: 1 }}
                      className={cn(
                        'flex items-center justify-between p-2.5 rounded-xl text-xs transition-all border',
                        dest.isLive
                          ? 'border-amber-500/60 text-amber-200 hover:bg-amber-500/40 cursor-pointer font-bold shadow-sm'
                          : 'border-white/10 text-text-mid hover:bg-[#202430] cursor-not-allowed'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className={dest.isLive ? 'text-amber-400' : 'text-indigo-400'} />
                        <span className={dest.isLive ? 'font-bold text-amber-200' : 'font-medium text-text-high'}>
                          {dest.name}
                        </span>
                        <span className="text-[10px] text-text-low font-mono">({dest.regionName})</span>
                      </div>

                      {dest.isLive ? (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-500/60 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          LIVE NOW
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-text-low font-mono">
                  No matching destinations found.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Clean 4-Stat Big Number Row — Placed EXACTLY 25px below Search Bar */}
        <div className="pt-[25px] border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400 flex items-center justify-center sm:justify-start gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              1
            </div>
            <div className="text-xs text-text-mid font-medium">Delhi Live MVP</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-text-high">
              36
            </div>
            <div className="text-xs text-text-mid font-medium">States & UTs Vision</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">
              150+
            </div>
            <div className="text-xs text-text-mid font-medium">Monuments Mapped</div>
          </div>

          <div className="space-y-1">
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
