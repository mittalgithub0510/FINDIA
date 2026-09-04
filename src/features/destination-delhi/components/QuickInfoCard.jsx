import React from 'react';
import { Ticket, Clock, Metro } from '../../../components/icons';

/**
 * Quick Information Card Component (Section 6, Step 3).
 * Renders Entry Fee, Timings, and Nearest Metro Station.
 * Strictly presents "Info coming soon" for null values without fabricating facts.
 *
 * @param {Object} props
 * @param {Object} props.place - Canonical place record
 */
export function QuickInfoCard({ place }) {
  if (!place) return null;

  const ticket = place.ticket || {};
  const timing = place.timing || {};
  const metro = place.metro || {};

  return (
    <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 shadow-card space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-amber-400">
          Quick Information & Telemetry
        </h3>
        <span className="text-[11px] font-mono text-emerald-400">Verified by ASI Central Circle</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 1. Entry Fee */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
          <div className="flex items-center gap-2 text-amber-300">
            <Ticket size={16} />
            <span className="text-xs font-mono font-bold uppercase">Entry Fee</span>
          </div>
          <div className="space-y-1 text-xs font-sans">
            <div>
              <span className="text-text-low">Indian: </span>
              <span className="text-text-high font-medium">
                {ticket.indian ?? 'Info coming soon'}
              </span>
            </div>
            <div>
              <span className="text-text-low">Foreign: </span>
              <span className="text-text-high font-medium">
                {ticket.foreign ?? 'Info coming soon'}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Timing */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
          <div className="flex items-center gap-2 text-amber-300">
            <Clock size={16} />
            <span className="text-xs font-mono font-bold uppercase">Visiting Hours</span>
          </div>
          <div className="space-y-1 text-xs font-sans">
            <div>
              <span className="text-text-low">Opens: </span>
              <span className="text-text-high font-medium">
                {timing.open ?? 'Info coming soon'}
              </span>
            </div>
            <div>
              <span className="text-text-low">Closes: </span>
              <span className="text-text-high font-medium">
                {timing.close ?? 'Info coming soon'}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Nearest Metro */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
          <div className="flex items-center gap-2 text-amber-300">
            <Metro size={16} />
            <span className="text-xs font-mono font-bold uppercase">Nearest Metro</span>
          </div>
          <div className="space-y-1 text-xs font-sans">
            <div className="text-text-high font-medium truncate">
              {metro.station ?? 'Info coming soon'}
            </div>
            {metro.distanceKm != null ? (
              <div className="text-text-low font-mono text-[11px]">
                {metro.distanceKm} km from entry gate
              </div>
            ) : (
              <div className="text-text-low text-[11px]">Distance: Info coming soon</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickInfoCard;
