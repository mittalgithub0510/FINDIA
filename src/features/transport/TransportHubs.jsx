import React from 'react';
import { Landmark, Metro, ArrowRight, CornerDownRight } from '../../components/icons';
import { Container } from '../../components/layout/Container';

export function TransportHubs({ hubs = [] }) {
  return (
    <section className="py-12 bg-bg-base border-b border-[#2E271F]">
      <Container size="wide" className="space-y-8">
        {/* Section Header */}
        <div className="space-y-2 max-w-2xl">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F3EBDC]">
            Major Transport Hubs
          </h2>
          <p className="type-body text-[#9C9186] text-sm sm:text-base leading-relaxed">
            Key interchanges and transit nodes serving Delhi&apos;s primary tourism corridors.
          </p>
        </div>

        {/* Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hubs.map((hub) => (
            <div
              key={hub.id}
              className="p-5 rounded-2xl bg-[#17130F] border border-[#2E271F] hover:border-[#8A7238] transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <h3 className="font-bold text-[#F3EBDC] text-base font-display leading-snug">
                      {hub.name}
                    </h3>
                    <span className="text-[10px] font-mono font-semibold text-[#C9A24B]">
                      {hub.type}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#1B1613] border border-[#2E271F] flex items-center justify-center text-[#C9A24B] shrink-0">
                    <Landmark size={16} />
                  </div>
                </div>

                {/* Useful For Attractions List */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#6E655B]">Useful For:</span>
                  <div className="flex flex-wrap gap-1">
                    {hub.usefulFor.map((spot, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#1B1613] text-[#F3EBDC] border border-[#2E271F]"
                      >
                        {spot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modes & Notes */}
              <div className="pt-3 border-t border-[#241F19] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#9C9186]">Modes:</span>
                  <span className="font-bold text-[#5FA97C]">
                    {hub.modesAvailable.join(' • ')}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#1B1613] border border-[#2E271F] text-[11px] text-[#9C9186] leading-relaxed flex items-start gap-1.5">
                  <CornerDownRight size={13} className="text-[#C9A24B] shrink-0 mt-0.5" />
                  <span>{hub.notes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TransportHubs;
