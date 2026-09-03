import React, { useState, useEffect } from 'react';
import { useCity } from '../../config/CityContext';
import { heroData } from '../../data/delhi/landing';
import { CrowdBadge } from '../common/CrowdBadge';
import { GlassPanel } from '../common/GlassPanel';
import { Button } from '../common/Button';
import { Container } from '../layout/Container';
import { Search, MapPin, Calendar, Users, Clock, ShieldAlert } from '../icons';
import { cn } from '../../utils/cn';

/**
 * Computes quiet time-of-day greeting from device clock.
 */
function getTimeGreeting(cityName) {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return `Good morning in ${cityName}`;
  if (hour >= 12 && hour < 17) return `Good afternoon in ${cityName}`;
  if (hour >= 17 && hour < 21) return `Good evening in ${cityName}`;
  return `Good night in ${cityName}`;
}

/**
 * Animated numeral counter that completes in under 900ms.
 */
function StatCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    const duration = 800;
    const steps = 30;
    const increment = target / steps;
    const intervalTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="numeral font-bold text-2xl sm:text-3xl text-text-high tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

/**
 * Hero Section for Landing Page.
 *
 * @component
 */
export function HeroSection() {
  const { city } = useCity();
  const greeting = getTimeGreeting(city.name);

  return (
    <section className="relative min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-between pt-24 pb-12 sm:pb-16 select-none overflow-hidden">
      {/* Eagerly loaded full-bleed hero photograph */}
      <img
        src={heroData.photoUrl}
        alt={heroData.photoAlt}
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Scrim protection for text legibility */}
      <div className="absolute inset-0 scrim-full pointer-events-none" />
      <div className="absolute inset-0 scrim-bottom pointer-events-none" />

      {/* Top / Main Hero Content Container */}
      <Container size="wide" className="relative z-10 w-full pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Left Column: Headline & Point of View */}
          <div className="lg:col-span-8 space-y-4 max-w-3xl">
            {/* Quiet time-aware greeting */}
            <div className="flex items-center gap-2 text-xs text-text-high/90 font-mono tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              <span>{greeting}</span>
              <span className="text-text-low">•</span>
              <span className="text-brand font-medium">Live Telemetry Active</span>
            </div>

            {/* Display-xl Headline with deliberate manual line breaks */}
            <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-text-high drop-shadow-lg leading-[1.1] whitespace-pre-line tracking-tight">
              {heroData.headline}
            </h1>

            <p className="type-body text-text-high/90 max-w-2xl drop-shadow text-sm sm:text-base leading-relaxed">
              {heroData.subline}
            </p>
          </div>

          {/* Right Column: Floating LIVE CROWD RIGHT NOW Glass Card */}
          <div className="lg:col-span-4">
            <GlassPanel
              tier="panel"
              className="p-4 sm:p-5 rounded-2xl border border-white/20 shadow-lifted space-y-3.5 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-crowd-low animate-pulse" />
                  <span className="text-xs uppercase font-mono tracking-wider text-text-high font-semibold">
                    Live Crowd Right Now
                  </span>
                </div>
                <span className="text-[11px] text-text-low font-mono">
                  {heroData.liveCrowdSnapshot.updatedLabel}
                </span>
              </div>

              <div className="space-y-2.5">
                {heroData.liveCrowdSnapshot.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-black/25 border border-white/5 text-xs text-text-high"
                  >
                    <div>
                      <div className="font-medium tracking-tight truncate max-w-[140px] sm:max-w-[160px]">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-text-low font-sans">
                        {item.waitNote}
                      </div>
                    </div>
                    <CrowdBadge level={item.level} size="sm" showLabel={false} onGlass />
                  </div>
                ))}
              </div>
            </GlassPanel>
          </div>
        </div>
      </Container>

      {/* Bottom Area: Search Bar & Count-up Stats Strip */}
      <Container size="wide" className="relative z-10 w-full pt-8 sm:pt-12 space-y-6">
        {/* Overlapping Glass Search Bar (Non-functional, TODO marker) */}
        {/* TODO: Supabase query: connect search fields to places filter route */}
        <div className="w-full max-w-4xl mx-auto">
          {/* Desktop Search Bar */}
          <GlassPanel
            tier="heavy"
            className="hidden sm:flex items-center p-2 rounded-xl border border-white/20 shadow-glass divide-x divide-white/10"
          >
            <div className="flex-1 flex items-center gap-3 px-4 py-2">
              <MapPin size={18} className="text-brand shrink-0" />
              <div className="text-left">
                <div className="text-[10px] uppercase font-mono text-text-low tracking-wider">Location</div>
                <input
                  type="text"
                  readOnly
                  placeholder={heroData.searchFields.locationPlaceholder}
                  className="bg-transparent text-xs text-text-high placeholder:text-text-mid outline-none w-full cursor-pointer"
                />
              </div>
            </div>

            <div className="flex-1 flex items-center gap-3 px-4 py-2">
              <Calendar size={18} className="text-brand shrink-0" />
              <div className="text-left">
                <div className="text-[10px] uppercase font-mono text-text-low tracking-wider">Timing</div>
                <input
                  type="text"
                  readOnly
                  placeholder={heroData.searchFields.timePlaceholder}
                  className="bg-transparent text-xs text-text-high placeholder:text-text-mid outline-none w-full cursor-pointer"
                />
              </div>
            </div>

            <div className="flex-1 flex items-center gap-3 px-4 py-2">
              <Users size={18} className="text-brand shrink-0" />
              <div className="text-left">
                <div className="text-[10px] uppercase font-mono text-text-low tracking-wider">Group</div>
                <input
                  type="text"
                  readOnly
                  placeholder={heroData.searchFields.groupPlaceholder}
                  className="bg-transparent text-xs text-text-high placeholder:text-text-mid outline-none w-full cursor-pointer"
                />
              </div>
            </div>

            <div className="pl-2">
              <Button variant="primary" size="md" icon={<Search size={16} />} to="/places">
                Search
              </Button>
            </div>
          </GlassPanel>

          {/* Mobile Collapsed Search Bar */}
          <GlassPanel
            tier="heavy"
            className="sm:hidden flex items-center justify-between p-3 rounded-xl border border-white/20 shadow-glass"
          >
            <div className="flex items-center gap-2.5 text-left text-xs text-text-mid">
              <Search size={16} className="text-brand" />
              <span>Search districts or monuments...</span>
            </div>
            <Button variant="primary" size="sm" to="/places">
              Search
            </Button>
          </GlassPanel>
        </div>

        {/* Stats Strip with Fast Count-Up Animation (< 900ms) */}
        <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 w-full">
            {heroData.stats.map((stat, idx) => (
              <div key={idx} className="space-y-0.5 text-left">
                <StatCounter target={stat.target} suffix={stat.suffix} />
                <div className="text-xs text-text-mid font-mono">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="w-full text-right text-[10px] font-mono text-text-low/80">
            {heroData.photoCredit}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
