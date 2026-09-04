/**
 * Delhi Specific SOS Emergency Dataset.
 * Includes Helpline numbers and location-scoped services.
 */

export const delhiHelplines = [
  { label: 'All-India Emergency', number: '112', description: 'Universal Police, Fire & Medical Control' },
  { label: 'Ambulance Dispatch', number: '102', description: '24/7 Medical Emergency Response' },
  { label: 'Women Helpline', number: '1091', description: 'Women Safety & Protection Cell' },
  { label: 'Child Helpline', number: '1098', description: 'National Child Protection Assistance' },
  { label: 'Tourist Helpline', number: '1363', description: '24/7 Tourist Assistance Desk' },
];

export const delhiSOSServices = [
  // 1. HOSPITAL
  {
    id: 'hosp-1',
    category: 'hospital',
    name: 'AIIMS New Delhi Emergency Casualty',
    distance: '0.8 km away',
    address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi - 110029',
    phone: '011-26588500',
    type: '24/7 Level 1 Trauma Center',
    isEmergencyReady: true,
  },
  {
    id: 'hosp-2',
    category: 'hospital',
    name: 'Safdarjung Hospital Emergency Block',
    distance: '1.2 km away',
    address: 'Ring Road, Opposite AIIMS, New Delhi - 110029',
    phone: '011-26165060',
    type: 'Govt Super Speciality & Burn ICU',
    isEmergencyReady: true,
  },
  {
    id: 'hosp-3',
    category: 'hospital',
    name: 'Max Super Speciality Hospital Saket',
    distance: '3.4 km away',
    address: '1, 2 Press Enclave Marg, Saket, New Delhi - 110017',
    phone: '011-26515050',
    type: 'Private Cardiac & Trauma Care',
    isEmergencyReady: true,
  },

  // 2. POLICE
  {
    id: 'pol-1',
    category: 'police',
    name: 'Delhi Police Control Room (PCR Central)',
    distance: '0.4 km away',
    address: 'Jai Singh Road, Connaught Place, New Delhi - 110001',
    phone: '112',
    type: 'National Emergency Helpline (112)',
    isEmergencyReady: true,
  },
  {
    id: 'pol-2',
    category: 'police',
    name: 'Connaught Place Police Station',
    distance: '1.1 km away',
    address: 'Parliament Street, Connaught Place, New Delhi - 110001',
    phone: '011-23747100',
    type: 'Jurisdiction Police Station',
    isEmergencyReady: true,
  },
  {
    id: 'pol-3',
    category: 'police',
    name: 'Delhi Tourist Police Helpline Desk',
    distance: '1.5 km away',
    address: 'Palika Bazaar, Connaught Place, New Delhi - 110001',
    phone: '011-23311234',
    type: 'Foreign Tourist Protection Assistance',
    isEmergencyReady: true,
  },

  // 3. MECHANIC
  {
    id: 'mech-1',
    category: 'mechanic',
    name: '24x7 Roadside Vehicle Assistance & Towing',
    distance: '0.6 km away',
    address: 'Janpath Lane, Connaught Circus, New Delhi',
    phone: '+91 98100 12345',
    type: 'Mobile Breakdown & Battery Jumpstart',
    isEmergencyReady: true,
  },
  {
    id: 'mech-2',
    category: 'mechanic',
    name: 'Connaught Automobile Repair & Flat Tyre',
    distance: '1.3 km away',
    address: 'Outer Circle E-Block, CP, New Delhi',
    phone: '+91 98711 54321',
    type: 'Puncture Repair & Engine Diagnostics',
    isEmergencyReady: false,
  },

  // 4. PETROL
  {
    id: 'pet-1',
    category: 'petrol',
    name: 'IndianOil 24x7 Fuel Station Janpath',
    distance: '0.5 km away',
    address: 'Janpath Road near Windsor Place, New Delhi',
    phone: '011-23351212',
    type: 'EV Fast Charging + Petrol/Diesel/CNG',
    isEmergencyReady: true,
  },
  {
    id: 'pet-2',
    category: 'petrol',
    name: 'Bharat Petroleum Station Ring Road',
    distance: '1.8 km away',
    address: 'Moolchand Flyover Underpass, Ring Road, New Delhi',
    phone: '011-26431920',
    type: 'Petrol & Nitrogen Air Station',
    isEmergencyReady: true,
  },

  // 5. AMENITIES
  {
    id: 'amen-1',
    category: 'amenities',
    name: 'Smart Public Washroom & Tourist Rest Stop',
    distance: '0.3 km away',
    address: 'Rajiv Chowk Metro Station Gate 2, CP',
    phone: '1800-11-0033',
    type: 'Clean Sanitation & Drinking Water Kiosk',
    isEmergencyReady: true,
  },
  {
    id: 'amen-2',
    category: 'amenities',
    name: 'Apollo 24x7 Pharmacy & First Aid Desk',
    distance: '0.9 km away',
    address: 'Inner Circle F-Block, Connaught Place, New Delhi',
    phone: '011-23329988',
    type: '24 Hour Prescription Medicines & First Aid',
    isEmergencyReady: true,
  },
];

export const delhiSOSData = {
  helplines: delhiHelplines,
  services: delhiSOSServices,
};

export default delhiSOSData;
