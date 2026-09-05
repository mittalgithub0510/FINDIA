/**
 * Single source of truth for FINDIA Prayagraj Transport Data.
 * Fully structured for multi-city navigation and FINDIA AI decision engine.
 */

export const prayagrajTransport = {
  modes: [
    {
      id: 'boat',
      name: 'Sangam Boat Ferry',
      shortLabel: 'Sacred river transit',
      iconName: 'Navigation',
      description: 'Traditional wooden rowboats and motorized ferries navigating between Qila Ghat, Arail Ghat, and the Triveni confluence point.',
      avgCost: '₹100 – ₹250',
      speedRating: 'Scenic & Direct',
      bestFor: 'Reaching Triveni Sangam bathing platforms & river sunsets'
    },
    {
      id: 'auto',
      name: 'E-Rickshaw / Auto',
      shortLabel: 'Eco-friendly & agile',
      iconName: 'Navigation',
      description: 'Ubiquitous electric three-wheelers connecting all railway stations, Chowk alleys, Civil Lines, and the Sangam embankment.',
      avgCost: '₹15 – ₹50',
      speedRating: 'Fast in traffic',
      bestFor: 'Last-mile connectivity, market lanes & station transfers'
    },
    {
      id: 'bus',
      name: 'UPSRTC & City E-Buses',
      shortLabel: 'Clean AC transit',
      iconName: 'Bus',
      description: 'Modern air-conditioned electric low-floor buses operating on major arterial routes across Prayagraj, Naini, and Phaphamau.',
      avgCost: '₹10 – ₹30',
      speedRating: 'Moderate',
      bestFor: 'Longer commutes across Yamuna and Ganga river bridges'
    },
    {
      id: 'cab',
      name: 'Cab / Ride Hailing',
      shortLabel: 'Comfortable transfers',
      iconName: 'Car',
      description: 'Ola, Uber, and local tourist taxis suitable for airport transfers, family groups, and day-trip excursions to Shringverpur.',
      avgCost: '₹120 – ₹350',
      speedRating: 'Comfortable',
      bestFor: 'Direct hotel-to-attraction hops & airport transfers'
    },
    {
      id: 'walk',
      name: 'Heritage Walking Trails',
      shortLabel: 'Best for old streets',
      iconName: 'Walk',
      description: 'Best way to absorb the colonial boulevards of Civil Lines, old spice alleys of Chowk, and the tranquil riverbank bluffs.',
      avgCost: 'Free',
      speedRating: 'Leisurely',
      bestFor: 'Chowk food walks, Khusro Bagh, and Civil Lines cafes'
    }
  ],

  destinations: [
    { id: 'triveni-sangam', name: 'Triveni Sangam', category: 'Religious / Ghats', zone: 'Sangam & Kumbh Zone' },
    { id: 'allahabad-fort', name: "Akbar's Allahabad Fort & Patalpuri", category: 'Heritage / Fort', zone: 'Sangam & Kumbh Zone' },
    { id: 'bade-hanuman-ji', name: 'Bade Hanuman Ji (Lete Hanuman)', category: 'Religious', zone: 'Sangam & Kumbh Zone' },
    { id: 'anand-bhavan', name: 'Anand Bhavan & Planetarium', category: 'Historical / Museum', zone: 'Civil Lines Hub' },
    { id: 'all-saints-cathedral', name: 'All Saints Cathedral (Patthar Girja)', category: 'Heritage / Church', zone: 'Civil Lines Hub' },
    { id: 'khusro-bagh', name: 'Khusro Bagh Mughal Gardens', category: 'Heritage / Garden', zone: 'Chowk & Old Heritage Hub' },
    { id: 'chowk-bazaar', name: 'Historic Chowk Bazaar', category: 'Market / Heritage', zone: 'Chowk & Old Heritage Hub' },
    { id: 'chandrashekhar-azad-park', name: 'Chandrashekhar Azad Park (Alfred Park)', category: 'Park / Museum', zone: 'Civil Lines Hub' },
    { id: 'boat-club-yamuna', name: 'Prayagraj Boat Club & Yamuna Riverfront', category: 'Adventure / River', zone: 'Naini & Yamuna Riverfront' },
    { id: 'netram-kachori', name: 'Netram Moolchand & Sons (1854)', category: 'Food Landmark', zone: 'Chowk & Old Heritage Hub' },
  ],

  hubs: [
    { id: 'prayagraj-junction', name: 'Prayagraj Junction (PRYJ)', type: 'Main Railway Terminal', connects: 'Civil Lines & Chowk' },
    { id: 'prayagraj-sangam', name: 'Prayagraj Sangam Station (PYGS)', type: 'Pilgrim Rail Station', connects: 'Sangam Ghats' },
    { id: 'chheoki-junction', name: 'Prayagraj Chheoki (PCOI)', type: 'South / East Rail Hub', connects: 'Naini & Outer Ring' },
    { id: 'civil-lines-bus-stand', name: 'Civil Lines Central Bus Station', type: 'Interstate Bus Terminal', connects: 'All UP & National Highways' },
    { id: 'daraganj-ghat', name: 'Daraganj Boat Jetty', type: 'River Terminal', connects: 'Ganga Ghats & Sangam Nose' },
    { id: 'bamrauli-airport', name: 'Prayagraj Airport (IXD) Bamrauli', type: 'Domestic Airport', connects: 'National Flights' },
  ],

  routes: [
    {
      fromHubId: 'prayagraj-junction',
      toDestId: 'triveni-sangam',
      primaryMode: 'auto',
      duration: '20 mins',
      cost: '₹30 E-rickshaw / ₹120 Private Auto',
      transfers: 0,
      instructions: 'Exit from Platform 1 side. Take a direct E-rickshaw heading towards Sangam Bandha / Daraganj.'
    },
    {
      fromHubId: 'prayagraj-junction',
      toDestId: 'anand-bhavan',
      primaryMode: 'auto',
      duration: '12 mins',
      cost: '₹20 E-rickshaw / ₹80 Auto',
      transfers: 0,
      instructions: 'Exit from Civil Lines side (Platform 6/7). Board an E-rickshaw up MG Marg to Church Road.'
    },
    {
      fromHubId: 'prayagraj-junction',
      toDestId: 'khusro-bagh',
      primaryMode: 'walk',
      duration: '5 mins',
      cost: 'Free',
      transfers: 0,
      instructions: 'Exit from Platform 1/2 in Lukarganj. Khusro Bagh grand gateway is 400m directly west.'
    },
    {
      fromHubId: 'prayagraj-junction',
      toDestId: 'all-saints-cathedral',
      primaryMode: 'auto',
      duration: '8 mins',
      cost: '₹15 E-rickshaw',
      transfers: 0,
      instructions: 'Exit to Civil Lines. Ride straight along MG Marg to the Patthar Girja central roundabout.'
    },
    {
      fromHubId: 'prayagraj-sangam',
      toDestId: 'triveni-sangam',
      primaryMode: 'walk',
      duration: '10 mins walk or 3m E-rickshaw',
      cost: 'Free or ₹10 E-rickshaw',
      transfers: 0,
      instructions: 'Station is located right at the edge of the Mela ground. Walk straight to the Sangam embankment.'
    },
    {
      fromHubId: 'daraganj-ghat',
      toDestId: 'triveni-sangam',
      primaryMode: 'boat',
      duration: '15 mins',
      cost: '₹100-150 per head',
      transfers: 0,
      instructions: 'Board a wooden boat at Daraganj Ghat directly to the mid-river wooden Sangam snan platform.'
    },
  ],

  zones: [
    {
      id: 'sangam-zone',
      name: 'Sangam & Kumbh Zone',
      tagline: 'Sacred waters, ancient forts & temple traditions',
      highlights: ['Triveni Sangam', "Akbar's Fort", 'Lete Hanuman Ji', 'Alopi Devi'],
      bestBaseFor: 'Pilgrimage, river sunrises, boat tours & Magh Mela ceremonies'
    },
    {
      id: 'civil-lines-zone',
      name: 'Civil Lines Colonial Hub',
      tagline: 'Gothic architecture, heritage homes & premier dining',
      highlights: ['All Saints Cathedral', 'Anand Bhavan', 'Azad Park', 'High Street Malls'],
      bestBaseFor: 'Leisure travelers, colonial walks, boutique stays & evening dining'
    },
    {
      id: 'chowk-zone',
      name: 'Chowk & Old Heritage Hub',
      tagline: 'Mughal mausoleums, traditional sweets & 1854 kachoris',
      highlights: ['Khusro Bagh', 'Chowk Ghantaghar', 'Netram Kachori', 'Loknath Gali'],
      bestBaseFor: 'Culinary foodies, street photographers, spice shopping & train transit'
    },
    {
      id: 'yamuna-zone',
      name: 'Naini & Yamuna Riverfront',
      tagline: 'Cable-stayed bridges, river bluffs & gull watching',
      highlights: ['Boat Club', 'Minto Park', 'New Yamuna Bridge', 'Sujan Deo Fort'],
      bestBaseFor: 'Sunset boating, water photography & peaceful river trails'
    }
  ]
};

export default prayagrajTransport;
