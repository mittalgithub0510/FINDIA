import React from 'react';
import { useCity } from '../../config/CityContext';
import { Container } from '../layout/Container';
import { Button } from '../common/Button';
import { ShieldAlert, Phone } from '../icons';

/**
 * Safety & Emergency Helpline Band: Tight padding, restrained SOS-tinted surface.
 *
 * @component
 */
export function SafetyBandSection() {
  const { city } = useCity();

  const emergencyNumbers =
    city.emergency && city.emergency.length > 0
      ? city.emergency
      : [
          { label: 'All-India Emergency', number: '112', type: 'universal' },
          { label: `${city.name} Police Control`, number: '100', type: 'police' },
          { label: 'Ambulance Helpline', number: '102', type: 'medical' },
          { label: 'Women Helpline', number: '1091', type: 'women' },
        ];

  return (
    <section className="py-10 sm:py-12 bg-sos/10 border-y border-sos/25 relative select-none">
      <Container size="wide">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Reassuring Fact-Driven Copy */}
          <div className="flex items-start gap-3.5 max-w-xl">
            <div className="w-10 h-10 rounded-full bg-sos/20 border border-sos/40 flex items-center justify-center text-sos shrink-0 mt-0.5">
              <ShieldAlert size={20} />
            </div>
            <div className="space-y-1">
              <div className="text-xs uppercase font-mono tracking-wider font-semibold text-sos">
                Emergency Dispatch & Safety
              </div>
              <h3 className="font-display font-semibold text-base sm:text-lg text-text-high leading-snug">
                Direct-Dial Assistance Across All 11 Districts
              </h3>
              <p className="text-xs text-text-mid font-sans leading-relaxed">
                Emergency telephone links connect directly to local PCR vans and tourist police booths without passing through third-party servers.
              </p>
            </div>
          </div>

          {/* Right: Emergency Telephones & Action Button */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {emergencyNumbers.slice(0, 3).map((item, idx) => (
                <a
                  key={idx}
                  href={`tel:${item.number}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-bg-base border border-sos/30 text-xs font-mono font-semibold text-text-high hover:border-sos transition-colors"
                >
                  <Phone size={12} className="text-sos shrink-0" />
                  <span className="text-sos font-bold">{item.number}</span>
                  <span className="text-[10px] text-text-low font-normal hidden sm:inline truncate max-w-[80px]">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>

            <Button
              variant="danger"
              size="sm"
              to="/safety-sos"
              icon={<ShieldAlert size={14} />}
            >
              Full Safety Guide
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SafetyBandSection;
