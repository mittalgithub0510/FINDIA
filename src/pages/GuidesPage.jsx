import React from 'react';
import { Users, Sparkles, ChevronLeft } from '../components/icons';
import { Link } from 'react-router-dom';

export function GuidesPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-high flex items-center justify-center p-6">
      <div className="max-w-lg w-full glass-heavy p-8 sm:p-10 rounded-3xl border border-white/15 text-center space-y-6 shadow-lifted">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto">
          <Users size={32} />
        </div>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider border border-amber-500/30">
            <Sparkles size={13} />
            <span>Feature Preview</span>
          </div>
          <h1 className="type-h1 font-display font-bold">Verified Heritage Guides</h1>
          <p className="text-sm text-text-mid leading-relaxed">
            Connect with ASI certified historical narrators, walking tour leaders, and local storytellers for custom monument expeditions.
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

export default GuidesPage;
