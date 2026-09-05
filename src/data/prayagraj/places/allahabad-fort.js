/**
 * Allahabad Fort Place Record
 * Canonical Schema for FINDIA Destinations
 */

export const allahabadFort = {
  id: 'allahabad-fort',
  slug: 'allahabad-fort',
  name: "Akbar's Allahabad Fort & Patalpuri Temple",
  location: 'Yamuna Riverbank, Prayagraj',
  category: ['Heritage', 'Historical', 'Architecture', 'Religious'],
  rating: 4.6,
  estimatedVisitTime: '1.5–2 hrs',
  heroImage: 'allahabad-fort-hero',
  accentColor: '#B45309',
  description: {
    short: 'Grand 1583 sandstone fortress commissioned by Emperor Akbar, holding the Ashoka Pillar and the immortal Akshayavat tree.',
    about: 'Commissioned in 1583 by Mughal Emperor Akbar upon recognizing the strategic military and spiritual confluence of Prayag. The fort is built of gleaming polished red sandstone with massive three-tier defensive walls rising directly out of the Yamuna. Inside lies the historic polished sandstone Ashoka Pillar dating from 232 BCE bearing edicts of Ashoka, Samudragupta’s eulogy, and Jahangir’s inscriptions. Within the underground subterranean corridors lies the Patalpuri Temple and the venerated Akshayavat (indestructible banyan tree).',
  },
  ticket: {
    indian: 'Free Entry (Permitted areas: Patalpuri Temple & Akshayavat corridor)',
    foreign: 'Free Entry (Military portion restricted)',
  },
  timing: {
    open: '07:00 AM',
    close: '05:30 PM Daily',
  },
  metro: {
    station: 'Prayagraj Junction (4.8 km / Direct auto 15 mins)',
    distanceKm: 4.8,
  },
  facilities: {
    parking: 'Designated parking outside the military perimeter gate and river road',
    cloakroom: 'Shoe and bag deposit stall near Patalpuri entry ramp',
    washroom: 'Clean visitor restrooms near the tourist security checkpoint',
    food: 'Snack kiosks, coconut water, and cold drinks outside outer gate',
    accessibility: 'Paved ramps leading down to the subterranean temple corridors',
  },
  nearbyPlaces: ['triveni-sangam', 'bade-hanuman-ji', 'minto-park'],
  transport: {
    auto: { mode: 'Auto Rickshaw / E-Rickshaw', time: '15 mins', fare: '₹50-80', note: 'Direct to Fort outer security barrier' },
    boat: { mode: 'Yamuna Boat Tour', time: '20 mins', fare: '₹150-250', note: 'Scenic view of fort sandstone ramparts from water' },
    cab: { mode: 'App Cab / Taxi', time: '15-20 mins', fare: '₹150-220', note: 'Drop-off at Fort Road roundabout' },
    bus: { mode: 'City Bus', time: '30 mins', fare: '₹15-20', note: 'Buses terminating at Daraganj / Bandha' },
  },
  audioGuide: {
    title: 'Akbar’s Citadel on the Yamuna: Fort & Akshayavat',
    audioUrl: '/audio/prayagraj/allahabad-fort-en.mp3',
    duration: '02:18',
    transcript: 'Welcome to the Allahabad Fort, built in 1583 under Emperor Akbar. As you observe the colossal red sandstone bastions, realize that this fortress stood at the imperial gateway between Delhi and the eastern provinces...',
  },
};

export default allahabadFort;
