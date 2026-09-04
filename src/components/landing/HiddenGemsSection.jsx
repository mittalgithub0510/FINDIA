import React, { useState } from 'react';
import { Container } from '../layout/Container';
import { SectionHeader } from '../common/SectionHeader';
import { hiddenGemsData } from '../../data/delhi/landing';
import { MapPin, ArrowRight } from '../icons';
import { cn } from '../../utils/cn';

/**
 * Hidden Sites Section: Numbered editorial list (01–05) with desktop clipped hover image reveal.
 * Deliberately avoids card grids to introduce strong layout alternation.
 *
 * @component
 */
export function HiddenGemsSection() {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const activeItem = hiddenGemsData[hoveredIndex] || hiddenGemsData[0];

  return (
    <section className="py-20 sm:py-28 bg-bg-base relative border-y border-border-default">
      <Container size="wide" className="space-y-10">
        {/* Drops description entirely (rule 8 compliance) */}
        <SectionHeader
          overline="Off the Beaten Path"
          title="Forgotten Masonry & Stepwells"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Numbered Editorial List (01 to 05) */}
          <div className="lg:col-span-7 divide-y divide-border-default border-y border-border-default">
            {hiddenGemsData.map((item, index) => {
              const isHovered = index === hoveredIndex;

              return (
                <div
                  key={item.number}
                  id={`hidden-gem-row-${item.number}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onFocus={() => setHoveredIndex(index)}
                  tabIndex={0}
                  className={cn(
                    'group py-5 sm:py-6 px-3 sm:px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-base cursor-pointer outline-none select-none',
                    isHovered
                      ? 'bg-bg-raised/80 text-text-high border-l-2 border-brand'
                      : 'hover:bg-bg-raised/40 text-text-mid border-l-2 border-transparent',
                    'focus-visible:ring-1 focus-visible:ring-brand'
                  )}
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* Display Numeral (01 - 05) */}
                    <span
                      className={cn(
                        'font-display font-bold text-2xl sm:text-3xl transition-colors tracking-tight shrink-0',
                        isHovered ? 'text-brand' : 'text-text-low group-hover:text-text-high'
                      )}
                    >
                      {item.number}
                    </span>

                    {/* Mobile Thumbnail (Mobile only) */}
                    <div className="sm:hidden w-16 h-16 rounded-md overflow-hidden bg-bg-overlay shrink-0 border border-border-default">
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h3 className="font-display font-semibold text-text-high text-base sm:text-lg group-hover:text-accent-300 transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-[11px] text-text-low font-mono">
                          {item.era}
                        </span>
                      </div>

                      <p className="type-body-sm text-text-mid text-xs leading-relaxed max-w-xl">
                        {item.fact}
                      </p>

                      <div className="flex items-center gap-1.5 text-[11px] text-text-low pt-0.5">
                        <MapPin size={11} className="text-brand shrink-0" />
                        <span>{item.metro}</span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center shrink-0 text-text-low group-hover:text-brand transition-colors">
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Desktop Clipped Photo Reveal Display (Signature Interaction) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28 space-y-3">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-bg-raised border border-border-strong shadow-card">
              {/* Active Photo with Smooth Clip-Path Reveal Transition */}
              <img
                key={activeItem.number}
                src={activeItem.image}
                alt={activeItem.imageAlt}
                loading="lazy"
                className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-base"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 scrim-bottom pointer-events-none" />

              {/* Photo Caption Overlay */}
              <div className="absolute bottom-3 inset-x-3 flex items-end justify-between text-xs text-text-high z-10 pointer-events-none">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-brand font-semibold">
                    ARCHIVAL RECORD {activeItem.number}
                  </span>
                  <div className="font-display font-semibold text-sm">
                    {activeItem.name}
                  </div>
                </div>

                <span className="text-[10px] font-mono text-text-low">
                  FINDIA Telemetry
                </span>
              </div>
            </div>

            {/* Inconvenient Truth Callout beneath photo */}
            <div className="p-3.5 rounded-xl bg-bg-raised border border-border-default space-y-1">
              <div className="text-[10px] uppercase tracking-wider font-mono text-brand font-semibold">
                Field Advisory • Verified Ground Condition
              </div>
              <p className="text-xs text-text-mid font-sans leading-relaxed">
                {activeItem.fact}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HiddenGemsSection;
