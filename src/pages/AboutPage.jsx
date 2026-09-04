import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/layout/Container';
import { usePageMeta } from '../hooks/usePageMeta';

/**
 * About Page.
 *
 * @page
 */
export function AboutPage() {
  usePageMeta(
    'About FINDIA — Architecture & Mission',
    'What FINDIA is, why real-time crowd telemetry matters, and our multi-city architecture.'
  );

  return (
    <div className="w-full pb-24 select-none">
      <PageHeader
        overline="Platform Documentation"
        title="About FINDIA"
        description="A photo-first urban telemetry system engineered to help travelers avoid peak monument congestion and navigate India's historical cities."
      />

      <Container size="default" className="pt-10 space-y-12">
        {/* Section 1: The Core Problem */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-text-high">
            Why Crowd-Aware Travel Matters
          </h2>
          <p className="type-body text-text-mid text-sm sm:text-base leading-relaxed">
            Most mapping tools treat monuments as static pins on a screen. They guide travelers along identical routes at identical hours, turning tranquil sixteenth-century courtyards into overcrowded ticket queues.
          </p>
          <p className="type-body text-text-mid text-sm sm:text-base leading-relaxed">
            FINDIA monitors crowd density in real time and models pedestrian transit across Delhi Metro lines. When a prominent site reaches peak visitor density, the system surfaces alternate gates, forgotten stepwells, or nearby garden pavilions within walking distance.
          </p>
        </section>

        {/* Section 2: Architectural Principles */}
        <section className="p-6 sm:p-8 rounded-2xl bg-bg-raised border border-border-default space-y-4">
          <h3 className="font-display font-semibold text-lg text-text-high">
            Architectural Commitments
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-text-mid font-sans leading-relaxed list-disc list-inside">
            <li>
              <strong className="text-text-high">Honest Ground Telemetry:</strong> Every entry states verified facts — ticket fees, metro gate exits, closing hours, and ground inconveniences — rather than promotional blurbs.
            </li>
            <li>
              <strong className="text-text-high">Zero Artificial Clutter:</strong> Hand-drawn vector indicators, strict contrast ratios, and dark warm surfaces calibrated for readability under bright Indian sunlight.
            </li>
            <li>
              <strong className="text-text-high">Multi-City Swappability:</strong> The layout, components, and user experience are invariant across cities. Only the dynamic accent palette, photography, and municipal datasets swap at runtime.
            </li>
          </ul>
        </section>

        {/* Section 3: The Multi-City Roadmap */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-text-high">
            The Multi-City Roadmap
          </h2>
          <p className="type-body text-text-mid text-sm sm:text-base leading-relaxed">
            Delhi is our starting foundation. Its eleven municipal zones contain over eight centuries of standing stone architecture.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-bg-raised border border-border-default space-y-1">
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-brand text-text-inverse font-semibold">
                Live Now
              </span>
              <div className="font-display font-semibold text-text-high text-base pt-1">
                Delhi
              </div>
              <div className="text-xs text-text-low font-mono">11 Districts • 150+ Sites</div>
            </div>

            <div className="p-4 rounded-xl bg-bg-raised border border-border-default space-y-1">
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-bg-overlay text-text-low font-semibold">
                Phase 2
              </span>
              <div className="font-display font-semibold text-text-high text-base pt-1">
                Jaipur
              </div>
              <div className="text-xs text-text-low font-mono">Walled City & Hill Forts</div>
            </div>

            <div className="p-4 rounded-xl bg-bg-raised border border-border-default space-y-1">
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-bg-overlay text-text-low font-semibold">
                Phase 3
              </span>
              <div className="font-display font-semibold text-text-high text-base pt-1">
                Mumbai & Varanasi
              </div>
              <div className="text-xs text-text-low font-mono">Victorian Gothic & River Ghats</div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default AboutPage;
