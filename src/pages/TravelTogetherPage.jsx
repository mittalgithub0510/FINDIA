import React, { useState } from 'react';
import { useCity } from '../config/CityContext';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/layout/Container';
import { FilterBar } from '../components/layout/FilterBar';
import { ComingSoonNote } from '../components/layout/ComingSoonNote';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { travelGroups } from '../data/delhi/travelTogether';
import { Users, Calendar, MapPin, Plus } from '../components/icons';
import { usePageMeta } from '../hooks/usePageMeta';

const GROUP_FILTERS = [
  { id: 'all', label: 'All Groups', count: 4 },
  { id: 'morning', label: 'Morning Trails', count: 3 },
  { id: 'weekend', label: 'Weekends', count: 2 },
  { id: 'empty-demo', label: 'Photo Workshops (Demo Empty)', count: 0 },
];

/**
 * Travel Together Page.
 * Feature Owner: src/features/travel-together/
 *
 * @page
 */
export function TravelTogetherPage() {
  const { city } = useCity();
  usePageMeta(
    `Travel Together Walking Groups — ${city.name}`,
    `Join verified history enthusiasts for morning stepwell walks, fort trails, and architectural surveys in ${city.name}.`
  );

  const [activeFilter, setActiveFilter] = useState('all');

  const displayedGroups = activeFilter === 'empty-demo' ? [] : travelGroups;

  return (
    <div className="w-full pb-24 select-none">
      <PageHeader
        overline={`Collaborative Walking • ${city.name}`}
        title="Travel Together Open Groups"
        description={`Coordinate early morning stepwell trails and fortress walks with fellow architecture enthusiasts across ${city.name}.`}
        action={
          <Button
            variant="primary"
            size="sm"
            icon={<Plus size={15} />}
            onClick={() => alert('Group creation will be implemented by travel-together feature owner.')}
          >
            Create a Group
          </Button>
        }
      />

      <Container size="wide" className="pt-8 space-y-8">
        <ComingSoonNote
          featureName="Group Membership Request & Coordinate Chat"
          owner="travel-together"
          description="Group cards below display mock walking trails. Host approval, member attendance tracking, and rendezvous notifications will be built in src/features/travel-together/."
        />

        {/* Filter Bar with working EmptyState trigger */}
        <FilterBar
          filters={GROUP_FILTERS}
          activeId={activeFilter}
          onSelect={(id) => setActiveFilter(id)}
          onClear={() => setActiveFilter('all')}
        />

        {/* Open Groups Board or Designed EmptyState */}
        {displayedGroups.length === 0 ? (
          <div className="py-12">
            <EmptyState
              icon={<Users size={32} className="text-brand" />}
              title="No Groups Matching Filter"
              description="There are currently no active walking groups scheduled in this category."
              action={
                <Button variant="secondary" size="sm" onClick={() => setActiveFilter('all')}>
                  Reset Filter Chips
                </Button>
              }
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedGroups.map((group) => {
              const spotsLeft = group.maxSpots - group.membersCount;

              return (
                <article
                  key={group.id}
                  className="p-6 rounded-2xl bg-bg-raised border border-border-default hover:border-brand/40 transition-all duration-fast flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-bg-overlay border border-border-subtle text-brand font-semibold">
                          {group.district}
                        </span>
                        <h2 className="font-display font-semibold text-base sm:text-lg text-text-high leading-snug">
                          {group.title}
                        </h2>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-bold text-accent-300 px-2 py-0.5 rounded bg-accent-soft">
                          {spotsLeft} {spotsLeft === 1 ? 'spot left' : 'spots left'}
                        </span>
                      </div>
                    </div>

                    <p className="type-body-sm text-text-mid text-xs leading-relaxed">
                      {group.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {group.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-base text-text-low border border-border-subtle"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border-subtle space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-low font-sans">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-brand shrink-0" />
                        <span>{group.dateText}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-brand shrink-0" />
                        <span className="truncate">{group.meetingPoint}</span>
                      </div>
                    </div>

                    {/* Host Info & Disabled Join Button with TODO */}
                    {/* TODO: Supabase query: join group request insertion */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="text-xs font-mono text-text-mid">
                        Host: <span className="text-text-high font-semibold">{group.host}</span> ({group.hostBadge})
                      </div>

                      <Button
                        variant="secondary"
                        size="sm"
                        className="opacity-80 cursor-not-allowed"
                        onClick={() => alert('Join group request will be wired by travel-together feature owner.')}
                      >
                        Request to Join
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
}

export default TravelTogetherPage;
