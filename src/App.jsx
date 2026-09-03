import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { RouteLoadingFallback } from './components/layout/RouteLoadingFallback';

// Lazy-loaded page components
const LandingPage = lazy(() => import('./pages/LandingPage'));
const PlacesPage = lazy(() => import('./pages/PlacesPage'));
const PlaceDetailPage = lazy(() => import('./pages/PlaceDetailPage'));
const HiddenGemsPage = lazy(() => import('./pages/HiddenGemsPage'));
const ItineraryPlannerPage = lazy(() => import('./pages/ItineraryPlannerPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const ThreadDetailPage = lazy(() => import('./pages/ThreadDetailPage'));
const TravelTogetherPage = lazy(() => import('./pages/TravelTogetherPage'));
const SafetyPage = lazy(() => import('./pages/SafetyPage'));
const DistrictPage = lazy(() => import('./pages/DistrictPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const DevSandboxPage = lazy(() => import('./pages/DevSandboxPage'));

/**
 * Root Application Router with Lazy Loading, Suspense Skeletons,
 * and Error Boundary protection.
 */
export default function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <AppShell transparentNavbarAtTop={isLandingPage}>
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            {/* Primary Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/places" element={<PlacesPage />} />
            <Route path="/places/:slug" element={<PlaceDetailPage />} />
            <Route path="/hidden-gems" element={<HiddenGemsPage />} />
            <Route path="/plan" element={<ItineraryPlannerPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/community/:threadId" element={<ThreadDetailPage />} />
            <Route path="/travel-together" element={<TravelTogetherPage />} />
            <Route path="/sos" element={<SafetyPage />} />
            <Route path="/districts/:slug" element={<DistrictPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Backwards-compatibility aliases */}
            <Route path="/itinerary" element={<Navigate to="/plan" replace />} />
            <Route path="/safety-sos" element={<Navigate to="/sos" replace />} />

            {/* Dev-only audit routes (gated behind import.meta.env.DEV) */}
            {import.meta.env.DEV && (
              <>
                <Route path="/sandbox" element={<DevSandboxPage />} />
                <Route path="/tokens" element={<DevSandboxPage />} />
              </>
            )}

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AppShell>
    </ErrorBoundary>
  );
}
