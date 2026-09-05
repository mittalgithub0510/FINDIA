/**
 * Central Data Hub for Prayagraj Destinations.
 * Exports canonical places list, hero carousel items, categories, and lookup helpers.
 */

import { triveniSangam } from './places/triveni-sangam';
import { allahabadFort } from './places/allahabad-fort';
import { anandBhavan } from './places/anand-bhavan';
import { khusroBagh } from './places/khusro-bagh';
import { allSaintsCathedral } from './places/all-saints-cathedral';
import { badeHanumanJi } from './places/bade-hanuman-ji';
import { phase2Places } from './places/places-scaffold';
import { prayagrajAudioGuides, getPrayagrajAudioGuide } from './audioGuides';

/**
 * Phase 1 core places powering the hero carousel and primary experience.
 */
export const heroCarouselPlaces = [
  triveniSangam,
  allahabadFort,
  anandBhavan,
  khusroBagh,
  allSaintsCathedral,
  badeHanumanJi,
];

/**
 * Complete list of Prayagraj destination places.
 */
export const prayagrajPlaces = [
  ...heroCarouselPlaces,
  ...phase2Places,
];

/**
 * Category taxonomy for Prayagraj destination filtering.
 */
export const prayagrajCategories = [
  { id: 'all', label: 'All Destinations' },
  { id: 'Heritage', label: 'Heritage' },
  { id: 'Religious', label: 'Religious' },
  { id: 'Historical', label: 'Historical' },
  { id: 'Architecture', label: 'Architecture' },
  { id: 'Garden', label: 'Garden' },
  { id: 'Adventure', label: 'Ghats & Riverfront' },
  { id: 'Market', label: 'Market & Bazaars' },
  { id: 'Food', label: 'Food' },
];

/**
 * Retrieve a place by its slug or id.
 * @param {string} slug
 * @returns {Object|null}
 */
export function getPrayagrajPlaceBySlug(slug) {
  if (!slug) return null;
  const normalized = String(slug).toLowerCase().trim();
  return (
    prayagrajPlaces.find(
      (p) => p.slug.toLowerCase() === normalized || p.id.toLowerCase() === normalized
    ) || null
  );
}

/**
 * Resolve an array of place IDs to their place objects.
 * @param {string[]} placeIds
 * @returns {Object[]}
 */
export function resolveNearbyPlaces(placeIds = []) {
  if (!Array.isArray(placeIds)) return [];
  return placeIds
    .map((id) => getPrayagrajPlaceBySlug(id))
    .filter(Boolean);
}

export {
  prayagrajAudioGuides,
  getPrayagrajAudioGuide as getAudioGuide,
};

export default {
  prayagrajPlaces,
  heroCarouselPlaces,
  prayagrajCategories,
  getPrayagrajPlaceBySlug,
  resolveNearbyPlaces,
  prayagrajAudioGuides,
  getAudioGuide: getPrayagrajAudioGuide,
};
