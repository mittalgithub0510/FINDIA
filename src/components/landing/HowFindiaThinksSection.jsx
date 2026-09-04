import React from 'react';
import { Container } from '../layout/Container';
import { GlassPanel } from '../common/GlassPanel';
import { Sparkle, Compass, Clock, Ticket, Users, Metro, Sun, ShieldAlert, Headphones, MessageSquare } from '../icons';

const SIGNALS_LIST = [
  { id: 'interests', label: 'Tourist Interests', icon: Compass, desc: 'Heritage, food, photography, nature' },
  { id: 'time', label: 'Available Time', icon: Clock, desc: '30 mins to full day windows' },
  { id: 'budget', label: 'Budget Level', icon: Ticket, desc: 'Free entry to premium experiences' },
  { id: 'crowd', label: 'Live Crowd Density', icon: Users, desc: 'Real-time telemetry & wait times' },
  { id: 'transport', label: 'Transit Access', icon: Metro, desc: 'Metro lines & walking radius' },
  { id: 'weather', label: 'Weather & Lighting', icon: Sun, desc: 'Heat index & shaded time slots' },
  { id: 'hours', label: 'Opening Hours', icon: ShieldAlert, desc: 'Confirmed opening & closing schedules' },
  { id: 'community', label: 'Community Signals', icon: MessageSquare, desc: 'Ground updates & local verification' },
  { id: 'intelligence', label: 'Place Intelligence', icon: Headphones, desc: 'Audio stories & historic significance' },
];

/**
 * SECTION 5 — HOW FINDIA THINKS
 * Visual decision engine (DISCOVER → UNDERSTAND → DECIDE → EXPLORE)
 */
export function HowFindiaThinksSection() {
  return (
    <section className="py-20 bg-bg-raised/40 border-t border-white/5 relative">
      <Container size="wide" className="space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
            <Sparkle size={14} />
            <span>Architecture & Engine</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-high tracking-tight">
            How FINDIA Thinks: The Intelligence Engine
          </h2>
          <p className="type-body text-text-mid text-sm sm:text-base leading-relaxed">
            FINDIA operates as an active decision engine rather than a generic chatbot. It continuously processes 9 live context signals before generating tailored recommendations.
          </p>
        </div>

        {/* 4-Step Decision Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassPanel tier="heavy" className="p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">Step 01</div>
            <h3 className="font-display font-bold text-lg text-text-high">DISCOVER</h3>
            <p className="text-xs text-text-mid leading-relaxed">
              Capture tourist intent, location context, available hours, and interest profile.
            </p>
          </GlassPanel>

          <GlassPanel tier="heavy" className="p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">Step 02</div>
            <h3 className="font-display font-bold text-lg text-text-high">UNDERSTAND</h3>
            <p className="text-xs text-text-mid leading-relaxed">
              Evaluate real-time crowd congestion, ticket wait times, metro proximity, and weather.
            </p>
          </GlassPanel>

          <GlassPanel tier="heavy" className="p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">Step 03</div>
            <h3 className="font-display font-bold text-lg text-text-high">DECIDE</h3>
            <p className="text-xs text-text-mid leading-relaxed">
              Synthesize signals to balance visitor demand and recommend the optimal contextual experience.
            </p>
          </GlassPanel>

          <GlassPanel tier="heavy" className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 space-y-2">
            <div className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">Step 04</div>
            <h3 className="font-display font-bold text-lg text-amber-200">EXPLORE</h3>
            <p className="text-xs text-text-high leading-relaxed">
              Deliver complete itinerary, audio guidance, transit route, and local intelligence.
            </p>
          </GlassPanel>
        </div>

        {/* 9 Signals Grid */}
        <div className="space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-text-low">
            Processed Decision Signals (9 Telemetry Vectors)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {SIGNALS_LIST.map((signal) => {
              const IconComp = signal.icon;
              return (
                <div
                  key={signal.id}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/40 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 shrink-0">
                    <IconComp size={18} />
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm text-text-high">{signal.label}</div>
                    <div className="text-xs text-text-mid mt-0.5">{signal.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </Container>
    </section>
  );
}

export default HowFindiaThinksSection;
