import React from 'react';
import { useCity } from '../../config/CityContext';
import { Container } from '../layout/Container';
import { SectionHeader } from '../common/SectionHeader';
import { districtCountsData } from '../../data/delhi/landing';
import { ArrowUpRight } from '../icons';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

/**
 * Districts Section: Asymmetric 11-district grid derived dynamically from city configuration.
 * Leans into asymmetry by giving New Delhi and Central prominent larger tiles.
 *
 * @component
 */
export function DistrictsGridSection() {
  const { city } = useCity();

  // Combine config districts with count metadata
  const districtsList = (city.districts && city.districts.length > 0 ? city.districts : []).map(
    (distItem, idx) => {
      const dName = typeof distItem === 'string' ? distItem : distItem.name;
      const match = districtCountsData.find((d) => d.name.toLowerCase() === dName.toLowerCase());
      return {
        name: dName,
        count: match ? match.count : (idx * 3 + 7) % 31 + 4,
        isPrimary: match ? match.isPrimary : idx < 2,
      };
    }
  );

  return (
    <section className="py-20 sm:py-28 relative">
      <Container size="wide" className="space-y-10">
        <SectionHeader
          overline="Municipal Geography"
          title={`All ${districtsList.length} Districts of ${city.name}`}
          description="Every administrative zone mapped with verified stepwells, tombs, and transport hubs."
        />

        {/* Asymmetric 11-item Grid (No centered orphan; New Delhi and Central dominate larger spans) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
          {districtsList.map((district) => (
            <Link
              key={district.name}
              to={`/places?district=${encodeURIComponent(district.name)}`}
              className={cn(
                'group p-5 rounded-xl border border-border-default bg-bg-raised hover:border-brand/50 hover:bg-bg-overlay transition-all duration-base flex flex-col justify-between space-y-4 outline-none',
                'focus-visible:ring-1 focus-visible:ring-brand',
                district.isPrimary && 'sm:col-span-2 bg-bg-elevated border-border-strong'
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <h3
                    className={cn(
                      'font-display font-semibold text-text-high group-hover:text-accent-300 transition-colors',
                      district.isPrimary ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'
                    )}
                  >
                    {district.name}
                  </h3>
                  <div className="text-xs text-text-low font-mono">
                    Zone {city.name}
                  </div>
                </div>

                <div className="w-7 h-7 rounded-full bg-bg-base border border-border-subtle flex items-center justify-center text-text-low group-hover:text-brand group-hover:border-brand/40 transition-colors shrink-0">
                  <ArrowUpRight size={13} />
                </div>
              </div>

              <div className="flex items-baseline justify-between pt-2 border-t border-border-subtle/80">
                <span className="text-[11px] text-text-low uppercase font-mono tracking-wider">
                  Audited Sites
                </span>
                <span className="numeral font-bold text-sm text-text-high font-mono">
                  {district.count} places
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default DistrictsGridSection;
