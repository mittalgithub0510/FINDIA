import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Sparkles } from '../../../components/icons';

/**
 * Plan My Day & Directions CTA Integration Component (Section 6, Steps 7 & 8).
 *
 * @param {Object} props
 * @param {Object} props.place - Canonical place record
 */
export function PlanMyDayCTA({ place }) {
  const navigate = useNavigate();

  if (!place) return null;

  const handlePlanMyDay = () => {
    // Route to Findia AI Day Planner with place context
    navigate(`/findia-ai?destination=${encodeURIComponent(place.slug || place.id)}`);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${place.name} ${place.location || 'Delhi'}`
  )}`;

  return (
    <div className="glass-heavy p-6 rounded-3xl border border-white/15 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <h4 className="font-display font-bold text-base text-text-high">
          Ready to Visit {place.name}?
        </h4>
        <p className="text-xs text-text-mid">
          Add to your custom itinerary or launch live transit navigation.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 shrink-0">
        {/* Get Directions Button */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-text-high border border-white/15 text-xs font-bold transition-colors cursor-pointer select-none"
        >
          <span>Get Directions</span>
          <ExternalLink size={14} />
        </a>

        {/* Plan My Day Button */}
        <button
          type="button"
          onClick={handlePlanMyDay}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-bg-base text-xs font-bold transition-colors shadow-lifted cursor-pointer select-none"
        >
          <Sparkles size={14} />
          <span>Plan My Day</span>
        </button>
      </div>
    </div>
  );
}

export default PlanMyDayCTA;
