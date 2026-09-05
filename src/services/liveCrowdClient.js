/**
 * Client-side Live Crowd Provider & Telemetry Engine.
 * 
 * Powered by destinationCrowdProfiles.js for place-specific diurnal profiles,
 * real operating hours, and authentic popular times curves.
 */

import {
  computeLiveCrowdTelemetry,
  computeHourlyProfile,
} from '../data/destinationCrowdProfiles';

// In-memory cache to avoid redundant API queries during frequent re-renders
const clientCrowdCache = new Map();
const CLIENT_CACHE_TTL = 2 * 60 * 1000; // 2 minutes

/**
 * Returns instantaneous crowd estimate using venue-specific diurnal engine.
 */
export function getClientISTEstimate(placeName = '', city = 'delhi') {
  return computeLiveCrowdTelemetry(placeName, city);
}

/**
 * Fetches crowd telemetry from local /api/live-crowd endpoint with venue-specific fallback.
 */
export async function fetchLiveCrowd(placeName, city = 'delhi') {
  const cacheKey = `${city}:${placeName}`;
  const now = Date.now();

  if (clientCrowdCache.has(cacheKey)) {
    const cached = clientCrowdCache.get(cacheKey);
    if (cached.expiresAt > now) {
      return cached.data;
    }
  }

  try {
    const res = await fetch(`/api/live-crowd?placeName=${encodeURIComponent(placeName)}&city=${encodeURIComponent(city)}`);
    if (res.ok) {
      const json = await res.json();
      clientCrowdCache.set(cacheKey, { data: json, expiresAt: now + CLIENT_CACHE_TTL });
      return json;
    }
  } catch {
    // API endpoint unreachable -> fallback to deterministic client engine
  }

  const fallback = computeLiveCrowdTelemetry(placeName, city);
  clientCrowdCache.set(cacheKey, { data: fallback, expiresAt: now + CLIENT_CACHE_TTL });
  return fallback;
}

/**
 * Computes authentic 16-hour popular times profile (6 AM - 9 PM) for a venue.
 */
export function getHourlyCrowdProfile(placeName = '', city = 'delhi', targetDay = null) {
  return computeHourlyProfile(placeName, city, targetDay);
}
