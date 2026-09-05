import React from 'react';
import { MapPin, Users, ArrowRight } from '../../components/icons';
import { Container } from '../../components/layout/Container';

export function TouristZoneGuides({ zones = [], onSelectZone }) {
  return (
    <section className="py-12 bg-bg-base border-b border-[#2E271F]">
      <Container size="wide" className="space-y-8">
        {/* Section Header */}
        <div className="space-y-2 max-w-2xl">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F3EBDC]">
            Explore Guides by Tourist Zone
          </h2>
          <p className="type-body text-[#9C9186] text-sm sm:text-base leading-relaxed">
            Find specialist storytellers intimately familiar with the heritage, food streets, and monuments of distinct Delhi zones.
          </p>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="p-5 rounded-2xl bg-[#17130F] border border-[#2E271F] hover:border-[#8A7238] transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-[#C9A24B]" />
                  <h3 className="font-bold text-[#F3EBDC] text-base font-display">
                    {zone.name}
                  </h3>
                </div>

                <p className="text-xs text-[#9C9186] leading-relaxed">
                  {zone.description}
                </p>

                <div className="p-2.5 rounded-xl bg-[#1B1613] border border-[#2E271F] text-xs font-mono">
                  <span className="text-[10px] text-[#6E655B] uppercase block">Recommended Focus:</span>
                  <span className="font-bold text-[#C9A24B]">{zone.recommendedCategory}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectZone(zone.id)}
                className="w-full py-2 px-3 rounded-xl bg-[#1B1613] hover:bg-[#241E1A] text-[#9C9186] hover:text-[#F3EBDC] border border-[#2E271F] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Filter Zone Guides</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TouristZoneGuides;
