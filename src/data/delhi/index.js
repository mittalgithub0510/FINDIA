/**
 * Central Data Hub for Delhi Destinations.
 * Exports canonical places list, hero carousel items, categories, and lookup helpers.
 */

import { redFort } from './places/red-fort';
import { qutubMinar } from './places/qutub-minar';
import { humayunsTomb } from './places/humayuns-tomb';
import { indiaGate } from './places/india-gate';
import { lotusTemple } from './places/lotus-temple';
import { phase2Places } from './places/places-scaffold';
import { delhiAudioGuides, getAudioGuide } from './audioGuides';

/**
 * Phase 1 core places powering the hero carousel and primary experience.
 */
export const heroCarouselPlaces = [
  redFort,
  qutubMinar,
  humayunsTomb,
  indiaGate,
  lotusTemple,
];

/**
 * Complete list of Delhi destination places (Phase 1 + Phase 2).
 */
export const delhiPlaces = [
  ...heroCarouselPlaces,
  ...phase2Places,
];

/**
 * Category taxonomy for Delhi destination filtering.
 */
export const delhiCategories = [
  { id: 'all', label: 'All Destinations' },
  { id: 'Heritage', label: 'Heritage' },
  { id: 'Historical', label: 'Historical' },
  { id: 'Architecture', label: 'Architecture' },
  { id: 'Religious', label: 'Religious' },
  { id: 'Museum', label: 'Museum' },
  { id: 'Garden', label: 'Garden' },
  { id: 'Market', label: 'Market' },
  { id: 'Food', label: 'Food' },
];

/**
 * Retrieve a place by its slug or id.
 *
 * @param {string} slug
 * @returns {Object|null}
 */
export function getDelhiPlaceBySlug(slug) {
  if (!slug) return null;
  const normalized = String(slug).toLowerCase().trim();
  return (
    delhiPlaces.find(
      (p) => p.slug.toLowerCase() === normalized || p.id.toLowerCase() === normalized
    ) || null
  );
}

/**
 * Resolve an array of place IDs to their place objects.
 *
 * @param {string[]} placeIds
 * @returns {Object[]}
 */
export function resolveNearbyPlaces(placeIds = []) {
  if (!Array.isArray(placeIds)) return [];
  return placeIds
    .map((id) => getDelhiPlaceBySlug(id))
    .filter(Boolean);
}

export {
  delhiAudioGuides,
  getAudioGuide,
};

export default {
  delhiPlaces,
  heroCarouselPlaces,
  delhiCategories,
  getDelhiPlaceBySlug,
  resolveNearbyPlaces,
  delhiAudioGuides,
  getAudioGuide,
};
