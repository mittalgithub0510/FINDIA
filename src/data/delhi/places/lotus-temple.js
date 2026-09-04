/**
 * Lotus Temple Place Record
 * Canonical Schema for FINDIA Destinations
 */

export const lotusTemple = {
  id: 'lotus-temple',
  slug: 'lotus-temple',
  name: 'Lotus Temple (Baháʼí House of Worship)',
  location: 'Lotus Temple Road, Bahapur, Kalkaji, South Delhi',
  category: ['Religious', 'Architecture', 'Heritage'],
  rating: 4.5,
  estimatedVisitTime: '1–1.5 hrs',
  heroImage: 'lotus-temple-hero',
  accentColor: null, // Auto-derived from heroImage
  description: {
    short: 'Iconic biomimetic lotus flower sanctuary crafted with 27 free-standing white Greek marble petals and nine serene ponds.',
    about: 'Completed in 1986 and designed by Iranian-Canadian architect Fariborz Sahba, the Lotus Temple is celebrated worldwide for its organic biomimetic architecture. Composed of 27 petals sculpted from white Greek Pentelikon marble arranged in clusters of three to form nine arched doorways, the sanctuary opens onto a central prayer hall seating 2,500 people. Embodying unity and peace, people of all faiths, religions, and backgrounds are welcome to meditate in silence amidst nine surrounding tranquil ponds.',
  },
  ticket: {
    indian: 'Free Entry',
    foreign: 'Free Entry',
  },
  timing: {
    open: '08:30 AM',
    close: '05:00 PM (Closed Mondays)',
  },
  metro: {
    station: 'Kalkaji Mandir (Violet/Magenta Line, Gate 2)',
    distanceKm: 0.5,
  },
  facilities: {
    parking: 'Free visitor parking lot within temple premises',
    cloakroom: 'Mandatory free shoe deposit counter before entering the sanctum',
    washroom: 'Well-maintained restrooms on the perimeter garden grounds',
    food: null, // Null indicates no food stalls allowed inside the sacred grounds
    accessibility: 'Paved ramps and dedicated volunteer wheelchair assistance',
  },
  nearbyPlaces: ['qutub-minar', 'humayuns-tomb'],
  transport: {
    metro: { mode: 'Delhi Metro', time: '20-30 mins', fare: '₹30-40', note: 'Kalkaji Mandir interchange (Violet and Magenta lines)' },
    bus: { mode: 'DTC Bus', time: '40-50 mins', fare: '₹15-25', note: 'Buses along Outer Ring Road to Nehru Place' },
    auto: { mode: 'Auto Rickshaw', time: '25-35 mins', fare: '₹120-170', note: 'From Greater Kailash / Nehru Place' },
    cab: { mode: 'App Cab', time: '25-30 mins', fare: '₹220-320', note: 'Direct drop-off at Kalkaji main gate' },
  },
  audioGuide: {
    title: 'The Silent Petals: Biomimicry and Baháʼí Unity',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg',
    duration: '03:40',
    transcript: 'Behold the 27 free-standing petals curving inward to mirror the sacred lotus blossom, revered across Indian traditions as a symbol of spiritual purity rising from muddy water...',
  },
};

export default lotusTemple;
