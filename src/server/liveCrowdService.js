/**
 * Live Crowd Estimation & Google Maps Telemetry Service.
 * 
 * Features:
 * 1. 15-Minute in-memory cache to prevent redundant scraping & avoid IP rate-limiting.
 * 2. Scrapes Google Maps search endpoint for live busyness / popular times indicators.
 * 3. Resilient fallback to destination-specific diurnal engine (destinationCrowdProfiles.js)
 *    ensuring distinct, realistic footfall curves for every venue.
 */

import { computeLiveCrowdTelemetry } from '../data/destinationCrowdProfiles.js';

// In-memory cache: key -> { data, expiresAt }
const crowdCache = new Map();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Calculates a highly accurate venue-specific crowd estimate.
 */
export function calculateISTHeuristic(placeName = '', city = 'delhi') {
  return computeLiveCrowdTelemetry(placeName, city);
}

/**
 * Attempts to scrape live popularity from Google Maps web results.
 * Falls back safely to venue-specific heuristic if unavailable.
 */
async function scrapeGoogleMapsPopularTimes(placeName, city) {
  try {
    const query = encodeURIComponent(`${placeName} ${city} India`);
    const searchUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s strict timeout

    const response = await fetch(searchUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const html = await response.text();

    // Look for Google Maps live busyness aria-label or text patterns:
    const liveMatch = html.match(/Currently\s+(\d+)%\s+busy/i);
    const usualMatch = html.match(/Usually\s+(\d+)%\s+busy/i);

    if (liveMatch && liveMatch[1]) {
      const livePercent = parseInt(liveMatch[1], 10);
      let status = 'Quiet';
      if (livePercent >= 75) status = 'Peak';
      else if (livePercent >= 35) status = 'Moderate';

      return {
        place: placeName,
        city,
        crowdPercentage: livePercent,
        status,
        waitTime: livePercent >= 75 ? '30-45 min line' : (livePercent >= 35 ? '10-15 min line' : '0 min line'),
        note: 'Live Google Maps signal',
        source: 'google_live',
        isLive: true,
        timestamp: new Date().toISOString(),
      };
    }

    if (usualMatch && usualMatch[1]) {
      const usualPercent = parseInt(usualMatch[1], 10);
      let status = 'Quiet';
      if (usualPercent >= 75) status = 'Peak';
      else if (usualPercent >= 35) status = 'Moderate';

      return {
        place: placeName,
        city,
        crowdPercentage: usualPercent,
        status,
        waitTime: usualPercent >= 75 ? '25-35 min line' : '5-10 min line',
        note: 'Historical typical busyness for this hour',
        source: 'google_popular_times',
        isLive: false,
        timestamp: new Date().toISOString(),
      };
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Main public entrypoint: gets crowd data with caching.
 */
export async function getLiveCrowdData(placeName, city = 'delhi') {
  if (!placeName) {
    return calculateISTHeuristic('Triveni Sangam', city);
  }

  const cacheKey = `${city.toLowerCase()}:${placeName.toLowerCase().trim()}`;
  const now = Date.now();

  // 1. Check in-memory cache
  if (crowdCache.has(cacheKey)) {
    const cached = crowdCache.get(cacheKey);
    if (cached.expiresAt > now) {
      return cached.data;
    }
  }

  // 2. Attempt Google Maps live scrape
  let result = await scrapeGoogleMapsPopularTimes(placeName, city);

  // 3. Fall back to Venue-Specific IST Diurnal Engine
  if (!result) {
    result = calculateISTHeuristic(placeName, city);
  }

  // 4. Save in cache
  crowdCache.set(cacheKey, {
    data: result,
    expiresAt: now + CACHE_TTL_MS,
  });

  return result;
}

/**
 * Vite Dev Server Plugin to serve /api/live-crowd endpoint directly.
 */
export function liveCrowdPlugin() {
  return {
    name: 'vite-plugin-live-crowd',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost');
        if (url.pathname === '/api/live-crowd') {
          const placeName = url.searchParams.get('placeName') || 'Triveni Sangam';
          const city = url.searchParams.get('city') || 'prayagraj';

          try {
            const data = await getLiveCrowdData(placeName, city);
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.statusCode = 200;
            res.end(JSON.stringify(data));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to fetch live telemetry', details: err.message }));
          }
          return;
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost');
        if (url.pathname === '/api/live-crowd') {
          const placeName = url.searchParams.get('placeName') || 'Triveni Sangam';
          const city = url.searchParams.get('city') || 'prayagraj';

          try {
            const data = await getLiveCrowdData(placeName, city);
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.statusCode = 200;
            res.end(JSON.stringify(data));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to fetch live telemetry', details: err.message }));
          }
          return;
        }
        next();
      });
    }
  };
}
