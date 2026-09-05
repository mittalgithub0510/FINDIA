import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Check, ExternalLink } from '../../../components/icons';

/**
 * Plan My Day CTA Banner Component for Prayagraj.
 *
 * @param {Object} props
 * @param {Object} props.place - Canonical place record
 */
export function PlanMyDayCTA({ place }) {
  const navigate = useNavigate();

  if (!place) return null;

  const handlePlanClick = () => {
    navigate(`/findia-ai?destination=${encodeURIComponent(place.slug || place.id)}&city=prayagraj`);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${place.name} ${place.location || 'Prayagraj'}`
  )}`;

  return (
    <section className="relative rounded-3xl p-8 sm:p-10 overflow-hidden glass-panel border border-amber-500/30 text-center space-y-5 shadow-card">
      <div
        className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-wider">
          <Sparkles size={13} />
          <span>FINDIA AI Smart Itinerary Engine</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-text-high tracking-tight">
          Experience {place.name} at the Perfect Moment
        </h2>

        <p className="text-sm text-text-mid font-sans leading-relaxed">
          FINDIA AI combines real-time visitor density, seasonal boat schedules, and congestion patterns to sequence {place.name} smoothly into your day plan.
        </p>

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-text-high border border-white/15 text-xs font-bold transition-colors cursor-pointer select-none"
          >
            <span>Get Directions</span>
            <ExternalLink size={14} />
          </a>
          <button
            type="button"
            onClick={handlePlanClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-bg-base font-bold text-sm transition-transform duration-fast active:scale-95 shadow-lifted cursor-pointer"
          >
            <span>Plan My Day Around {place.name}</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-text-low font-mono">
          <Check size={14} className="text-emerald-400" />
          <span>Calculates transit times, ghat crowd lulls, and authentic food pairings</span>
        </div>
      </div>
    </section>
  );
}

export default PlanMyDayCTA;
