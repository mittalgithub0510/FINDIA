import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { DESTINATIONS_CONFIG } from '../../data/destinationsData';
import { ChevronDown, ChevronRight, MapPin, Sparkle } from '../icons';
import { cn } from '../../utils/cn';

/**
 * Two-level Destination Dropdown menu component.
 * Opens on hover AND on click with a slight intent delay to avoid flicker.
 * Features Region -> State hierarchy where Delhi is live and other states display Available Soon.
 */
export function DestinationDropdown({ isMobile = false, onCloseMobile }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeRegionId, setActiveRegionId] = useState('north'); // Default active region
  const hoverTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);

  // Clear hover timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Handle outside click to close dropdown (desktop)
  useEffect(() => {
    if (isMobile) return;
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isMobile]);

  // Hover handlers with slight intent delay
  const handleMouseEnter = () => {
    if (isMobile) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // 200ms smooth delay to prevent menu flicker
  };

  const handleTriggerClick = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleStateClick = (state) => {
    if (state.isLive) {
      navigate(state.path || `/destination/north/${state.slug}`);
      setIsOpen(false);
      if (onCloseMobile) onCloseMobile();
    } else {
      navigate(`/destination/coming-soon?state=${encodeURIComponent(state.name)}`);
      setIsOpen(false);
      if (onCloseMobile) onCloseMobile();
    }
  };

  const activeRegion = DESTINATIONS_CONFIG.find((r) => r.id === activeRegionId) || DESTINATIONS_CONFIG[0];

  // Mobile layout rendering (integrated accordion inside mobile drawer)
  if (isMobile) {
    return (
      <div className="w-full space-y-2">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between py-2 text-[22px] font-display font-semibold text-text-high hover:text-amber-400 outline-none"
        >
          <span className="flex items-center gap-2">
            <span>Destination</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-sans font-bold border border-emerald-500/40 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Delhi & Prayagraj Live
            </span>
          </span>
          <ChevronDown
            size={20}
            className={cn('transition-transform duration-base text-text-mid', isOpen && 'rotate-180 text-amber-400')}
          />
        </button>

        {isOpen && (
          <div className="pl-2 pr-1 py-3 space-y-4 rounded-xl bg-bg-raised/80 border border-white/10 animate-in fade-in duration-fast">
            {/* Region Tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none px-1">
              {DESTINATIONS_CONFIG.map((region) => (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setActiveRegionId(region.id)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-bold rounded-lg shrink-0 transition-colors',
                    activeRegionId === region.id
                      ? 'bg-amber-500 text-bg-base font-extrabold shadow-md'
                      : 'bg-white/10 text-text-high hover:bg-white/20'
                  )}
                >
                  {region.region}
                </button>
              ))}
            </div>

            {/* States List for Active Region */}
            <div className="space-y-2 max-h-60 overflow-y-auto px-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold mb-1">
                {activeRegion.region} Region States & UTs
              </div>
              {activeRegion.states.map((state) => (
                <div
                  key={state.slug}
                  onClick={() => handleStateClick(state)}
                  className={cn(
                    'flex items-center justify-between p-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer select-none border',
                    state.isLive
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-200 hover:bg-amber-500/30'
                      : 'bg-white/5 border-white/10 text-text-high hover:bg-white/10'
                  )}
                >
                  <span className="flex items-center gap-2">
                    <MapPin size={15} className={state.isLive ? 'text-amber-400' : 'text-indigo-400'} />
                    <span>{state.name}</span>
                  </span>
                  {state.isLive ? (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 flex items-center gap-1">
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
          </div>
        )}
      </div>
    );
  }

  // Desktop Hoverable / Clickable Mega Menu
  return (
    <div
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center"
    >
      {/* Trigger — matches new tab-pill style */}
      <button
        type="button"
        onClick={handleTriggerClick}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          'flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150 outline-none cursor-pointer whitespace-nowrap',
          isOpen
            ? 'bg-white/10 text-white font-semibold'
            : 'text-[#9C9186] hover:text-white hover:bg-white/[0.06]'
        )}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>Destination</span>
        <ChevronDown
          size={13}
          className={cn('transition-transform duration-200 ml-0.5', isOpen && 'rotate-180')}
        />
      </button>

      {/* Enhanced Mega Dropdown Panel */}
      {isOpen && (
        <div className="absolute left-0 mt-2 top-full w-[560px] rounded-2xl border border-white/[0.10] z-[70] overflow-hidden animate-in fade-in zoom-in-95 duration-fast p-4"
          style={{
            background: 'rgba(18, 16, 14, 0.97)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)'
          }}
        >
          
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sparkle size={16} className="text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-text-high font-display">
                Explore India Destinations
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Delhi & Prayagraj Live
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                34 States Coming Soon
              </span>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 min-h-[300px]">
            
            {/* Left Column: Clear Bold Regions List */}
            <div className="col-span-5 space-y-1.5 border-r border-white/10 pr-3">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 px-2 mb-2">
                Select Region
              </div>
              {DESTINATIONS_CONFIG.map((region) => {
                const isActive = activeRegionId === region.id;
                const hasLiveState = region.states.some((s) => s.isLive);

                return (
                  <button
                    key={region.id}
                    type="button"
                    onMouseEnter={() => setActiveRegionId(region.id)}
                    onClick={() => setActiveRegionId(region.id)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left group cursor-pointer border',
                      isActive
                        ? 'bg-amber-500 text-bg-base border-amber-400 shadow-md font-extrabold'
                        : 'bg-white/5 text-text-high hover:bg-white/15 hover:border-white/20 border-white/10'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span>{region.region}</span>
                      {hasLiveState && (
                        <span className={cn(
                          "w-2 h-2 rounded-full",
                          isActive ? "bg-bg-base" : "bg-emerald-400 animate-ping"
                        )} />
                      )}
                    </span>
                    <ChevronRight
                      size={14}
                      className={cn(
                        'transition-transform',
                        isActive ? 'text-bg-base translate-x-0.5' : 'text-text-low group-hover:text-text-high'
                      )}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Column: States in Active Region */}
            <div className="col-span-7 pl-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-300 font-display">
                    {activeRegion.region} Region States & UTs
                  </span>
                  <span className="text-[10px] text-text-low font-mono font-semibold">
                    {activeRegion.states.length} Destinations
                  </span>
                </div>
                <p className="text-[11px] text-text-mid mb-3 leading-relaxed">
                  {activeRegion.description}
                </p>

                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {activeRegion.states.map((state) => (
                    <div
                      key={state.slug}
                      onClick={() => handleStateClick(state)}
                      className={cn(
                        'group flex items-center justify-between p-2.5 rounded-xl text-xs transition-all cursor-pointer select-none border',
                        state.isLive
                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-100 hover:bg-amber-500/30 hover:border-amber-400 shadow-sm font-bold'
                          : 'bg-white/5 border-white/10 text-text-high hover:bg-white/15 hover:border-white/20'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin
                          size={14}
                          className={cn(
                            'shrink-0',
                            state.isLive ? 'text-amber-400' : 'text-indigo-400 group-hover:text-indigo-300'
                          )}
                        />
                        <span className={state.isLive ? 'font-bold text-amber-200' : 'font-semibold text-text-high'}>
                          {state.name}
                        </span>
                      </div>

                      {state.isLive ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 flex items-center gap-1 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          EXPLORE
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom hint banner */}
              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-text-mid">
                <Link
                  to="/destination/north/prayagraj"
                  onClick={() => setIsOpen(false)}
                  className="text-amber-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Explore Prayagraj Now</span>
                  <ChevronRight size={12} />
                </Link>
                <Link
                  to="/destination/north/delhi"
                  onClick={() => setIsOpen(false)}
                  className="text-text-mid hover:text-white font-medium hover:underline flex items-center gap-1"
                >
                  <span>Explore Delhi</span>
                  <ChevronRight size={12} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default DestinationDropdown;
