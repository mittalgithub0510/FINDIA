/**
 * Community Forum & Field Telemetry Dataset for Prayagraj
 */

export const CHANNELS = [
  { id: 'all', label: 'All Discussions' },
  { id: 'sangam-alerts', label: 'Sangam Live Alerts' },
  { id: 'boating-tips', label: 'Boat Fare & Bargaining' },
  { id: 'food-discoveries', label: 'Authentic Street Food' },
  { id: 'heritage-walks', label: 'Colonial & Fort Heritage' },
];

export const INITIAL_THREADS = [
  {
    id: 'thread-pry-1',
    channel: 'sangam-alerts',
    title: 'Morning Sangam Aarti timing and sunrise boat advice (Magh season)',
    author: 'Prayag_Pilgrim_99',
    authorBadge: 'Local Guide Level 4',
    createdAt: '25 mins ago',
    upvotes: 42,
    downvotes: 1,
    commentCount: 14,
    placeSlug: 'triveni-sangam',
    placeName: 'Triveni Sangam',
    content: 'If you want to witness the magical sunrise over the confluence without chaotic crowds, reach Qila Ghat by 5:30 AM. Fixed official rates for rowboats are ₹100-150 per person on shared pontoon boats. Don’t pay more than ₹800 for a private 6-person boat. Water is crystal clear near the Yamuna side right now!',
    tags: ['Sunrise', 'Boating', 'Sangam', 'CrowdTips'],
  },
  {
    id: 'thread-pry-2',
    channel: 'food-discoveries',
    title: 'Netram Kachori morning queue vs Loknath Gali evening sweets',
    author: 'Gourmet_Shukla',
    authorBadge: 'Culinary Contributor',
    createdAt: '2 hours ago',
    upvotes: 38,
    downvotes: 0,
    commentCount: 9,
    placeSlug: 'netram-kachori',
    placeName: 'Netram Moolchand & Sons',
    content: 'Pro tip for food lovers: Hit Netram at Chowk between 8:00 AM and 9:30 AM for the freshest batch of desi ghee kachoris with hing aloo. Then spend the evening in Loknath Gali for hot Dehati Rasgulle and Hari Ram kulfi. Pure bliss!',
    tags: ['FoodWalk', 'Kachori', 'Sweets', 'Chowk'],
  },
  {
    id: 'thread-pry-3',
    channel: 'heritage-walks',
    title: 'Patalpuri underground temple and Akshayavat visiting rules at Allahabad Fort',
    author: 'HeritageHunter_UP',
    authorBadge: 'ASI Volunteer',
    createdAt: '5 hours ago',
    upvotes: 29,
    downvotes: 2,
    commentCount: 7,
    placeSlug: 'allahabad-fort',
    placeName: 'Allahabad Fort & Patalpuri',
    content: 'Security was smooth today. Carry an original Aadhaar card for quick entry into the military-managed corridor leading to Patalpuri Temple. Photography is prohibited inside the inner subterranean sanctum, but the views of the Yamuna from the outer ramparts are completely open.',
    tags: ['AkbarFort', 'Akshayavat', 'SecurityGuidelines'],
  },
];

export const TOP_REPUTATION_USERS = [
  { name: 'Dr. Anand Tiwari', reputation: '1,840 pts', badge: 'Maha Kumbh Historian', contributions: 84 },
  { name: 'Priya Malaviya', reputation: '1,210 pts', badge: 'Civil Lines Resident', contributions: 52 },
  { name: 'Captain Nishad', reputation: '980 pts', badge: 'Yamuna River Navigator', contributions: 39 },
];

export const COMMUNITY_TOURISM_SIGNALS = [
  { metric: 'Current Sangam Water Level', value: 'Normal Bathing Conditions', status: 'optimal' },
  { metric: 'Active Boat Fleet at Confluence', value: '320+ Registered Ferries', status: 'active' },
  { metric: 'Chowk Morning Footfall Trend', value: 'Moderate (+12% weekend lift)', status: 'moderate' },
];

export default {
  CHANNELS,
  INITIAL_THREADS,
  TOP_REPUTATION_USERS,
  COMMUNITY_TOURISM_SIGNALS,
};
