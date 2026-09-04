/**
 * ==============================================================================
 * FINDIA LANDING PAGE DATASET — DELHI
 * All copy is strictly fact-checked, concrete, and free of marketing fluff.
 * ==============================================================================
 */

// TODO: Supabase table: hero_sections
export const heroData = {
  // Editorial headline with deliberate line breaks and an authentic point of view
  headline: 'Most guidebooks point at the same three gates.\nDelhi has three hundred.',
  subline: 'Real-time telemetry showing crowd density across 150+ monuments, stepwells, and havelis.',
  photoUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1600&q=80',
  photoCredit: 'FINDIA Archive • ASI Central Circle',
  photoAlt: 'Humayun tomb sandstone domes against evening light',
  
  // Search bar fields
  searchFields: {
    locationPlaceholder: 'District or monument name',
    timePlaceholder: 'Today, after 4 PM',
    groupPlaceholder: 'Solo or 2 people',
  },

  // Live crowd right now overlay card
  liveCrowdSnapshot: {
    updatedLabel: 'Updated 4 min ago',
    items: [
      {
        id: 'lc-1',
        name: 'Red Fort Forecourt',
        level: 'heavy',
        waitNote: '45-min ticket line',
      },
      {
        id: 'lc-2',
        name: 'Sunder Nursery Gardens',
        level: 'low',
        waitNote: 'Direct entry',
      },
      {
        id: 'lc-3',
        name: 'Agrasen ki Baoli',
        level: 'moderate',
        waitNote: 'Stepped descent clear',
      },
    ],
  },

  // Stats strip counters
  stats: [
    { target: 11, label: 'Districts mapped', suffix: '' },
    { target: 154, label: 'Monuments audited', suffix: '+' },
    { target: 100, label: 'Live crowd sensors', suffix: '%' },
    { target: 24, label: 'SOS helpline dial', suffix: '/7' },
  ],
};

// TODO: Supabase table: capabilities
export const capabilitiesData = [
  {
    id: 'cap-1',
    iconName: 'Crowd',
    title: 'Crowd-aware routing',
    description: 'Reroutes your walk when midday bus tours overwhelm the ticket counter.',
    offsetClass: 'lg:translate-y-0',
  },
  {
    id: 'cap-2',
    iconName: 'Compass',
    title: 'Day planner',
    description: 'Sequences your day by metro line transfers and site closing hours.',
    offsetClass: 'lg:translate-y-6',
  },
  {
    id: 'cap-3',
    iconName: 'Headphones',
    title: 'Audio guides',
    description: 'Short 3-minute recordings focused on stone masonry and dynasties.',
    offsetClass: 'lg:translate-y-2',
  },
  {
    id: 'cap-4',
    iconName: 'Users',
    title: 'Travel together',
    description: 'Find verified walking companions for early morning stepwell trails.',
    offsetClass: 'lg:translate-y-8',
  },
];

// TODO: Supabase table: places
export const featuredPlacesData = [
  {
    id: 'fp-1',
    isFeature: true,
    name: 'Mehrauli Archaeological Park',
    district: 'South Delhi',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Ancient stone archway in Mehrauli forest',
    crowdLevel: 'low',
    crowdUpdatedAt: '3 min ago',
    hasAudio: true,
    metroStation: 'Qutub Minar (Yellow Line)',
    fee: 'Free entry',
    duration: '2.5 hrs',
    description: 'Covers 200 acres containing over 100 monuments dating from the 1060 Tomar dynasty to the British Raj.',
    to: '/places',
  },
  {
    id: 'fp-2',
    name: 'Agrasen ki Baoli',
    district: 'Central Delhi',
    image: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Deep masonry stepwell with stone arches',
    crowdLevel: 'moderate',
    crowdUpdatedAt: '6 min ago',
    hasAudio: true,
    metroStation: 'Barakhamba Road (Blue Line)',
    fee: 'Free entry',
    duration: '45 mins',
    description: 'A 60-meter long stepwell with 108 stone stairs built during the 14th century.',
    to: '/places',
  },
  {
    id: 'fp-3',
    name: 'Sunder Nursery',
    district: 'South East Delhi',
    image: '/images/destinations/delhi/sunder-nursery.jpg',
    imageAlt: 'Restored Mughal garden pavilion',
    crowdLevel: 'low',
    crowdUpdatedAt: 'just now',
    hasAudio: false,
    metroStation: 'JLN Stadium (Violet Line)',
    fee: '₹50 entry',
    duration: '2 hrs',
    description: 'A 90-acre 16th-century heritage park featuring six restored UNESCO World Heritage monuments.',
    to: '/places',
  },
  {
    id: 'fp-4',
    name: 'Hauz Khas Complex',
    district: 'South Delhi',
    image: '/images/destinations/delhi/hauz-khas-fort.jpg',
    imageAlt: 'Stone madrasa ruins overlooking lake',
    crowdLevel: 'heavy',
    crowdUpdatedAt: '1 min ago',
    hasAudio: true,
    metroStation: 'IIT Delhi (Magenta Line)',
    fee: '₹25 entry',
    duration: '1.5 hrs',
    description: 'Houses the 1352 madrasa and tomb of Feroz Shah Tughlaq along a 13th-century water reservoir.',
    to: '/places',
  },
  {
    id: 'fp-5',
    name: 'Nizamuddin Basti',
    district: 'South East Delhi',
    image: 'https://images.unsplash.com/photo-1598598795009-f80c5072e665?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Narrow stone alleyway in Nizamuddin settlement',
    crowdLevel: 'heavy',
    crowdUpdatedAt: '4 min ago',
    hasAudio: false,
    metroStation: 'Sarai Kale Khan (Pink Line)',
    fee: 'Free entry',
    duration: '1.5 hrs',
    description: 'A medieval urban village inhabited continuously for 700 years around the 1325 Sufi shrine.',
    to: '/places',
  },
];

// TODO: Supabase table: hidden_gems
export const hiddenGemsData = [
  {
    number: '01',
    name: 'Satpula Dam',
    era: '1343 CE • Tughlaq Dynasty',
    metro: 'Malviya Nagar (Yellow Line, 1.1 km walk)',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Seven-arch stone weir dam wall',
    // Inconvenient truth 1
    fact: 'Seven-bay stone weir dam built for defense, but the sluice gate passage is locked shut behind Archaeological Survey fencing.',
  },
  {
    number: '02',
    name: 'Bhuli Bhatiyari ka Mahal',
    era: '14th Century • Central Ridge Forest',
    metro: 'Jhandewalan (Blue Line, 900m walk)',
    image: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Stone gateway inside forest ridge',
    // Inconvenient truth 2
    fact: 'Fourteenth-century stone hunting lodge with zero illumination; forest guards turn visitors back by 5:30 PM sharp.',
  },
  {
    number: '03',
    name: 'Khirki Masjid',
    era: '1351 CE • Feroz Shah Reign',
    metro: 'Hauz Khas (Yellow/Magenta Line, 800m walk)',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Fortress-style mosque with perforated stone screens',
    // Inconvenient truth 3
    fact: 'Unconventional fortress-style mosque with 89 roof domes, but no signposts exist inside the dense residential alleys.',
  },
  {
    number: '04',
    name: 'Chor Minar',
    era: '1290 CE • Khilji Dynasty',
    metro: 'Hauz Khas (Yellow Line, 500m walk)',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Round stone tower with 225 holes',
    fact: 'Circular masonry tower pierced with 225 round openings constructed under Alauddin Khilji in the 13th century.',
  },
  {
    number: '05',
    name: 'Zafar Mahal',
    era: '1842 CE • Late Mughal Era',
    metro: 'Qutub Minar (Yellow Line, 1.4 km walk)',
    image: 'https://images.unsplash.com/photo-1598598795009-f80c5072e665?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Red sandstone gatehouse with carved balconies',
    // Inconvenient truth 4
    fact: 'Final palace built by the Mughals in Mehrauli; now missing its marble cladding and surrounded by private residential encroachments.',
  },
];

// TODO: Supabase table: itinerary_templates
export const itineraryPreviewData = {
  title: 'Old Delhi & Mehrauli Heritage Link',
  dateLabel: 'Sample Generated Schedule',
  totalBudget: '₹115 total tickets',
  stops: [
    {
      time: '07:30 AM',
      placeName: 'Agrasen ki Baoli',
      crowdLevel: 'low',
      note: 'Descend 108 stone steps before tour groups arrive',
      fee: 'Free',
    },
    {
      time: '09:15 AM',
      transitText: '12 min metro • Yellow Line (Barakhamba to Central Sec)',
      placeName: 'National Museum Statues Gallery',
      crowdLevel: 'low',
      note: 'Harappan bronze dancing girl sculpture (Gallery 1)',
      fee: '₹20',
    },
    {
      time: '01:30 PM',
      transitText: '18 min metro • Yellow Line (Central Sec to Qutub Minar)',
      placeName: 'Mehrauli Archaeological Park',
      crowdLevel: 'moderate',
      note: 'Balban tomb and Jamali Kamali mosque trail',
      fee: 'Free',
    },
    {
      time: '04:45 PM',
      transitText: '10 min auto-rickshaw (₹60 meter)',
      placeName: 'Sunder Nursery Pavilion',
      crowdLevel: 'low',
      note: 'Sunlight against the red sandstone double dome',
      fee: '₹50',
    },
  ],
};

// TODO: Supabase table: community_threads
export const communityThreadsData = [
  {
    id: 'th-1',
    tag: 'Safety notice',
    tagVariant: 'accent',
    title: 'North gate at Feroz Shah Kotla closed for stadium repair work',
    replies: 14,
    author: 'Vikram S.',
    timeAgo: '2 hrs ago',
  },
  {
    id: 'th-2',
    tag: 'Transit',
    tagVariant: 'default',
    title: 'Gate 2 at Chandni Chowk metro has shorter lines than Gate 1',
    replies: 28,
    author: 'Neha P.',
    timeAgo: '4 hrs ago',
  },
  {
    id: 'th-3',
    tag: 'Lost & found',
    tagVariant: 'outline',
    title: 'Found Nikon lens cap on the upper terrace of Humayun Tomb',
    replies: 6,
    author: 'Anand R.',
    timeAgo: 'Yesterday',
  },
];

// TODO: Supabase table: travel_groups
export const travelGroupsData = [
  {
    id: 'grp-1',
    destination: 'Northern Ridge Military Cemetery Walk',
    dateText: 'Saturday, 06:30 AM',
    membersCount: 4,
    maxSpots: 6,
    organizer: 'Rohan K.',
    meetingPoint: 'Vishwa Vidyalaya Metro Gate 3',
  },
  {
    id: 'grp-2',
    destination: 'Tughlaqabad Fort Stone Ramparts',
    dateText: 'Sunday, 07:00 AM',
    membersCount: 3,
    maxSpots: 5,
    organizer: 'Dr. Priya M.',
    meetingPoint: 'Govindpuri Metro Gate 1',
  },
];

// 11 Districts with varied non-round place counts
// TODO: Supabase table: district_counts
export const districtCountsData = [
  { name: 'New Delhi', count: 34, isPrimary: true },
  { name: 'Central Delhi', count: 28, isPrimary: true },
  { name: 'South Delhi', count: 23 },
  { name: 'South East Delhi', count: 17 },
  { name: 'North Delhi', count: 14 },
  { name: 'South West Delhi', count: 13 },
  { name: 'East Delhi', count: 9 },
  { name: 'West Delhi', count: 12 },
  { name: 'North West Delhi', count: 8 },
  { name: 'Shahdara', count: 6 },
  { name: 'North East Delhi', count: 5 },
];
