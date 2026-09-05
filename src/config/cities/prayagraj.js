const prayagraj = {
  slug: 'prayagraj',
  name: 'Prayagraj',
  displayName: 'Prayagraj (Allahabad)',
  deva: 'प्रयागराज',
  status: 'live',
  tagline: 'The Sacred Confluence: Triveni Sangam, Ancient Forts & Spiritual Heritage',
  accent: {
    300: '#FDBA74',
    500: '#EA580C',
    700: '#9A3412',
  },
  accentName: 'sangam-ochre',
  hero: {
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=80',
    credit: 'Triveni Sangam Riverfront, Prayagraj',
    alt: 'Triveni Sangam holy river confluence at sunrise in Prayagraj',
  },
  stats: {
    districts: 8,
    places: 14,
    hasLiveCrowd: true,
  },
  districts: [
    { slug: 'sangam-daraganj', name: 'Sangam & Daraganj', placeCount: 4 },
    { slug: 'civil-lines', name: 'Civil Lines', placeCount: 3 },
    { slug: 'chowk-old-city', name: 'Chowk & Old City', placeCount: 3 },
    { slug: 'naini-yamuna', name: 'Naini & Yamuna Bank', placeCount: 2 },
    { slug: 'jhusi-ganges', name: 'Jhusi & Ganges Bank', placeCount: 2 },
    { slug: 'cantonment', name: 'Cantonment & Georgetown', placeCount: 1 },
    { slug: 'katra-university', name: 'Katra & University Area', placeCount: 2 },
    { slug: 'phaphamau', name: 'Phaphamau', placeCount: 1 },
  ],
  emergency: [
    { label: 'All-India Universal Emergency', number: '112', type: 'universal' },
    { label: 'Police Control Room', number: '100', type: 'police' },
    { label: 'Ambulance & Trauma Care', number: '102', type: 'medical' },
    { label: 'Fire Service Dispatch', number: '101', type: 'fire' },
    { label: 'Women Safety Helpline', number: '1091', type: 'women' },
    { label: 'Kumbh & Tourist Assistance', number: '1920', type: 'tourist' },
  ],
};

export default prayagraj;
