import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DESTINATIONS_CONFIG } from '../../data/destinationsData';
import { useCity } from '../../config/CityContext';
import { GlassPanel } from '../common/GlassPanel';
import { Button } from '../common/Button';
import { Container } from '../layout/Container';
import { MapPin, Sparkle, Compass } from '../icons';
import { cn } from '../../utils/cn';
import { LiveTelemetrySnapshotCard } from '../common/LiveTelemetrySnapshotCard';

/**
 * Multi-city live configurations for FINDIA's hero section.
 * Supports real-time switching between Delhi (NCT) and Prayagraj (UP) Live MVPs.
 */
const CITY_HERO_DATA = {
  delhi: {
    id: 'delhi',
    name: 'Delhi',
    badgeText: 'DELHI LIVE MVP',
    slides: [
      {
        id: 'delhi-1',
        name: 'DELHI',
        url: '/images/home/hero/delhi.png',
        title: 'Delhi Red Fort',
        position: 'object-center',
      },
      {
        id: 'delhi-2',
        name: 'HIMALAYAS',
        url: '/images/home/hero/himalayas.png',
        title: 'Himalayan Valleys',
        position: 'object-center',
      },
      {
        id: 'delhi-3',
        name: 'VARANASI',
        url: '/images/home/hero/varanasi.png',
        title: 'Varanasi Ghats',
        position: 'object-center',
      },
      {
        id: 'delhi-4',
        name: 'KERALA',
        url: '/images/home/hero/kerala.png',
        title: 'Kerala Backwaters',
        position: 'object-center',
      },
      {
        id: 'delhi-5',
        name: 'RAJASTHAN',
        url: '/images/home/hero/rajasthan.jpg',
        title: 'Rajasthan Forts',
        position: 'object-top sm:object-center',
      },
    ],
    headlinePart1: 'From guiding tourists',
    headlineHighlight: 'to guiding tourism.',
    subtitle:
      'Discover destinations tailored to your interests, budget, available time, and contextual tourism signals — powered by FINDIA’s AI tourism decision engine.',
    telemetry: [
      {
        title: 'Agrasen Ki Baoli',
        status: '0 min line',
        badgeText: '24% Quiet',
        badgeType: 'quiet',
      },
      {
        title: "Humayun's Tomb",
        status: 'Garden spaces open',
        badgeText: '32% Open',
        badgeType: 'open',
      },
      {
        title: 'Qutub Minar',
        status: '45 min queue',
        badgeText: '88% Peak',
        badgeType: 'peak',
      },
    ],
    recommendation:
      'A lower-demand heritage alternative may better fit this visitor’s interests and available time.',
    exploreLink: '/destination/north/delhi',
    exploreText: 'Explore Delhi',
    planLink: '/findia-ai?city=delhi',
    searchPlaceholder: 'Where do you want to explore?',
    stat1Number: '2',
    stat1Label: 'Live MVP Cities (Delhi & Prayagraj)',
    stat3Number: '150+',
    stat3Label: 'Monuments Mapped',
  },
  prayagraj: {
    id: 'prayagraj',
    name: 'Prayagraj',
    badgeText: 'PRAYAGRAJ LIVE MVP',
    slides: [
      {
        id: 'prayagraj-1',
        name: 'TRIVENI SANGAM',
        url: '/images/destinations/prayagraj/triveni-sangam.jpg',
        title: 'Triveni Sangam Holy Confluence at Sunrise',
        position: 'object-center',
      },
      {
        id: 'prayagraj-2',
        name: 'ALLAHABAD FORT',
        url: '/images/destinations/prayagraj/allahabad-fort.jpg',
        title: 'Emperor Akbar Fort & Yamuna Riverfront',
        position: 'object-center',
      },
      {
        id: 'prayagraj-3',
        name: 'ANAND BHAVAN',
        url: '/images/destinations/prayagraj/anand-bhavan.jpg',
        title: 'Anand Bhavan Neoclassical Grounds',
        position: 'object-center',
      },
      {
        id: 'prayagraj-4',
        name: 'KHUSRO BAGH',
        url: '/images/destinations/prayagraj/khusro-bagh.jpg',
        title: 'Khusro Bagh Sandstone Mausoleum',
        position: 'object-center',
      },
      {
        id: 'prayagraj-5',
        name: 'ALL SAINTS CATHEDRAL',
        url: '/images/destinations/prayagraj/all-saints-cathedral.jpg',
        title: 'All Saints Gothic Cathedral',
        position: 'object-center',
      },
    ],
    headlinePart1: 'From sacred ghats',
    headlineHighlight: 'to smart tourism.',
    subtitle:
      'Experience Triveni Sangam, historic forts, and spiritual heritage with real-time crowd telemetry, boat navigation, and AI-optimized sequencing.',
    telemetry: [
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
    ],
    recommendation:
      'Take an authorized sunrise wooden boat to Sangam; visit Lete Hanuman Ji in early morning to bypass peak festival rush.',
    exploreLink: '/destination/north/prayagraj',
    exploreText: 'Explore Prayagraj',
    planLink: '/findia-ai?city=prayagraj',
    searchPlaceholder: 'Where do you want to explore in Prayagraj?',
    stat1Number: '2',
    stat1Label: 'Live MVP Cities (Delhi & Prayagraj)',
    stat3Number: '21+',
    stat3Label: 'Prayagraj Sites Mapped',
  },
};

/**
 * FINDIA Homepage Hero Section (Simplified & Unified with Multi-City Live Support)
 */
export function HeroSection() {
  const navigate = useNavigate();
  const { citySlug, setCity } = useCity();

  // Active City state: user toggle overrides CityContext; default to CityContext or delhi
  const [userSelectedCityId, setUserSelectedCityId] = useState(null);
  const activeCityId = userSelectedCityId || (citySlug === 'prayagraj' ? 'prayagraj' : 'delhi');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);

  const activeData = CITY_HERO_DATA[activeCityId] || CITY_HERO_DATA.delhi;
  const currentSlides = activeData.slides;

  // Auto-advance slideshow every 5 seconds (5000ms) with crossfade
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % currentSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlides.length]);

  const handleSwitchCity = (id) => {
    setUserSelectedCityId(id);
    setCurrentSlideIndex(0);
    if (setCity) {
      setCity(id);
    }
  };

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
      navigate(
        dest.path ||
        (dest.slug === 'prayagraj' ? '/destination/north/prayagraj' : '/destination/north/delhi')
      );
    }
  };

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-end pt-28 sm:pt-36 pb-6 select-none bg-bg-base">

      {/* Background Slideshow with 5-Second Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {currentSlides.map((slide, index) => (
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

            {/* Top Status Pill: Interactive Switcher between Delhi & Prayagraj Live MVPs */}
            <div className="inline-flex items-center p-1 rounded-full glass-heavy border border-amber-500/30 text-xs font-mono shadow-sm gap-1">
              <button
                type="button"
                onClick={() => handleSwitchCity('delhi')}
                className={cn(
                  'px-3.5 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5',
                  activeCityId === 'delhi'
                    ? 'bg-amber-500/25 text-amber-300 font-bold border border-amber-400/40 shadow-sm'
                    : 'text-text-mid hover:text-text-high'
                )}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>DELHI LIVE MVP</span>
              </button>

              <button
                type="button"
                onClick={() => handleSwitchCity('prayagraj')}
                className={cn(
                  'px-3.5 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5',
                  activeCityId === 'prayagraj'
                    ? 'bg-amber-500/25 text-amber-300 font-bold border border-amber-400/40 shadow-sm'
                    : 'text-text-mid hover:text-text-high'
                )}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>PRAYAGRAJ LIVE MVP</span>
              </button>
            </div>

            {/* Main Headline with Significantly Larger Font */}
            <div className="space-y-1">
              <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-[5.2rem] text-text-high tracking-tight leading-[1.03]">
                {activeData.headlinePart1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                  {activeData.headlineHighlight}
                </span>
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="type-body text-text-mid text-base sm:text-xl max-w-2xl leading-relaxed">
              {activeData.subtitle}
            </p>
          </div>

          {/* Right Column (4 cols): Live Telemetry Snapshot Card */}
          <div className="lg:col-span-4">
            <LiveTelemetrySnapshotCard
              cityName={activeData.name}
              citySlug={activeCityId}
              items={activeData.telemetry}
              recommendation={activeData.recommendation}
              className="mx-auto lg:ml-auto"
            />
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
                placeholder={activeData.searchPlaceholder}
                aria-label={activeData.searchPlaceholder}
                className="bg-transparent text-base sm:text-lg text-text-high placeholder:text-text-low outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 w-full font-medium"
              />
            </div>

            {/* Combined Horizontal CTAs Group */}
            <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
              <Button
                variant="primary"
                size="md"
                to={activeData.exploreLink}
                icon={<Compass size={16} />}
                className="font-bold shadow-md whitespace-nowrap text-xs sm:text-sm px-4 py-2 w-full md:w-auto"
              >
                {activeData.exploreText}
              </Button>

              <Button
                variant="secondary"
                size="md"
                to={activeData.planLink}
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
                <span className="text-emerald-400 font-bold">Delhi & Prayagraj = Live</span>
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
              {activeData.stat1Number}
            </div>
            <div className="text-xs text-text-mid font-medium">{activeData.stat1Label}</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-text-high">
              36
            </div>
            <div className="text-xs text-text-mid font-medium">States & UTs Vision</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">
              {activeData.stat3Number}
            </div>
            <div className="text-xs text-text-mid font-medium">{activeData.stat3Label}</div>
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
