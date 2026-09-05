import React from 'react';
import { resolveNearbyPlaces } from '../../../data/delhi';
import { PlaceCard } from './PlaceCard';
import { Sparkle } from '../../../components/icons';

/**
 * Nearby Places Component (Section 6, Step 5).
 * Dynamically resolves place.nearbyPlaces array into canonical place cards.
 * Adheres strictly to the whole-card-clickable rule via PlaceCard.
 *
 * @param {Object} props
 * @param {Object} props.place - Canonical place record
 */
export function NearbyPlaces({ place }) {
  if (!place || !place.nearbyPlaces || place.nearbyPlaces.length === 0) {
    return null;
  }

  const nearbyList = resolveNearbyPlaces(place.nearbyPlaces);

  if (nearbyList.length === 0) return null;

  return (
    <section className="space-y-4 pt-4 border-t border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
          <Sparkle size={14} />
          <span>Nearby Heritage & Monuments</span>
        </div>
        <span className="text-xs font-mono text-text-low">Same Cluster Walk</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {nearbyList.map((nearby) => (
          <PlaceCard key={nearby.id || nearby.slug} place={nearby} />
        ))}
      </div>
    </section>
  );
}

export default NearbyPlaces;
