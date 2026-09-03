/**
 * Dynamic City Registry.
 * Automatically discovers all city configuration files in this directory via Vite's import.meta.glob.
 * Adding a new city requires ONLY creating src/config/cities/<city>.js and src/data/<city>/ data files.
 */

const cityModules = import.meta.glob('./*.js', { eager: true });

export const CITIES = {};

for (const path in cityModules) {
  if (path.includes('index.js')) continue;
  const city = cityModules[path].default;
  if (city && city.slug) {
    CITIES[city.slug] = city;
  }
}

export const DEFAULT_CITY_SLUG = 'delhi';

/**
 * Returns city configuration for a given slug, falling back to default city if not found.
 * @param {string} slug
 * @returns {object} City configuration
 */
export function getCity(slug) {
  return CITIES[slug] || CITIES[DEFAULT_CITY_SLUG];
}

export default CITIES;
