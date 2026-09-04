/**
 * ==============================================================================
 * DELHI ITINERARY PLANNER DATASET
 * TODO: Supabase table: itinerary_templates
 * ==============================================================================
 */

export const plannerPresets = {
  paceOptions: [
    { id: 'relaxed', label: 'Relaxed (2 sites/day)', desc: 'Ample time for photography and tea stalls' },
    { id: 'balanced', label: 'Balanced (3–4 sites/day)', desc: 'Standard cultural pace with lunch pause' },
    { id: 'intense', label: 'Intense (5+ sites/day)', desc: 'First train to last train architectural survey' },
  ],
  interests: [
    { id: 'stepwells', label: 'Stepwells & Waterworks' },
    { id: 'mughal', label: 'Mughal Architecture' },
    { id: 'sultanate', label: 'Sultanate Dynasties' },
    { id: 'bazaars', label: 'Trading Lanes & Bazaars' },
    { id: 'botany', label: 'Heritage Gardens' },
  ],
  crowdPreferences: [
    { id: 'quiet', label: 'Prioritize low congestion', desc: 'Reroutes around peak tourist buses' },
    { id: 'balanced', label: 'Balanced timing', desc: 'Mix of prominent monuments and quiet courtyards' },
    { id: 'unrestricted', label: 'Standard tourist hours', desc: 'Direct chronological ordering' },
  ],
};

export const sampleGeneratedDayPlan = {
  dayNumber: 1,
  theme: 'Water Architecture & Imperial Dynasties',
  totalStops: 4,
  estimatedTransitTime: '55 mins total',
  totalTicketCost: '₹115',
  stops: [
    {
      time: '07:15 AM',
      placeName: 'Agrasen ki Baoli Stepwell',
      crowdLevel: 'low',
      metro: 'Barakhamba Road (Blue Line)',
      ticketFee: 'Free',
      note: 'Sunlight strikes the upper arches; descend before street vendors set up along the lane.',
    },
    {
      time: '09:30 AM',
      transit: '14 min metro • Yellow Line direct (Barakhamba to Central Secretariat)',
      placeName: 'National Museum Stone Sculptures',
      crowdLevel: 'low',
      metro: 'Udyog Bhawan (Yellow Line)',
      ticketFee: '₹20',
      note: 'Enter via Janpath gate. View the Mathura red sandstone Buddha in Gallery 2.',
    },
    {
      time: '01:45 PM',
      transit: '22 min metro • Yellow Line (Central Secretariat to Qutub Minar station)',
      placeName: 'Mehrauli Archaeological Park',
      crowdLevel: 'moderate',
      metro: 'Qutub Minar (Yellow Line)',
      ticketFee: 'Free',
      note: 'Follow the stone path behind Jamali Kamali mosque toward the 1287 tomb of Balban.',
    },
    {
      time: '04:45 PM',
      transit: '12 min auto-rickshaw • Via Lodhi Road (₹70)',
      placeName: 'Sunder Nursery Pavilion',
      crowdLevel: 'low',
      metro: 'JLN Stadium (Violet Line)',
      ticketFee: '₹50',
      note: 'Low sun angle illuminates the Persian double dome. Conclude the trail at the lakeside benches.',
    },
  ],
};
