import React from 'react';
import { Metro, Bus, Navigation, Car, Walk, Clock, Ticket, ExternalLink } from '../../components/icons';
import { Container } from '../../components/layout/Container';

export function TransportModes({ modes = [] }) {
  const getModeIcon = (iconName) => {
    switch (iconName) {
      case 'Metro':
        return <Metro size={24} className="text-[#C9A24B]" />;
      case 'Bus':
        return <Bus size={24} className="text-amber-400" />;
      case 'Navigation':
        return <Navigation size={24} className="text-emerald-400" />;
      case 'Car':
        return <Car size={24} className="text-sky-400" />;
      case 'Walk':
        return <Walk size={24} className="text-emerald-300" />;
      default:
        return <Metro size={24} className="text-[#C9A24B]" />;
    }
  };

  return (
    <section className="py-12 bg-bg-base border-b border-[#2E271F]">
      <Container size="wide" className="space-y-8">
        {/* Section Header */}
        <div className="space-y-2 max-w-2xl">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F3EBDC]">
            Choose Your Way Around Delhi
          </h2>
          <p className="type-body text-[#9C9186] text-sm sm:text-base leading-relaxed">
            Different transport modes work better for different distances, budgets, and tourist areas.
          </p>
        </div>

        {/* Modes Grid - Icon on Left, Name on Right */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {modes.map((mode) => (
            <div
              key={mode.id}
              className="p-5 rounded-2xl bg-[#17130F] border border-[#2E271F] hover:border-[#8A7238] transition-all space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Header Row: Icon on Left, Name on Right */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#1B1613] border border-[#2E271F] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                    {getModeIcon(mode.iconName)}
                  </div>
                  <h3 className="font-bold text-[#F3EBDC] text-base font-display leading-tight">
                    {mode.name}
                  </h3>
                </div>

                <p className="text-xs text-[#9C9186] leading-relaxed">
                  {mode.description}
                </p>
              </div>

              {/* Mode Meta Footers & Google Maps Link for Walking */}
              <div className="pt-3 border-t border-[#241F19] space-y-2 text-[11px] text-[#6E655B] font-mono">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[#9C9186]">
                    <Ticket size={12} className="text-[#C9A24B]" />
                    <span>Fare:</span>
                  </span>
                  <span className="font-bold text-[#F3EBDC]">{mode.avgCost}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[#9C9186]">
                    <Clock size={12} className="text-amber-400" />
                    <span>Speed:</span>
                  </span>
                  <span className="font-semibold text-[#9C9186]">{mode.speedRating}</span>
                </div>

                {mode.id === 'walk' && (
                  <a
                    href="https://www.google.com/maps/search/Delhi+tourist+attractions/@28.6139,77.2090,14z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 w-full py-1.5 px-2.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-[10px] font-bold font-sans flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Google Maps Walking</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TransportModes;
