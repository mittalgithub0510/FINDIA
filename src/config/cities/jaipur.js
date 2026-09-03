const jaipur = {
  slug: 'jaipur',
  name: 'Jaipur',
  displayName: 'Jaipur',
  deva: 'जयपुर',
  status: 'live',
  tagline: 'The Pink City: Astronomical Observatories & Amber Ramparts',
  accent: {
    300: '#F2A0B5',
    500: '#C2185B',
    700: '#8A0F3C',
  },
  accentName: 'pink-city',
  hero: {
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80',
    credit: 'Hawa Mahal Palace Façade',
    alt: 'Pink sandstone façade of Hawa Mahal Jaipur',
  },
  stats: {
    districts: 4,
    places: 6,
    hasLiveCrowd: true,
  },
  districts: [
    { slug: 'walled-city', name: 'Walled City (Old Jaipur)', placeCount: 4 },
    { slug: 'amer', name: 'Amer & Jaigarh', placeCount: 3 },
    { slug: 'sanganer', name: 'Sanganer Crafts Zone', placeCount: 2 },
    { slug: 'c-scheme', name: 'C-Scheme & Civil Lines', placeCount: 2 },
  ],
  emergency: [
    { label: 'All-India Universal Emergency', number: '112', type: 'universal' },
    { label: 'Police Control Room', number: '100', type: 'police' },
    { label: 'Ambulance & Medical Trauma', number: '102', type: 'medical' },
    { label: 'Fire Service Dispatch', number: '101', type: 'fire' },
    { label: 'Women Helpline Desk', number: '1091', type: 'women' },
    { label: 'Rajasthan Tourist Assistance', number: '1363', type: 'tourist' },
  ],
};

export default jaipur;
