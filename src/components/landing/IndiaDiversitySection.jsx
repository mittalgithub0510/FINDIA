import React from 'react';
import { Container } from '../layout/Container';
import { GlassPanel } from '../common/GlassPanel';
import { Sparkle } from '../icons';

const DIVERSITY_CATEGORIES = [
  {
    id: 'mountains',
    title: 'Mountains & Valleys',
    subtitle: 'Himalayan sanctuary & pine forests',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
    tag: 'North & East',
  },
  {
    id: 'heritage',
    title: 'Heritage & Architecture',
    subtitle: 'Centuries of stone craft & Mughal grandeur',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800',
    tag: 'Delhi & Rajasthan',
  },
  {
    id: 'deserts',
    title: 'Deserts & Forts',
    subtitle: 'Golden sands & hilltop citadel walls',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800',
    tag: 'West India',
  },
  {
    id: 'coasts',
    title: 'Coasts & Backwaters',
    subtitle: 'Palm shores & quiet tropical waters',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800',
    tag: 'South & Islands',
  },
  {
    id: 'northeast',
    title: 'Northeast Trails',
    subtitle: 'Living root bridges & misty valleys',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800',
    tag: 'Northeast India',
  },
  {
    id: 'food',
    title: 'Food & Living Culture',
    subtitle: 'Street spices, chai stalls & vibrant bazaars',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800',
    tag: 'Pan-India',
  },
];

/**
 * SECTION 2 — INDIA DIVERSITY SECTION
 * Cinematic, image-led grid highlighting India's rich diversity.
 */
export function IndiaDiversitySection() {
  return (
    <section className="py-20 bg-bg-base/90 border-t border-white/5 relative overflow-hidden">
      <Container size="wide" className="space-y-12">

        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
            <Sparkle size={14} />
            <span>Scale & Diversity</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-high tracking-tight leading-tight">
            India Isn&apos;t One Destination. <br />
            <span className="text-amber-400">It&apos;s a Million Stories.</span>
          </h2>
          <p className="type-body text-text-mid text-sm sm:text-base leading-relaxed">
            Every region carries unique topography, climate, language, and living heritage. FINDIA is designed to connect tourists to the right story at the right time.
          </p>
        </div>

        {/* 6 Category Image Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIVERSITY_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="group relative h-64 rounded-2xl overflow-hidden border border-white/15 shadow-card transition-all duration-300 hover:border-amber-500/50 hover:shadow-lifted cursor-pointer"
            >
              {/* Category Image */}
              <img
                src={cat.image}
                alt={cat.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/40 to-transparent" />

              {/* Card Content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                <div className="flex justify-end">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-black/60 text-amber-300 border border-white/10 backdrop-blur-md">
                    {cat.tag}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-text-high group-hover:text-amber-300 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-text-mid line-clamp-1">
                    {cat.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}

export default IndiaDiversitySection;
