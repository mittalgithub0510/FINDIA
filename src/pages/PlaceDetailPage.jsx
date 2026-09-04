import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { places } from '../data/delhi/places';
import { Container } from '../components/layout/Container';
import { CrowdBadge } from '../components/common/CrowdBadge';
import { Card } from '../components/common/Card';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { ComingSoonNote } from '../components/layout/ComingSoonNote';
import {
  Metro,
  Ticket,
  Clock,
  MapPin,
  Play,
  Pause,
  Headphones,
  Calendar,
  Compass,
  ArrowRight,
} from '../components/icons';
import { usePageMeta } from '../hooks/usePageMeta';
import { cn } from '../utils/cn';

/**
 * Place Detail View.
 * Feature Owner: src/features/places/
 *
 * @page
 */
export function PlaceDetailPage() {
  const { slug } = useParams();
  const place = places.find((p) => p.slug === slug);

  const [isPlaying, setIsPlaying] = useState(false);

  usePageMeta(
    place ? `${place.name} — ${place.district}` : 'Place Not Found',
    place ? place.description : 'Historical site detail record.'
  );

  // Designed Not-Found State for invalid slug
  if (!place) {
    return (
      <div className="pt-28 pb-20 w-full min-h-[60vh] flex items-center justify-center">
        <EmptyState
          icon={<Compass size={32} className="text-brand" />}
          title="Place Not Found in Directory"
          description={`The record "${slug}" does not match any audited site in this city directory.`}
          action={
            <Button variant="primary" size="sm" to="/places" icon={<ArrowRight size={14} />}>
              Back to Places Directory
            </Button>
          }
        />
      </div>
    );
  }

  const nearbyPlaces = places.filter((p) => p.id !== place.id).slice(0, 3);

  return (
    <div className="w-full pb-24 select-none">
      {/* 1. Full-Width Photographic Header with Scrim */}
      <div className="relative w-full min-h-[380px] sm:min-h-[440px] flex items-end pt-24 pb-8 sm:pb-12 border-b border-border-default overflow-hidden">
        <img
          src={place.image}
          alt={place.imageAlt}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 scrim-full pointer-events-none" />
        <div className="absolute inset-0 scrim-bottom pointer-events-none" />

        <Container size="wide" className="relative z-10 w-full space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-text-high/90">
              <Link to="/places" className="hover:text-brand transition-colors">
                Places
              </Link>
              <span>/</span>
              <span className="text-brand">{place.district}</span>
            </div>

            <CrowdBadge
              level={place.crowdLevel}
              updatedAt={place.crowdUpdatedAt}
              size="md"
              onGlass
            />
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl text-text-high drop-shadow-lg leading-tight max-w-3xl">
            {place.name}
          </h1>

          {/* Quick Facts Strip */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-high/90 font-mono pt-2 border-t border-white/15">
            <div className="flex items-center gap-1.5">
              <Metro size={13} className="text-brand" />
              <span>{place.metroStation} ({place.metroLine})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Ticket size={13} className="text-brand" />
              <span>{place.fee}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-brand" />
              <span>{place.duration}</span>
            </div>
          </div>
        </Container>
      </div>

      {/* 2. Main Body Grid: Content Column + Sticky Sidebar */}
      <Container size="wide" className="pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview & Key Facts */}
            <div className="space-y-4">
              <h2 className="font-display font-semibold text-xl text-text-high">
                Historical Overview
              </h2>
              <p className="type-body text-text-mid text-sm sm:text-base leading-relaxed">
                {place.description}
              </p>

              <div className="p-4 rounded-xl bg-bg-raised border border-border-default grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-mono text-text-low tracking-wider">Timings</div>
                  <div className="text-text-high font-medium">{place.timings}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-mono text-text-low tracking-wider">Best Light / Low Crowd</div>
                  <div className="text-text-high font-medium">{place.bestTime}</div>
                </div>
              </div>
            </div>

            {/* How to Reach: Concrete Metro Directions */}
            <div className="space-y-3">
              <h3 className="font-display font-semibold text-lg text-text-high flex items-center gap-2">
                <Metro size={18} className="text-brand" />
                <span>How to Reach via Delhi Metro</span>
              </h3>
              <div className="p-4 rounded-xl bg-bg-raised border border-border-default text-xs text-text-mid font-sans leading-relaxed">
                {place.howToReach}
              </div>
            </div>

            {/* Teammate Handoff Note for Map & Routing */}
            <ComingSoonNote
              featureName="Interactive Vector Map & Pedestrian Route"
              owner="places"
              description="A custom Maplibre/Leaflet container will mount here to display real-time walking paths from the metro gate to the monument ticket barrier."
            />

            {/* Placeholder Region for Interactive Map */}
            {/* TODO: Supabase query: mount interactive Mapbox / Maplibre geojson boundary here */}
            <div className="w-full h-56 rounded-2xl bg-bg-raised border border-dashed border-border-strong flex flex-col items-center justify-center p-6 text-center space-y-2 select-none">
              <MapPin size={24} className="text-text-low" />
              <div className="text-xs font-mono text-text-high font-medium">
                MAP CANVAS PLACEHOLDER
              </div>
              <p className="text-[11px] text-text-low max-w-sm">
                Lat/Long coordinates registered. Map component integration scheduled in feature branch.
              </p>
            </div>

            {/* Nearby Sites Rail */}
            <div className="space-y-4 pt-4 border-t border-border-subtle">
              <h3 className="font-display font-semibold text-lg text-text-high">
                Nearby Sites in {place.district}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {nearbyPlaces.map((np) => (
                  <Card
                    key={np.id}
                    size="sm"
                    image={np.image}
                    title={np.name}
                    subtitle={np.district}
                    crowdLevel={np.crowdLevel}
                    to={`/places/${np.slug}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (4 cols - Sticky on desktop) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* AUDIO GUIDE PLAYER SHELL */}
            {/* TODO: Connect audio controls to live audio stream / CDN MP3 */}
            <div className="p-5 rounded-2xl bg-bg-raised border border-border-default shadow-card space-y-4">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-brand font-semibold uppercase tracking-wider">
                  <Headphones size={15} />
                  <span>Audio Guide</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-soft text-accent-300">
                  {place.audioGuide ? place.audioGuide.duration : 'Available Soon'}
                </span>
              </div>

              {place.audioGuide ? (
                <div className="space-y-3">
                  <div>
                    <h4 className="font-display font-semibold text-sm text-text-high leading-tight">
                      {place.audioGuide.title}
                    </h4>
                    <p className="text-[11px] text-text-low font-sans mt-0.5">
                      Narrated by {place.audioGuide.narrator}
                    </p>
                  </div>

                  {/* Play / Pause Action & Progress Bar */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label={isPlaying ? 'Pause guide' : 'Play guide'}
                        onClick={() => setIsPlaying((p) => !p)}
                        className="w-10 h-10 rounded-full bg-brand text-text-inverse flex items-center justify-center cursor-pointer hover:brightness-110 active:scale-95 transition-all shadow-soft"
                      >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                      </button>

                      <div className="flex-1 space-y-1">
                        <div className="w-full h-1.5 rounded-full bg-bg-overlay overflow-hidden">
                          <div
                            className="h-full bg-brand transition-all duration-300"
                            style={{ width: isPlaying ? '35%' : '0%' }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] font-mono text-text-low">
                          <span>{isPlaying ? '1:18' : '0:00'}</span>
                          <span>{place.audioGuide.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-text-low font-sans">
                  Audio narration for this site is currently undergoing historical archival review.
                </div>
              )}
            </div>

            {/* CROWD BY HOUR HISTOGRAM */}
            <div className="p-5 rounded-2xl bg-bg-raised border border-border-default shadow-card space-y-3.5">
              <div className="flex items-center justify-between border-b border-border-subtle pb-2.5">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-high">
                  Typical Daily Congestion
                </span>
                <span className="text-[10px] text-text-low font-mono">Historical Average</span>
              </div>

              {/* Bar Chart Representation using Crowd Tokens */}
              <div className="grid grid-cols-6 gap-2 pt-2 items-end h-28 border-b border-border-subtle pb-2">
                {place.crowdByHour.map((item, idx) => {
                  const heights = {
                    low: 'h-1/3 bg-crowd-low/80',
                    moderate: 'h-2/3 bg-crowd-moderate/80',
                    heavy: 'h-full bg-crowd-heavy/80',
                    unknown: 'h-1/4 bg-crowd-unknown/40',
                  };

                  return (
                    <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                      <div
                        className={cn(
                          'w-full rounded-t-sm transition-all',
                          heights[item.level] || heights.unknown
                        )}
                        title={`${item.hour}: ${item.level}`}
                      />
                      <span className="text-[10px] font-mono text-text-low">{item.hour}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-text-low pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-crowd-low" />
                  <span>Low (&lt;30%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-crowd-moderate" />
                  <span>Moderate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-crowd-heavy" />
                  <span>Heavy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default PlaceDetailPage;
