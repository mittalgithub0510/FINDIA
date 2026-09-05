/**
 * Comprehensive Destination Hierarchy for FINDIA.
 * Regions -> States structure.
 * Only Delhi is currently LIVE; all other states default to Coming Soon.
 * accentColor: The state's culturally iconic signature color for UI theming.
 */

export const DESTINATIONS_CONFIG = [
  {
    id: 'north',
    region: 'North',
    description: 'Historical capitals, Himalayan peaks, and cultural heritage.',
    states: [
      { name: 'Chandigarh',         isLive: false, slug: 'chandigarh',          accentColor: '#6B7CFF' },
      { name: 'Delhi',              isLive: true,  slug: 'delhi', path: '/destination/north/delhi', accentColor: '#C1440E' },
      { name: 'Haryana',            isLive: false, slug: 'haryana',              accentColor: '#4CAF7D' },
      { name: 'Himachal Pradesh',   isLive: false, slug: 'himachal-pradesh',     accentColor: '#64B5F6' },
      { name: 'Jammu and Kashmir',  isLive: false, slug: 'jammu-and-kashmir',    accentColor: '#9C6FD6' },
      { name: 'Ladakh',             isLive: false, slug: 'ladakh',               accentColor: '#FF8A65' },
      { name: 'Punjab',             isLive: false, slug: 'punjab',               accentColor: '#FFD54F' },
      { name: 'Rajasthan',          isLive: false, slug: 'rajasthan',            accentColor: '#E91E8C' },
      { name: 'Uttar Pradesh (Prayagraj)', isLive: true,  slug: 'prayagraj', path: '/destination/north/prayagraj', accentColor: '#EA580C' },
      { name: 'Uttarakhand',        isLive: false, slug: 'uttarakhand',          accentColor: '#66BB6A' },
    ],
  },
  {
    id: 'north-east',
    region: 'North East',
    description: 'Untouched green valleys, living root bridges, and tribal heritage.',
    states: [
      { name: 'Arunachal Pradesh',  isLive: false, slug: 'arunachal-pradesh',   accentColor: '#26A69A' },
      { name: 'Assam',              isLive: false, slug: 'assam',                accentColor: '#8BC34A' },
      { name: 'Manipur',            isLive: false, slug: 'manipur',              accentColor: '#EC407A' },
      { name: 'Meghalaya',          isLive: false, slug: 'meghalaya',            accentColor: '#42A5F5' },
      { name: 'Mizoram',            isLive: false, slug: 'mizoram',              accentColor: '#7E57C2' },
      { name: 'Nagaland',           isLive: false, slug: 'nagaland',             accentColor: '#FF7043' },
      { name: 'Sikkim',             isLive: false, slug: 'sikkim',               accentColor: '#26C6DA' },
      { name: 'Tripura',            isLive: false, slug: 'tripura',              accentColor: '#AB47BC' },
    ],
  },
  {
    id: 'east',
    region: 'East',
    description: 'Coastal temples, tea gardens, and ancient monuments.',
    states: [
      { name: 'Andaman and Nicobar Islands', isLive: false, slug: 'andaman-nicobar', accentColor: '#00ACC1' },
      { name: 'Bihar',              isLive: false, slug: 'bihar',                accentColor: '#FFA726' },
      { name: 'Jharkhand',          isLive: false, slug: 'jharkhand',            accentColor: '#66BB6A' },
      { name: 'Odisha',             isLive: false, slug: 'odisha',               accentColor: '#FF7043' },
      { name: 'West Bengal',        isLive: false, slug: 'west-bengal',          accentColor: '#EF5350' },
    ],
  },
  {
    id: 'central',
    region: 'Central',
    description: 'Heart of India, wildlife sanctuaries, and stone architecture.',
    states: [
      { name: 'Chhattisgarh',       isLive: false, slug: 'chhattisgarh',        accentColor: '#26A69A' },
      { name: 'Madhya Pradesh',     isLive: false, slug: 'madhya-pradesh',       accentColor: '#FF8F00' },
    ],
  },
  {
    id: 'west',
    region: 'West',
    description: 'Sun-drenched beaches, desert dunes, and royal forts.',
    states: [
      { name: 'Dadra and Nagar Haveli and Daman and Diu', isLive: false, slug: 'daman-diu', accentColor: '#00BCD4' },
      { name: 'Goa',                isLive: false, slug: 'goa',                  accentColor: '#00897B' },
      { name: 'Gujarat',            isLive: false, slug: 'gujarat',              accentColor: '#FFA000' },
      { name: 'Maharashtra',        isLive: false, slug: 'maharashtra',          accentColor: '#F4511E' },
    ],
  },
  {
    id: 'south',
    region: 'South',
    description: 'Dravidian architecture, backwaters, and spice plantations.',
    states: [
      { name: 'Andhra Pradesh',     isLive: false, slug: 'andhra-pradesh',      accentColor: '#43A047' },
      { name: 'Karnataka',          isLive: false, slug: 'karnataka',            accentColor: '#E53935' },
      { name: 'Kerala',             isLive: false, slug: 'kerala',               accentColor: '#2E7D32' },
      { name: 'Lakshadweep',        isLive: false, slug: 'lakshadweep',          accentColor: '#0288D1' },
      { name: 'Puducherry',         isLive: false, slug: 'puducherry',           accentColor: '#F06292' },
      { name: 'Tamil Nadu',         isLive: false, slug: 'tamil-nadu',           accentColor: '#D84315' },
      { name: 'Telangana',          isLive: false, slug: 'telangana',            accentColor: '#558B2F' },
    ],
  },
];

export default DESTINATIONS_CONFIG;
