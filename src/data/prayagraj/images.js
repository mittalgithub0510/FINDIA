/**
 * Image registry and resolver for Prayagraj Destinations.
 * Maps canonical keys ([slug]-hero) to high-resolution photography
 * with inline SVG placeholder fallback.
 */

export const PRAYAGRAJ_IMAGE_REGISTRY = {
  'triveni-sangam-hero': '/images/destinations/prayagraj/triveni-sangam.jpg',
  'allahabad-fort-hero': '/images/destinations/prayagraj/allahabad-fort.jpg',
  'anand-bhavan-hero': '/images/destinations/prayagraj/anand-bhavan.jpg',
  'khusro-bagh-hero': '/images/destinations/prayagraj/khusro-bagh.jpg',
  'all-saints-cathedral-hero': '/images/destinations/prayagraj/all-saints-cathedral.jpg',
  'bade-hanuman-ji-hero': '/images/destinations/prayagraj/bade-hanuman-ji.jpg',
  'alopi-devi-mandir-hero': '/images/destinations/prayagraj/alopi-devi-mandir.jpg',
  'chandrashekhar-azad-park-hero': '/images/destinations/prayagraj/chandrashekhar-azad-park.jpg',
  'minto-park-hero': '/images/destinations/prayagraj/minto-park.jpg',
  'boat-club-yamuna-hero': '/images/destinations/prayagraj/boat-club-yamuna.jpg',
  'chowk-bazaar-hero': '/images/destinations/prayagraj/chowk-bazaar.jpg',
  'civil-lines-high-street-hero': '/images/destinations/prayagraj/civil-lines-high-street.jpg',
  'netram-kachori-hero': '/images/destinations/prayagraj/netram-kachori.jpg',
  'loknath-gali-food-hero': '/images/destinations/prayagraj/loknath-gali-food.jpg',
  'shankar-viman-mandapam-hero': '/images/destinations/prayagraj/shankar-viman-mandapam.jpg',
  'katra-bazaar-hero': '/images/destinations/prayagraj/katra-bazaar.jpg',
  'thatheri-bazaar-hero': '/images/destinations/prayagraj/thatheri-bazaar.jpg',
  'atlantis-mall-hero': '/images/destinations/prayagraj/atlantis-mall.jpg',
  'dehati-rasgulle-hero': '/images/destinations/prayagraj/dehati-rasgulle.jpg',
  'raja-ram-lassi-hero': '/images/destinations/prayagraj/raja-ram-lassi.jpg',
  'sulaki-chaat-hero': '/images/destinations/prayagraj/sulaki-chaat.jpg',
  'kamdhenu-sweets-hero': '/images/destinations/prayagraj/kamdhenu-sweets.jpg',
};

const DEFAULT_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800' width='1200' height='800'%3E%3Crect width='100%25' height='100%25' fill='%231a1714'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='32' font-weight='600' fill='%23bfb3a4' dominant-baseline='middle' text-anchor='middle'%3EFINDIA Prayagraj Telemetry%3C/text%3E%3C/svg%3E";

/**
 * Resolves an image key to its URL with safe fallback.
 * @param {string} key
 * @returns {string} Image URL
 */
export function resolvePrayagrajImage(key) {
  if (!key) return DEFAULT_PLACEHOLDER;
  if (key.startsWith('/') || key.startsWith('http://') || key.startsWith('https://')) {
    return key;
  }
  return PRAYAGRAJ_IMAGE_REGISTRY[key] || DEFAULT_PLACEHOLDER;
}

export default resolvePrayagrajImage;
