import React, { useState } from 'react';
import { Container } from '../layout/Container';
import { GlassPanel } from '../common/GlassPanel';
import { CrowdBadge } from '../common/CrowdBadge';
import { Sparkle, ArrowRight, CheckCircle2, Clock, Ticket, MapPin, ShieldAlert } from '../icons';
import { cn } from '../../utils/cn';

/**
 * SECTION 4 — TOURISM DEMAND REDISTRIBUTION (CORE USP)
 * Heading: Don't Just Follow the Crowd. Find Your Own India.
 * Framing: "Not the most famous place. The right place for you, right now."
 * Includes Interactive Comparison Toggle ("Without FINDIA" vs "With FINDIA AI")
 */
export function DemandRedistributionSection() {
  const [activeMode, setActiveMode] = useState('with_findia');

  return (
    <section className="py-20 bg-bg-base border-t border-white/5 relative overflow-hidden">
      <Container size="wide" className="space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
            <Sparkle size={14} />
            <span>Core Differentiator — Tourism Intelligence</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-text-high tracking-tight leading-tight">
            Don&apos;t Just Follow the Crowd. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
              Find Your Own India.
            </span>
          </h2>
          <p className="type-body text-text-mid text-base leading-relaxed">
            FINDIA doesn&apos;t tell you famous places are bad. Instead, it evaluates crowd signals, available time, transport, and your interests to find <strong className="text-text-high font-semibold">“the right place for you at this exact time.”</strong>
          </p>
        </div>

        {/* Interactive Comparison Mode Switcher */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setActiveMode('without_findia')}
            className={cn(
              'px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer border',
              activeMode === 'without_findia'
                ? 'bg-amber-500/30 text-amber-200 border-amber-500/60 shadow-md font-extrabold'
                : 'bg-white/5 text-text-low hover:bg-white/10 hover:text-text-mid border-white/10'
            )}
          >
            ❌ Without FINDIA (Traditional Crowding)
          </button>
          
          <button
            type="button"
            onClick={() => setActiveMode('with_findia')}
            className={cn(
              'px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5',
              activeMode === 'with_findia'
                ? 'bg-emerald-500 text-bg-base border-emerald-400 shadow-md font-extrabold'
                : 'bg-white/5 text-text-low hover:bg-white/10 hover:text-text-mid border-white/10'
            )}
          >
            <CheckCircle2 size={15} />
            <span>✨ With FINDIA AI (Smart Demand Shift)</span>
          </button>
        </div>

        {/* Visual Decision Pipeline Flow */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 p-4 rounded-2xl glass-heavy border border-amber-500/20 text-center items-center text-xs">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-[10px] font-mono text-amber-400 uppercase font-bold">1. Tourist Intent</div>
            <div className="font-semibold text-text-high">Heritage & Photo</div>
          </div>
          
          <div className="hidden md:flex justify-center text-amber-400/60">
            <ArrowRight size={16} />
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
            <div className="text-[10px] font-mono text-amber-400 uppercase font-bold">2. Initial Pick</div>
            <div className="font-semibold text-amber-200">Qutub Minar</div>
          </div>

          <div className="hidden md:flex justify-center text-amber-400/60">
            <ArrowRight size={16} />
          </div>

          <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 space-y-1">
            <div className="text-[10px] font-mono text-amber-400 uppercase font-bold">3. Demand Signal</div>
            <div className="font-bold text-amber-300">88% Crowd Peak</div>
          </div>

          <div className="hidden md:flex justify-center text-amber-400/60">
            <ArrowRight size={16} />
          </div>

          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 space-y-1 col-span-2 md:col-span-1">
            <div className="text-[10px] font-mono text-emerald-300 uppercase font-bold">4. Right Match</div>
            <div className="font-bold text-emerald-200">Agrasen Ki Baoli</div>
          </div>
        </div>

        {/* Dynamic Context Scenario Card */}
        <GlassPanel tier="heavy" className="p-6 sm:p-8 rounded-3xl border border-amber-500/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Live Scenario Simulation ({activeMode === 'with_findia' ? 'FINDIA Smart Match' : 'Unguided Travel'})
              </div>
              <h3 className="font-display font-bold text-xl text-text-high mt-1">
                Contextual Demand Redistribution in Action
              </h3>
            </div>
            <div className={cn(
              "text-xs font-mono px-3 py-1 rounded-full border shrink-0 font-bold",
              activeMode === 'with_findia'
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "bg-amber-500/20 text-amber-300 border-amber-500/40"
            )}>
              {activeMode === 'with_findia' ? 'Balanced Tourist Flow' : 'High Queue Friction'}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Context Profile Column */}
            <div className="lg:col-span-5 space-y-4 bg-bg-base/60 p-5 rounded-2xl border border-white/10">
              <div className="text-xs font-mono uppercase tracking-wider text-text-low font-bold">
                Tourist Context Profile
              </div>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-text-mid">Interests:</span>
                  <span className="font-bold text-amber-300">Heritage + Photography</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-text-mid">Available Time:</span>
                  <span className="font-bold text-text-high">3 Hours</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-text-mid">Budget:</span>
                  <span className="font-bold text-text-high">₹1,000</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-text-mid">Transport Preference:</span>
                  <span className="font-bold text-text-high">Metro & Walking</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] font-mono text-text-low space-y-1">
                <div className="text-amber-400 font-bold">Evaluated Telemetry Signals:</div>
                <div>• Ticket queue waits • Metro crowding • Sun position • Community reports</div>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-7">
              {activeMode === 'with_findia' ? (
                <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/50 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                    <span className="text-xs font-mono font-bold text-emerald-300 uppercase flex items-center gap-1.5">
                      <CheckCircle2 size={16} />
                      FINDIA Smart Match Recommended
                    </span>
                    <CrowdBadge level="low" size="sm" />
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-2xl text-emerald-200">Agrasen Ki Baoli</h4>
                    <p className="text-xs text-text-mid mt-1 leading-relaxed">
                      14th-century stepwell heritage with zero entrance wait time. Perfect shaded lighting for photography right now.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 rounded-xl bg-black/30 border border-emerald-500/30">
                      <div className="text-[10px] text-text-low font-mono">Entry Queue</div>
                      <div className="font-bold text-emerald-300">0 Minutes Wait</div>
                    </div>
                    <div className="p-3 rounded-xl bg-black/30 border border-emerald-500/30">
                      <div className="text-[10px] text-text-low font-mono">Transit Access</div>
                      <div className="font-bold text-emerald-300">12 min Metro</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-4">
                  <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                    <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                      Traditional Tourist Choice
                    </span>
                    <CrowdBadge level="high" size="sm" />
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-2xl text-text-high">Qutub Minar</h4>
                    <p className="text-xs text-text-mid mt-1 leading-relaxed">
                      45 minutes entrance ticket line queue. High peak sun glare for photography during afternoon.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 rounded-xl bg-black/30 border border-amber-500/30">
                      <div className="text-[10px] text-text-low font-mono">Entry Queue</div>
                      <div className="font-bold text-amber-300">45 Minutes Wait</div>
                    </div>
                    <div className="p-3 rounded-xl bg-black/30 border border-amber-500/30">
                      <div className="text-[10px] text-text-low font-mono">Crowd Density</div>
                      <div className="font-bold text-amber-300">88% Congested</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </GlassPanel>

      </Container>
    </section>
  );
}

export default DemandRedistributionSection;
