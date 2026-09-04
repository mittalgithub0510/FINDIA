import React, { useState } from 'react';
import { Sparkles } from '../../components/icons';
import { Container } from '../../components/layout/Container';

export function SmartGuideMatching({ guides = [] }) {
  const [selectedVibe, setSelectedVibe] = useState('food-heritage');

  const vibes = [
    { id: 'food-heritage', label: 'Food Street Eats + Old Delhi Heritage', topMatchId: 'g2', score: '99% Match' },
    { id: 'photo-expedition', label: 'Golden Hour Photo Walk + Stepwells', topMatchId: 'g3', score: '97% Match' },
    { id: 'sufi-music', label: 'Mystic Sufi Qawwali + Poetry Walk', topMatchId: 'g4', score: '98% Match' },
    { id: 'colonial-history', label: 'Imperial 7 Cities Archeology Walk', topMatchId: 'g6', score: '96% Match' }
  ];

  const currentVibeObj = vibes.find((v) => v.id === selectedVibe) || vibes[0];
  const matchedGuide = guides.find((g) => g.id === currentVibeObj.topMatchId) || guides[0];

  return (
    <section className="py-12 bg-bg-base border-b border-[#2E271F]">
      <Container size="wide" className="space-y-6">
        {/* Section Pill & Title */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#17130F] border border-[#2E271F] space-y-6 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Background Scrim */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider border border-purple-500/30">
                <Sparkles size={13} />
                <span>FUTURE FINDIA AI PREVIEW</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F3EBDC]">
                Smart AI Guide Matching
              </h2>
              <p className="type-body text-[#9C9186] text-xs sm:text-sm max-w-xl leading-relaxed">
                When the FINDIA AI engine is live, instant smart match algorithms will pair your exact interests, language, pace, and schedule with certified Delhi storytellers.
              </p>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-[#1B1613] border border-[#2E271F] text-xs font-mono text-purple-300 w-fit">
              AI Recommendation Preview
            </div>
          </div>

          {/* Vibe Selection Switcher */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#9C9186] uppercase block">Select Tour Vibe for AI Simulation:</span>
            <div className="flex flex-wrap gap-2">
              {vibes.map((vibe) => (
                <button
                  key={vibe.id}
                  type="button"
                  onClick={() => setSelectedVibe(vibe.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedVibe === vibe.id
                      ? 'bg-purple-600 text-white shadow-md font-bold'
                      : 'bg-[#1B1613] text-[#9C9186] hover:text-[#F3EBDC] border border-[#2E271F]'
                  }`}
                >
                  {vibe.label}
                </button>
              ))}
            </div>
          </div>

          {/* Simulated AI Result Box */}
          {matchedGuide && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#1B1613] border border-[#2E271F] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={matchedGuide.avatarUrl}
                  alt={matchedGuide.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-[#2E271F] shrink-0"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#F3EBDC] text-base">{matchedGuide.name}</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      {currentVibeObj.score}
                    </span>
                  </div>
                  <p className="text-xs text-[#9C9186] font-medium">{matchedGuide.tagline}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-xs font-mono font-bold text-[#5FA97C]">₹{matchedGuide.pricePerHour}/hr</span>
                <button
                  type="button"
                  onClick={() => alert(`Simulated AI Match with ${matchedGuide.name} selected!`)}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Simulate AI Match
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export default SmartGuideMatching;
