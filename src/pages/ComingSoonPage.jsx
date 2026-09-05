import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MapPin, Sparkle, ChevronLeft } from '../components/icons';
import { DESTINATIONS_CONFIG } from '../data/destinationsData';

/**
 * ComingSoonPage — shown when user clicks a non-live state/UT.
 * The entire accent color of the page adapts to the state's iconic signature color.
 * Structure stays exactly the same; only color values change.
 */
export function ComingSoonPage() {
  const [searchParams] = useSearchParams();
  const stateName = searchParams.get('state') || 'Destination';

  // Find the accentColor for this state from DESTINATIONS_CONFIG
  let accentColor = '#C1440E'; // fallback to Delhi amber-red
  for (const region of DESTINATIONS_CONFIG) {
    const found = region.states.find(
      (s) => s.name === stateName || s.slug === stateName.toLowerCase().replace(/\s+/g, '-')
    );
    if (found?.accentColor) {
      accentColor = found.accentColor;
      break;
    }
  }

  // Derive rgba variants for backgrounds and borders
  const accentBg10  = `${accentColor}1A`; // ~10% opacity
  const accentBg20  = `${accentColor}33`; // ~20% opacity
  const accentBg30  = `${accentColor}4D`; // ~30% opacity
  const accentBorder = `${accentColor}66`; // ~40% opacity

  return (
    <div className="min-h-screen bg-bg-base text-text-high flex items-center justify-center p-6">
      <div
        className="max-w-md w-full p-8 sm:p-10 rounded-3xl text-center space-y-6"
        style={{
          background: `linear-gradient(135deg, ${accentColor}0D 0%, #12100E 60%)`,
          border: `1px solid ${accentBorder}`,
          boxShadow: `0 0 60px ${accentColor}20, 0 8px 32px rgba(0,0,0,0.5)`,
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Icon badge */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
          style={{
            background: accentBg20,
            border: `1px solid ${accentBorder}`,
            color: accentColor,
          }}
        >
          <MapPin size={32} />
        </div>

        <div className="space-y-2">
          {/* Tag pill */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider"
            style={{
              background: accentBg10,
              border: `1px solid ${accentBorder}`,
              color: accentColor,
            }}
          >
            <Sparkle size={13} />
            <span>State Expansion</span>
          </div>

          <h1 className="font-display text-3xl font-bold text-text-high">
            {stateName} —{' '}
            <span style={{ color: accentColor }}>Coming Soon</span>
          </h1>

          <p className="text-sm text-text-mid leading-relaxed">
            Telemetry mappings, heritage monuments, and crowd sensors for{' '}
            <span style={{ color: accentColor }} className="font-semibold">{stateName}</span>{' '}
            are currently being audited for SIH release.
          </p>
        </div>

        {/* Delhi live banner */}
        <div
          className="p-4 rounded-2xl text-xs text-text-mid space-y-2"
          style={{
            background: accentBg10,
            border: `1px solid ${accentBorder}`,
          }}
        >
          <div className="font-bold" style={{ color: accentColor }}>
            Delhi is 100% Live Right Now!
          </div>
          <p>Explore historic monuments, food hubs, and live crowd telemetry in Delhi.</p>
        </div>

        {/* CTA button */}
        <Link
          to="/destination/north/delhi"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg"
          style={{
            background: accentColor,
            color: '#12100E',
            boxShadow: `0 4px 20px ${accentColor}40`,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          <ChevronLeft size={16} />
          <span>Explore Live Delhi Destination</span>
        </Link>
      </div>
    </div>
  );
}

export default ComingSoonPage;
