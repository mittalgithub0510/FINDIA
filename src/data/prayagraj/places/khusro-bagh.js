/**
 * Khusro Bagh Place Record
 * Canonical Schema for FINDIA Destinations
 */

export const khusroBagh = {
  id: 'khusro-bagh',
  slug: 'khusro-bagh',
  name: 'Khusro Bagh Mughal Mausoleums',
  location: 'Lukarganj / Old Prayagraj City',
  category: ['Heritage', 'Historical', 'Architecture', 'Garden'],
  rating: 4.5,
  estimatedVisitTime: '1.5 hrs',
  heroImage: 'khusro-bagh-hero',
  accentColor: '#D97706',
  description: {
    short: 'Walled 17th-century Mughal charbagh garden holding the sandstone mausoleums of Prince Khusro, Shah Begum, and Nithar Begum.',
    about: 'A historic Mughal walled garden covering 40 acres near Prayagraj Junction. Commissioned during Jahangir’s reign, it contains three exquisitely carved sandstone tombs showcasing the peak of Mughal provincial funerary architecture. The central tomb belongs to Prince Khusro, Jahangir’s ill-fated eldest son. Surrounding it are the tombs of his mother Shah Begum (a Rajput princess who died of grief in 1604) and his sister Nithar Begum. The interior ceilings retain astonishing multi-colored Persian plaster frescoes and calligraphic panels carved by the court calligrapher Mir Abdullah Mushkin Qalam.',
  },
  ticket: {
    indian: 'Free Entry (Protected ASI Monument)',
    foreign: 'Free Entry',
  },
  timing: {
    open: '06:00 AM',
    close: '07:00 PM Daily',
  },
  metro: {
    station: 'Prayagraj Junction (500m / Gate 2, 5 mins walk)',
    distanceKm: 0.5,
  },
  facilities: {
    parking: 'Public parking area outside the massive Mughal gateway',
    cloakroom: 'Not required / basic bag check at gate',
    washroom: 'Public restrooms available inside garden precinct',
    food: 'Fruit orchards (Allahabadi guavas) and vendors outside main gate',
    accessibility: 'Wide, flat paved stone pathways through the charbagh quadrants',
  },
  nearbyPlaces: ['chowk-bazaar', 'netram-kachori', 'loknath-gali-food'],
  transport: {
    walk: { mode: 'Walking from Station', time: '5 mins', fare: 'Free', note: 'Just 500m from Prayagraj Jn platform 1 side' },
    auto: { mode: 'E-Rickshaw', time: '5 mins', fare: '₹10-20', note: 'Frequent rickshaws from Chowk or Civil Lines' },
    cab: { mode: 'App Cab', time: '10 mins', fare: '₹80-120', note: 'Drop-off directly at Khusro Bagh grand portal' },
    bus: { mode: 'City Bus', time: '15 mins', fare: '₹10', note: 'Bus stop at Junction / Lukarganj' },
  },
  audioGuide: {
    title: 'The Tragic Prince: Stories within Khusro Bagh',
    audioUrl: '/audio/prayagraj/khusro-bagh-en.mp3',
    duration: '02:15',
    transcript: 'Welcome to Khusro Bagh, a sanctuary of peaceful gardens and poignant Mughal history. As you pass through the towering crenelated stone gateway, you enter a classic four-quadrant charbagh design reflecting Islamic paradise...',
  },
};

export default khusroBagh;
