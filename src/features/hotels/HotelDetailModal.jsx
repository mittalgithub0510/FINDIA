import React from 'react';
import { X, Star, MapPin, Navigation, CheckCircle2, ExternalLink } from '../../components/icons';

export function HotelDetailModal({ hotel, onClose }) {
  if (!hotel) return null;

  const categoryLabel = {
    budget: 'Budget friendly',
    moderate: 'Mid-range',
    premium: 'Premium luxury'
  }[hotel.category] || hotel.category;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1B1613] rounded-[14px] border border-[#322A22] p-6 sm:p-8 space-y-6 shadow-2xl text-[#F3EBDC]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#241E1A] hover:bg-[#322A22] text-[#9C9186] hover:text-[#F3EBDC] transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-0.5 rounded-full border border-[#C9A24B]/60 text-[#C9A24B] text-xs font-medium bg-[#C9A24B]/10">
              {categoryLabel}
            </span>
            {hotel.rating && (
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#241E1A] border border-[#322A22] text-[#F3EBDC] font-medium text-xs">
                <Star size={13} className="text-[#C9A24B] fill-[#C9A24B]" />
                <span>{hotel.rating} / 5.0</span>
                {hotel.reviewCount && <span className="text-[#9C9186] font-normal">({hotel.reviewCount.toLocaleString()} reviews)</span>}
              </div>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-medium font-['Fraunces',serif] text-[#F3EBDC] leading-snug">{hotel.name}</h2>
          <div className="flex items-center gap-1.5 text-xs text-[#9C9186]">
            <MapPin size={14} className="text-[#9C9186] shrink-0" />
            <span>{hotel.address}</span>
          </div>
        </div>

        {/* Price & Value Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#241E1A] border border-[#322A22] text-center">
          <div>
            <div className="text-[11px] text-[#9C9186]">Approx. price</div>
            <div className="text-sm font-semibold text-[#C9A24B] mt-0.5">{hotel.priceRange}</div>
          </div>
          <div>
            <div className="text-[11px] text-[#9C9186]">Check-in / out</div>
            <div className="text-xs font-medium text-[#F3EBDC] mt-0.5">{hotel.checkIn} / {hotel.checkOut}</div>
          </div>
          <div>
            <div className="text-[11px] text-[#9C9186]">Airport distance</div>
            <div className="text-xs font-medium text-[#5FA97C] mt-0.5">{hotel.airportDistance} km</div>
          </div>
          <div>
            <div className="text-[11px] text-[#9C9186]">Value score</div>
            <div className="text-xs font-semibold text-[#5FA97C] mt-0.5">{hotel.valueScore ? `${hotel.valueScore}/10` : 'Verified'}</div>
          </div>
        </div>

        {/* FINDIA Description */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-[#C9A24B]">FINDIA contextual analysis</h4>
          <p className="text-xs sm:text-sm text-[#9C9186] leading-relaxed bg-[#241E1A]/60 p-3.5 rounded-xl border border-[#322A22]">
            {hotel.description}
          </p>
        </div>

        {/* Tourist Suitability Note */}
        {hotel.touristSuitability && (
          <div className="p-3.5 rounded-xl bg-[#C9A24B]/10 border border-[#C9A24B]/30 text-xs space-y-1">
            <div className="font-semibold text-[#C9A24B] flex items-center gap-1.5 text-xs">
              <CheckCircle2 size={14} className="text-[#5FA97C]" />
              <span>Tourist suitability recommendation</span>
            </div>
            <p className="text-[#F3EBDC]/90 leading-relaxed">{hotel.touristSuitability}</p>
          </div>
        )}

        {/* Nearest Attractions Grid */}
        {hotel.nearestAttractions && hotel.nearestAttractions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-[#C9A24B] flex items-center gap-1.5">
              <Navigation size={13} />
              <span>Nearest major tourist attractions</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {hotel.nearestAttractions.map((att, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-[#241E1A] border border-[#322A22] text-xs">
                  <span className="font-medium text-[#F3EBDC]">{att.name}</span>
                  <span className="text-[11px] font-medium text-[#5FA97C] bg-[#5FA97C]/15 px-2 py-0.5 rounded-full border border-[#5FA97C]/30">
                    {att.distanceKm} km away
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Metro & Transport Access */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {hotel.nearestMetro && (
            <div className="p-3 rounded-xl bg-[#241E1A] border border-[#322A22] text-xs space-y-1">
              <div className="text-[11px] text-[#9C9186]">Nearest metro station</div>
              <div className="font-medium text-[#F3EBDC]">🚇 {hotel.nearestMetro.name}</div>
              <div className="text-[11px] text-[#5FA97C]">{hotel.nearestMetro.distanceKm} km walk/transit</div>
            </div>
          )}
          {hotel.transportAccessibility && (
            <div className="p-3 rounded-xl bg-[#241E1A] border border-[#322A22] text-xs space-y-1">
              <div className="text-[11px] text-[#9C9186]">Transit accessibility</div>
              <div className="text-[#9C9186]">{hotel.transportAccessibility}</div>
            </div>
          )}
        </div>

        {/* Amenities Grid */}
        {hotel.amenities && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-[#C9A24B]">Verified amenities</h4>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.map((item, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-[#241E1A] border border-[#322A22] text-xs text-[#9C9186]">
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Verified Sources */}
        {hotel.sourceUrls && hotel.sourceUrls.length > 0 && (
          <div className="pt-2 border-t border-[#322A22] flex items-center justify-between text-xs text-[#9C9186]">
            <span>Verified data source</span>
            <div className="flex gap-2">
              {hotel.sourceUrls.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9A24B] hover:underline flex items-center gap-1 text-[11px]"
                >
                  <span>Link #{i + 1}</span>
                  <ExternalLink size={11} />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HotelDetailModal;
