import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MapPin, Sparkle, ChevronLeft } from '../components/icons';

export function ComingSoonPage() {
  const [searchParams] = useSearchParams();
  const stateName = searchParams.get('state') || 'Destination';

  return (
    <div className="min-h-screen bg-bg-base text-text-high flex items-center justify-center p-6">
      <div className="max-w-md w-full glass-heavy p-8 sm:p-10 rounded-3xl border border-white/15 text-center space-y-6 shadow-lifted">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto">
          <MapPin size={32} />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider border border-amber-500/30">
            <Sparkle size={13} />
            <span>State Expansion</span>
          </div>

          <h1 className="type-h1 font-display font-bold">
            {stateName} — Coming Soon
          </h1>

          <p className="text-sm text-text-mid leading-relaxed">
            Telemetry mappings, heritage monuments, and crowd sensors for {stateName} are currently being audited for SIH release.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-text-mid space-y-2">
          <div className="font-bold text-amber-300">Delhi is 100% Live Right Now!</div>
          <p>Explore historic monuments, food hubs, and live crowd telemetry in Delhi.</p>
        </div>

        <Link
          to="/destination/north/delhi"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-bg-base font-bold text-xs transition-colors shadow-lifted"
        >
          <ChevronLeft size={16} />
          <span>Explore Live Delhi Destination</span>
        </Link>
      </div>
    </div>
  );
}

export default ComingSoonPage;
