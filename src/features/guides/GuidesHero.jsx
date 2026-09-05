import React, { useState } from 'react';
import { Search, ArrowRight, Award } from '../../components/icons';
import { Container } from '../../components/layout/Container';

export function GuidesHero({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <section className="relative pt-28 sm:pt-36 pb-12 overflow-hidden bg-bg-base border-b border-[#2E271F]">
      {/* Subtle Glow Scrims */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      <Container size="wide" className="relative z-10 space-y-8">
        {/* Status Badge & Headline */}
        <div className="max-w-3xl space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B1613] border border-[#2E271F] text-xs font-mono text-[#C9A24B] shadow-sm">
            <Award size={14} className="text-amber-400" />
            <span className="font-bold text-[#F3EBDC] uppercase tracking-wider">
              VERIFIED DELHI GUIDES & STORYTELLERS
            </span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-[#F3EBDC] tracking-tight leading-[1.08]">
            Find Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A24B] via-amber-300 to-[#C9A24B]">
              Local Guide.
            </span>
          </h1>

          <p className="type-body text-[#9C9186] text-base sm:text-xl leading-relaxed max-w-2xl">
            Explore Delhi through certified ASI historians, culinary experts, street photographers, and Sufi heritage storytellers.
          </p>
        </div>

        {/* Hero Quick Search Box */}
        <div className="max-w-3xl p-4 sm:p-5 rounded-2xl bg-[#17130F] border border-[#2E271F] shadow-2xl space-y-3">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9C9186]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search guide by name, language, or specialty (e.g. Food, German, Shahjahanabad)..."
                className="w-full bg-[#1B1613] text-[#F3EBDC] text-sm font-semibold pl-10 pr-4 py-3 rounded-xl border border-[#2E271F] focus:border-[#C9A24B] focus:outline-none placeholder-[#6E655B]"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#C9A24B] hover:bg-amber-400 text-[#0F0D0B] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-md"
            >
              <span>Search Guides</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Metrics Bar */}
          <div className="pt-3 border-t border-[#241F19] grid grid-cols-3 gap-2 text-center text-xs font-mono text-[#9C9186]">
            <div>
              <span className="font-bold text-[#F3EBDC] block text-sm">50+</span>
              <span>Verified Guides</span>
            </div>
            <div>
              <span className="font-bold text-[#C9A24B] block text-sm">6</span>
              <span>Specialties</span>
            </div>
            <div>
              <span className="font-bold text-[#5FA97C] block text-sm">4.9 ★</span>
              <span>Avg. Rating</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default GuidesHero;
