import React, { useState, useEffect } from 'react';
import { Sparkle, Route, Compass, Shield } from '../components/icons';
import { TripPlannerWizard } from '../features/findia-ai/TripPlannerWizard';
import { ItineraryResultView } from '../features/findia-ai/ItineraryResultView';
import { generateAITripPlan } from '../features/findia-ai/aiPlannerService';
import { usePageMeta } from '../hooks/usePageMeta';

const LOADING_MESSAGES = [
  'Analyzing real-time monument crowd congestion patterns...',
  'Sequencing attractions around low-traffic Delhi Metro routes...',
  'Handpicking iconic local eateries matching your diet...',
  'Scheduling golden hour photography windows...',
  'Finalizing day-by-day timestamps and crowd advisories...',
];

export function FindiaAIPage() {
  usePageMeta(
    'FINDIA AI — Smart Crowd-Aware Travel & Itinerary Planner',
    'Generate customized multi-day itineraries across India sequenced around low crowd density, Delhi Metro transit, and authentic food.'
  );

  const [currentPlan, setCurrentPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userPreferences, setUserPreferences] = useState(null);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);

  // Cycle loading messages during generation
  useEffect(() => {
    let interval;
    if (isGenerating) {
      interval = setInterval(() => {
        setLoadingStepIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 1800);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  // Load saved plan from sessionStorage on initial load if present
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('findia_last_plan');
      const savedPrefs = sessionStorage.getItem('findia_last_prefs');
      if (saved) setCurrentPlan(JSON.parse(saved));
      if (savedPrefs) setUserPreferences(JSON.parse(savedPrefs));
    } catch {
      // Ignore storage read errors
    }
  }, []);

  const handleGenerate = async (preferences) => {
    setIsGenerating(true);
    setUserPreferences(preferences);

    try {
      const plan = await generateAITripPlan(preferences);
      setCurrentPlan(plan);
      try {
        sessionStorage.setItem('findia_last_plan', JSON.stringify(plan));
        sessionStorage.setItem('findia_last_prefs', JSON.stringify(preferences));
      } catch {
        // storage quota fallback
      }
      // Scroll smoothly to top of results
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } catch (err) {
      console.error('[FindiaAIPage] Error generating plan:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefine = async (refinePrompt) => {
    if (!userPreferences) return;
    const updatedPreferences = {
      ...userPreferences,
      specialRequest: `${userPreferences.specialRequest ? userPreferences.specialRequest + '. ' : ''}${refinePrompt}`,
    };
    await handleGenerate(updatedPreferences);
  };

  const handleReset = () => {
    setCurrentPlan(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-high py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-amber-500/10 via-orange-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        {/* Page Top Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider border border-amber-500/30 shadow-sm shadow-amber-500/10">
            <Route size={14} className="text-amber-400" />
            <span>Crowd-Aware Urban Travel Intelligence</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-text-high">
            FINDIA AI Trip Planner
          </h1>

          <p className="text-sm sm:text-base text-text-mid leading-relaxed">
            Bataiye aap kiske sath aur kaise ghumna chahte hain — Findia AI aapke liye perfect
            custom day-by-day plan banayega with live crowd avoidance, Delhi Metro routes, aur authentic food recommendations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-mono text-text-low">
            <span className="flex items-center gap-1.5">
              <Shield size={14} className="text-emerald-400" />
              <span>Real-Time Crowd Telemetry</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Compass size={14} className="text-cyan-400" />
              <span>Metro Line Precision</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Sparkle size={14} className="text-amber-400" />
              <span>Powered by Groq Compound (Ultra-Fast AI)</span>
            </span>
          </div>
        </div>

        {/* LOADING STATE */}
        {isGenerating && (
          <div className="max-w-xl mx-auto glass-heavy p-8 sm:p-12 rounded-3xl border border-amber-500/30 text-center space-y-6 shadow-2xl shadow-amber-500/10 animate-fadeIn">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-amber-500/20 animate-ping" />
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-bg-base flex items-center justify-center shadow-lg shadow-amber-500/40">
                <Sparkle size={38} className="animate-spin text-bg-base" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-xl font-bold text-text-high">
                Designing Your Tailored Itinerary
              </h3>
              <p className="text-xs sm:text-sm text-amber-300 font-mono transition-all duration-300">
                {LOADING_MESSAGES[loadingStepIndex]}
              </p>
            </div>

            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-full w-full animate-pulse" />
            </div>
          </div>
        )}

        {/* DISPLAY WIZARD OR GENERATED PLAN */}
        {!isGenerating && !currentPlan && (
          <TripPlannerWizard onGenerate={handleGenerate} isGenerating={isGenerating} />
        )}

        {!isGenerating && currentPlan && (
          <ItineraryResultView
            plan={currentPlan}
            userPreferences={userPreferences}
            onReset={handleReset}
            onRefine={handleRefine}
            isRefining={isGenerating}
          />
        )}
      </div>
    </div>
  );
}

export default FindiaAIPage;
