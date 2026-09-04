import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getDelhiPlaceBySlug } from '../../data/delhi';
import { getPlaceTheme } from './utils/placeTheme';
import { PlaceDetails } from './components/PlaceDetails';
import { EmptyState } from '../../components/common/EmptyState';
import { Button } from '../../components/common/Button';
import { Compass, ArrowRight } from '../../components/icons';
import { usePageMeta } from '../../hooks/usePageMeta';

/**
 * PlaceDetailView Page Component.
 * Routes:
 * - /destinations/delhi/:placeSlug
 * - /destination/north/delhi/:placeSlug
 * - /places/:slug
 */
export function PlaceDetailView() {
  const { placeSlug, slug } = useParams();
  const activeSlug = placeSlug || slug;

  const place = getDelhiPlaceBySlug(activeSlug);

  // Set page meta
  usePageMeta(
    place ? `${place.name} - Delhi Destination Guide` : 'Place Not Found - Delhi',
    place
      ? place.description?.short || `Explore ${place.name} in Delhi with FINDIA.`
      : 'The requested place could not be found in the Delhi destination directory.'
  );

  // Derive per-place dynamic accent colors (Section 6a)
  const theme = useMemo(() => getPlaceTheme(place), [place]);

  // Graceful 404 Empty State
  if (!place) {
    return (
      <div className="min-h-[70vh] bg-bg-base text-text-high flex items-center justify-center p-6">
        <EmptyState
          icon={<Compass size={36} className="text-amber-500" />}
          title="Place Not Found in Delhi Directory"
          description={`The record "${activeSlug}" does not match any audited site in the Delhi directory.`}
          action={
            <Button
              variant="primary"
              size="md"
              to="/destinations/delhi"
              icon={<ArrowRight size={14} />}
            >
              Back to Delhi Destination Hub
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-bg-base text-text-high transition-colors duration-slow"
      style={{
        '--accent-300': theme.accent300,
        '--accent-500': theme.accent500,
        '--accent-700': theme.accent700,
        '--accent-soft': theme.accentSoft,
        '--color-brand': theme.accent500,
        '--place-accent': theme.accent500,
        '--place-accent-tint': theme.accentSoft,
        '--place-accent-contrast': theme.contrastText,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 relative">
        {/* Subtle atmospheric ambient glow matching place hero color */}
        <div
          className="absolute top-4 right-1/4 w-[450px] h-[450px] rounded-full blur-[160px] pointer-events-none opacity-15 transition-colors duration-slow"
          style={{ backgroundColor: theme.accent500 }}
          aria-hidden="true"
        />

        {/* Master Place Details Orchestrator */}
        <PlaceDetails place={place} theme={theme} />
      </div>
    </div>
  );
}

export default PlaceDetailView;
