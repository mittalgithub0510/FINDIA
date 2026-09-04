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
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-sans font-bold border border-emerald-500/40 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Delhi Live
            </span>
          </span>
          <ChevronDown
            size={20}
            className={cn('transition-transform duration-base text-text-mid', isOpen && 'rotate-180 text-amber-400')}
          />
        </button>

        {isOpen && (
          <div className="pl-2 pr-1 py-3 space-y-4 rounded-xl bg-[#17130F] border border-[#2E271F] animate-in fade-in duration-fast">
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
                      ? 'bg-[#C9A24B] text-[#0F0D0B] font-extrabold shadow-md'
                      : 'bg-[#1B1613] text-[#9C9186] hover:bg-[#241E1A] hover:text-[#F3EBDC]'
                  )}
                >
                  {region.region}
                </button>
              ))}
            </div>

            {/* States List for Active Region */}
            <div className="space-y-2 max-h-60 overflow-y-auto px-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#C9A24B] font-bold mb-1">
                {activeRegion.region} Region States & UTs
              </div>
              {activeRegion.states.map((state) => (
                <div
                  key={state.slug}
                  onClick={() => handleStateClick(state)}
                  className={cn(
                    'flex items-center justify-between p-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer select-none border',
                    state.isLive
                      ? 'bg-[#C9A24B]/15 border-[#8A7238] text-[#F3EBDC] hover:bg-[#C9A24B]/25'
                      : 'bg-[#1B1613] border-[#2E271F] text-[#9C9186] hover:bg-[#241E1A] hover:text-[#F3EBDC]'
                  )}
                >
                  <span className="flex items-center gap-2">
                    <MapPin size={15} className={state.isLive ? 'text-[#C9A24B]' : 'text-[#9C9186]'} />
                    <span>{state.name}</span>
                  </span>
                  {state.isLive ? (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      EXPLORE
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-600/20 text-blue-300 border border-blue-500/40">
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

  // Desktop Hoverable / Clickable Mega Menu with Solid Opaque Background (#17130F)
  return (
    <div
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center"
    >
      {/* Navbar Trigger Button */}
      <button
        type="button"
        onClick={handleTriggerClick}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm transition-colors duration-fast outline-none cursor-pointer',
          isOpen
            ? 'text-[#C9A24B] font-semibold bg-white/10'
            : 'text-[#9C9186] hover:text-[#F3EBDC] hover:bg-white/5'
        )}
      >
        <span>Destination</span>
        <ChevronDown
          size={14}
          className={cn('transition-transform duration-base', isOpen && 'rotate-180 text-[#C9A24B]')}
        />
      </button>

      {/* Solid Opaque Mega Dropdown Panel */}
      {isOpen && (
        <div className="absolute left-0 mt-2 top-full w-[560px] rounded-2xl bg-[#17130F] border border-[#2E271F] shadow-2xl z-[70] overflow-hidden animate-in fade-in zoom-in-95 duration-fast p-4 text-[#F3EBDC]">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2E271F]">
            <div className="flex items-center gap-2">
              <Sparkle size={16} className="text-[#C9A24B]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#F3EBDC] font-display">
                Explore India Destinations
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Delhi Live
              </span>
              <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-600/20 text-blue-300 border border-blue-500/40">
                35 States Coming Soon
              </span>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 min-h-[300px]">
            
            {/* Left Column: Clear Bold Regions List */}
            <div className="col-span-5 space-y-1.5 border-r border-[#2E271F] pr-3">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C9A24B] px-2 mb-2">
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
                        ? 'bg-[#C9A24B] text-[#0F0D0B] border-[#C9A24B] shadow-md font-extrabold'
                        : 'bg-[#1B1613] text-[#F3EBDC] hover:bg-[#241E1A] hover:border-[#322A22] border-[#2E271F]'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span>{region.region}</span>
                      {hasLiveState && (
                        <span className={cn(
                          "w-2 h-2 rounded-full",
                          isActive ? "bg-[#0F0D0B]" : "bg-emerald-400 animate-ping"
                        )} />
                      )}
                    </span>
                    <ChevronRight
                      size={14}
                      className={cn(
                        'transition-transform',
                        isActive ? 'text-[#0F0D0B] translate-x-0.5' : 'text-[#9C9186] group-hover:text-[#F3EBDC]'
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
                  <span className="text-xs font-bold text-[#C9A24B] font-display">
                    {activeRegion.region} Region States & UTs
                  </span>
                  <span className="text-[10px] text-[#9C9186] font-mono font-semibold">
                    {activeRegion.states.length} Destinations
                  </span>
                </div>
                <p className="text-[11px] text-[#9C9186] mb-3 leading-relaxed">
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
                          ? 'bg-[#C9A24B]/15 border-[#8A7238] text-[#F3EBDC] hover:bg-[#C9A24B]/25 hover:border-[#C9A24B] shadow-sm font-bold'
                          : 'bg-[#1B1613] border-[#2E271F] text-[#F3EBDC] hover:bg-[#241E1A] hover:border-[#322A22]'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin
                          size={14}
                          className={cn(
                            'shrink-0',
                            state.isLive ? 'text-[#C9A24B]' : 'text-[#9C9186] group-hover:text-[#F3EBDC]'
                          )}
                        />
                        <span className={state.isLive ? 'font-bold text-[#F3EBDC]' : 'font-semibold text-[#9C9186]'}>
                          {state.name}
                        </span>
                      </div>

                      {state.isLive ? (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          EXPLORE
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-600/20 text-blue-300 border border-blue-500/40">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom hint banner */}
              <div className="mt-3 pt-2 border-t border-[#2E271F] flex items-center justify-between text-[10px] text-[#9C9186]">
                <span>Click any state to preview</span>
                <Link
                  to="/destination/north/delhi"
                  onClick={() => setIsOpen(false)}
                  className="text-[#C9A24B] font-bold hover:underline flex items-center gap-1"
                >
                  <span>Explore Delhi Now</span>
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
