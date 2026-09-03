import React from 'react';
import { useCity } from '../config/CityContext';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/layout/Container';
import { ComingSoonNote } from '../components/layout/ComingSoonNote';
import { hiddenGems } from '../data/delhi/hiddenGems';
import { MapPin, Clock, AlertTriangle } from '../components/icons';
import { usePageMeta } from '../hooks/usePageMeta';

/**
 * Hidden Gems Archive Page.
 * Feature Owner: src/features/hidden-gems/
 *
 * @page
 */
export function HiddenGemsPage() {
  const { city } = useCity();
  usePageMeta(
    `Lesser-Known Ruins & Secret Stepwells in ${city.name}`,
    `Audited register of forgotten stepwells, hunting lodges, and ruined fortresses off the conventional tourist trail in ${city.name}.`
  );

  return (
    <div className="w-full pb-24 select-none">
      {/* 1. Typographic Surface Header */}
      <PageHeader
        overline={`Off the Beaten Path • ${city.name}`}
        title="Lesser-Known Stepwells & Ancient Ruins"
        description={`Unrecorded water systems, fourteenth-century hunting lodges, and fortification ramparts across ${city.name} that receive minimal daily visitors.`}
      />

      <Container size="wide" className="pt-8 space-y-10">
        <ComingSoonNote
          featureName="Community Submission & Field Geolocation Audit"
          owner="hidden-gems"
          description="The secret sites repository is currently compiled by heritage fellows. Submission forms and offline GPS waypoints are scheduled for implementation in src/features/hidden-gems/."
        />

        {/* 2. Full-Page Editorial Layout (Alternating Large Editorial Blocks) */}
        <div className="space-y-12">
          {hiddenGems.map((gem, index) => {
            const isEven = index % 2 === 0;

            return (
              <article
                key={gem.id}
                className="p-6 sm:p-8 rounded-2xl bg-bg-raised border border-border-default shadow-card hover:border-brand/40 transition-all duration-base"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  {/* Image Column (5 cols) */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-bg-base border border-border-strong">
                      <img
                        src={gem.image}
                        alt={gem.imageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 scrim-bottom pointer-events-none" />
                      <div className="absolute bottom-2.5 left-3 text-[11px] font-mono text-text-high/90">
                        {gem.era}
                      </div>
                    </div>
                  </div>

                  {/* Editorial Text Column (7 cols) */}
                  <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono text-brand">
                        <span>Site #{String(index + 1).padStart(2, '0')}</span>
                        <span>•</span>
                        <span>{gem.district}</span>
                      </div>
                      <h2 className="font-display font-bold text-xl sm:text-2xl text-text-high">
                        {gem.name}
                      </h2>
                    </div>

                    <p className="type-body text-text-mid text-xs sm:text-sm leading-relaxed">
                      {gem.fact}
                    </p>

                    {/* Inconvenient Truth Callout */}
                    {gem.inconvenience && (
                      <div className="p-3.5 rounded-lg bg-bg-base border-l-2 border-brand/80 text-xs text-text-mid space-y-1">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-brand font-semibold flex items-center gap-1.5">
                          <AlertTriangle size={12} />
                          <span>Ground Condition Notice</span>
                        </div>
                        <p className="text-[11px] text-text-mid font-sans leading-relaxed">
                          {gem.inconvenience}
                        </p>
                      </div>
                    )}

                    {/* Metadata Strip */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 border-t border-border-subtle text-xs text-text-low font-mono">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-brand shrink-0" />
                        <span>{gem.metro}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-brand shrink-0" />
                        <span>{gem.timing}</span>
                      </div>
                      <div>{gem.fee}</div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default HiddenGemsPage;
