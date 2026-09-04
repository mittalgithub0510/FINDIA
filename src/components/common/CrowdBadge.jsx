import React from 'react';
import { cn } from '../../utils/cn';
import { formatRelativeTime } from '../../utils/formatRelativeTime';
import { Crowd } from '../icons';

/**
 * First-class live telemetry badge displaying real-time crowd congestion at monuments and bazaars.
 * Accessible by design: pairs color with a 3-tier segmented meter so color alone is never relied upon.
 *
 * @component
 * @example
 * // Live low crowd indicator
 * <CrowdBadge level="low" updatedAt="2026-09-03T10:15:00Z" />
 *
 * @example
 * // Placed over photography
 * <CrowdBadge level="heavy" onGlass size="sm" />
 *
 * @param {Object} props
 * @param {'low' | 'moderate' | 'heavy' | 'unknown'} [props.level='unknown'] - Congestion level
 * @param {Date|string|number} [props.updatedAt] - Telemetry timestamp for relative time display
 * @param {'sm' | 'md'} [props.size='sm'] - Display size
 * @param {boolean} [props.showLabel=true] - Whether to show the friendly textual status label
 * @param {boolean} [props.onGlass=false] - Whether to render with .glass-chip styling for photo overlays
 * @param {string} [props.className] - Additional utility classes
 */
export function CrowdBadge({
  level = 'unknown',
  updatedAt,
  size = 'sm',
  showLabel = true,
  onGlass = false,
  className = '',
  ...rest
}) {
  const config = {
    low: {
      label: 'Not crowded',
      barsFilled: 1,
      colorClass: 'text-crowd-low',
      dotClass: 'bg-crowd-low',
      borderClass: 'border-crowd-low/30',
      bgClass: 'bg-crowd-low/10',
      ariaText: 'Crowd status: Not crowded (under 30% capacity)',
    },
    moderate: {
      label: 'Getting busy',
      barsFilled: 2,
      colorClass: 'text-crowd-moderate',
      dotClass: 'bg-crowd-moderate',
      borderClass: 'border-crowd-moderate/30',
      bgClass: 'bg-crowd-moderate/10',
      ariaText: 'Crowd status: Getting busy (30% to 70% capacity)',
    },
    heavy: {
      label: 'Very crowded',
      barsFilled: 3,
      colorClass: 'text-crowd-heavy',
      dotClass: 'bg-crowd-heavy',
      borderClass: 'border-crowd-heavy/30',
      bgClass: 'bg-crowd-heavy/10',
      ariaText: 'Crowd status: Very crowded (over 70% capacity)',
    },
    unknown: {
      label: 'No data',
      barsFilled: 0,
      colorClass: 'text-crowd-unknown',
      dotClass: 'bg-crowd-unknown/40',
      borderClass: 'border-border-default',
      bgClass: 'bg-bg-raised',
      ariaText: 'Crowd status: Telemetry unavailable',
    },
  };

  const active = config[level] || config.unknown;
  const formattedTime = updatedAt ? formatRelativeTime(updatedAt) : null;

  return (
    <div
      role="status"
      aria-label={active.ariaText}
      className={cn(
        'inline-flex items-center rounded-pill font-sans transition-colors select-none',
        size === 'sm' ? 'text-xs px-2.5 py-1 gap-2' : 'text-sm px-3.5 py-1.5 gap-2.5',
        onGlass
          ? 'glass-chip text-text-high'
          : cn('border', active.bgClass, active.borderClass, 'text-text-high'),
        className
      )}
      {...rest}
    >
      {/* Icon + 3-Segment Meter (guarantees non-color distinctiveness) */}
      <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
        <Crowd
          size={size === 'sm' ? 14 : 16}
          className={active.colorClass}
        />

        {/* 3-Bar Segmented Indicator: 1 filled = low, 2 filled = moderate, 3 filled = heavy, dashed = unknown */}
        <div className="flex items-end gap-0.5 h-3">
          {[1, 2, 3].map((barIndex) => {
            const isFilled = active.barsFilled >= barIndex;
            return (
              <span
                key={barIndex}
                className={cn(
                  'w-1 rounded-full transition-colors',
                  barIndex === 1 ? 'h-1.5' : barIndex === 2 ? 'h-2.25' : 'h-3',
                  level === 'unknown'
                    ? 'bg-text-low/30 border-b border-text-low/60'
                    : isFilled
                    ? active.dotClass
                    : 'bg-white/15'
                )}
              />
            );
          })}
        </div>
      </div>

      {/* Human-friendly Label */}
      {showLabel && (
        <span className="font-medium tracking-tight">
          {active.label}
        </span>
      )}

      {/* Optional Relative Telemetry Timestamp */}
      {formattedTime && (
        <span
          className={cn(
            'numeral text-text-low border-l border-white/15 pl-1.5 font-normal',
            size === 'sm' ? 'text-[10px]' : 'text-xs'
          )}
          title={typeof updatedAt === 'string' ? updatedAt : undefined}
        >
          {formattedTime}
        </span>
      )}
    </div>
  );
}

export default CrowdBadge;
