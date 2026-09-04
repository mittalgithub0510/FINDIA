/**
 * Single source of truth for FINDIA Delhi Transport MVP Data.
 * Fully structured for future FINDIA AI decision engine integration.
 */

export const delhiTransport = {
  modes: [
    {
      id: 'metro',
      name: 'Delhi Metro',
      shortLabel: 'Fast & affordable',
      iconName: 'Metro',
      description: 'A practical, air-conditioned option for covering longer distances across major parts of Delhi without traffic delays.',
      avgCost: '₹10 – ₹60',
      speedRating: 'Fastest',
      bestFor: 'Inter-district travel & major tourist corridors'
    },
    {
      id: 'bus',
      name: 'DTC & Cluster Buses',
      shortLabel: 'Wide city coverage',
      iconName: 'Bus',
      description: 'Comprehensive road transport connecting heritage neighborhoods, markets, and locations beyond metro lines.',
      avgCost: '₹5 – ₹25',
      speedRating: 'Moderate',
      bestFor: 'Budget travelers & scenic surface routes'
    },
    {
      id: 'auto',
      name: 'Auto / E-Rickshaw',
      shortLabel: 'Useful for last-mile travel',
      iconName: 'Navigation',
      description: 'Ideal for short hops between metro stations and inner heritage alleys (like Chandni Chowk or Nizamuddin).',
      avgCost: '₹30 – ₹150',
      speedRating: 'Agile in congestion',
      bestFor: 'Last-mile connectivity & narrow market lanes'
    },
    {
      id: 'cab',
      name: 'Cab / Ride Hailing',
      shortLabel: 'Door-to-door convenience',
      iconName: 'Car',
      description: 'Comfortable app-based taxis for group travel, luggage-heavy journeys, or late evening explorations.',
      avgCost: '₹150 – ₹500',
      speedRating: 'Varies with traffic',
      bestFor: 'Direct hotel transfers & family groups'
    },
    {
      id: 'walk',
      name: 'Walking / Heritage Trails',
      shortLabel: 'Best for nearby attractions',
      iconName: 'Walk',
      description: 'Best way to absorb the rich architecture, local street food, and historic ambience in compact zones.',
      avgCost: 'Free',
      speedRating: 'Leisurely',
      bestFor: 'Historical walks, garden precincts & markets'
    }
  ],

  destinations: [
    { id: 'india-gate', name: 'India Gate', zone: 'central-delhi', type: 'tourist-attraction', metroStation: 'Central Secretariat (Yellow/Violet Line)' },
    { id: 'red-fort', name: 'Red Fort (Lal Qila)', zone: 'old-delhi', type: 'tourist-attraction', metroStation: 'Lal Qila (Violet Line)' },
    { id: 'jama-masjid', name: 'Jama Masjid', zone: 'old-delhi', type: 'tourist-attraction', metroStation: 'Jama Masjid (Violet Line)' },
    { id: 'chandni-chowk', name: 'Chandni Chowk Market', zone: 'old-delhi', type: 'tourist-attraction', metroStation: 'Chandni Chowk (Yellow Line)' },
    { id: 'qutub-minar', name: 'Qutub Minar', zone: 'south-delhi', type: 'tourist-attraction', metroStation: 'Qutab Minar (Yellow Line)' },
    { id: 'humayuns-tomb', name: 'Humayun\'s Tomb', zone: 'south-delhi', type: 'tourist-attraction', metroStation: 'JLN Stadium / Supreme Court' },
    { id: 'lotus-temple', name: 'Lotus Temple', zone: 'south-delhi', type: 'tourist-attraction', metroStation: 'Kalkaji Mandir (Violet/Magenta Line)' },
    { id: 'akshardham', name: 'Swaminarayan Akshardham', zone: 'east-delhi', type: 'tourist-attraction', metroStation: 'Akshardham (Blue Line)' },
    { id: 'agrasen-ki-baoli', name: 'Agrasen Ki Baoli', zone: 'central-delhi', type: 'tourist-attraction', metroStation: 'Janpath (Violet Line)' },
    { id: 'jantar-mantar', name: 'Jantar Mantar', zone: 'central-delhi', type: 'tourist-attraction', metroStation: 'Patel Chowk / Rajiv Chowk' },
    { id: 'connaught-place', name: 'Connaught Place (CP)', zone: 'central-delhi', type: 'tourist-attraction', metroStation: 'Rajiv Chowk (Yellow/Blue Line)' },
    { id: 'hauz-khas-village', name: 'Hauz Khas Village & Fort', zone: 'south-delhi', type: 'tourist-attraction', metroStation: 'IIT / Green Park (Yellow/Magenta)' }
  ],

  hubs: [
    {
      id: 'rajiv-chowk',
      name: 'Rajiv Chowk',
      type: 'Metro Interchange (Yellow & Blue Lines)',
      usefulFor: ['Connaught Place', 'Central Delhi', 'Jantar Mantar', 'Agrasen Ki Baoli'],
      modesAvailable: ['Metro', 'Auto', 'Cab', 'Walking'],
      notes: 'Delhi’s busiest central transit hub. High connectivity to all city quadrants.'
    },
    {
      id: 'new-delhi-railway',
      name: 'New Delhi Railway Station (NDLS)',
      type: 'Major Rail & Airport Express Hub',
      usefulFor: ['Paharganj', 'Connaught Place', 'Old Delhi Access', 'Airport Express Line'],
      modesAvailable: ['Metro', 'Train', 'Auto', 'Cab'],
      notes: 'Direct connection to IGI Airport via Airport Express Line (approx. 20 min).'
    },
    {
      id: 'kashmere-gate',
      name: 'Kashmere Gate ISBT & Metro',
      type: 'Triple Line Metro Interchange & Bus Terminal',
      usefulFor: ['Old Delhi Heritage', 'Red Fort', 'Interstate Bus Travel (ISBT)'],
      modesAvailable: ['Metro', 'Interstate Bus', 'Auto', 'Cab'],
      notes: 'Interchange for Red, Yellow, and Violet lines. Major gateway for northern states.'
    },
    {
      id: 'central-secretariat',
      name: 'Central Secretariat',
      type: 'Metro Interchange (Yellow & Violet Lines)',
      usefulFor: ['India Gate', 'Kartavya Path', 'Rashtrapati Bhavan', 'National Museum'],
      modesAvailable: ['Metro', 'Auto', 'Walking'],
      notes: 'Best metro exit for exploring the central ceremonial axis on foot or by auto.'
    },
    {
      id: 'hazrat-nizamuddin',
      name: 'Hazrat Nizamuddin Railway Station',
      type: 'Rail Station & Pink Line Metro Connection',
      usefulFor: ['Humayun\'s Tomb', 'Nizamuddin Dargah', 'Sunder Nursery'],
      modesAvailable: ['Metro (Pink Line)', 'Train', 'Auto', 'Cab'],
      notes: 'Convenient entry point for southern heritage monuments and express trains.'
    },
    {
      id: 'igi-airport',
      name: 'IGI Airport (T1, T2 & T3)',
      type: 'International Airport & Express Metro Hub',
      usefulFor: ['Aerocity', 'Global Travelers', 'Direct Metro to Central Delhi'],
      modesAvailable: ['Airport Express Metro', 'Prepaid Taxi', 'App Cabs'],
      notes: 'Orange Line provides rapid 20-minute connection to Rajiv Chowk / New Delhi station.'
    }
  ],

  zones: [
    {
      id: 'old-delhi',
      name: 'Old Delhi (Shahjahanabad)',
      description: 'Historic walled city featuring Mughal architecture, vibrant bazaars, and legendary street food precincts.',
      attractions: ['Red Fort', 'Jama Masjid', 'Chandni Chowk Market'],
      recommendedTransport: 'Metro (Violet / Yellow Line) + Cycle Rickshaw or Walking',
      metroConnectivity: 'Chandni Chowk, Lal Qila & Jama Masjid stations',
      travelTip: 'Heavy traffic zone. Avoid cabs inside markets; walk or use cycle-rickshaws.'
    },
    {
      id: 'central-delhi',
      name: 'Central Delhi (Lutyens\' Zone)',
      description: 'Grand avenues, government monuments, spacious parks, colonial arcades, and cultural centers.',
      attractions: ['India Gate', 'Connaught Place', 'Jantar Mantar', 'Agrasen Ki Baoli'],
      recommendedTransport: 'Metro to Rajiv Chowk or Central Secretariat + Short Auto / Walk',
      metroConnectivity: 'Rajiv Chowk, Central Secretariat, Janpath & Patel Chowk',
      travelTip: 'Extremely pedestrian-friendly with wide sidewalks around Kartavya Path and CP.'
    },
    {
      id: 'south-delhi',
      name: 'South Delhi (Heritage & Lifestyle)',
      description: 'Green urban forests, ancient Sultanate ruins, spiritual temples, and trendy food villages.',
      attractions: ['Qutub Minar', 'Humayun\'s Tomb', 'Lotus Temple', 'Hauz Khas Village'],
      recommendedTransport: 'Metro (Yellow & Magenta Lines) + Last-mile Auto',
      metroConnectivity: 'Qutab Minar, Kalkaji Mandir, JLN Stadium & IIT',
      travelTip: 'Auto-rickshaws are abundant outside all major South Delhi metro exits.'
    },
    {
      id: 'east-delhi',
      name: 'East Delhi (Trans-Yamuna)',
      description: 'Modern riverfront cultural complexes, sprawling temples, and outer connectivity corridors.',
      attractions: ['Swaminarayan Akshardham'],
      recommendedTransport: 'Direct Metro (Blue Line)',
      metroConnectivity: 'Akshardham Metro Station',
      travelTip: 'The Akshardham station leads directly to the temple complex gate.'
    }
  ],

  routes: [
    {
      id: 'rajiv-chowk-india-gate',
      fromId: 'rajiv-chowk',
      fromName: 'Rajiv Chowk (CP)',
      toId: 'india-gate',
      toName: 'India Gate',
      distanceApprox: '3.8 km',
      options: [
        {
          mode: 'metro',
          label: 'Metro (Yellow Line) + Short Walk / Auto',
          estimatedTime: '20–25 min',
          estimatedFare: '₹20–₹30',
          transfers: 0,
          notes: 'Take Yellow Line to Central Secretariat (2 stops), then walk 10 mins or take ₹30 auto along Kartavya Path.'
        },
        {
          mode: 'auto',
          label: 'Direct Auto-Rickshaw',
          estimatedTime: '15–20 min',
          estimatedFare: '₹70–₹100',
          transfers: 0,
          notes: 'Direct route via Janpath and Rajpath. Best for scenic surface views of government avenues.'
        },
        {
          mode: 'cab',
          label: 'App Cab / Taxi',
          estimatedTime: '15–25 min',
          estimatedFare: '₹120–₹180',
          transfers: 0,
          notes: 'Door-to-door. Drop point near C-Hexagon parking plaza.'
        }
      ]
    },
    {
      id: 'rajiv-chowk-red-fort',
      fromId: 'rajiv-chowk',
      fromName: 'Rajiv Chowk (CP)',
      toId: 'red-fort',
      toName: 'Red Fort (Lal Qila)',
      distanceApprox: '5.2 km',
      options: [
        {
          mode: 'metro',
          label: 'Metro (Yellow Line ➔ Violet Line)',
          estimatedTime: '20–25 min',
          estimatedFare: '₹20–₹30',
          transfers: 1,
          notes: 'Take Yellow Line to Kashmere Gate, switch to Violet Line (1 stop to Lal Qila station). Exit Gate 4 directly facing Red Fort.'
        },
        {
          mode: 'auto',
          label: 'Auto-Rickshaw via Netaji Subhash Marg',
          estimatedTime: '25–35 min',
          estimatedFare: '₹100–₹140',
          transfers: 0,
          notes: 'Expect market congestion during peak afternoon hours.'
        },
        {
          mode: 'cab',
          label: 'Cab / Taxi',
          estimatedTime: '25–40 min',
          estimatedFare: '₹150–₹220',
          transfers: 0,
          notes: 'Drop-off at Red Fort main parking area.'
        }
      ]
    },
    {
      id: 'new-delhi-railway-qutub-minar',
      fromId: 'new-delhi-railway',
      fromName: 'New Delhi Station (NDLS)',
      toId: 'qutub-minar',
      toName: 'Qutub Minar',
      distanceApprox: '15.5 km',
      options: [
        {
          mode: 'metro',
          label: 'Direct Metro (Yellow Line)',
          estimatedTime: '35–40 min',
          estimatedFare: '₹40–₹50',
          transfers: 0,
          notes: 'Board Yellow Line towards HUDA City Centre. Get down at Qutab Minar station. Take 5-min auto to complex entry.'
        },
        {
          mode: 'cab',
          label: 'App Cab / Taxi',
          estimatedTime: '45–60 min',
          estimatedFare: '₹300–₹450',
          transfers: 0,
          notes: 'Crosses Sri Aurobindo Marg. Travel time varies significantly during evening rush.'
        }
      ]
    },
    {
      id: 'central-secretariat-humayuns-tomb',
      fromId: 'central-secretariat',
      fromName: 'Central Secretariat',
      toId: 'humayuns-tomb',
      toName: 'Humayun\'s Tomb',
      distanceApprox: '6.0 km',
      options: [
        {
          mode: 'metro',
          label: 'Metro (Violet Line) + Auto',
          estimatedTime: '20–30 min',
          estimatedFare: '₹30–₹50',
          transfers: 0,
          notes: 'Take Violet Line towards Raja Nahar Singh to JLN Stadium station. Take a 5-minute auto (₹40) to Mathura Road gate.'
        },
        {
          mode: 'auto',
          label: 'Direct Auto-Rickshaw',
          estimatedTime: '20–25 min',
          estimatedFare: '₹90–₹130',
          transfers: 0,
          notes: 'Scenic drive past India Gate and Nizamuddin heritage zone.'
        }
      ]
    },
    {
      id: 'rajiv-chowk-akshardham',
      fromId: 'rajiv-chowk',
      fromName: 'Rajiv Chowk (CP)',
      toId: 'akshardham',
      toName: 'Swaminarayan Akshardham',
      distanceApprox: '9.0 km',
      options: [
        {
          mode: 'metro',
          label: 'Direct Metro (Blue Line)',
          estimatedTime: '20–25 min',
          estimatedFare: '₹30–₹40',
          transfers: 0,
          notes: 'Take Blue Line towards Noida Electronic City. Get off at Akshardham station (5 stops). Walkway leads directly to temple complex.'
        },
        {
          mode: 'cab',
          label: 'App Cab / Taxi',
          estimatedTime: '25–35 min',
          estimatedFare: '₹200–₹300',
          transfers: 0,
          notes: 'Crosses Yamuna river via Nizamuddin Bridge.'
        }
      ]
    },
    {
      id: 'red-fort-jama-masjid',
      fromId: 'red-fort',
      fromName: 'Red Fort (Lal Qila)',
      toId: 'jama-masjid',
      toName: 'Jama Masjid',
      distanceApprox: '1.2 km',
      options: [
        {
          mode: 'walk',
          label: 'Heritage Walk',
          estimatedTime: '12–15 min',
          estimatedFare: 'Free',
          transfers: 0,
          notes: 'Straight walk along Netaji Subhash Marg into Meena Bazaar lane. Essential heritage experience.'
        },
        {
          mode: 'auto',
          label: 'Cycle Rickshaw / E-Rickshaw',
          estimatedTime: '8–10 min',
          estimatedFare: '₹30–₹50',
          transfers: 0,
          notes: 'Traditional cycle-rickshaws provide easy navigation through bazaar crowds.'
        }
      ]
    },
    {
      id: 'igi-airport-connaught-place',
      fromId: 'igi-airport',
      fromName: 'IGI Airport (T3)',
      toId: 'connaught-place',
      toName: 'Connaught Place (CP)',
      distanceApprox: '16.0 km',
      options: [
        {
          mode: 'metro',
          label: 'Airport Express Metro (Orange Line)',
          estimatedTime: '20–25 min',
          estimatedFare: '₹60',
          transfers: 0,
          notes: 'High-speed luggage-friendly express train from IGI Airport T3 directly to New Delhi station / Shivaji Stadium.'
        },
        {
          mode: 'cab',
          label: 'Prepaid Airport Taxi / Cab',
          estimatedTime: '40–55 min',
          estimatedFare: '₹400–₹600',
          transfers: 0,
          notes: 'Direct hotel drop-off via Dhaula Kuan corridor.'
        }
      ]
    }
  ]
};

export default delhiTransport;
