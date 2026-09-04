import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DESTINATIONS_CONFIG } from '../../data/destinationsData';
import { Container } from '../layout/Container';
import { GlassPanel } from '../common/GlassPanel';
import { MapPin, ChevronRight, Sparkle } from '../icons';
import { cn } from '../../utils/cn';

/**
 * SECTION 3 — EXPLORE INDIA SECTION
 * Interactive Region & State Selector driven by DESTINATIONS_CONFIG.
 * Communicates: India = Pan-India vision | Delhi = Current working MVP.
 */
export function ExploreIndiaSection() {
  const navigate = useNavigate();
  const [activeRegionId, setActiveRegionId] = useState('north');

  const activeRegion = DESTINATIONS_CONFIG.find((r) => r.id === activeRegionId) || DESTINATIONS_CONFIG[0];

  const handleStateClick = (state) => {
    if (state.isLive) {
      navigate(state.path || `/destination/north/${state.slug}`);
    } else {
      navigate(`/destination/coming-soon?state=${encodeURIComponent(state.name)}`);
    }
  };

  return (
    <section className="py-20 bg-bg-raised/40 border-t border-white/5 relative">
      <Container size="wide" className="space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
              <Sparkle size={14} />
              <span>Pan-India Vision</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-high tracking-tight">
              Explore India by Region
            </h2>
            <p className="type-body text-text-mid text-sm leading-relaxed">
              FINDIA is built for all 36 States & UTs. Delhi is our active live MVP, while remaining states are in rollout stage.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl glass-heavy border border-emerald-500/40 text-xs font-mono text-emerald-300 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Delhi Live Now • 35 States Coming Soon</span>
          </div>
        </div>

        {/* Region Tabs Header */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {DESTINATIONS_CONFIG.map((region) => {
            const isActive = activeRegionId === region.id;
            const hasLiveState = region.states.some((s) => s.isLive);

            return (
              <button
                key={region.id}
                type="button"
                onClick={() => setActiveRegionId(region.id)}
                className={cn(
                  'px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer border flex items-center gap-2',
                  isActive
                    ? 'bg-amber-500 text-bg-base border-amber-400 shadow-md font-extrabold'
                    : 'bg-white/5 text-text-high hover:bg-white/15 border-white/10'
                )}
              >
                <span>{region.region}</span>
                {hasLiveState && (
                  <span className={cn(
                    "w-2 h-2 rounded-full",
                    isActive ? "bg-bg-base" : "bg-emerald-400 animate-ping"
                  )} />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Region Display Grid */}
        <GlassPanel tier="heavy" className="p-6 rounded-2xl border border-amber-500/20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <h3 className="font-display font-bold text-xl text-amber-300">
                {activeRegion.region} India Region
              </h3>
              <p className="text-xs text-text-mid mt-0.5">
                {activeRegion.description}
              </p>
            </div>
            <span className="text-xs font-mono text-text-low">
              {activeRegion.states.length} States & UTs
            </span>
          </div>

          {/* States Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeRegion.states.map((state) => (
              <div
                key={state.slug}
                onClick={() => handleStateClick(state)}
                className={cn(
                  'group flex items-center justify-between p-3 rounded-xl text-xs transition-all cursor-pointer select-none border',
                  state.isLive
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-100 hover:bg-amber-500/30 hover:border-amber-400 shadow-md font-bold'
                    : 'bg-white/5 border-white/10 text-text-high hover:bg-white/15 hover:border-white/20'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin
                    size={16}
                    className={state.isLive ? 'text-amber-400' : 'text-indigo-400 group-hover:text-indigo-300'}
                  />
                  <span className={state.isLive ? 'font-bold text-amber-200 text-sm' : 'font-medium text-text-high'}>
                    {state.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
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
                  <ChevronRight size={14} className="text-text-low group-hover:text-text-high transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

      </Container>
    </section>
  );
}

export default ExploreIndiaSection;
