/**
 * Qutub Minar Complex Place Record
 * Canonical Schema for FINDIA Destinations
 */

export const qutubMinar = {
  id: 'qutub-minar',
  slug: 'qutub-minar',
  name: 'Qutub Minar Complex',
  location: 'Mehrauli, South Delhi',
  category: ['Heritage', 'Historical', 'Architecture'],
  rating: 4.7,
  estimatedVisitTime: '1.5–2 hrs',
  heroImage: 'qutub-minar-hero',
  accentColor: null, // Auto-derived from heroImage
  description: {
    short: '73-meter fluted red sandstone minaret dating back to 1192 AD, a UNESCO World Heritage Site with the ancient rust-resistant Iron Pillar.',
    about: 'Initiated by Qutb-ud-din Aibak in 1192 and completed by Iltutmish and Firoz Shah Tughlaq, Qutub Minar is the world’s tallest brick minaret standing at 72.5 meters. The surrounding archaeological park preserves the 4th-century rust-resistant Iron Pillar of Chandragupta II, the intricately carved Quwwat-ul-Islam Mosque colonnades, and the grand Alai Darwaza gateway.',
  },
  ticket: {
    indian: '₹40 (Online) / ₹50 (Counter)',
    foreign: '₹600',
  },
  timing: {
    open: '07:00 AM',
    close: '05:00 PM Daily',
  },
  metro: {
    station: 'Qutub Minar (Yellow Line)',
    distanceKm: 1.2,
  },
  facilities: {
    parking: 'Organized ASI parking facility opposite main entrance gate',
    cloakroom: 'Cloakroom available at ticket counter for small bags',
    washroom: 'Maintained public washrooms inside complex perimeter',
    food: 'Souvenir cafe and drinking water points inside grounds',
    accessibility: 'Step-free pathways connecting major monuments and ruins',
  },
  nearbyPlaces: ['humayuns-tomb', 'lotus-temple'],
  transport: {
    metro: { mode: 'Delhi Metro', time: '25-35 mins', fare: '₹40-50', note: 'Yellow Line to Qutub Minar station + short auto' },
    bus: { mode: 'DTC Bus', time: '45-60 mins', fare: '₹15-25', note: 'Direct buses along Mehrauli-Badarpur route' },
    auto: { mode: 'Auto Rickshaw', time: '35-45 mins', fare: '₹180-240', note: 'From South Delhi hubs' },
    cab: { mode: 'App Cab', time: '30-40 mins', fare: '₹300-450', note: 'Direct drop-off at visitor parking' },
  },
  audioGuide: {
    title: 'The Tower of Victory & The Iron Pillar Riddle',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg',
    duration: '03:50',
    transcript: 'Stand before the towering red sandstone minaret. Notice five distinct tiers, each encircled by projecting balconies supported by intricate honeycomb stalactite corbelling...',
  },
};

export default qutubMinar;
