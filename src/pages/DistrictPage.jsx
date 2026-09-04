import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCity } from '../config/CityContext';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/layout/Container';
import { Card } from '../components/common/Card';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { ComingSoonNote } from '../components/layout/ComingSoonNote';
import { places } from '../data/delhi/places';
import { Metro, Ticket, Clock, MapPin, ArrowRight } from '../components/icons';
import { usePageMeta } from '../hooks/usePageMeta';

/**
 * District Profile Page.
 * Feature Owner: src/features/places/
 *
 * @page
 */
export function DistrictPage() {
  const { slug } = useParams();
  const { city } = useCity();

  // Resolve slug against city.districts list (supports both string and object configurations)
  const districtObj = (city.districts || []).find((d) => {
    if (typeof d === 'string') {
      return d.toLowerCase().replace(/\s+/g, '-') === slug?.toLowerCase();
    }
    return d.slug === slug || d.name.toLowerCase().replace(/\s+/g, '-') === slug?.toLowerCase();
  });

  const districtName = districtObj ? (typeof districtObj === 'string' ? districtObj : districtObj.name) : null;

  usePageMeta(
    districtName ? `${districtName} — ${city.name} District Directory` : 'District Not Found',
    districtName ? `Audited monuments and stepwells in ${districtName}, ${city.name}.` : 'Municipal zone record.'
  );

  if (!districtName) {
    return (
      <div className="pt-28 pb-20 w-full min-h-[60vh] flex items-center justify-center">
        <EmptyState
          icon={<MapPin size={32} className="text-brand" />}
          title="District Not Found"
          description={`The district "${slug}" is not registered in the municipal boundaries of ${city.name}.`}
          action={
            <Button variant="primary" size="sm" to="/places" icon={<ArrowRight size={14} />}>
              Back to Places Directory
            </Button>
          }
        />
      </div>
    );
  }

  // Filter places for this district, or provide mock list if no direct matches
  const districtPlaces = places.filter(
    (p) => p.district.toLowerCase() === districtName.toLowerCase()
  );

  const displayedPlaces = districtPlaces.length > 0 ? districtPlaces : places.slice(0, 3);

  return (
    <div className="w-full pb-24 select-none">
      <PageHeader
        overline={`Municipal Zone • ${city.name}`}
        title={`${districtName} District`}
        description={`Audited architectural monuments, historical stepwells, and transit connections within the ${districtName} administrative boundary.`}
      />

      <Container size="wide" className="pt-8 space-y-8">
        <ComingSoonNote
          featureName="Municipal Boundary GeoJSON & Neighborhood Sub-Zones"
          owner="places"
          description={`Detailed municipal ward statistics and historical boundary overlays for ${districtName} will be mounted by the places feature team.`}
        />

        <div className="flex items-center justify-between border-b border-border-subtle pb-2 text-xs font-mono text-text-low">
          <div>
            Showing <strong className="text-text-high">{displayedPlaces.length} audited sites</strong> in {districtName}
          </div>
          <Link to="/places" className="hover:text-brand transition-colors">
            View All Districts &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPlaces.map((place) => (
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
              badges={[{ label: place.district, variant: 'accent' }]}
              meta={[
                { icon: <Metro size={13} />, label: place.metroStation },
                { icon: <Ticket size={13} />, label: place.fee },
                { icon: <Clock size={13} />, label: place.duration },
              ]}
              to={`/places/${place.slug}`}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default DistrictPage;
