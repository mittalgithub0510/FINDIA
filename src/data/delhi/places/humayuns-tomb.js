/**
 * Humayun's Tomb Place Record
 * Canonical Schema for FINDIA Destinations
 */

export const humayunsTomb = {
  id: 'humayuns-tomb',
  slug: 'humayuns-tomb',
  name: "Humayun's Tomb",
  location: 'Nizamuddin East, South East Delhi',
  category: ['Heritage', 'Historical', 'Architecture', 'Garden'],
  rating: 4.7,
  estimatedVisitTime: '1.5–2 hrs',
  heroImage: 'humayuns-tomb-hero',
  accentColor: null, // Auto-derived from heroImage
  description: {
    short: 'UNESCO Heritage Persian garden tomb built in 1565 by Empress Bega Begum, celebrated as the architectural precursor to the Taj Mahal.',
    about: 'Commissioned by Empress Bega Begum in 1565 and designed by Persian architect Mirak Mirza Ghiyas, Humayun’s Tomb was the first garden-tomb on the Indian subcontinent. It introduced the monumental high double dome and the Charbagh quadripartite garden with water channels representing the rivers of paradise, pioneering the imperial Mughal aesthetic that culminated a century later in the Taj Mahal.',
  },
  ticket: {
    indian: '₹40 (Online) / ₹50 (Counter)',
    foreign: '₹600',
  },
  timing: {
    open: '06:00 AM',
    close: '06:00 PM Daily',
  },
  metro: {
    station: 'JLN Stadium (Violet Line, Gate 2)',
    distanceKm: 0.8,
  },
  facilities: {
    parking: 'Dedicated visitor parking on Bharat Scouts and Guides Marg',
    cloakroom: 'Secure cloakroom counter at main visitor reception',
    washroom: 'Modern eco-friendly restrooms near the entrance plaza',
    food: 'Aga Khan Trust cafe serving artisanal tea and snacks near gate',
    accessibility: 'Paved ramps for wheelchair access across outer gardens and lower terrace',
  },
  nearbyPlaces: ['sunder-nursery', 'india-gate'],
  transport: {
    metro: { mode: 'Delhi Metro', time: '15-20 mins', fare: '₹30', note: 'Violet Line to JLN Stadium, 10 min walk' },
    bus: { mode: 'DTC Bus', time: '30-40 mins', fare: '₹15-20', note: 'Drop-off at Nizamuddin Dargah bus stop' },
    auto: { mode: 'Auto Rickshaw', time: '20-25 mins', fare: '₹90-130', note: 'Direct auto along Lodhi Road' },
    cab: { mode: 'App Cab', time: '15-25 mins', fare: '₹160-240', note: 'Drop-off at Humayun Tomb reception gate' },
  },
  audioGuide: {
    title: 'The Persian Double Dome & The Charbagh Symphony',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg',
    duration: '04:05',
    transcript: 'Step into the tranquil Charbagh. The four-quadrant garden design signifies the Quranic promise of paradise, traversed by water streams and cypress avenues leading to the white marble dome...',
  },
};

export default humayunsTomb;
