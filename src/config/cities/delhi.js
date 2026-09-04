const delhi = {
  slug: 'delhi',
  name: 'Delhi',
  displayName: 'Delhi',
  status: 'live',
  tagline: '', // filled in a later step
  accent: {
    300: '#E88A6B',
    500: '#C1440E',
    700: '#7E2C09',
  },
  accentName: 'sandstone',
  hero: {
    image: '',
    credit: '',
    alt: '',
  },
  stats: {
    districts: 11,
    places: 0,
    hasLiveCrowd: true,
  },
  districts: [
    { slug: 'central-delhi', name: 'Central Delhi', placeCount: null },
    { slug: 'east-delhi', name: 'East Delhi', placeCount: null },
    { slug: 'new-delhi', name: 'New Delhi', placeCount: null },
    { slug: 'north-delhi', name: 'North Delhi', placeCount: null },
    { slug: 'north-east-delhi', name: 'North East Delhi', placeCount: null },
    { slug: 'north-west-delhi', name: 'North West Delhi', placeCount: null },
    { slug: 'shahdara', name: 'Shahdara', placeCount: null },
    { slug: 'south-delhi', name: 'South Delhi', placeCount: null },
    { slug: 'south-east-delhi', name: 'South East Delhi', placeCount: null },
    { slug: 'south-west-delhi', name: 'South West Delhi', placeCount: null },
    { slug: 'west-delhi', name: 'West Delhi', placeCount: null },
  ],
  emergency: [
    { label: 'All-India Emergency', number: '112', type: 'universal' },
    { label: 'Police', number: '100', type: 'police' },
    { label: 'Ambulance', number: '102', type: 'medical' },
    { label: 'Fire Service', number: '101', type: 'fire' },
    { label: 'Women Helpline', number: '1091', type: 'women' },
    { label: 'Delhi Tourist Police', number: '1363', type: 'tourist' },
  ],
};

export default delhi;
