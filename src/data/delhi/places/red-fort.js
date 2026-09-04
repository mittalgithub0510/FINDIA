/**
 * Red Fort (Lal Qila) Place Record
 * Canonical Schema for FINDIA Destinations
 */

export const redFort = {
  id: 'red-fort',
  slug: 'red-fort',
  name: 'Red Fort (Lal Qila)',
  location: 'Netaji Subhash Marg, Chandni Chowk, Old Delhi',
  category: ['Heritage', 'Historical', 'Architecture'],
  rating: 4.6,
  estimatedVisitTime: '2–2.5 hrs',
  heroImage: 'red-fort-hero',
  accentColor: null, // Auto-derived from heroImage
  description: {
    short: 'Iconic 17th-century Mughal fortress crafted from red sandstone, the historic seat of imperial emperors and symbol of Indian freedom.',
    about: 'Commissioned by Mughal Emperor Shah Jahan in 1638 upon shifting the capital from Agra to Shahjahanabad, Red Fort (Lal Qila) represents the zenith of Mughal architectural ingenuity. Flanked by massive 33-meter defensive walls, its interior complex houses the Diwan-i-Aam (Hall of Public Audience), the Diwan-i-Khas with its famed Peacock Throne pedestal, marble hammams, and the historic Lahore Gate where India’s Prime Minister unfurls the national flag every Independence Day.',
  },
  ticket: {
    indian: '₹50 (Online) / ₹60 (Counter)',
    foreign: '₹600',
  },
  timing: {
    open: '09:30 AM',
    close: '04:30 PM (Closed Mondays)',
  },
  metro: {
    station: 'Lal Qila (Violet Line, Gate 4)',
    distanceKm: 0.2,
  },
  facilities: {
    parking: 'Designated municipal parking across Delhi Gate and Chandni Chowk',
    cloakroom: 'Security cloakroom available near Lahore Gate entry checkpoint',
    washroom: 'Clean visitor restrooms inside the outer forecourt and museum pavilions',
    food: 'Snack kiosks and water ATMs available near the entrance',
    accessibility: 'Wheelchair accessible ramps at main gates with battery cart assistance',
  },
  nearbyPlaces: ['chandni-chowk', 'jama-masjid'],
  transport: {
    metro: { mode: 'Delhi Metro', time: '15-20 mins', fare: '₹20-30', note: 'Violet Line directly to Lal Qila station' },
    bus: { mode: 'DTC Bus', time: '35-45 mins', fare: '₹15-25', note: 'Frequent buses to Red Fort bus stop' },
    auto: { mode: 'Auto Rickshaw', time: '25-30 mins', fare: '₹100-150', note: 'Metered auto from Central Delhi' },
    cab: { mode: 'App Cab', time: '25-35 mins', fare: '₹200-300', note: 'Drop-off near Netaji Subhash Marg parking' },
  },
  audioGuide: {
    title: 'Echoes of Shahjahanabad: Inside the Imperial Fortress',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg',
    duration: '04:15',
    transcript: 'Welcome to Lal Qila, constructed between 1638 and 1648 under the vision of Ustad Ahmad Lahori. As you cross the grand Lahore Gate, notice the octagonal design mirroring Mughal cosmology...',
  },
};

export default redFort;
