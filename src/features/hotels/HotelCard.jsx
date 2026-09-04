import React from 'react';
import { Star, MapPin } from '../../components/icons';

export function HotelCard({ hotel, onSelect }) {
  const categoryLabel = {
    budget: 'Budget friendly',
    moderate: 'Mid-range',
    premium: 'Premium luxury'
  }[hotel.category] || hotel.category;

  return (
    <div className="bg-[#1B1613] border border-[#2E271F] rounded-[14px] p-5 flex flex-col justify-between space-y-4 hover:border-[#8A7238] transition-colors duration-200 group">
      <div className="space-y-3.5">
        {/* 1. Top Row: Tier Badge (pill with gold outline) + Star Rating & Review Count */}
        <div className="flex items-center justify-between gap-2">
          <span className="px-3 py-0.5 rounded-full border border-[#8A7238] text-[#C9A24B] text-xs font-medium bg-[#C9A24B]/[0.07]">
            {categoryLabel}
          </span>

          <div className="flex items-center gap-1.5 text-xs text-[#F3EBDC]">
            <Star size={14} className="text-[#C9A24B] fill-[#C9A24B]" />
            <span className="font-medium text-[#F3EBDC]">{hotel.rating || 'N/A'}</span>
            {hotel.reviewCount && (
              <span className="text-[#9C9186] font-normal">({hotel.reviewCount.toLocaleString()})</span>
            )}
          </div>
        </div>

        {/* 2. Hotel Name (Serif, ~26px, warm cream) */}
        <h3 className="font-['Fraunces',serif] text-[24px] sm:text-[26px] font-medium text-[#F3EBDC] leading-snug tracking-tight group-hover:text-[#F3EBDC]/90 transition-colors">
          {hotel.name}
        </h3>

        {/* 3. Location Line (Muted grey-brown) */}
        <div className="flex items-center gap-1.5 text-xs text-[#9C9186]">
          <MapPin size={14} className="text-[#9C9186] shrink-0" />
          <span className="truncate">{hotel.area}</span>
        </div>

        {/* 4. Single Unified Price & Value Block */}
        <div className="p-3 rounded-xl bg-[#17130F] border border-[#2E271F] flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] text-[#9C9186] block">Approx. starting</span>
            <span className="text-sm sm:text-base font-semibold text-[#C9A24B]">
              {hotel.priceRange}
            </span>
          </div>
          {hotel.valueScore && (
            <div className="text-right">
              <span className="text-[11px] text-[#9C9186] block">Value score</span>
              <span className="text-xs font-semibold text-[#5FA97C] bg-[#5FA97C]/10 border border-[#5FA97C]/30 px-2.5 py-0.5 rounded-full inline-block">
                {hotel.valueScore}/10
              </span>
            </div>
          )}
        </div>

        {/* 5. Nearest Tourist Attraction Route Element */}
        {hotel.nearestAttractions && hotel.nearestAttractions.length > 0 && (
          <div className="pl-3 py-2 pr-2.5 rounded-lg bg-[#17130F] border border-[#2E271F] border-l-2 border-l-[#C9A24B] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#C9A24B] shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-medium text-[#F3EBDC] block truncate">
                  {hotel.nearestAttractions[0].name}
                </span>
                <span className="text-[10px] text-[#9C9186] block">
                  Nearest tourist attraction
                </span>
              </div>
            </div>
            <span className="text-[11px] font-medium text-[#5FA97C] bg-[#5FA97C]/10 border border-[#5FA97C]/30 px-2.5 py-0.5 rounded-full shrink-0">
              {hotel.nearestAttractions[0].distanceKm} km away
            </span>
          </div>
        )}

        {/* 6. Metro / Transit Line */}
        {hotel.nearestMetro && (
          <div className="flex items-center justify-between text-xs text-[#9C9186] px-0.5">
            <span className="truncate">🚇 {hotel.nearestMetro.name}</span>
            <span className="shrink-0">{hotel.nearestMetro.distanceKm} km walk</span>
          </div>
        )}

        {/* 7. Amenities Pill Chips */}
        {hotel.amenities && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {hotel.amenities.slice(0, 4).map((amenity, idx) => (
              <span key={idx} className="text-[11px] px-2.5 py-1 rounded-full bg-[#17130F] border border-[#2E271F] text-[#9C9186]">
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 4 && (
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#C9A24B]/[0.07] border border-[#8A7238] text-[#C9A24B] font-medium">
                +{hotel.amenities.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* 8. Single CTA Button: Full width, gold bg, dark text, rounded pill, "View details" */}
      <button
        onClick={() => onSelect && onSelect(hotel)}
        className="w-full py-2.5 px-4 rounded-full bg-[#C9A24B] hover:brightness-110 text-[#1B1613] text-xs font-semibold transition-all duration-150 text-center cursor-pointer"
      >
        View details
      </button>
    </div>
  );
}

export default HotelCard;
