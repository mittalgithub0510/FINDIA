import React, { useState } from 'react';
import { Container } from '../layout/Container';
import { GlassPanel } from '../common/GlassPanel';
import { GOVERNMENT_INTELLIGENCE_DEMO } from '../../data/governmentIntelligenceDemo';
import { Sparkle, ShieldAlert, CheckCircle2, Users } from '../icons';
import { cn } from '../../utils/cn';

/**
 * SECTION 10 — GOVERNMENT TOURISM INTELLIGENCE PREVIEW
 * Demonstrates FINDIA's second side: Aggregated tourism signals for planning & demand redistribution.
 */
export function GovernmentIntelligenceSection() {
  const { badge, tagline, subtitle, metrics, cards } = GOVERNMENT_INTELLIGENCE_DEMO;
  const [surgeLevel, setSurgeLevel] = useState(25);

  return (
    <section className="py-20 bg-bg-raised/50 border-t border-white/5 relative">
      <Container size="wide" className="space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
              <Sparkle size={14} />
              <span>Government & Stakeholder Planning</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-high tracking-tight">
              Tourism Growth & Demand Planning
            </h2>
            <p className="type-body text-text-mid text-sm leading-relaxed">
              {tagline} — Aggregated, anonymized tourism demand signals provide actionable insights for destination management and infrastructure planning.
            </p>
          </div>

          {/* Planning Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold shrink-0 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>{badge}</span>
          </div>
        </div>

        {/* Live Crowd Surge Simulator Slider Bar */}
        <GlassPanel tier="heavy" className="p-4 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase font-bold text-amber-400">Interactive Demand Simulation</div>
            <div className="text-xs text-text-high font-semibold">
              Simulate Weekend Tourist Density Increase: <span className="text-amber-300 font-mono font-bold">+{surgeLevel}% Surge</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-64">
            <span className="text-[10px] font-mono text-text-low">+0%</span>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={surgeLevel}
              onChange={(e) => setSurgeLevel(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <span className="text-[10px] font-mono text-amber-300 font-bold">+50%</span>
          </div>
        </GlassPanel>

        {/* Metric Cards (Dynamically recalculated based on surgeLevel) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <GlassPanel tier="heavy" className="p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="text-[10px] font-mono text-text-low uppercase font-bold tracking-wider">
              Regional Congestion Index
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-display font-extrabold text-3xl text-text-high">
                {74 + Math.round(surgeLevel * 0.4)}%
              </span>
              <span className="text-xs font-mono font-semibold text-amber-300">
                +{12 + Math.round(surgeLevel * 0.5)}% vs avg
              </span>
            </div>
            <div className="text-xs font-mono text-amber-300/90 pt-1 border-t border-white/10">
              {surgeLevel > 30 ? '🔥 Critical Threshold Reached' : 'High Peak Detected'}
            </div>
          </GlassPanel>

          <GlassPanel tier="heavy" className="p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="text-[10px] font-mono text-text-low uppercase font-bold tracking-wider">
              Demand Redistribution Impact
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-display font-extrabold text-3xl text-emerald-300">
                {(28.4 + surgeLevel * 0.3).toFixed(1)}%
              </span>
              <span className="text-xs font-mono font-semibold text-emerald-300">
                {(3.2 + surgeLevel * 0.08).toFixed(1)}k redirected
              </span>
            </div>
            <div className="text-xs font-mono text-emerald-300/90 pt-1 border-t border-white/10">
              Active Alternatives Taken
            </div>
          </GlassPanel>

          <GlassPanel tier="heavy" className="p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="text-[10px] font-mono text-text-low uppercase font-bold tracking-wider">
              Emerging Destination Lift
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-display font-extrabold text-3xl text-sky-300">
                +{41 + surgeLevel}%
              </span>
              <span className="text-xs font-mono font-semibold text-sky-300">
                Higher local spend
              </span>
            </div>
            <div className="text-xs font-mono text-sky-300/90 pt-1 border-t border-white/10">
              Secondary Heritage Sites
            </div>
          </GlassPanel>
        </div>

        {/* 4 Actionable Intelligence Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <GlassPanel
              key={card.id}
              tier="heavy"
              className="p-6 rounded-2xl border border-amber-500/20 space-y-4 flex flex-col justify-between hover:border-amber-500/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {card.type}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {card.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-text-high">
                  {card.title}
                </h3>

                <p className="text-xs text-text-mid leading-relaxed">
                  {card.detail}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-text-low">{card.metricLabel}:</span>
                <span className="font-bold text-amber-300">{card.metricValue}</span>
              </div>
            </GlassPanel>
          ))}
        </div>

        {/* Clean Privacy & Telemetry Notice */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-center text-xs font-mono text-text-low">
          🔒 <strong className="text-text-mid font-semibold">Privacy & Telemetry Notice:</strong> FINDIA processes aggregated, anonymized visitor telemetry to generate tourism demand planning insights while protecting user privacy.
        </div>

      </Container>
    </section>
  );
}

export default GovernmentIntelligenceSection;
