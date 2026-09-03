import React, { useState, useEffect } from 'react';
import { useCity } from '../config/CityContext';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/layout/Container';
import { FilterBar } from '../components/layout/FilterBar';
import { ComingSoonNote } from '../components/layout/ComingSoonNote';
import { Card } from '../components/common/Card';
import { Skeleton } from '../components/common/Skeleton';
import { Metro, Ticket, Clock, Filter } from '../components/icons';
import { places, placeCategories } from '../data/delhi/places';
import { usePageMeta } from '../hooks/usePageMeta';
import localHumayun from '../assets/delhi-humayun.jpg';

/**
 * Places Directory Page.
 * Feature Owner: src/features/places/
 *
 * @page
 */
export function PlacesPage() {
  const { city } = useCity();
  usePageMeta(
    `Monuments & Historical Sites in ${city.name}`,
    `Directory of verified monuments, stepwells, and ancient ruins in ${city.name} with live crowd levels.`
  );

  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  // Simulated brief loading state so teammate has pre-built Skeleton UI pattern
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full pb-20 select-none">
      {/* 1. Photographic Page Header */}
      <PageHeader
        overline={`Directory • ${city.name}`}
        title="Monuments, Stepwells & Heritage Sites"
        description={`Ground-audited directory of historical architecture in ${city.name}, mapped with confirmed transit connections and live crowd telemetry.`}
        backgroundImage={localHumayun}
      />

      <Container size="wide" className="pt-8 space-y-8">
        {/* 2. Filter Bar & Sort Controls */}
        <div className="space-y-4">
          <FilterBar
            filters={placeCategories}
            activeId={activeCategory}
            onSelect={(id) => setActiveCategory(id)}
            onClear={() => setActiveCategory('all')}
          />

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-text-low pt-1">
            <div>
              Showing <strong className="text-text-high">{places.length} audited sites</strong> in {city.name}
            </div>

            {/* Non-functional sort control shell */}
            {/* TODO: Connect sort selector to Supabase order_by query */}
            <div className="flex items-center gap-2">
              <span>Sort by:</span>
              <select
                disabled
                className="bg-bg-raised border border-border-default rounded px-2 py-1 text-xs text-text-high cursor-not-allowed opacity-80"
              >
                <option>Least Crowded First</option>
                <option>Alphabetical</option>
                <option>Nearest Metro</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Teammate Handoff Note */}
        <ComingSoonNote
          featureName="Interactive Filter Engine & Search"
          owner="places"
          description="Filter chips and sorting currently trigger UI states only. Live Supabase query filters and multi-district multi-select are ready to be implemented in src/features/places/."
        />

        {/* 4. Places Grid or Skeleton Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <Skeleton key={idx} variant="card" className="h-[360px]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {places.map((place) => (
              <Card
                key={place.id}
                image={place.image}
                imageAlt={place.imageAlt}
                title={place.name}
                subtitle={place.district}
                description={place.description}
                crowdLevel={place.crowdLevel}
                crowdUpdatedAt={place.crowdUpdatedAt}
                hasAudio={Boolean(place.audioGuide)}
                badges={[{ label: place.district, variant: 'glass' }]}
                meta={[
                  { icon: <Metro size={13} />, label: place.metroStation },
                  { icon: <Ticket size={13} />, label: place.fee },
                  { icon: <Clock size={13} />, label: place.duration },
                ]}
                to={`/places/${place.slug}`}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default PlacesPage;
