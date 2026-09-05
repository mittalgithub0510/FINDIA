/**
 * Prayagraj Specific SOS Emergency Dataset.
 * Includes Helpline numbers and location-scoped services.
 */

export const prayagrajHelplines = [
  { label: 'All-India Universal Emergency', number: '112', description: 'Universal Police, Fire & Medical Control' },
  { label: 'Ambulance Dispatch', number: '102', description: '24/7 Medical Emergency Response' },
  { label: 'Women Safety Helpline', number: '1091', description: 'Women Safety & Protection Cell' },
  { label: 'Kumbh & Tourist Helpline', number: '1920', description: '24/7 Pilgrimage & Tourist Assistance Desk' },
  { label: 'UP Tourist Police', number: '1800-180-5145', description: 'Statewide Visitor Support Desk' },
];

export const prayagrajSOSServices = [
  // 1. HOSPITAL
  {
    id: 'pry-hosp-1',
    category: 'hospital',
    name: 'Swaroop Rani Nehru (SRN) Hospital Trauma Centre',
    distance: '1.2 km away',
    address: 'MG Marg, Near Medical College, Prayagraj - 211001',
    phone: '0532-2256500',
    type: '24/7 Level 1 Trauma Center & Govt Hospital',
    isEmergencyReady: true,
  },
  {
    id: 'pry-hosp-2',
    category: 'hospital',
    name: 'Tej Bahadur Sapru (Beli) Hospital Emergency',
    distance: '1.8 km away',
    address: 'Stanley Road, Cantonment, Prayagraj - 211002',
    phone: '0532-2640300',
    type: 'Govt District Emergency Care',
    isEmergencyReady: true,
  },
  {
    id: 'pry-hosp-3',
    category: 'hospital',
    name: 'Nazareth Hospital Civil Lines',
    distance: '0.9 km away',
    address: '13/A, Kamla Nehru Road, Civil Lines, Prayagraj - 211001',
    phone: '0532-2460188',
    type: 'Private Multi-Speciality & Cardiac ICU',
    isEmergencyReady: true,
  },

  // 2. POLICE
  {
    id: 'pry-pol-1',
    category: 'police',
    name: 'Prayagraj Police Control Room (PCR 112)',
    distance: '0.5 km away',
    address: 'Police Lines, Civil Lines, Prayagraj - 211001',
    phone: '112',
    type: 'National Emergency Dispatch (112)',
    isEmergencyReady: true,
  },
  {
    id: 'pry-pol-2',
    category: 'police',
    name: 'Daraganj River Police Outpost (Sangam Ghats)',
    distance: '0.6 km away',
    address: 'Sangam Bandha Road, Daraganj, Prayagraj - 211006',
    phone: '0532-2500200',
    type: 'Water & Riverfront Safety Unit',
    isEmergencyReady: true,
  },
  {
    id: 'pry-pol-3',
    category: 'police',
    name: 'Kotwali Police Station (Old City Circle)',
    distance: '1.4 km away',
    address: 'Near Ghantaghar, Chowk, Prayagraj - 211003',
    phone: '0532-2400100',
    type: 'Urban Sector Police Station',
    isEmergencyReady: true,
  },

  // 3. MECHANIC
  {
    id: 'pry-mech-1',
    category: 'mechanic',
    name: 'Prayagraj 24/7 Highway Breakdown Assistance',
    distance: '1.1 km away',
    address: 'Civil Lines Crossing, Prayagraj - 211001',
    phone: '0532-2561100',
    type: '24/7 Car & Bike Roadside Assistance',
    isEmergencyReady: true,
  },
  {
    id: 'pry-mech-2',
    category: 'mechanic',
    name: 'Daraganj Auto & E-Rickshaw Repair Hub',
    distance: '0.7 km away',
    address: 'Near Sangam Station, Bandha Road, Prayagraj',
    phone: '0532-2501122',
    type: 'Emergency Puncture & Electrical Workshop',
    isEmergencyReady: true,
  },

  // 4. PETROL
  {
    id: 'pry-pet-1',
    category: 'petrol',
    name: 'Indian Oil 24/7 Auto Care Station',
    distance: '0.8 km away',
    address: 'Sardar Patel Marg, Civil Lines, Prayagraj - 211001',
    phone: '0532-2623344',
    type: '24/7 Fuel, EV Fast Charger & Air Refill',
    isEmergencyReady: true,
  },
  {
    id: 'pry-pet-2',
    category: 'petrol',
    name: 'HP Fuel Station Daraganj Bandha',
    distance: '1.2 km away',
    address: 'Bandha Road, Near Akbar Fort, Prayagraj - 211006',
    phone: '0532-2504455',
    type: '24/7 Petrol, Diesel & CNG Refill',
    isEmergencyReady: true,
  },

  // 5. AMENITIES
  {
    id: 'pry-amen-1',
    category: 'amenities',
    name: 'Mela Administration Public Pilgrim Restroom Complex',
    distance: '0.3 km away',
    address: 'Kali Marg, Sangam Foreshore, Prayagraj',
    phone: '1920',
    type: 'Free RO Drinking Water & Changing Facilities',
    isEmergencyReady: true,
  },
  {
    id: 'pry-amen-2',
    category: 'amenities',
    name: 'Civil Lines Municipal Smart Convenience Center',
    distance: '0.4 km away',
    address: 'MG Marg, Opposite High Court, Prayagraj',
    phone: '0532-2420011',
    type: 'Wheelchair-Friendly Modern Restroom & ATM',
    isEmergencyReady: true,
  },
];

export const prayagrajSOSData = {
  helplines: prayagrajHelplines,
  services: prayagrajSOSServices,
};

export default prayagrajSOSData;
