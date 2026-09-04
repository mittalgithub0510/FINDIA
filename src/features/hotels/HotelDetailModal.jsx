import React from 'react';
import { X, Star, MapPin, Navigation, CheckCircle2, Shield, ExternalLink, Calendar, Users, Coffee, Car, Wifi } from '../../components/icons';
import GlassPanel from '../../components/common/GlassPanel';
import Badge from '../../components/common/Badge';

export function HotelDetailModal({ hotel, onClose }) {
  if (!hotel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-heavy rounded-3xl border border-white/20 p-6 sm:p-8 space-y-6 shadow-lifted text-text-high">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-text-high transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={hotel.category === 'premium' ? 'gold' : hotel.category === 'moderate' ? 'amber' : 'emerald'}>
              {hotel.category.toUpperCase()} CATEGORY
            </Badge>
            {hotel.rating && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs font-mono">
                <Star size={13} className="fill-amber-400" />
                <span>{hotel.rating} / 5.0</span>
                {hotel.reviewCount && <span className="text-[10px] text-text-mid font-normal">({hotel.reviewCount} reviews)</span>}
              </div>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight">{hotel.name}</h2>
          <div className="flex items-center gap-1.5 text-xs text-text-mid">
            <MapPin size={14} className="text-amber-400 shrink-0" />
            <span>{hotel.address}</span>
          </div>
        </div>

        {/* Price & Value Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
          <div>
            <div className="text-[10px] font-mono uppercase text-text-low">Approx Price</div>
            <div className="text-sm font-extrabold text-amber-300 font-mono mt-0.5">{hotel.priceRange}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-text-low">Check-In / Out</div>
            <div className="text-xs font-bold text-text-high font-mono mt-0.5">{hotel.checkIn} / {hotel.checkOut}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-text-low">Airport Distance</div>
            <div className="text-xs font-bold text-emerald-300 font-mono mt-0.5">{hotel.airportDistance} km</div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-text-low">FINDIA Value</div>
            <div className="text-xs font-bold text-amber-400 font-mono mt-0.5">{hotel.valueScore ? `${hotel.valueScore}/10` : 'Verified'}</div>
          </div>
        </div>

        {/* FINDIA Description */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase font-bold text-amber-300 tracking-wider">FINDIA Contextual Analysis</h4>
          <p className="text-sm text-text-mid leading-relaxed bg-black/30 p-3.5 rounded-xl border border-white/10">
            {hotel.description}
          </p>
        </div>

        {/* Tourist Suitability Note */}
        {hotel.touristSuitability && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1">
            <div className="font-bold text-amber-300 flex items-center gap-1.5 font-mono text-[11px]">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>Tourist Suitability Recommendation</span>
            </div>
            <p className="text-text-mid leading-relaxed">{hotel.touristSuitability}</p>
          </div>
        )}

        {/* Nearest Attractions Grid */}
        {hotel.nearestAttractions && hotel.nearestAttractions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase font-bold text-amber-300 tracking-wider flex items-center gap-1.5">
              <Navigation size={13} />
              <span>Nearest Major Tourist Attractions</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {hotel.nearestAttractions.map((att, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <span className="font-bold text-text-high">{att.name}</span>
                  <span className="font-mono text-[11px] text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
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
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
              <div className="text-[10px] font-mono uppercase text-text-low">Nearest Metro Station</div>
              <div className="font-bold text-text-high">🚇 {hotel.nearestMetro.name}</div>
              <div className="text-[10px] text-emerald-300 font-mono">{hotel.nearestMetro.distanceKm} km walk/transit</div>
            </div>
          )}
          {hotel.transportAccessibility && (
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
              <div className="text-[10px] font-mono uppercase text-text-low">Transit Accessibility</div>
              <div className="text-text-mid">{hotel.transportAccessibility}</div>
            </div>
          )}
        </div>

        {/* Amenities Grid */}
        {hotel.amenities && (
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase font-bold text-amber-300 tracking-wider">Verified Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.map((item, i) => (
                <span key={i} className="px-3 py-1 rounded-lg bg-white/5 border border-white/15 text-xs text-text-high">
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Verified Sources */}
        {hotel.sourceUrls && hotel.sourceUrls.length > 0 && (
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-text-low">
            <span>Verified Data Source</span>
            <div className="flex gap-2">
              {hotel.sourceUrls.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
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
