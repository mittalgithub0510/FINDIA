/**
 * ==============================================================================
 * FINDIA AI — Itinerary Enrichment Utilities
 * Pulls real hotel + transport data from Findia's own verified datasets
 * and injects them into the AI-generated itinerary result.
 * ==============================================================================
 */

import { DELHI_HOTELS_DATA } from '../../data/delhi/hotels.js';
import { PRAYAGRAJ_HOTELS_DATA } from '../../data/prayagraj/hotels.js';

/**
 * Maps user budget preference → hotel category string in DELHI_HOTELS_DATA & PRAYAGRAJ_HOTELS_DATA
 */
const BUDGET_TO_CATEGORY = {
  budget: 'budget',
  moderate: 'moderate',
  luxury: 'premium',
};

/**
 * Returns the top 3 hotels from the active city dataset that best match the
 * user's budget and group type preferences.
 *
 * @param {Object} preferences  User wizard selections
 * @param {string} preferences.destination Destination name ('Delhi' | 'Prayagraj')
 * @param {string} preferences.budget   'budget' | 'moderate' | 'luxury'
 * @param {string} preferences.groupType 'solo' | 'couple' | 'family' | 'friends'
 * @param {number} [limit=3]  Max hotels to return
 * @returns {Array} Matched hotel objects
 */
export function getRecommendedHotels(preferences, limit = 3) {
  const targetCategory = BUDGET_TO_CATEGORY[preferences?.budget] || 'moderate';
  const groupType = preferences?.groupType || 'friends';
  const isPrayagraj =
    preferences?.destination?.toLowerCase().includes('prayagraj') ||
    preferences?.destination?.toLowerCase().includes('allahabad');

  const sourceData = isPrayagraj ? PRAYAGRAJ_HOTELS_DATA : DELHI_HOTELS_DATA;
  let pool = sourceData.filter((h) => h.category === targetCategory);
  if (pool.length === 0) pool = sourceData;

  // Apply group-type soft filters
  if (groupType === 'family') {
    const familyFiltered = pool.filter((h) => h.familyFriendly === true);
    if (familyFiltered.length >= limit) pool = familyFiltered;
  } else if (groupType === 'couple') {
    const coupleFiltered = pool.filter((h) => h.coupleFriendly === true);
    if (coupleFiltered.length >= limit) pool = coupleFiltered;
  }

  // Sort by valueScore DESC then rating DESC
  pool.sort((a, b) => {
    const scoreDiff = (b.valueScore || 0) - (a.valueScore || 0);
    if (scoreDiff !== 0) return scoreDiff;
    return (b.rating || 0) - (a.rating || 0);
  });

  return pool.slice(0, limit);
}

/**
 * Derives a structured transit guide from the plan's transitHighlight + day data.
 * Returns an array of tip objects ready for display.
 *
 * @param {Object} plan  Generated plan object
 * @returns {Array<{label: string, detail: string}>}
 */
export function getTransitGuide(plan) {
  const isPrayagraj =
    plan?.destination?.toLowerCase().includes('prayagraj') ||
    plan?.destination?.toLowerCase().includes('allahabad');

  if (isPrayagraj) {
    return [
      {
        label: 'Primary Commute',
        detail: plan.transitHighlight || 'E-Rickshaws (₹10–₹30) & Sangam Boat Ferries',
      },
      {
        label: 'Railway Hubs',
        detail: 'Prayagraj Junction (PRYJ) & Prayagraj Sangam (PYG)',
      },
      {
        label: 'Holy River Crossing',
        detail: 'Sangam Country Boats & Pontoon Bridges',
      },
      {
        label: 'Heritage Corridors',
        detail: 'Civil Lines MG Marg & Chowk Pedestrian Gali',
      },
    ];
  }

  const lines = new Map();

  // Walk each day's slots and collect unique metro references
  (plan.days || []).forEach((day) => {
    ['morning', 'afternoon', 'evening'].forEach((slot) => {
      const entry = day[slot];
      if (entry?.metro) {
        // Extract line name e.g. "Yellow Line" or "Violet Line"
        const match = entry.metro.match(/(Yellow|Violet|Blue|Pink|Green|Magenta|Orange|Grey|Rapid)\s+Line/i);
        const lineKey = match ? match[0] : 'Metro';
        if (!lines.has(lineKey)) {
          lines.set(lineKey, entry.metro);
        }
      }
    });
  });

  const result = [];

  // Primary transit highlight from plan header
  if (plan.transitHighlight) {
    result.push({ label: 'Primary Transit', detail: plan.transitHighlight });
  }

  // Unique metro lines discovered in the itinerary
  lines.forEach((metroStr, lineKey) => {
    result.push({ label: lineKey, detail: metroStr });
  });

  // Cap at 4 items to keep the UI tight
  return result.slice(0, 4);
}
