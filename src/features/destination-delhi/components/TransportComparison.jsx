import React from 'react';
import { Metro, Sparkle } from '../../../components/icons';

/**
 * Transport Comparison Component (Section 6, Step 6).
 * Compares Metro, Bus, Auto, and Cab modes with static estimates.
 * Clearly labeled as static estimates with a dedicated FINDIA recommendation.
 *
 * @param {Object} props
 * @param {Object} props.place - Canonical place record
 */
export function TransportComparison({ place }) {
  if (!place || !place.transport) return null;

  const transport = place.transport;

  const modes = [
    {
      id: 'metro',
      title: 'Delhi Metro',
      icon: '🚇',
      time: transport.metro?.time || '20-30 mins',
      fare: transport.metro?.fare || '₹20-40',
      note: transport.metro?.note || 'Most reliable avoid peak road congestion',
      highlight: true,
    },
    {
      id: 'auto',
      title: 'Auto Rickshaw',
      icon: '🛺',
      time: transport.auto?.time || '25-35 mins',
      fare: transport.auto?.fare || '₹100-160',
      note: transport.auto?.note || 'Convenient for last-mile transfers',
      highlight: false,
    },
    {
      id: 'cab',
      title: 'Cab / Taxi',
      icon: '🚕',
      time: transport.cab?.time || '25-40 mins',
      fare: transport.cab?.fare || '₹180-280',
      note: transport.cab?.note || 'Air-conditioned comfort across long transits',
      highlight: false,
    },
    {
      id: 'bus',
      title: 'DTC City Bus',
      icon: '🚌',
      time: transport.bus?.time || '40-55 mins',
      fare: transport.bus?.fare || '₹10-25',
      note: transport.bus?.note || 'Economical connectivity across all Delhi rings',
      highlight: false,
    },
  ];

  return (
    <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 shadow-card space-y-4">
      {/* Header with Static Estimates tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-amber-400 flex items-center gap-2">
            <Metro size={15} />
            <span>Transit & Access Comparison</span>
          </h3>
          <p className="text-xs text-text-mid mt-0.5">
            Arrival estimates from central transit hubs to {place.name}.
          </p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/10 text-amber-300 border border-white/15 shrink-0">
          Static Estimates
        </span>
      </div>

      {/* Modes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {modes.map((mode) => (
          <div
            key={mode.id}
            className={`p-4 rounded-2xl border transition-all ${
              mode.highlight
                ? 'bg-amber-500/10 border-amber-500/30'
                : 'bg-white/5 border-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl select-none">{mode.icon}</span>
              {mode.highlight && (
                <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-amber-500 text-bg-base">
                  Recommended
                </span>
              )}
            </div>

            <div className="mt-2 space-y-1">
              <div className="font-semibold text-xs text-text-high">{mode.title}</div>
              <div className="text-xs text-amber-300 font-mono font-bold">{mode.time}</div>
              <div className="text-[11px] text-text-low font-mono">{mode.fare}</div>
              <p className="text-[11px] text-text-mid pt-1 line-clamp-2 leading-relaxed">
                {mode.note}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* FINDIA Editorial Recommendation */}
      <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/20 flex items-start gap-2.5 text-xs text-text-mid">
        <Sparkle size={15} className="text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-amber-300">FINDIA Recommendation: </span>
          <span>
            Delhi Metro is the most predictable transport during midday and evening rush hours (09:00–11:00 AM & 05:00–08:00 PM). Combine with an e-rickshaw for the final 500m to the monument gate.
          </span>
        </div>
      </div>
    </div>
  );
}

export default TransportComparison;
