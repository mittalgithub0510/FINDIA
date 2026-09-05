import React from 'react';
import { CheckCircle2 } from '../icons';
import { cn } from '../../utils/cn';
import { useLiveCrowd } from '../../hooks/useLiveCrowd';

function TelemetryRow({ item, city }) {
  const live = useLiveCrowd(item.title, city, {
    crowdPercentage: parseInt(item.badgeText, 10) || 25,
    status: item.badgeType === 'peak' ? 'Peak' : 'Open',
    waitTime: item.status,
  });

  const percentage = live.crowdPercentage ?? 25;
  const isPeak = live.status === 'Peak' || percentage >= 75;
  const badgeText = `${percentage}% ${live.status}`;

  return (
    <div
      className={cn(
        'flex items-center justify-between p-1.5 rounded-xl bg-white/5 border text-xs backdrop-blur-sm transition-all',
        isPeak ? 'border-amber-500/40' : 'border-white/15'
      )}
    >
      <div>
        <div className={cn('font-bold text-xs', isPeak ? 'text-amber-200' : 'text-text-high')}>
          {item.title}
        </div>
        <div className={cn('text-[9px] font-mono', isPeak ? 'text-amber-400' : 'text-emerald-300')}>
          {live.waitTime || item.status}
        </div>
      </div>
      <span
        className={cn(
          'text-[9px] font-bold px-2 py-0.5 rounded-full border transition-colors',
          isPeak
            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
        )}
      >
        {badgeText}
      </span>
    </div>
  );
}

/**
 * Reusable Live Telemetry Snapshot Card with real-time crowd telemetry.
 */
export function LiveTelemetrySnapshotCard({
  cityName = 'Delhi',
  citySlug = 'delhi',
  items = [],
  recommendation = '',
  className = '',
}) {
  return (
    <div
      className={cn(
        'p-3 sm:p-3.5 rounded-2xl border border-white/20 shadow-glass space-y-2 backdrop-blur-xl bg-black/40 hover:bg-black/50 transition-all max-w-[340px]',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-white/15 pb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="text-amber-400 font-mono text-xs">◉</span>
          <span className="text-[10px] uppercase font-mono font-bold text-amber-300 tracking-wider">
            LIVE TELEMETRY SNAPSHOT
          </span>
        </div>
        <span className="text-[9px] text-emerald-400 font-mono font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {cityName}
        </span>
      </div>

      <div className="space-y-1.5">
        {items.map((item) => (
          <TelemetryRow
            key={item.title + citySlug}
            item={item}
            city={citySlug}
          />
        ))}
      </div>

      {recommendation && (
        <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/35 text-xs space-y-0.5 backdrop-blur-sm">
          <div className="font-bold text-amber-300 font-mono flex items-center gap-1 text-[9px]">
            <CheckCircle2 size={11} className="text-emerald-400" />
            <span>FINDIA Recommendation</span>
          </div>
          <div className="text-[9px] text-text-mid leading-tight">
            {recommendation}
          </div>
        </div>
      )}
    </div>
  );
}

export default LiveTelemetrySnapshotCard;
