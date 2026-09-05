import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { RouteLoadingFallback } from './components/layout/RouteLoadingFallback';

// Lazy-loaded page components
const LandingPage = lazy(() => import('./pages/LandingPage'));
const DelhiPage = lazy(() => import('./features/destination-delhi/DelhiPage'));
const PlaceDetailView = lazy(() => import('./features/destination-delhi/PlaceDetailView'));
const PrayagrajPage = lazy(() => import('./features/destination-prayagraj/PrayagrajPage'));
const PrayagrajPlaceDetailView = lazy(() => import('./features/destination-prayagraj/PlaceDetailView'));
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage'));
const HotelsPage = lazy(() => import('./pages/HotelsPage'));
const TransportPage = lazy(() => import('./pages/TransportPage'));
const GuidesPage = lazy(() => import('./pages/GuidesPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const ThreadDetailPage = lazy(() => import('./pages/ThreadDetailPage'));
const FindiaAIPage = lazy(() => import('./pages/FindiaAIPage'));
const SOSPage = lazy(() => import('./pages/SOSPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const HiddenGemsPage = lazy(() => import('./pages/HiddenGemsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

/**
 * Root Application Router with Lazy Loading, Suspense Skeletons,
 * and Error Boundary protection.
 */
export default function App() {
  const location = useLocation();
  // Pages with full-bleed hero banners that extend seamlessly behind the floating glass navbar
  const cleanPath = location.pathname.replace(/\/$/, '') || '/';
  const hasHeroAtTop =
    cleanPath === '/' ||
    cleanPath === '/destination/north/delhi' ||
    cleanPath === '/destinations/delhi' ||
    cleanPath === '/destination/north/prayagraj' ||
    cleanPath === '/destinations/prayagraj';

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <AppShell transparentNavbarAtTop={hasHeroAtTop}>
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            {/* Primary Navigation Routes */}
            <Route path="/" element={<LandingPage />} />

            {/* Destination Routes */}
            <Route path="/destination/north/delhi" element={<DelhiPage />} />
            <Route path="/destinations/delhi" element={<DelhiPage />} />
            <Route path="/destinations/delhi/:placeSlug" element={<PlaceDetailView />} />
            <Route path="/destination/north/delhi/:placeSlug" element={<PlaceDetailView />} />

            {/* Prayagraj (Uttar Pradesh) Destination Routes */}
            <Route path="/destination/north/prayagraj" element={<PrayagrajPage />} />
            <Route path="/destinations/prayagraj" element={<PrayagrajPage />} />
            <Route path="/destinations/prayagraj/:placeSlug" element={<PrayagrajPlaceDetailView />} />
            <Route path="/destination/north/prayagraj/:placeSlug" element={<PrayagrajPlaceDetailView />} />
            <Route path="/destination/north/uttar-pradesh" element={<Navigate to="/destination/north/prayagraj" replace />} />
            <Route path="/destinations/uttar-pradesh" element={<Navigate to="/destinations/prayagraj" replace />} />

            <Route path="/destination/coming-soon" element={<ComingSoonPage />} />

            {/* Other Navbar Routes */}
            <Route path="/hotels" element={<HotelsPage />} />
            <Route path="/transport" element={<TransportPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/community/:threadId" element={<ThreadDetailPage />} />
            <Route path="/findia-ai" element={<FindiaAIPage />} />
            <Route path="/sos" element={<SOSPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Auxiliary Routes */}
            <Route path="/places" element={<Navigate to="/destination/north/delhi" replace />} />
            <Route path="/places/:slug" element={<PlaceDetailView />} />
            <Route path="/hidden-gems" element={<HiddenGemsPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Backwards-compatibility Aliases */}
            <Route path="/plan" element={<Navigate to="/findia-ai" replace />} />
            <Route path="/itinerary" element={<Navigate to="/findia-ai" replace />} />
            <Route path="/safety-sos" element={<Navigate to="/sos" replace />} />

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AppShell>
    </ErrorBoundary>
  );
}
