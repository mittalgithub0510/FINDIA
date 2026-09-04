import React from 'react';
import { MapPin, Metro, Walk, ArrowRight } from '../../components/icons';
import { Container } from '../../components/layout/Container';

export function TouristZones({ zones = [], onSelectZoneDestination }) {
  return (
    <section className="py-12 bg-bg-base border-b border-[#2E271F]">
      <Container size="wide" className="space-y-8">
        {/* Section Header */}
        <div className="space-y-2 max-w-2xl">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F3EBDC]">
            Explore Delhi by Tourist Zone
          </h2>
          <p className="type-body text-[#9C9186] text-sm sm:text-base leading-relaxed">
            Discover transport characteristics and metro connections tailored to each distinct Delhi tourism precinct.
          </p>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="p-6 rounded-2xl bg-[#17130F] border border-[#2E271F] hover:border-[#8A7238] transition-all space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-[#C9A24B]" />
                    <h3 className="font-bold text-[#F3EBDC] text-lg font-display">
                      {zone.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#1B1613] text-[#9C9186] border border-[#2E271F]">
                    {zone.attractions.length} Key Spot{zone.attractions.length > 1 ? 's' : ''}
                  </span>
                </div>

                <p className="text-xs text-[#9C9186] leading-relaxed">
                  {zone.description}
                </p>

                {/* Key Attractions Pills */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-[#6E655B]">Major Attractions:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {zone.attractions.map((spot, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#1B1613] text-[#F3EBDC] border border-[#2E271F]"
                      >
                        {spot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Zone Details Footer */}
              <div className="pt-4 border-t border-[#241F19] space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#1B1613] border border-[#2E271F] space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#C9A24B] flex items-center gap-1">
                      <Metro size={12} />
                      <span>Metro Stations</span>
                    </span>
                    <p className="text-[#F3EBDC] font-medium text-[11px] leading-tight">
                      {zone.metroConnectivity}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#1B1613] border border-[#2E271F] space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#5FA97C] flex items-center gap-1">
                      <Walk size={12} />
                      <span>Best Mode</span>
                    </span>
                    <p className="text-[#F3EBDC] font-medium text-[11px] leading-tight">
                      {zone.recommendedTransport}
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-[#9C9186] italic leading-relaxed">
                  <span className="font-semibold text-[#F3EBDC]">Tip:</span> {zone.travelTip}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TouristZones;
