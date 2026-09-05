import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../layout/Container';
import { GlassPanel } from '../common/GlassPanel';
import { Metro, Headphones, ShieldAlert, Users, Sparkle, MapPin, Ticket } from '../icons';

const ECOSYSTEM_SERVICES = [
  {
    id: 'transport',
    title: 'Smart Transport',
    subtitle: 'Move smarter.',
    desc: 'Delhi Metro line connections, fare estimates, and walkability indexes.',
    icon: Metro,
    to: '/transport',
    badge: 'Transit Telemetry',
  },
  {
    id: 'audio',
    title: 'Audio Guide',
    subtitle: 'Experience the story behind the place.',
    desc: 'Location-triggered voice stories and historic narrative audio tracks.',
    icon: Headphones,
    to: '/guides',
    badge: 'Narrative Audio',
    hasAudioPreview: true,
  },
  {
    id: 'sos',
    title: 'SOS & Safety',
    subtitle: 'Travel with confidence.',
    desc: 'One-touch emergency helplines, local police stations, and verified contact numbers.',
    icon: ShieldAlert,
    to: '/sos',
    badge: '24/7 Helpline',
    sosStyle: true,
  },
  {
    id: 'community',
    title: 'Community Intelligence',
    subtitle: 'People-powered tourism.',
    desc: 'Live crowd reports, ground verifications, and regional travel tips.',
    icon: Users,
    to: '/community',
    badge: 'Ground Verified',
  },
  {
    id: 'hotels',
    title: 'Hotels & Stays',
    subtitle: 'Stay closer to your journey.',
    desc: 'Curated accommodations near heritage trails and transit hubs.',
    icon: Ticket,
    to: '/hotels',
    badge: 'Curated Stays',
  },
  {
    id: 'places',
    title: 'Place Intelligence',
    subtitle: 'Understand a destination before you visit.',
    desc: 'Audited place telemetry, entry timings, ticket fees, and crowd history.',
    icon: MapPin,
    to: '/destination/north/delhi',
    badge: 'Place Telemetry',
  },
];

/**
 * SECTION 9 — TOURISM ECOSYSTEM
 * Supporting infrastructure cards with Audio Preview capability.
 */
export function EcosystemSection() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleAudioPreviewToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPlayingAudio((prev) => !prev);
  };

  return (
    <section className="py-20 bg-bg-base border-t border-white/5 relative">
      <Container size="wide" className="space-y-10">
        
        {/* Section Header */}
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
            <Sparkle size={14} />
            <span>Infrastructure Ecosystem</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-high tracking-tight">
            Integrated Tourism Ecosystem Services
          </h2>
          <p className="type-body text-text-mid text-sm leading-relaxed">
            Supporting tools designed to simplify your journey before, during, and after visiting destinations.
          </p>
        </div>

        {/* 6 Supporting Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ECOSYSTEM_SERVICES.map((item) => {
            const IconComp = item.icon;

            return (
              <Link key={item.id} to={item.to} className="block group">
                <GlassPanel
                  tier="heavy"
                  className={`p-6 rounded-2xl border transition-all duration-300 space-y-4 h-full flex flex-col justify-between ${
                    item.sosStyle
                      ? 'border-red-500/30 hover:border-red-500/60 bg-red-950/10'
                      : 'border-white/10 hover:border-amber-500/50 hover:shadow-lifted'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl border ${
                        item.sosStyle
                          ? 'bg-red-500/20 text-red-400 border-red-500/40'
                          : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                      }`}>
                        <IconComp size={20} />
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                        item.sosStyle
                          ? 'bg-red-500/20 text-red-300 border-red-500/40'
                          : 'bg-white/5 text-text-mid border-white/10'
                      }`}>
                        {item.badge}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-lg text-text-high group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h3>
                      <div className="text-xs font-semibold text-amber-400/90 font-mono">
                        {item.subtitle}
                      </div>
                      <p className="text-xs text-text-mid leading-relaxed pt-1">
                        {item.desc}
                      </p>
                    </div>

                    {/* Audio Preview Teaser Player */}
                    {item.hasAudioPreview && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handleAudioPreviewToggle}
                          className="w-full py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold flex items-center justify-between transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${isPlayingAudio ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                            <span>{isPlayingAudio ? 'Playing Story Snippet...' : 'Listen 15s Story Teaser'}</span>
                          </span>
                          <span className="text-[10px] uppercase">{isPlayingAudio ? 'Pause' : 'Play ▶'}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-text-mid group-hover:text-text-high transition-colors">
                    <span>Explore Service</span>
                    <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </GlassPanel>
              </Link>
            );
          })}
        </div>

      </Container>
    </section>
  );
}

export default EcosystemSection;
