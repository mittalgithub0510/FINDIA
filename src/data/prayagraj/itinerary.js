/**
 * PRAYAGRAJ ITINERARY PLANNER DATASET
 */

export const plannerPresets = {
  paceOptions: [
    { id: 'relaxed', label: 'Relaxed (2 sites/day)', desc: 'Ample time for boat rides, ghat snan, and tea stalls' },
    { id: 'balanced', label: 'Balanced (3–4 sites/day)', desc: 'Spiritual confluence morning with colonial architecture afternoon' },
    { id: 'intense', label: 'Intense (5+ sites/day)', desc: 'Dawn Sangam aarti to late evening Loknath sweet tasting' },
  ],
  interests: [
    { id: 'spiritual', label: 'Sacred Confluence & Temples' },
    { id: 'forts', label: 'Mughal Citadels & Tombs' },
    { id: 'independence', label: 'Freedom Struggle & Museums' },
    { id: 'food', label: 'Desi Ghee Kachoris & Sweets' },
    { id: 'colonial', label: 'Victorian Gothic & Bridges' },
  ],
  crowdPreferences: [
    { id: 'quiet', label: 'Prioritize low congestion', desc: 'Reroutes visits during early morning quiet river hours' },
    { id: 'balanced', label: 'Balanced timing', desc: 'Mix of sacred confluence and shaded garden monuments' },
    { id: 'unrestricted', label: 'Standard tourist hours', desc: 'Direct chronological ordering' },
  ],
};

export const sampleGeneratedDayPlan = {
  dayNumber: 1,
  theme: 'Holy Confluence & Freedom Legacies',
  totalStops: 4,
  estimatedTransitTime: '45 mins total',
  totalTicketCost: '₹80',
  stops: [
    {
      time: '05:45 AM',
      placeName: 'Triveni Sangam Boat & Snan',
      crowdLevel: 'moderate',
      metro: 'Daraganj Ghat (E-Rickshaw 10 mins)',
      ticketFee: '₹100 boat fare',
      note: 'Catch the sunrise mist over the Yamuna confluence before festival crowds gather.',
    },
    {
      time: '08:00 AM',
      transit: '10 min walk along Bandha Road',
      placeName: 'Bade Hanuman Ji Temple (Lete Hanuman)',
      crowdLevel: 'heavy',
      metro: 'Sangam Foreshore',
      ticketFee: 'Free',
      note: 'Seek morning blessings at the world-famous underground reclining Hanuman shrine.',
    },
    {
      time: '09:30 AM',
      transit: '15 min E-rickshaw to Chowk',
      placeName: 'Netram Moolchand & Sons (Chowk)',
      crowdLevel: 'moderate',
      metro: 'Chowk Ghantaghar',
      ticketFee: '₹120 meal',
      note: 'Famous 1854 pure desi ghee kachori, hing aloo sabzi, and piping hot jalebi breakfast.',
    },
    {
      time: '11:45 AM',
      transit: '12 min E-rickshaw to Civil Lines',
      placeName: 'Anand Bhavan & Jawahar Planetarium',
      crowdLevel: 'low',
      metro: 'Tagore Town / Civil Lines',
      ticketFee: '₹70 museum entry',
      note: 'Tour the preserved historic estate where the strategy for Indian independence was born.',
    },
  ],
};

export default {
  plannerPresets,
  sampleGeneratedDayPlan,
};
