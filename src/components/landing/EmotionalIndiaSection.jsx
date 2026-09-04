import React from 'react';
import { Container } from '../layout/Container';

/**
 * SECTION 11 — EMOTIONAL INDIA
 * Cinematic brand storytelling section.
 */
export function EmotionalIndiaSection() {
  return (
    <section className="relative py-28 select-none overflow-hidden bg-bg-base border-t border-white/5">
      {/* High impact background photograph with dark gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=2000"
          alt="Mist covered green mountains and ancient temple"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/70 to-bg-base/80" />
      </div>

      <Container size="wide" className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
        <div className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
          The Soul of FINDIA
        </div>

        <h2 className="font-display font-bold text-4xl sm:text-6xl text-text-high tracking-tight leading-tight">
          Every corner of India has a story. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
            FINDIA helps you find yours.
          </span>
        </h2>

        <p className="type-body text-text-mid text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          From ancient stepwells hidden inside bustling capitals to tranquil Himalayan trails, FINDIA transforms how India travels by bringing clarity to discovery.
        </p>
      </Container>
    </section>
  );
}

export default EmotionalIndiaSection;
