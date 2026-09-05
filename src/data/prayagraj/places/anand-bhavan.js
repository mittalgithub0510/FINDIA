/**
 * Anand Bhavan Place Record
 * Canonical Schema for FINDIA Destinations
 */

export const anandBhavan = {
  id: 'anand-bhavan',
  slug: 'anand-bhavan',
  name: 'Anand Bhavan & Jawahar Planetarium',
  location: 'Tagore Town / Civil Lines, Prayagraj',
  category: ['Heritage', 'Historical', 'Museum'],
  rating: 4.7,
  estimatedVisitTime: '2 hrs',
  heroImage: 'anand-bhavan-hero',
  accentColor: '#0284C7',
  description: {
    short: 'Iconic two-storey historic estate of the Nehru family, now a museum preserving the memories of India’s freedom movement.',
    about: 'Completed in the 1930s by Pandit Motilal Nehru, Anand Bhavan replaced Swaraj Bhavan as the family residence and quickly became the nerve centre of India’s anti-colonial movement. Mahatma Gandhi, Sardar Vallabhbhai Patel, and Subhash Chandra Bose frequently gathered here for Congress Working Committee sessions. Today, the estate is preserved as a museum showcasing preserved original furniture, Motilal Nehru’s library, the room where Indira Gandhi grew up, and the adjoining Jawahar Planetarium.',
  },
  ticket: {
    indian: '₹70 (Museum) / ₹80 (Planetarium show)',
    foreign: '₹500 (Museum)',
  },
  timing: {
    open: '09:30 AM',
    close: '05:00 PM (Closed Mondays & National Holidays)',
  },
  metro: {
    station: 'Prayagraj Junction (3.5 km / E-rickshaw 10 mins)',
    distanceKm: 3.5,
  },
  facilities: {
    parking: 'Dedicated parking ground outside the main perimeter gate',
    cloakroom: 'Bag deposit counter at the ticket booth',
    washroom: 'Clean restrooms in the campus gardens and planetarium foyer',
    food: 'Souvenir cafe and snack counter near garden entrance',
    accessibility: 'Paved walkways throughout landscaped lawns, ground-floor wheelchair access',
  },
  nearbyPlaces: ['all-saints-cathedral', 'chandrashekhar-azad-park', 'civil-lines-high-street'],
  transport: {
    auto: { mode: 'E-Rickshaw / Auto', time: '10 mins', fare: '₹20-40', note: 'Direct to Anand Bhavan main gate' },
    cab: { mode: 'App Cab', time: '10-15 mins', fare: '₹100-150', note: 'Drop-off on Church Road' },
    bus: { mode: 'City Bus', time: '20 mins', fare: '₹10-15', note: 'Stop at Tagore Town crossing' },
    walk: { mode: 'Heritage Stroll', time: '15 mins', fare: 'Free', note: 'Pleasant walk through colonial Tagore Town' },
  },
  audioGuide: {
    title: 'Cradle of the Republic: Anand Bhavan & Freedom Struggle',
    audioUrl: '/audio/prayagraj/anand-bhavan-en.mp3',
    duration: '02:22',
    transcript: 'Welcome to Anand Bhavan, the Abode of Joy. As you step onto the shaded verandah, imagine the pivotal 1930s and 40s when the strategy for India’s non-violent revolution was debated within these very rooms...',
  },
};

export default anandBhavan;
