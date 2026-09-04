/**
 * ==============================================================================
 * DELHI SAFETY & EMERGENCY DATASET
 * TODO: Supabase table: safety_contacts, police_booths & hospitals
 * ==============================================================================
 */

export const groundSafetyNotes = [
  {
    id: 'sn-1',
    title: 'Delhi Metro Security & Women Coaches',
    rule: 'The first coach in the direction of train travel on every Delhi Metro line is reserved exclusively for female commuters. Penalties for male entry are strictly enforced by CISF guards.',
  },
  {
    id: 'sn-2',
    title: 'Pre-Paid Taxi & Auto Booths',
    rule: 'At New Delhi and Old Delhi railway stations, avoid unmetered street cabs. Use the official Delhi Traffic Police Pre-Paid Taxi Booths located directly outside the station platforms.',
  },
  {
    id: 'sn-3',
    title: 'Monument Security & Photography Stand Permits',
    rule: 'Tripods, gimbals, and drone gear require advance written approval from the Archaeological Survey of India (24 Tilak Marg). Handheld cameras and mobile phones are permitted without permits.',
  },
  {
    id: 'sn-4',
    title: 'Emergency Medical Casualty Services',
    rule: 'AIIMS and Safdarjung Hospital operate 24-hour emergency trauma centers. Free ambulance dispatch is reached via 102 or universal emergency 112.',
  },
];

export const emergencyFacilities = [
  {
    name: 'Parliament Street Police Station',
    type: 'Police Headquarters',
    address: 'Sansad Marg, Connaught Place, New Delhi',
    phone: '011-23746600',
    distance: '800m from Rajiv Chowk Metro',
  },
  {
    name: 'Daryaganj Police Station (Old Delhi Circle)',
    type: 'Police Station',
    address: 'Netaji Subhash Marg, Daryaganj, Central Delhi',
    phone: '011-23274683',
    distance: '600m from Delhi Gate Metro',
  },
  {
    name: 'AIIMS Trauma Center & Casualty',
    type: '24/7 Government Hospital',
    address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi',
    phone: '011-26588500',
    distance: 'Directly linked to AIIMS Metro (Yellow Line)',
  },
  {
    name: 'Safdarjung Hospital Emergency Block',
    type: '24/7 Government Hospital',
    address: 'Ring Road, opposite AIIMS, New Delhi',
    phone: '011-26165060',
    distance: '300m from Dilli Haat INA Metro',
  },
];
