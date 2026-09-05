import React from 'react';
import { Container } from '../layout/Container';
import { SectionHeader } from '../common/SectionHeader';
import { Card } from '../common/Card';
import { Metro, Ticket, Clock } from '../icons';
import { featuredPlacesData } from '../../data/delhi/landing';

/**
 * Places Section: Asymmetric layout with one 2x2 hero card + 4 supporting cards on desktop,
 * and a snap-scrolling horizontal rail on mobile.
 *
 * @component
 */
export function FeaturedPlacesSection() {
  const featureItem = featuredPlacesData.find((p) => p.isFeature) || featuredPlacesData[0];
  const standardItems = featuredPlacesData.filter((p) => !p.isFeature);

  return (
    <section className="py-20 sm:py-28 relative">
      <Container size="wide" className="space-y-10">
        <SectionHeader
          overline="Telemetry Directory"
          title="Monuments Audited for Congestion"
          description="Live visitor counts paired with confirmed Delhi Metro connection lines and entry timings."
          action={{ label: "View All 20+ Monuments", to: "/places" }}
        />

        {/* Desktop Layout: Asymmetric 3-Column Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6 items-stretch">
          {/* 1. Feature Card Spanning 2 Columns and Full Height */}
          <div className="col-span-2 flex flex-col">
            <Card
              size="feature"
              image={featureItem.image}
              imageAlt={featureItem.imageAlt}
              title={featureItem.name}
              subtitle={featureItem.district}
              description={featureItem.description}
              crowdLevel={featureItem.crowdLevel}
              crowdUpdatedAt={featureItem.crowdUpdatedAt}
              hasAudio={featureItem.hasAudio}
              badges={[{ label: featureItem.district, variant: 'accent' }]}
              meta={[
                { icon: <Metro size={13} />, label: featureItem.metroStation },
                { icon: <Ticket size={13} />, label: featureItem.fee },
                { icon: <Clock size={13} />, label: featureItem.duration },
              ]}
              to={featureItem.to}
              className="h-full"
            />
          </div>

          {/* 2. Side Column: 2 Supporting Cards */}
          <div className="col-span-1 flex flex-col gap-6">
            {standardItems.slice(0, 2).map((place) => (
              <Card
                key={place.id}
                size="sm"
                image={place.image}
                imageAlt={place.imageAlt}
                title={place.name}
                subtitle={place.district}
                description={place.description}
                crowdLevel={place.crowdLevel}
                crowdUpdatedAt={place.crowdUpdatedAt}
                hasAudio={place.hasAudio}
                meta={[
                  { icon: <Metro size={12} />, label: place.metroStation },
                  { icon: <Ticket size={12} />, label: place.fee },
                ]}
                to={place.to}
              />
            ))}
          </div>

          {/* 3. Bottom Row: Remaining 2 Supporting Cards Across Columns */}
          <div className="col-span-3 grid grid-cols-2 gap-6">
            {standardItems.slice(2, 4).map((place) => (
              <Card
                key={place.id}
                orientation="horizontal"
                image={place.image}
                imageAlt={place.imageAlt}
                title={place.name}
                subtitle={place.district}
                description={place.description}
                crowdLevel={place.crowdLevel}
                crowdUpdatedAt={place.crowdUpdatedAt}
                hasAudio={place.hasAudio}
                meta={[
                  { icon: <Metro size={12} />, label: place.metroStation },
                  { icon: <Clock size={12} />, label: place.duration },
                ]}
                to={place.to}
              />
            ))}
          </div>
        </div>

        {/* Mobile Layout: Feature Card + Snap-Scrolling Horizontal Rail */}
        <div className="lg:hidden space-y-6">
          <Card
            image={featureItem.image}
            imageAlt={featureItem.imageAlt}
            title={featureItem.name}
            subtitle={featureItem.district}
            description={featureItem.description}
            crowdLevel={featureItem.crowdLevel}
            crowdUpdatedAt={featureItem.crowdUpdatedAt}
            hasAudio={featureItem.hasAudio}
            badges={[{ label: featureItem.district, variant: 'accent' }]}
            meta={[
              { icon: <Metro size={12} />, label: featureItem.metroStation },
              { icon: <Ticket size={12} />, label: featureItem.fee },
            ]}
            to={featureItem.to}
          />

          {/* Horizontal Snap Rail with Hidden Scrollbar */}
          <div
            className="flex items-stretch gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none -mx-4 px-4"
            style={{ scrollbarWidth: 'none' }}
          >
            {standardItems.map((place) => (
              <div key={place.id} className="w-[280px] shrink-0 snap-start flex flex-col">
                <Card
                  image={place.image}
                  imageAlt={place.imageAlt}
                  title={place.name}
                  subtitle={place.district}
                  description={place.description}
                  crowdLevel={place.crowdLevel}
                  crowdUpdatedAt={place.crowdUpdatedAt}
                  hasAudio={place.hasAudio}
                  meta={[
                    { icon: <Metro size={12} />, label: place.metroStation },
                    { icon: <Ticket size={12} />, label: place.fee },
                  ]}
                  to={place.to}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedPlacesSection;
