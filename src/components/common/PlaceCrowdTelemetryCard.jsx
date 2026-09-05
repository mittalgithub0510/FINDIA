import React, { useState, useMemo } from 'react';
import { useLiveCrowd } from '../../hooks/useLiveCrowd';
import { getHourlyCrowdProfile } from '../../services/liveCrowdClient';
import { Crowd, Clock, Sparkles, CheckCircle2, TrendingUp } from '../icons';
import { cn } from '../../utils/cn';

const DAYS = [
  { id: 0, label: 'Sun', full: 'Sunday' },
  { id: 1, label: 'Mon', full: 'Monday' },
  { id: 2, label: 'Tue', full: 'Tuesday' },
  { id: 3, label: 'Wed', full: 'Wednesday' },
  { id: 4, label: 'Thu', full: 'Thursday' },
  { id: 5, label: 'Fri', full: 'Friday' },
  { id: 6, label: 'Sat', full: 'Saturday' },
];

/**
 * PlaceCrowdTelemetryCard Component
 * 
 * Displays:
 * 1. Abhi kitna crowd hai (Live Current Crowd % & Queue Wait Time)
 * 2. Kitna rehta hai (Typical/Usual Crowd Comparison & AI Recommendation)
 * 3. Hourly kya crowd hai (Interactive 16-Hour Popular Times Histogram with Day Selector)
 */
export function PlaceCrowdTelemetryCard({
  place,
  city = 'delhi',
  className = '',
}) {
  const placeIdentifier = place?.slug || place?.id || place?.name || '';
  const now = new Date();
  const istDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const todayDayIndex = istDate.getDay();

  // Active day filter for hourly chart (defaults to today)
  const [selectedDay, setSelectedDay] = useState(todayDayIndex);

  // Live crowd hook for the specific place
  const live = useLiveCrowd(placeIdentifier, city);

  // Calculate 16-hour profile for the selected day
  const profile = useMemo(() => {
    return getHourlyCrowdProfile(placeIdentifier, city, selectedDay);
  }, [placeIdentifier, city, selectedDay]);

  // Selected bar for detailed inspection
  const [hoveredHour, setHoveredHour] = useState(null);

  if (!place) return null;

  // Active inspection target: hovered hour or current hour
  const inspectedSlot = hoveredHour !== null
    ? profile.hourlyData.find((h) => h.hour === hoveredHour)
    : profile.hourlyData.find((h) => h.isCurrentHour) || profile.hourlyData[6]; // default midday

  const isClosed = live.status === 'Closed';
  const livePercent = live.crowdPercentage ?? profile.typicalPercentage;
  const isPeakLive = !isClosed && (live.status === 'Peak' || livePercent >= 75);
  const isModerateLive = !isClosed && (live.status === 'Moderate' || (livePercent >= 35 && livePercent < 75));

  const delta = livePercent - profile.typicalPercentage;
  let comparisonText = 'Typical for this hour';
  if (isClosed) comparisonText = 'Venue closed';
  else if (delta > 8) comparisonText = `${delta}% more crowded than usual`;
  else if (delta < -8) comparisonText = `${Math.abs(delta)}% quieter than usual`;

  return (
    <section
      aria-label="Live Crowd Telemetry & Hourly Popular Times"
      className={cn(
        'glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 shadow-card space-y-6 select-none',
        className
      )}
    >
      {/* 1. Header with Live Pulse Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-amber-400">
              <Crowd size={18} />
            </span>
            <span className="text-[11px] font-mono uppercase font-bold tracking-widest text-amber-300">
              Live Crowd Telemetry & Popular Times
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-text-high">
            Real-Time Footfall & Hourly Rush
          </h2>
          <p className="text-xs text-text-mid">
            Live telemetry signals, wait queues, and historical diurnal curves for {place.name}.
          </p>
        </div>

        {/* Live Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold shrink-0 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{live.isLive ? 'LIVE GOOGLE MAPS SIGNAL' : 'LIVE IST TELEMETRY'}</span>
        </div>
      </div>

      {/* 2. Top Metric Cards: Abhi Kitna Hai vs Kitna Rehta Hai */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Abhi Kitna Crowd Hai */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-text-mid uppercase">
              Current Crowd (Abhi)
            </span>
            <span
              className={cn(
                'text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border',
                isClosed
                  ? 'bg-neutral-500/20 text-neutral-300 border-neutral-500/30'
                  : isPeakLive
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  : isModerateLive
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              )}
            >
              {isClosed ? 'Closed' : (live.status || (isPeakLive ? 'Peak' : 'Quiet'))}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span
              className={cn(
                'font-extrabold font-mono tracking-tight',
                isClosed
                  ? 'text-neutral-400 text-3xl'
                  : isPeakLive
                  ? 'text-rose-400 text-4xl'
                  : isModerateLive
                  ? 'text-amber-400 text-4xl'
                  : 'text-emerald-400 text-4xl'
              )}
            >
              {isClosed ? 'CLOSED' : `${livePercent}%`}
            </span>
            <span className="text-xs text-text-mid font-medium">
              {isClosed ? 'outside visiting hours' : 'busy right now'}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/5">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-1000',
                isClosed
                  ? 'bg-neutral-600'
                  : isPeakLive
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                  : isModerateLive
                  ? 'bg-gradient-to-r from-emerald-500 to-amber-500'
                  : 'bg-gradient-to-r from-teal-500 to-emerald-400'
              )}
              style={{ width: `${isClosed ? 0 : Math.min(100, Math.max(5, livePercent))}%` }}
            />
          </div>
        </div>

        {/* Card 2: Queue & Typical (Kitna Rehta Hai) */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-text-mid uppercase">
              Typical Footfall & Queue
            </span>
            <Clock size={14} className="text-amber-400" />
          </div>

          <div className="space-y-1">
            <div className="text-lg font-bold text-text-high flex items-center gap-1.5 font-mono">
              <span>{live.waitTime || '0 min line'}</span>
            </div>
            <div className="text-xs text-text-mid">
              <span>Usually ~{profile.typicalPercentage}% busy</span>
              <span className="mx-1.5">•</span>
              <span className={cn('font-medium', delta > 8 ? 'text-amber-400' : 'text-emerald-400')}>
                {comparisonText}
              </span>
            </div>
          </div>

          <div className="text-[11px] text-text-low font-mono flex items-center gap-1 pt-1">
            <TrendingUp size={12} className="text-amber-400" />
            <span>Updated with IST diurnal curve</span>
          </div>
        </div>

        {/* Card 3: Best Time to Visit (AI Recommendation) */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2.5">
          <div className="flex items-center gap-1.5 text-amber-300 font-mono text-xs font-bold uppercase">
            <Sparkles size={14} />
            <span>Best Visiting Window</span>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-bold text-amber-200">
              {profile.bestVisitingTime}
            </div>
            <div className="text-xs text-text-mid leading-relaxed">
              Bypass high tourist congestion by planning your entry during off-peak morning or late twilight hours.
            </div>
          </div>

          <div className="text-[11px] text-rose-300/90 font-mono flex items-center gap-1 pt-0.5">
            <span>Peak Rush: {profile.peakVisitingTime}</span>
          </div>
        </div>
      </div>

      {/* 3. Day of Week Switcher Tabs */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-text-mid flex items-center gap-1.5">
            <span>Hourly Footfall Pattern</span>
            <span className="text-text-low font-normal">(Select a day to view historical rush)</span>
          </div>

          <span className="text-xs text-amber-400 font-mono font-bold">
            {DAYS.find((d) => d.id === selectedDay)?.full}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {DAYS.map((d) => {
            const isSelected = selectedDay === d.id;
            const isToday = todayDayIndex === d.id;

            return (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  setSelectedDay(d.id);
                  setHoveredHour(null);
                }}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border shrink-0',
                  isSelected
                    ? 'bg-amber-500 text-bg-base border-amber-400 shadow-md font-extrabold'
                    : 'bg-white/5 text-text-mid border-white/10 hover:text-text-high hover:bg-white/10'
                )}
              >
                <span>{d.label}</span>
                {isToday && (
                  <span
                    className={cn(
                      'text-[9px] px-1 rounded',
                      isSelected ? 'bg-bg-base text-amber-400' : 'bg-amber-500/20 text-amber-300'
                    )}
                  >
                    Today
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Interactive 16-Hour Visual Histogram (6 AM to 9 PM) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
        {/* Inspection Banner: displays data for the hovered / active hour */}
        {inspectedSlot && (
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">
                {inspectedSlot.label}
              </span>
              {inspectedSlot.isCurrentHour && (
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
                  CURRENT HOUR
                </span>
              )}
              <span className="text-text-mid">
                • {inspectedSlot.percentage}% Busyness
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'px-2 py-0.5 rounded text-[10px] font-bold',
                  inspectedSlot.percentage === 0
                    ? 'bg-neutral-500/20 text-neutral-300'
                    : inspectedSlot.percentage >= 75
                    ? 'bg-rose-500/20 text-rose-300'
                    : inspectedSlot.percentage >= 35
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                )}
              >
                {inspectedSlot.status}
              </span>
              <span className="text-text-low text-[11px]">
                {inspectedSlot.percentage === 0
                  ? 'Gates closed'
                  : inspectedSlot.waitMinutes > 0
                  ? `Est. queue: ~${inspectedSlot.waitMinutes} mins`
                  : 'Minimal queue'}
              </span>
            </div>
          </div>
        )}

        {/* 16-Hour Bar Grid */}
        <div className="h-44 sm:h-48 flex items-end justify-between gap-1 sm:gap-2 pt-6 pb-2 px-1">
          {profile.hourlyData.map((slot) => {
            const isHovered = hoveredHour === slot.hour;
            const isCurrent = slot.isCurrentHour;
            const isClosedSlot = slot.percentage === 0;
            const heightPct = isClosedSlot ? 4 : Math.max(8, slot.percentage);

            return (
              <div
                key={slot.hour}
                onMouseEnter={() => setHoveredHour(slot.hour)}
                onMouseLeave={() => setHoveredHour(null)}
                onClick={() => setHoveredHour(slot.hour)}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
              >
                {/* Floating "NOW" Badge on Current Hour */}
                {isCurrent && (
                  <span className="absolute -top-6 text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-emerald-400 text-bg-base animate-bounce shadow-md">
                    NOW
                  </span>
                )}

                {/* Vertical Bar */}
                <div
                  className={cn(
                    'w-full max-w-[28px] rounded-t-lg transition-all duration-base relative overflow-hidden',
                    isClosedSlot
                      ? 'bg-white/10 hover:bg-white/20'
                      : slot.percentage >= 75
                      ? 'bg-rose-500 hover:bg-rose-400 shadow-rose-500/20'
                      : slot.percentage >= 35
                      ? 'bg-amber-400 hover:bg-amber-300 shadow-amber-400/20'
                      : 'bg-emerald-400 hover:bg-emerald-300 shadow-emerald-400/20',
                    isCurrent && !isClosedSlot && 'ring-2 ring-emerald-300 ring-offset-2 ring-offset-bg-base shadow-lg shadow-emerald-500/30 scale-105',
                    isCurrent && isClosedSlot && 'ring-2 ring-neutral-400 ring-offset-2 ring-offset-bg-base scale-105',
                    isHovered && 'brightness-125 scale-105'
                  )}
                  style={{ height: `${heightPct}%` }}
                >
                  {/* Glass shimmer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/20 pointer-events-none" />
                </div>

                {/* Hour Label below bar */}
                <span
                  className={cn(
                    'text-[9px] sm:text-[10px] font-mono mt-2 transition-colors',
                    isCurrent
                      ? 'text-emerald-300 font-extrabold'
                      : isHovered
                      ? 'text-amber-300 font-bold'
                      : 'text-text-low'
                  )}
                >
                  {slot.shortLabel}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5 text-[10px] font-mono text-text-low">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-400" />
              <span>Quiet (0-35%)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-amber-400" />
              <span>Moderate (35-75%)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-rose-500" />
              <span>Peak (75%+)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-white/20" />
              <span>Closed (0%)</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 size={12} />
            <span>Click any bar to inspect hourly crowd</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlaceCrowdTelemetryCard;
