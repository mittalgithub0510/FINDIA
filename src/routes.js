/**
 * Central route definitions for FINDIA.
 * Used for navigation menus, sitemaps, and breadcrumbs.
 */
export const ROUTES = [
  {
    path: '/',
    name: 'Home',
    title: 'FINDIA — Explore Beyond Thinking',
    description: 'India urban navigation and real-time crowd telemetry.',
    navGroup: 'primary',
  },
  {
    path: '/destination/north/delhi',
    name: 'Destination (Delhi)',
    title: 'Delhi Destinations & Historical Monuments',
    description: 'Explore historical monuments, adventure parks, malls, and famous food spots in Delhi.',
    navGroup: 'primary',
  },
  {
    path: '/destination/north/prayagraj',
    name: 'Destination (Prayagraj)',
    title: 'Prayagraj Destinations & Triveni Sangam',
    description: 'Explore sacred confluence ghats, Akbar’s fort, colonial monuments, and 1854 food in Prayagraj, UP.',
    navGroup: 'primary',
  },
  {
    path: '/hotels',
    name: 'Hotels',
    title: 'Hotels & Stays',
    description: 'Boutique heritage stays and hotels across India.',
    navGroup: 'primary',
  },
  {
    path: '/transport',
    name: 'Transport',
    title: 'Transport & Metro Navigation',
    description: 'Delhi Metro lines, transit schedules, and urban connectivity.',
    navGroup: 'primary',
  },
  {
    path: '/guides',
    name: 'Guides',
    title: 'Verified Tour Guides',
    description: 'Certified heritage guides and walking tour leaders.',
    navGroup: 'primary',
  },
  {
    path: '/community',
    name: 'Community',
    title: 'Traveler Forum & Field Reports',
    description: 'Ground reports, lost and found notices, safety tips, and travel questions.',
    navGroup: 'primary',
  },
  {
    path: '/findia-ai',
    name: 'FINDIA AI',
    title: 'FINDIA AI Crowd-Aware Trip Planner',
    description: 'AI trip planning logic sequenced around live congestion telemetry.',
    navGroup: 'primary',
  },
  {
    path: '/sos',
    name: 'SOS',
    title: 'Emergency Contacts & Nearest Services',
    description: 'Immediate casualty hospitals, police stations, mechanics, petrol pumps, and amenities.',
    navGroup: 'primary',
  },
  {
    path: '/login',
    name: 'Login',
    title: 'Login / Sign Up',
    description: 'Access personalized itinerary saves and member features.',
    navGroup: 'primary',
  },
];

export default ROUTES;
