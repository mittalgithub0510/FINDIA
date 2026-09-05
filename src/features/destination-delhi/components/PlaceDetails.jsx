import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImageGallery } from './ImageGallery';
import { QuickInfoCard } from './QuickInfoCard';
import { FacilityCard } from './FacilityCard';
import { AudioGuide } from './AudioGuide';
import { NearbyPlaces } from './NearbyPlaces';
import { TransportComparison } from './TransportComparison';
import { PlanMyDayCTA } from './PlanMyDayCTA';
import {
  ChevronLeft,
  MapPin,
  Star,
  Clock,
  ExternalLink,
  Sparkles,
} from '../../../components/icons';

/**
 * Place Details Master Orchestrator (Section 6).
 * Renders all sections in the exact specified order:
 * 1. Header (name, location, rating, category, visit duration, [Get Directions], [Plan My Day])
 * 2. Hero Visual (single large heroImage with overlaid About This Place text)
 * 3. Quick Information & Facilities cards
 * 4. Audio Guide
 * 5. Nearby Places
 * 6. Transport Comparison (static estimates with recommendation)
 * 7. Bottom CTA Actions
 *
 * @param {Object} props
 * @param {Object} props.place - Canonical place record
 * @param {Object} [props.theme] - Derived per-place theme
 */
export function PlaceDetails({ place, theme }) {
  const navigate = useNavigate();

  if (!place) return null;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${place.name} ${place.location || 'Delhi'}`
  )}`;

  const handlePlanMyDay = () => {
    navigate(`/findia-ai?destination=${encodeURIComponent(place.slug || place.id)}`);
  };

  return (
    <article className="space-y-8 pb-16">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-text-low pt-2">
        <Link
          to="/destinations/delhi"
          className="hover:text-amber-400 flex items-center gap-1 transition-colors"
        >
          <ChevronLeft size={14} />
          <span>Delhi Destinations</span>
        </Link>
        <span>/</span>
        <span className="text-text-high font-semibold truncate">{place.name}</span>
      </nav>

      {/* 1. Header Section: Name, Location, Rating, Category, Duration, Action CTAs */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/60 backdrop-blur border border-amber-500/40 text-amber-300">
              <MapPin size={12} className="text-amber-400" />
              <span>{place.location}</span>
            </span>

            {Array.isArray(place.category) &&
              place.category.map((cat) => (
                <span
                  key={cat}
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/10 border border-white/10 text-neutral-300"
                >
                  {cat}
                </span>
              ))}

            {place.rating && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span>{place.rating}</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-text-high tracking-tight">
            {place.name}
          </h1>

          {place.estimatedVisitTime && (
            <div className="flex items-center gap-2 text-xs text-text-mid font-mono">
              <Clock size={13} className="text-amber-400" />
              <span>Recommended Visit Duration: {place.estimatedVisitTime}</span>
            </div>
          )}
        </div>

        {/* Header Action Buttons: [Get Directions] [Plan My Day] */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-text-high border border-white/15 text-xs font-bold transition-colors cursor-pointer select-none"
          >
            <span>Get Directions</span>
            <ExternalLink size={14} />
          </a>

          <button
            type="button"
            onClick={handlePlanMyDay}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-bg-base text-xs font-bold transition-colors shadow-lifted cursor-pointer select-none"
          >
            <Sparkles size={14} />
            <span>Plan My Day</span>
          </button>
        </div>
      </header>

      {/* 2. Hero Visual: Single Large heroImage with Overlaid "About This Place" Text */}
      <ImageGallery place={place} theme={theme} />

      {/* 3. Quick Information Cards & Facilities */}
      <div className="space-y-6">
        <QuickInfoCard place={place} />
        <FacilityCard place={place} />
      </div>

      {/* 4. Audio Guide Component */}
      <AudioGuide place={place} />

      {/* 5. Nearby Places Grid */}
      <NearbyPlaces place={place} />

      {/* 6. Transport Comparison (Static Estimates with Recommendation) */}
      <TransportComparison place={place} />

      {/* 7 & 8. Ready to Visit CTAs */}
      <PlanMyDayCTA place={place} />
    </article>
  );
}

export default PlaceDetails;
