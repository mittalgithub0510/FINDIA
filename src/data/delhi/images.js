/**
 * Image registry and resolver for Delhi Destinations.
 * Maps canonical keys ([slug]-hero) to high-resolution local photography
 * with inline SVG placeholder fallback.
 */

export const DELHI_IMAGE_REGISTRY = {
  // Phase 1 Places
  'red-fort-hero': '/images/destinations/delhi/red-fort.jpg',
  'qutub-minar-hero': '/images/destinations/delhi/qutub-minar.jpg',
  'humayuns-tomb-hero': '/images/destinations/delhi/humayuns-tomb.jpg',
  'india-gate-hero': '/images/destinations/delhi/india-gate.jpg',
  'lotus-temple-hero': '/images/destinations/delhi/lotus-temple.jpg',

  // Phase 2 Places
  'jama-masjid-hero': '/images/destinations/delhi/jama-masjid.jpg',
  'jantar-mantar-hero': '/images/destinations/delhi/jantar-mantar.jpg',
  'akshardham-hero': '/images/destinations/delhi/akshardham.jpg',
  'safdarjung-tomb-hero': '/images/destinations/delhi/safdarjung-tomb.jpg',
  'lodhi-garden-hero': '/images/destinations/delhi/lodhi-garden.jpg',
  'sunder-nursery-hero': '/images/destinations/delhi/sunder-nursery.jpg',
  'hauz-khas-fort-hero': '/images/destinations/delhi/hauz-khas-fort.jpg',
  'purana-qila-hero': '/images/destinations/delhi/purana-qila.jpg',
  'rashtrapati-bhavan-hero': '/images/destinations/delhi/rashtrapati-bhavan.jpg',
  'chandni-chowk-hero': '/images/destinations/delhi/chandni-chowk.jpg',
};

const DEFAULT_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800' width='1200' height='800'%3E%3Crect width='100%25' height='100%25' fill='%231a1714'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='32' font-weight='600' fill='%23bfb3a4' dominant-baseline='middle' text-anchor='middle'%3EFINDIA Monument Telemetry%3C/text%3E%3C/svg%3E";

/**
 * Resolves an image key to its URL with safe fallback.
 * Accepts either registry key ('red-fort-hero'), relative path, or external URL.
 *
 * @param {string} key
 * @returns {string} Image URL
 */
export function resolveDelhiImage(key) {
  if (!key) return DEFAULT_PLACEHOLDER;
  if (key.startsWith('/') || key.startsWith('http://') || key.startsWith('https://')) {
    return key;
  }
  return DELHI_IMAGE_REGISTRY[key] || DEFAULT_PLACEHOLDER;
}

export default resolveDelhiImage;
