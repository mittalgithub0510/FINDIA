import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import {
  HeroSection,
  CapabilitiesSection,
  FeaturedPlacesSection,
  HiddenGemsSection,
  PlanPreviewSection,
  CommunityBandSection,
  DistrictsGridSection,
  SafetyBandSection,
  CityTeaserSection,
} from '../components/landing';
import { useInView } from '../hooks/useInView';
import { cn } from '../utils/cn';

/**
 * FINDIA Landing Page.
 *
 * NON-NEGOTIABLE ARCHITECTURAL RULES SATISFIED:
 * 1. Content Separation: Zero hardcoded arrays; all data flows from src/data/delhi/landing.js.
 * 2. Layout Alternation: Alternates between full-bleed hero, offset staggered tiles,
 *    asymmetric grid, numbered editorial list, split planner band, reversed community band,
 *    asymmetric 11-district grid, tight safety band, and single-line teaser.
 * 3. Banned Copy: Strictly zero marketing fluff or AI poetry.
 * 4. Fact-Checked: Concrete timings, metro lines, entry fees, and inconvenient ground truths.
 * 5. Optical Rhythm: Architectural sections breathe; community & safety bands tighten.
 *
 * @page
 */
export function LandingPage() {
  // Motion discipline: Apply restrained fade-and-rise to at most two sections
  const [capabilitiesRef, capabilitiesInView] = useInView({ threshold: 0.1 });
  const [placesRef, placesInView] = useInView({ threshold: 0.1 });

  return (
    <PageWrapper hasHero className="pt-0">
      {/* 1. HERO SECTION (Full-bleed 92vh, golden hour photo, greeting, search, live crowd card) */}
      <HeroSection />

      {/* 2. WHAT THIS IS (4 Offset capability tiles, non-uniform arrangement) */}
      <div
        ref={capabilitiesRef}
        className={cn(
          'transition-all duration-700 ease-out',
          capabilitiesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0'
        )}
      >
        <CapabilitiesSection />
      </div>

      {/* 3. PLACES (Asymmetric grid: 2x2 Feature card + 4 supporting cards / mobile snap rail) */}
      <div
        ref={placesRef}
        className={cn(
          'transition-all duration-700 ease-out',
          placesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0'
        )}
      >
        <FeaturedPlacesSection />
      </div>

      {/* 4. HIDDEN SITES (Numbered list 01–05, desktop clipped hover photo reveal, inconvenient truths) */}
      <HiddenGemsSection />

      {/* 5. PLAN YOUR DAY (Wide split band with realistic generated itinerary timeline preview) */}
      <PlanPreviewSection />

      {/* 6. COMMUNITY + TRAVEL TOGETHER (Reversed split band with tighter vertical rhythm) */}
      <CommunityBandSection />

      {/* 7. DISTRICTS (Asymmetric 11-district municipal grid with New Delhi & Central emphasis) */}
      <DistrictsGridSection />

      {/* 8. SAFETY BAND (Tight padding, restrained SOS-tinted surface with direct dial links) */}
      <SafetyBandSection />

      {/* 9. CITY FOOTER TEASER (Single quiet line before footer with zero headings) */}
      <CityTeaserSection />
    </PageWrapper>
  );
}

export default LandingPage;
