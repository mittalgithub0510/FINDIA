import React from 'react';
import { Container } from '../layout/Container';
import { GlassPanel } from '../common/GlassPanel';
import { Button } from '../common/Button';
import { Compass, Sparkle } from '../icons';

/**
 * SECTION 12 — FINAL CTA SECTION
 * Closing message: Your Journey Starts Here.
 */
export function FinalCtaSection() {
  return (
    <section className="py-20 bg-bg-raised/40 border-t border-white/5 relative">
      <Container size="wide">
        <GlassPanel
          tier="heavy"
          className="p-8 sm:p-14 rounded-3xl border border-amber-500/30 text-center space-y-6 max-w-4xl mx-auto shadow-lifted relative overflow-hidden"
        >
          {/* Subtle Accent Radial Light */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 relative z-10">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
              Start Exploring Today
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-text-high tracking-tight">
              Your Journey Starts Here.
            </h2>
            <p className="type-body text-text-mid text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Experience context-aware destination discovery and AI-powered tourism intelligence across India.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 relative z-10">
            <Button
              variant="primary"
              size="lg"
              to="/destination/north/delhi"
              icon={<Compass size={18} />}
              className="font-bold shadow-md"
            >
              Explore India
            </Button>

            <Button
              variant="secondary"
              size="lg"
              to="/findia-ai"
              icon={<Sparkle size={18} className="text-amber-400" />}
              className="font-semibold"
            >
              Plan with FINDIA AI
            </Button>
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}

export default FinalCtaSection;
