/**
 * India Gate & Kartavya Path Place Record
 * Canonical Schema for FINDIA Destinations
 */

export const indiaGate = {
  id: 'india-gate',
  slug: 'india-gate',
  name: 'India Gate & Kartavya Path',
  location: 'Rajpath / Kartavya Path, Central Delhi',
  category: ['Heritage', 'Historical', 'Architecture'],
  rating: 4.7,
  estimatedVisitTime: '1–1.5 hrs',
  heroImage: 'india-gate-hero',
  accentColor: null, // Auto-derived from heroImage
  description: {
    short: '42-meter high triumphal war memorial arch honoring 70,000 soldiers, set along the grand central promenade of New Delhi.',
    about: 'Designed by Sir Edwin Lutyens and completed in 1931, India Gate is a 42-meter triumphal arch standing at the eastern axis of New Delhi’s ceremonial Kartavya Path. Dedicated to the 70,000 Indian Army soldiers who died in World War I and the Afghan campaigns, the complex features names of soldiers engraved on its red and pale Bharatpur stone surfaces, bordered by manicured lawns and fountains illuminated every evening.',
  },
  ticket: {
    indian: 'Free Entry',
    foreign: 'Free Entry',
  },
  timing: {
    open: 'Open 24 Hours Daily',
    close: 'Best visited evening 05:00 PM – 10:00 PM',
  },
  metro: {
    station: 'Central Secretariat (Yellow/Violet Line, Gate 3)',
    distanceKm: 0.9,
  },
  facilities: {
    parking: 'Underground automated parking at Kartavya Path and Man Singh Road',
    cloakroom: null, // Null indicates no cloakroom facility on open promenade
    washroom: 'Public sanitation pods maintained along the outer perimeter lawns',
    food: 'Ice cream and street snack vendors along perimeter walking lanes',
    accessibility: 'Fully wheelchair accessible level walkways throughout promenade',
  },
  nearbyPlaces: ['rashtrapati-bhavan', 'purana-qila'],
  transport: {
    metro: { mode: 'Delhi Metro', time: '10-15 mins', fare: '₹20', note: 'Central Secretariat or Khan Market station' },
    bus: { mode: 'DTC Bus', time: '20-30 mins', fare: '₹10-20', note: 'Drop-off at National Gallery of Modern Art' },
    auto: { mode: 'Auto Rickshaw', time: '15-20 mins', fare: '₹80-110', note: 'Direct auto along Connaught Place / Janpath' },
    cab: { mode: 'App Cab', time: '15-20 mins', fare: '₹140-200', note: 'Drop-off at designated visitor bay on Man Singh Road' },
  },
  audioGuide: {
    title: 'The Triumphal Arch of Kartavya Path',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg',
    duration: '03:15',
    transcript: 'Designed in the spirit of the Arc de Triomphe in Paris, India Gate stands as an enduring tribute to the valor of Indian soldiers. Observe the grand canopy behind the arch...',
  },
};

export default indiaGate;
