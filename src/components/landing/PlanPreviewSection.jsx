import React from 'react';
import { Container } from '../layout/Container';
import { itineraryPreviewData } from '../../data/delhi/landing';
import { CrowdBadge } from '../common/CrowdBadge';
import { Button } from '../common/Button';
import { Metro, ArrowRight, Clock, Ticket } from '../icons';

/**
 * Plan Your Day Section: Wide split band with authentic product output preview timeline.
 *
 * @component
 */
export function PlanPreviewSection() {
  return (
    <section className="py-20 sm:py-28 relative">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* LEFT: Copy explaining crowd-aware & metro-based sequencing */}
          <div className="lg:col-span-5 space-y-6">
            <div className="type-overline text-brand">Algorithmic Sequencing</div>
            <h2 className="type-h2 text-text-high">
              Routes Planned Around Crowd Peaks, Not Just Distance
            </h2>
            <p className="type-body text-text-mid leading-relaxed">
              Standard mapping tools send everyone to Chandni Chowk at noon and the Red Fort at 2 PM.
              FINDIA calculates ticket queue curves and Delhi Metro interchange walk times to sequence your stops when visitor density drops.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <Button
                variant="primary"
                size="md"
                to="/itinerary"
                iconRight={<ArrowRight size={15} />}
              >
                Plan Itinerary
              </Button>
              <div className="text-xs text-text-low font-mono">
                No login required
              </div>
            </div>
          </div>

          {/* RIGHT: Stylized Preview of Generated Product Output (Timeline) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-bg-raised border border-border-default shadow-lifted space-y-6">
              {/* Header Bar of Itinerary Card */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-4">
                <div className="space-y-0.5">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-brand font-semibold">
                    {itineraryPreviewData.dateLabel}
                  </div>
                  <h3 className="font-display font-semibold text-text-high text-base sm:text-lg">
                    {itineraryPreviewData.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded-pill bg-bg-base border border-border-default text-xs font-mono text-text-high">
                  <Ticket size={12} className="text-brand" />
                  <span>{itineraryPreviewData.totalBudget}</span>
                </div>
              </div>

              {/* Vertical Timeline of 4 Stops */}
              <div className="relative pl-6 sm:pl-8 space-y-6 border-l-2 border-border-default ml-2">
                {itineraryPreviewData.stops.map((stop, index) => (
                  <div key={index} className="relative space-y-2">
                    {/* Timeline Node Dot */}
                    <span
                      aria-hidden="true"
                      className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-bg-base border-2 border-brand"
                    />

                    {/* Transit Connector Between Stops */}
                    {stop.transitText && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-bg-overlay border border-border-subtle text-[11px] font-mono text-text-low mb-1">
                        <Metro size={11} className="text-brand" />
                        <span>{stop.transitText}</span>
                      </div>
                    )}

                    {/* Stop Card */}
                    <div className="p-3.5 rounded-xl bg-bg-base border border-border-default space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-brand">
                            {stop.time}
                          </span>
                          <span className="text-xs text-text-low">•</span>
                          <h4 className="font-display font-semibold text-text-high text-xs sm:text-sm">
                            {stop.placeName}
                          </h4>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-text-low px-1.5 py-0.5 rounded bg-bg-overlay">
                            {stop.fee}
                          </span>
                          <CrowdBadge level={stop.crowdLevel} size="sm" />
                        </div>
                      </div>

                      <p className="text-[11px] text-text-mid font-sans leading-relaxed">
                        {stop.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default PlanPreviewSection;
