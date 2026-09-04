import React from 'react';
import { X, Star, MapPin, CheckCircle2, Navigation } from '../../components/icons';

export function HotelDetailModal({ hotel, onClose }) {
  if (!hotel) return null;

  const categoryLabel = {
    budget: 'Budget friendly',
    moderate: 'Mid-range',
    premium: 'Premium luxury'
  }[hotel.category] || hotel.category;

  const officialLink = hotel.sourceUrls && hotel.sourceUrls[0] ? hotel.sourceUrls[0] : '#';
  const tourismBoardLink = hotel.sourceUrls && hotel.sourceUrls[1] ? hotel.sourceUrls[1] : officialLink;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#17130F] rounded-[16px] border border-[#2E271F] shadow-2xl text-[#F3EBDC] flex flex-col justify-between">
        
        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Close Button Top Right */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#1B1613] hover:bg-[#241F19] text-[#9C9186] hover:text-[#F3EBDC] border border-[#2E271F] transition-colors cursor-pointer"
            aria-label="Close detail modal"
          >
            <X size={18} />
          </button>

          {/* 1. Header Row: Tier Badge + Star Rating & Review Count */}
          <div className="space-y-3 pr-8">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-0.5 rounded-full border border-[#8A7238] text-[#C9A24B] text-xs font-medium bg-[#C9A24B]/[0.07]">
                {categoryLabel}
              </span>
              {hotel.rating && (
                <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#1B1613] border border-[#2E271F] text-[#F3EBDC] font-medium text-xs">
                  <Star size={13} className="text-[#C9A24B] fill-[#C9A24B]" />
                  <span>{hotel.rating} / 5.0</span>
                  {hotel.reviewCount && <span className="text-[#9C9186] font-normal">({hotel.reviewCount.toLocaleString()} reviews)</span>}
                </div>
              )}
            </div>

            {/* 2. Hotel Name & Address */}
            <h2 className="text-2xl sm:text-3xl font-medium font-['Fraunces',serif] text-[#F3EBDC] leading-snug">
              {hotel.name}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-[#9C9186]">
              <MapPin size={14} className="text-[#9C9186] shrink-0" />
              <span>{hotel.address || hotel.area}</span>
            </div>
          </div>

          {/* 3. About this stay (Descriptive paragraph in bordered box BEFORE stat grid) */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-[#C9A24B]">About this stay</h4>
            <p className="text-xs sm:text-sm text-[#D9CFC0] leading-relaxed bg-[#1B1613] p-4 rounded-xl border border-[#2E271F]">
              {hotel.description}
            </p>
          </div>

          {/* 4. 4-Column Stat Grid with Dividers */}
          <div className="bg-[#1B1613] border border-[#2E271F] rounded-xl overflow-hidden grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#241F19] text-center p-1">
            <div className="p-3">
              <span className="text-[11px] text-[#9C9186] block">Approx. price</span>
              <span className="text-xs sm:text-sm font-semibold text-[#C9A24B] block mt-0.5">{hotel.priceRange}</span>
            </div>
            <div className="p-3">
              <span className="text-[11px] text-[#9C9186] block">Check-in / out</span>
              <span className="text-xs sm:text-sm font-medium text-[#F3EBDC] block mt-0.5">{hotel.checkIn} / {hotel.checkOut}</span>
            </div>
            <div className="p-3">
              <span className="text-[11px] text-[#9C9186] block">Airport distance</span>
              <span className="text-xs sm:text-sm font-semibold text-[#5FA97C] block mt-0.5">{hotel.airportDistance} km</span>
            </div>
            <div className="p-3">
              <span className="text-[11px] text-[#9C9186] block">Value score</span>
              <span className="text-xs sm:text-sm font-semibold text-[#5FA97C] block mt-0.5">{hotel.valueScore ? `${hotel.valueScore}/10` : 'Verified'}</span>
            </div>
          </div>

          {/* 5. Tourist Suitability Recommendation Callout */}
          {hotel.touristSuitability && (
            <div className="p-4 rounded-xl bg-[#C9A24B]/[0.07] border border-[#8A7238] space-y-1">
              <div className="font-semibold text-[#C9A24B] flex items-center gap-2 text-xs">
                <CheckCircle2 size={15} className="text-[#5FA97C]" />
                <span>Tourist suitability recommendation</span>
              </div>
              <p className="text-[#F3EBDC]/90 text-xs leading-relaxed pl-5 font-normal">
                {hotel.touristSuitability}
              </p>
            </div>
          )}

          {/* 6. Nearest Major Attractions (2-Column Grid of Route Cards) */}
          {hotel.nearestAttractions && hotel.nearestAttractions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-[#C9A24B]">Nearest major attractions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {hotel.nearestAttractions.map((att, i) => (
                  <div
                    key={i}
                    className="pl-3 py-2.5 pr-2.5 rounded-lg bg-[#1B1613] border border-[#2E271F] border-l-2 border-l-[#C9A24B] flex items-center justify-between gap-2 text-xs"
                  >
                    <span className="font-medium text-[#F3EBDC] truncate">{att.name}</span>
                    <span className="text-[11px] font-medium text-[#5FA97C] bg-[#5FA97C]/10 border border-[#5FA97C]/30 px-2.5 py-0.5 rounded-full shrink-0">
                      {att.distanceKm} km away
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. Transit Info (Two Side-by-Side Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {hotel.nearestMetro && (
              <div className="p-3.5 rounded-xl bg-[#1B1613] border border-[#2E271F] text-xs space-y-1">
                <div className="text-[11px] text-[#9C9186]">Nearest metro station</div>
                <div className="font-medium text-[#F3EBDC]">🚇 {hotel.nearestMetro.name}</div>
                <div className="text-[11px] text-[#5FA97C]">{hotel.nearestMetro.distanceKm} km walk/transit</div>
              </div>
            )}
            {hotel.transportAccessibility && (
              <div className="p-3.5 rounded-xl bg-[#1B1613] border border-[#2E271F] text-xs space-y-1">
                <div className="text-[11px] text-[#9C9186]">Transit accessibility</div>
                <div className="text-[#9C9186] leading-snug">{hotel.transportAccessibility}</div>
              </div>
            )}
          </div>

          {/* 8. Verified Amenities */}
          {hotel.amenities && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-[#C9A24B]">Verified amenities</h4>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-[#1B1613] border border-[#2E271F] text-xs text-[#9C9186] flex items-center gap-1.5"
                  >
                    <span className="text-[#5FA97C] font-bold">✓</span>
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 9. Footer Bar */}
        <div className="px-6 sm:px-8 py-4 bg-[#13100C] border-t border-[#2E271F] rounded-b-[16px] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-[#9C9186]">Verified data source</span>
          <div className="flex items-center gap-2">
            <a
              href={officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-[#1B1613] border border-[#2E271F] hover:border-[#8A7238] hover:bg-[#C9A24B]/10 text-[#F3EBDC] font-medium text-xs transition-all flex items-center gap-1.5"
            >
              <span>🏨 Official site</span>
            </a>
            <a
              href={tourismBoardLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-[#1B1613] border border-[#2E271F] hover:border-[#8A7238] hover:bg-[#C9A24B]/10 text-[#F3EBDC] font-medium text-xs transition-all flex items-center gap-1.5"
            >
              <span>🗺️ Tourism board</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HotelDetailModal;
