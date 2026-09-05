/**
 * Triveni Sangam Place Record
 * Canonical Schema for FINDIA Destinations
 */

export const triveniSangam = {
  id: 'triveni-sangam',
  slug: 'triveni-sangam',
  name: 'Triveni Sangam',
  location: 'Daraganj / Sangam Ghats, Prayagraj',
  category: ['Heritage', 'Religious', 'Ghats'],
  rating: 4.9,
  estimatedVisitTime: '2–3 hrs',
  heroImage: 'triveni-sangam-hero',
  accentColor: '#EA580C',
  description: {
    short: 'Sacred holy confluence of Ganga, Yamuna, and mythical Saraswati; primary site of the Maha Kumbh Mela and spiritual heart of Prayag.',
    about: 'Triveni Sangam in Prayagraj is one of the most sacred pilgrimage destinations in Hinduism. Here, the greenish clear waters of the Yamuna unite with the muddy, silt-laden waters of the holy Ganges, alongside the subterranean mystical Saraswati river. Devotees take wooden country boats out to the confluence point to perform holy snan (ablution) from wooden pontoon platforms, especially auspicious during Magh Mela and the 12-yearly Maha Kumbh, the largest human gathering on Earth.',
  },
  ticket: {
    indian: 'Free Entry / Boat Ride: ₹100–₹250 per person (negotiable per boat)',
    foreign: 'Free Entry / Private Boat: ₹500–₹1,200',
  },
  timing: {
    open: 'Open 24 Hours',
    close: 'Boat ferries operate 05:00 AM – 07:00 PM (Best at Dawn)',
  },
  metro: {
    station: 'Prayagraj Sangam Railway Station (1.2 km / E-Rickshaw available)',
    distanceKm: 1.2,
  },
  facilities: {
    parking: 'Extensive mela ground parking lots near Kali Sadak and Bandha',
    cloakroom: 'Tent locker facilities and bag deposit desks on main bathing ghats',
    washroom: 'Pre-fabricated modular toilets and changing rooms along ghat ramparts',
    food: 'Tea stalls, roasted corn vendors, and satvik snack kiosks along the riverbank',
    accessibility: 'Temporary sand ramps and floating pontoons during festival seasons',
  },
  nearbyPlaces: ['bade-hanuman-ji', 'allahabad-fort', 'alopi-devi-mandir'],
  transport: {
    boat: { mode: 'Sangam Boat Ferry', time: '15-20 mins', fare: '₹100-250', note: 'Wooden row boats from Qila Ghat or Sangam Nose' },
    auto: { mode: 'E-Rickshaw', time: '15-20 mins', fare: '₹20-30 shared', note: 'From Prayagraj Jn or Rambag to Sangam Bandha' },
    bus: { mode: 'City Shuttle E-Bus', time: '25-35 mins', fare: '₹15-25', note: 'Frequent buses to Daraganj / Sangam gate' },
    cab: { mode: 'App Cab / Taxi', time: '20-30 mins', fare: '₹180-250', note: 'Drop-off at Sangam parking control point' },
  },
  audioGuide: {
    title: 'The Divine Meeting: Secrets of Triveni Sangam',
    audioUrl: '/audio/prayagraj/triveni-sangam-en.mp3',
    duration: '02:30',
    transcript: 'Welcome to Triveni Sangam, the King of Pilgrimages (Tirtha Raj). As your boat glides across the tranquil waters, gaze at the distinct color boundary where the turquoise Yamuna meets the holy sandy Ganga...',
  },
};

export default triveniSangam;
