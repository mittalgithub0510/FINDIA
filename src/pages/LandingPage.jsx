import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import {
  HeroSection,
  IndiaDiversitySection,
  ExploreIndiaSection,
  DemandRedistributionSection,
  HowFindiaThinksSection,
  HiddenGemsSection,
  CommunityPreviewSection,
  FindiaAiShowcaseSection,
  EcosystemSection,
  GovernmentIntelligenceSection,
  EmotionalIndiaSection,
  FinalCtaSection,
} from '../components/landing';

/**
 * FINDIA Homepage Component (V2 Specification — SIH 2026 PS 26204)
 * 
 * Continuous Narrative Flow:
 * 1. SECTION 1 — HERO (Brand, Tagline, AI Intelligence, Destination Search, Delhi Live MVP)
 * 2. SECTION 2 — INDIA DIVERSITY (Scale & Diversity visual categories)
 * 3. SECTION 3 — EXPLORE INDIA (Interactive Region Selector driven by DESTINATIONS_CONFIG)
 * 4. SECTION 4 — CORE USP (Tourism Demand Redistribution & Contextual Decision Scenario)
 * 5. SECTION 5 — HOW FINDIA THINKS (Decision Engine Pipeline & 9 processed signals)
 * 6. SECTION 6 — INDIA BEYOND THE FAMOUS (Hidden Gems & local discovery)
 * 7. SECTION 7 — COMMUNITY PREVIEW (Ground reports & verification)
 * 8. SECTION 8 — FINDIA AI (Context-aware Tourism Decision Engine showcase)
 * 9. SECTION 9 — TOURISM ECOSYSTEM (Transport, Audio, SOS, Community, Stays, Telemetry)
 * 10. SECTION 10 — GOVERNMENT INTELLIGENCE PREVIEW (Aggregated signals with Demo Intelligence badge)
 * 11. SECTION 11 — EMOTIONAL INDIA (Cinematic brand story)
 * 12. SECTION 12 — FINAL CTA (Your Journey Starts Here)
 */
export function LandingPage() {
  return (
    <PageWrapper hasHero className="pt-0">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. INDIA DIVERSITY */}
      <IndiaDiversitySection />

      {/* 3. EXPLORE INDIA BY REGION */}
      <ExploreIndiaSection />

      {/* 4. CORE USP — TOURISM DEMAND REDISTRIBUTION */}
      <DemandRedistributionSection />

      {/* 5. HOW FINDIA THINKS */}
      <HowFindiaThinksSection />

      {/* 6. INDIA BEYOND THE FAMOUS */}
      <HiddenGemsSection />

      {/* 7. COMMUNITY PREVIEW */}
      <CommunityPreviewSection />

      {/* 8. FINDIA AI DECISION ENGINE SHOWCASE */}
      <FindiaAiShowcaseSection />

      {/* 9. TOURISM ECOSYSTEM */}
      <EcosystemSection />

      {/* 10. GOVERNMENT INTELLIGENCE PREVIEW */}
      <GovernmentIntelligenceSection />

      {/* 11. EMOTIONAL INDIA */}
      <EmotionalIndiaSection />

      {/* 12. FINAL CTA */}
      <FinalCtaSection />
    </PageWrapper>
  );
}

export default LandingPage;
