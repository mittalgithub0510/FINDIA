/**
 * All Saints Cathedral Place Record
 * Canonical Schema for FINDIA Destinations
 */

export const allSaintsCathedral = {
  id: 'all-saints-cathedral',
  slug: 'all-saints-cathedral',
  name: 'All Saints Cathedral (Patthar Girja)',
  location: 'Civil Lines, Prayagraj',
  category: ['Heritage', 'Historical', 'Architecture', 'Religious'],
  rating: 4.6,
  estimatedVisitTime: '1 hr',
  heroImage: 'all-saints-cathedral-hero',
  accentColor: '#C2410C',
  description: {
    short: 'Colonial 1871 Anglican cathedral designed by Sir William Emerson in 13th-century Gothic style, renowned as Patthar Girja.',
    about: 'Commonly known as Patthar Girja (Stone Church), All Saints Cathedral is one of the finest examples of Gothic revival architecture in Asia. Consecrated in 1887 and designed by the celebrated British architect Sir William Emerson, the cathedral stands inside a sprawling roundabout in Civil Lines. Built from buff sandstone with rich red terracotta dressings, its interior boasts soaring rib-vaulted arches, a lantern tower rising 130 feet, polished alabaster screens, and vibrant stained-glass rose windows that illuminate the sanctuary with jewel-toned light.',
  },
  ticket: {
    indian: 'Free Entry (Donations welcome)',
    foreign: 'Free Entry',
  },
  timing: {
    open: '08:30 AM',
    close: '05:30 PM Daily (Sunday services at 09:00 AM)',
  },
  metro: {
    station: 'Prayagraj Junction (1.5 km / Civil Lines Auto Stand)',
    distanceKm: 1.5,
  },
  facilities: {
    parking: 'Open churchyard perimeter parking',
    cloakroom: 'Not required / modest dress code advised',
    washroom: 'Clean visitor washrooms in church annex',
    food: 'Civil Lines bakeries and cafes within 200 meters',
    accessibility: 'Step-free ramp entry into the main nave and aisles',
  },
  nearbyPlaces: ['civil-lines-high-street', 'anand-bhavan', 'chandrashekhar-azad-park'],
  transport: {
    walk: { mode: 'Heritage Walk', time: '5 mins', fare: 'Free', note: 'Central intersection in Civil Lines' },
    auto: { mode: 'E-Rickshaw', time: '5 mins', fare: '₹10-20', note: 'Drop-off at Patthar Girja crossing' },
    cab: { mode: 'App Cab', time: '5-10 mins', fare: '₹70-100', note: 'Direct to cathedral portico' },
    bus: { mode: 'City Bus', time: '15 mins', fare: '₹10', note: 'Civil Lines bus route' },
  },
  audioGuide: {
    title: 'Gothic Sandstone in the Plains: All Saints Cathedral',
    audioUrl: '/audio/prayagraj/all-saints-cathedral-en.mp3',
    duration: '02:10',
    transcript: 'Welcome to All Saints Cathedral, known throughout North India as Patthar Girja. Commissioned in 1871 and designed by Sir William Emerson, this sacred sanctuary stands as a triumph of Anglo-Indian Gothic craftsmanship...',
  },
};

export default allSaintsCathedral;
