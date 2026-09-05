import React, { useState } from 'react';
import { Container } from '../layout/Container';
import { GlassPanel } from '../common/GlassPanel';
import { Button } from '../common/Button';
import { Sparkle, CheckCircle2 } from '../icons';
import { cn } from '../../utils/cn';

const AI_PRESET_SCENARIOS = [
  {
    id: 'heritage_food',
    chipLabel: '🍜 Heritage & Street Food (2 Days)',
    promptText: 'I have 2 days in Delhi, ₹5,000 budget, love heritage & street food.',
    day1: {
      title: 'Day 1 • Heritage & Old Delhi',
      spots: [
        { name: 'Morning: Agrasen Ki Baoli', detail: '9:00 AM • Quiet stepwell walk • Metro: Janpath • Fee: ₹0' },
        { name: 'Midday Culinary: Chandni Chowk', detail: '1:00 PM • Paranthe Wali Gali & Natraj Dahi Bhalle' },
        { name: 'Afternoon: Humayun’s Tomb Gardens', detail: '3:30 PM • Sunset garden lighting • Metro: JLN Stadium' },
      ],
    },
    day2: {
      title: 'Day 2 • South Delhi Trails',
      spots: [
        { name: 'Morning: Hauz Khas Fort & Lake', detail: '10:00 AM • Lake view photography & cafe stroll' },
        { name: 'Late Afternoon: Mehrauli Park', detail: '4:00 PM • Jamali Kamali tomb & quiet ruins' },
      ],
    },
    redistributionNote: 'Substituted crowded Red Fort peak hours with serene Mehrauli Archaeological Park to give you 80% less queue time while preserving rich historic photography.',
  },
  {
    id: 'photo_trail',
    chipLabel: '📸 Solo Photo Trail (1 Day)',
    promptText: 'Solo traveler wanting quiet photogenic historic spots in 1 day.',
    day1: {
      title: 'Morning & Afternoon Circuit',
      spots: [
        { name: '7:30 AM: Lodhi Garden Architecture', detail: 'Early morning light on Sayyid Domes • Zero crowds' },
        { name: '11:00 AM: Safdarjung Tomb', detail: 'Mughal garden mausoleum with symmetrical photography views' },
        { name: '3:00 PM: Nizamuddin Basti Walk', detail: 'Sufi shrine alleyways & traditional artisan doorways' },
      ],
    },
    day2: {
      title: 'Sunset Slot',
      spots: [
        { name: '5:30 PM: Sundar Nursery Gardens', detail: 'Quiet lake reflection views & UNESCO heritage monuments' },
      ],
    },
    redistributionNote: 'Prioritized early morning slot at Lodhi Garden to avoid midday sun glare and high visitor density.',
  },
  {
    id: 'family_express',
    chipLabel: '👨‍👩‍👧‍👦 Family Weekend Express',
    promptText: 'Family with kids wanting comfortable transport and easy walks.',
    day1: {
      title: 'Family Day Out',
      spots: [
        { name: '10:00 AM: National Science Centre', detail: 'Interactive hands-on exhibits for children' },
        { name: '1:30 PM: Central Park & Connaught Place', detail: 'Spacious lawns & kid-friendly food courts' },
        { name: '4:30 PM: Waste to Wonder Park', detail: 'Eco-park with Seven Wonders replicas made from recycled metal' },
      ],
    },
    day2: {
      title: 'Relaxed Evening',
      spots: [
        { name: '6:00 PM: India Gate Lawns Walk', detail: 'Well-lit evening promenade with ice cream vendors' },
      ],
    },
    redistributionNote: 'Selected locations with elevators, shade, and metro accessibility to ensure maximum family comfort.',
  },
  {
    id: 'prayagraj_sangam',
    chipLabel: '⛵ Prayagraj Sangam & Heritage (2 Days)',
    promptText: 'I have 2 days in Prayagraj, ₹4,500 budget, sunrise boat at Triveni Sangam & historic Raj-era landmarks.',
    day1: {
      title: 'Day 1 • Sacred Confluence & Akbari Fort',
      spots: [
        { name: 'Sunrise: Triveni Sangam Boat Ride', detail: '6:00 AM • Wooden boat from Kila Ghat • Confluence holy dip • Fee: ₹150' },
        { name: 'Morning: Lete Bade Hanuman Ji', detail: '8:30 AM • Subterranean reclining shrine darshan • Zero midday rush' },
        { name: 'Culinary Brunch: Netram Halwai', detail: '11:00 AM • Authentic 1854 Hing Kachori & Desi Ghee Jalebi at Katra' },
        { name: 'Afternoon: Emperor Akbar Fort', detail: '3:00 PM • Yamuna riverfront bastion & Patalpuri Temple' },
      ],
    },
    day2: {
      title: 'Day 2 • Freedom Movement & Colonial Splendor',
      spots: [
        { name: 'Morning: Anand Bhavan & Planetarium', detail: '9:30 AM • Nehru family ancestral home & memorabilia' },
        { name: 'Midday: Chandra Shekhar Azad Park', detail: '1:00 PM • 133-acre lush colonial park & Allahabad Museum' },
        { name: 'Sunset: All Saints Gothic Cathedral', detail: '4:30 PM • 1871 British Victorian stained glass architecture' },
      ],
    },
    redistributionNote: 'Scheduled Sangam boat ride at dawn to avoid peak boat queues, and sequenced Loknath street food during off-peak morning hours.',
  },
];

/**
 * SECTION 8 — FINDIA AI SHOWCASE
 * Interactive Preset Scenario Selector for the AI Tourism Decision Engine Showcase
 */
export function FindiaAiShowcaseSection() {
  const [selectedScenarioId, setSelectedScenarioId] = useState('heritage_food');

  const activeScenario = AI_PRESET_SCENARIOS.find((s) => s.id === selectedScenarioId) || AI_PRESET_SCENARIOS[0];

  return (
    <section className="py-20 bg-bg-raised/40 border-t border-white/5 relative">
      <Container size="wide" className="space-y-10">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
            <Sparkle size={14} />
            <span>AI Decision Engine</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-high tracking-tight">
            FINDIA AI: Your Context-Aware Decision Engine
          </h2>
          <p className="type-body text-text-mid text-sm sm:text-base leading-relaxed">
            Not a generic chatbot. FINDIA AI synthesizes tourist intent with crowd signals, weather, opening hours, and transport to build optimal structured plans.
          </p>
        </div>

        {/* Interactive Scenario Presets Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-mono text-text-low font-bold shrink-0 mr-2">Try Sample Scenarios:</span>
          {AI_PRESET_SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              onClick={() => setSelectedScenarioId(scenario.id)}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer border',
                selectedScenarioId === scenario.id
                  ? 'bg-amber-500 text-bg-base border-amber-400 font-extrabold shadow-md'
                  : 'bg-white/5 text-text-high hover:bg-white/10 border-white/10'
              )}
            >
              {scenario.chipLabel}
            </button>
          ))}
        </div>

        {/* Structured Decision Engine Showcase Panel */}
        <GlassPanel tier="heavy" className="p-6 sm:p-8 rounded-3xl border border-amber-500/30 space-y-6">
          
          {/* Sample Input Prompt Bar */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase font-bold text-amber-400">Selected Tourist Intent</div>
              <div className="font-display font-semibold text-sm sm:text-base text-text-high">
                &ldquo;{activeScenario.promptText}&rdquo;
              </div>
            </div>
            <Button
              variant="primary"
              size="md"
              to="/findia-ai"
              icon={<Sparkle size={16} />}
              className="shrink-0 font-bold"
            >
              Plan with FINDIA AI
            </Button>
          </div>

          {/* Structured Output Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Day 1 Plan Card */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase">{activeScenario.day1.title}</span>
                <span className="text-[10px] text-emerald-300 font-mono">Optimized Flow</span>
              </div>

              <div className="space-y-3 text-xs">
                {activeScenario.day1.spots.map((spot, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <div>
                      <div className="font-bold text-text-high text-sm">{spot.name}</div>
                      <div className="text-text-mid">{spot.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Day 2 Plan & Contextual Alternative Card */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase">{activeScenario.day2.title}</span>
                  <span className="text-[10px] text-text-low font-mono">{activeScenario.day2.spots.length} Spots</span>
                </div>

                <div className="space-y-3 text-xs">
                  {activeScenario.day2.spots.map((spot, idx) => (
                    <div key={idx}>
                      <div className="font-bold text-text-high text-sm">{spot.name}</div>
                      <div className="text-text-mid">{spot.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contextual Redistribution Alert Block */}
              <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-xs space-y-1">
                <div className="font-mono font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 size={14} />
                  <span>Demand Redistribution Strategy Applied</span>
                </div>
                <p className="text-text-high text-[11px] leading-relaxed">
                  {activeScenario.redistributionNote}
                </p>
              </div>
            </div>

          </div>

        </GlassPanel>

      </Container>
    </section>
  );
}

export default FindiaAiShowcaseSection;
