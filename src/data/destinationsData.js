/**
 * Comprehensive Destination Hierarchy for FINDIA.
 * Regions -> States structure.
 * Only Delhi is currently LIVE; all other states default to Coming Soon.
 */

export const DESTINATIONS_CONFIG = [
  {
    id: 'north',
    region: 'North',
    description: 'Historical capitals, Himalayan peaks, and cultural heritage.',
    states: [
      { name: 'Chandigarh', isLive: false, slug: 'chandigarh' },
      { name: 'Delhi', isLive: true, slug: 'delhi', path: '/destination/north/delhi' },
      { name: 'Haryana', isLive: false, slug: 'haryana' },
      { name: 'Himachal Pradesh', isLive: false, slug: 'himachal-pradesh' },
      { name: 'Jammu and Kashmir', isLive: false, slug: 'jammu-and-kashmir' },
      { name: 'Ladakh', isLive: false, slug: 'ladakh' },
      { name: 'Punjab', isLive: false, slug: 'punjab' },
      { name: 'Rajasthan', isLive: false, slug: 'rajasthan' },
      { name: 'Uttar Pradesh', isLive: false, slug: 'uttar-pradesh' },
      { name: 'Uttarakhand', isLive: false, slug: 'uttarakhand' },
    ],
  },
  {
    id: 'north-east',
    region: 'North East',
    description: 'Untouched green valleys, living root bridges, and tribal heritage.',
    states: [
      { name: 'Arunachal Pradesh', isLive: false, slug: 'arunachal-pradesh' },
      { name: 'Assam', isLive: false, slug: 'assam' },
      { name: 'Manipur', isLive: false, slug: 'manipur' },
      { name: 'Meghalaya', isLive: false, slug: 'meghalaya' },
      { name: 'Mizoram', isLive: false, slug: 'mizoram' },
      { name: 'Nagaland', isLive: false, slug: 'nagaland' },
      { name: 'Sikkim', isLive: false, slug: 'sikkim' },
      { name: 'Tripura', isLive: false, slug: 'tripura' },
    ],
  },
  {
    id: 'east',
    region: 'East',
    description: 'Coastal temples, tea gardens, and ancient monuments.',
    states: [
      { name: 'Andaman and Nicobar Islands', isLive: false, slug: 'andaman-nicobar' },
      { name: 'Bihar', isLive: false, slug: 'bihar' },
      { name: 'Jharkhand', isLive: false, slug: 'jharkhand' },
      { name: 'Odisha', isLive: false, slug: 'odisha' },
      { name: 'West Bengal', isLive: false, slug: 'west-bengal' },
    ],
  },
  {
    id: 'central',
    region: 'Central',
    description: 'Heart of India, wildlife sanctuaries, and stone architecture.',
    states: [
      { name: 'Chhattisgarh', isLive: false, slug: 'chhattisgarh' },
      { name: 'Madhya Pradesh', isLive: false, slug: 'madhya-pradesh' },
    ],
  },
  {
    id: 'west',
    region: 'West',
    description: 'Sun-drenched beaches, desert dunes, and royal forts.',
    states: [
      { name: 'Dadra and Nagar Haveli and Daman and Diu', isLive: false, slug: 'daman-diu' },
      { name: 'Goa', isLive: false, slug: 'goa' },
      { name: 'Gujarat', isLive: false, slug: 'gujarat' },
      { name: 'Maharashtra', isLive: false, slug: 'maharashtra' },
    ],
  },
  {
    id: 'south',
    region: 'South',
    description: 'Dravidian architecture, backwaters, and spice plantations.',
    states: [
      { name: 'Andhra Pradesh', isLive: false, slug: 'andhra-pradesh' },
      { name: 'Karnataka', isLive: false, slug: 'karnataka' },
      { name: 'Kerala', isLive: false, slug: 'kerala' },
      { name: 'Lakshadweep', isLive: false, slug: 'lakshadweep' },
      { name: 'Puducherry', isLive: false, slug: 'puducherry' },
      { name: 'Tamil Nadu', isLive: false, slug: 'tamil-nadu' },
      { name: 'Telangana', isLive: false, slug: 'telangana' },
    ],
  },
];

export default DESTINATIONS_CONFIG;
