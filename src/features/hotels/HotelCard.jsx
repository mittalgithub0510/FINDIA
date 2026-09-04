import React from 'react';
import { Star, MapPin, Navigation, Wifi, Coffee, Car, Shield, CheckCircle2, ExternalLink } from '../../components/icons';
import GlassPanel from '../../components/common/GlassPanel';
import Badge from '../../components/common/Badge';

export function HotelCard({ hotel, onSelect }) {
  const categoryVariant = {
    budget: 'emerald',
    moderate: 'amber',
    premium: 'gold'
  }[hotel.category] || 'emerald';

  const categoryLabel = {
    budget: 'Budget Friendly',
    moderate: 'Mid-Range / Moderate',
    premium: 'Premium Luxury'
  }[hotel.category] || hotel.category;

  return (
    <GlassPanel className="p-5 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-all duration-300 group">
      <div className="space-y-3">
        {/* Header Badges & Rating */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Badge variant={categoryVariant} size="sm" className="uppercase tracking-wider font-mono text-[10px]">
            {categoryLabel}
          </Badge>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-xs">
            <Star size={13} className="text-amber-400 fill-amber-400" />
            <span className="font-bold text-text-high">{hotel.rating || 'N/A'}</span>
            {hotel.reviewCount && (
              <span className="text-[10px] text-text-low font-mono">({hotel.reviewCount})</span>
            )}
          </div>
        </div>

        {/* Title & Area */}
        <div>
          <h3 className="text-lg font-bold font-display text-text-high group-hover:text-amber-300 transition-colors">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-text-mid mt-0.5">
            <MapPin size={13} className="text-amber-400 shrink-0" />
            <span className="truncate">{hotel.area}</span>
          </div>
        </div>

        {/* Price & Value Score */}
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-mono text-text-low">Approx Starting</div>
            <div className="text-sm font-extrabold text-amber-300 font-mono">{hotel.priceRange}</div>
          </div>
          {hotel.valueScore && (
            <div className="text-right">
              <div className="text-[10px] uppercase font-mono text-text-low">Value Score</div>
              <div className="text-xs font-bold text-emerald-400 font-mono">{hotel.valueScore} / 10</div>
            </div>
          )}
        </div>

        {/* Nearest Attractions Pill */}
        {hotel.nearestAttractions && hotel.nearestAttractions.length > 0 && (
          <div className="space-y-1">
            <div className="text-[10px] uppercase font-mono text-text-low flex items-center gap-1">
              <Navigation size={11} className="text-amber-400" />
              <span>Nearest Tourist Attraction</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs">
              <span className="font-bold text-amber-200">{hotel.nearestAttractions[0].name}</span>
              <span className="font-mono text-[10px] text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                {hotel.nearestAttractions[0].distanceKm} km away
              </span>
            </div>
          </div>
        )}

        {/* Metro Connectivity Badge */}
        {hotel.nearestMetro && (
          <div className="text-xs text-text-mid flex items-center justify-between pt-1 border-t border-white/10">
            <span className="truncate">🚇 {hotel.nearestMetro.name}</span>
            <span className="font-mono text-[10px] text-text-low shrink-0">{hotel.nearestMetro.distanceKm} km walk</span>
          </div>
        )}

        {/* Amenities Preview */}
        {hotel.amenities && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {hotel.amenities.slice(0, 4).map((amenity, idx) => (
              <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-text-mid">
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 4 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-text-low">
                +{hotel.amenities.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <button
        onClick={() => onSelect && onSelect(hotel)}
        className="w-full mt-2 py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500 border border-amber-500/40 text-amber-300 hover:text-bg-base text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
      >
        <span>View Details & Tourism Details</span>
        <ExternalLink size={13} />
      </button>
    </GlassPanel>
  );
}

export default HotelCard;
