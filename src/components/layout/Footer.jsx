import React from 'react';
import { Link } from 'react-router-dom';
import { useCity } from '../../config/CityContext';
import { Container } from './Container';
import { Phone, ExternalLink } from '../icons';

/**
 * Global application footer.
 * Sits on a flat dark foundation (bg-bg-raised), avoiding artificial glass blur.
 *
 * @component
 */
export function Footer() {
  const { city } = useCity();

  const cityLinks = [
    { label: 'Audited Places', to: '/places' },
    { label: 'Hidden Gems', to: '/hidden-gems' },
    { label: `${city.name} Districts (${city.stats?.districts || 11})`, to: '/places' },
    { label: 'Location Audio Guides', to: '/audio-guide' },
  ];

  const planLinks = [
    { label: 'Day Itinerary Planner', to: '/itinerary' },
    { label: 'Travel Together Meetups', to: '/travel-together' },
    { label: 'Community Insights & Tips', to: '/community' },
    { label: 'Safety & Emergency SOS', to: '/safety-sos' },
  ];

  const emergencyNumbers =
    city.emergency && city.emergency.length > 0
      ? city.emergency
      : [
          { label: 'Universal Emergency', number: '112', type: 'universal' },
          { label: `${city.name} Police Control`, number: '100', type: 'police' },
          { label: 'Ambulance Helpline', number: '102', type: 'medical' },
          { label: 'Fire Service', number: '101', type: 'fire' },
          { label: 'Women Helpline', number: '1091', type: 'women' },
          { label: 'Tourist Helpline', number: '1363', type: 'tourist' },
        ];

  const legalLinks = [
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms of Service', to: '#' },
    { label: 'Archaeological Sources (ASI)', to: '#' },
  ];

  return (
    <footer
      role="contentinfo"
      aria-label="Site Footer"
      className="w-full bg-bg-raised border-t border-border-default mt-auto select-none transition-colors"
    >
      <Container size="wide" className="py-12 sm:py-16 space-y-12">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Column 1: Brand & Platform Mission */}
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-xl text-text-high tracking-tight">
                FINDIA
              </span>
              <span className="font-deva text-brand text-sm font-normal">
                {city.slug === 'delhi' ? 'दिल्ली' : 'जयपुर'}
              </span>
            </div>

            <p className="type-body-sm text-text-mid max-w-xs">
              A photo-first, crowd-aware urban telemetry platform engineered for authentic transit.
            </p>

            <div className="pt-2 border-t border-border-subtle text-xs text-text-low font-mono">
              <span className="text-brand font-semibold">●</span> Multi-city architecture: Delhi is live; Jaipur, Mumbai, Varanasi and more Indian heritage cities are joining the registry soon.
            </div>
          </div>

          {/* Column 2: City Navigation */}
          <div className="space-y-3">
            <h3 className="type-overline text-brand">
              In {city.name}
            </h3>
            <ul className="space-y-2 text-xs">
              {cityLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.to}
                    className="text-text-mid hover:text-text-high transition-colors outline-none focus-visible:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Planning & Safety */}
          <div className="space-y-3">
            <h3 className="type-overline text-brand">
              Plan & Connect
            </h3>
            <ul className="space-y-2 text-xs">
              {planLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.to}
                    className="text-text-mid hover:text-text-high transition-colors outline-none focus-visible:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Dynamic Emergency Contacts (from Active City Config) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="type-overline text-sos">
                Emergency ({city.name})
              </h3>
              <span className="text-[10px] font-mono text-text-low">Direct Dial</span>
            </div>

            <div className="space-y-1.5">
              {emergencyNumbers.map((item, idx) => (
                <a
                  key={idx}
                  href={`tel:${item.number}`}
                  className="group flex items-center justify-between p-2 rounded-sm bg-bg-base border border-border-subtle hover:border-sos/50 transition-colors text-xs text-text-high outline-none focus-visible:outline-2 focus-visible:outline-sos"
                  title={`Call ${item.label}`}
                >
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-sos group-hover:scale-110 transition-transform" />
                    <span className="font-mono font-semibold">{item.number}</span>
                  </div>
                  <span className="text-[11px] text-text-low truncate max-w-[130px]">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Last updated, and Sub-links */}
        <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-low font-mono">
          <div>
            © {new Date().getFullYear()} FINDIA Platform. Built for Indian travelers.
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Active City: <strong className="text-brand">{city.name}</strong></span>
            <span>•</span>
            <span>Last Updated: September 2026</span>
          </div>

          <div className="flex items-center gap-3">
            {legalLinks.map((l, i) => (
              <a
                key={i}
                href={l.to}
                className="hover:text-text-mid transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
