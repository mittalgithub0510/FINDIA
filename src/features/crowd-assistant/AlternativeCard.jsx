import React from 'react';
import { CrowdBadge } from '../../components/common/CrowdBadge';
import { Walk, ArrowRight } from '../../components/icons';
import { cn } from '../../utils/cn';

/**
 * Compact alternative suggestion card rendered within AI assistant recommendations.
 *
 * @component
 * @param {Object} props
 * @param {string} props.title - Monument or site name
 * @param {string} props.distance - Walking or transit distance
 * @param {'low' | 'moderate' | 'heavy' | 'unknown'} props.crowdLevel - Live crowd status
 * @param {string} [props.crowdUpdatedAt] - Timestamp of telemetry
 * @param {string} props.description - Concrete editorial line
 * @param {string} [props.className]
 */
export function AlternativeCard({
  title,
  distance,
  crowdLevel = 'low',
  crowdUpdatedAt,
  description,
  className = '',
}) {
  const handleSelectAlternative = () => {
    // TODO: Wire navigation or itinerary rerouting when teammate implements backend
    console.info(`[CrowdAssistant] Alternative selected: "${title}" (routing pending).`);
  };

  return (
    <button
      type="button"
      onClick={handleSelectAlternative}
      className={cn(
        'w-full text-left p-3 rounded-lg bg-bg-base/90 border border-border-default hover:border-brand/50 hover:bg-bg-base transition-all duration-fast space-y-2 group cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-brand',
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-0.5">
          <h4 className="font-display font-semibold text-text-high text-xs sm:text-sm group-hover:text-accent-300 transition-colors">
            {title}
          </h4>
          <div className="flex items-center gap-1.5 text-[11px] text-text-low font-sans">
            <Walk size={12} className="text-brand shrink-0" />
            <span>{distance}</span>
          </div>
        </div>

        <CrowdBadge level={crowdLevel} updatedAt={crowdUpdatedAt} size="sm" />
      </div>

      <p className="type-body-sm text-xs text-text-mid line-clamp-2">
        {description}
      </p>

      <div className="flex items-center justify-end gap-1 text-[11px] text-brand font-medium pt-1 border-t border-white/5">
        <span>View Details</span>
        <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
      </div>
    </button>
  );
}

export default AlternativeCard;
