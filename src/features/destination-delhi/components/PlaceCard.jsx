import React from 'react';
import { useNavigate } from 'react-router-dom';
import { resolveDelhiImage } from '../../../data/delhi/images';
import { MapPin, Clock, ArrowRight, Star, Ticket } from '../../../components/icons';
import { cn } from '../../../utils/cn';

/**
 * Universal Place Card Component.
 * Features:
 * - Whole-card clickability (navigates to /destinations/delhi/:slug)
 * - Accessible keyboard navigation (Enter / Space)
 * - Independent Explore button with stopPropagation to prevent double-firing
 * - Data-driven props matching the canonical place schema
 *
 * @param {Object} props
 * @param {Object} props.place - Canonical place record
 * @param {string} [props.className] - Optional container classes
 */
export function PlaceCard({ place, className = '' }) {
  const navigate = useNavigate();

  if (!place) return null;

  const imageUrl = resolveDelhiImage(place.heroImage || place.image);
  const targetUrl = `/destinations/delhi/${place.slug || place.id}`;

  const handleCardClick = () => {
    navigate(targetUrl);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(targetUrl);
    }
  };

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label={`View details for ${place.name}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'group flex flex-col rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-amber-500/50 transition-all duration-base hover:-translate-y-1 shadow-card cursor-pointer select-none',
        className
      )}
    >
      {/* Place Photo Container */}
      <div className="relative h-52 w-full overflow-hidden bg-bg-raised">
        <img
          src={imageUrl}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-slow group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {Array.isArray(place.category) ? (
            place.category.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/15 text-amber-300"
              >
                {cat}
              </span>
            ))
          ) : (
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/15 text-amber-300">
              {place.category || 'Destination'}
            </span>
          )}
        </div>

        {/* Rating Badge */}
        {place.rating && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-amber-500 text-bg-base shadow-sm">
              <Star size={11} className="fill-bg-base text-bg-base" />
              <span>{place.rating}</span>
            </span>
          </div>
        )}

        {/* Location pill */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-200 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
            <MapPin size={11} className="text-amber-400" />
            <span className="truncate max-w-[200px]">{place.location || place.district}</span>
          </span>
        </div>
      </div>

      {/* Place Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="type-h3 font-display text-text-high group-hover:text-amber-300 transition-colors">
            {place.name}
          </h3>
          <p className="text-xs text-text-mid line-clamp-2 leading-relaxed">
            {place.description?.short || place.shortDesc}
          </p>
        </div>

        {/* Metadata Strip */}
        <div className="space-y-2 text-xs text-text-mid border-t border-white/10 pt-3">
          {place.estimatedVisitTime && (
            <div className="flex items-center gap-2 text-[11px] font-mono">
              <Clock size={13} className="text-amber-400 shrink-0" />
              <span>Estimated Visit: {place.estimatedVisitTime}</span>
            </div>
          )}

          {place.ticket && (
            <div className="flex items-center justify-between text-[11px] font-mono text-text-low">
              <span className="flex items-center gap-1">
                <Ticket size={12} className="text-emerald-400" />
                <span>{place.ticket.indian || 'Info coming soon'}</span>
              </span>
            </div>
          )}
        </div>

        {/* Explore Button (stopPropagation to prevent double navigation) */}
        <div className="pt-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(targetUrl);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-xs bg-amber-500/20 text-amber-200 border border-amber-500/40 group-hover:bg-amber-500 group-hover:text-bg-base transition-colors outline-none cursor-pointer"
          >
            <span>Explore Place</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceCard;
