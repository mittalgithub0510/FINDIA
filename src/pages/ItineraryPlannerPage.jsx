import React, { useState } from 'react';
import { useCity } from '../config/CityContext';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/layout/Container';
import { ComingSoonNote } from '../components/layout/ComingSoonNote';
import { CrowdBadge } from '../components/common/CrowdBadge';
import { Button } from '../components/common/Button';
import { plannerPresets, sampleGeneratedDayPlan } from '../data/delhi/itinerary';
import { Sparkle, Metro, Ticket, Clock, Check } from '../components/icons';
import { usePageMeta } from '../hooks/usePageMeta';
import { cn } from '../utils/cn';

/**
 * Crowd-Aware Itinerary Planner Page.
 * Feature Owner: src/features/itinerary-planner/
 *
 * @page
 */
export function ItineraryPlannerPage() {
  const { city } = useCity();
  usePageMeta(
    `Crowd-Aware Itinerary Planner — ${city.name}`,
    `Generate multi-day schedules in ${city.name} sequenced around Delhi Metro lines and real-time visitor density.`
  );

  // Local state for interactive controls (non-functional mock form)
  const [selectedDays, setSelectedDays] = useState(1);
  const [selectedPace, setSelectedPace] = useState('balanced');
  const [selectedCrowdPref, setSelectedCrowdPref] = useState('quiet');
  const [selectedInterests, setSelectedInterests] = useState(['stepwells', 'sultanate']);

  const toggleInterest = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full pb-24 select-none">
      <PageHeader
        overline={`Intelligent Scheduling • ${city.name}`}
        title="Crowd-Optimized Day Planner"
        description={`Calculates walking transit times between Delhi Metro interchange stations and sequences your visits when monument crowds drop.`}
      />

      <Container size="wide" className="pt-8 space-y-12">
        <ComingSoonNote
          featureName="LLM Route Generation & Live Metro Scheduling"
          owner="itinerary-planner"
          description="The input controls below operate in mock local state. Teammate will connect this form to an edge function LLM route generator in src/features/itinerary-planner/."
        />

        {/* STEP ONE: Input Parameter Form Shell */}
        <section className="p-6 sm:p-8 rounded-2xl bg-bg-raised border border-border-default space-y-8">
          <div className="border-b border-border-subtle pb-4">
            <div className="type-overline text-brand">Step 1 of 2</div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-text-high">
              Define Schedule Constraints
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Number of Days */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-mono tracking-wider text-text-high font-semibold block">
                Duration in {city.name}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSelectedDays(num)}
                    className={cn(
                      'py-2.5 px-4 rounded-xl text-xs font-mono font-semibold border transition-all cursor-pointer outline-none',
                      selectedDays === num
                        ? 'bg-brand text-text-inverse border-brand'
                        : 'bg-bg-base text-text-mid border-border-default hover:border-brand/40'
                    )}
                  >
                    {num} {num === 1 ? 'Day' : 'Days'}
                  </button>
                ))}
              </div>
            </div>

            {/* Crowd Preference Toggle */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-mono tracking-wider text-text-high font-semibold block">
                Crowd Priority Level
              </label>
              <div className="grid grid-cols-1 gap-2">
                {plannerPresets.crowdPreferences.map((pref) => (
                  <button
                    key={pref.id}
                    type="button"
                    onClick={() => setSelectedCrowdPref(pref.id)}
                    className={cn(
                      'p-3 rounded-xl text-left border transition-all cursor-pointer outline-none flex items-center justify-between',
                      selectedCrowdPref === pref.id
                        ? 'bg-bg-overlay border-brand text-text-high'
                        : 'bg-bg-base border-border-default text-text-mid hover:border-brand/40'
                    )}
                  >
                    <div>
                      <div className="text-xs font-semibold">{pref.label}</div>
                      <div className="text-[11px] text-text-low font-sans">{pref.desc}</div>
                    </div>
                    {selectedCrowdPref === pref.id && (
                      <Check size={16} className="text-brand shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Pace */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-mono tracking-wider text-text-high font-semibold block">
                Daily Pace
              </label>
              <div className="space-y-2">
                {plannerPresets.paceOptions.map((pace) => (
                  <button
                    key={pace.id}
                    type="button"
                    onClick={() => setSelectedPace(pace.id)}
                    className={cn(
                      'w-full p-2.5 rounded-xl text-left border transition-all cursor-pointer outline-none flex items-center justify-between',
                      selectedPace === pace.id
                        ? 'bg-bg-overlay border-brand text-text-high'
                        : 'bg-bg-base border-border-default text-text-mid hover:border-brand/40'
                    )}
                  >
                    <span className="text-xs font-semibold">{pace.label}</span>
                    <span className="text-[11px] text-text-low">{pace.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interests Multi-Select */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-mono tracking-wider text-text-high font-semibold block">
                Architectural Interests
              </label>
              <div className="flex flex-wrap gap-2">
                {plannerPresets.interests.map((interest) => {
                  const isSelected = selectedInterests.includes(interest.id);
                  return (
                    <button
                      key={interest.id}
                      type="button"
                      onClick={() => toggleInterest(interest.id)}
                      className={cn(
                        'px-3 py-1.5 rounded-pill text-xs font-medium border transition-all cursor-pointer outline-none',
                        isSelected
                          ? 'bg-brand text-text-inverse border-brand font-semibold'
                          : 'bg-bg-base text-text-mid border-border-default hover:border-brand/40'
                      )}
                    >
                      {interest.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form Action Bar with Teammate TODO */}
          {/* TODO: Connect button click to POST /api/generate-itinerary edge function */}
          <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-text-low font-mono">
              Local mock state active. Pressing generate displays the sample itinerary preview below.
            </div>
            <Button
              variant="primary"
              size="md"
              icon={<Sparkle size={16} />}
              onClick={() => {
                const previewEl = document.getElementById('itinerary-sample-output');
                previewEl?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Generate Optimized Itinerary
            </Button>
          </div>
        </section>

        {/* STEP TWO: Static Example Output Preview */}
        <section id="itinerary-sample-output" className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-3">
            <div>
              <div className="type-overline text-brand">Step 2 of 2 • Static Generated Sample</div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-text-high">
                {sampleGeneratedDayPlan.theme}
              </h2>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-text-low">
              <span>{sampleGeneratedDayPlan.estimatedTransitTime}</span>
              <span>•</span>
              <span className="text-text-high font-bold">{sampleGeneratedDayPlan.totalTicketCost}</span>
            </div>
          </div>

          {/* Vertical Day Timeline */}
          <div className="p-6 sm:p-8 rounded-2xl bg-bg-raised border border-border-default shadow-card space-y-6">
            <div className="relative pl-6 sm:pl-8 space-y-8 border-l-2 border-border-default ml-2">
              {sampleGeneratedDayPlan.stops.map((stop, idx) => (
                <div key={idx} className="relative space-y-2">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-bg-base border-2 border-brand"
                  />

                  {stop.transit && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-bg-overlay border border-border-subtle text-[11px] font-mono text-text-low mb-2">
                      <Metro size={12} className="text-brand" />
                      <span>{stop.transit}</span>
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-bg-base border border-border-default space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-brand">
                          {stop.time}
                        </span>
                        <span className="text-xs text-text-low">•</span>
                        <h3 className="font-display font-semibold text-sm sm:text-base text-text-high">
                          {stop.placeName}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-text-low px-2 py-0.5 rounded bg-bg-overlay">
                          {stop.ticketFee}
                        </span>
                        <CrowdBadge level={stop.crowdLevel} size="sm" />
                      </div>
                    </div>

                    <p className="text-xs text-text-mid font-sans leading-relaxed">
                      {stop.note}
                    </p>

                    <div className="flex items-center gap-1.5 text-[11px] text-text-low font-mono pt-1">
                      <Metro size={11} className="text-brand shrink-0" />
                      <span>{stop.metro}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default ItineraryPlannerPage;
