import React from 'react';
import { Sparkle, ChevronLeft, Route } from '../components/icons';
import { Link } from 'react-router-dom';

export function FindiaAIPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-high flex items-center justify-center p-6">
      <div className="max-w-lg w-full glass-heavy p-8 sm:p-10 rounded-3xl border border-white/15 text-center space-y-6 shadow-lifted relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-bg-base flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
          <Sparkle size={32} />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider border border-amber-500/40">
            <Route size={13} />
            <span>AI Trip Planner Tag</span>
          </div>
          <h1 className="type-h1 font-display font-bold">FINDIA AI Crowd Planner</h1>
          <p className="text-sm text-text-mid leading-relaxed">
            Algorithmic itinerary sequencing powered by real-time crowd congestion models, transit transfers, and weather forecasting.
          </p>
        </div>

        <Link
          to="/destination/north/delhi"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-bg-base font-bold text-xs transition-colors shadow-lifted"
        >
          <ChevronLeft size={16} />
          <span>Explore Live Delhi Destinations</span>
        </Link>
      </div>
    </div>
  );
}

export default FindiaAIPage;
