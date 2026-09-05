import React from 'react';
import { resolvePrayagrajImage } from '../../../data/prayagraj/images';
import { Sparkles, MapPin, Star, Clock } from '../../../components/icons';

/**
 * Single Hero Image Component with Overlaid "About This Place" text for Prayagraj.
 * Strictly renders ONE large hero image without thumbnail grids.
 * Scrim is tuned so text is crystal clear while photography remains vividly visible.
 *
 * @param {Object} props
 * @param {Object} props.place - Canonical place record
 * @param {Object} [props.theme] - Derived place theme with accent colors
 */
export function ImageGallery({ place, theme }) {
  if (!place) return null;

  const imageUrl = resolvePrayagrajImage(place.heroImage || place.image);
  const aboutText = place.description?.about || place.description?.short || place.fullDescription;
  const accentColor = theme?.accent500 || 'var(--color-brand)';

  return (
    <section className="relative w-full h-[480px] sm:h-[550px] rounded-3xl overflow-hidden glass-panel border border-white/10 group shadow-card select-none">
      {/* 1. Single Large Hero Image */}
      <img
        src={imageUrl}
        alt={place.name}
        className="w-full h-full object-cover transition-transform duration-slow group-hover:scale-102"
      />

      {/* 2. Tuned Multi-Stop Scrim */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-[#12100E]/60 via-40% to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-20 pointer-events-none transition-colors duration-slow"
        style={{
          background: `radial-gradient(circle at bottom left, ${accentColor} 0%, transparent 65%)`,
        }}
      />

      {/* 3. Top Badges Strip */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/20 text-amber-300 shadow-md">
            {place.location || place.district}
          </span>

          {Array.isArray(place.category) &&
            place.category.map((cat) => (
              <span
                key={cat}
                className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-black/40 backdrop-blur-md border border-white/10 text-neutral-200"
              >
                {cat}
              </span>
            ))}
        </div>

        {place.rating && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/60 backdrop-blur-md border border-amber-500/40 text-amber-300">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            <span>{place.rating} / 5.0</span>
          </span>
        )}
      </div>

      {/* 4. Bottom-Left Overlaid "About This Place" Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-3 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300">
          <Sparkles size={13} className="text-amber-400" />
          <span>ABOUT THIS PLACE</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-white drop-shadow-md">
          {place.name}
        </h1>

        <p className="text-sm sm:text-[15px] text-neutral-200 leading-relaxed max-w-3xl font-sans drop-shadow-sm line-clamp-3 sm:line-clamp-4">
          {aboutText}
        </p>

        <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-mono text-neutral-300">
          {place.estimatedVisitTime && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/50 backdrop-blur-md border border-white/10">
              <Clock size={13} className="text-amber-400" />
              <span>Recommended: {place.estimatedVisitTime}</span>
            </span>
          )}

          {(place.metro?.station || place.nearestMetro) && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/50 backdrop-blur-md border border-white/10">
              <MapPin size={13} className="text-amber-400" />
              <span>Transit: {place.metro?.station || place.nearestMetro}</span>
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

export default ImageGallery;
