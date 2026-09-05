/**
 * SOS Multi-City Data Lookup Router.
 * Resolves city-scoped SOS entries (helplines & services) based on active city slug.
 */

import delhiSOSData from './delhi/sos';
import prayagrajSOSData from './prayagraj/sos';

export const SOS_CATEGORIES = [
  { id: 'hospital', label: 'Hospital', icon: 'Hospital' },
  { id: 'police', label: 'Police', icon: 'ShieldAlert' },
  { id: 'mechanic', label: 'Mechanic', icon: 'Wrench' },
  { id: 'petrol', label: 'Petrol', icon: 'Fuel' },
  { id: 'amenities', label: 'Amenities', icon: 'Layers' },
];

const CITY_SOS_MAP = {
  delhi: delhiSOSData,
  prayagraj: prayagrajSOSData,
};

/**
 * Returns SOS helplines and nearby services for the requested city.
 * @param {string} citySlug - Active city slug e.g. 'delhi', 'jaipur'
 */
export function getCitySOSData(citySlug) {
  return CITY_SOS_MAP[citySlug] || null;
}

export default getCitySOSData;
