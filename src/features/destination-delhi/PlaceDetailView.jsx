import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DELHI_PLACES } from '../../data/delhiData';
import {
  MapPin,
  Clock,
  Ticket,
  Metro,
  Crowd,
  ChevronLeft,
  ChevronRight,
  Headphones,
  ExternalLink,
  ShieldAlert,
  Sparkles,
} from '../../components/icons';
import { cn } from '../../utils/cn';

/**
 * Detailed view for individual Delhi places.
 * Route: /destination/north/delhi/:placeSlug
 */
export function PlaceDetailView() {
  const { placeSlug } = useParams();
  const navigate = useNavigate();

  // Find place from dataset
  const place = DELHI_PLACES.find(
    (p) => p.slug === placeSlug || p.id === placeSlug
  ) || DELHI_PLACES[0]; // Fallback to first place if not found

  // Gallery state
  const gallery = place.gallery && place.gallery.length > 0 ? place.gallery : [place.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isFood = place.category === 'food';

  return (
    <div className="min-h-screen bg-bg-base text-text-high pb-20">
      {/* Top Breadcrumb Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-text-low">
          <Link to="/destination/north/delhi" className="hover:text-amber-400 flex items-center gap-1">
            <ChevronLeft size={14} />
            <span>Delhi Destinations</span>
          </Link>
          <span>/</span>
          <span className="capitalize text-amber-300">{place.category}</span>
          <span>/</span>
          <span className="text-text-high">{place.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
        {/* LEFT COLUMN: PHOTO GALLERY & OVERVIEW (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* PHOTO CAROUSEL / GALLERY */}
          <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden glass-panel border border-white/10 group shadow-card">
            <img
              src={gallery[activeImageIndex]}
              alt={`${place.name} Gallery ${activeImageIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-base"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-black/20" />

            {/* Gallery Prev / Next Overlay Buttons */}
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous Photo"
                  onClick={() =>
                    setActiveImageIndex(
                      (prev) => (prev - 1 + gallery.length) % gallery.length
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass-heavy text-text-high hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  aria-label="Next Photo"
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev + 1) % gallery.length)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass-heavy text-text-high hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Thumbnails Row at Bottom */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full glass-chip border border-white/15">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={cn(
                        'w-3 h-3 rounded-full transition-all cursor-pointer',
                        idx === activeImageIndex
                          ? 'bg-amber-400 scale-125'
                          : 'bg-white/40 hover:bg-white/70'
                      )}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Category Badge on top left */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/60 backdrop-blur border border-white/20 text-amber-300">
                {place.district}
              </span>
            </div>
          </div>

          {/* PLACE TITLE & DESCRIPTION */}
          <div className="space-y-4 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="type-h1 font-display text-text-high font-bold">
                {place.name}
              </h1>

              {isFood && (
                <span className="px-3 py-1 rounded-full bg-orange-500 text-bg-base text-xs font-bold font-mono">
                  Famous Delhi Culinary Stop
                </span>
              )}
            </div>

            <p className="type-body text-text-mid leading-relaxed font-sans">
              {place.fullDescription || place.shortDesc}
            </p>

            {/* Audio Guide Callout (if monument) */}
            {!isFood && (
              <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500 text-bg-base">
                    <Headphones size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-amber-200 uppercase font-mono">
                      FINDIA Audio Heritage Guide
                    </div>
                    <div className="text-xs text-text-mid">
                      Listen to historical narratives by ASI certified curators
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Audio Guide player starting for ' + place.name)}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-bg-base text-xs font-bold hover:bg-amber-400 transition-colors"
                >
                  Play Audio
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: TELEMETRY & BASIC INFO BLOCK (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* CROWD STATUS TELEMETRY CARD */}
          <div className="glass-heavy p-6 rounded-3xl border border-white/15 shadow-lifted space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Crowd size={18} className="text-amber-400" />
                <span className="text-xs font-mono uppercase font-bold text-text-high">
                  Live Crowd Status
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">
                Updated {place.crowdUpdatedAt || 'Just now'}
              </span>
            </div>

            {/* Crowd Level Display Meter */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold capitalize text-text-high flex items-center gap-2">
                  <span
                    className={cn(
                      'w-3 h-3 rounded-full inline-block',
                      place.crowdLevel === 'low' && 'bg-emerald-400 shadow-[0_0_10px_#2FA36B]',
                      place.crowdLevel === 'moderate' && 'bg-amber-400 shadow-[0_0_10px_#E0A02E]',
                      place.crowdLevel === 'heavy' && 'bg-rose-400 shadow-[0_0_10px_#E2603B]'
                    )}
                  />
                  <span>{place.crowdLevel} Density</span>
                </span>
                <span className="text-xs font-mono font-bold text-amber-300">
                  {place.crowdPercentage || 45}% Capacity
                </span>
              </div>

              {/* Visual Meter Bar */}
              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden p-0.5">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-slow',
                    place.crowdLevel === 'low' && 'bg-gradient-to-r from-emerald-500 to-emerald-400',
                    place.crowdLevel === 'moderate' && 'bg-gradient-to-r from-amber-500 to-yellow-400',
                    place.crowdLevel === 'heavy' && 'bg-gradient-to-r from-rose-600 to-rose-400'
                  )}
                  style={{ width: `${place.crowdPercentage || 45}%` }}
                />
              </div>

              <p className="text-[11px] text-text-low leading-relaxed font-sans">
                Telemetry prediction: Optimal visiting window is early morning before 10:00 AM for minimum queue lines.
              </p>
            </div>
          </div>

          {/* BASIC INFO BLOCK */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-amber-400 pb-2 border-b border-white/10">
              Visitor Information
            </h3>

            <div className="space-y-3.5 text-xs text-text-mid">
              {/* Opening Hours */}
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-text-high">Opening Hours</div>
                  <div>{place.openingHours}</div>
                </div>
              </div>

              {/* Ticket Price */}
              <div className="flex items-start gap-3">
                <Ticket size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-text-high">Ticket Fare</div>
                  <div>{place.ticketPrice}</div>
                </div>
              </div>

              {/* Nearest Metro */}
              <div className="flex items-start gap-3">
                <Metro size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-text-high">Nearest Metro Line</div>
                  <div>{place.nearestMetro}</div>
                </div>
              </div>

              {/* Distance */}
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-text-high">Distance from Center</div>
                  <div>{place.distance}</div>
                </div>
              </div>
            </div>

            {/* Direct Navigation Button */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                place.name + ' ' + place.district + ' Delhi'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-bg-base font-bold text-xs transition-colors shadow-lifted mt-2"
            >
              <span>Get Directions on Google Maps</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceDetailView;
