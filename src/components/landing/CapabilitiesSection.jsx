import React from 'react';
import { Container } from '../layout/Container';
import { capabilitiesData } from '../../data/delhi/landing';
import { Crowd, Compass, Headphones, Users } from '../icons';
import { cn } from '../../utils/cn';

const ICON_MAP = {
  Crowd,
  Compass,
  Headphones,
  Users,
};

/**
 * What This Is Section: Four capability tiles in a deliberately offset, non-uniform arrangement.
 *
 * @component
 */
export function CapabilitiesSection() {
  return (
    <section className="py-20 sm:py-28 relative">
      <Container size="wide" className="space-y-12">
        {/* Editorial Section Introduction (No description - rule 8: drop description on at least 2 sections) */}
        <div className="space-y-1 max-w-xl">
          <div className="type-overline text-brand">Core Architecture</div>
          <h2 className="type-h2 text-text-high">What This Is</h2>
        </div>

        {/* 4 Offset Tiles in a Staggered Arrangement (deliberately breaks uniform grid symmetry) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {capabilitiesData.map((tile) => {
            const IconComponent = ICON_MAP[tile.iconName] || Compass;

            return (
              <div
                key={tile.id}
                className={cn(
                  'p-6 sm:p-7 rounded-2xl bg-bg-raised border border-border-default space-y-4 shadow-card transition-all duration-base hover:border-brand/40',
                  tile.offsetClass
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-bg-overlay border border-border-strong flex items-center justify-center text-brand shrink-0">
                  <IconComponent size={24} />
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display font-semibold text-text-high text-base sm:text-lg">
                    {tile.title}
                  </h3>
                  <p className="type-body-sm text-text-mid leading-relaxed">
                    {tile.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default CapabilitiesSection;
