/**
 * Bade Hanuman Ji Place Record
 * Canonical Schema for FINDIA Destinations
 */

export const badeHanumanJi = {
  id: 'bade-hanuman-ji',
  slug: 'bade-hanuman-ji',
  name: 'Bade Hanuman Ji Temple (Lete Hanuman)',
  location: 'Sangam Foreshore / Bandha Road, Prayagraj',
  category: ['Heritage', 'Religious', 'Historical'],
  rating: 4.8,
  estimatedVisitTime: '1 hr',
  heroImage: 'bade-hanuman-ji-hero',
  accentColor: '#DC2626',
  description: {
    short: 'Ancient 20-foot subterranean reclining idol of Lord Hanuman, submerged every monsoon by the sacred floodwaters of the Ganges.',
    about: 'Situated right by the Sangam embankment near Akbar’s Fort, the Sri Bade Hanuman Ji Temple (widely referred to as Lete Hanuman Mandir) is singular across the world. The massive red vermillion-smeared idol, approximately 20 feet in length, lies horizontally 8 feet below ground level in a reclining posture (Shayan Mudra). According to legend, Lord Hanuman rested here after the victory in Lanka. During peak monsoons, when the Ganges rises, its waters enter the sanctum to wash the feet of the Lord in an event celebrated as the divine Ganga Snan.',
  },
  ticket: {
    indian: 'Free Entry (Special Prasad available at counters)',
    foreign: 'Free Entry',
  },
  timing: {
    open: '05:00 AM',
    close: '10:00 PM Daily (Tuesday & Saturday heavy Aarti crowds)',
  },
  metro: {
    station: 'Prayagraj Sangam Railway Station (1.0 km / Auto 5 mins)',
    distanceKm: 1.0,
  },
  facilities: {
    parking: 'Mela ground parking area near the Bandha checkpoint',
    cloakroom: 'Shoe stalls and coconut/prasad counters line temple entrance',
    washroom: 'Public washrooms available along the Sangam Bandha road',
    food: 'Sindoor stalls, sacred basil vendors, sweet shops, and tea points',
    accessibility: 'Staircase access into underground sanctum with handrails; queue barricades during peak festivals',
  },
  nearbyPlaces: ['triveni-sangam', 'allahabad-fort', 'alopi-devi-mandir'],
  transport: {
    auto: { mode: 'E-Rickshaw', time: '15 mins', fare: '₹20-30 shared', note: 'Direct to Lete Hanuman Mandir entrance gate' },
    boat: { mode: 'Sangam Boat', time: '10 mins', fare: '₹50-100', note: 'From Sangam Ghat point straight to temple foreshore' },
    cab: { mode: 'App Cab', time: '20 mins', fare: '₹150-200', note: 'Drop-off near Bandha security point' },
    bus: { mode: 'City Bus', time: '25 mins', fare: '₹15', note: 'Daraganj / Sangam terminal stop' },
  },
  audioGuide: {
    title: 'The Reclining Guardian: Legend of Lete Hanuman',
    audioUrl: '/audio/prayagraj/bade-hanuman-ji-en.mp3',
    duration: '02:08',
    transcript: 'Welcome to the sacred shrine of Sri Bade Hanuman Ji. Here, at the confluence of holy rivers, lies the only reclining statue of the monkey god in the world. As the scent of camphor and chanting of the Hanuman Chalisa fills the air...',
  },
};

export default badeHanumanJi;
