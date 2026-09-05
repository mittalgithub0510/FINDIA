import React from 'react';
import { Sparkle } from '../../../components/icons';

/**
 * Transport Comparison Component for Prayagraj.
 * Compares Boat, E-Rickshaw, Cab, and City Bus modes with static estimates.
 *
 * @param {Object} props
 * @param {Object} props.place - Canonical place record
 */
export function TransportComparison({ place }) {
  if (!place || !place.transport) return null;

  const transport = place.transport;
  const isRiverfront = place.slug === 'triveni-sangam' || place.slug === 'allahabad-fort' || place.slug === 'bade-hanuman-ji' || place.slug === 'boat-club-yamuna';

  const modes = [
    {
      id: 'auto',
      title: 'E-Rickshaw / Auto',
      icon: '🛺',
      time: transport.auto?.time || '15-25 mins',
      fare: transport.auto?.fare || '₹20-50',
      note: transport.auto?.note || 'Eco-friendly and most agile through city lanes',
      highlight: !isRiverfront,
    },
    {
      id: 'boat',
      title: 'Sangam Boat Ferry',
      icon: '⛵',
      time: transport.boat?.time || '15-20 mins',
      fare: transport.boat?.fare || '₹100-250',
      note: transport.boat?.note || 'Direct sacred water transit to Sangam platforms',
      highlight: isRiverfront,
    },
    {
      id: 'cab',
      title: 'Cab / Taxi',
      icon: '🚕',
      time: transport.cab?.time || '20-30 mins',
      fare: transport.cab?.fare || '₹150-240',
      note: transport.cab?.note || 'Air-conditioned convenience for families & long transits',
      highlight: false,
    },
    {
      id: 'bus',
      title: 'City E-Bus / Shuttle',
      icon: '🚌',
      time: transport.bus?.time || '30-45 mins',
      fare: transport.bus?.fare || '₹10-25',
      note: transport.bus?.note || 'Economical air-conditioned connectivity across Prayagraj',
      highlight: false,
    },
  ];

  return (
    <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 shadow-card space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-amber-400">
              Transit Options & Estimates
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/40 border border-white/15 text-text-low">
              Static Estimates
            </span>
          </div>
          <p className="text-xs text-text-mid font-mono mt-0.5">
            Compare travel time and fares from central transit hubs
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold self-start sm:self-auto">
          <Sparkle size={13} className="text-amber-400" />
          <span>FINDIA Recommendation: {isRiverfront ? 'Sangam Boat / E-Rickshaw' : 'E-Rickshaw'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {modes.map((mode) => (
          <div
            key={mode.id}
            className={`p-4 rounded-2xl border transition-all duration-base flex flex-col justify-between space-y-3 ${
              mode.highlight
                ? 'bg-amber-500/10 border-amber-500/40 shadow-sm'
                : 'bg-white/5 border-white/5 hover:border-white/15'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl select-none" role="img" aria-label={mode.title}>
                {mode.icon}
              </span>
              {mode.highlight && (
                <span className="px-2 py-0.5 rounded-md bg-amber-500 text-bg-base font-mono font-bold text-[10px] uppercase">
                  Best Choice
                </span>
              )}
            </div>

            <div>
              <div className="text-xs font-display font-bold text-text-high">
                {mode.title}
              </div>
              <div className="text-sm font-display font-black text-amber-300 mt-1">
                {mode.time}
              </div>
              <div className="text-xs font-mono text-emerald-400 font-semibold mt-0.5">
                {mode.fare}
              </div>
            </div>

            <p className="text-[11px] text-text-mid font-sans leading-relaxed border-t border-white/5 pt-2">
              {mode.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransportComparison;
